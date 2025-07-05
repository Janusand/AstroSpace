import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Moon, Sun } from 'lucide-react';

const astronomicalEvents = {
  '2024-12-01': { event: 'New Moon', type: 'moon' },
  '2024-12-08': { event: 'First Quarter Moon', type: 'moon' },
  '2024-12-15': { event: 'Full Moon', type: 'moon' },
  '2024-12-22': { event: 'Winter Solstice', type: 'sun' },
  '2024-12-23': { event: 'Last Quarter Moon', type: 'moon' },
  '2024-12-31': { event: 'New Moon', type: 'moon' },
  '2025-01-06': { event: 'Quadrantids Meteor Shower Peak', type: 'meteor' },
  '2025-01-13': { event: 'Full Moon', type: 'moon' },
  '2025-01-20': { event: 'Mars Opposition', type: 'planet' },
  '2025-01-29': { event: 'New Moon', type: 'moon' },
};

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'moon': return <Moon className="h-3 w-3" />;
      case 'sun': return <Sun className="h-3 w-3" />;
      case 'meteor': return <Star className="h-3 w-3" />;
      case 'planet': return <Star className="h-3 w-3" />;
      default: return <Star className="h-3 w-3" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'moon': return 'text-blue-400';
      case 'sun': return 'text-yellow-400';
      case 'meteor': return 'text-purple-400';
      case 'planet': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + (direction === 'next' ? 1 : -1), 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 border border-slate-700/50"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
      const event = astronomicalEvents[dateStr];
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
      const isSelected = selectedDate === dateStr;

      days.push(
        <div
          key={day}
          className={`h-20 border border-slate-700/50 p-2 cursor-pointer transition-all duration-200 ${
            isToday ? 'bg-purple-500/20 border-purple-500' : 'hover:bg-slate-700/30'
          } ${isSelected ? 'bg-purple-500/30 border-purple-400' : ''}`}
          onClick={() => setSelectedDate(isSelected ? null : dateStr)}
        >
          <div className="flex justify-between items-start h-full">
            <span className={`text-sm font-medium ${isToday ? 'text-purple-300' : 'text-gray-300'}`}>
              {day}
            </span>
            {event && (
              <div className={`${getEventColor(event.type)} flex items-center space-x-1`}>
                {getEventIcon(event.type)}
              </div>
            )}
          </div>
          {event && (
            <div className="mt-1">
              <div className="text-xs text-gray-400 leading-tight">
                {event.event.length > 15 ? `${event.event.substring(0, 15)}...` : event.event}
              </div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Astronomical Calendar
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Track celestial events, moon phases, and astronomical phenomena
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/50 to-cyan-800/30 rounded-2xl p-6 border border-cyan-500/20 backdrop-blur-sm">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-cyan-400" />
              </button>
              
              <h3 className="text-2xl font-bold text-white">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <ChevronRight className="h-6 w-6 text-cyan-400" />
              </button>
            </div>

            {/* Days of the week header */}
            <div className="grid grid-cols-7 gap-0 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center py-2 text-sm font-medium text-gray-400">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-0 border border-slate-700/50 rounded-lg overflow-hidden">
              {renderCalendar()}
            </div>

            {/* Event Details */}
            {selectedDate && astronomicalEvents[selectedDate] && (
              <div className="mt-6 p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
                <h4 className="text-lg font-semibold text-cyan-300 mb-2">
                  {selectedDate}
                </h4>
                <div className="flex items-center space-x-2 text-white">
                  {getEventIcon(astronomicalEvents[selectedDate].type)}
                  <span>{astronomicalEvents[selectedDate].event}</span>
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <div className="flex items-center space-x-2 text-blue-400">
                <Moon className="h-4 w-4" />
                <span className="text-sm">Moon Phases</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-400">
                <Sun className="h-4 w-4" />
                <span className="text-sm">Solar Events</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-400">
                <Star className="h-4 w-4" />
                <span className="text-sm">Meteor Showers</span>
              </div>
              <div className="flex items-center space-x-2 text-red-400">
                <Star className="h-4 w-4" />
                <span className="text-sm">Planetary Events</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};