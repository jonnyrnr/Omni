import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import AVServices from './components/AVServices';
import Team from './components/Team';
import VisionGenerator from './components/VisionGenerator';
import Monetization from './components/Monetization';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-brand-background min-h-screen font-sans antialiased">
      <Header />
      <main>
        <Hero />
        <Services />
        <AVServices />
        <Team />
        <VisionGenerator />
        <Monetization />
      </main>
      <Footer />
    </div>
  );
};

export default App;