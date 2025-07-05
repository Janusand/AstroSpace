import React from 'react';
import { Rocket, Calendar, MessageCircle, Brain, Star } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Star },
    { id: 'events', label: 'Cosmic Events', icon: Rocket },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'chatbot', label: 'Chatbot', icon: MessageCircle },
    { id: 'quiz', label: 'Quiz', icon: Brain },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/20 border-b border-purple-500/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Rocket className="h-8 w-8 text-purple-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ASTROSPACE
            </h1>
          </div>
          
          <div className="flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'hover:bg-purple-500/10 text-gray-300 hover:text-purple-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};