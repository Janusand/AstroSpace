import React, { useState } from 'react';
import { Brain, CheckCircle, XCircle, RotateCcw, ArrowLeft } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What is the closest star to Earth?",
    options: ["Alpha Centauri", "Proxima Centauri", "The Sun", "Sirius"],
    correct: 2,
    explanation: "The Sun is the closest star to Earth at about 93 million miles away. Proxima Centauri is the closest star outside our solar system."
  },
  {
    id: 2,
    question: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Neptune", "Uranus"],
    correct: 1,
    explanation: "Saturn has the most moons with 146 confirmed moons, surpassing Jupiter's 95 moons."
  },
  {
    id: 3,
    question: "What causes a solar eclipse?",
    options: ["Earth's shadow on the Sun", "Moon passing between Earth and Sun", "Sun's corona expanding", "Earth passing between Moon and Sun"],
    correct: 1,
    explanation: "A solar eclipse occurs when the Moon passes between Earth and the Sun, casting a shadow on Earth."
  },
  {
    id: 4,
    question: "How long does it take light from the Sun to reach Earth?",
    options: ["8 minutes", "1 hour", "1 day", "1 second"],
    correct: 0,
    explanation: "Light from the Sun takes approximately 8 minutes and 20 seconds to reach Earth, traveling at 186,282 miles per second."
  },
  {
    id: 5,
    question: "What is the largest planet in our solar system?",
    options: ["Saturn", "Neptune", "Jupiter", "Earth"],
    correct: 2,
    explanation: "Jupiter is the largest planet in our solar system, with a mass greater than all other planets combined."
  },
  {
    id: 6,
    question: "What is a supernova?",
    options: ["A new star being born", "A star exploding", "A planet collision", "A black hole forming"],
    correct: 1,
    explanation: "A supernova is the explosive death of a massive star, releasing enormous amounts of energy and creating heavy elements."
  },
  {
    id: 7,
    question: "Which galaxy will collide with the Milky Way?",
    options: ["Andromeda", "Triangulum", "Large Magellanic Cloud", "Centaurus A"],
    correct: 0,
    explanation: "The Andromeda Galaxy is approaching the Milky Way and will collide with it in about 4.5 billion years."
  },
  {
    id: 8,
    question: "What is the hottest planet in our solar system?",
    options: ["Mercury", "Venus", "Mars", "Jupiter"],
    correct: 1,
    explanation: "Venus is the hottest planet due to its thick atmosphere trapping heat, with surface temperatures around 864°F (462°C)."
  }
];

interface QuizProps {
  onBack?: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(new Array(quizQuestions.length).fill(false));
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered[currentQuestion]) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const newAnswered = [...answered];
    newAnswered[currentQuestion] = true;
    setAnswered(newAnswered);
    
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(new Array(quizQuestions.length).fill(false));
    setQuizComplete(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return "🌟 Stellar performance! You're a space expert!";
    if (percentage >= 60) return "🚀 Great job! You know your way around the cosmos!";
    if (percentage >= 40) return "🌙 Good effort! Keep exploring the universe!";
    return "⭐ Nice try! There's so much more to discover about space!";
  };

  if (quizComplete) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 rounded-2xl p-8 border border-purple-500/20 backdrop-blur-sm text-center">
              <div className="mb-6">
                <Brain className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
                <p className="text-xl text-gray-300">{getScoreMessage()}</p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-6 mb-6">
                <div className="text-4xl font-bold text-white mb-2">
                  {score} / {quizQuestions.length}
                </div>
                <div className="text-lg text-gray-300">
                  {Math.round((score / quizQuestions.length) * 100)}% Correct
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRestart}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Take Quiz Again</span>
                </button>
                
                {onBack && (
                  <button
                    onClick={onBack}
                    className="border border-purple-500 text-purple-300 hover:bg-purple-500/10 px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Events</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Space Knowledge Quiz
          </h2>
          <p className="text-xl text-gray-300">
            Test your knowledge about the cosmos and astronomical events
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <span className="text-sm text-gray-400">
                Score: {score}/{answered.filter(a => a).length}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 rounded-2xl p-8 border border-purple-500/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-6 leading-relaxed">
              {question.question}
            </h3>

            <div className="space-y-4 mb-6">
              {question.options.map((option, index) => {
                let buttonClass = "w-full p-4 rounded-lg text-left transition-all duration-200 border ";
                
                if (answered[currentQuestion]) {
                  if (index === question.correct) {
                    buttonClass += "bg-green-500/20 border-green-500 text-green-300";
                  } else if (index === selectedAnswer) {
                    buttonClass += "bg-red-500/20 border-red-500 text-red-300";
                  } else {
                    buttonClass += "bg-slate-700/30 border-slate-600 text-gray-400";
                  }
                } else {
                  buttonClass += "bg-slate-700/50 border-slate-600 text-gray-300 hover:bg-slate-700/70 hover:border-purple-500/50 hover:text-white";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={answered[currentQuestion]}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {answered[currentQuestion] && (
                        <div>
                          {index === question.correct ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : index === selectedAnswer ? (
                            <XCircle className="h-5 w-5 text-red-400" />
                          ) : null}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {showResult && (
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                <p className="text-blue-300 leading-relaxed">
                  <strong>Explanation:</strong> {question.explanation}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center">
              {onBack && currentQuestion === 0 && (
                <button
                  onClick={onBack}
                  className="border border-purple-500 text-purple-300 hover:bg-purple-500/10 px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
              )}
              
              <div className="ml-auto">
                {answered[currentQuestion] && (
                  <button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};