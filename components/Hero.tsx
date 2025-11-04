import React from 'react';

const AbstractArt: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute w-72 h-72 bg-brand-accent/20 rounded-full blur-2xl animate-pulse"></div>
    <div className="absolute w-56 h-56 bg-brand-cursive/20 rounded-full blur-2xl animate-pulse animation-delay-2000"></div>
    <svg width="100%" height="100%" viewBox="0 0 400 400" className="relative z-10" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: 'rgba(0, 77, 64, 0.6)', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: 'rgba(184, 134, 11, 0.6)', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="150" stroke="url(#grad1)" strokeWidth="1" fill="none" />
      <path d="M 100 200 A 100 100 0 0 1 300 200" stroke="url(#grad1)" strokeWidth="1" fill="none" />
      <path d="M 150 150 Q 200 100 250 150" stroke="url(#grad1)" strokeWidth="1" fill="none" />
      <path d="M 150 250 Q 200 300 250 250" stroke="url(#grad1)" strokeWidth="1" fill="none" />
    </svg>
  </div>
);

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-40 bg-brand-primary">
       <div className="absolute inset-0 bg-grid-gray-200/50 [mask-image:linear-gradient(to_bottom,white_5%,transparent_50%)]"></div>
       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-brand-text tracking-tighter leading-tight">
              Artifice & <span className="font-cursive text-brand-cursive">Elegance</span>.
              <span className="block text-brand-accent mt-2">Unified.</span>
            </h1>
            <p className="mt-6 max-w-xl mx-auto md:mx-0 text-lg md:text-xl text-gray-600">
              Synergy Sphere is a design-forward ecosystem where technology and creativity converge. We use AI as a brush, data as a canvas, and human ingenuity as the artist.
            </p>
            <div className="mt-10">
              <a href="#vision-generator" className="inline-block bg-brand-accent hover:bg-brand-accent-dark text-white font-bold py-4 px-10 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Create with AI
              </a>
            </div>
          </div>
          <div className="relative h-80 md:h-full">
            <AbstractArt />
          </div>
        </div>
      </div>
       <style>{`
        .bg-grid-gray-200\\/50 {
          background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.5;
        }
        @keyframes pulse {
          50% {
            opacity: .5;
            transform: scale(1.1);
          }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default Hero;