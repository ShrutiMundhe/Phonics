import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
  Phone, 
  MapPin, 
  CheckCircle, 
  GraduationCap, 
  Star, 
  Menu, 
  X, 
  ChevronLeft,
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
  ArrowUp,
  Sun,
  BookOpen,
  Bug,
  Target,
  Droplets,
  Flame,
  Plane,
  Cat,
  Egg,
  Dog,
  Utensils,
  Music,
  Waves,
  Umbrella,
  Fish,
  CloudRain,
  Ship,
  Trees,
  UserCheck,
  Wand2,
  Baby,
  Sprout,
  Rocket,
  Feather,
  Lightbulb,
  Palette,
  Pin
} from 'lucide-react';

// Official WhatsApp SVG Icon Component
const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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

// 42 Synthetic Phonics Sounds Dataset with Vector Icons
const PHONICS_GROUPS = [
  {
    name: 'Group 1: Basic Sounds',
    color: 'from-amber-400 to-orange-400',
    bgColor: 'bg-amber-500',
    sounds: [
      { sound: 's', action: 'Weave hand like a snake', example: 'Sun', Icon: Bug, iconColor: 'text-emerald-500', word: 'snake' },
      { sound: 'a', action: 'Wiggle fingers on arm like ants', example: 'Ant', Icon: Bug, iconColor: 'text-amber-600', word: 'ant' },
      { sound: 't', action: 'Turn head side to side like tennis', example: 'Tennis', Icon: Target, iconColor: 'text-sky-500', word: 'tennis' },
      { sound: 'i', action: 'Wiggle nose like mouse whiskers', example: 'Ink', Icon: Droplets, iconColor: 'text-indigo-500', word: 'ink' },
      { sound: 'p', action: 'Puff out birthday candle', example: 'Puff', Icon: Flame, iconColor: 'text-orange-500', word: 'puff' },
      { sound: 'n', action: 'Hold arms out like an airplane', example: 'Net', Icon: Plane, iconColor: 'text-blue-500', word: 'net' },
    ]
  },
  {
    name: 'Group 2: Secondary Blends',
    color: 'from-sky-400 to-blue-500',
    bgColor: 'bg-sky-500',
    sounds: [
      { sound: 'ck', action: 'Raise hands like playing castanets', example: 'Cat', Icon: Cat, iconColor: 'text-amber-500', word: 'cat' },
      { sound: 'e', action: 'Pretend to crack an egg shell', example: 'Egg', Icon: Egg, iconColor: 'text-yellow-500', word: 'egg' },
      { sound: 'h', action: 'Puff out hand like breathing hot air', example: 'Hat', Icon: Sparkles, iconColor: 'text-purple-500', word: 'hat' },
      { sound: 'r', action: 'Pretend to be a puppy shaking a rag', example: 'Rat', Icon: Dog, iconColor: 'text-amber-700', word: 'rag' },
      { sound: 'm', action: 'Rub tummy saying mmmmm', example: 'Meal', Icon: Utensils, iconColor: 'text-rose-500', word: 'yummy' },
      { sound: 'd', action: 'Beat hands up & down like a drum', example: 'Drum', Icon: Music, iconColor: 'text-red-500', word: 'drum' },
    ]
  },
  {
    name: 'Group 3: Vowels & Digraphs',
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-500',
    sounds: [
      { sound: 'g', action: 'Spiral hand down like water gurgling', example: 'Gate', Icon: Waves, iconColor: 'text-cyan-500', word: 'gurgle' },
      { sound: 'o', action: 'Turn light switch on and off', example: 'Orange', Icon: Sun, iconColor: 'text-amber-500', word: 'orange' },
      { sound: 'u', action: 'Put up an umbrella', example: 'Umbrella', Icon: Umbrella, iconColor: 'text-sky-500', word: 'umbrella' },
      { sound: 'l', action: 'Lick a lollipop', example: 'Lollipop', Icon: Heart, iconColor: 'text-pink-500', word: 'lollipop' },
      { sound: 'f', action: 'Let air out of an inflatable fish', example: 'Fish', Icon: Fish, iconColor: 'text-teal-500', word: 'fish' },
      { sound: 'b', action: 'Hit ball with a bat', example: 'Bat', Icon: Target, iconColor: 'text-amber-600', word: 'ball' },
    ]
  },
  {
    name: 'Group 4: Advanced Digraphs',
    color: 'from-purple-400 to-pink-500',
    bgColor: 'bg-purple-500',
    sounds: [
      { sound: 'ai', action: 'Cup hand over ear saying ai?', example: 'Rain', Icon: CloudRain, iconColor: 'text-blue-400', word: 'rain' },
      { sound: 'j', action: 'Jelly wiggling on a plate', example: 'Jelly', Icon: Sparkles, iconColor: 'text-purple-400', word: 'jelly' },
      { sound: 'oa', action: 'Bring hands to mouth like boat horn', example: 'Boat', Icon: Ship, iconColor: 'text-sky-600', word: 'boat' },
      { sound: 'ie', action: 'Salute like a captain saying ie-ie!', example: 'Tie', Icon: UserCheck, iconColor: 'text-indigo-500', word: 'tie' },
      { sound: 'ee', action: 'Put hands on head like donkey ears', example: 'Tree', Icon: Trees, iconColor: 'text-emerald-600', word: 'tree' },
      { sound: 'or', action: 'Donkey flaps ears back saying or!', example: 'Fork', Icon: Utensils, iconColor: 'text-slate-600', word: 'fork' },
    ]
  }
];

// Sample Words for the Interactive Word Builder
const WORD_BUILDER_PRESETS = [
  { word: 'CAT', letters: ['c', 'a', 't'], meaning: 'A friendly feline pet', Icon: Cat },
  { word: 'SUN', letters: ['s', 'u', 'n'], meaning: 'Bright star in the sky', Icon: Sun },
  { word: 'PIN', letters: ['p', 'i', 'n'], meaning: 'Small pointy fastener', Icon: Pin },
  { word: 'DOG', letters: ['d', 'o', 'g'], meaning: 'Loyal puppy pal', Icon: Dog },
  { word: 'HAT', letters: ['h', 'a', 't'], meaning: 'Wear it on your head', Icon: Sparkles }
];

