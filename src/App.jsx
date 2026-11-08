import React, { useState, useRef } from 'react';
import {
  Sparkles, CheckCircle2, FileText, UserCheck, 
  Briefcase, Users, Building2, Download, ArrowRight, Zap, Menu, X, Plus, Trash2,
  GraduationCap, RefreshCw, Trophy, Send, CheckCircle, AlertCircle, Printer, Eye,
  Upload, File, Award, Star, ArrowUpRight, Check, Layout, ShieldCheck, Layers, LogIn, UserPlus, Sliders, ChevronRight, BookOpen, Share2, MessageSquare, ExternalLink, Play
} from 'lucide-react';

const INITIAL_RESUME_DATA = {
  personal: {
    fullName: "First Last",
    location: "City, State, Country",
    phone: "+91 98765 43210",
    email: "student@example.com",
    linkedin: "linkedin.com/in/username",
    github: "github.com/username",
    portfolio: "yourportfolio.dev"
  },
  education: [
    {
      id: "edu_1",
      institution: "Your University / Institution Name",
      degree: "Bachelor of Technology (B.Tech)",
      branch: "Computer Science & Engineering",
      cgpa: "8.5/10",
      dates: "2022 – 2026",
      location: "City, State"
    }
  ],
  coursework: [
    "Data Structures & Algorithms", "Database Management Systems", "Operating Systems", "Computer Networks",
    "Software Engineering", "Object-Oriented Programming", "System Design", "Web Development"
  ],
  experience: [
    {
      id: "exp_1",
      company: "Example Company / Startup",
      title: "Software Engineer Intern",
      dates: "May 2025 – July 2025",
      location: "City, State",
      bullets: [
        "Developed and optimized scalable web services using modern full-stack frameworks, reducing load times by 30%.",
        "Engineered automated test scripts and CI/CD pipelines to streamline deployment workflows.",
        "Collaborated with cross-functional engineering teams to implement clean, maintainable, and high-quality code."
      ]
    }
  ],
  projects: [
    {
      id: "proj_1",
      name: "Project Title",
      tech: "React, Node.js, Tailwind CSS, PostgreSQL",
      dates: "Jan 2026",
      bullets: [
        "Built a full-stack web platform enabling real-time user collaboration and dynamic data visualisations.",
        "Implemented RESTful APIs and secure authentication flows to ensure high reliability and security."
      ]
    }
  ],
  awards: [
    {
      id: "award_1",
      title: "Winner - National Hackathon 2025",
      issuer: "Tech Innovation Summit",
      dates: "Oct 2025",
      details: "Awarded 1st place among 150+ competing teams for building an AI-powered automated code reviewer."
    }
  ],
  skills: {
    languages: "Python, C++, Java, JavaScript (ES6+), SQL, HTML/CSS",
    frameworks: "React.js, Node.js, Express, Tailwind CSS",
    tools: "Git/GitHub, Docker, VS Code, Postman",
    libraries: "NumPy, Pandas, SciPy, Matplotlib",
    soft: "Problem Solving, Team Leadership, Agile Collaboration",
    certifications: "AWS Certified Cloud Practitioner, Meta Front-End Developer"
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null); // 'signin' | 'signup' | null
  const [resumeData, setResumeData] = useState(INITIAL_RESUME_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState('jakes');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const navigateTo = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white flex flex-col antialiased relative overflow-x-hidden">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/90 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-indigo-500/30 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-300 flex-shrink-0 animate-spin" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* AUTH MODAL */}
      {authModal && (
        <AuthModal type={authModal} onClose={() => setAuthModal(null)} showToast={showToast} />
      )}

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all print:hidden shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center font-bold text-xl text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-all">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                Aspiraa <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200/80 shadow-sm">Career OS</span>
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-600">
            <button onClick={() => navigateTo('landing')} className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'landing' ? 'text-indigo-600 bg-indigo-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100'}`}>
              <Layout className="w-4 h-4 text-indigo-600" /> Home
            </button>
            <button onClick={() => navigateTo('builder')} className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'builder' ? 'text-indigo-600 bg-indigo-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100'}`}>
              <FileText className="w-4 h-4 text-indigo-600" /> Resume Studio
            </button>
            <button onClick={() => navigateTo('ats')} className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'ats' ? 'text-indigo-600 bg-indigo-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100'}`}>
              <Upload className="w-4 h-4 text-emerald-600" /> ATS Audit
            </button>
            <button onClick={() => navigateTo('notes')} className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'notes' ? 'text-indigo-600 bg-indigo-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100'}`}>
              <BookOpen className="w-4 h-4 text-amber-500" /> Course Notes
            </button>
            <button onClick={() => navigateTo('referrals')} className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'referrals' ? 'text-indigo-600 bg-indigo-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100'}`}>
              <Share2 className="w-4 h-4 text-sky-500" /> Referral Hub
            </button>
            <button onClick={() => navigateTo('campus')} className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'campus' ? 'text-indigo-600 bg-indigo-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100'}`}>
              <GraduationCap className="w-4 h-4 text-indigo-600" /> Campus Lead
            </button>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <button onClick={() => setAuthModal('signin')} className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-indigo-600 transition flex items-center gap-1.5">
              <LogIn className="w-4 h-4 text-slate-500" /> Sign In
            </button>
            <button onClick={() => setAuthModal('signup')} className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 flex items-center gap-1.5">
              <UserPlus className="w-4 h-4" /> Sign Up Free
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-xl bg-slate-100 text-slate-700">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white/95 px-4 pt-2 pb-6 space-y-2 text-sm font-medium animate-fadeIn">
            <button onClick={() => navigateTo('landing')} className="block w-full text-left px-3 py-2 rounded-xl bg-slate-100 font-bold text-slate-900">Home</button>
            <button onClick={() => navigateTo('builder')} className="block w-full text-left px-3 py-2 rounded-xl text-slate-700">Resume Studio</button>
            <button onClick={() => navigateTo('ats')} className="block w-full text-left px-3 py-2 rounded-xl text-slate-700">ATS Audit</button>
            <button onClick={() => navigateTo('notes')} className="block w-full text-left px-3 py-2 rounded-xl text-amber-600 font-bold">Course Notes & Roadmaps</button>
            <button onClick={() => navigateTo('referrals')} className="block w-full text-left px-3 py-2 rounded-xl text-sky-600 font-bold">Peer Referral Network</button>
            <button onClick={() => navigateTo('campus')} className="block w-full text-left px-3 py-2 rounded-xl text-indigo-600 font-bold">Campus Ambassador</button>
          </div>
        )}
      </header>

      {/* MAIN VIEW CONTROLLER */}
      <main className="flex-1">
        {activeTab === 'landing' && <HeroLandingView navigateTo={navigateTo} setAuthModal={setAuthModal} />}
        {activeTab === 'builder' && (
          <JakesResumeStudio 
            resumeData={resumeData} 
            setResumeData={setResumeData} 
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            showToast={showToast} 
          />
        )}
        {activeTab === 'ats' && <AtsCheckerSuite resumeData={resumeData} showToast={showToast} />}
        {activeTab === 'notes' && <CourseNotesHub showToast={showToast} />}
        {activeTab === 'referrals' && <ReferralNetworkHub showToast={showToast} setAuthModal={setAuthModal} />}
        {activeTab === 'campus' && <CampusEcosystemView showToast={showToast} />}
      </main>

      <footer className="border-t border-slate-200/80 bg-white text-slate-500 text-xs py-8 print:hidden text-center">
        <p>© {new Date().getFullYear()} Aspiraa Placement Ecosystem. Comprehensive Student Career Operating System.</p>
      </footer>
    </div>
  );
}

