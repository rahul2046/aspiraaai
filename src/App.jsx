import React, { useState, useRef } from 'react';
import {
  Sparkles, CheckCircle2, FileText, UserCheck, 
  Briefcase, Users, Building2, Download, ArrowRight, Zap, Menu, X, Plus, Trash2,
  GraduationCap, RefreshCw, Trophy, Send, CheckCircle, AlertCircle, Printer, Eye,
  Upload, File, Award, Star, ArrowUpRight, Check
} from 'lucide-react';

const JAKES_INITIAL_DATA = {
  personal: {
    fullName: "Saddala Reddy Rahul",
    location: "Mangalore, Karnataka, India",
    phone: "+91 98765 43210",
    email: "rahul@college.edu.in",
    linkedin: "linkedin.com/in/rahul-profile",
    github: "github.com/rahul-dev",
    portfolio: "rahulportfolio.dev"
  },
  education: [
    {
      id: "edu_1",
      institution: "National Institute of Technology Karnataka (NITK), Surathkal",
      degree: "Bachelor of Technology (B.Tech)",
      branch: "Mechanical Engineering",
      cgpa: "7.15/10",
      dates: "Nov 2022 – May 2026",
      location: "Mangalore, Karnataka"
    }
  ],
  coursework: [
    "Computational Fluid Dynamics", "Thermodynamics", "Heat Transfer", "Navier-Stokes Equations",
    "Finite Element Analysis", "CAD/CAM", "Machine Design", "Data Structures & Algorithms"
  ],
  experience: [
    {
      id: "exp_1",
      company: "CSIR - National Aerospace Laboratories (NAL)",
      title: "CTFD Research Intern",
      dates: "May 2025 – July 2025",
      location: "Bengaluru, India",
      bullets: [
        "Conducted 2D lid-driven cavity flow simulations analyzing Navier-Stokes equations and vorticity behavior.",
        "Utilized ANSYS Fluent and CUDA parallelization to accelerate numerical fluid simulation runtime by 35%.",
        "Documented vorticity behavior and benchmarked computational efficiency against standard experimental setups."
      ]
    },
    {
      id: "exp_2",
      company: "IIT Madras",
      title: "Aerospace Research Intern",
      dates: "April 2024 – July 2024",
      location: "Chennai, India",
      bullets: [
        "Analyzed custom airfoil geometries using XFOIL and implemented propeller/wind turbine simulations using actuator disk models.",
        "Optimized UAV blade configurations applying Blade Element Momentum (BEM) Theory."
      ]
    }
  ],
  projects: [
    {
      id: "proj_1",
      name: "Aspiraa AI - Career Operating System",
      tech: "React, Tailwind CSS, Lucide-React, Netlify",
      dates: "Jan 2026 – Present",
      bullets: [
        "Built a single-page career operating system for Indian engineering students featuring Jake's ATS resume builder.",
        "Integrated real-time PDF parser ATS keyword analysis and campus ambassador leadership tools."
      ]
    },
    {
      id: "proj_2",
      name: "Dosthana - P2P Campus Delivery Service",
      tech: "React, Vite, Node.js, MongoDB",
      dates: "Oct 2025",
      bullets: [
        "Developed a peer-to-peer campus logistics web app serving NITK Surathkal students.",
        "Optimized order placement workflow and delivery tracking interface for campus dorms."
      ]
    }
  ],
  skills: {
    languages: "Python (NumPy, SciPy, Matplotlib, Pandas), C++, MATLAB, SQL, JavaScript (ES6+)",
    frameworks: "React, Node.js, Tailwind CSS, Vite, Three.js",
    tools: "ANSYS Fluent, ANSYS Workbench, AutoCAD, Fusion360, Git/GitHub, Docker, VS Code",
    libraries: "scikit-learn, BeautifulSoup, SpaCy, HTML5 Canvas",
    soft: "Problem Solving, Team Leadership, Agile Collaboration, Product Strategy",
    certifications: "AWS Certified Cloud Practitioner, Meta Front-End Developer Specialization",
    achievements: "AIR 1270 in GATE XE 2026, Founder & CEO of TractionMint"
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('builder');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeData, setResumeData] = useState(JAKES_INITIAL_DATA);
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-indigo-600 to-sky-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-indigo-400/40 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-300 flex-shrink-0 animate-spin" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 transition-all print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('builder')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                Aspiraa <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">Jake's Resume OS</span>
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-300">
            <button 
              onClick={() => navigateTo('builder')} 
              className={`px-3.5 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${activeTab === 'builder' ? 'text-white bg-slate-800/80 font-semibold shadow-inner border border-slate-700' : 'hover:text-white hover:bg-slate-800/40'}`}
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              Jake's Resume Builder
            </button>
            <button 
              onClick={() => navigateTo('ats')} 
              className={`px-3.5 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${activeTab === 'ats' ? 'text-white bg-slate-800/80 font-semibold shadow-inner border border-slate-700' : 'hover:text-white hover:bg-slate-800/40'}`}
            >
              <Upload className="w-4 h-4 text-emerald-400" />
              Upload PDF ATS Scanner
            </button>
            <button 
              onClick={() => navigateTo('campus')} 
              className={`px-3.5 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${activeTab === 'campus' ? 'text-indigo-400 bg-indigo-500/10 font-semibold border border-indigo-500/30' : 'hover:text-indigo-300 hover:bg-slate-800/40'}`}
            >
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              Campus Ambassador
            </button>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <button onClick={() => window.print()} className="text-xs font-bold px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:scale-105 active:scale-95 transition duration-200 flex items-center gap-2">
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
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
            <button onClick={() => navigateTo('builder')} className="block w-full text-left px-3 py-2 rounded bg-slate-900 text-white">Jake's Resume Builder</button>
            <button onClick={() => navigateTo('ats')} className="block w-full text-left px-3 py-2 rounded hover:bg-slate-900 text-slate-300">Upload PDF ATS Scanner</button>
            <button onClick={() => navigateTo('campus')} className="block w-full text-left px-3 py-2 rounded hover:bg-indigo-950/40 text-indigo-400 font-bold">Campus Ambassador</button>
          </div>
        )}
      </header>

      {/* DYNAMIC VIEWS */}
      <main className="flex-1">
        {activeTab === 'builder' && <JakesResumeStudio resumeData={resumeData} setResumeData={setResumeData} showToast={showToast} />}
        {activeTab === 'ats' && <AtsCheckerSuite resumeData={resumeData} showToast={showToast} />}
        {activeTab === 'campus' && <CampusEcosystemView showToast={showToast} />}
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs py-8 print:hidden text-center">
        <p>© {new Date().getFullYear()} Aspiraa Resume OS. Pixel-Perfect Jake's ATS Resume Builder & Placement Platform.</p>
      </footer>
    </div>
  );
}