// Complete 9-Level Phonics & Literacy Progression
const PHONICS_LEVELS = [
  {
    level: 'Level 1',
    title: '🟢 Phonics Foundation',
    badge: 'For beginners',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    color: 'emerald',
    borderColor: 'border-emerald-300',
    accentBg: 'bg-emerald-500',
    textColor: 'text-emerald-600',
    goal: 'Build sound awareness, 42 basic sounds, oral blending & segmenting',
    points: [
      'Sounds: Introduction to phonics, 42 basic letter sounds, correct pronunciation & letter formation (capital & small)',
      'Reading: Oral blending, 2–3 sound words, CVC words (cat, dog, pin, sun), segmenting & reading simple words',
      'Writing: Sound-to-letter writing, simple word dictation & correct letter formation',
      'Vocabulary: Basic everyday vocabulary, picture-word association & rhyming words'
    ]
  },
  {
    level: 'Level 2',
    title: '🟡 Blending & Reading',
    badge: 'Reading Confidence',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    color: 'amber',
    borderColor: 'border-amber-300',
    accentBg: 'bg-amber-500',
    textColor: 'text-amber-600',
    goal: 'Building reading confidence & blending CVC/CCVC words',
    points: [
      'Revision of 42 sounds, CVC and CVCC words',
      'CCVC words: stop, frog, clap & consonant blends (beginning & ending)',
      'Digraphs & reading simple sentences',
      'Spelling simple words, dictation & tricky sight-word recognition',
      'Basic punctuation: Capital letters and full stops'
    ]
  },
  {
    level: 'Level 3',
    title: '🟠 Digraphs & Advanced Phonics',
    badge: 'Digraphs & Vowels',
    badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
    color: 'orange',
    borderColor: 'border-orange-300',
    accentBg: 'bg-orange-500',
    textColor: 'text-orange-600',
    goal: 'Master vowel digraphs, silent letters & multi-syllable reading',
    points: [
      'Vowel Digraphs: ai, ay, ee, ea, oa, ow, oi, oy, ou, ow, oo, ar, or, er, ir, ur, au, aw',
      'Consonant Patterns: sh, ch, th, ng, qu, ck, wh, ph',
      'Silent letters & alternative spelling patterns',
      'Reading longer words, two-syllable words, decodable sentences & short stories'
    ]
  },
  {
    level: 'Level 4',
    title: '🔵 Alternative Spellings',
    badge: 'Spelling Choice',
    badgeBg: 'bg-sky-100 text-sky-900 border-sky-300',
    color: 'sky',
    borderColor: 'border-sky-300',
    accentBg: 'bg-sky-500',
    textColor: 'text-sky-600',
    goal: 'Learn that one sound can have different spellings (Jolly Readers 2)',
    points: [
      '/ai/ → ai, ay, a_e | /ee/ → ee, ea, e_e, y | /oa/ → oa, ow, o_e',
      '/ie/ → ie, igh, i_e, y | /ue/ → ue, ew, u_e | /er/ → er, ir, ur | /oi/ → oi, oy | /ou/ → ou, ow',
      'Skills: Choosing correct spelling & reading unfamiliar words',
      'Spelling from dictation, word families, homophones & reading comprehension'
    ]
  },
  {
    level: 'Level 5',
    title: '🟣 Advanced Phonics & Spelling',
    badge: 'Spelling Rules',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
    color: 'purple',
    borderColor: 'border-purple-300',
    accentBg: 'bg-purple-500',
    textColor: 'text-purple-600',
    goal: 'Complex vowel patterns, Magic E, prefixes & multi-syllable words',
    points: [
      'Complex vowel patterns, silent letters & Split Digraphs / Magic E',
      'Common spelling rules, double consonants, prefixes & suffixes',
      'Compound words, 2- & 3-syllable words, homophones & dictionary skills',
      'Reading short paragraphs, story reading & text comprehension questions'
    ]
  },
  {
    level: 'Level 6',
    title: '🔴 Reading, Spelling & Grammar',
    badge: 'Literacy & Grammar',
    badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
    color: 'rose',
    borderColor: 'border-rose-300',
    accentBg: 'bg-rose-500',
    textColor: 'text-rose-600',
    goal: 'Move beyond basic phonics into strong literacy & grammar skills',
    points: [
      'Spelling: Advanced patterns, prefixes & suffixes, irregular spellings, word roots & silent letters',
      'Grammar: Nouns, pronouns, verbs, adjectives, adverbs, articles, prepositions, conjunctions, singular/plural & tenses',
      'Writing: Sentence formation, paragraph writing, creative writing & story writing'
    ]
  },
  {
    level: 'Level 7',
    title: '📚 Grammar & Literacy 1',
    badge: 'Post-Phonics',
    badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    color: 'indigo',
    borderColor: 'border-indigo-300',
    accentBg: 'bg-indigo-500',
    textColor: 'text-indigo-600',
    goal: 'First-year Spelling, Grammar & Punctuation programme',
    points: [
      'Vowel digraphs, alternative vowel spellings, plurals & consonant blends',
      'Common & proper nouns, pronouns, verbs & tenses (present/past/future)',
      'Adjectives, adverbs, articles (a/an/the) & alphabetical order',
      'Capital letters, full stops, speech marks & tricky word rules'
    ]
  },
  {
    level: 'Level 8',
    title: '📖 Advanced Grammar & Writing',
    badge: 'Advanced Writing',
    badgeBg: 'bg-teal-100 text-teal-900 border-teal-300',
    color: 'teal',
    borderColor: 'border-teal-300',
    accentBg: 'bg-teal-500',
    textColor: 'text-teal-600',
    goal: 'Sentence types, clauses, paragraph building & creative writing',
    points: [
      'Sentence types: Statements, questions, commands & exclamations',
      'Conjunctions, prepositions, comparatives & superlatives',
      'Syllables, advanced spelling patterns & paragraph structure',
      'Past/present continuous, subject & object, collective nouns, comprehension & creative writing'
    ]
  },
  {
    level: 'Level 9',
    title: '⭐ Advanced Literacy',
    badge: 'Mastery Level',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-400',
    color: 'amber',
    borderColor: 'border-amber-400',
    accentBg: 'bg-amber-500',
    textColor: 'text-amber-600',
    goal: 'Complex syntax, tenses, idioms, formal/informal language & essays',
    points: [
      'Complex sentence structures & clauses (independent/dependent)',
      'Tenses, infinitives, possessive nouns, abstract/concrete nouns & irregular plurals',
      'Prefixes & suffixes, synonyms & antonyms, idioms & formal/informal language',
      'Advanced punctuation, paragraph development, reading comprehension & essay/story writing'
    ]
  }
];

