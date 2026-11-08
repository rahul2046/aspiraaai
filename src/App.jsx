import React, { useState, useRef } from 'react';
import {
  Sparkles, CheckCircle2, FileText, UserCheck, 
  Briefcase, Users, Building2, Download, ArrowRight, Zap, Menu, X, Plus, Trash2,
  GraduationCap, RefreshCw, Trophy, Send, CheckCircle, AlertCircle, Printer, Eye,
  Upload, File, Award, Star, ArrowUpRight, Check, Layout, ShieldCheck, Layers, LogIn, UserPlus
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
  const [selectedTemplate, setSelectedTemplate] = useState('jakes'); // 'jakes' | 'modern' | 'executive'
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white flex flex-col antialiased">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-bounce">
          <Sparkles className="w-5 h-5 text-indigo-400 flex-shrink-0 animate-spin" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* AUTH MODAL (SIGN IN / SIGN UP) */}
      {authModal && (
        <AuthModal type={authModal} onClose={() => setAuthModal(null)} showToast={showToast} />
      )}

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 transition-all print:hidden shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('landing')}>
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-xl text-white shadow-md group-hover:scale-105 transition">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                Aspiraa <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 border border-indigo-200">Career OS</span>
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-600">
            <button 
              onClick={() => navigateTo('landing')} 
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-2 ${activeTab === 'landing' ? 'text-indigo-600 bg-indigo-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100'}`}
            >
              <Layout className="w-4 h-4 text-indigo-600" />
              Home
            </button>
            <button 
              onClick={() => navigateTo('builder')} 
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-2 ${activeTab === 'builder' ? 'text-indigo-600 bg-indigo-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100'}`}
            >
              <FileText className="w-4 h-4 text-indigo-600" />
              Resume Builder
            </button>
            <button 
              onClick={() => navigateTo('ats')} 
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-2 ${activeTab === 'ats' ? 'text-indigo-600 bg-indigo-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100'}`}
            >
              <Upload className="w-4 h-4 text-emerald-600" />
              ATS Scanner
            </button>
            <button 
              onClick={() => navigateTo('campus')} 
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-2 ${activeTab === 'campus' ? 'text-indigo-600 bg-indigo-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100'}`}
            >
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              Campus Ambassador
            </button>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <button 
              onClick={() => setAuthModal('signin')}
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 transition flex items-center gap-1.5"
            >
              <LogIn className="w-4 h-4 text-slate-500" />
              Sign In
            </button>
            <button 
              onClick={() => setAuthModal('signup')}
              className="px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              Sign Up Free
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 text-sm font-medium">
            <button onClick={() => navigateTo('landing')} className="block w-full text-left px-3 py-2 rounded bg-slate-100 font-bold text-slate-900">Home</button>
            <button onClick={() => navigateTo('builder')} className="block w-full text-left px-3 py-2 rounded text-slate-700 hover:bg-slate-100">Resume Builder</button>
            <button onClick={() => navigateTo('ats')} className="block w-full text-left px-3 py-2 rounded text-slate-700 hover:bg-slate-100">ATS Scanner</button>
            <button onClick={() => navigateTo('campus')} className="block w-full text-left px-3 py-2 rounded text-indigo-600 font-bold">Campus Ambassador</button>
            <div className="pt-2 flex gap-2">
              <button onClick={() => setAuthModal('signin')} className="w-1/2 py-2 text-xs font-bold border border-slate-300 rounded-lg text-slate-800">Sign In</button>
              <button onClick={() => setAuthModal('signup')} className="w-1/2 py-2 text-xs font-bold bg-indigo-600 text-white rounded-lg">Sign Up</button>
            </div>
          </div>
        )}
      </header>

      {/* DYNAMIC VIEWS */}
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
        {activeTab === 'campus' && <CampusEcosystemView showToast={showToast} />}
      </main>

      <footer className="border-t border-slate-200 bg-white text-slate-500 text-xs py-8 print:hidden text-center">
        <p>© {new Date().getFullYear()} Aspiraa Career OS. High-Impact Placement Platform for Engineering Students.</p>
      </footer>
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
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-black text-slate-900">
            {type === 'signin' ? "Welcome Back to Aspiraa" : "Create Your Free Account"}
          </h2>
          <p className="text-xs text-slate-500">
            {type === 'signin' ? "Access saved resumes and ATS score history" : "Build recruiter-approved ATS resumes in minutes"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'signup' && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Student Name"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="student@college.edu"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition"
          >
            {type === 'signin' ? "Sign In" : "Get Started Now"}
          </button>
        </form>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// HERO LANDING PAGE VIEW (CLEAN LIGHT THEME)
// -------------------------------------------------------------
function HeroLandingView({ navigateTo, setAuthModal }) {
  return (
    <div className="space-y-16 pb-16 animate-fadeIn">
      
      {/* HERO BANNER SECTION */}
      <section className="pt-16 pb-12 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>The Open Source Career OS for College Students</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Build ATS Resumes That <br />
            <span className="text-indigo-600">Land Campus Interviews.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Create pixel-perfect resumes in recruiter-proven formats (including Jake's ATS template). Match job descriptions, audit your match score, and stand out in placement drives.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button 
              onClick={() => navigateTo('builder')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition"
            >
              <span>Build My Resume Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button 
              onClick={() => setAuthModal('signup')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center gap-2 transition"
            >
              <UserPlus className="w-4 h-4 text-indigo-600" />
              <span>Create Free Account</span>
            </button>
          </div>

          {/* STATS STRIP */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 max-w-4xl mx-auto border-t border-slate-200">
            <div>
              <span className="block text-3xl font-black text-slate-900">99%</span>
              <span className="text-xs text-slate-500 font-semibold">ATS Parsing Score</span>
            </div>
            <div>
              <span className="block text-3xl font-black text-indigo-600">3+</span>
              <span className="text-xs text-slate-500 font-semibold">Proven Layout Templates</span>
            </div>
            <div>
              <span className="block text-3xl font-black text-emerald-600">100%</span>
              <span className="text-xs text-slate-500 font-semibold">Free & Unlimited Downloads</span>
            </div>
            <div>
              <span className="block text-3xl font-black text-sky-600">50+</span>
              <span className="text-xs text-slate-500 font-semibold">Campus Networks</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">Built Specifically for Engineering Placements</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">Clean structure, single-page printable layouts, and instant keyword match audits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm hover:border-indigo-300 transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Jake's ATS & Modern Layouts</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Single-column design preferred by tech recruiters and automated ATS screeners globally.</p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm hover:border-indigo-300 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Job Description Keyword Audit</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Paste target job descriptions to check missing skills and optimize match percentages.</p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm hover:border-indigo-300 transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Campus Ambassador Network</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Lead placement drives at your institution, track student registrations, and gain credentials.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

// -------------------------------------------------------------
// RESUME BUILDER STUDIO WITH TEMPLATES (LIGHT THEME)
// -------------------------------------------------------------
function JakesResumeStudio({ resumeData, setResumeData, selectedTemplate, setSelectedTemplate, showToast }) {
  const [activeSection, setActiveSection] = useState('personal');

  const handlePersonalChange = (field, val) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: val }
    }));
  };

  const handleEduChange = (idx, field, val) => {
    const updated = [...resumeData.education];
    updated[idx][field] = val;
    setResumeData(prev => ({ ...prev, education: updated }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: `edu_${Date.now()}`,
          institution: "University Name",
          degree: "B.Tech / Degree",
          branch: "Branch / Specialization",
          cgpa: "8.5/10",
          dates: "Year – Year",
          location: "City, State"
        }
      ]
    }));
  };

  const removeEducation = (idx) => {
    const updated = [...resumeData.education];
    updated.splice(idx, 1);
    setResumeData(prev => ({ ...prev, education: updated }));
  };

  const handleCourseworkChange = (val) => {
    const list = val.split(',').map(s => s.trim()).filter(Boolean);
    setResumeData(prev => ({ ...prev, coursework: list }));
  };

  const handleExpChange = (idx, field, val) => {
    const updated = [...resumeData.experience];
    updated[idx][field] = val;
    setResumeData(prev => ({ ...prev, experience: updated }));
  };

  const handleExpBulletChange = (expIdx, bulletIdx, val) => {
    const updated = [...resumeData.experience];
    updated[expIdx].bullets[bulletIdx] = val;
    setResumeData(prev => ({ ...prev, experience: updated }));
  };

  const addExpBullet = (expIdx) => {
    const updated = [...resumeData.experience];
    updated[expIdx].bullets.push("Quantifiable accomplishment using targeted technology stack.");
    setResumeData(prev => ({ ...prev, experience: updated }));
  };

  const removeExpBullet = (expIdx, bulletIdx) => {
    const updated = [...resumeData.experience];
    updated[expIdx].bullets.splice(bulletIdx, 1);
    setResumeData(prev => ({ ...prev, experience: updated }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: `exp_${Date.now()}`,
          company: "Company Name",
          title: "Job Title / Role",
          dates: "Month Year – Month Year",
          location: "City, State",
          bullets: ["Key accomplishment using technology with quantified results."]
        }
      ]
    }));
  };

  const removeExperience = (idx) => {
    const updated = [...resumeData.experience];
    updated.splice(idx, 1);
    setResumeData(prev => ({ ...prev, experience: updated }));
  };

  const handleProjChange = (idx, field, val) => {
    const updated = [...resumeData.projects];
    updated[idx][field] = val;
    setResumeData(prev => ({ ...prev, projects: updated }));
  };

  const handleProjBulletChange = (projIdx, bulletIdx, val) => {
    const updated = [...resumeData.projects];
    updated[projIdx].bullets[bulletIdx] = val;
    setResumeData(prev => ({ ...prev, projects: updated }));
  };

  const addProjBullet = (projIdx) => {
    const updated = [...resumeData.projects];
    updated[projIdx].bullets.push("Engineered project features using full technology stack.");
    setResumeData(prev => ({ ...prev, projects: updated }));
  };

  const removeProjBullet = (projIdx, bulletIdx) => {
    const updated = [...resumeData.projects];
    updated[projIdx].bullets.splice(bulletIdx, 1);
    setResumeData(prev => ({ ...prev, projects: updated }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: `proj_${Date.now()}`,
          name: "Project Title",
          tech: "Technologies Used",
          dates: "Month Year",
          bullets: ["Engineered project functionality using stack."]
        }
      ]
    }));
  };

  const removeProject = (idx) => {
    const updated = [...resumeData.projects];
    updated.splice(idx, 1);
    setResumeData(prev => ({ ...prev, projects: updated }));
  };

  const handleAwardChange = (idx, field, val) => {
    const updated = [...(resumeData.awards || [])];
    updated[idx][field] = val;
    setResumeData(prev => ({ ...prev, awards: updated }));
  };

  const addAward = () => {
    setResumeData(prev => ({
      ...prev,
      awards: [
        ...(prev.awards || []),
        {
          id: `award_${Date.now()}`,
          title: "Award Title / Competition Rank",
          issuer: "Issuing Organization / Host",
          dates: "Month Year",
          details: "Short description of the achievement or rank achieved."
        }
      ]
    }));
  };

  const removeAward = (idx) => {
    const updated = [...(resumeData.awards || [])];
    updated.splice(idx, 1);
    setResumeData(prev => ({ ...prev, awards: updated }));
  };

  const handleSkillChange = (field, val) => {
    setResumeData(prev => ({
      ...prev,
      skills: { ...prev.skills, [field]: val }
    }));
  };

  return (
    <div className="max-w-[1700px] mx-auto px-4 py-6 space-y-6">
      
      {/* Top Banner Actions & Template Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-sm print:hidden">
        <div>
          <h1 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            Resume Editor Studio
          </h1>
          <p className="text-xs text-slate-500 font-normal">Switch templates live and print clean single-page ATS PDFs.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 flex items-center gap-1">
            <button
              onClick={() => { setSelectedTemplate('jakes'); showToast("Switched to Jake's Classic ATS Template"); }}
              className={`px-3 py-1 rounded-md text-xs font-bold transition ${selectedTemplate === 'jakes' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Jake's ATS Classic
            </button>
            <button
              onClick={() => { setSelectedTemplate('modern'); showToast("Switched to Modern Minimalist Template"); }}
              className={`px-3 py-1 rounded-md text-xs font-bold transition ${selectedTemplate === 'modern' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Modern Minimalist
            </button>
            <button
              onClick={() => { setSelectedTemplate('executive'); showToast("Switched to Executive Split Template"); }}
              className={`px-3 py-1 rounded-md text-xs font-bold transition ${selectedTemplate === 'executive' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Executive Split
            </button>
          </div>

          <button onClick={() => window.print()} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition">
            <Printer className="w-4 h-4" /> Print / Save PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: EDIT FORM CONTROLS */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 space-y-5 print:hidden max-h-[85vh] overflow-y-auto custom-scrollbar shadow-sm">
          
          {/* Section Navigation Pills */}
          <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-3">
            {['personal', 'education', 'coursework', 'experience', 'projects', 'awards', 'skills'].map(sec => (
              <button
                key={sec}
                onClick={() => setActiveSection(sec)}
                className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider transition ${activeSection === sec ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-slate-900'}`}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* 1. PERSONAL INFO */}
          {activeSection === 'personal' && (
            <div className="space-y-3 animate-fadeIn">
              <h3 className="text-xs font-bold uppercase text-indigo-600 tracking-wider">Header & Contact Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-slate-600 text-xs block mb-1 font-semibold">Full Name *</label>
                  <input type="text" value={resumeData.personal.fullName} onChange={(e) => handlePersonalChange('fullName', e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none" />
                </div>
                <div>
                  <label className="text-slate-600 text-xs block mb-1 font-semibold">City, State / Address</label>
                  <input type="text" value={resumeData.personal.location} onChange={(e) => handlePersonalChange('location', e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-600 text-xs block mb-1 font-semibold">Phone Number</label>
                    <input type="text" value={resumeData.personal.phone} onChange={(e) => handlePersonalChange('phone', e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-slate-600 text-xs block mb-1 font-semibold">Email Address</label>
                    <input type="text" value={resumeData.personal.email} onChange={(e) => handlePersonalChange('email', e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-600 text-xs block mb-1 font-semibold">LinkedIn Profile URL</label>
                    <input type="text" value={resumeData.personal.linkedin} onChange={(e) => handlePersonalChange('linkedin', e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-slate-600 text-xs block mb-1 font-semibold">GitHub Profile URL</label>
                    <input type="text" value={resumeData.personal.github} onChange={(e) => handlePersonalChange('github', e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-slate-600 text-xs block mb-1 font-semibold">Portfolio Website (Optional)</label>
                  <input type="text" value={resumeData.personal.portfolio || ""} onChange={(e) => handlePersonalChange('portfolio', e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none" />
                </div>
              </div>
            </div>
          )}

          {/* 2. EDUCATION */}
          {activeSection === 'education' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase text-indigo-600 tracking-wider">Education & CGPA</h3>
                <button onClick={addEducation} className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              {resumeData.education.map((edu, idx) => (
                <div key={edu.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2 relative">
                  {resumeData.education.length > 1 && (
                    <button onClick={() => removeEducation(idx)} className="absolute top-2 right-2 text-slate-400 hover:text-rose-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <div>
                    <label className="text-slate-600 text-xs block mb-1 font-semibold">University / College *</label>
                    <input type="text" value={edu.institution} onChange={(e) => handleEduChange(idx, 'institution', e.target.value)} className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-900" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-600 text-xs block mb-1 font-semibold">Degree</label>
                      <input type="text" value={edu.degree} onChange={(e) => handleEduChange(idx, 'degree', e.target.value)} className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-900" />
                    </div>
                    <div>
                      <label className="text-slate-600 text-xs block mb-1 font-semibold">Branch / Major</label>
                      <input type="text" value={edu.branch || ""} onChange={(e) => handleEduChange(idx, 'branch', e.target.value)} className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-900" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-slate-900 text-xs block mb-1 font-bold">CGPA / GPA</label>
                      <input type="text" value={edu.cgpa || ""} onChange={(e) => handleEduChange(idx, 'cgpa', e.target.value)} className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs font-bold text-slate-900" />
                    </div>
                    <div>
                      <label className="text-slate-600 text-xs block mb-1 font-semibold">Dates</label>
                      <input type="text" value={edu.dates} onChange={(e) => handleEduChange(idx, 'dates', e.target.value)} className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-900" />
                    </div>
                    <div>
                      <label className="text-slate-600 text-xs block mb-1 font-semibold">Location</label>
                      <input type="text" value={edu.location} onChange={(e) => handleEduChange(idx, 'location', e.target.value)} className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-900" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. COURSEWORK */}
          {activeSection === 'coursework' && (
            <div className="space-y-3 animate-fadeIn">
              <h3 className="text-xs font-bold uppercase text-indigo-600 tracking-wider">Relevant Coursework</h3>
              <div>
                <label className="text-slate-600 text-xs block mb-1 font-semibold font-sans">Courses (Comma separated)</label>
                <textarea
                  rows={4}
                  value={resumeData.coursework.join(', ')}
                  onChange={(e) => handleCourseworkChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-mono focus:border-indigo-600 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* 4. EXPERIENCE */}
          {activeSection === 'experience' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase text-indigo-600 tracking-wider">Work Experience</h3>
                <button onClick={addExperience} className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add Role
                </button>
              </div>

              {resumeData.experience.map((exp, expIdx) => (
                <div key={exp.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2 relative">
                  <button onClick={() => removeExperience(expIdx)} className="absolute top-2 right-2 text-slate-400 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-600 text-xs block mb-1 font-semibold">Company</label>
                      <input type="text" value={exp.company} onChange={(e) => handleExpChange(expIdx, 'company', e.target.value)} className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-900" />
                    </div>
                    <div>
                      <label className="text-slate-600 text-xs block mb-1 font-semibold">Job Title</label>
                      <input type="text" value={exp.title} onChange={(e) => handleExpChange(expIdx, 'title', e.target.value)} className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-900" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-600 text-xs block mb-1 font-semibold">Dates</label>
                      <input type="text" value={exp.dates} onChange={(e) => handleExpChange(expIdx, 'dates', e.target.value)} className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-900" />
                    </div>
                    <div>
                      <label className="text-slate-600 text-xs block mb-1 font-semibold">Location</label>
                      <input type="text" value={exp.location} onChange={(e) => handleExpChange(expIdx, 'location', e.target.value)} className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-900" />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Bullets</span>
                      <button onClick={() => addExpBullet(expIdx)} className="text-[11px] text-indigo-600 hover:underline">+ Add Bullet</button>
                    </div>
                    {exp.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex gap-2 items-start">
                        <textarea
                          rows={2}
                          value={b}
                          onChange={(e) => handleExpBulletChange(expIdx, bIdx, e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-900 resize-none"
                        />
                        <button onClick={() => removeExpBullet(expIdx, bIdx)} className="text-slate-400 hover:text-rose-600 pt-1">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 5. PROJECTS */}
          {activeSection === 'projects' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase text-indigo-600 tracking-wider">Projects</h3>
                <button onClick={addProject} className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add Project
                </button>
              </div>

              {resumeData.projects.map((proj, projIdx) => (
                <div key={proj.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2 relative">
                  <button onClick={() => removeProject(projIdx)} className="absolute top-2 right-2 text-slate-400 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-600 text-xs block mb-1 font-semibold">Project Name</label>
                      <input type="text" value={proj.name} onChange={(e) => handleProjChange(projIdx, 'name', e.target.value)} className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-900" />
                    </div>
                    <div>
                      <label className="text-slate-600 text-xs block mb-1 font-semibold">Date</label>
                      <input type="text" value={proj.dates} onChange={(e) => handleProjChange(projIdx, 'dates', e.target.value)} className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-900" />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-600 text-xs block mb-1 font-semibold">Tech Stack</label>
                    <input type="text" value={proj.tech} onChange={(e) => handleProjChange(projIdx, 'tech', e.target.value)} className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-900" />
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Bullets</span>
                      <button onClick={() => addProjBullet(projIdx)} className="text-[11px] text-indigo-600 hover:underline">+ Add Bullet</button>
                    </div>
                    {proj.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex gap-2 items-start">
                        <textarea
                          rows={2}
                          value={b}
                          onChange={(e) => handleProjBulletChange(projIdx, bIdx, e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-900 resize-none"
                        />
                        <button onClick={() => removeProjBullet(projIdx, bIdx)} className="text-slate-400 hover:text-rose-600 pt-1">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 6. AWARDS */}
          {activeSection === 'awards' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase text-indigo-600 tracking-wider">Honors & Awards (Optional)</h3>
                </div>
                <button onClick={addAward} className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              {(resumeData.awards || []).map((award, awardIdx) => (
                <div key={award.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2 relative">
                  <button onClick={() => removeAward(awardIdx)} className="absolute top-2 right-2 text-slate-400 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-600 text-xs block mb-1 font-semibold">Title</label>
                      <input type="text" value={award.title} onChange={(e) => handleAwardChange(awardIdx, 'title', e.target.value)} className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-900" />
                    </div>
                    <div>
                      <label className="text-slate-600 text-xs block mb-1 font-semibold">Date</label>
                      <input type="text" value={award.dates} onChange={(e) => handleAwardChange(awardIdx, 'dates', e.target.value)} className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-900" />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-600 text-xs block mb-1 font-semibold">Issuer / Host</label>
                    <input type="text" value={award.issuer} onChange={(e) => handleAwardChange(awardIdx, 'issuer', e.target.value)} className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-900" />
                  </div>

                  <div>
                    <label className="text-slate-600 text-xs block mb-1 font-semibold">Short Details</label>
                    <input type="text" value={award.details} onChange={(e) => handleAwardChange(awardIdx, 'details', e.target.value)} className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-900" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 7. SKILLS */}
          {activeSection === 'skills' && (
            <div className="space-y-3 animate-fadeIn">
              <h3 className="text-xs font-bold uppercase text-indigo-600 tracking-wider">Skills & Certifications</h3>
              <div>
                <label className="text-slate-600 text-xs block mb-1 font-semibold">Languages</label>
                <input type="text" value={resumeData.skills.languages} onChange={(e) => handleSkillChange('languages', e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900" />
              </div>
              <div>
                <label className="text-slate-600 text-xs block mb-1 font-semibold">Frameworks / Tech</label>
                <input type="text" value={resumeData.skills.frameworks} onChange={(e) => handleSkillChange('frameworks', e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900" />
              </div>
              <div>
                <label className="text-slate-600 text-xs block mb-1 font-semibold">Developer Tools</label>
                <input type="text" value={resumeData.skills.tools} onChange={(e) => handleSkillChange('tools', e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900" />
              </div>
              <div>
                <label className="text-slate-600 text-xs block mb-1 font-semibold">Soft Skills</label>
                <input type="text" value={resumeData.skills.soft || ""} onChange={(e) => handleSkillChange('soft', e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900" />
              </div>
              <div>
                <label className="text-slate-600 text-xs block mb-1 font-semibold">Certifications</label>
                <input type="text" value={resumeData.skills.certifications || ""} onChange={(e) => handleSkillChange('certifications', e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900" />
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: PREVIEW CONTAINER */}
        <div className="lg:col-span-7 bg-white text-slate-950 rounded-xl p-10 shadow-lg min-h-[1050px] border border-slate-300 print:p-0 print:shadow-none print:border-none" id="resume-preview">
          
          {selectedTemplate === 'jakes' && <JakesClassicPreview resumeData={resumeData} />}
          {selectedTemplate === 'modern' && <ModernMinimalPreview resumeData={resumeData} />}
          {selectedTemplate === 'executive' && <ExecutiveSplitPreview resumeData={resumeData} />}

        </div>

      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TEMPLATES PREVIEWS (UNTOUCHED ATS SPEC)
// -------------------------------------------------------------
function JakesClassicPreview({ resumeData }) {
  return (
    <div className="font-serif leading-tight">
      <div className="text-center space-y-1 mb-3">
        <h1 className="text-3xl font-extrabold tracking-wide uppercase font-serif text-black">{resumeData.personal.fullName || "First Last"}</h1>
        <p className="text-[13px] text-slate-800 font-serif">{resumeData.personal.location}</p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-[12px] text-slate-900 font-serif pt-0.5">
          {resumeData.personal.phone && <span>📞 {resumeData.personal.phone}</span>}
          {resumeData.personal.email && <span>✉ {resumeData.personal.email}</span>}
          {resumeData.personal.linkedin && <span>🔗 {resumeData.personal.linkedin}</span>}
          {resumeData.personal.github && <span>💻 {resumeData.personal.github}</span>}
          {resumeData.personal.portfolio && <span>🌐 {resumeData.personal.portfolio}</span>}
        </div>
      </div>

      <div className="mb-3">
        <h2 className="text-[14px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">Education</h2>
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="mb-1.5">
            <div className="flex justify-between items-baseline text-[13px] font-bold text-black">
              <span>{edu.institution}</span>
              <span>{edu.dates}</span>
            </div>
            <div className="flex justify-between items-baseline text-[12px] italic text-slate-800">
              <span>
                {edu.degree} {edu.branch ? `in ${edu.branch}` : ''} {edu.cgpa ? `(CGPA: ${edu.cgpa})` : ''}
              </span>
              <span>{edu.location}</span>
            </div>
          </div>
        ))}

        {resumeData.coursework.length > 0 && (
          <div className="mt-2 text-[12px] text-slate-900">
            <span className="font-bold block mb-1">Relevant Coursework:</span>
            <div className="grid grid-cols-4 gap-x-2 gap-y-0.5 pl-3">
              {resumeData.coursework.map((course, cIdx) => (
                <div key={cIdx} className="text-[11.5px]">• {course}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      {resumeData.experience.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[14px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">Experience</h2>
          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="mb-2.5">
              <div className="flex justify-between items-baseline text-[13px] font-bold text-black">
                <span>{exp.company}</span>
                <span>{exp.dates}</span>
              </div>
              <div className="flex justify-between items-baseline text-[12px] italic text-slate-800 mb-1">
                <span>{exp.title}</span>
                <span>{exp.location}</span>
              </div>
              <ul className="list-disc pl-5 text-[11.5px] text-slate-900 space-y-0.5 leading-snug">
                {exp.bullets.map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {resumeData.projects.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[14px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">Projects</h2>
          {resumeData.projects.map((proj) => (
            <div key={proj.id} className="mb-2">
              <div className="flex justify-between items-baseline text-[12.5px] text-black">
                <div>
                  <span className="font-bold">{proj.name}</span>
                  {proj.tech && <span className="italic font-normal"> | {proj.tech}</span>}
                </div>
                <span className="font-bold text-[12px]">{proj.dates}</span>
              </div>
              <ul className="list-disc pl-5 text-[11.5px] text-slate-900 space-y-0.5 leading-snug mt-0.5">
                {proj.bullets.map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {resumeData.awards && resumeData.awards.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[14px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">Honors & Awards</h2>
          {resumeData.awards.map((award) => (
            <div key={award.id} className="mb-1.5">
              <div className="flex justify-between items-baseline text-[12.5px] text-black font-bold">
                <span>{award.title} {award.issuer ? `— ${award.issuer}` : ''}</span>
                <span className="text-[12px] font-normal">{award.dates}</span>
              </div>
              {award.details && (
                <p className="text-[11.5px] text-slate-800 pl-3 leading-snug mt-0.5">• {award.details}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <div>
        <h2 className="text-[14px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">Technical Skills</h2>
        <div className="text-[12px] text-slate-900 space-y-1">
          {resumeData.skills.languages && <div><strong className="font-bold text-black">Languages:</strong> {resumeData.skills.languages}</div>}
          {resumeData.skills.frameworks && <div><strong className="font-bold text-black">Frameworks / Tech:</strong> {resumeData.skills.frameworks}</div>}
          {resumeData.skills.tools && <div><strong className="font-bold text-black">Developer Tools:</strong> {resumeData.skills.tools}</div>}
          {resumeData.skills.soft && <div><strong className="font-bold text-black">Soft Skills:</strong> {resumeData.skills.soft}</div>}
          {resumeData.skills.certifications && <div><strong className="font-bold text-black">Certifications:</strong> {resumeData.skills.certifications}</div>}
        </div>
      </div>
    </div>
  );
}

function ModernMinimalPreview({ resumeData }) {
  return (
    <div className="font-sans leading-relaxed text-slate-900 space-y-5">
      <div className="border-b-2 border-indigo-600 pb-4">
        <h1 className="text-3xl font-black tracking-tight text-slate-950 uppercase">{resumeData.personal.fullName}</h1>
        <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest mt-1">{resumeData.personal.location}</p>
        <div className="flex flex-wrap gap-4 text-xs text-slate-600 pt-2 font-medium">
          {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
          {resumeData.personal.phone && <span>{resumeData.personal.phone}</span>}
          {resumeData.personal.linkedin && <span>{resumeData.personal.linkedin}</span>}
          {resumeData.personal.github && <span>{resumeData.personal.github}</span>}
        </div>
      </div>

      <div>
        <h2 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-2">Education</h2>
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="mb-2">
            <div className="flex justify-between text-xs font-bold text-slate-950">
              <span>{edu.institution}</span>
              <span>{edu.dates}</span>
            </div>
            <div className="text-xs text-slate-700 italic">
              {edu.degree} in {edu.branch} {edu.cgpa ? `(CGPA: ${edu.cgpa})` : ''}
            </div>
          </div>
        ))}
      </div>

      {resumeData.experience.length > 0 && (
        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-2">Work Experience</h2>
          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="mb-3 space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-950">
                <span>{exp.title} — {exp.company}</span>
                <span className="font-normal text-slate-500">{exp.dates}</span>
              </div>
              <ul className="list-disc pl-4 text-[11.5px] text-slate-700 space-y-1">
                {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {resumeData.projects.length > 0 && (
        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-2">Projects</h2>
          {resumeData.projects.map((proj) => (
            <div key={proj.id} className="mb-2 space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-950">
                <span>{proj.name} <span className="font-normal text-slate-500">({proj.tech})</span></span>
                <span className="font-normal text-slate-500">{proj.dates}</span>
              </div>
              <ul className="list-disc pl-4 text-[11.5px] text-slate-700 space-y-0.5">
                {proj.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div>
        <h2 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-2">Technical Competencies</h2>
        <div className="text-[11.5px] text-slate-800 space-y-1">
          <div><strong className="text-slate-950">Languages & Tools:</strong> {resumeData.skills.languages}</div>
          <div><strong className="text-slate-950">Frameworks:</strong> {resumeData.skills.frameworks}</div>
        </div>
      </div>
    </div>
  );
}

function ExecutiveSplitPreview({ resumeData }) {
  return (
    <div className="font-sans grid grid-cols-12 gap-6 text-slate-900 leading-normal">
      <div className="col-span-12 border-b border-slate-300 pb-3">
        <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">{resumeData.personal.fullName}</h1>
        <p className="text-xs text-slate-600 font-semibold">{resumeData.personal.location} | {resumeData.personal.email} | {resumeData.personal.phone}</p>
      </div>

      <div className="col-span-8 space-y-4">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">Experience</h2>
          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="mb-3 space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-950">
                <span>{exp.title}</span>
                <span className="text-[11px] font-normal text-slate-600">{exp.dates}</span>
              </div>
              <p className="text-[11.5px] italic text-slate-700">{exp.company}</p>
              <ul className="list-disc pl-4 text-[11px] text-slate-800 space-y-0.5">
                {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">Key Projects</h2>
          {resumeData.projects.map((proj) => (
            <div key={proj.id} className="mb-2">
              <span className="text-xs font-bold text-slate-950 block">{proj.name}</span>
              <ul className="list-disc pl-4 text-[11px] text-slate-800 space-y-0.5">
                {proj.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-4 bg-slate-50 p-4 rounded-lg space-y-4 border border-slate-200">
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-1">Education</h2>
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="text-[11px] text-slate-800 space-y-0.5 mb-2">
              <span className="font-bold block">{edu.institution}</span>
              <span>{edu.degree}</span>
              <span className="block text-slate-600 font-semibold">{edu.cgpa}</span>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-1">Skills</h2>
          <p className="text-[11px] text-slate-700">{resumeData.skills.languages}</p>
        </div>

        {resumeData.skills.certifications && (
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-1">Certifications</h2>
            <p className="text-[11px] text-slate-700">{resumeData.skills.certifications}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// ATS SCANNER SUITE (LIGHT THEME)
// -------------------------------------------------------------
function AtsCheckerSuite({ resumeData, showToast }) {
  const [jdText, setJdText] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      showToast(`Uploaded: ${file.name}`);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile(file);
      showToast(`Uploaded: ${file.name}`);
    }
  };

  const runAnalysis = () => {
    if (!uploadedFile && !jdText) {
      showToast("Please upload a PDF or paste a Job Description first.");
      return;
    }

    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setAnalysis({
        score: 88,
        totalKeywords: 18,
        matchedKeywords: ["Python", "React", "SQL", "Git", "REST APIs", "Node.js"],
        missingKeywords: ["AWS Lambda", "Kubernetes", "GraphQL", "CI/CD Pipeline"],
        formattingScore: 98,
        recommendations: [
          "Format matches 98%+ of ATS recruiters' preferred single-column Jake's Resume layout.",
          "Add missing cloud keywords directly into your Technical Skills section.",
          "Quantify numerical impact on all experience bullet points."
        ]
      });
      showToast("ATS Audit complete!");
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8 animate-fadeIn">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider">
          PDF & Resume ATS Scanner
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Upload Resume & Check Match Score</h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">Upload your PDF resume or parse directly against target job descriptions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
          className="bg-white border-2 border-dashed border-slate-300 hover:border-indigo-600 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition shadow-sm"
        >
          <input ref={fileInputRef} type="file" accept=".pdf,.docx,.doc" onChange={handleFileUpload} className="hidden" />
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
            <Upload className="w-6 h-6" />
          </div>
          {uploadedFile ? (
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 justify-center">
                <CheckCircle className="w-4 h-4" /> File Selected
              </span>
              <p className="text-sm font-semibold text-slate-900">{uploadedFile.name}</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900">Drag & Drop Resume PDF</p>
              <p className="text-xs text-slate-500">Supports .PDF, .DOCX (Up to 10MB)</p>
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col space-y-2 shadow-sm">
          <label className="text-xs font-bold text-slate-800 tracking-wider uppercase flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-indigo-600" /> Target Job Description
          </label>
          <textarea
            rows={5}
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste job description keywords here..."
            className="w-full flex-1 bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
          />
        </div>
      </div>

      <button
        onClick={runAnalysis}
        disabled={isScanning}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-sm flex items-center justify-center gap-2 transition"
      >
        {isScanning ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" /> Calculating Match Score...
          </>
        ) : (
          <>
            <Zap className="w-4 h-4" /> Run ATS Audit
          </>
        )}
      </button>

      {analysis && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-sm animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900">ATS Audit Summary</h3>
              <p className="text-xs text-slate-500">Parsing analysis for target role requirement match.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <span className="text-3xl font-black text-emerald-600">{analysis.score}%</span>
                <span className="text-[10px] uppercase block text-slate-500 font-bold">Match Score</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 space-y-2">
              <h4 className="text-xs font-bold text-emerald-800 uppercase flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" /> Matched Keywords
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {analysis.matchedKeywords.map((kw, i) => (
                  <span key={i} className="px-2 py-0.5 bg-white text-emerald-800 border border-emerald-300 rounded text-xs font-semibold">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-rose-50 rounded-lg border border-rose-200 space-y-2">
              <h4 className="text-xs font-bold text-rose-800 uppercase flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Missing Keywords
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {analysis.missingKeywords.map((kw, i) => (
                  <span key={i} className="px-2 py-0.5 bg-white text-rose-800 border border-rose-300 rounded text-xs font-semibold">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// CAMPUS AMBASSADOR ECOSYSTEM (LIGHT THEME)
// -------------------------------------------------------------
function CampusEcosystemView({ showToast }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    yearOfStudy: "3rd Year",
    branch: "Computer Science",
    linkedin: "",
    whyApply: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.college) {
      showToast("Please fill in required fields.");
      return;
    }
    setSubmitted(true);
    showToast("Application Submitted Successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10 animate-fadeIn">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-full text-xs font-bold uppercase tracking-wider">
          Student Leadership Network
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">Become a Campus Lead</h1>
        <p className="text-xs sm:text-sm text-slate-600">Lead placement preparation drives and empower fellow students on campus.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-3 animate-fadeIn">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900">Application Submitted!</h3>
              <p className="text-xs text-slate-600">We will get in touch with you shortly.</p>
              <button onClick={() => setSubmitted(false)} className="px-4 py-2 bg-slate-100 text-xs font-bold text-slate-800 rounded-lg hover:bg-slate-200">Submit Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-sm font-bold uppercase text-indigo-600 tracking-wider">Campus Lead Form</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 text-xs block mb-1 font-semibold">Full Name *</label>
                  <input type="text" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600" />
                </div>
                <div>
                  <label className="text-slate-700 text-xs block mb-1 font-semibold">Student Email *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 text-xs block mb-1 font-semibold">College / University Name *</label>
                  <input type="text" required value={formData.college} onChange={(e) => setFormData({ ...formData, college: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600" />
                </div>
                <div>
                  <label className="text-slate-700 text-xs block mb-1 font-semibold">Phone Number</label>
                  <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600" />
                </div>
              </div>

              <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 font-bold text-xs uppercase tracking-wider text-white rounded-xl shadow-sm transition flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Submit Application
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold uppercase text-indigo-600 tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" /> Lead Privileges
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Leadership Credential Certificate</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Priority ATS Resume Reviews</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 
