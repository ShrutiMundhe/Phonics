import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Award, 
  Phone, 
  MapPin, 
  CheckCircle, 
  GraduationCap, 
  Star, 
  Menu, 
  X, 
  ChevronRight,
  Sparkles,
  Users,
  Volume2,
  Play,
  Smile,
  Heart,
  RefreshCw,
  Zap,
  MessageCircle,
  HelpCircle,
  ArrowRight,
  Sun,
  BookMarked
} from 'lucide-react';

// Web Audio synthesizer helper for click sounds
const playTone = (freq = 523.25, type = 'sine') => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {
    // Audio context fallback
  }
};

// Text to speech helper for phonics sound demo
const speakSound = (text) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1.15;
    window.speechSynthesis.speak(utterance);
  }
};

// 42 Synthetic Phonics Sounds Dataset
const PHONICS_GROUPS = [
  {
    name: 'Group 1: Basic Sounds',
    color: 'from-amber-400 to-orange-400',
    bgColor: 'bg-amber-500',
    sounds: [
      { sound: 's', action: 'Weave hand like a snake', example: 'Sun', emoji: '🐍', word: 'snake' },
      { sound: 'a', action: 'Wiggle fingers on arm like ants', example: 'Ant', emoji: '🐜', word: 'ant' },
      { sound: 't', action: 'Turn head side to side like tennis', example: 'Tennis', emoji: '🎾', word: 'tennis' },
      { sound: 'i', action: 'Wiggle nose like mouse whiskers', example: 'Ink', emoji: '🐭', word: 'ink' },
      { sound: 'p', action: 'Puff out birthday candle', example: 'Puff', emoji: '🕯️', word: 'puff' },
      { sound: 'n', action: 'Hold arms out like an airplane', example: 'Net', emoji: '✈️', word: 'net' },
    ]
  },
  {
    name: 'Group 2: Secondary Blends',
    color: 'from-sky-400 to-blue-500',
    bgColor: 'bg-sky-500',
    sounds: [
      { sound: 'ck', action: 'Raise hands like playing castanets', example: 'Cat', emoji: '🐱', word: 'cat' },
      { sound: 'e', action: 'Pretend to crack an egg shell', example: 'Egg', emoji: '🥚', word: 'egg' },
      { sound: 'h', action: 'Puff out hand like breathing hot air', example: 'Hat', emoji: '🎩', word: 'hat' },
      { sound: 'r', action: 'Pretend to be a puppy shaking a rag', example: 'Rat', emoji: '🐶', word: 'rag' },
      { sound: 'm', action: 'Rub tummy saying mmmmm', example: 'Meal', emoji: '😋', word: 'yummy' },
      { sound: 'd', action: 'Beat hands up & down like a drum', example: 'Drum', emoji: '🥁', word: 'drum' },
    ]
  },
  {
    name: 'Group 3: Vowels & Digraphs',
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-500',
    sounds: [
      { sound: 'g', action: 'Spiral hand down like water gurgling', example: 'Gate', emoji: '🌊', word: 'gurgle' },
      { sound: 'o', action: 'Turn light switch on and off', example: 'Orange', emoji: '🍊', word: 'orange' },
      { sound: 'u', action: 'Put up an umbrella', example: 'Umbrella', emoji: '☂️', word: 'umbrella' },
      { sound: 'l', action: 'Lick a lollipop', example: 'Lollipop', emoji: '🍭', word: 'lollipop' },
      { sound: 'f', action: 'Let air out of a inflatable fish', example: 'Fish', emoji: '🐟', word: 'fish' },
      { sound: 'b', action: 'Hit ball with a bat', example: 'Bat', emoji: '🦇', word: 'ball' },
    ]
  },
  {
    name: 'Group 4: Advanced Digraphs',
    color: 'from-purple-400 to-pink-500',
    bgColor: 'bg-purple-500',
    sounds: [
      { sound: 'ai', action: 'Cup hand over ear saying ai?', example: 'Rain', emoji: '🌧️', word: 'rain' },
      { sound: 'j', action: 'Jelly wiggling on a plate', example: 'Jelly', emoji: '🍮', word: 'jelly' },
      { sound: 'oa', action: 'Bring hands to mouth like boat horn', example: 'Boat', emoji: '⛵', word: 'boat' },
      { sound: 'ie', action: 'Salute like a captain saying ie-ie!', example: 'Tie', emoji: '👔', word: 'tie' },
      { sound: 'ee', action: 'Put hands on head like donkey ears', example: 'Tree', emoji: '🌴', word: 'tree' },
      { sound: 'or', action: 'Donkey flaps ears back saying or!', example: 'Fork', emoji: '🍴', word: 'fork' },
    ]
  }
];