// Parent Reviews & Real Testimonials from WhatsApp
const TESTIMONIALS = [
  {
    name: 'Shilpa P',
    role: 'Parent of Shubh',
    text: 'Hi, I have seen lot of changes in Shubh, he has started reading small small words and applies all rules while reading. Also more than reading, writing part has been improved, I can see a drastic change in Shubh writing spellings... All thanks to you Rupali Ma\'am... will be continuing for next month also!',
    rating: 5,
    tag: 'Verified WhatsApp Review'
  },
  {
    name: 'Bharati Firke',
    role: 'Parent of Arnav',
    text: 'Your manner of teaching is so wonderful and refreshing!! She is patient and supportive, and knows how to motivate her students. She’s great at teaching. I highly recommend her as I am very much happy with my Son\'s progress.. Arnav enjoys reading since joining phonic class. Thank you Rupali Mam!',
    rating: 5,
    tag: 'Verified WhatsApp Review'
  },
  {
    name: 'Dipali',
    role: 'Parent of Shreya',
    text: 'Shreya started almost 3 month back and I seen tremendous improvement in her. She enjoys her study especially reading. To be honest, what I most loved is your dedication. You are not at all money minded, you involve in each student whole heartedly and that’s the striking point for me. Thank you thank you Rupali for giving efforts on Shreya!',
    rating: 5,
    tag: 'Verified WhatsApp Review'
  },
  {
    name: 'Sharvari',
    role: 'Parent of Shashwat',
    text: 'Shashwat\'s concentration & interest towards learning has improved. Phonics sessions are very useful to Shashwat. We liked your approach towards Shashwat. We are very thankful to you for your efforts to improve Shashwat!',
    rating: 5,
    tag: 'Verified WhatsApp Review'
  },
  {
    name: 'Vedhika Pratap P',
    role: 'Parent of Vedhika',
    text: 'Hi Rupali, we have been seeing a lot of improvement in Vedhika\'s reading. I must especially mention her improvement in writing spellings too. Her interest in reading has also improved.',
    rating: 5,
    tag: 'Verified WhatsApp Review'
  },
  {
    name: 'Ishan Churi P',
    role: 'Parent of Ishan',
    text: 'Hi, even in Ishan we can see a lot of improvement... basically it is building his confidence. Now he voluntarily tries to read things for which previously he was reluctant. Now we don\'t have to force him to practice reading!',
    rating: 5,
    tag: 'Verified WhatsApp Review'
  },
  {
    name: 'Vidula Kulkarni',
    role: 'Parent of Aarya',
    text: 'Thank you very much for being such a good teacher to my child... Aarya loves the way you are teaching and enjoying your class. Thanks for all your great lessons!',
    rating: 5,
    tag: 'Verified WhatsApp Review'
  },
  {
    name: 'Aashu K',
    role: 'Parent of Sanika',
    text: 'Sanika eagerly waited and is enjoying your class.. You are a great teacher!',
    rating: 5,
    tag: 'Verified WhatsApp Review'
  },
  {
    name: 'Shrevya\'s Parent',
    role: 'Parent of Shrevya',
    text: 'Shrevya has started reading small words. Also she has developed into a confident reader. Thank you for being such an important part in our child\'s development.',
    rating: 5,
    tag: 'Verified WhatsApp Review'
  },
  {
    name: 'Katyayani Mudia P',
    role: 'Parent of Katyayani',
    text: 'Yes, I can see improvement in Katyayani! She is very clear about the sounds now and started reading two or three letter words. I\'m very happy with the way you take efforts with each child.',
    rating: 5,
    tag: 'Verified WhatsApp Review'
  },
  {
    name: 'Megha P',
    role: 'Parent of Trisha',
    text: 'Ya, can see very positive improvement in Trisha... As now she knows the sounds and rules of phonics, she tries to apply it and is very eager to read as she finds it easier. You always make sure that each and every kid gets the chance to answer!',
    rating: 5,
    tag: 'Verified WhatsApp Review'
  },
  {
    name: 'Advay Vele P',
    role: 'Parent of Advay',
    text: 'Totally! I see great improvement in Advay when it comes to the reading part. Thank you Rupali Ma\'am for your guidance and dedicated effort with every child!',
    rating: 5,
    tag: 'Verified WhatsApp Review'
  }
];

