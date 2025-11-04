import React from 'react';
import { TeamMember } from '../types';

const teamMembers: TeamMember[] = [
  { name: "Jonny Wiese", role: "Full Ecosystem Admin", avatarUrl: "https://picsum.photos/seed/jonny/200" },
  { name: "Sean Hart", role: "AV & Backline App Lead", avatarUrl: "https://picsum.photos/seed/sean/200" },
  { name: "Kendra Collins", role: "Enigma Channel Psychic App Lead", avatarUrl: "https://picsum.photos/seed/kendra/200" },
  { name: "Daryl Brandt", role: "Peer Support & Outreach Lead", avatarUrl: "https://picsum.photos/seed/daryl/200" }
];

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
  <div className="bg-brand-primary p-6 rounded-lg text-center transform transition duration-500 hover:scale-105 hover:shadow-xl group">
    <div className="relative inline-block">
        <img className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-md" src={member.avatarUrl} alt={member.name} />
        <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-brand-accent transition-all duration-300 scale-110 group-hover:scale-125 opacity-0 group-hover:opacity-100"></div>
    </div>
    <h3 className="text-2xl font-bold font-display text-brand-text">{member.name}</h3>
    <p className="text-brand-cursive font-cursive text-xl">{member.role}</p>
  </div>
);

const Team: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-brand-primary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-text">The Curators</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">The visionaries steering our diverse application ecosystem.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map(member => <TeamMemberCard key={member.name} member={member} />)}
        </div>
      </div>
    </section>
  );
};

export default Team;