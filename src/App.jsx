import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Sparkles, CheckCircle2, ChevronRight, FileText, Search, UserCheck, 
  Award, Briefcase, Users, Building2, TrendingUp, Download, Play, 
  ArrowRight, ShieldCheck, Zap, Menu, X, Plus, Trash2, Edit3, Share2, 
  MessageSquare, Star, BarChart3, Clock, Check, AlertCircle, Copy, 
  BookOpen, ExternalLink, RefreshCw, Mic, Volume2, Globe, GraduationCap,
  Layers, Lock, ChevronDown, CheckCircle, Flame, Filter, Trophy, Send, Heart, Eye
} from 'lucide-react';

const INITIAL_RESUME_DATA = {
  personal: {
    fullName: "",
    email: "student@college.edu.in",
    phone: "+91 98765 43210",
    location: "Bengaluru, India",
    linkedin: "linkedin.com/in/student-profile",
    github: "github.com/student-dev",
    portfolio: "studentportfolio.dev"
  },
  education: [
    {
      id: "edu_1",
      institution: "National Institute of Technology Karnataka (NITK), Surathkal",
      degree: "B.Tech",
      branch: "Computer Science & Engineering",
      cgpa: "8.8/10",
      gradYear: "2025"
    }
  ],
  experience: [
    {
      id: "exp_1",
      title: "Frontend Developer Intern",
      company: "TechNova Solutions",
      location: "Bengaluru (Remote)",
      duration: "May 2024 - Jul 2024",
      description: "Developed and optimized client-facing dashboards using React, Tailwind CSS, and Redux Toolkit. Increased page render speed by 35% through lazy loading."
    }
  ],
  projects: [
    {
      id: "proj_1",
      name: "CampusConnect - Event Portal",
      tech: "React, Node.js, MongoDB, Tailwind",
      link: "github.com/student-dev/campus-connect",
      description: "Built a central event management system serving 3,500+ students across 12 campus clubs. Streamlined seat registration and ticket issuing."
    },
    {
      id: "proj_2",
      name: "Smart Resume Parser",
      tech: "Python, FastAPI, SpaCy, NLP",
      link: "github.com/student-dev/resume-parser",
      description: "Engineered an NLP model to extract skill entities from raw PDFs with 89% accuracy. Processed 1,000+ test resumes."
    }
  ],
  skills: {
    technical: ["React.js", "JavaScript (ES6+)", "Python", "Node.js", "SQL", "Tailwind CSS", "Git/GitHub", "REST APIs"],
    soft: ["Problem Solving", "Team Leadership", "Agile Collaboration"],
    tools: ["VS Code", "Figma", "Postman", "Docker Basics"]
  },
  certifications: ["AWS Certified Cloud Practitioner", "Meta Front-End Developer Specialization"],
  achievements: ["Finalist - Smart India Hackathon 2023", "Branch Rank #4 out of 140 students"]
};

const MOCK_JOBS = [
  {
    id: "job_1",
    title: "Software Engineer Intern",
    company: "Zomato",
    logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=120&h=120",
    location: "Gurugram / Remote",
    stipend: "₹40,000 / month",
    type: "Internship (6 Months)",
    matchingScore: 92,
    matchingSkills: ["React.js", "JavaScript (ES6+)", "Python", "SQL", "Git/GitHub"],
    missingSkills: ["TypeScript", "AWS"],
    description: "Looking for a high-energy SDE intern with strong CS fundamentals, hands-on React knowledge, and data structuring skills."
  },
  {
    id: "job_2",
    title: "Associate Product Manager Intern",
    company: "Swiggy",
    logo: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=120&h=120",
    location: "Bengaluru",
    stipend: "₹45,000 / month",
    type: "Internship",
    matchingScore: 84,
    matchingSkills: ["Problem Solving", "Team Leadership", "Figma", "SQL"],
    missingSkills: ["Product Analytics", "Mixpanel"],
    description: "Work directly with Senior PMs on consumer growth, funnel optimization, and user research projects across top tier cities."
  },
  {
    id: "job_3",
    title: "Backend Engineer Intern",
    company: "Razorpay",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=120&h=120",
    location: "Bengaluru",
    stipend: "₹50,000 / month",
    type: "Full-Time Hiring Track",
    matchingScore: 78,
    matchingSkills: ["Python", "Node.js", "SQL", "REST APIs"],
    missingSkills: ["Go", "Kafka", "Redis"],
    description: "Join the Core Payments team. Build ultra-scalable, low-latency microservices handling millions of API transactions daily."
  }
];

const INITIAL_APPLICATIONS = [
  { id: "app_1", company: "Zomato", role: "SDE Intern", date: "Oct 12, 2026", status: "Applied", atsScore: 91, nextAction: "Awaiting Assessment" },
  { id: "app_2", company: "CRED", role: "Frontend Developer", date: "Oct 08, 2026", status: "Assessment", atsScore: 88, nextAction: "Code Test due in 2 days" },
  { id: "app_3", company: "PhonePe", role: "Software Engineer", date: "Sep 28, 2026", status: "Interview", atsScore: 94, nextAction: "Technical Round 2 - Oct 18" },
  { id: "app_4", company: "BrowserStack", role: "SDET Intern", date: "Sep 15, 2026", status: "Offer", atsScore: 89, nextAction: "Offer Acceptance Pending" }
];