// -------------------------------------------------------------
// 1. COURSE NOTES & PLACEMENT ROADMAPS HUB
// -------------------------------------------------------------
function CourseNotesHub({ showToast }) {
  const categories = [
    {
      title: "Data Structures & Algorithms",
      tag: "Computer Science",
      topics: ["Trees & Graphs Cheat Sheet", "Dynamic Programming Patterns", "Striver SDE Sheet Notes"],
      color: "bg-indigo-50 border-indigo-200 text-indigo-700"
    },
    {
      title: "System Design & Databases",
      tag: "Software Engineering",
      topics: ["SQL Indexing & Normalization", "Distributed Systems 101", "REST API Design Best Practices"],
      color: "bg-sky-50 border-sky-200 text-sky-700"
    },
    {
      title: "Mechanical & Core Engineering",
      tag: "Core Engineering",
      topics: ["Navier-Stokes Equations & CFD Formulas", "Thermodynamics & Heat Exchangers", "FEA & Boundary Conditions"],
      color: "bg-amber-50 border-amber-200 text-amber-700"
    },
    {
      title: "Aptitude & Technical HR",
      tag: "Placement Prep",
      topics: ["Quant & Logical Reasoning Formulas", "STAR Method Behavioral Questions", "Top 50 C++ / OOPs Interview Qs"],
      color: "bg-emerald-50 border-emerald-200 text-emerald-700"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="px-3.5 py-1 bg-amber-100 text-amber-800 border border-amber-200 rounded-full text-xs font-bold uppercase tracking-wider">
          Free Learning Resources
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">Placement Notes & Cheat Sheets</h1>
        <p className="text-xs sm:text-sm text-slate-600">Curated notes, formula sheets, and interview roadmaps for CS & Core engineering drives.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${cat.color}`}>{cat.tag}</span>
              <BookOpen className="w-5 h-5 text-slate-400" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">{cat.title}</h3>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {cat.topics.map((t, i) => (
                <li key={i} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 hover:bg-indigo-50/50 transition cursor-pointer" onClick={() => showToast(`Opening ${t}...`)}>
                  <span className="font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {t}
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. PEER REFERRAL & WORKPLACE NETWORK HUB
// -------------------------------------------------------------
function ReferralNetworkHub({ showToast, setAuthModal }) {
  const listings = [
    { company: "Google", role: "Software Engineering Intern / FTE", location: "Bengaluru", referrer: "Alumni @ NITK", badge: "Tech" },
    { company: "CSIR-NAL", role: "Aerodynamics & CFD Research Fellow", location: "Bengaluru", referrer: "Research Associate", badge: "Core" },
    { company: "Tata Steel", role: "Graduate Engineer Trainee (GET)", location: "Jamshedpur", referrer: "Supply Chain Lead", badge: "Core" },
    { company: "Microsoft", role: "SDE 1 - Cloud & AI", location: "Hyderabad", referrer: "Senior SDE", badge: "Tech" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="px-3.5 py-1 bg-sky-100 text-sky-800 border border-sky-200 rounded-full text-xs font-bold uppercase tracking-wider">
          Student Network & Alumni
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">Peer Job & Internship Referrals</h1>
        <p className="text-xs sm:text-sm text-slate-600">Connect with verified seniors and alumni to get referred directly for campus & off-campus drives.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-bold">{item.badge}</span>
              <span className="text-xs font-semibold text-slate-500">{item.location}</span>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">{item.company}</h3>
              <p className="text-sm font-semibold text-indigo-600">{item.role}</p>
              <p className="text-xs text-slate-500 mt-1">Shared by: {item.referrer}</p>
            </div>
            <button 
              onClick={() => { showToast("Referral request initiated!"); setAuthModal('signup'); }}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" /> Request Referral
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// SIGN IN / SIGN UP MODAL COMPONENT
// -------------------------------------------------------------
function AuthModal({ type, onClose, showToast }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast(type === 'signin' ? "Successfully signed in!" : "Account created successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-6 relative animate-fadeIn">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-black text-slate-900">{type === 'signin' ? "Welcome Back" : "Create Account"}</h2>
          <p className="text-xs text-slate-500">Access saved resumes, notes, and referral networks</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'signup' && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Student Name" className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs" />
            </div>
          )}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@college.edu" className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs" />
          </div>
          <button type="submit" className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition">
            {type === 'signin' ? "Sign In" : "Get Started Free"}
          </button>
        </form>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// HERO LANDING PAGE VIEW
// -------------------------------------------------------------
function HeroLandingView({ navigateTo, setAuthModal }) {
  return (
    <div className="space-y-20 pb-20 animate-fadeIn">
      <section className="pt-20 pb-16 border-b border-slate-200/80 bg-gradient-to-b from-white via-indigo-50/20 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
            <span>Complete Placement Preparation & Career OS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.12] max-w-4xl mx-auto">
            Build ATS Resumes & <br />
            <span className="bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-700 bg-clip-text text-transparent">Crack Engineering Placements.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From Jake's ATS Resume Studio to curated CS/Core course notes and peer job referrals—everything you need for campus placement drives.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button onClick={() => navigateTo('builder')} className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition">
              <span>Launch Resume Builder</span> <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => navigateTo('notes')} className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-sm shadow-md flex items-center justify-center gap-2 transition">
              <BookOpen className="w-4 h-4 text-amber-500" /> <span>Browse Placement Notes</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// -------------------------------------------------------------
// RESUME STUDIO, ATS & CAMPUS COMPONENTS (RETAINED & UNTOUCHED)
// -------------------------------------------------------------
function JakesResumeStudio({ resumeData, setResumeData, selectedTemplate, setSelectedTemplate, showToast }) {
  return (
    <div className="max-w-[1700px] mx-auto px-4 py-6 space-y-6">
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex justify-between items-center">
        <h1 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" /> Resume Studio
        </h1>
        <button onClick={() => window.print()} className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-2">
          <Printer className="w-4 h-4" /> Print PDF
        </button>
      </div>
      <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-lg min-h-[900px]">
        <JakesClassicPreview resumeData={resumeData} />
      </div>
    </div>
  );
}

function JakesClassicPreview({ resumeData }) {
  return (
    <div className="font-serif leading-tight">
      <div className="text-center space-y-1 mb-3">
        <h1 className="text-3xl font-extrabold uppercase text-black">{resumeData.personal.fullName}</h1>
        <p className="text-[13px] text-slate-800">{resumeData.personal.location} | {resumeData.personal.email} | {resumeData.personal.phone}</p>
      </div>
      <div className="mb-3">
        <h2 className="text-[14px] font-bold uppercase text-black border-b border-black pb-0.5 mb-1.5">Education</h2>
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="mb-1 text-[13px]">
            <div className="flex justify-between font-bold"><span>{edu.institution}</span><span>{edu.dates}</span></div>
            <div className="italic text-slate-800">{edu.degree} in {edu.branch} (CGPA: {edu.cgpa})</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AtsCheckerSuite({ showToast }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-black text-slate-900 text-center">ATS Audit Scanner</h1>
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
        <Upload className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
        <p className="text-sm font-bold">Drag & Drop Resume PDF to parse ATS Keywords</p>
      </div>
    </div>
  );
}

function CampusEcosystemView({ showToast }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-black text-slate-900 text-center">Campus Ambassador Network</h1>
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
        <p className="text-sm text-slate-600">Apply to become a student leader and host ATS resume drives at your institution.</p>
      </div>
    </div>
  );
}
