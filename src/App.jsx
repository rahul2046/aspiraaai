import React, { useState, useRef } from 'react';
import {
  Sparkles, CheckCircle2, ChevronRight, FileText, UserCheck, 
  Briefcase, Users, Building2, Download, ArrowRight, Zap, Menu, X, Plus, Trash2,
  GraduationCap, RefreshCw, Trophy, Send, CheckCircle, AlertCircle, Printer, Eye, Edit3
} from 'lucide-react';

const JAKES_INITIAL_DATA = {
  personal: {
    fullName: "First Last",
    location: "123 Street Name, Town, State 12345",
    phone: "123-456-7890",
    email: "email@gmail.com",
    linkedin: "linkedin.com/in/username",
    github: "github.com/username"
  },
  education: [
    {
      id: "edu_1",
      institution: "State University",
      degree: "Bachelor of Science in Computer Science",
      dates: "May 2021 – May 2025",
      location: "City, State"
    }
  ],
  coursework: [
    "Data Structures", "Algorithms Analysis", "Artificial Intelligence", "Systems Programming",
    "Software Methodology", "Database Management", "Internet Technology", "Computer Architecture"
  ],
  experience: [
    {
      id: "exp_1",
      company: "Electronics Company",
      title: "Software Engineer Intern",
      dates: "May 2023 – August 2023",
      location: "City, State",
      bullets: [
        "Developed a service to automatically generate a set of unit test cases for a service in order to decrease time needed for test generation by 70% and do bug fixes.",
        "Engineered scripts using Python and PowerShell to aggregate 1,000+ test results into an automated format used to load test metrics into dashboard, saving 5+ hours weekly.",
        "Utilized Jenkins to provide a continuous integration service in order to automate building for local build test suite, increasing test velocity by 25%.",
        "Designed UI components using HTML, JavaScript, and CSS for high-volume customer interface."
      ]
    },
    {
      id: "exp_2",
      company: "Startup, Inc.",
      title: "Front End Developer Intern",
      dates: "May 2022 – August 2022",
      location: "City, State",
      bullets: [
        "Assisted in development of the front end of a mobile application for iOS/Android using React Native.",
        "Worked with Google Firebase to manage user data across multiple platforms including web and mobile apps.",
        "Collaborated with team members using version control systems such as Git to improve maintainability."
      ]
    }
  ],
  projects: [
    {
      id: "proj_1",
      name: "Gym Reservation Bot",
      tech: "Python, Selenium, Google Cloud Console",
      dates: "January 2023",
      bullets: [
        "Developed an automated bot using Python and Google Cloud Console to reserve slots for 10+ campus gyms.",
        "Implemented Twilio to send automated SMS notifications to users upon successful slot reservation.",
        "Created a Linux virtual machine on Google Cloud to host the bot and execute tasks 24/7."
      ]
    },
    {
      id: "proj_2",
      name: "Ticket Price Calculator App",
      tech: "Java, Android Studio",
      dates: "November 2022",
      bullets: [
        "Created an Android application using Java and Android Studio to estimate ticket prices for events.",
        "Processed user input data to calculate total price based on date, seat location, and quantity."
      ]
    }
  ],
  skills: {
    languages: "Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R",
    frameworks: "React, Node.js, Flask, JUnit, WordPress, Material-UI, FastAPI",
    tools: "Git, Docker, Travis CI, Google Cloud Platform, VS Code, Android Studio",
    libraries: "pandas, NumPy, Matplotlib, OpenCV, PyTorch"
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

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 transition-all print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('builder')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                Aspiraa <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">Jake's Resume</span>
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-300">
            <button onClick={() => navigateTo('builder')} className={`px-3 py-2 rounded-lg transition-all duration-200 ${activeTab === 'builder' ? 'text-white bg-slate-800/80 font-semibold shadow-inner' : 'hover:text-white hover:bg-slate-800/40'}`}>Jake's Resume Builder</button>
            <button onClick={() => navigateTo('ats')} className={`px-3 py-2 rounded-lg transition-all duration-200 ${activeTab === 'ats' ? 'text-white bg-slate-800/80 font-semibold shadow-inner' : 'hover:text-white hover:bg-slate-800/40'}`}>ATS Checker</button>
            <button onClick={() => navigateTo('campus')} className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-1.5 ${activeTab === 'campus' ? 'text-indigo-400 bg-indigo-500/10 font-semibold border border-indigo-500/30' : 'hover:text-indigo-300 hover:bg-slate-800/40'}`}>
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              Campus & Ambassador
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
            <button onClick={() => navigateTo('ats')} className="block w-full text-left px-3 py-2 rounded hover:bg-slate-900 text-slate-300">ATS Checker</button>
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
        <p>© {new Date().getFullYear()} Aspiraa Resume OS. Pixel-Perfect Jake's ATS Resume Generator for Campus Placements.</p>
      </footer>
    </div>
  );
}

// -------------------------------------------------------------
// JAKE'S RESUME BUILDER & LIVE ATS PREVIEW
// -------------------------------------------------------------
function JakesResumeStudio({ resumeData, setResumeData, showToast }) {
  const [activeSection, setActiveSection] = useState('personal');

  // Personal updates
  const handlePersonalChange = (field, val) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: val }
    }));
  };

  // Education updates
  const handleEduChange = (idx, field, val) => {
    const updated = [...resumeData.education];
    updated[idx][field] = val;
    setResumeData(prev => ({ ...prev, education: updated }));
  };

  // Coursework updates
  const handleCourseworkChange = (val) => {
    const list = val.split(',').map(s => s.trim()).filter(Boolean);
    setResumeData(prev => ({ ...prev, coursework: list }));
  };

  // Experience updates
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
    updated[expIdx].bullets.push("New impact bullet point highlighting technical achievement.");
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

  // Project updates
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
    updated[projIdx].bullets.push("Developed feature using technology stack to optimize performance.");
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

  // Technical Skills
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
            Jake's Resume Format Builder
          </h1>
          <p className="text-xs text-slate-400">The single-page ATS-optimized standard used by top CS, Engineering & Business graduates worldwide.</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => window.print()} className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition">
            <Printer className="w-4 h-4" /> Save / Download PDF
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
                  <label className="text-slate-400 text-xs block mb-1 font-semibold">Full Name</label>
                  <input type="text" value={resumeData.personal.fullName} onChange={(e) => handlePersonalChange('fullName', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none" />
                </div>
                <div>
                  <label className="text-slate-400 text-xs block mb-1 font-semibold">Address / Location</label>
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
                    <label className="text-slate-400 text-xs block mb-1 font-semibold">LinkedIn Link / URL</label>
                    <input type="text" value={resumeData.personal.linkedin} onChange={(e) => handlePersonalChange('linkedin', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs block mb-1 font-semibold">GitHub Link / URL</label>
                    <input type="text" value={resumeData.personal.github} onChange={(e) => handlePersonalChange('github', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. EDUCATION */}
          {activeSection === 'education' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xs font-bold uppercase text-indigo-400 tracking-wider">Education Details</h3>
              {resumeData.education.map((edu, idx) => (
                <div key={edu.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div>
                    <label className="text-slate-400 text-xs block mb-1 font-semibold">University / Institution</label>
                    <input type="text" value={edu.institution} onChange={(e) => handleEduChange(idx, 'institution', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:border-indigo-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs block mb-1 font-semibold">Degree / Major</label>
                    <input type="text" value={edu.degree} onChange={(e) => handleEduChange(idx, 'degree', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:border-indigo-500 focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 text-xs block mb-1 font-semibold">Graduation Dates</label>
                      <input type="text" value={edu.dates} onChange={(e) => handleEduChange(idx, 'dates', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:border-indigo-500 focus:outline-none" />
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
                <p className="text-[11px] text-slate-500 mt-1">These will format as a 4-column balanced grid under Education in Jake's resume format.</p>
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
                      <label className="text-slate-400 text-xs block mb-1 font-semibold">Dates (e.g. May 2023 – Aug 2023)</label>
                      <input type="text" value={exp.dates} onChange={(e) => handleExpChange(expIdx, 'dates', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                    </div>
                    <div>
                      <label className="text-slate-400 text-xs block mb-1 font-semibold">Location (e.g. City, State)</label>
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
                      <label className="text-slate-400 text-xs block mb-1 font-semibold">Date (e.g. January 2023)</label>
                      <input type="text" value={proj.dates} onChange={(e) => handleProjChange(projIdx, 'dates', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 text-xs block mb-1 font-semibold">Technologies Used (e.g. Python, Selenium, GCP)</label>
                    <input type="text" value={proj.tech} onChange={(e) => handleProjChange(projIdx, 'tech', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 font-semibold">Bullet Points</span>
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

          {/* 6. TECHNICAL SKILLS */}
          {activeSection === 'skills' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xs font-bold uppercase text-indigo-400 tracking-wider">Technical Skills</h3>
              <div>
                <label className="text-slate-400 text-xs block mb-1 font-semibold">Languages</label>
                <input type="text" value={resumeData.skills.languages} onChange={(e) => handleSkillChange('languages', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="text-slate-400 text-xs block mb-1 font-semibold">Frameworks</label>
                <input type="text" value={resumeData.skills.frameworks} onChange={(e) => handleSkillChange('frameworks', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="text-slate-400 text-xs block mb-1 font-semibold">Developer Tools</label>
                <input type="text" value={resumeData.skills.tools} onChange={(e) => handleSkillChange('tools', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="text-slate-400 text-xs block mb-1 font-semibold">Libraries</label>
                <input type="text" value={resumeData.skills.libraries} onChange={(e) => handleSkillChange('libraries', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
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
                  <span>{edu.degree}</span>
                  <span>{edu.location}</span>
                </div>
              </div>
            ))}

            {/* RELEVANT COURSEWORK GRID */}
            {resumeData.coursework.length > 0 && (
              <div className="mt-2 text-[12px] text-slate-900">
                <span className="font-bold block mb-1">Relevant Coursework:</span>
                <div className="grid grid-cols-4 gap-x-2 gap-y-0.5 pl-3 list-disc">
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
                  <div className="flex justify-between items-baseline text-[12px.5] text-black">
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

          {/* TECHNICAL SKILLS */}
          <div>
            <h2 className="text-[14px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">Technical Skills</h2>
            <div className="text-[12px] text-slate-900 space-y-1">
              {resumeData.skills.languages && (
                <div><strong className="font-bold text-black">Languages:</strong> {resumeData.skills.languages}</div>
              )}
              {resumeData.skills.frameworks && (
                <div><strong className="font-bold text-black">Frameworks:</strong> {resumeData.skills.frameworks}</div>
              )}
              {resumeData.skills.tools && (
                <div><strong className="font-bold text-black">Developer Tools:</strong> {resumeData.skills.tools}</div>
              )}
              {resumeData.skills.libraries && (
                <div><strong className="font-bold text-black">Libraries:</strong> {resumeData.skills.libraries}</div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// -------------------------------------------------------------
// ATS SCANNER VIEW
// -------------------------------------------------------------
function AtsCheckerSuite({ resumeData, showToast }) {
  const [jdText, setJdText] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const runAnalysis = () => {
    setAnalysis({
      score: 88,
      matchedKeywords: ["Python", "Java", "SQL", "Git", "React", "Docker"],
      missingKeywords: ["AWS Lambda", "CI/CD Pipeline", "Kubernetes"],
      feedback: [
        "Formatting aligns 100% with Jake's ATS single-column standard.",
        "Include metrics for all project achievements (e.g., 'improved latency by 20%')."
      ]
    });
    showToast("ATS Audit complete!");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6 animate-fadeIn">
      <h1 className="text-3xl font-extrabold text-white text-center">ATS Job Match Audit</h1>
      <textarea value={jdText} onChange={(e) => setJdText(e.target.value)} placeholder="Paste Job Description..." className="w-full h-40 bg-slate-900 border border-slate-800 p-4 text-xs text-white rounded-xl focus:outline-none" />
      <button onClick={runAnalysis} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 font-bold text-xs uppercase tracking-wider text-white rounded-xl">Analyze ATS Match</button>

      {analysis && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 text-xs">
          <div className="flex justify-between items-center text-lg font-bold">
            <span className="text-white">Compatibility Score</span>
            <span className="text-emerald-400 text-2xl">{analysis.score}/100</span>
          </div>
          <div><strong className="text-indigo-400">Matched Skills:</strong> {analysis.matchedKeywords.join(", ")}</div>
          <div><strong className="text-rose-400">Missing Keywords:</strong> {analysis.missingKeywords.join(", ")}</div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// CAMPUS ECOSYSTEM VIEW
// -------------------------------------------------------------
function CampusEcosystemView({ showToast }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-center space-y-6 animate-fadeIn">
      <h1 className="text-3xl font-extrabold text-white">Campus Ambassador Network</h1>
      <p className="text-xs text-slate-400">Lead peer ATS resume workshops and manage student placements with Aspiraa.</p>
    </div>
  );
}
 //