const MOCK_LEADERBOARD = [
  { rank: 1, college: "VIT Vellore", state: "Tamil Nadu", activeStudents: "4,820", ambassadors: 18, clubScore: 9850 },
  { rank: 2, college: "NITK Surathkal", state: "Karnataka", activeStudents: "3,140", ambassadors: 12, clubScore: 9420 },
  { rank: 3, college: "BITS Pilani", state: "Rajasthan", activeStudents: "2,950", ambassadors: 14, clubScore: 9110 },
  { rank: 4, college: "IIT Bombay", state: "Maharashtra", activeStudents: "2,810", ambassadors: 11, clubScore: 8900 },
  { rank: 5, college: "PES University", state: "Karnataka", activeStudents: "2,430", ambassadors: 9, clubScore: 8540 }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeData, setResumeData] = useState(INITIAL_RESUME_DATA);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  
  const [atsInputText, setAtsInputText] = useState("");
  const [atsTargetJD, setAtsTargetJD] = useState("");
  const [atsResults, setAtsResults] = useState(null);
  const [isAnalyzingATS, setIsAnalyzingATS] = useState(false);

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

  const handleAnalyzeATS = () => {
    if (!atsInputText && !resumeData.personal.fullName) {
      showToast("Please enter or paste resume content to analyze.");
      return;
    }

    setIsAnalyzingATS(true);
    setTimeout(() => {
      const textToAnalyze = (atsInputText + " " + JSON.stringify(resumeData)).toLowerCase();
      const jdText = atsTargetJD.toLowerCase();

      let keywordScore = 75;
      let skillsScore = 80;
      let experienceScore = 78;
      let formattingScore = 92;
      let educationScore = 88;

      if (jdText) {
        const keywords = ["python", "react", "sql", "git", "aws", "agile", "api", "communication", "leadership"];
        let matched = 0;
        keywords.forEach(kw => {
          if (jdText.includes(kw) && textToAnalyze.includes(kw)) matched++;
        });
        keywordScore = Math.min(98, Math.max(55, Math.floor((matched / keywords.length) * 100) + 20));
      }

      const overall = Math.round((keywordScore * 0.3) + (skillsScore * 0.25) + (experienceScore * 0.2) + (formattingScore * 0.15) + (educationScore * 0.1));

      const missingKeywords = [];
      if (!textToAnalyze.includes("aws")) missingKeywords.push("AWS / Cloud Fundamentals");
      if (!textToAnalyze.includes("docker")) missingKeywords.push("Docker Containerization");
      if (!textToAnalyze.includes("agile")) missingKeywords.push("Agile / Scrum Methodology");
      if (!textToAnalyze.includes("ci/cd")) missingKeywords.push("CI/CD Automation Pipelines");

      setAtsResults({
        overall,
        keywordMatch: keywordScore,
        skillsMatch: skillsScore,
        experienceRelevance: experienceScore,
        formatting: formattingScore,
        educationMatch: educationScore,
        missingKeywords,
        suggestions: [
          "Add quantifiable metrics to project descriptions (e.g., 'improved speed by 30%').",
          "Include target keywords from job description directly in your Skills section.",
          "Ensure experience dates use consistent MM/YYYY formatting.",
          "Add 2 more backend micro-services keywords for target SWE roles."
        ]
      });
      setIsAnalyzingATS(false);
      showToast("ATS Audit complete! Review actionable suggestions below.");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col antialiased">
      {/* Toast Banner with Slide-In Animation */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-indigo-600 to-sky-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-indigo-400/40 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-300 flex-shrink-0 animate-spin" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('home')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                Aspiraa <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">OS</span>
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-300">
            <button onClick={() => navigateTo('home')} className={`px-3 py-2 rounded-lg transition-all duration-200 ${activeTab === 'home' ? 'text-white bg-slate-800/80 font-semibold shadow-inner' : 'hover:text-white hover:bg-slate-800/40'}`}>Home</button>
            <button onClick={() => navigateTo('ats')} className={`px-3 py-2 rounded-lg transition-all duration-200 ${activeTab === 'ats' ? 'text-white bg-slate-800/80 font-semibold shadow-inner' : 'hover:text-white hover:bg-slate-800/40'}`}>ATS Score</button>
            <button onClick={() => navigateTo('builder')} className={`px-3 py-2 rounded-lg transition-all duration-200 ${activeTab === 'builder' ? 'text-white bg-slate-800/80 font-semibold shadow-inner' : 'hover:text-white hover:bg-slate-800/40'}`}>Resume Builder</button>
            <button onClick={() => navigateTo('jobs')} className={`px-3 py-2 rounded-lg transition-all duration-200 ${activeTab === 'jobs' ? 'text-white bg-slate-800/80 font-semibold shadow-inner' : 'hover:text-white hover:bg-slate-800/40'}`}>Job Match</button>
            <button onClick={() => navigateTo('interview')} className={`px-3 py-2 rounded-lg transition-all duration-200 ${activeTab === 'interview' ? 'text-white bg-slate-800/80 font-semibold shadow-inner' : 'hover:text-white hover:bg-slate-800/40'}`}>Interview Prep</button>
            <button onClick={() => navigateTo('tracker')} className={`px-3 py-2 rounded-lg transition-all duration-200 ${activeTab === 'tracker' ? 'text-white bg-slate-800/80 font-semibold shadow-inner' : 'hover:text-white hover:bg-slate-800/40'}`}>Tracker</button>
            <button onClick={() => navigateTo('campus')} className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-1.5 ${activeTab === 'campus' ? 'text-indigo-400 bg-indigo-500/10 font-semibold border border-indigo-500/30' : 'hover:text-indigo-300 hover:bg-slate-800/40'}`}>
              <GraduationCap className="w-4 h-4 text-indigo-400 animate-pulse" />
              Campus
            </button>
            <button onClick={() => navigateTo('employer')} className={`px-3 py-2 rounded-lg transition-all duration-200 ${activeTab === 'employer' ? 'text-amber-400 bg-amber-500/10 font-semibold border border-amber-500/30' : 'hover:text-amber-300 hover:bg-slate-800/40'}`}>Employers</button>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <button onClick={() => navigateTo('profile')} className="text-xs font-semibold px-3.5 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500 hover:text-white hover:shadow-lg transition flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-indigo-400" />
              <span>{resumeData.personal.fullName ? `${resumeData.personal.fullName.split(' ')[0]}'s Profile` : 'My Profile'}</span>
            </button>
            <button onClick={() => navigateTo('builder')} className="text-xs font-bold px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition duration-200">
              Build Resume
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-2 text-sm font-medium animate-fadeIn">
            <button onClick={() => navigateTo('home')} className="block w-full text-left px-3 py-2 rounded bg-slate-900 text-white">Home</button>
            <button onClick={() => navigateTo('ats')} className="block w-full text-left px-3 py-2 rounded hover:bg-slate-900 text-slate-300">Check ATS Score</button>
            <button onClick={() => navigateTo('builder')} className="block w-full text-left px-3 py-2 rounded hover:bg-slate-900 text-slate-300">Resume Builder</button>
            <button onClick={() => navigateTo('profile')} className="block w-full text-left px-3 py-2 rounded hover:bg-slate-900 text-slate-300">Student Career Profile</button>
            <button onClick={() => navigateTo('jobs')} className="block w-full text-left px-3 py-2 rounded hover:bg-slate-900 text-slate-300">Job Matching</button>
            <button onClick={() => navigateTo('interview')} className="block w-full text-left px-3 py-2 rounded hover:bg-slate-900 text-slate-300">Interview Prep</button>
            <button onClick={() => navigateTo('tracker')} className="block w-full text-left px-3 py-2 rounded hover:bg-slate-900 text-slate-300">Application Tracker</button>
            <button onClick={() => navigateTo('campus')} className="block w-full text-left px-3 py-2 rounded hover:bg-indigo-950/40 text-indigo-400 font-bold">Campus & Ambassador</button>
            <button onClick={() => navigateTo('employer')} className="block w-full text-left px-3 py-2 rounded hover:bg-amber-950/40 text-amber-400">For Employers & Recruiters</button>
          </div>
        )}
      </header>

      {/* DYNAMIC VIEWS WITH ANIMATED MOUNT */}
      <main className="flex-1">
        {activeTab === 'home' && <HomeView navigateTo={navigateTo} handleAnalyzeATS={handleAnalyzeATS} setAtsInputText={setAtsInputText} setAtsTargetJD={setAtsTargetJD} />}
        {activeTab === 'ats' && <AtsCheckerSuite atsInputText={atsInputText} setAtsInputText={setAtsInputText} atsTargetJD={atsTargetJD} setAtsTargetJD={setAtsTargetJD} atsResults={atsResults} handleAnalyzeATS={handleAnalyzeATS} isAnalyzingATS={isAnalyzingATS} navigateTo={navigateTo} />}
        {activeTab === 'builder' && <ResumeBuilderStudio resumeData={resumeData} setResumeData={setResumeData} showToast={showToast} navigateTo={navigateTo} />}
        {activeTab === 'profile' && <StudentProfileView resumeData={resumeData} navigateTo={navigateTo} showToast={showToast} />}
        {activeTab === 'jobs' && <JobMatchHub resumeData={resumeData} navigateTo={navigateTo} showToast={showToast} />}
        {activeTab === 'interview' && <InterviewPrepStudio showToast={showToast} />}
        {activeTab === 'linkedin' && <LinkedInOptimizerView showToast={showToast} />}
        {activeTab === 'tracker' && <ApplicationTrackerView applications={applications} setApplications={setApplications} showToast={showToast} />}
        {activeTab === 'campus' && <CampusEcosystemView navigateTo={navigateTo} showToast={showToast} />}
        {activeTab === 'employer' && <EmployerPortalView navigateTo={navigateTo} showToast={showToast} />}
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-sm py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-400 flex items-center justify-center font-bold text-white">A</div>
              <span className="text-xl font-bold text-white">Aspiraa</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              The Career Operating System for Indian College Students. Empowering freshers across 500+ campuses with AI resume intelligence, ATS optimization, placement prep, and campus communities.
            </p>
            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} Aspiraa Technologies Pvt. Ltd. All rights reserved.
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Product Core</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => navigateTo('builder')} className="hover:text-indigo-400 transition">AI Resume Builder</button></li>
              <li><button onClick={() => navigateTo('ats')} className="hover:text-indigo-400 transition">ATS Checker India</button></li>
              <li><button onClick={() => navigateTo('jobs')} className="hover:text-indigo-400 transition">Job & Internship Match</button></li>
              <li><button onClick={() => navigateTo('interview')} className="hover:text-indigo-400 transition">AI Mock Interview Studio</button></li>
              <li><button onClick={() => navigateTo('linkedin')} className="hover:text-indigo-400 transition">LinkedIn Optimizer</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Campus Ecosystem</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => navigateTo('campus')} className="hover:text-indigo-400 transition">Campus Ambassador Program</button></li>
              <li><button onClick={() => navigateTo('campus')} className="hover:text-indigo-400 transition">Aspiraa Campus Clubs</button></li>
              <li><button onClick={() => navigateTo('campus')} className="hover:text-indigo-400 transition">National College Leaderboard</button></li>
              <li><button onClick={() => navigateTo('employer')} className="hover:text-indigo-400 transition">TPO & Admin Portal</button></li>
              <li><button onClick={() => navigateTo('employer')} className="hover:text-indigo-400 transition">Employer Hiring Solutions</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Target Freshers</h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-slate-200 cursor-pointer">B.Tech CS / IT Resumes</li>
              <li className="hover:text-slate-200 cursor-pointer">Electronics & Mechanical Fresher</li>
              <li className="hover:text-slate-200 cursor-pointer">MBA & Finance Applications</li>
              <li className="hover:text-slate-200 cursor-pointer">Placement Readiness Test</li>
              <li className="hover:text-slate-200 cursor-pointer">Freshers Salary Benchmark</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

