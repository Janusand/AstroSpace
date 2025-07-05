import React from 'react';
import { Rocket, Star, Globe, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              ASTROSPACE
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Explore the infinite cosmos and discover the mysteries of space through cosmic events, 
              astronomical calendars, and interactive learning experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 p-6 rounded-2xl border border-purple-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <Rocket className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cosmic Events</h3>
              <p className="text-gray-300 text-sm">Discover past and present astronomical phenomena</p>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-800/30 to-blue-800/30 p-6 rounded-2xl border border-cyan-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <Globe className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Space Calendar</h3>
              <p className="text-gray-300 text-sm">Track upcoming astronomical events and dates</p>
            </div>
            
            <div className="bg-gradient-to-br from-pink-800/30 to-orange-800/30 p-6 rounded-2xl border border-pink-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <Zap className="h-12 w-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
              <p className="text-gray-300 text-sm">Test your knowledge with space quizzes and AI chatbot</p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Exploring
            </button>
            <button className="border border-purple-500 text-purple-300 hover:bg-purple-500/10 px-8 py-4 rounded-full font-semibold transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};