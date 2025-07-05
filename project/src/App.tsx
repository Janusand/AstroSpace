import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { CosmicEvents } from './components/CosmicEvents';
import { Calendar } from './components/Calendar';
import { Chatbot } from './components/Chatbot';
import { Quiz } from './components/Quiz';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero />;
      case 'events':
        return <CosmicEvents />;
      case 'calendar':
        return <Calendar />;
      case 'chatbot':
        return <Chatbot />;
      case 'quiz':
        return <Quiz />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background Stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-70 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>
      
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="relative z-10">
        {renderSection()}
      </main>
    </div>
  );
}

export default App;