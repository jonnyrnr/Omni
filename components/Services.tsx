import React from 'react';
import { Service } from '../types';

// Icon components (defined within for simplicity, could be separate files)
const MusicIcon: React.FC<{className?: string}> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /></svg>;
const BrainIcon: React.FC<{className?: string}> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.5 13.5c1.5-1.5 1.5-4.5 0-6m5 6c-1.5-1.5-1.5-4.5 0-6M12 21a9 9 0 100-18 9 9 0 000 18zM12 15.5V16" /></svg>;
const CommunityIcon: React.FC<{className?: string}> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const RecycleIcon: React.FC<{className?: string}> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>;
const CodeIcon: React.FC<{className?: string}> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const PaletteIcon: React.FC<{className?: string}> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>;

const services: Service[] = [
  { icon: MusicIcon, title: "A/V & Live Events", description: "Full-service audio/video production, backline rental, and live event management." },
  { icon: BrainIcon, title: "EEG-to-MIDI", description: "Pioneering neurotechnology that transforms brainwaves into musical expression." },
  { icon: CommunityIcon, title: "Community Services", description: "Barbering, peer support, and outreach programs to strengthen our community bonds." },
  { icon: RecycleIcon, title: "Waste Management", description: "Innovative and sustainable waste management solutions for a cleaner future." },
  { icon: CodeIcon, title: "Web Development", description: "Bespoke web and mobile application development with a focus on UX and scalability." },
  { icon: PaletteIcon, title: "Creative Arts", description: "A hub for creative collaboration, from podcasting to collaborative media production." }
];

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
  <div className="bg-brand-primary p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-accent/10 text-brand-accent mb-6 transition-colors duration-300 group-hover:bg-brand-accent group-hover:text-white">
      <service.icon className="h-8 w-8" />
    </div>
    <h3 className="text-xl font-bold font-display text-brand-text">{service.title}</h3>
    <p className="mt-2 text-gray-600">{service.description}</p>
  </div>
);

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-brand-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-text">Our Digital Ateliers</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-cursive text-brand-cursive">Where each service is a crafted experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => <ServiceCard key={service.title} service={service} />)}
        </div>
      </div>
    </section>
  );
};

export default Services;