// Sample Words for the Interactive Word Builder
const WORD_BUILDER_PRESETS = [
  { word: 'CAT', letters: ['c', 'a', 't'], meaning: 'A friendly feline pet 🐱' },
  { word: 'SUN', letters: ['s', 'u', 'n'], meaning: 'Bright star in the sky ☀️' },
  { word: 'PIN', letters: ['p', 'i', 'n'], meaning: 'Small pointy fastener 📌' },
  { word: 'DOG', letters: ['d', 'o', 'g'], meaning: 'Loyal puppy pal 🐶' },
  { word: 'HAT', letters: ['h', 'a', 't'], meaning: 'Wear it on your head 🎩' }
];

// Parent Reviews & Testimonials
const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Parent of Vivaan (Age 4)',
    text: 'Before Rupali ma’am’s classes, my son struggled with letter sounds. Within just 6 weeks of Jolly Phonics, he started blending 3-letter words by himself! Highly recommended!',
    rating: 5,
    tag: 'Parent'
  },
  {
    name: 'Sneha Kulkarni',
    role: 'Pre-Primary Teacher',
    text: 'Taking the Phonics Teacher Certification course was the best career decision for me. Rupali ma’am explains the UK synthetic phonics system with practical tools and clear guidance.',
    rating: 5,
    tag: 'Teacher Training Graduate'
  },
  {
    name: 'Amit & Radhika Deshmukh',
    role: 'Parents of Ananya (Age 5)',
    text: 'The teaching methodology is super interactive and full of fun actions. Ananya looks forward to every session! Her reading confidence has skyrocketed.',
    rating: 5,
    tag: 'Parent'
  }
];

