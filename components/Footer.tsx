import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-primary border-t border-gray-200">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Synergy Sphere. All rights reserved.</p>
          <p className="text-sm mt-2">
            <span className="font-display">DESIGN</span> 
            <span className="font-cursive text-brand-cursive mx-2">&</span> 
            <span className="font-sans">ENGINEERING</span> 
            <span className="text-brand-accent mx-2">&bull;</span>
            Powered by Google AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;