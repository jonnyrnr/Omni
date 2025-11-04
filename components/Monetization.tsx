import React from 'react';

interface MonetizationModel {
    title: string;
    description: string;
}

const models: MonetizationModel[] = [
    { title: "Subscriptions", description: "Tiered access to premium features, content, and services across the ecosystem." },
    { title: "Service Fees", description: "Transactional fees for bookings, marketplace sales, and specialized services." },
    { title: "Donations", description: "Support for community outreach programs and creative projects through direct contributions." },
    { title: "Digital Products", description: "Purchase one-off digital goods like EEG-to-MIDI presets, art, or educational content." },
];

const SealIcon: React.FC = () => (
    <svg className="w-12 h-12 text-brand-cursive/20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 13.8483 19.3724 15.551 18.3167 16.8907L16.8907 18.3167C15.551 19.3724 13.8483 20 12 20C9.15172 20 6.84478 18.3117 5.56488 16.0932L7.10928 15.223C8.01913 16.782 9.84828 18 12 18C14.2091 18 16 16.2091 16 14C16 11.7909 14.2091 10 12 10C9.79086 10 8 11.7909 8 14H6C6 10.6863 8.68629 8 12 8C15.3137 8 18 10.6863 18 14C18 14.6543 17.8962 15.2816 17.7071 15.8685L15.8685 17.7071C15.2816 17.8962 14.6543 18 14 18H14"/>
    </svg>
);


const MonetizationCard: React.FC<{ model: MonetizationModel }> = ({ model }) => (
    <div className="bg-brand-primary p-6 rounded-lg shadow-md relative overflow-hidden">
        <div className="absolute -top-2 -right-2">
            <SealIcon/>
        </div>
        <div className="relative">
            <h3 className="text-2xl font-bold font-display text-brand-accent">{model.title}</h3>
            <p className="mt-2 text-gray-600">{model.description}</p>
        </div>
    </div>
);


const Monetization: React.FC = () => {
    return (
        <section id="monetization" className="py-24 bg-brand-primary/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-text">Sustainable Value</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">A diverse revenue strategy to ensure growth and value for all users.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {models.map(model => <MonetizationCard key={model.title} model={model} />)}
                </div>
            </div>
        </section>
    );
};

export default Monetization;