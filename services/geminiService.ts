import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Vision, GearItem } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        creativeVision: {
            type: Type.STRING,
            description: 'A compelling, high-level creative vision for the business idea. It should be inspiring, slightly futuristic, and align with the art-tech fusion aesthetic of Synergy Sphere. (1-2 sentences)'
        },
        missionStatement: {
            type: Type.STRING,
            description: 'A concise and powerful mission statement for this new venture. (1 sentence)'
        },
        keyFeatures: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING,
            },
            description: 'A list of 3-5 key features the platform or service should have. Each feature should have a creative or tech-focused name.'
        }
    },
    required: ['creativeVision', 'missionStatement', 'keyFeatures']
};

export const generateVision = async (idea: string): Promise<Omit<Vision, 'imageUrl'>> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: `You are an AI Muse for "Synergy Sphere," an ecosystem where technology, creative arts, and community converge with an elegant, futuristic aesthetic. Your role is to brainstorm and articulate new ventures that fit this world.
            
            A user has provided the following idea: "${idea}"

            Analyze this idea and generate a strategic vision for it within the Synergy Sphere context. The response must be structured as JSON, adhering to the provided schema. Your tone should be sophisticated and inspiring.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.8,
            },
        });

        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);

        if (
            typeof parsedJson.creativeVision === 'string' &&
            typeof parsedJson.missionStatement === 'string' &&
            Array.isArray(parsedJson.keyFeatures) &&
            parsedJson.keyFeatures.every((item: unknown) => typeof item === 'string')
        ) {
            return parsedJson as Omit<Vision, 'imageUrl'>;
        } else {
            console.error("Parsed JSON does not match Vision interface:", parsedJson);
            throw new Error("API response format is incorrect.");
        }

    } catch (error) {
        console.error("Error generating vision with Gemini:", error);
        throw new Error("Failed to communicate with the AI model.");
    }
};

export const generateImage = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: `Generate an abstract, elegant, and slightly futuristic piece of digital art representing the concept of: "${prompt}". Use a sophisticated color palette with off-whites, dark teal, and gold accents.` }],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                return `data:image/png;base64,${base64ImageBytes}`;
            }
        }
        throw new Error("No image data found in response.");

    } catch (error) {
        console.error("Error generating image with Gemini:", error);
        throw new Error("Failed to generate image with AI.");
    }
};

type VisionField = 'creativeVision' | 'missionStatement' | 'keyFeatures';

export const generateVariation = async (
    field: VisionField,
    originalIdea: string,
    currentVision: Omit<Vision, 'imageUrl'>
): Promise<string | string[]> => {
    try {
        const context = JSON.stringify({
            creativeVision: currentVision.creativeVision,
            missionStatement: currentVision.missionStatement,
            keyFeatures: currentVision.keyFeatures
        }, null, 2);

        const isArray = field === 'keyFeatures';

        const variationSchema = {
            type: Type.OBJECT,
            properties: {
                [field]: isArray ? {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: `A new list of 3-5 key features.`
                } : {
                    type: Type.STRING,
                    description: `A new, alternative version of the ${field}.`
                }
            },
            required: [field]
        };

        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: `You are an AI Muse for "Synergy Sphere". You previously generated a vision for the idea: "${originalIdea}". Here is the current vision: ${context}.
            
            Now, generate a single, alternative variation for ONLY the "${field}" field. Your response must be structured as JSON adhering to the provided schema. Be creative and provide a fresh perspective.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: variationSchema,
                temperature: 0.9,
            },
        });

        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);

        if (parsedJson[field]) {
             return parsedJson[field];
        } else {
             throw new Error(`API response format is incorrect, missing field: ${field}`);
        }

    } catch (error) {
        console.error(`Error generating variation for ${field}:`, error);
        throw new Error(`Failed to generate variation for ${field}.`);
    }
};

const gearRecommendationSchema = {
    type: Type.OBJECT,
    properties: {
        recommendations: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    itemName: { type: Type.STRING },
                    reason: { type: Type.STRING }
                },
                required: ['itemName', 'reason']
            }
        }
    },
    required: ['recommendations']
};

export const getGearRecommendations = async (
    sessionType: string,
    cartItems: GearItem[],
    availableGear: GearItem[]
): Promise<{ itemName: string; reason: string }[]> => {
    try {
        const cartNames = cartItems.length > 0 ? cartItems.map(item => item.name).join(', ') : 'nothing';
        const availableNames = availableGear.map(item => item.name).join(', ');

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are an expert A/V technician. A client is booking gear for a "${sessionType}" session.
            They have already selected the following items: ${cartNames}.
            Based on this, recommend 2-3 additional items from the following available inventory that would complement their setup.
            Do not recommend items they have already selected.
            Explain concisely why each is a good choice.
            Available inventory: ${availableNames}.
            Respond ONLY with JSON matching the provided schema.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: gearRecommendationSchema,
                temperature: 0.7,
            },
        });

        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        
        if (parsedJson.recommendations && Array.isArray(parsedJson.recommendations)) {
            return parsedJson.recommendations;
        } else {
            throw new Error("AI response format is incorrect for gear recommendations.");
        }
    } catch (error) {
        console.error("Error getting gear recommendations:", error);
        throw new Error("Failed to get AI gear recommendations.");
    }
};
