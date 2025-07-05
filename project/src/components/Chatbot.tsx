import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Rocket } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const botResponses = {
  greetings: [
    "Hello, space explorer! I'm AstroBot, your cosmic companion. What astronomical wonders would you like to explore today?",
    "Greetings from the cosmos! I'm here to help you navigate the mysteries of space. What questions do you have?",
    "Welcome to the universe of knowledge! I'm AstroBot, ready to take you on an interstellar journey of discovery."
  ],
  
  space_facts: [
    "Did you know that a day on Venus is longer than its year? Venus rotates so slowly that it takes 243 Earth days to complete one rotation!",
    "The International Space Station travels at about 17,500 mph and orbits Earth every 90 minutes!",
    "A single teaspoon of neutron star material would weigh about 6 billion tons on Earth!",
    "The largest known star, UY Scuti, is so big that if it replaced our Sun, it would extend beyond Jupiter's orbit!"
  ],
  
  solar_system: [
    "Our solar system is home to 8 planets, over 200 moons, and countless asteroids and comets. Each planet has unique characteristics!",
    "Jupiter is so massive that it could fit all the other planets inside it! It also has over 80 known moons.",
    "Saturn's rings are made of countless ice particles and rocks, some as small as pebbles and others as large as mountains!",
    "Mars has the largest volcano in the solar system - Olympus Mons, which is about 13.6 miles high!"
  ],
  
  black_holes: [
    "Black holes are regions of spacetime where gravity is so strong that nothing, not even light, can escape once it crosses the event horizon.",
    "The supermassive black hole at the center of our galaxy, Sagittarius A*, has a mass of about 4 million suns!",
    "Time dilation near black holes means that time passes more slowly in stronger gravitational fields - just like in the movie Interstellar!",
    "The first image of a black hole was captured in 2019 by the Event Horizon Telescope, showing the black hole in galaxy M87."
  ],
  
  galaxies: [
    "Our Milky Way galaxy contains over 100 billion stars and is about 100,000 light-years across!",
    "The Andromeda Galaxy is approaching us at about 250,000 mph and will collide with the Milky Way in about 4.5 billion years!",
    "There are an estimated 2 trillion galaxies in the observable universe, each containing billions of stars!",
    "The most distant galaxy we've observed is over 13 billion light-years away, showing us the universe when it was very young!"
  ],
  
  default: [
    "That's a fascinating question about space! While I don't have specific information about that, I'd love to chat about planets, stars, black holes, or galaxies!",
    "Great question! I'm particularly knowledgeable about our solar system, cosmic events, and space exploration. What would you like to explore?",
    "Space is full of mysteries! I can share information about astronomical phenomena, space missions, or cosmic events. What interests you most?"
  ]
};

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello, space explorer! I'm AstroBot, your cosmic companion. What astronomical wonders would you like to explore today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return botResponses.greetings[Math.floor(Math.random() * botResponses.greetings.length)];
    }
    
    if (lowerMessage.includes('fact') || lowerMessage.includes('interesting') || lowerMessage.includes('cool')) {
      return botResponses.space_facts[Math.floor(Math.random() * botResponses.space_facts.length)];
    }
    
    if (lowerMessage.includes('planet') || lowerMessage.includes('solar system') || lowerMessage.includes('sun') || lowerMessage.includes('mars') || lowerMessage.includes('jupiter')) {
      return botResponses.solar_system[Math.floor(Math.random() * botResponses.solar_system.length)];
    }
    
    if (lowerMessage.includes('black hole') || lowerMessage.includes('event horizon') || lowerMessage.includes('gravity')) {
      return botResponses.black_holes[Math.floor(Math.random() * botResponses.black_holes.length)];
    }
    
    if (lowerMessage.includes('galaxy') || lowerMessage.includes('milky way') || lowerMessage.includes('andromeda') || lowerMessage.includes('universe')) {
      return botResponses.galaxies[Math.floor(Math.random() * botResponses.galaxies.length)];
    }
    
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            AstroBot Assistant
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Chat with our AI-powered space assistant about cosmic mysteries and astronomical phenomena
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/50 to-green-800/30 rounded-2xl border border-green-500/20 backdrop-blur-sm overflow-hidden">
            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'bot' && (
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-full">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-slate-700/50 text-gray-100'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-full">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-slate-700/50 text-gray-100 px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-slate-700/50 p-4">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about space, planets, stars, or cosmic events..."
                  className="flex-1 bg-slate-700/50 border border-slate-600 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-full transition-all duration-200 transform hover:scale-105"
                >
                  <Send className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Suggested Questions */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Tell me an interesting space fact",
              "What's special about black holes?",
              "How big is our solar system?",
              "What do you know about galaxies?"
            ].map((question, index) => (
              <button
                key={index}
                onClick={() => setInputValue(question)}
                className="bg-gradient-to-r from-slate-700/50 to-green-700/30 hover:from-slate-700/70 hover:to-green-700/50 p-3 rounded-lg text-left text-gray-300 hover:text-white transition-all duration-200 border border-green-500/20 hover:border-green-500/40"
              >
                <Rocket className="h-4 w-4 inline mr-2 text-green-400" />
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};