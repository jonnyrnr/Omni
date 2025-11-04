import React, { useState } from 'react';
import { generateVision, generateImage, generateVariation } from '../services/geminiService';
import { Vision } from '../types';

type VisionField = 'creativeVision' | 'missionStatement' | 'keyFeatures';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center space-x-2">
        <div className="w-4 h-4 rounded-full bg-brand-accent animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-brand-accent animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 rounded-full bg-brand-accent animate-bounce"></div>
    </div>
);

const MiniSpinner: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-brand-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const RegenerateIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-3.181-3.182a8.25 8.25 0 00-11.664 0l-3.181 3.182" />
    </svg>
);


const VisionGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [vision, setVision] = useState<Vision | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [variationLoading, setVariationLoading] = useState<VisionField | null>(null);
    const [error, setError] = useState<string | null>(null);

    const examplePrompts: Record<string, string> = {
        "AI Music Assistant": "An AI-powered music composition assistant for indie game developers.",
        "Sustainable Fashion": "A sustainable fashion marketplace using blockchain for transparency.",
        "Urban Gardening Hub": "A community platform for urban gardening enthusiasts to share tips and trade seeds.",
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please describe your idea in the prompt field.');
            return;
        }
        setIsLoading(true);
        setIsImageLoading(true);
        setError(null);
        setVision(null);

        try {
            const [visionResult, imageUrlResult] = await Promise.all([
                generateVision(prompt),
                generateImage(prompt)
            ]);
            setVision({ ...visionResult, imageUrl: imageUrlResult });
        } catch (err) {
            setError('The AI muse is contemplating... Please try rephrasing your idea or try again shortly.');
            console.error(err);
        } finally {
            setIsLoading(false);
            setIsImageLoading(false);
        }
    };
    
    const handleVariation = async (field: VisionField) => {
        if (!prompt || !vision) return;
        setVariationLoading(field);
        setError(null);
        try {
            const result = await generateVariation(field, prompt, vision);
            setVision(prev => prev ? { ...prev, [field]: result } : null);
        } catch (err) {
            setError(`Failed to generate a variation for ${field}. Please try again.`);
            console.error(err);
        } finally {
            setVariationLoading(null);
        }
    };

    const VisionSection: React.FC<{ title: string; field: VisionField; children: React.ReactNode; }> = ({ title, field, children }) => (
      <div className="border-t border-brand-accent/10 pt-6">
        <div className="flex justify-between items-center mb-3">
            <h3 className="text-2xl font-bold font-display text-brand-accent">
              <span className="font-cursive text-brand-cursive text-3xl block -mb-2">The</span>
              {title}
            </h3>
            <button
              onClick={() => handleVariation(field)}
              disabled={!!variationLoading}
              title={`Generate a new ${title}`}
              className="p-2 rounded-full text-gray-400 hover:bg-brand-accent/10 hover:text-brand-accent transition-colors duration-200 disabled:opacity-50 disabled:cursor-wait"
              aria-label={`Regenerate ${title}`}
            >
              {variationLoading === field ? <MiniSpinner /> : <RegenerateIcon className="w-5 h-5" />}
            </button>
        </div>
        {children}
      </div>
    );

    return (
        <section id="vision-generator" className={`py-24 bg-brand-background vision-bg ${vision ? 'active' : ''}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-text">AI Visionarium</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Whisper an idea to our AI muse. It will channel the spirit of Synergy Sphere to forge a vision, mission, and core features for your concept, complete with inspirational art.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto bg-brand-primary p-8 rounded-xl shadow-2xl border border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., A platform for local artists to rent studio space..."
                            className="w-full h-28 sm:h-auto resize-none bg-brand-background/50 border border-gray-300 text-brand-text p-4 rounded-lg focus:ring-2 focus:ring-brand-accent focus:outline-none transition placeholder:text-gray-500"
                            disabled={isLoading}
                            aria-label="Your idea prompt"
                        />
                        <button
                            onClick={handleGenerate}
                            disabled={isLoading || isImageLoading}
                            className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent-dark text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg shadow-md"
                        >
                            {isLoading ? 'Creating...' : 'Generate'}
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500 mb-3">Need inspiration? Try one of these:</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {Object.entries(examplePrompts).map(([short, full]) => (
                                <button
                                    key={short}
                                    onClick={() => setPrompt(full)}
                                    className="text-sm bg-brand-secondary hover:bg-gray-200 text-brand-text font-medium py-1 px-3 rounded-full transition-colors duration-200 border border-gray-300"
                                >
                                    {short}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {error && (
                        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-left" role="alert">
                            <strong className="font-bold">An issue occurred:</strong>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}
                </div>

                <div className="mt-12 max-w-4xl mx-auto">
                    {(isLoading || isImageLoading) && <LoadingSpinner />}
                    {vision && (
                        <div className="bg-brand-primary border-2 border-brand-accent/20 rounded-2xl p-2 animate-fade-in shadow-2xl" role="document">
                            <div className="bg-brand-background/50 rounded-lg p-8">
                                {isImageLoading ? (
                                    <div className="w-full aspect-video bg-gray-200 rounded-lg animate-pulse" aria-live="polite" aria-label="Loading generated image"></div>
                                ) : (
                                    vision.imageUrl && <img src={vision.imageUrl} alt="AI generated art for the vision" className="w-full aspect-video object-cover rounded-lg mb-8 shadow-md" />
                                )}
                                
                                <div className="space-y-6">
                                    <VisionSection title="Creative Vision" field="creativeVision">
                                        <p className="text-gray-700 leading-relaxed">{vision.creativeVision}</p>
                                    </VisionSection>

                                    <VisionSection title="Mission Statement" field="missionStatement">
                                        <p className="text-gray-700 leading-relaxed">{vision.missionStatement}</p>
                                    </VisionSection>

                                    <VisionSection title="Key Features" field="keyFeatures">
                                      <ul className="space-y-3">
                                          {vision.keyFeatures.map((feature, index) => (
                                              <li key={index} className="flex items-start">
                                                  <svg className="w-6 h-6 text-brand-cursive/80 mr-3 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                                                  </svg>
                                                  <span className="text-gray-700">{feature}</span>
                                              </li>
                                          ))}
                                      </ul>
                                    </VisionSection>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style>{`
              @keyframes fade-in {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-in {
                animation: fade-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
              }
              .vision-bg {
                position: relative;
                transition: background-color 0.5s ease-in-out;
              }
              .vision-bg::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: linear-gradient(135deg, rgba(0, 77, 64, 0.03), rgba(184, 134, 11, 0.03), rgba(0, 77, 64, 0.02));
                background-size: 200% 200%;
                animation: gradient-calm 20s ease infinite;
                z-index: 0;
                opacity: 0;
                transition: opacity 1s ease-in-out;
              }
              .vision-bg.active::before {
                opacity: 1;
                animation-name: gradient-active;
                animation-duration: 10s;
              }
              @keyframes gradient-calm {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              @keyframes gradient-active {
                0% { background-position: 0% 80%; }
                50% { background-position: 100% 20%; }
                100% { background-position: 0% 80%; }
              }
            `}</style>
        </section>
    );
};

export default VisionGenerator;