// Visual illustration card renderer for pathway levels
const renderLevelVisual = (levelIndex) => {
  switch(levelIndex) {
    case 0:
      return (
        <div className="bg-gradient-to-tr from-emerald-400 to-teal-500 p-6 rounded-3xl text-slate-950 shadow-xl border-2 border-emerald-200 relative overflow-hidden space-y-3">
          <div className="flex items-center justify-between">
            <span className="bg-slate-950 text-emerald-400 text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">Level 1 Demo</span>
            <Volume2 className="w-6 h-6 text-slate-950 animate-bounce-soft shrink-0" />
          </div>
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl space-y-2 border border-white/60">
            <div className="flex items-center justify-around font-black text-xs sm:text-sm">
              <span className="bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-xl border border-emerald-300">👂 42 Sounds</span>
              <span className="text-emerald-500 font-bold">➔</span>
              <span className="bg-teal-100 text-teal-900 px-3 py-1.5 rounded-xl border border-teal-300">🎵 Blending</span>
            </div>
            <p className="text-xs font-extrabold text-slate-800 text-center pt-1">
              Oral Blending: <span className="underline decoration-emerald-500 font-black text-slate-900">/c/ + /a/ + /t/ = CAT 🐱</span>
            </p>
          </div>
        </div>
      );
    case 1:
      return (
        <div className="bg-gradient-to-tr from-amber-400 to-orange-400 p-6 rounded-3xl text-slate-950 shadow-xl border-2 border-amber-200 relative overflow-hidden space-y-3">
          <div className="flex items-center justify-between">
            <span className="bg-slate-950 text-amber-400 text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">Level 2 Demo</span>
            <Sparkles className="w-6 h-6 text-slate-950 animate-bounce-soft shrink-0" />
          </div>
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl space-y-2 border border-white/60">
            <div className="flex items-center justify-center gap-2 font-black text-xs">
              <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-xl border border-amber-300">stop 🛑</span>
              <span className="bg-orange-100 text-orange-900 px-2.5 py-1 rounded-xl border border-orange-300">frog 🐸</span>
              <span className="bg-yellow-100 text-yellow-900 px-2.5 py-1 rounded-xl border border-yellow-300">clap 👏</span>
            </div>
            <p className="text-xs font-extrabold text-slate-800 text-center pt-1">
              CCVC & CVCC Words + Sight Words 📖
            </p>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="bg-gradient-to-tr from-orange-400 to-amber-500 p-6 rounded-3xl text-slate-950 shadow-xl border-2 border-orange-200 relative overflow-hidden space-y-3">
          <div className="flex items-center justify-between">
            <span className="bg-slate-950 text-orange-400 text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">Level 3 Demo</span>
            <Zap className="w-6 h-6 text-slate-950 animate-bounce-soft shrink-0" />
          </div>
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl space-y-2 border border-white/60">
            <div className="grid grid-cols-2 gap-2 text-xs font-black">
              <span className="bg-orange-100 text-orange-900 p-2 rounded-xl border border-orange-200 text-center">ai / ay ➔ Rain 🌧️</span>
              <span className="bg-amber-100 text-amber-900 p-2 rounded-xl border border-amber-200 text-center">ee / ea ➔ Tree 🌳</span>
              <span className="bg-yellow-100 text-yellow-900 p-2 rounded-xl border border-yellow-200 text-center">oa / ow ➔ Boat ⛵</span>
              <span className="bg-orange-100 text-orange-900 p-2 rounded-xl border border-orange-200 text-center">oi / oy ➔ Toy 🧸</span>
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="bg-gradient-to-tr from-sky-400 to-blue-500 p-6 rounded-3xl text-white shadow-xl border-2 border-sky-200 relative overflow-hidden space-y-3">
          <div className="flex items-center justify-between">
            <span className="bg-slate-950 text-sky-300 text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">Level 4 Demo</span>
            <Sparkles className="w-6 h-6 text-amber-300 animate-bounce-soft shrink-0" />
          </div>
          <div className="bg-white/95 backdrop-blur-md text-slate-900 p-4 rounded-2xl space-y-2 border border-white/60 text-center">
            <span className="bg-sky-100 text-sky-900 px-3 py-1 rounded-full text-xs font-black inline-block">Alternative Spellings ✨</span>
            <p className="text-xs font-extrabold text-slate-800 pt-1">
              /ai/ ➔ <span className="text-sky-600 font-black">ai, ay, a_e</span> | /ee/ ➔ <span className="text-sky-600 font-black">ee, ea, e_e, y</span>
            </p>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="bg-gradient-to-tr from-purple-400 to-indigo-500 p-6 rounded-3xl text-white shadow-xl border-2 border-purple-200 relative overflow-hidden space-y-3">
          <div className="flex items-center justify-between">
            <span className="bg-slate-950 text-purple-300 text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">Level 5 Demo</span>
            <Wand2 className="w-6 h-6 text-amber-300 animate-bounce-soft shrink-0" />
          </div>
          <div className="bg-white/95 backdrop-blur-md text-slate-900 p-4 rounded-2xl space-y-2 border border-white/60 text-center">
            <span className="bg-purple-100 text-purple-900 px-3 py-1 rounded-full text-xs font-black inline-block">Magic "E" & Prefixes ✨</span>
            <p className="text-xs font-extrabold text-slate-800 pt-1">
              hop ➔ <span className="text-purple-600 font-black">hope</span> | cap ➔ <span className="text-purple-600 font-black">cape</span>
            </p>
          </div>
        </div>
      );
    case 5:
      return (
        <div className="bg-gradient-to-tr from-rose-400 to-pink-500 p-6 rounded-3xl text-white shadow-xl border-2 border-rose-200 relative overflow-hidden space-y-3">
          <div className="flex items-center justify-between">
            <span className="bg-slate-950 text-rose-300 text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">Level 6 Demo</span>
            <BookOpen className="w-6 h-6 text-amber-300 animate-bounce-soft shrink-0" />
          </div>
          <div className="bg-white/95 backdrop-blur-md text-slate-900 p-4 rounded-2xl space-y-2 border border-white/60">
            <div className="grid grid-cols-2 gap-2 text-xs font-black">
              <span className="bg-rose-100 text-rose-900 p-2 rounded-xl border border-rose-200 text-center">Nouns & Verbs 📝</span>
              <span className="bg-pink-100 text-pink-900 p-2 rounded-xl border border-pink-200 text-center">Adjectives ✨</span>
              <span className="bg-rose-100 text-rose-900 p-2 rounded-xl border border-rose-200 text-center">Tenses & Plurals ⏳</span>
              <span className="bg-pink-100 text-pink-900 p-2 rounded-xl border border-pink-200 text-center">Creative Writing ✍️</span>
            </div>
          </div>
        </div>
      );
    case 6:
      return (
        <div className="bg-gradient-to-tr from-indigo-500 to-purple-600 p-6 rounded-3xl text-white shadow-xl border-2 border-indigo-200 relative overflow-hidden space-y-3">
          <div className="flex items-center justify-between">
            <span className="bg-slate-950 text-indigo-300 text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">Level 7 Demo</span>
            <Star className="w-6 h-6 text-amber-300 fill-amber-300 animate-bounce-soft shrink-0" />
          </div>
          <div className="bg-white/95 backdrop-blur-md text-slate-900 p-4 rounded-2xl space-y-2 border border-white/60 text-center">
            <span className="bg-indigo-100 text-indigo-900 px-3 py-1 rounded-full text-xs font-black inline-block">Speech Marks & Rules 💬</span>
            <p className="text-xs font-extrabold text-slate-800 pt-1">
              "The cat sat," said Tim. 📖
            </p>
          </div>
        </div>
      );
    case 7:
      return (
        <div className="bg-gradient-to-tr from-teal-400 to-emerald-600 p-6 rounded-3xl text-white shadow-xl border-2 border-teal-200 relative overflow-hidden space-y-3">
          <div className="flex items-center justify-between">
            <span className="bg-slate-950 text-teal-300 text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">Level 8 Demo</span>
            <Award className="w-6 h-6 text-amber-300 animate-bounce-soft shrink-0" />
          </div>
          <div className="bg-white/95 backdrop-blur-md text-slate-900 p-4 rounded-2xl space-y-2 border border-white/60 text-center">
            <p className="text-xs font-black text-slate-800 italic">
              Statements • Questions • Commands • Exclamations
            </p>
            <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase inline-block">
              Paragraph & Story Writing ✍️
            </span>
          </div>
        </div>
      );
    case 8:
    default:
      return (
        <div className="bg-gradient-to-tr from-amber-400 to-yellow-500 p-6 rounded-3xl text-slate-950 shadow-xl border-2 border-amber-200 relative overflow-hidden space-y-3">
          <div className="flex items-center justify-between">
            <span className="bg-slate-950 text-amber-400 text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">Level 9 Demo</span>
            <Award className="w-6 h-6 text-slate-950 animate-bounce-soft shrink-0" />
          </div>
          <div className="bg-white/95 backdrop-blur-md text-slate-900 p-4 rounded-2xl space-y-2 border border-white/60 text-center">
            <p className="text-xs font-black text-slate-800 italic">
              "Complex Clauses, Idioms & Advanced Essays..."
            </p>
            <span className="bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-[10px] font-black uppercase inline-block">
              🏆 Master Literacy Certified
            </span>
          </div>
        </div>
      );
  }
};