// -------------------------------------------------------------
// 1. HOME LANDING PAGE
// -------------------------------------------------------------
function HomeView({ navigateTo, handleAnalyzeATS, setAtsInputText, setAtsTargetJD }) {
  const [quickPasteText, setQuickPasteText] = useState("");
  const [quickJdText, setQuickJdText] = useState("");

  const triggerHeroAnalysis = () => {
    setAtsInputText(quickPasteText || "CSE Undergraduate with React, Node.js and Python projects...");
    setAtsTargetJD(quickJdText || "Software Engineer Intern skilled in Python, React, and SQL...");
    navigateTo('ats');
    handleAnalyzeATS();
  };

  return (
    <div className="space-y-20 pb-20 animate-fadeIn">
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-800/50 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>The #1 Career OS for Indian Engineering & Business Colleges</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Your Career. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 animate-gradient">
                One Powerful Platform.
              </span>
            </h1>

            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Go seamlessly from <span className="text-white font-semibold">College</span> → <span className="text-indigo-400 font-semibold">Skills</span> → <span className="text-sky-400 font-semibold">Resume</span> → <span className="text-emerald-400 font-semibold">Job Match</span> → <span className="text-amber-400 font-semibold">Interviews</span> → <span className="text-purple-400 font-semibold">Career</span>.
              Built specifically for Indian students navigating tier-1, 2, and 3 campus placements.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button onClick={() => navigateTo('builder')} className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:scale-105 transition duration-200 flex items-center justify-center gap-2 group">
                <span>Build My Resume Free</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
              <button onClick={() => navigateTo('ats')} className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-slate-700 bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition duration-200 flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Check ATS Score Instant</span>
              </button>
            </div>

            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
              <div className="hover:translate-y-[-2px] transition duration-200">
                <div className="text-xl font-black text-white">500+</div>
                <div className="text-xs text-slate-400">Indian Campuses</div>
              </div>
              <div className="hover:translate-y-[-2px] transition duration-200">
                <div className="text-xl font-black text-white">88%</div>
                <div className="text-xs text-slate-400">ATS Shortlist Rate</div>
              </div>
              <div className="hover:translate-y-[-2px] transition duration-200">
                <div className="text-xl font-black text-white">₹8.4 LPA</div>
                <div className="text-xs text-slate-400">Avg Fresher Package</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl hover:border-indigo-500/50 transition duration-300">
              <div className="absolute -right-12 -top-12 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-mono text-slate-400 ml-2">aspiraa_ats_engine.v2</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse">
                  LIVE SIMULATOR
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Paste Your Resume Snippet or Skills</label>
                  <textarea 
                    value={quickPasteText}
                    onChange={(e) => setQuickPasteText(e.target.value)}
                    placeholder="E.g., B.Tech CSE student at NIT Surathkal. Experience in React, Python, SQL, REST APIs. Built 2 web projects..."
                    className="w-full h-24 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition resize-none font-mono"
                  ></textarea>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Target Job Description (Optional)</label>
                  <input 
                    type="text"
                    value={quickJdText}
                    onChange={(e) => setQuickJdText(e.target.value)}
                    placeholder="E.g., SDE Intern at Zomato (Python, React, Data Structures)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition font-mono"
                  />
                </div>

                <button 
                  onClick={triggerHeroAnalysis}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition duration-200 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Analyze ATS Compatibility</span>
                </button>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60 flex items-center justify-between">
                  <span className="text-slate-400">Standard ATS Score:</span>
                  <span className="text-emerald-400 font-bold">78/100</span>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60 flex items-center justify-between">
                  <span className="text-slate-400">Keyword Match:</span>
                  <span className="text-indigo-400 font-bold">82%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">THE STUDENT CAREER OS ECOSYSTEM</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">Not just a resume builder. Your complete career launchpad.</p>
          <p className="text-slate-400 text-sm">Every tool connected into a single student graph to move you from campus to top offers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard icon={<FileText className="w-6 h-6 text-indigo-400" />} title="AI Resume Builder" desc="Construct ATS-parsed single-page resumes formatted for Indian campus placement drives. Includes real-time AI bullet enhancement." actionText="Open Builder" onAction={() => navigateTo('builder')} />
          <FeatureCard icon={<Zap className="w-6 h-6 text-amber-400" />} title="ATS Scanner & Matcher" desc="Upload your resume against specific Job Descriptions from Swiggy, Zomato, Razorpay or TCS to find missing keywords before applying." actionText="Scan Resume" onAction={() => navigateTo('ats')} />
          <FeatureCard icon={<UserCheck className="w-6 h-6 text-emerald-400" />} title="Master Career Profile" desc="One verified profile holding your CGPA, projects, certifications, and GitHub links. Auto-generates tailored applications." actionText="View Profile" onAction={() => navigateTo('profile')} />
          <FeatureCard icon={<Briefcase className="w-6 h-6 text-sky-400" />} title="AI Job Discovery" desc="Discover internships and fresher roles matching your actual skill profile with explicit percentage match scores." actionText="Explore Jobs" onAction={() => navigateTo('jobs')} />
          <FeatureCard icon={<MessageSquare className="w-6 h-6 text-purple-400" />} title="AI Mock Interview Studio" desc="Practice technical, HR, and behavioral questions with voice feedback on clarity, technical structure, and impact." actionText="Start Mock" onAction={() => navigateTo('interview')} />
          <FeatureCard icon={<GraduationCap className="w-6 h-6 text-rose-400" />} title="Campus & Ambassador Clubs" desc="Join or lead official Aspiraa Career Clubs in your engineering college. Access placement preparation toolkits & recruiter leads." actionText="Explore Campus" onAction={() => navigateTo('campus')} />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc, actionText, onAction }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-900/90 hover:-translate-y-1 transition-all duration-300 group">
      <div className="space-y-4">
        <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
      </div>
      <button onClick={onAction} className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition">
        <span>{actionText}</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
      </button>
    </div>
  );
}

