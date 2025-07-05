// Global variables
let currentSection = 'home';
let currentQuestionIndex = 0;
let quizScore = 0;
let quizAnswered = [];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Cosmic events data
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
        icon: "🌑"
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
        icon: "☄️"
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
        icon: "🚀"
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
        icon: "🕳️"
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
        icon: "🛸"
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
        icon: "💫"
    }
];

// Calendar events data
const calendarEvents = {
    '2024-12-01': { event: 'New Moon', type: 'moon', icon: '🌑' },
    '2024-12-08': { event: 'First Quarter Moon', type: 'moon', icon: '🌓' },
    '2024-12-15': { event: 'Full Moon', type: 'moon', icon: '🌕' },
    '2024-12-22': { event: 'Winter Solstice', type: 'sun', icon: '☀️' },
    '2024-12-23': { event: 'Last Quarter Moon', type: 'moon', icon: '🌗' },
    '2024-12-31': { event: 'New Moon', type: 'moon', icon: '🌑' },
    '2025-01-06': { event: 'Quadrantids Meteor Shower Peak', type: 'meteor', icon: '☄️' },
    '2025-01-13': { event: 'Full Moon', type: 'moon', icon: '🌕' },
    '2025-01-20': { event: 'Mars Opposition', type: 'planet', icon: '🪐' },
    '2025-01-29': { event: 'New Moon', type: 'moon', icon: '🌑' }
};

// Quiz questions data
const quizQuestions = [
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
    }
];

// Chatbot responses
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

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeEvents();
    initializeCalendar();
    initializeChatbot();
    initializeQuiz();
});

// Navigation functions
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
        });
    });
}

function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionName) {
            link.classList.add('active');
        }
    });
    
    currentSection = sectionName;
}

// Events functions
function initializeEvents() {
    renderEvents('all');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Render filtered events
            renderEvents(filter);
        });
    });
}

function renderEvents(filter) {
    const eventsGrid = document.getElementById('eventsGrid');
    const filteredEvents = filter === 'all' ? cosmicEvents : cosmicEvents.filter(event => event.category === filter);
    
    eventsGrid.innerHTML = filteredEvents.map(event => `
        <div class="event-card" onclick="expandEvent(${event.id})">
            <div class="event-header">
                <div class="event-icon">${event.icon}</div>
                <div class="event-category ${event.category}">${event.category}</div>
            </div>
            <h3 class="event-title">${event.title}</h3>
            <div class="event-details">
                <div class="event-detail">
                    <span>📅</span>
                    <span>${event.date}</span>
                </div>
                <div class="event-detail">
                    <span>🕐</span>
                    <span>${event.time}</span>
                </div>
                <div class="event-detail">
                    <span>📍</span>
                    <span>${event.location}</span>
                </div>
            </div>
            <p class="event-description">${event.description}</p>
        </div>
    `).join('');
}

function expandEvent(eventId) {
    // This could be expanded to show more details in a modal
    console.log('Expanding event:', eventId);
}

// Calendar functions
function initializeCalendar() {
    renderCalendar();
    
    document.getElementById('prevMonth').addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });
    
    document.getElementById('nextMonth').addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
}

function renderCalendar() {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    document.getElementById('currentMonth').textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date();
    
    const calendarGrid = document.getElementById('calendarGrid');
    let calendarHTML = '';
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += '<div class="calendar-day"></div>';
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const event = calendarEvents[dateStr];
        const isToday = today.getFullYear() === currentYear && 
                       today.getMonth() === currentMonth && 
                       today.getDate() === day;
        
        let dayClass = 'calendar-day';
        if (isToday) dayClass += ' today';
        if (event) dayClass += ' has-event';
        
        calendarHTML += `
            <div class="${dayClass}">
                <div class="day-number">${day}</div>
                ${event ? `<div class="event-indicator">${event.icon}</div>` : ''}
            </div>
        `;
    }
    
    calendarGrid.innerHTML = calendarHTML;
}