export default function AayushPhonicsHub() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [selectedSound, setSelectedSound] = useState(PHONICS_GROUPS[0].sounds[0]);
  const [builtLetters, setBuiltLetters] = useState([]);
  const [blendedSuccess, setBlendedSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [targetAudienceTab, setTargetAudienceTab] = useState('kids'); // 'kids' or 'teachers'
  const [showAllReviews, setShowAllReviews] = useState(false);
  const reviewsContainerRef = useRef(null);
  const [isReviewsAutoScrolling, setIsReviewsAutoScrolling] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll position listener for Go to Top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playTone(700);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Automatic Horizontal Carousel Scroll Effect (Auto-scrolls every 3.2s, pauses on hover)
  useEffect(() => {
    if (!isReviewsAutoScrolling) return;
    const interval = setInterval(() => {
      if (reviewsContainerRef.current) {
        const container = reviewsContainerRef.current;
        const scrollAmount = 370;
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= maxScroll - 15) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 1600);
    return () => clearInterval(interval);
  }, [isReviewsAutoScrolling]);

  const scrollReviews = (direction) => {
    playTone(500, 'sine');
    if (reviewsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -370 : 370;
      reviewsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Floating background particles
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const generated = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.floor(Math.random() * 95),
      top: Math.floor(Math.random() * 90),
      size: Math.floor(Math.random() * 20) + 16,
      duration: Math.floor(Math.random() * 6) + 4,
      char: ['A', 'B', 'C', '★', '◆', '●', '📚', '★', '🎵', '✦'][i % 10]
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
      
      {/* Floating Background Particles */}
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
        <Star className="w-4 h-4 text-amber-950 animate-spin" style={{ animationDuration: '4s' }} />
        <span>New Batches Starting Soon! Certified U.K. Synthetic Phonics & Teacher Certification</span>
        <a 
          href="tel:8369620982" 
          className="ml-2 underline hover:text-white transition-colors bg-slate-950/10 px-2.5 py-0.5 rounded-full text-xs font-black inline-flex items-center gap-1"
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
              <div className="w-12 h-12 bg-gradient-to-tr from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-amber-300/50 group-hover:scale-105 transition-transform animate-bounce-soft font-heading">
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
            <a href="#sound-station" className="hover:text-amber-600 transition-colors py-1 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-amber-500" /> Sound Station
            </a>
            <a href="#word-builder" className="hover:text-amber-600 transition-colors py-1 flex items-center gap-1.5">
              <Wand2 className="w-4 h-4 text-purple-500" /> Magic Builder
            </a>
            <a href="#programs" className="hover:text-amber-600 transition-colors py-1">Programs</a>
            <a href="#teacher-training" className="hover:text-amber-600 transition-colors py-1">Teacher Training</a>
            <a href="#about" className="hover:text-amber-600 transition-colors py-1">Trainer</a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3.5">
            <a 
              href="https://wa.me/918369620982?text=Hello%20Rupali%20Maam,%20I%20am%20interested%20in%20Phonics%20Classes" 
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4.5 py-2.5 rounded-2xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 text-sm hover:scale-105"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              <span>WhatsApp</span>
            </a>
            <a 
              href="tel:8369620982" 
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-5 py-2.5 rounded-2xl transition-all shadow-md shadow-amber-400/30 flex items-center gap-2 text-sm hover:scale-105"
            >
              <Phone className="w-4 h-4 shrink-0 text-slate-950" />
              <span className="tracking-wide">83696 20982</span>
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
              Home
            </a>
            <a 
              href="#sound-station" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-slate-700 border-b border-slate-100 flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4 text-amber-500" /> Phonics Sound Station
            </a>
            <a 
              href="#word-builder" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-slate-700 border-b border-slate-100 flex items-center gap-2"
            >
              <Wand2 className="w-4 h-4 text-purple-500" /> Magic Word Builder
            </a>
            <a 
              href="#programs" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-slate-700 border-b border-slate-100 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-amber-500" /> Phonics Classes for Kids
            </a>
            <a 
              href="#teacher-training" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-slate-700 border-b border-slate-100 flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-amber-500" /> Teacher Certification Course
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-slate-700 border-b border-slate-100 flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-amber-500" /> About Rupali Kulkarni
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
              
              {/* STABLE BADGE WITHOUT WIGGLE ANIMATION */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 text-amber-900 px-4 py-2 rounded-full text-xs sm:text-sm font-black border border-amber-300/60 shadow-sm">
                <Award className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Certified Trainer from Jolly Learning, U.K. 🇬🇧</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight font-heading">
                Today’s Reader, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 underline decoration-amber-400 decoration-wavy decoration-2">
                  Tomorrow’s Leader!
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
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black px-8 py-4 rounded-2xl shadow-lg shadow-amber-400/30 hover:scale-105 transition-all flex items-center justify-center gap-2.5 group"
                >
                  <Volume2 className="w-5 h-5 text-slate-950 group-hover:animate-bounce" />
                  <span>Try Sound Station</span>
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
                  <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Fun & Interactive!</span>
                </div>

                <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
                  <div className="w-14 h-14 bg-amber-400 text-slate-950 font-black rounded-2xl flex items-center justify-center text-2xl shadow-md">
                    <Palette className="w-7 h-7 text-slate-950" />
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
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-10">
            
            {/* Header Text (Left 7 Cols) */}
            <div className="md:col-span-7 space-y-3 text-center md:text-left">
              <span className="bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                <Volume2 className="w-4 h-4 text-amber-600" /> Interactive Demo
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-heading leading-tight">
                Phonics Sound Station
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-xl">
                Click any sound tile below to hear it spoken live in authentic synthetic phonics pronunciation and discover the corresponding child action gesture!
              </p>
            </div>

            {/* Sound-station.png Image (Right 5 Cols) */}
            <div className="md:col-span-5 flex justify-center">
              <img 
                src="/sound-station.png" 
                alt="Phonics Sound Station Illustration" 
                className="w-full h-auto max-h-[220px] object-contain rounded-2xl mx-auto"
              />
            </div>

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
              {PHONICS_GROUPS[activeGroupIndex].sounds.map((item, idx) => {
                const SoundIcon = item.Icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSoundClick(item)}
                    className={`p-4 rounded-2xl flex flex-col items-center justify-center border-2 transition-all transform hover:scale-110 active:scale-95 ${
                      selectedSound.sound === item.sound
                        ? 'bg-amber-400 border-amber-600 shadow-lg text-slate-950 scale-105'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-amber-400'
                    }`}
                  >
                    <SoundIcon className={`w-6 h-6 mb-1.5 ${item.iconColor}`} />
                    <span className="text-2xl font-black font-heading tracking-wider">{item.sound}</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">{item.example}</span>
                  </button>
                );
              })}
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
                  {React.createElement(selectedSound.Icon, { className: `w-8 h-8 mb-1 ${selectedSound.iconColor}` })}
                  <h3 className="text-2xl font-black text-slate-900 font-heading">
                    "{selectedSound.sound}" as in <span className="text-amber-600">{selectedSound.example}</span>
                  </h3>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase block">Jolly Phonics Action Gesture:</span>
                <p className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{selectedSound.action}</span>
                </p>
              </div>

              <div className="text-xs text-slate-500 italic text-center sm:text-left flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Tip: Children learn best when repeating the sound 3 times while performing the action!</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* INTERACTIVE MAGIC WORD BUILDER MINI-GAME */}
      <section id="word-builder" className="py-16 bg-gradient-to-b from-sky-100/60 to-purple-100/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-10">
            
            {/* Header Text (Left 7 Cols) */}
            <div className="md:col-span-7 space-y-3 text-center md:text-left">
              <span className="bg-purple-200 text-purple-950 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                <Wand2 className="w-4 h-4 text-purple-700" /> Interactive Blending Game
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-heading leading-tight">
                Magic Word Builder
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-xl">
                Try building and blending words! Click letter tiles to place them on the magic board and practice sound blending.
              </p>
            </div>

            {/* Magic Word Builder Image (Right 5 Cols) */}
            <div className="md:col-span-5 flex justify-center">
              <img 
                src="/magic-word-builder.png" 
                alt="Magic Word Builder Illustration" 
                className="w-full h-auto max-h-[220px] object-contain rounded-2xl mx-auto"
              />
            </div>

          </div>

          <div className="w-full bg-white p-6 sm:p-10 rounded-3xl border-4 border-purple-200 shadow-2xl space-y-8">
            
            {/* Preset Word Quick Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase mr-2">Try Preset Words:</span>
              {WORD_BUILDER_PRESETS.map((preset, idx) => {
                const PresetIcon = preset.Icon;
                return (
                  <button
                    key={idx}
                    onClick={() => loadPresetWord(preset)}
                    className="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-900 font-extrabold rounded-xl border border-purple-200 text-xs transition-all hover:scale-105 flex items-center gap-1.5"
                  >
                    <span>{preset.word}</span>
                    <PresetIcon className="w-3.5 h-3.5 text-purple-600" />
                  </button>
                );
              })}
            </div>

            {/* Word Display Board */}
            <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 p-8 rounded-3xl text-center border-2 border-indigo-400/40 shadow-2xl relative overflow-hidden min-h-[160px] flex flex-col items-center justify-center">
              
              {blendedSuccess && (
                <div className="absolute top-3 right-4 bg-amber-400 text-slate-950 px-3.5 py-1 rounded-full text-xs font-black animate-bounce flex items-center gap-1 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                  <span>Excellent Blending!</span>
                </div>
              )}

              {builtLetters.length === 0 ? (
                <p className="text-amber-300 font-extrabold text-base tracking-wide flex items-center gap-2 my-2 animate-pulse-glow">
                  <Sparkles className="w-4.5 h-4.5 text-amber-400" />
                  <span>Tap letter tiles below to build a word...</span>
                </p>
              ) : (
                <div className="flex items-center justify-center gap-3 my-2">
                  {builtLetters.map((char, idx) => (
                    <div 
                      key={idx}
                      className="w-14 h-16 sm:w-16 sm:h-20 bg-amber-400 text-slate-950 font-black text-3xl sm:text-4xl rounded-2xl flex items-center justify-center shadow-xl border-2 border-amber-200 font-heading animate-pop"
                    >
                      {char}
                    </div>
                  ))}
                </div>
              )}

              {/* Action Control Buttons */}
              <div className="flex items-center gap-4 mt-5">
                <button
                  onClick={handleBlendWord}
                  disabled={builtLetters.length === 0}
                  className={`px-6 py-3 rounded-2xl text-sm font-black transition-all flex items-center gap-2 shadow-lg ${
                    builtLetters.length > 0
                      ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 border-2 border-emerald-300 shadow-emerald-400/40 hover:scale-105 active:scale-95'
                      : 'bg-emerald-500/20 text-emerald-300/70 border border-emerald-500/30 cursor-not-allowed'
                  }`}
                >
                  <Volume2 className="w-4 h-4 shrink-0" />
                  <span>Blend & Read Sound</span>
                </button>

                <button
                  onClick={handleClearLetters}
                  disabled={builtLetters.length === 0}
                  className={`px-5 py-3 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 shadow-md ${
                    builtLetters.length > 0
                      ? 'bg-rose-500 hover:bg-rose-400 text-white border border-rose-400 hover:scale-105 active:scale-95'
                      : 'bg-slate-800/80 text-slate-400 border border-slate-700/60 cursor-not-allowed'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5 shrink-0" />
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
            
            <div className="lg:col-span-6 relative">
              <div className="bg-gradient-to-tr from-amber-400 to-orange-400 rounded-3xl shadow-2xl text-slate-950 relative overflow-hidden grid grid-cols-1 sm:grid-cols-12 min-h-[340px]">
                
                {/* Left Side Text Content */}
                <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-4 z-10">
                  <div>
                    <span className="bg-slate-950 text-amber-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider inline-block">
                      UK Certified Trainer
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black mt-3 font-heading leading-tight text-slate-950">
                      Rupali Kulkarni
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                      Official Jolly Learning Phonics Trainer
                    </p>
                  </div>

                  <div className="space-y-2 text-xs font-bold text-slate-900 border-t border-amber-500/40 pt-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-slate-950 shrink-0" />
                      <span>Certified from Jolly Learning, UK</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-slate-950 shrink-0" />
                      <span>Specialist in Early Childhood Literacy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-slate-950 shrink-0" />
                      <span>Trained 500+ Children & Educators</span>
                    </div>
                  </div>
                </div>

                {/* Right Side Half Image */}
                <div className="sm:col-span-5 relative min-h-[220px] sm:min-h-full">
                  <img 
                    src="/trainer.jpeg" 
                    alt="Rupali Kulkarni - Official Phonics Trainer" 
                    className="absolute inset-0 w-full h-full object-cover object-top rounded-b-3xl sm:rounded-r-3xl sm:rounded-bl-none"
                  />
                </div>

              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
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
                  <h4 className="font-black text-slate-900 text-base font-heading flex items-center gap-2">
                    <Baby className="w-5 h-5 text-amber-500" />
                    <span>For Children</span>
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Fun story-driven sound introduction, blending exercises, and confidence building.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="font-black text-slate-900 text-base font-heading flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-sky-500" />
                    <span>For Teachers</span>
                  </h4>
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
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-12">
            
            {/* Header Text (Left 7 Cols) */}
            <div className="md:col-span-7 space-y-4 text-center md:text-left">
              <div className="inline-flex p-1 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <button
                  onClick={() => setTargetAudienceTab('kids')}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                    targetAudienceTab === 'kids'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Baby className="w-4 h-4" />
                  <span>For Children (Age 3+)</span>
                </button>
                <button
                  onClick={() => setTargetAudienceTab('teachers')}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                    targetAudienceTab === 'teachers'
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>For Teacher Training</span>
                </button>
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-heading leading-tight">
                {targetAudienceTab === 'kids' ? 'Phonics & Reading Programs' : 'Professional Teacher Certification'}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-xl">
                {targetAudienceTab === 'kids' 
                  ? 'Structured interactive batches designed for Jr.Kg, Sr.Kg, 1st & 2nd Std learners.'
                  : 'Comprehensive course for aspiring educators, tutors, and mothers looking to start phonics centers.'}
              </p>
            </div>

            {/* Reading Image (Right 5 Cols) */}
            <div className="md:col-span-5 flex justify-center">
              <img 
                src="/reading.png" 
                alt="Phonics Reading Illustration" 
                className="w-full h-auto max-h-[220px] object-contain rounded-2xl mx-auto"
              />
            </div>

          </div>

          {targetAudienceTab === 'kids' ? (
            <div className="space-y-10">
              
              {/* Teaching Philosophy Banner */}
              <div className="bg-amber-500/[0.04] border-2 border-amber-300/80 p-6 rounded-3xl flex flex-col md:flex-row items-center gap-5 text-slate-900 shadow-sm">
                <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-slate-950 font-black shrink-0 shadow-md">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="space-y-1 text-center md:text-left">
                  <h4 className="text-lg font-black font-heading text-slate-900 flex items-center justify-center md:justify-start gap-2">
                    <span>Child-Centric Learning Philosophy</span>
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  </h4>
                  <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                    "I don't teach rigidly by fixed age/level brackets — <strong>I teach strictly according to the grasping level & reading pace of each individual child!</strong> Each child progresses through these 8 comprehensive phonics milestones at their own comfortable speed."
                  </p>
                  <span className="text-xs font-bold text-amber-700 block">
                    — Rupali Kulkarni (Certified Jolly Learning UK Trainer)
                  </span>
                </div>
              </div>

              {/* 8-Level Curriculum Pathway Roadmap */}
              <div className="relative py-4">
                
                {/* Central Vertical Pathway Line */}
                <div className="absolute left-6 md:left-1/2 top-8 bottom-8 w-1.5 bg-gradient-to-b from-amber-400 via-sky-400 via-purple-400 via-rose-400 to-indigo-500 rounded-full -translate-x-1/2 z-0 hidden sm:block"></div>

                <div className="space-y-10 relative z-10">
                  {PHONICS_LEVELS.map((item, idx) => {
                    const isEven = idx % 2 === 1;
                    return (
                      <div key={idx} className="relative flex flex-col md:flex-row items-center">
                        
                        {/* Milestone Content Card */}
                        <div className={`w-full md:w-[46%] ${isEven ? 'md:ml-auto md:order-2' : 'md:mr-auto md:order-1'}`}>
                          <div className={`bg-white rounded-3xl p-7 shadow-xl border-2 ${item.borderColor} relative space-y-4 hover:shadow-2xl hover:scale-[1.02] transition-all`}>
                            
                            <div className="flex items-center justify-between">
                              <span className={`${item.accentBg} text-white px-3.5 py-1 rounded-full font-black text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5`}>
                                <span>{item.level}</span>
                              </span>
                              <span className={`${item.badgeBg} border text-[11px] font-black px-3 py-1 rounded-full`}>
                                {item.badge}
                              </span>
                            </div>

                            <div>
                              <h3 className="text-xl font-black text-slate-900 font-heading">{item.title}</h3>
                              <p className={`text-xs font-black ${item.textColor} mt-1`}>
                                🎯 Goal: {item.goal}
                              </p>
                            </div>

                            <ul className="space-y-2 text-slate-700 text-xs sm:text-sm pt-3 border-t border-slate-100">
                              {item.points.map((pt, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-2.5">
                                  <CheckCircle className={`w-4 h-4 ${item.textColor} shrink-0 mt-0.5`} />
                                  <span className="font-semibold">{pt}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-500">Grasping-Paced Pathway</span>
                              <a 
                                href="https://wa.me/918369620982?text=Hello%20Rupali%20Maam,%20I%20am%20interested%20in%20Phonics%20for%20my%20child" 
                                target="_blank"
                                rel="noreferrer"
                                className={`${item.accentBg} hover:opacity-90 text-white font-black px-4 py-2 rounded-xl text-xs transition-all shadow-sm inline-flex items-center gap-1.5`}
                              >
                                <WhatsAppIcon className="w-3.5 h-3.5" />
                                <span>Inquire Now</span>
                              </a>
                            </div>

                          </div>
                        </div>

                        {/* Central Path Milestone Number Badge */}
                        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-slate-100 shadow-xl flex items-center justify-center z-20 hidden sm:flex">
                          <span className={`w-9 h-9 rounded-full ${item.accentBg} text-white font-black text-sm flex items-center justify-center font-heading shadow-md`}>
                            {idx + 1}
                          </span>
                        </div>

                        {/* Level Visual Illustration Card for opposite side */}
                        <div className={`w-full md:w-[46%] ${isEven ? 'md:order-1 md:pr-4' : 'md:order-2 md:pl-4'} mt-4 md:mt-0`}>
                          {renderLevelVisual(idx)}
                        </div>

                      </div>
                    );
                  })}
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
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Header Text (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <span className="bg-amber-400 text-slate-950 px-4.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider inline-block mb-2 shadow-md">
                Comprehensive Syllabus
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white font-heading leading-tight">
                Phonics Teacher Training Course Curriculum
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
                Learn the exact UK synthetic phonics mechanics to teach early learners effectively and start your own phonics center with confidence.
              </p>
            </div>

            {/* Phonic.png Banner Image (Right 5 Cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <img 
                src="/Phonic.png" 
                alt="Phonics Teacher Training" 
                className="w-full h-auto max-h-[280px] object-contain rounded-2xl mx-auto"
              />
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-slate-800/90 border border-slate-700 p-8 rounded-3xl space-y-4 hover:border-amber-400 transition-colors">
              <div className="w-12 h-12 bg-amber-400 text-slate-950 font-black rounded-2xl flex items-center justify-center text-xl shadow-md">
                <BookOpen className="w-6 h-6" />
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
                <Feather className="w-6 h-6" />
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
                <Lightbulb className="w-6 h-6" />
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
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-10">
            
            {/* Header Text (Left 7 Cols) */}
            <div className="md:col-span-7 space-y-3 text-center md:text-left">
              <span className="bg-emerald-100 text-emerald-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider inline-block mb-1 shadow-sm">
                Verified Reviews & Feedback
              </span>
              
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-heading leading-tight">
                Loved by Parents & Educators
              </h2>
            </div>

            {/* Review Image (Right 5 Cols) */}
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <img 
                src="/review.png" 
                alt="Parents & Student Reviews Illustration" 
                className="w-full h-auto max-h-[220px] object-contain rounded-2xl mx-auto md:mr-0"
              />
            </div>

          </div>

          {/* Carousel Wrapper with Left & Right Side Arrow Handles */}
          <div className="relative px-2 sm:px-6">
            
            {/* Left Side Arrow Handle */}
            <button
              onClick={() => scrollReviews('left')}
              className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white hover:bg-emerald-500 hover:text-white text-slate-800 rounded-full border-2 border-slate-200 hover:border-emerald-500 flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-95"
              title="Scroll Left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Side Arrow Handle */}
            <button
              onClick={() => scrollReviews('right')}
              className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white hover:bg-emerald-500 hover:text-white text-slate-800 rounded-full border-2 border-slate-200 hover:border-emerald-500 flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-95"
              title="Scroll Right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Side-by-Side Horizontal Scrollable Container */}
            <div 
              ref={reviewsContainerRef}
              onMouseEnter={() => setIsReviewsAutoScrolling(false)}
              onMouseLeave={() => setIsReviewsAutoScrolling(true)}
              className="flex flex-nowrap gap-6 overflow-x-auto no-scrollbar scroll-smooth py-4 px-2 sm:px-4"
            >
            {TESTIMONIALS.map((item, idx) => (
              <div 
                key={idx}
                className="min-w-[320px] sm:min-w-[360px] max-w-[380px] shrink-0 bg-white p-7 rounded-3xl border-2 border-emerald-100 space-y-4 shadow-md hover:shadow-2xl hover:border-emerald-400 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                      <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>WhatsApp Review</span>
                    </span>
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed italic">
                    "{item.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h4 className="font-black text-slate-900 text-sm">{item.name}</h4>
                  <span className="text-xs font-bold text-emerald-600 block">{item.role}</span>
                </div>
              </div>
            ))}
            </div>

          </div>

          <div className="text-center text-xs text-slate-400 font-bold mt-4">
            💡 Tip: Hover or tap any review to pause auto-scrolling • Use arrows or drag to scroll
          </div>

        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) */}
      <section className="py-16 bg-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12">
            <span className="bg-sky-100 text-sky-900 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
              <HelpCircle className="w-4 h-4 text-sky-600" /> Clarifications
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-heading">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* FAQ Image (Left 5 Cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <img 
                src="/FAQ.png" 
                alt="Frequently Asked Questions Illustration" 
                className="w-full h-auto max-h-[340px] object-contain rounded-2xl mx-auto"
              />
            </div>

            {/* FAQ Accordion List (Right 7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
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
                    <span className="text-amber-500 font-bold text-xl ml-2 shrink-0">
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
                  <WhatsAppIcon className="w-4 h-4" />
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

      {/* FLOATING GO TO TOP BUTTON */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 bg-amber-400 hover:bg-amber-300 text-slate-950 p-3.5 rounded-full shadow-2xl z-50 flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-2 border-white animate-pop"
          title="Scroll to Top"
        >
          <ArrowUp className="w-6 h-6 stroke-[3]" />
        </button>
      )}

      {/* FLOATING QUICK WHATSAPP INQUIRY BUTTON */}
      <a 
        href="https://wa.me/918369620982?text=Hello%20Rupali%20Maam,%20I%20am%20interested%20in%20Phonics%20Classes"
        target="_blank"
        rel="noreferrer"
        onClick={() => playTone(800)}
        className="fixed bottom-6 right-6 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl z-50 flex items-center justify-center hover:scale-110 transition-all animate-bounce-soft border-2 border-white"
        title="WhatsApp Direct Inquiry"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>

    </div>
  );
}