// -------------------------------------------------------------
// 2. ATS SCANNER VIEW
// -------------------------------------------------------------
function AtsCheckerSuite({ atsInputText, setAtsInputText, atsTargetJD, setAtsTargetJD, atsResults, handleAnalyzeATS, isAnalyzingATS, navigateTo }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5" />
          <span>Instant ATS Resume Audit Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Check Your ATS Compatibility Score</h1>
        <p className="text-sm text-slate-400">Parse your resume against target Job Descriptions. Uncover hidden parsing errors and missing keywords.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" /> Your Resume Content
          </label>
          <textarea value={atsInputText} onChange={(e) => setAtsInputText(e.target.value)} placeholder="Paste your full resume text here..." className="w-full h-64 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 resize-none font-mono leading-relaxed focus:border-indigo-500 focus:outline-none transition" />
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-sky-400" /> Target Job Description (JD)
          </label>
          <textarea value={atsTargetJD} onChange={(e) => setAtsTargetJD(e.target.value)} placeholder="Paste target JD here..." className="w-full h-64 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 resize-none font-mono leading-relaxed focus:border-indigo-500 focus:outline-none transition" />
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={handleAnalyzeATS} disabled={isAnalyzingATS} className="px-10 py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-2xl hover:opacity-95 hover:scale-105 transition duration-200 flex items-center gap-3">
          {isAnalyzingATS ? <RefreshCw className="w-5 h-5 animate-spin text-amber-300" /> : <Sparkles className="w-5 h-5 text-amber-300" />}
          <span>Run Deep ATS Analysis</span>
        </button>
      </div>

      {atsResults && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 space-y-8 animate-fadeIn">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div>
              <h2 className="text-2xl font-extrabold text-white">ATS Audit Summary</h2>
            </div>
            <div className="text-4xl font-black text-emerald-400">{atsResults.overall}/100</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h3 className="text-xs font-bold text-rose-400 mb-2 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Missing Keywords</h3>
              <ul className="space-y-1 text-xs text-slate-300">{atsResults.missingKeywords.map((kw, i) => <li key={i} className="bg-slate-900 p-2 rounded border border-slate-800/80">• {kw}</li>)}</ul>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h3 className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Actionable Suggestions</h3>
              <ul className="space-y-1 text-xs text-slate-300">{atsResults.suggestions.map((s, i) => <li key={i} className="bg-slate-900 p-2 rounded border border-slate-800/80">• {s}</li>)}</ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 3. RESUME BUILDER STUDIO
// -------------------------------------------------------------
function ResumeBuilderStudio({ resumeData, setResumeData, showToast, navigateTo }) {
  const [activeSection, setActiveSection] = useState('personal');

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6 space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-indigo-400" />
          <div>
            <h1 className="text-lg font-bold text-white">Live AI Resume Builder</h1>
            <p className="text-xs text-slate-400">Single-page ATS compliant format for freshers</p>
          </div>
        </div>
        <button onClick={() => showToast("Downloading ATS PDF...")} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition">
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-xs font-bold uppercase text-white tracking-wider border-b border-slate-800 pb-2">Personal Information</h3>
          <div className="space-y-3">
            <div>
              <label className="text-slate-400 text-xs block mb-1">Full Name</label>
              <input type="text" placeholder="E.g., Ananya Roy" value={resumeData.personal.fullName} onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, fullName: e.target.value}})} className="w-full bg-slate-950 border border-slate-800 p-2.5 text-xs text-white rounded-lg focus:border-indigo-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="text-slate-400 text-xs block mb-1">Email</label>
              <input type="text" placeholder="student@college.edu" value={resumeData.personal.email} onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, email: e.target.value}})} className="w-full bg-slate-950 border border-slate-800 p-2.5 text-xs text-white rounded-lg focus:border-indigo-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="text-slate-400 text-xs block mb-1">Location</label>
              <input type="text" placeholder="City, India" value={resumeData.personal.location} onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, location: e.target.value}})} className="w-full bg-slate-950 border border-slate-800 p-2.5 text-xs text-white rounded-lg focus:border-indigo-500 focus:outline-none transition" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white text-slate-900 p-8 rounded-2xl shadow-2xl min-h-[700px] space-y-4 border border-slate-200">
          <div className="text-center border-b pb-4 space-y-1">
            <h1 className="text-2xl font-bold uppercase text-slate-900">{resumeData.personal.fullName || "Your Full Name"}</h1>
            <p className="text-xs text-slate-600">{resumeData.personal.email} • {resumeData.personal.phone} • {resumeData.personal.location}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase border-b pb-1 text-slate-900">Education</h2>
            <p className="text-xs font-semibold text-slate-800">{resumeData.education[0]?.institution} - {resumeData.education[0]?.degree}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase border-b pb-1 text-slate-900">Technical Skills</h2>
            <p className="text-xs text-slate-800">{resumeData.skills.technical.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 4. MASTER STUDENT PROFILE VIEW
// -------------------------------------------------------------
function StudentProfileView({ resumeData, navigateTo, showToast }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-3xl font-black text-white shadow-xl">
            {resumeData.personal.fullName ? resumeData.personal.fullName[0].toUpperCase() : 'S'}
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">{resumeData.personal.fullName || "Student Profile"}</h1>
            <p className="text-xs text-slate-400">{resumeData.education[0]?.institution}</p>
          </div>
        </div>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
          <div className="text-xs text-slate-400 uppercase font-bold">Placement Readiness</div>
          <div className="text-3xl font-black text-indigo-400">86%</div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 5. JOB MATCHING HUB
// -------------------------------------------------------------
function JobMatchHub({ resumeData, navigateTo, showToast }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 animate-fadeIn">
      <h1 className="text-3xl font-extrabold text-white text-center">AI Job & Internship Discovery</h1>
      <div className="space-y-4">
        {MOCK_JOBS.map(j => (
          <div key={j.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-slate-700 transition">
            <div>
              <h3 className="text-lg font-bold text-white">{j.title}</h3>
              <p className="text-xs text-slate-400">{j.company} • {j.location} • <span className="text-emerald-400 font-bold">{j.stipend}</span></p>
              <p className="text-xs text-slate-400 mt-2">{j.description}</p>
            </div>
            <div className="text-emerald-400 font-bold text-xl">{j.matchingScore}% Match</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 6. INTERVIEW PREPARATION STUDIO
// -------------------------------------------------------------
function InterviewPrepStudio({ showToast }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 animate-fadeIn">
      <h1 className="text-3xl font-extrabold text-white text-center">AI Mock Interview Studio</h1>
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <p className="text-sm font-semibold text-white">"Tell me about a complex project you built using React or Python."</p>
        <textarea placeholder="Type your answer using the STAR method..." className="w-full h-32 bg-slate-950 border border-slate-800 p-3 text-xs text-white rounded-xl focus:border-indigo-500 focus:outline-none transition font-mono" />
        <button onClick={() => showToast("Score: 8.4/10 - Great response structure!")} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 font-bold text-xs rounded-xl text-white transition">Evaluate My Answer</button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 7. LINKEDIN OPTIMIZER VIEW
// -------------------------------------------------------------
function LinkedInOptimizerView({ showToast }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-center space-y-6 animate-fadeIn">
      <h1 className="text-3xl font-extrabold text-white">LinkedIn Optimizer Engine</h1>
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <input type="text" placeholder="Paste your LinkedIn URL..." className="w-full bg-slate-950 border border-slate-800 p-3 text-xs text-white rounded-xl focus:border-sky-500 focus:outline-none transition" />
        <button onClick={() => showToast("Profile Score: 82/100")} className="px-6 py-3 bg-sky-600 hover:bg-sky-500 font-bold text-xs rounded-xl text-white transition">Audit LinkedIn Profile</button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 8. APPLICATION TRACKER VIEW
// -------------------------------------------------------------
function ApplicationTrackerView({ applications, setApplications, showToast }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 animate-fadeIn">
      <h1 className="text-3xl font-extrabold text-white">Application Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {["Applied", "Assessment", "Interview", "Offer"].map((stage) => (
          <div key={stage} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl min-h-[300px] space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase">{stage}</h3>
            {applications.filter(a => a.status === stage).map(app => (
              <div key={app.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="font-bold text-white">{app.company}</div>
                <div className="text-slate-400">{app.role}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 9. CAMPUS ECOSYSTEM, AMBASSADORS & CLUBS (FULL IMPLEMENTATION)
// -------------------------------------------------------------
function CampusEcosystemView({ navigateTo, showToast }) {
  const [activeTab, setActiveTab] = useState('ambassador'); // 'ambassador' | 'clubs' | 'leaderboard'
  
  // Ambassador Registration Form State
  const [caForm, setCaForm] = useState({
    fullName: '',
    college: '',
    year: '3rd Year',
    branch: '',
    email: '',
    phone: '',
    reach: '200-500 students',
    motivation: ''
  });
  const [isSubmittingCa, setIsSubmittingCa] = useState(false);
  const [caSubmitted, setCaSubmitted] = useState(false);

  // Club Registration Form State
  const [clubForm, setClubForm] = useState({
    collegeName: '',
    clubName: '',
    leadName: '',
    leadEmail: '',
    memberCount: '50-100'
  });
  const [showClubModal, setShowClubModal] = useState(false);

  const handleCaSubmit = (e) => {
    e.preventDefault();
    if (!caForm.fullName || !caForm.college || !caForm.email) {
      showToast("Please fill in your name, college, and email.");
      return;
    }
    setIsSubmittingCa(true);
    setTimeout(() => {
      setIsSubmittingCa(false);
      setCaSubmitted(true);
      showToast("Campus Lead Application Submitted Successfully!");
    }, 1200);
  };

  const handleClubSubmit = (e) => {
    e.preventDefault();
    if (!clubForm.collegeName || !clubForm.clubName) {
      showToast("Please provide college and club name.");
      return;
    }
    setShowClubModal(false);
    showToast(`Aspiraa Club Application for ${clubForm.clubName} submitted!`);
    setClubForm({ collegeName: '', clubName: '', leadName: '', leadEmail: '', memberCount: '50-100' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 text-center space-y-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold animate-pulse">
          <GraduationCap className="w-4 h-4 text-indigo-400" />
          <span>National Student Ecosystem</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Your Campus. Your Community. <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">
            Your Career Advantage.
          </span>
        </h1>

        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Aspiraa is building career clubs across 500+ Indian colleges. Lead peer ATS resume clinics, host AI mock interview sprints, and unlock direct founder & recruiter referrals.
        </p>

        {/* Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          <button 
            onClick={() => setActiveTab('ambassador')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${activeTab === 'ambassador' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            Campus Ambassador Program
          </button>
          <button 
            onClick={() => setActiveTab('clubs')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${activeTab === 'clubs' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            Aspiraa Campus Clubs
          </button>
          <button 
            onClick={() => setActiveTab('leaderboard')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${activeTab === 'leaderboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            National Leaderboard
          </button>
        </div>
      </div>

      {/* 1. CAMPUS AMBASSADOR PROGRAM TAB */}
      {activeTab === 'ambassador' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">STUDENT LEADERSHIP NETWORK</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Become the Career Leader on Your Campus</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Aspiraa Campus Leads act as student directors for placement enablement. Drive resume audits, organize technical interview workshops, and represent your college in our national network.
              </p>
            </div>

            {/* Perks Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-slate-700 transition">
                <Trophy className="w-5 h-5 text-amber-400" />
                <div className="font-bold text-white text-sm">Leadership Incentives</div>
                <div className="text-slate-400">Performance-based rewards, certificates, and official recommendation letters.</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-slate-700 transition">
                <Star className="w-5 h-5 text-indigo-400" />
                <div className="font-bold text-white text-sm">Aspiraa Premium</div>
                <div className="text-slate-400">Free access to advanced AI ATS audits, mock interviews, and career tools.</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-slate-700 transition">
                <Users className="w-5 h-5 text-emerald-400" />
                <div className="font-bold text-white text-sm">Recruiter Networking</div>
                <div className="text-slate-400">Direct connection with founders and campus recruitment leads in top tier cities.</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-slate-700 transition">
                <Award className="w-5 h-5 text-sky-400" />
                <div className="font-bold text-white text-sm">National Recognition</div>
                <div className="text-slate-400">Represent your college on the National Aspiraa Leadership Leaderboard.</div>
              </div>
            </div>

            {/* Leadership Hierarchy Tree */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="text-slate-400 font-bold uppercase text-[10px]">Campus Leadership Hierarchy</div>
              <div className="text-indigo-400 font-bold">● Campus Ambassador</div>
              <div className="pl-4 text-slate-300">└─ ● Campus Lead (Engineers / Leads)</div>
              <div className="pl-8 text-slate-400">└─ ● City Lead (Bengaluru, NCR, Hyderabad Hubs)</div>
              <div className="pl-12 text-emerald-400 font-bold">└─ ● Regional Executive Board</div>
            </div>
          </div>

          {/* CA Application Form */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-5">
            <div className="space-y-1 border-b border-slate-800 pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-indigo-400" />
                Apply for Campus Ambassador
              </h3>
              <p className="text-xs text-slate-400">Fill details to apply as an official Aspiraa Campus Lead</p>
            </div>

            {caSubmitted ? (
              <div className="p-6 bg-slate-950 rounded-xl border border-emerald-500/30 text-center space-y-3 animate-fadeIn">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-sm">Application Submitted!</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Thank you for applying. Our Campus Partnerships team will reach out to you via email within 24 hours.
                </p>
                <button 
                  onClick={() => setCaSubmitted(false)} 
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold transition"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleCaSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="E.g., Ananya Roy" 
                    value={caForm.fullName}
                    onChange={(e) => setCaForm({ ...caForm, fullName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500 transition" 
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">College / Institute Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="E.g., NITK Surathkal / VIT Vellore" 
                    value={caForm.college}
                    onChange={(e) => setCaForm({ ...caForm, college: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500 transition" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-medium block mb-1">Year of Study</label>
                    <select 
                      value={caForm.year}
                      onChange={(e) => setCaForm({ ...caForm, year: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500 transition"
                    >
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-300 font-medium block mb-1">Branch / Degree</label>
                    <input 
                      type="text" 
                      placeholder="B.Tech CSE" 
                      value={caForm.branch}
                      onChange={(e) => setCaForm({ ...caForm, branch: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500 transition" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-medium block mb-1">College Email *</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="student@college.edu" 
                      value={caForm.email}
                      onChange={(e) => setCaForm({ ...caForm, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500 transition" 
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-medium block mb-1">Phone / WhatsApp</label>
                    <input 
                      type="tel" 
                      placeholder="+91 9876543210" 
                      value={caForm.phone}
                      onChange={(e) => setCaForm({ ...caForm, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500 transition" 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Why do you want to join Aspiraa?</label>
                  <textarea 
                    rows={3} 
                    placeholder="Mention any student leadership experience..." 
                    value={caForm.motivation}
                    onChange={(e) => setCaForm({ ...caForm, motivation: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 resize-none focus:outline-none focus:border-indigo-500 transition"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmittingCa}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmittingCa ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>Submit Ambassador Application</span>
                </button>
              </form>
            )}
          </div>

        </div>
      )}

      {/* 2. CAMPUS CLUBS TAB */}
      {activeTab === 'clubs' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Aspiraa Campus Clubs</h2>
              <p className="text-xs text-slate-400">Student-run career preparation chapters active in engineering and MBA colleges</p>
            </div>
            <button 
              onClick={() => setShowClubModal(true)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Start an Aspiraa Club</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { college: "NITK Surathkal", name: "Aspiraa Career Guild - NITK", members: 320, events: 12, lead: "Rahul Sharma" },
              { college: "VIT Vellore", name: "Aspiraa Campus Club - VIT", members: 540, events: 18, lead: "Priya Nair" },
              { college: "BITS Pilani", name: "BITS Aspiraa Career Network", members: 290, events: 9, lead: "Aman Gupta" },
              { college: "IIT Bombay", name: "Aspiraa Tech Society - IITB", members: 410, events: 14, lead: "Siddharth Rao" },
              { college: "PES University", name: "PES Aspiraa Chapter", members: 260, events: 8, lead: "Neha Patel" },
              { college: "DTU Delhi", name: "DTU Placement & Career Club", members: 380, events: 11, lead: "Karan Singh" }
            ].map((club, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                    Official Chapter
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{club.events} Events Done</span>
                </div>

                <div>
                  <h3 className="font-bold text-white text-base">{club.name}</h3>
                  <p className="text-xs text-slate-400">{club.college}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <span>Members: <strong className="text-emerald-400">{club.members}</strong></span>
                  <span>Lead: <strong className="text-slate-200">{club.lead}</strong></span>
                </div>

                <button 
                  onClick={() => showToast(`Joined interest group for ${club.name}!`)}
                  className="w-full py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white rounded-xl transition"
                >
                  Join Chapter
                </button>
              </div>
            ))}
          </div>

          {/* Register Club Modal */}
          {showClubModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 relative animate-fadeIn">
                <button onClick={() => setShowClubModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-lg font-bold text-white">Start an Aspiraa Club</h3>
                <p className="text-xs text-slate-400">Launch an official career club on your campus</p>

                <form onSubmit={handleClubSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="text-slate-300 block mb-1">College Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="E.g., BMS College of Engineering" 
                      value={clubForm.collegeName}
                      onChange={(e) => setClubForm({ ...clubForm, collegeName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500" 
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Proposed Club Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="E.g., BMS Aspiraa Guild" 
                      value={clubForm.clubName}
                      onChange={(e) => setClubForm({ ...clubForm, clubName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500" 
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Club Lead Email *</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="lead@college.edu" 
                      value={clubForm.leadEmail}
                      onChange={(e) => setClubForm({ ...clubForm, leadEmail: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500" 
                    />
                  </div>
                  <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition">
                    Register Campus Club
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      )}

      {/* 3. NATIONAL LEADERBOARD TAB */}
      {activeTab === 'leaderboard' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                National Campus Leaderboard
              </h2>
              <p className="text-xs text-slate-400">Rankings based on active student participation, resume readiness scores, and campus events</p>
            </div>
            <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              UPDATED WEEKLY
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Rank</th>
                  <th className="p-3.5">College Institute</th>
                  <th className="p-3.5">State</th>
                  <th className="p-3.5">Active Students</th>
                  <th className="p-3.5">Ambassadors</th>
                  <th className="p-3.5">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {MOCK_LEADERBOARD.map((item) => (
                  <tr key={item.rank} className="hover:bg-slate-950/60 transition duration-150">
                    <td className="p-3.5 font-extrabold text-amber-400">#{item.rank}</td>
                    <td className="p-3.5 font-bold text-white">{item.college}</td>
                    <td className="p-3.5 text-slate-400">{item.state}</td>
                    <td className="p-3.5 font-mono text-slate-200">{item.activeStudents}</td>
                    <td className="p-3.5 font-mono text-indigo-400">{item.ambassadors} Leads</td>
                    <td className="p-3.5 font-bold text-emerald-400">{item.clubScore} pts</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}

// -------------------------------------------------------------
// 10. EMPLOYER & RECRUITER PORTAL
// -------------------------------------------------------------
function EmployerPortalView({ navigateTo, showToast }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
          <Building2 className="w-4 h-4" />
          <span>Employer & Recruiter Hiring Network</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Reach freshers who are <span className="text-amber-400">already career-ready</span>.
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Skip generic job board spam. Filter top 10% engineering & business undergraduates pre-vetted by Aspiraa ATS and Mock Interview scores across 500+ campuses.
        </p>

        <div className="flex justify-center gap-4 pt-2">
          <button onClick={() => showToast("Recruiter post studio opened!")} className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-xl transition hover:scale-105">
            Post Job / Internship Drive
          </button>
          <button onClick={() => showToast("Connecting with College Placement Officers...")} className="px-6 py-3 rounded-xl border border-slate-700 bg-slate-900 text-slate-200 text-xs font-bold transition">
            Activate Campus Drives
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-1 hover:border-slate-700 transition">
          <div className="text-3xl font-black text-amber-400">3.2x</div>
          <div className="text-xs text-slate-300 font-bold">Higher Interview Conversion</div>
          <div className="text-[11px] text-slate-500">Candidates filtered by skill readiness scores</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-1 hover:border-slate-700 transition">
          <div className="text-3xl font-black text-emerald-400">&lt; 48 Hrs</div>
          <div className="text-xs text-slate-300 font-bold">Campus Drive Activation</div>
          <div className="text-[11px] text-slate-500">Direct integration with college TPO offices</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-1 hover:border-slate-700 transition">
          <div className="text-3xl font-black text-indigo-400">50,000+</div>
          <div className="text-xs text-slate-300 font-bold">Verified Fresher Profiles</div>
          <div className="text-[11px] text-slate-500">B.Tech, MCA, MBA & BBA undergraduates</div>
        </div>
      </div>
    </div>
  );
} 
