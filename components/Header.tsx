import React from 'react';

const Logo: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-accent">
    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z" fill="currentColor"/>
    <path d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18V16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12H18C18 8.68629 15.3137 6 12 6Z" fill="currentColor" fillOpacity="0.6"/>
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="bg-brand-background/80 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <Logo />
            <span className="text-2xl font-bold font-display text-brand-text tracking-wide">Synergy Sphere</span>
          </div>
          <nav className="hidden md:flex space-x-8 font-medium">
            <a href="#services" className="text-gray-600 hover:text-brand-accent transition-colors duration-200">Services</a>
            <a href="#av-services" className="text-gray-600 hover:text-brand-accent transition-colors duration-200">A/V Services</a>
            <a href="#team" className="text-gray-600 hover:text-brand-accent transition-colors duration-200">Team</a>
            <a href="#vision-generator" className="text-gray-600 hover:text-brand-accent transition-colors duration-200">AI Vision</a>
            <a href="#monetization" className="text-gray-600 hover:text-brand-accent transition-colors duration-200">Models</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;