export default function AayushPhonicsHub() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [selectedSound, setSelectedSound] = useState(PHONICS_GROUPS[0].sounds[0]);
  const [builtLetters, setBuiltLetters] = useState([]);
  const [blendedSuccess, setBlendedSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [targetAudienceTab, setTargetAudienceTab] = useState('kids'); // 'kids' or 'teachers'

  // Floating particle generator for background
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const generated = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.floor(Math.random() * 95),
      top: Math.floor(Math.random() * 90),
      size: Math.floor(Math.random() * 20) + 16,
      duration: Math.floor(Math.random() * 6) + 4,
      char: ['A', 'B', 'C', '⭐', '🎈', '🎨', '📚', '🌟', '🎵', '✨'][i % 10]
    }));
    setParticles(generated);
  }, []);

  const handleSoundClick = (soundObj) => {
    playTone(600, 'triangle');
    setSelectedSound(soundObj);
    speakSound(soundObj.sound);
  };

  const handleAddLetter = (char) => {
    playTone(440, 'sine');
    if (builtLetters.length < 5) {
      setBuiltLetters([...builtLetters, char.toUpperCase()]);
      setBlendedSuccess(false);
    }
  };

  const handleClearLetters = () => {
    playTone(300, 'sawtooth');
    setBuiltLetters([]);
    setBlendedSuccess(false);
  };

  const handleBlendWord = () => {
    if (builtLetters.length === 0) return;
    const wordStr = builtLetters.join('');
    playTone(880, 'sine');
    speakSound(wordStr);
    setBlendedSuccess(true);
  };

  const loadPresetWord = (preset) => {
    playTone(523, 'triangle');
    setBuiltLetters(preset.letters.map(l => l.toUpperCase()));
    setBlendedSuccess(true);
    speakSound(preset.word);
  };

  const toggleFaq = (index) => {
    playTone(400, 'sine');
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 via-sky-50/40 to-amber-50/60 text-slate-800 font-sans relative overflow-x-hidden">
      
      {/* Floating Child-Friendly Animated Background Characters */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute text-amber-400/30 font-black select-none animate-float"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              fontSize: `${p.size}px`,
              animationDuration: `${p.duration}s`,
            }}
          >
            {p.char}
          </div>
        ))}
      </div>

      {/* Top Banner Announcement */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-slate-950 px-4 py-2 text-center text-xs sm:text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-md relative z-10">
        <Sparkles className="w-4 h-4 text-amber-950 animate-spin" style={{ animationDuration: '4s' }} />
        <span>🌟 New Batches Starting Soon! Certified U.K. Synthetic Phonics & Teacher Certification</span>
        <a 
          href="tel:8369620982" 
          className="ml-2 underline hover:text-white transition-colors bg-slate-950/10 px-2 py-0.5 rounded-full text-xs font-black inline-flex items-center gap-1"
        >
          <span>Enquire Now</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-100/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand with Animated Badge */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-tr from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-amber-300/50 group-hover:scale-105 transition-transform animate-bounce-soft">
                AP
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center">
                <span className="w-2 h-2 bg-white rounded-full"></span>
              </div>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 block leading-tight font-heading group-hover:text-amber-600 transition-colors">
                Aayush's Phonics Hub
              </span>
              <span className="text-xs font-bold text-amber-600 tracking-widest uppercase block flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> By Rupali Kulkarni
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 font-bold text-slate-700 text-sm">
            <a href="#home" className="hover:text-amber-600 transition-colors py-1">Home</a>
            <a href="#sound-station" className="hover:text-amber-600 transition-colors py-1 flex items-center gap-1">
              <Volume2 className="w-4 h-4 text-amber-500" /> Sound Station
            </a>
            <a href="#word-builder" className="hover:text-amber-600 transition-colors py-1 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-purple-500" /> Magic Builder
            </a>
            <a href="#programs" className="hover:text-amber-600 transition-colors py-1">Programs</a>
            <a href="#teacher-training" className="hover:text-amber-600 transition-colors py-1">Teacher Training</a>
            <a href="#about" className="hover:text-amber-600 transition-colors py-1">Trainer</a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="https://wa.me/918369620982?text=Hello%20Rupali%20Maam,%20I%20am%20interested%20in%20Phonics%20Classes" 
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 text-sm hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <a 
              href="tel:8369620982" 
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-5 py-2.5 rounded-xl transition-all shadow-md shadow-amber-300/50 flex items-center gap-2 text-sm hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              <span>83696 20982</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => {
              playTone(500, 'sine');
              setMobileMenuOpen(!mobileMenuOpen);
            }} 
            className="md:hidden p-2.5 rounded-xl text-slate-700 bg-amber-100/70 hover:bg-amber-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-amber-100 px-5 pt-3 pb-6 space-y-3 shadow-xl animate-pop">
            <a 
              href="#home" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-slate-700 border-b border-slate-100"
            >
              🏠 Home
            </a>
            <a 
              href="#sound-station" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-slate-700 border-b border-slate-100"
            >
              🔊 Phonics Sound Station
            </a>
            <a 
              href="#word-builder" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-slate-700 border-b border-slate-100"
            >
              ✨ Magic Word Builder
            </a>
            <a 
              href="#programs" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-slate-700 border-b border-slate-100"
            >
              📖 Phonics Classes for Kids
            </a>
            <a 
              href="#teacher-training" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-slate-700 border-b border-slate-100"
            >
              🎓 Teacher Certification Course
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-slate-700 border-b border-slate-100"
            >
              👩‍🏫 About Rupali Kulkarni
            </a>
            <div className="pt-2 grid grid-cols-2 gap-3">
              <a 
                href="https://wa.me/918369620982?text=Hello%20Rupali%20Maam,%20I%20am%20interested%20in%20Phonics%20Classes" 
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <a 
                href="tel:8369620982" 
                className="bg-amber-500 text-slate-950 font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative py-12 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 text-amber-900 px-4 py-2 rounded-full text-xs sm:text-sm font-black border border-amber-300/60 shadow-sm">
                <Award className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Certified Trainer from Jolly Learning, U.K. 🇬🇧</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight font-heading">
                Today’s Reader, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 underline decoration-amber-400 decoration-wavy decoration-2">
                  Tomorrow’s Leader! 🌟
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Is your child finding reading difficult? Don't worry! We empower kids (ages 3+) to read and write fluently through structured <strong className="text-slate-900">U.K. Synthetic Phonics</strong> actions, songs, and playful multi-sensory tools!
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a 
                  href="#sound-station" 
                  onClick={() => playTone(600)}
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black px-8 py-4 rounded-2xl shadow-lg shadow-amber-400/30 hover:scale-105 transition-all flex items-center justify-center gap-2 group"
                >
                  <Volume2 className="w-5 h-5 text-slate-950 group-hover:animate-bounce" />
                  <span>Try Sound Station 🔊</span>
                </a>
                
                <a 
                  href="#programs" 
                  onClick={() => playTone(500)}
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 font-extrabold px-7 py-4 rounded-2xl shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5 text-amber-500" />
                  <span>Classes for Kids</span>
                </a>

                <a 
                  href="#teacher-training" 
                  onClick={() => playTone(500)}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-7 py-4 rounded-2xl shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-5 h-5 text-amber-400" />
                  <span>Teacher Training</span>
                </a>
              </div>

              {/* Quick Key Highlights */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-amber-200/60">
                <div className="bg-white/80 backdrop-blur p-3.5 rounded-2xl border border-amber-100 text-center lg:text-left shadow-sm">
                  <span className="block text-xl sm:text-2xl font-black text-amber-600 font-heading">Age 3+</span>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Early Learners</span>
                </div>
                <div className="bg-white/80 backdrop-blur p-3.5 rounded-2xl border border-amber-100 text-center lg:text-left shadow-sm">
                  <span className="block text-xl sm:text-2xl font-black text-sky-600 font-heading">42 Sounds</span>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">U.K. Phonics</span>
                </div>
                <div className="bg-white/80 backdrop-blur p-3.5 rounded-2xl border border-amber-100 text-center lg:text-left shadow-sm">
                  <span className="block text-xl sm:text-2xl font-black text-emerald-600 font-heading">100%</span>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Results Assured</span>
                </div>
              </div>

            </div>

            {/* Hero Right Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-300 via-orange-300 to-pink-300 rounded-3xl blur-2xl opacity-40 -z-10 animate-pulse-glow"></div>
              
              <div className="bg-white border-2 border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative">
                
                {/* Floating Mascot Badge */}
                <div className="absolute -top-6 -right-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-2xl font-black text-xs shadow-lg flex items-center gap-1.5 animate-bounce-soft">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Fun & Interactive!</span>
                </div>

                <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
                  <div className="w-14 h-14 bg-amber-400 text-slate-950 font-black rounded-2xl flex items-center justify-center text-2xl shadow-md">
                    🎨
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 font-heading">Why Kids Love Us</h3>
                    <p className="text-xs font-bold text-amber-600">Action & Story Based Learning</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-center gap-3.5 p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200/60 hover:bg-amber-100/80 transition-colors">
                    <div className="w-10 h-10 bg-amber-500 text-slate-950 font-black rounded-xl flex items-center justify-center shrink-0 shadow-sm font-heading">
                      1
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">42 Synthetic Sounds</h4>
                      <p className="text-xs text-slate-600">Letter sounds with memorable actions and stories.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 p-3.5 bg-sky-50/80 rounded-2xl border border-sky-200/60 hover:bg-sky-100/80 transition-colors">
                    <div className="w-10 h-10 bg-sky-500 text-white font-black rounded-xl flex items-center justify-center shrink-0 shadow-sm font-heading">
                      2
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">Blending & Segmenting</h4>
                      <p className="text-xs text-slate-600">Transforming single sounds into complete words effortlessly.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200/60 hover:bg-emerald-100/80 transition-colors">
                    <div className="w-10 h-10 bg-emerald-500 text-white font-black rounded-xl flex items-center justify-center shrink-0 shadow-sm font-heading">
                      3
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">Tricky Words & Dictation</h4>
                      <p className="text-xs text-slate-600">Mastering non-decodable words and sentence writing.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a 
                    href="tel:8369620982" 
                    onClick={() => playTone(700)}
                    className="w-full bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Ma'am Directly: 83696 20982</span>
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE PHONICS SOUND STATION */}
      <section id="sound-station" className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <span className="bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-amber-600" /> Interactive Demo
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading">
              Phonics Sound Station 🔊
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Click any sound tile below to hear it spoken and see the child action gesture!
            </p>
          </div>

          {/* Group Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
            {PHONICS_GROUPS.map((group, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playTone(450 + idx * 50);
                  setActiveGroupIndex(idx);
                  setSelectedSound(group.sounds[0]);
                }}
                className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm ${
                  activeGroupIndex === idx 
                    ? `${group.bgColor} text-slate-950 scale-105 shadow-md`
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{group.name}</span>
              </button>
            ))}
          </div>

          {/* Sound Grid & Detail Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-amber-50/80 via-white to-sky-50/80 p-6 sm:p-8 rounded-3xl border-2 border-amber-200 shadow-xl">
            
            {/* Grid of Buttons */}
            <div className="lg:col-span-7 grid grid-cols-3 sm:grid-cols-6 gap-3">
              {PHONICS_GROUPS[activeGroupIndex].sounds.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSoundClick(item)}
                  className={`p-4 rounded-2xl flex flex-col items-center justify-center border-2 transition-all transform hover:scale-110 active:scale-95 ${
                    selectedSound.sound === item.sound
                      ? 'bg-amber-400 border-amber-600 shadow-lg text-slate-950 scale-105'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-amber-400'
                  }`}
                >
                  <span className="text-3xl mb-1">{item.emoji}</span>
                  <span className="text-2xl font-black font-heading tracking-wider">{item.sound}</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">{item.example}</span>
                </button>
              ))}
            </div>

            {/* Active Sound Card Details */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border-2 border-amber-300 shadow-md space-y-4 text-center sm:text-left relative overflow-hidden animate-pop">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-600 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
                  Sound Action Card
                </span>
                <button 
                  onClick={() => speakSound(selectedSound.sound)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 p-2.5 rounded-xl transition-all flex items-center gap-1.5 text-xs font-black shadow-md hover:scale-105"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Replay Sound</span>
                </button>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-4">
                <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-orange-400 rounded-3xl flex items-center justify-center text-4xl shadow-lg text-slate-950 font-black font-heading animate-bounce-soft">
                  {selectedSound.sound}
                </div>
                <div>
                  <span className="text-4xl mb-1 block">{selectedSound.emoji}</span>
                  <h3 className="text-2xl font-black text-slate-900 font-heading">
                    "{selectedSound.sound}" as in <span className="text-amber-600">{selectedSound.example}</span>
                  </h3>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase block">Jolly Phonics Action Gesture:</span>
                <p className="text-sm font-extrabold text-slate-800">
                  👉 {selectedSound.action}
                </p>
              </div>

              <div className="text-xs text-slate-500 italic text-center sm:text-left">
                💡 Tip: Children learn best when repeating the sound 3 times while performing the action!
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* INTERACTIVE MAGIC WORD BUILDER MINI-GAME */}
      <section id="word-builder" className="py-16 bg-gradient-to-b from-sky-100/60 to-purple-100/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <span className="bg-purple-200 text-purple-950 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-700" /> Interactive Blending Game
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading">
              Magic Word Builder 🪄
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Try building and blending words! Click letter tiles to place them on the magic board.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-3xl border-4 border-purple-200 shadow-2xl space-y-8">
            
            {/* Preset Word Quick Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase mr-2">Try Preset Words:</span>
              {WORD_BUILDER_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => loadPresetWord(preset)}
                  className="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-900 font-extrabold rounded-xl border border-purple-200 text-xs transition-all hover:scale-105"
                >
                  {preset.word} {preset.meaning.slice(-2)}
                </button>
              ))}
            </div>

            {/* Word Display Board */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-8 rounded-3xl text-center shadow-inner relative overflow-hidden min-h-[140px] flex flex-col items-center justify-center">
              
              {blendedSuccess && (
                <div className="absolute top-2 right-4 bg-emerald-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black animate-bounce">
                  ✨ Excellent Blending! 🎉
                </div>
              )}

              {builtLetters.length === 0 ? (
                <p className="text-slate-400 text-sm italic">
                  Tap letter tiles below to build a word...
                </p>
              ) : (
                <div className="flex items-center justify-center gap-3 my-2">
                  {builtLetters.map((char, idx) => (
                    <div 
                      key={idx}
                      className="w-14 h-16 sm:w-16 sm:h-20 bg-amber-400 text-slate-950 font-black text-3xl sm:text-4xl rounded-2xl flex items-center justify-center shadow-lg border-2 border-amber-200 font-heading animate-pop"
                    >
                      {char}
                    </div>
                  ))}
                </div>
              )}

              {/* Action Control Buttons */}
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={handleBlendWord}
                  disabled={builtLetters.length === 0}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-slate-950 font-black rounded-xl text-sm shadow-md transition-all flex items-center gap-2 hover:scale-105"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Blend & Read Sound 🔊</span>
                </button>

                <button
                  onClick={handleClearLetters}
                  disabled={builtLetters.length === 0}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            {/* Letter Keyboard Tiles */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase block text-center">Tap Letters to Add:</span>
              <div className="flex flex-wrap justify-center gap-2">
                {['s','a','t','p','i','n','c','k','e','h','r','m','d','g','o','u','l','f','b'].map((char, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAddLetter(char)}
                    className="w-10 h-12 sm:w-12 sm:h-14 bg-slate-100 hover:bg-amber-300 text-slate-900 font-black text-lg sm:text-xl rounded-xl border-2 border-slate-200 hover:border-amber-400 shadow-sm transition-all hover:-translate-y-1 font-heading"
                  >
                    {char.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ABOUT TRAINER SECTION */}
      <section id="about" className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="bg-gradient-to-tr from-amber-400 to-orange-400 rounded-3xl p-8 shadow-2xl text-slate-950 space-y-6 relative overflow-hidden">
                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-5xl shadow-md mx-auto sm:mx-0">
                  👩‍🏫
                </div>
                <div>
                  <span className="bg-slate-950 text-amber-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                    UK Certified Trainer
                  </span>
                  <h3 className="text-3xl font-black mt-2 font-heading">Rupali Kulkarni</h3>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    Official Jolly Learning Phonics Trainer
                  </p>
                </div>
                <div className="space-y-2 text-xs font-bold text-slate-900 border-t border-amber-500/40 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-slate-950" />
                    <span>Certified from Jolly Learning, UK</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-slate-950" />
                    <span>Specialist in Early Childhood Literacy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-slate-950" />
                    <span>Trained 500+ Children & Educators</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-amber-600 font-black uppercase tracking-widest text-xs bg-amber-100 px-3 py-1 rounded-full">
                Trainer Methodology
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading">
                Dedicated to Building Confident Readers & Qualified Teachers
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Rupali Kulkarni brings years of expertise in child development and synthetic phonics instruction. Our framework does not restrict children by rigid age barriers—instead, instruction adapts to each child’s individual grasping capacity so they learn to read and write quickly and joyfully.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="font-black text-slate-900 text-base font-heading">For Children</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Fun story-driven sound introduction, blending exercises, and confidence building.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="font-black text-slate-900 text-base font-heading">For Teachers</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Complete pedagogical toolkit, lesson plans, physical training books, and UK certification option.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section id="programs" className="py-16 bg-slate-100/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div className="inline-flex p-1 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <button
                onClick={() => setTargetAudienceTab('kids')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                  targetAudienceTab === 'kids'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Children (Age 3+) 👶
              </button>
              <button
                onClick={() => setTargetAudienceTab('teachers')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                  targetAudienceTab === 'teachers'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Teacher Training 🎓
              </button>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading">
              {targetAudienceTab === 'kids' ? 'Phonics & Reading Programs' : 'Professional Teacher Certification'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {targetAudienceTab === 'kids' 
                ? 'Structured interactive batches designed for Jr.Kg, Sr.Kg, 1st & 2nd Std learners.'
                : 'Comprehensive course for aspiring educators, tutors, and mothers looking to start phonics centers.'}
            </p>
          </div>

          {targetAudienceTab === 'kids' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Level 1 Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-amber-300 relative space-y-6 hover:shadow-2xl transition-all">
                <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 px-4 py-1.5 rounded-bl-2xl font-black text-xs uppercase tracking-wider">
                  Level 1: Foundational
                </div>
                <div>
                  <span className="text-4xl mb-2 block">🌱</span>
                  <h3 className="text-2xl font-black text-slate-900 font-heading">Sound Fundamentals & Blending</h3>
                  <p className="text-xs font-bold text-amber-600 mt-1">Ideal for Jr.Kg & Sr.Kg (Age 3 to 5)</p>
                </div>

                <ul className="space-y-3 text-slate-700 text-sm">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>Learning 42 synthetic phonics letter sounds</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>Blending 3-letter CVC words (cat, dog, pin)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>Sound segmenting & oral dictation skills</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>Introduction to essential tricky words</span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">2 Days / Week • 1 Hr Session</span>
                  <a 
                    href="tel:8369620982" 
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all shadow-sm"
                  >
                    Enroll Child
                  </a>
                </div>
              </div>

              {/* Level 2 Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-sky-300 relative space-y-6 hover:shadow-2xl transition-all">
                <div className="absolute top-0 right-0 bg-sky-500 text-white px-4 py-1.5 rounded-bl-2xl font-black text-xs uppercase tracking-wider">
                  Level 2: Advanced
                </div>
                <div>
                  <span className="text-4xl mb-2 block">🚀</span>
                  <h3 className="text-2xl font-black text-slate-900 font-heading">Digraphs & Sentence Reading</h3>
                  <p className="text-xs font-bold text-sky-600 mt-1">Ideal for 1st & 2nd Std (Age 5+)</p>
                </div>

                <ul className="space-y-3 text-slate-700 text-sm">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-sky-500 shrink-0" />
                    <span>Advanced vowel digraphs & alternative spellings</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-sky-500 shrink-0" />
                    <span>Consonant blends (st, bl, dr, tr)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-sky-500 shrink-0" />
                    <span>Reading full story sentences & comprehension</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-sky-500 shrink-0" />
                    <span>Spelling rules & dictation mastery</span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">2 Days / Week • 1 Hr Session</span>
                  <a 
                    href="tel:8369620982" 
                    className="bg-sky-500 hover:bg-sky-600 text-white font-black px-4 py-2 rounded-xl text-xs transition-all shadow-sm"
                  >
                    Enroll Child
                  </a>
                </div>
              </div>

            </div>
          ) : (
            /* Teacher Training Section Cards */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              
              {/* Certification Package */}
              <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl border-4 border-amber-400 relative space-y-6">
                <div className="absolute -top-4 right-6 bg-amber-400 text-slate-950 px-4 py-1 rounded-full text-xs font-black uppercase">
                  Most Popular Choice
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white font-heading">With Certification</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-5xl font-black text-amber-400 font-heading">₹7,000</span>
                    <span className="text-slate-400 text-xs">all-inclusive</span>
                  </div>
                </div>

                <ul className="space-y-3 text-slate-300 text-sm">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>Full soft copy of lecture modules & notes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>1 Physical Teacher Training Book included</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>Official Course Completion Certificate</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>Guidance on setting up your own Phonics center</span>
                  </li>
                </ul>

                <a 
                  href="tel:8369620982" 
                  className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  <span>Register for Certified Course</span>
                </a>
              </div>

              {/* Standard Package */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 font-heading">Without Certification</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-5xl font-black text-slate-900 font-heading">₹5,000</span>
                    <span className="text-slate-500 text-xs">standard package</span>
                  </div>
                </div>

                <ul className="space-y-3 text-slate-600 text-sm">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Full soft copy of lecture modules & notes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>1 Physical Teacher Training Book included</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-400 line-through">
                    <span className="w-5 h-5 text-slate-400 text-center font-bold">×</span>
                    <span>No completion certificate</span>
                  </li>
                </ul>

                <a 
                  href="tel:8369620982" 
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Register Standard Course</span>
                </a>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* TEACHER TRAINING SYLLABUS SECTION */}
      <section id="teacher-training" className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="bg-amber-400 text-slate-950 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              Comprehensive Syllabus
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-heading">
              Phonics Teacher Training Course Curriculum
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Learn the exact UK synthetic phonics mechanics to teach early learners effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-slate-800/90 border border-slate-700 p-8 rounded-3xl space-y-4 hover:border-amber-400 transition-colors">
              <div className="w-12 h-12 bg-amber-400 text-slate-950 font-black rounded-2xl flex items-center justify-center text-xl shadow-md">
                📖
              </div>
              <h3 className="text-xl font-bold text-white font-heading">1. Foundation & Mechanics</h3>
              <ul className="text-slate-300 text-xs space-y-2 leading-relaxed">
                <li>• What is Phonics & Synthetic Phonics?</li>
                <li>• Why children need structured phonics</li>
                <li>• Mastering all 44 sounds, vowels & consonants</li>
                <li>• Blends, Digraphs, & Trigraphs</li>
              </ul>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 p-8 rounded-3xl space-y-4 hover:border-amber-400 transition-colors">
              <div className="w-12 h-12 bg-amber-400 text-slate-950 font-black rounded-2xl flex items-center justify-center text-xl shadow-md">
                ✏️
              </div>
              <h3 className="text-xl font-bold text-white font-heading">2. Blending & Spelling Rules</h3>
              <ul className="text-slate-300 text-xs space-y-2 leading-relaxed">
                <li>• Pre-reading sound awareness</li>
                <li>• CVC words & tricky word strategies</li>
                <li>• Phonics spelling rules & dictation</li>
                <li>• Teaching without rigid level barriers</li>
              </ul>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 p-8 rounded-3xl space-y-4 hover:border-amber-400 transition-colors">
              <div className="w-12 h-12 bg-amber-400 text-slate-950 font-black rounded-2xl flex items-center justify-center text-xl shadow-md">
                💡
              </div>
              <h3 className="text-xl font-bold text-white font-heading">3. Teaching & Classroom Setup</h3>
              <ul className="text-slate-300 text-xs space-y-2 leading-relaxed">
                <li>• Interactive storytelling techniques</li>
                <li>• Spell writing & reading fluency training</li>
                <li>• Early childhood grammar integration</li>
                <li>• How to launch your own local phonics class</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* PARENT & TEACHER TESTIMONIALS */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="bg-emerald-100 text-emerald-900 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              Reviews & Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading">
              Loved by Parents & Educators ❤️
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-4 relative hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "{item.text}"
                </p>
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="font-black text-slate-900 text-sm">{item.name}</h4>
                  <span className="text-xs font-bold text-amber-600 block">{item.role}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) */}
      <section className="py-16 bg-slate-100 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-3 mb-10">
            <span className="bg-sky-100 text-sky-900 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1">
              <HelpCircle className="w-4 h-4 text-sky-600" /> Clarifications
            </span>
            <h2 className="text-3xl font-black text-slate-900 font-heading">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "At what age can my child join phonics classes?",
                a: "Children can start as early as age 3+ (Jr.Kg level). Synthetic phonics introduces sounds through actions, songs, and visual cards suited for young early learners."
              },
              {
                q: "Are online classes available?",
                a: "Yes! We offer both local offline society classes as well as interactive live online batches."
              },
              {
                q: "What is included in the Teacher Training Course?",
                a: "The Teacher Training course includes soft copy notes, 1 physical Teacher Training book, complete breakdown of 44 sounds, blending mechanics, dictation rules, and an optional UK certificate."
              },
              {
                q: "How fast will my child start reading?",
                a: "Most children start blending basic 3-letter words (CVC words like cat, pin, sun) within the first 4 to 6 weeks of regular sessions."
              }
            ].map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-black text-slate-900 text-base flex items-center justify-between hover:bg-amber-50/50"
                >
                  <span>{faq.q}</span>
                  <span className="text-amber-500 font-bold text-xl ml-2">
                    {activeFaq === idx ? '−' : '+'}
                  </span>
                </button>

                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-slate-600 text-sm border-t border-slate-100 pt-3 animate-pop">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER & CONTACT LOCATION */}
      <footer id="contact" className="bg-slate-950 text-white py-16 border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-slate-800">
            
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-white font-heading">
                Aayush's Phonics Hub
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Official Certified Trainer from Jolly Learning, UK. Empowering young children to read and write with joy, and training educators with world-class methodologies.
              </p>
              <p className="text-amber-400 font-black italic text-sm">
                Today’s Reader, Tomorrow’s Leader! 📖🌟
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-white text-lg font-heading">Venue & Location</h4>
              <p className="text-slate-400 text-sm flex items-start gap-2 leading-relaxed">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                <span>Kipl Morya, Shop No. 6, Opp. Euro School • Available in society & local areas (Online classes also available).</span>
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-white text-lg font-heading">Direct Contact</h4>
              <p className="text-slate-400 text-sm flex items-center gap-2">
                <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                <a href="tel:8369620982" className="hover:text-amber-400 font-black text-white text-lg transition-colors">
                  83696 20982
                </a>
              </p>
              <div className="pt-2">
                <a 
                  href="https://wa.me/918369620982?text=Hello%20Rupali%20Maam,%20I%20am%20interested%20in%20Phonics%20Classes"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black px-4 py-2.5 rounded-xl text-xs transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send WhatsApp Inquiry</span>
                </a>
              </div>
            </div>

          </div>

          <div className="pt-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>&copy; {new Date().getFullYear()} Aayush's Phonics Hub (Rupali Kulkarni). All rights reserved.</p>
            <p>Certified Jolly Learning UK Trainer</p>
          </div>

        </div>
      </footer>

      {/* FLOATING QUICK WHATSAPP INQUIRY BUTTON */}
      <a 
        href="https://wa.me/918369620982?text=Hello%20Rupali%20Maam,%20I%20am%20interested%20in%20Phonics%20Classes"
        target="_blank"
        rel="noreferrer"
        onClick={() => playTone(800)}
        className="fixed bottom-6 right-6 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl z-50 flex items-center justify-center hover:scale-110 transition-all animate-bounce-soft border-2 border-white"
        title="WhatsApp Direct Inquiry"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

    </div>
  );
}