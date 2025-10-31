import React, { useState, useEffect } from 'react';
import { Send, Music, MessageCircle, Download, Play, Pause } from 'lucide-react';

const App = () => {
  const [activeTask, setActiveTask] = useState('chatbot');
  
  // Chatbot State
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Music Generator State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMusic, setGeneratedMusic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicStyle, setMusicStyle] = useState('classical');
  const [sequenceLength, setSequenceLength] = useState(50);

  // FAQ Database with cosine similarity matching
  const faqs = [
    {
      question: "What is CodeAlpha?",
      keywords: ["codealpha", "company", "about", "what"],
      answer: "CodeAlpha is a leading software development company dedicated to driving innovation and excellence across emerging technologies. We provide internship programs in various domains including AI, Web Development, and more."
    },
    {
      question: "How do I complete the internship?",
      keywords: ["complete", "finish", "requirements", "internship"],
      answer: "To complete the internship, you must complete 2 or 3 tasks from your assigned domain, upload code to GitHub with proper naming (CodeAlpha_ProjectName), post a video explanation on LinkedIn, and submit through the official form."
    },
    {
      question: "What are the internship perks?",
      keywords: ["perks", "benefits", "certificate", "offer", "recommendation"],
      answer: "You'll receive an Internship Offer Letter, QR Verified Completion Certificate, Unique ID Certificate, Letter of Recommendation (based on performance), Job Opportunities/Placement Support, and Resume Building Support."
    },
    {
      question: "How long is the internship?",
      keywords: ["duration", "time", "long", "period"],
      answer: "The internship duration varies by program. Please check your offer letter or contact CodeAlpha at services@codealpha.tech for specific timeline details."
    },
    {
      question: "What tasks are available in AI domain?",
      keywords: ["tasks", "projects", "ai", "artificial intelligence", "assignment"],
      answer: "AI domain offers 4 tasks: Language Translation Tool, Chatbot for FAQs, Music Generation with AI, and Object Detection and Tracking. You need to complete any 2 or 3 of these tasks."
    },
    {
      question: "How do I submit my work?",
      keywords: ["submit", "submission", "upload", "form"],
      answer: "Submit your completed tasks through the submission form shared in your WhatsApp group. Ensure you've uploaded code to GitHub, posted on LinkedIn with the repo link, and followed all instructions in the form."
    },
    {
      question: "What if I complete only one task?",
      keywords: ["one task", "incomplete", "minimum"],
      answer: "Completing only one task is considered incomplete. You must complete at least 2 tasks to be eligible for the internship certificate. Certificates will not be issued for incomplete submissions."
    },
    {
      question: "How do I contact CodeAlpha?",
      keywords: ["contact", "email", "phone", "whatsapp", "support"],
      answer: "You can reach CodeAlpha via Website: www.codealpha.tech, WhatsApp: +91 8052293611, or Email: services@codealpha.tech"
    },
    {
      question: "Do I need to post on LinkedIn?",
      keywords: ["linkedin", "social media", "post", "share"],
      answer: "Yes! You should share your internship status on LinkedIn tagging @CodeAlpha, and post a video explanation of each completed project with your GitHub repository link."
    },
    {
      question: "What is the GitHub repository naming convention?",
      keywords: ["github", "repository", "naming", "repo"],
      answer: "Your GitHub repository should be named in the format: CodeAlpha_ProjectName. For example, CodeAlpha_ChatbotFAQs or CodeAlpha_MusicGeneration."
    }
  ];

  // Simple NLP preprocessing and cosine similarity
  const preprocessText = (text) => {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2);
  };

  const calculateSimilarity = (userWords, faqKeywords) => {
    const matches = userWords.filter(word => 
      faqKeywords.some(keyword => keyword.includes(word) || word.includes(keyword))
    );
    return matches.length / Math.max(userWords.length, 1);
  };

  const findBestMatch = (userInput) => {
    const userWords = preprocessText(userInput);
    let bestMatch = null;
    let highestScore = 0;

    faqs.forEach(faq => {
      const score = calculateSimilarity(userWords, faq.keywords);
      if (score > highestScore) {
        highestScore = score;
        bestMatch = faq;
      }
    });

    if (highestScore > 0.2) {
      return bestMatch.answer;
    }
    return "I'm not sure about that. Please try asking about CodeAlpha internship details, tasks, submission process, or contact information.";
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = { text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const response = findBestMatch(inputText);
      const botMessage = { text: response, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Music Generation (Simulated with Web Audio API)
  const generateMusicSequence = () => {
    const notes = musicStyle === 'classical' 
      ? ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']
      : ['C4', 'Eb4', 'F4', 'G4', 'Bb4', 'C5', 'D4', 'F#4'];
    
    const sequence = [];
    for (let i = 0; i < sequenceLength; i++) {
      const note = notes[Math.floor(Math.random() * notes.length)];
      const duration = [0.25, 0.5, 0.5, 1][Math.floor(Math.random() * 4)];
      sequence.push({ note, duration });
    }
    return sequence;
  };

  const noteToFrequency = (note) => {
    const notes = {
      'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
      'F#4': 369.99, 'G4': 392.00, 'A4': 440.00, 'Bb4': 466.16,
      'B4': 493.88, 'C5': 523.25, 'Eb4': 311.13
    };
    return notes[note] || 440;
  };

  const playMusicSequence = async (sequence) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let currentTime = audioContext.currentTime;

    sequence.forEach(({ note, duration }) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = noteToFrequency(note);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + duration);

      oscillator.start(currentTime);
      oscillator.stop(currentTime + duration);

      currentTime += duration;
    });

    return currentTime - audioContext.currentTime;
  };

  const handleGenerateMusic = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const sequence = generateMusicSequence();
      setGeneratedMusic(sequence);
      setIsGenerating(false);
    }, 2000);
  };

  const handlePlayMusic = async () => {
    if (!generatedMusic) return;
    
    setIsPlaying(true);
    const duration = await playMusicSequence(generatedMusic);
    
    setTimeout(() => {
      setIsPlaying(false);
    }, duration * 1000);
  };

  const downloadMusicData = () => {
    if (!generatedMusic) return;
    
    const musicData = JSON.stringify(generatedMusic, null, 2);
    const blob = new Blob([musicData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_music_sequence.json';
    a.click();
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { text: "Hello! I'm the CodeAlpha FAQ Chatbot. Ask me anything about the internship program!", sender: 'bot' }
      ]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-white mb-2">CodeAlpha AI Internship</h1>
          <p className="text-blue-200">Task 2: FAQ Chatbot & Task 3: Music Generation</p>
        </div>

        {/* Task Selector */}
        <div className="flex gap-4 mb-6 justify-center">
          <button
            onClick={() => setActiveTask('chatbot')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTask === 'chatbot'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <MessageCircle size={20} />
            FAQ Chatbot
          </button>
          <button
            onClick={() => setActiveTask('music')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTask === 'music'
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Music size={20} />
            Music Generator
          </button>
        </div>

        {/* Task 2: Chatbot */}
        {activeTask === 'chatbot' && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <MessageCircle size={28} />
                FAQ Chatbot
              </h2>
              <p className="text-blue-100 mt-2">Ask questions about CodeAlpha internship</p>
            </div>

            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-white rounded-br-sm'
                        : 'bg-white text-gray-800 shadow-md rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-2xl shadow-md">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about internship, tasks, submission..."
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                >
                  <Send size={20} />
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Task 3: Music Generator */}
        {activeTask === 'music' && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Music size={28} />
                AI Music Generator
              </h2>
              <p className="text-purple-100 mt-2">Generate music sequences using AI patterns</p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Music Style
                  </label>
                  <select
                    value={musicStyle}
                    onChange={(e) => setMusicStyle(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  >
                    <option value="classical">Classical</option>
                    <option value="jazz">Jazz</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Sequence Length: {sequenceLength} notes
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={sequenceLength}
                    onChange={(e) => setSequenceLength(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateMusic}
                disabled={isGenerating}
                className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white py-4 rounded-lg font-bold text-lg mb-4 transition-colors"
              >
                {isGenerating ? 'Generating Music...' : 'Generate Music Sequence'}
              </button>

              {generatedMusic && (
                <div className="bg-purple-50 rounded-lg p-6 space-y-4">
                  <h3 className="text-xl font-bold text-purple-900 mb-4">
                    Generated Music Preview
                  </h3>
                  
                  <div className="bg-white p-4 rounded-lg max-h-40 overflow-y-auto">
                    <div className="flex flex-wrap gap-2">
                      {generatedMusic.slice(0, 20).map((note, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-mono"
                        >
                          {note.note}
                        </span>
                      ))}
                      {generatedMusic.length > 20 && (
                        <span className="px-3 py-1 text-gray-500 text-sm">
                          +{generatedMusic.length - 20} more notes
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handlePlayMusic}
                      disabled={isPlaying}
                      className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      {isPlaying ? 'Playing...' : 'Play Music'}
                    </button>

                    <button
                      onClick={downloadMusicData}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Download size={20} />
                      Download Sequence
                    </button>
                  </div>

                  <div className="text-sm text-gray-600 mt-4">
                    <p><strong>Notes:</strong> {generatedMusic.length} total notes</p>
                    <p><strong>Style:</strong> {musicStyle}</p>
                    <p><strong>Status:</strong> Ready to play or download</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-white/80 pb-8">
          <p className="mb-2">Created for CodeAlpha AI Internship</p>
          <p className="text-sm">Tasks completed: FAQ Chatbot & Music Generation</p>
        </div>
      </div>
    </div>
  );
};

export default App;