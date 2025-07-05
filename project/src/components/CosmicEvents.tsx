import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Quiz } from './Quiz';

const cosmicEvents = [
  {
    id: 1,
    title: "Total Solar Eclipse",
    date: "April 8, 2024",
    time: "14:07 UTC",
    location: "North America",
    description: "A spectacular total solar eclipse crossed North America, from Mexico to Canada, providing millions with an incredible celestial show.",
    type: "eclipse",
    category: "recent",
    image: "https://images.pexels.com/photos/87009/earth-solar-eclipse-solar-corona-87009.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 2,
    title: "Perseid Meteor Shower Peak",
    date: "August 12, 2024",
    time: "22:00 UTC",
    location: "Northern Hemisphere",
    description: "The annual Perseid meteor shower reaches its peak, offering up to 100 meteors per hour in dark skies.",
    type: "meteor",
    category: "recent",
    image: "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 3,
    title: "Voyager 1 Interstellar Space Entry",
    date: "August 25, 2012",
    time: "Unknown",
    location: "Interstellar Space",
    description: "NASA's Voyager 1 spacecraft became the first human-made object to enter interstellar space.",
    type: "spacecraft",
    category: "historical",
    image: "https://images.pexels.com/photos/73873/star-clusters-rosette-nebula-star-galaxies-73873.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 4,
    title: "First Black Hole Image",
    date: "April 10, 2019",
    time: "13:00 UTC",
    location: "Event Horizon Telescope",
    description: "The Event Horizon Telescope captured the first direct image of a black hole in galaxy M87.",
    type: "discovery",
    category: "historical",
    image: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 5,
    title: "James Webb Space Telescope Launch",
    date: "December 25, 2021",
    time: "12:20 UTC",
    location: "French Guiana",
    description: "The most powerful space telescope ever built was launched, revolutionizing our understanding of the universe.",
    type: "launch",
    category: "recent",
    image: "https://images.pexels.com/photos/23547/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 6,
    title: "Supernova SN 1987A",
    date: "February 23, 1987",
    time: "10:35 UTC",
    location: "Large Magellanic Cloud",
    description: "The closest supernova observed in modern times, providing unprecedented insights into stellar explosions.",
    type: "supernova",
    category: "historical",
    image: "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];

export const CosmicEvents: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const filteredEvents = selectedCategory === 'all' 
    ? cosmicEvents 
    : cosmicEvents.filter(event => event.category === selectedCategory);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'eclipse': return '🌑';
      case 'meteor': return '☄️';
      case 'spacecraft': return '🚀';
      case 'discovery': return '🔭';
      case 'launch': return '🛸';
      case 'supernova': return '💫';
      default: return '⭐';
    }
  };

  if (showQuiz) {
    return <Quiz onBack={() => setShowQuiz(false)} />;
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Cosmic Events
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Journey through time and space to explore the most fascinating astronomical events
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['all', 'recent', 'historical'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-purple-500/10 text-purple-300 hover:bg-purple-500/20'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 rounded-2xl p-6 border border-purple-500/20 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{getEventIcon(event.type)}</div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  event.category === 'recent' ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'
                }`}>
                  {event.category}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-white">{event.title}</h3>
              
              <div className="space-y-2 text-gray-300 text-sm mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-purple-400" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-purple-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-purple-400" />
                  <span>{event.location}</span>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                {expandedEvent === event.id ? event.description : `${event.description.substring(0, 100)}...`}
              </p>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-1 text-purple-400">
                  <Star className="h-4 w-4" />
                  <span className="text-xs">Featured Event</span>
                </div>
                {expandedEvent === event.id ? (
                  <ChevronUp className="h-4 w-4 text-purple-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-purple-400" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowQuiz(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Test Your Knowledge with Space Quiz
          </button>
        </div>
      </div>
    </div>
  );
};