// Chatbot functions
function initializeChatbot() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Simulate bot thinking time
    setTimeout(() => {
        const botResponse = getBotResponse(message);
        addMessage(botResponse, 'bot');
    }, 1000 + Math.random() * 2000);
}

function sendSuggestion(message) {
    document.getElementById('chatInput').value = message;
    sendMessage();
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const time = new Date().toLocaleTimeString();
    
    const messageHTML = `
        <div class="message ${sender}-message">
            <div class="message-avatar">${sender === 'bot' ? '🤖' : '👨‍🚀'}</div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${time}</span>
            </div>
        </div>
    `;
    
    chatMessages.insertAdjacentHTML('beforeend', messageHTML);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(userMessage) {
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
}

// Quiz functions
function initializeQuiz() {
    quizAnswered = new Array(quizQuestions.length).fill(false);
    renderQuiz();
}

function renderQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    
    if (currentQuestionIndex >= quizQuestions.length) {
        renderQuizResults();
        return;
    }
    
    const question = quizQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    
    quizContainer.innerHTML = `
        <div class="quiz-progress">
            <div class="progress-info">
                <span>Question ${currentQuestionIndex + 1} of ${quizQuestions.length}</span>
                <span>Score: ${quizScore}/${quizAnswered.filter(a => a).length}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
        </div>
        
        <div class="quiz-card">
            <h3 class="quiz-question">${question.question}</h3>
            
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <button class="quiz-option" onclick="selectAnswer(${index})" id="option-${index}">
                        <span>${option}</span>
                        <span class="option-icon" id="icon-${index}"></span>
                    </button>
                `).join('')}
            </div>
            
            <div id="explanation" style="display: none;" class="quiz-explanation">
                <strong>Explanation:</strong> ${question.explanation}
            </div>
            
            <div class="quiz-controls">
                <div></div>
                <button id="nextButton" class="btn btn-primary" onclick="nextQuestion()" style="display: none;">
                    ${currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
            </div>
        </div>
    `;
}

function selectAnswer(answerIndex) {
    if (quizAnswered[currentQuestionIndex]) return;
    
    const question = quizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');
    
    // Mark as answered
    quizAnswered[currentQuestionIndex] = true;
    
    // Update score
    if (answerIndex === question.correct) {
        quizScore++;
    }
    
    // Style options
    options.forEach((option, index) => {
        option.classList.add('disabled');
        const icon = document.getElementById(`icon-${index}`);
        
        if (index === question.correct) {
            option.classList.add('correct');
            icon.textContent = '✅';
        } else if (index === answerIndex) {
            option.classList.add('incorrect');
            icon.textContent = '❌';
        }
    });
    
    // Show explanation and next button
    document.getElementById('explanation').style.display = 'block';
    document.getElementById('nextButton').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    renderQuiz();
}

function renderQuizResults() {
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    let message = '';
    
    if (percentage >= 80) message = "🌟 Stellar performance! You're a space expert!";
    else if (percentage >= 60) message = "🚀 Great job! You know your way around the cosmos!";
    else if (percentage >= 40) message = "🌙 Good effort! Keep exploring the universe!";
    else message = "⭐ Nice try! There's so much more to discover about space!";
    
    const quizContainer = document.getElementById('quizContainer');
    quizContainer.innerHTML = `
        <div class="quiz-card">
            <div class="quiz-results">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🧠</div>
                <h2 style="font-size: 2rem; margin-bottom: 1rem;">Quiz Complete!</h2>
                <p class="quiz-message">${message}</p>
                
                <div class="quiz-stats">
                    <div class="quiz-score">${quizScore} / ${quizQuestions.length}</div>
                    <div style="font-size: 1.25rem; color: #d1d5db;">${percentage}% Correct</div>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="restartQuiz()">
                        🔄 Take Quiz Again
                    </button>
                    <button class="btn btn-secondary" onclick="showSection('events')">
                        ← Back to Events
                    </button>
                </div>
            </div>
        </div>
    `;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    quizAnswered = new Array(quizQuestions.length).fill(false);
    renderQuiz();
}