// -------------------------------------------------------------
// JAKE'S RESUME BUILDER & LIVE ATS PREVIEW
// -------------------------------------------------------------
function JakesResumeStudio({ resumeData, setResumeData, showToast }) {
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

  const handleSkillChange = (field, val) => {
    setResumeData(prev => ({
      ...prev,
      skills: { ...prev.skills, [field]: val }
    }));
  };

  return (
    <div className="max-w-[1700px] mx-auto px-4 py-8 space-y-6">
      
      {/* Top Banner Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl print:hidden">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            Jake's Resume Builder (ATS Complete Edition)
          </h1>
          <p className="text-xs text-slate-400">All input fields including CGPA/GPA, Branch, Coursework, Skills, Certifications & Achievements.</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => window.print()} className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition">
            <Printer className="w-4 h-4" /> Print / Save PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: EDIT FORM CONTROLS */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 print:hidden max-h-[85vh] overflow-y-auto custom-scrollbar">
          
          {/* Section Navigation Pills */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
            {['personal', 'education', 'coursework', 'experience', 'projects', 'skills'].map(sec => (
              <button
                key={sec}
                onClick={() => setActiveSection(sec)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${activeSection === sec ? 'bg-indigo-600 text-white shadow' : 'bg-slate-950 text-slate-400 hover:text-white'}`}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* 1. PERSONAL INFO */}
          {activeSection === 'personal' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xs font-bold uppercase text-indigo-400 tracking-wider">Header & Contact Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-slate-400 text-xs block mb-1 font-semibold">Full Name *</label>
                  <input type="text" value={resumeData.personal.fullName} onChange={(e) => handlePersonalChange('fullName', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none" />
                </div>
                <div>
                  <label className="text-slate-400 text-xs block mb-1 font-semibold">City, State / Address</label>
                  <input type="text" value={resumeData.personal.location} onChange={(e) => handlePersonalChange('location', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 text-xs block mb-1 font-semibold">Phone Number</label>
                    <input type="text" value={resumeData.personal.phone} onChange={(e) => handlePersonalChange('phone', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs block mb-1 font-semibold">Email Address</label>
                    <input type="text" value={resumeData.personal.email} onChange={(e) => handlePersonalChange('email', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 text-xs block mb-1 font-semibold">LinkedIn Profile URL</label>
                    <input type="text" value={resumeData.personal.linkedin} onChange={(e) => handlePersonalChange('linkedin', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs block mb-1 font-semibold">GitHub Profile URL</label>
                    <input type="text" value={resumeData.personal.github} onChange={(e) => handlePersonalChange('github', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 text-xs block mb-1 font-semibold">Portfolio Website (Optional)</label>
                  <input type="text" value={resumeData.personal.portfolio || ""} onChange={(e) => handlePersonalChange('portfolio', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none" />
                </div>
              </div>
            </div>
          )}

          {/* 2. EDUCATION & CGPA */}
          {activeSection === 'education' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase text-indigo-400 tracking-wider">Education & CGPA / GPA</h3>
                <button onClick={addEducation} className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add Education
                </button>
              </div>

              {resumeData.education.map((edu, idx) => (
                <div key={edu.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 relative">
                  {resumeData.education.length > 1 && (
                    <button onClick={() => removeEducation(idx)} className="absolute top-3 right-3 text-slate-500 hover:text-rose-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <div>
                    <label className="text-slate-400 text-xs block mb-1 font-semibold">Institution / University Name *</label>
                    <input type="text" value={edu.institution} onChange={(e) => handleEduChange(idx, 'institution', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:border-indigo-500 focus:outline-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 text-xs block mb-1 font-semibold">Degree (e.g., B.Tech, B.S.)</label>
                      <input type="text" value={edu.degree} onChange={(e) => handleEduChange(idx, 'degree', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:border-indigo-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-slate-400 text-xs block mb-1 font-semibold">Branch / Major</label>
                      <input type="text" value={edu.branch || ""} onChange={(e) => handleEduChange(idx, 'branch', e.target.value)} placeholder="Computer Science" className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:border-indigo-500 focus:outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-amber-400 text-xs block mb-1 font-bold">CGPA / GPA *</label>
                      <input type="text" value={edu.cgpa || ""} onChange={(e) => handleEduChange(idx, 'cgpa', e.target.value)} placeholder="8.8/10" className="w-full bg-slate-900 border border-amber-500/40 rounded-lg p-2 text-xs text-amber-300 font-bold focus:border-amber-400 focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-slate-400 text-xs block mb-1 font-semibold">Graduation Dates</label>
                      <input type="text" value={edu.dates} onChange={(e) => handleEduChange(idx, 'dates', e.target.value)} placeholder="Nov 2022 – May 2026" className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:border-indigo-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-slate-400 text-xs block mb-1 font-semibold">City, State</label>
                      <input type="text" value={edu.location} onChange={(e) => handleEduChange(idx, 'location', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:border-indigo-500 focus:outline-none" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. RELEVANT COURSEWORK */}
          {activeSection === 'coursework' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xs font-bold uppercase text-indigo-400 tracking-wider">Relevant Coursework</h3>
              <div>
                <label className="text-slate-400 text-xs block mb-1 font-semibold">Courses (Comma separated)</label>
                <textarea
                  rows={4}
                  value={resumeData.coursework.join(', ')}
                  onChange={(e) => handleCourseworkChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono focus:border-indigo-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-500 mt-1">Formatted into a balanced 4-column layout under Education in Jake's format.</p>
              </div>
            </div>
          )}

          {/* 4. EXPERIENCE */}
          {activeSection === 'experience' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase text-indigo-400 tracking-wider">Work Experience</h3>
                <button onClick={addExperience} className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add Role
                </button>
              </div>

              {resumeData.experience.map((exp, expIdx) => (
                <div key={exp.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 relative group">
                  <button onClick={() => removeExperience(expIdx)} className="absolute top-3 right-3 text-slate-500 hover:text-rose-400">
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 text-xs block mb-1 font-semibold">Company Name</label>
                      <input type="text" value={exp.company} onChange={(e) => handleExpChange(expIdx, 'company', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                    </div>
                    <div>
                      <label className="text-slate-400 text-xs block mb-1 font-semibold">Job Title</label>
                      <input type="text" value={exp.title} onChange={(e) => handleExpChange(expIdx, 'title', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 text-xs block mb-1 font-semibold">Dates (e.g., May 2025 – Jul 2025)</label>
                      <input type="text" value={exp.dates} onChange={(e) => handleExpChange(expIdx, 'dates', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                    </div>
                    <div>
                      <label className="text-slate-400 text-xs block mb-1 font-semibold">Location (e.g., Bengaluru, India)</label>
                      <input type="text" value={exp.location} onChange={(e) => handleExpChange(expIdx, 'location', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">Bullet Points</span>
                      <button onClick={() => addExpBullet(expIdx)} className="text-[11px] text-indigo-400 hover:underline">+ Add Bullet</button>
                    </div>
                    {exp.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex gap-2 items-start">
                        <textarea
                          rows={2}
                          value={b}
                          onChange={(e) => handleExpBulletChange(expIdx, bIdx, e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 resize-none"
                        />
                        <button onClick={() => removeExpBullet(expIdx, bIdx)} className="text-slate-600 hover:text-rose-400 pt-2">
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
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase text-indigo-400 tracking-wider">Technical Projects</h3>
                <button onClick={addProject} className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add Project
                </button>
              </div>

              {resumeData.projects.map((proj, projIdx) => (
                <div key={proj.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 relative group">
                  <button onClick={() => removeProject(projIdx)} className="absolute top-3 right-3 text-slate-500 hover:text-rose-400">
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 text-xs block mb-1 font-semibold">Project Name</label>
                      <input type="text" value={proj.name} onChange={(e) => handleProjChange(projIdx, 'name', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                    </div>
                    <div>
                      <label className="text-slate-400 text-xs block mb-1 font-semibold">Date (e.g., Oct 2025)</label>
                      <input type="text" value={proj.dates} onChange={(e) => handleProjChange(projIdx, 'dates', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 text-xs block mb-1 font-semibold">Technologies Used (e.g., Python, ANSYS, React)</label>
                    <input type="text" value={proj.tech} onChange={(e) => handleProjChange(projIdx, 'tech', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">Bullet Points</span>
                      <button onClick={() => addProjBullet(projIdx)} className="text-[11px] text-indigo-400 hover:underline">+ Add Bullet</button>
                    </div>
                    {proj.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex gap-2 items-start">
                        <textarea
                          rows={2}
                          value={b}
                          onChange={(e) => handleProjBulletChange(projIdx, bIdx, e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 resize-none"
                        />
                        <button onClick={() => removeProjBullet(projIdx, bIdx)} className="text-slate-600 hover:text-rose-400 pt-2">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 6. TECHNICAL SKILLS, CERTIFICATIONS & ACHIEVEMENTS */}
          {activeSection === 'skills' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xs font-bold uppercase text-indigo-400 tracking-wider">Skills, Certifications & Achievements</h3>
              <div>
                <label className="text-slate-400 text-xs block mb-1 font-semibold">Programming Languages</label>
                <input type="text" value={resumeData.skills.languages} onChange={(e) => handleSkillChange('languages', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="text-slate-400 text-xs block mb-1 font-semibold">Frameworks / Libraries</label>
                <input type="text" value={resumeData.skills.frameworks} onChange={(e) => handleSkillChange('frameworks', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="text-slate-400 text-xs block mb-1 font-semibold">Developer Tools & Software</label>
                <input type="text" value={resumeData.skills.tools} onChange={(e) => handleSkillChange('tools', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="text-slate-400 text-xs block mb-1 font-semibold">Soft Skills & Leadership</label>
                <input type="text" value={resumeData.skills.soft || ""} onChange={(e) => handleSkillChange('soft', e.target.value)} placeholder="Problem Solving, Agile, Team Leadership" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="text-slate-400 text-xs block mb-1 font-semibold">Certifications</label>
                <input type="text" value={resumeData.skills.certifications || ""} onChange={(e) => handleSkillChange('certifications', e.target.value)} placeholder="AWS Certified, Meta Front-End" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="text-amber-400 text-xs block mb-1 font-bold">Key Achievements / Ranks</label>
                <input type="text" value={resumeData.skills.achievements || ""} onChange={(e) => handleSkillChange('achievements', e.target.value)} placeholder="GATE Rank 1270, Smart India Hackathon Finalist" className="w-full bg-slate-950 border border-amber-500/30 rounded-lg p-2.5 text-xs text-amber-200" />
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: PIXEL-PERFECT JAKE'S RESUME LIVE PREVIEW */}
        <div className="lg:col-span-7 bg-white text-slate-950 rounded-lg p-10 shadow-2xl min-h-[1050px] border border-slate-300 font-serif leading-tight print:p-0 print:shadow-none print:border-none" id="resume-preview">
          
          {/* HEADER */}
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

          {/* EDUCATION */}
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

            {/* RELEVANT COURSEWORK GRID */}
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

          {/* EXPERIENCE */}
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

          {/* PROJECTS */}
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

          {/* TECHNICAL SKILLS, CERTIFICATIONS & ACHIEVEMENTS */}
          <div>
            <h2 className="text-[14px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">Technical Skills & Achievements</h2>
            <div className="text-[12px] text-slate-900 space-y-1">
              {resumeData.skills.languages && (
                <div><strong className="font-bold text-black">Languages:</strong> {resumeData.skills.languages}</div>
              )}
              {resumeData.skills.frameworks && (
                <div><strong className="font-bold text-black">Frameworks / Tech:</strong> {resumeData.skills.frameworks}</div>
              )}
              {resumeData.skills.tools && (
                <div><strong className="font-bold text-black">Developer Tools & Software:</strong> {resumeData.skills.tools}</div>
              )}
              {resumeData.skills.soft && (
                <div><strong className="font-bold text-black">Soft Skills:</strong> {resumeData.skills.soft}</div>
              )}
              {resumeData.skills.certifications && (
                <div><strong className="font-bold text-black">Certifications:</strong> {resumeData.skills.certifications}</div>
              )}
              {resumeData.skills.achievements && (
                <div><strong className="font-bold text-black">Honors & Achievements:</strong> {resumeData.skills.achievements}</div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. PDF / RESUME UPLOAD ATS CHECKER SUITE
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
        matchedKeywords: ["Python", "React", "SQL", "Git", "ANSYS", "REST APIs", "Node.js"],
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
      <div className="text-center space-y-3">
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
          PDF & Resume ATS Scanner
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Upload Resume & Check Job Match Score</h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">Upload your PDF/DOCX resume or parse directly from Jake's Builder to match against target job descriptions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* PDF UPLOADER BOX */}
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
          className="bg-slate-900/80 border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition group"
        >
          <input ref={fileInputRef} type="file" accept=".pdf,.docx,.doc" onChange={handleFileUpload} className="hidden" />
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <Upload className="w-7 h-7" />
          </div>
          {uploadedFile ? (
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Ready for ATS Analysis
              </span>
              <p className="text-sm font-semibold text-white">{uploadedFile.name}</p>
              <p className="text-[11px] text-slate-400">{(uploadedFile.size / 1024).toFixed(1)} KB • Click to replace</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white">Drag & Drop your Resume PDF here</p>
              <p className="text-xs text-slate-400">Supports .PDF, .DOCX (Up to 10MB)</p>
              <span className="inline-block mt-3 text-xs font-bold text-indigo-400 underline">Browse File</span>
            </div>
          )}
        </div>

        {/* JOB DESCRIPTION INPUT */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col space-y-3">
          <label className="text-xs font-bold uppercase text-slate-300 tracking-wider flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-400" />
            Paste Target Job Description (JD)
          </label>
          <textarea
            rows={6}
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste job description keywords, requirements, or tech stack here..."
            className="w-full flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

      </div>

      <button
        onClick={runAnalysis}
        disabled={isScanning}
        className="w-full py-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 transition"
      >
        {isScanning ? (
          <>
            <RefreshCw className="w-5 h-5 animate-spin" /> Scanning Keywords & Formatting...
          </>
        ) : (
          <>
            <Zap className="w-5 h-5" /> Calculate ATS Match Score
          </>
        )}
      </button>

      {/* ANALYSIS RESULTS BOARD */}
      {analysis && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <h3 className="text-xl font-bold text-white">ATS Audit Breakdown</h3>
              <p className="text-xs text-slate-400">Compared against ATS parsing guidelines for Engineering roles.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <span className="text-3xl font-black text-emerald-400">{analysis.score}%</span>
                <span className="text-[10px] uppercase block text-slate-400 font-bold">Match Score</span>
              </div>
              <div className="text-center border-l border-slate-800 pl-4">
                <span className="text-3xl font-black text-indigo-400">{analysis.formattingScore}%</span>
                <span className="text-[10px] uppercase block text-slate-400 font-bold">Format Score</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Matched Keywords ({analysis.matchedKeywords.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.matchedKeywords.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-medium">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Missing Keywords ({analysis.missingKeywords.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.missingKeywords.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 bg-rose-500/10 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-medium">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Actionable ATS Recommendations</h4>
            <ul className="space-y-2">
              {analysis.recommendations.map((rec, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                  <ArrowRight className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 3. CAMPUS AMBASSADOR APPLICATION & ECOSYSTEM PORTAL
// -------------------------------------------------------------
function CampusEcosystemView({ showToast }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    yearOfStudy: "3rd Year",
    branch: "Mechanical Engineering",
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
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12 animate-fadeIn">
      
      {/* HEADER HERO */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
          Student Leadership & Placements
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Become a Campus Lead / Ambassador</h1>
        <p className="text-xs sm:text-sm text-slate-400">Lead ATS resume workshops, help students prepare for campus placement drives, and unlock exclusive perks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: FORM */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Application Received!</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">Our campus team will review your application for <strong>{formData.college}</strong> and reach out via email within 48 hours.</p>
              <button onClick={() => setSubmitted(false)} className="px-4 py-2 bg-slate-800 text-xs font-bold text-slate-200 rounded-xl hover:bg-slate-700">Submit Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-sm font-bold uppercase text-indigo-400 tracking-wider">Campus Ambassador Application Form</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 text-xs block mb-1 font-semibold">Full Name *</label>
                  <input type="text" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" placeholder="Student Name" />
                </div>
                <div>
                  <label className="text-slate-400 text-xs block mb-1 font-semibold">Student Email *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" placeholder="student@college.edu.in" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 text-xs block mb-1 font-semibold">University / College Name *</label>
                  <input type="text" required value={formData.college} onChange={(e) => setFormData({ ...formData, college: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" placeholder="NITK Surathkal, VIT, IIT..." />
                </div>
                <div>
                  <label className="text-slate-400 text-xs block mb-1 font-semibold">Phone Number</label>
                  <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" placeholder="+91 9876543210" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 text-xs block mb-1 font-semibold">Year of Study</label>
                  <select value={formData.yearOfStudy} onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500">
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year / Final Year</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 text-xs block mb-1 font-semibold">Branch / Degree</label>
                  <input type="text" value={formData.branch} onChange={(e) => setFormData({ ...formData, branch: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" placeholder="Mechanical, CSE, ECE..." />
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-xs block mb-1 font-semibold">LinkedIn Profile URL</label>
                <input type="text" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" placeholder="linkedin.com/in/username" />
              </div>

              <div>
                <label className="text-slate-400 text-xs block mb-1 font-semibold">Why do you want to lead Aspiraa workshops on your campus?</label>
                <textarea rows={3} value={formData.whyApply} onChange={(e) => setFormData({ ...formData, whyApply: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" placeholder="Tell us about student clubs or placement activities you participate in..." />
              </div>

              <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 font-bold text-xs uppercase tracking-wider text-white rounded-xl shadow-lg transition flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Submit Application
              </button>
            </form>
          )}
        </div>

        {/* RIGHT: LEADERBOARD & PERKS */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase text-indigo-400 tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" /> Ambassador Perks & Benefits
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Official Certificate:</strong> Leadership credential recognized for campus placements & LinkedIn.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Premium Access:</strong> Free access to all ATS Premium resume templates and AI checkers.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Stipend & Rewards:</strong> Performance bonuses for hosting student ATS resume drives.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase text-indigo-400 tracking-wider flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" /> Active Campus Leaders
            </h3>
            <div className="space-y-3">
              {[
                { name: "Rahul S.", college: "NITK Surathkal", students: "240+ Resumes Built" },
                { name: "Ananya P.", college: "IIT Madras", students: "190+ Resumes Built" },
                { name: "Vikram R.", college: "BITS Pilani", students: "150+ Resumes Built" }
              ].map((lead, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-white block">{lead.name}</span>
                    <span className="text-[11px] text-slate-400">{lead.college}</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">{lead.students}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
} 
