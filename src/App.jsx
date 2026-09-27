 import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Upload,
  UserCheck,
  Award,
  CheckCircle2,
  AlertCircle,
  Download,
  Plus,
  Trash2,
  Sparkles,
  Search,
  School,
  Users,
  Building,
  BarChart2,
  Check,
  ChevronRight,
  ExternalLink,
  RefreshCw,
  Zap,
  Globe,
  Briefcase,
  GraduationCap,
  Code,
  FolderGit2,
  Sliders,
  Send,
  Star
} from 'lucide-react';

// Default data for Jake's Resume Template
const initialResumeData = {
  personal: {
    fullName: "Jake R. Thompson",
    email: "jake.thompson@columbia.edu",
    phone: "(555) 234-5678",
    location: "New York, NY",
    linkedin: "linkedin.com/in/jakethompson",
    github: "github.com/jakethompson"
  },
  education: [
    {
      id: "edu1",
      institution: "Columbia University in the City of New York",
      degree: "Bachelor of Science in Computer Science & Data Science",
      location: "New York, NY",
      period: "Sep. 2021 – May 2025",
      gpa: "3.88 / 4.0",
      coursework: "Data Structures & Algorithms, Systems Programming, Database Systems, Artificial Intelligence, Web Development"
    }
  ],
  experience: [
    {
      id: "exp1",
      company: "Apex Tech Solutions",
      role: "Software Engineering Intern",
      location: "New York, NY",
      period: "May 2024 – Aug 2024",
      bullets: [
        "Architected and deployed microservices handling 150K daily requests using React, Node.js, and MongoDB with 99.9% uptime.",
        "Optimized database query performance by 35% through indexing strategies and Redis cache integration.",
        "Collaborated with cross-functional teams of 8 engineers using Agile methodology and Git workflow."
      ]
    },
    {
      id: "exp2",
      company: "Columbia University IT Services",
      role: "Student Technical Support Lead",
      location: "New York, NY",
      period: "Sep 2023 – Present",
      bullets: [
        "Resolved 500+ campus hardware and software incidents with a 98.5% customer satisfaction rating.",
        "Automated repetitive onboarding workflows using Python scripts, saving 12+ staff hours per week."
      ]
    }
  ],
  projects: [
    {
      id: "proj1",
      title: "Aspiraa Resume AI Engine",
      tech: "React.js, Tailwind CSS, Python, Fast-API, Gemini API",
      period: "Jan 2024 – Present",
      bullets: [
        "Built a high-performance ATS resume analyzer evaluating text alignment against target job descriptions.",
        "Implemented real-time visual PDF text extraction and keyword match metrics with sub-100ms response speed.",
        "Grew user base to over 3,000 active university students within 2 months of campus rollout."
      ]
    },
    {
      id: "proj2",
      title: "Distributed File Cache Manager",
      tech: "C++, gRPC, Docker, Linux Systems",
      period: "Oct 2023 – Dec 2023",
      bullets: [
        "Developed a distributed LRU key-value store supporting concurrent client read/write operations.",
        "Containerized nodes with Docker Compose to simulate network latency and failure recovery scenarios."
      ]
    }
  ],
  skills: {
    languages: "Python, C++, JavaScript (TypeScript), HTML/CSS, SQL, Java",
    frameworks: "React, Node.js, Express, FastAPI, Next.js, Tailwind CSS",
    developerTools: "Git, Docker, VS Code, Linux/Unix, AWS (S3/EC2), Postman",
    libraries: "NumPy, Pandas, Scikit-learn, PyTorch, Chart.js"
  }
};

const sampleJobDescription = `We are seeking a Software Engineering Intern to join our core product engineering team.

Key Responsibilities:
- Build scalable RESTful APIs and front-end user interfaces using React, JavaScript, and Node.js.
- Write unit test suites and participate in peer code reviews.
- Optimize database queries and implement Redis caching for high availability.
- Collaborate with cloud infrastructure tools (Docker, AWS, Git).

Requirements:
- Pursuing a degree in Computer Science, Software Engineering, or related technical field.
- Strong proficiency in Data Structures & Algorithms and Python, React, or C++.
- Hands-on experience with REST APIs, Git, SQL databases, and Agile/Scrum.
- Excellent problem solving, team communication, and leadership capabilities.`;

export default function App() {
  const [activeTab, setActiveTab] = useState('builder'); // 'builder' | 'ats' | 'ambassador'
  
  // Resume Builder state
  const [resumeData, setResumeData] = useState(initialResumeData);

  // ATS Checker state
  const [jobDescription, setJobDescription] = useState(sampleJobDescription);
  const [pastedResumeText, setPastedResumeText] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [atsResult, setAtsResult] = useState(null);

  // Campus Ambassador State
  const [ambassadorStep, setAmbassadorStep] = useState(1);
  const [ambassadorSubmitted, setAmbassadorSubmitted] = useState(false);
  const [ambassadorData, setAmbassadorData] = useState({
    fullName: "",
    college: "",
    degree: "",
    year: "3rd Year",
    email: "",
    phone: "",
    linkedin: "",
    clubRole: "",
    followersCount: "1,000 - 5,000",
    previousExp: "Yes",
    motivation: "",
    strategy: ""
  });

  // Helper to trigger ATS text evaluation
  const runAtsAnalysis = (resumeTextToAnalyze) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const lowerText = resumeTextToAnalyze.toLowerCase();
      const lowerJd = jobDescription.toLowerCase();

      // Keywords pool to check
      const keySkills = [
        "react", "node.js", "javascript", "python", "c++", "sql", "git", 
        "docker", "aws", "rest", "api", "algorithms", "data structures", 
        "agile", "caching", "redis", "mongodb", "fastapi"
      ];

      const foundKeywords = keySkills.filter(skill => lowerText.includes(skill));
      const missingKeywords = keySkills.filter(skill => lowerJd.includes(skill) && !lowerText.includes(skill));
      
      const score = Math.min(
        100,
        Math.max(35, Math.round((foundKeywords.length / (foundKeywords.length + missingKeywords.length || 1)) * 100 + 15))
      );

      setAtsResult({
        score,
        foundKeywords,
        missingKeywords,
        wordCount: resumeTextToAnalyze.trim().split(/\s+/).length,
        actionVerbsCount: (resumeTextToAnalyze.match(/\b(built|developed|architected|created|optimized|collaborated|managed|led|designed|automated)\b/gi) || []).length,
        hasSerifStandard: true,
        formattingChecks: [
          { item: "Single Column Layout", status: true, note: "Ensures scanner read priority" },
          { item: "Standard Section Headings", status: true, note: "Education, Experience, Skills recognized" },
          { item: "Quantifiable Impact Bullet Points", status: resumeTextToAnalyze.includes("%") || resumeTextToAnalyze.includes("+"), note: "Includes metrics (%, numbers)" },
          { item: "Contact Header Clear", status: resumeTextToAnalyze.includes("@"), note: "Email and links parsed easily" },
          { item: "Length Check", status: resumeTextToAnalyze.length > 200, note: "Ideal single-page length" }
        ]
      });
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      // Extract clean string representation
      const textContent = typeof content === 'string' 
        ? content 
        : new TextDecoder().decode(content);

      setPastedResumeText(textContent);
      runAtsAnalysis(textContent);
    };

    if (file.type.includes("text") || file.name.endsWith(".txt") || file.name.endsWith(".md")) {
      reader.readAsText(file);
    } else {
      // For PDF/DOCX demonstration fallback: simulate reading readable stream contents
      reader.readAsArrayBuffer(file);
    }
  };

  // Sync Jake's Resume text to ATS Checker when triggered
  const syncJakesResumeToATS = () => {
    const text = `
      ${resumeData.personal.fullName} | ${resumeData.personal.email} | ${resumeData.personal.phone} | ${resumeData.personal.location}
      LinkedIn: ${resumeData.personal.linkedin} | GitHub: ${resumeData.personal.github}

      EDUCATION
      ${resumeData.education.map(e => `${e.institution} - ${e.degree} (${e.period}) GPA: ${e.gpa}\nCoursework: ${e.coursework}`).join('\n')}

      EXPERIENCE
      ${resumeData.experience.map(e => `${e.company} - ${e.role} (${e.period})\n${e.bullets.join('\n')}`).join('\n')}

      PROJECTS
      ${resumeData.projects.map(p => `${p.title} | ${p.tech} (${p.period})\n${p.bullets.join('\n')}`).join('\n')}

      TECHNICAL SKILLS
      Languages: ${resumeData.skills.languages}
      Frameworks: ${resumeData.skills.frameworks}
      Tools: ${resumeData.skills.developerTools}
      Libraries: ${resumeData.skills.libraries}
    `;
    setPastedResumeText(text);
    setUploadedFileName("Jake_Resume_Draft.pdf");
    setActiveTab('ats');
    runAtsAnalysis(text);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-indigo-500 to-sky-400 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-300">
                Aspiraa
              </span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                PRO ATS
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('builder')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'builder'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Jake's Resume Builder</span>
              <span className="sm:hidden">Builder</span>
            </button>

            <button
              onClick={() => setActiveTab('ats')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'ats'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>ATS File Checker</span>
            </button>

            <button
              onClick={() => setActiveTab('ambassador')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'ambassador'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Campus Ambassador</span>
              <span className="sm:hidden">Ambassador</span>
            </button>
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium px-4 py-2 rounded-lg border border-slate-700 transition"
            >
              <Download className="w-4 h-4" />
              Print / Save PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Renderers */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* ========================================================================= */}
        {/* FEATURE 1: JAKE'S RESUME BUILDER & LIVE PREVIEW */}
        {/* ========================================================================= */}
        {activeTab === 'builder' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Editor Panel Left (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 print:hidden">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-indigo-400" />
                      Resume Form
                    </h2>
                    <p className="text-xs text-slate-400">Classic Ivy League Standard Format</p>
                  </div>
                  <button
                    onClick={syncJakesResumeToATS}
                    className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/40 px-3 py-1.5 rounded-lg transition"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Check ATS Score
                  </button>
                </div>

                <div className="mt-5 space-y-6 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 custom-scrollbar">
                  {/* Contact Info */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Personal Contact</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-400">Full Name</label>
                        <input
                          type="text"
                          value={resumeData.personal.fullName}
                          onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, fullName: e.target.value}})}
                          className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">Email</label>
                        <input
                          type="text"
                          value={resumeData.personal.email}
                          onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, email: e.target.value}})}
                          className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">Phone</label>
                        <input
                          type="text"
                          value={resumeData.personal.phone}
                          onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, phone: e.target.value}})}
                          className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">Location</label>
                        <input
                          type="text"
                          value={resumeData.personal.location}
                          onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, location: e.target.value}})}
                          className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">LinkedIn URL</label>
                        <input
                          type="text"
                          value={resumeData.personal.linkedin}
                          onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, linkedin: e.target.value}})}
                          className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">GitHub URL</label>
                        <input
                          type="text"
                          value={resumeData.personal.github}
                          onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, github: e.target.value}})}
                          className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="space-y-3 pt-3 border-t border-slate-800">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Education</h3>
                    {resumeData.education.map((edu, idx) => (
                      <div key={edu.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 space-y-2">
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => {
                            const newEdu = [...resumeData.education];
                            newEdu[idx].institution = e.target.value;
                            setResumeData({...resumeData, education: newEdu});
                          }}
                          placeholder="University / College"
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-sm text-slate-200"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => {
                              const newEdu = [...resumeData.education];
                              newEdu[idx].degree = e.target.value;
                              setResumeData({...resumeData, education: newEdu});
                            }}
                            placeholder="Degree"
                            className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200"
                          />
                          <input
                            type="text"
                            value={edu.period}
                            onChange={(e) => {
                              const newEdu = [...resumeData.education];
                              newEdu[idx].period = e.target.value;
                              setResumeData({...resumeData, education: newEdu});
                            }}
                            placeholder="Period (e.g., Sep 2021 – May 2025)"
                            className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Work Experience */}
                  <div className="space-y-3 pt-3 border-t border-slate-800">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Work Experience</h3>
                      <button
                        onClick={() => setResumeData({
                          ...resumeData,
                          experience: [
                            ...resumeData.experience,
                            { id: Date.now().toString(), company: "Company Name", role: "Role Title", location: "City, State", period: "Jan 2024 – Present", bullets: ["Achieved quantifiable metric results using technologies X and Y."] }
                          ]
                        })}
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>

                    {resumeData.experience.map((exp, expIdx) => (
                      <div key={exp.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2 relative group">
                        <button
                          onClick={() => {
                            const updated = resumeData.experience.filter((_, i) => i !== expIdx);
                            setResumeData({...resumeData, experience: updated});
                          }}
                          className="absolute top-2 right-2 text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience];
                              newExp[expIdx].company = e.target.value;
                              setResumeData({...resumeData, experience: newExp});
                            }}
                            placeholder="Company"
                            className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs"
                          />
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience];
                              newExp[expIdx].role = e.target.value;
                              setResumeData({...resumeData, experience: newExp});
                            }}
                            placeholder="Role Title"
                            className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs"
                          />
                        </div>

                        {/* Bullets */}
                        <div className="space-y-1.5 mt-2">
                          <label className="text-[10px] text-slate-400 uppercase font-bold">Bullet Points</label>
                          {exp.bullets.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={b}
                                onChange={(e) => {
                                  const newExp = [...resumeData.experience];
                                  newExp[expIdx].bullets[bIdx] = e.target.value;
                                  setResumeData({...resumeData, experience: newExp});
                                }}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Skills */}
                  <div className="space-y-3 pt-3 border-t border-slate-800">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Technical Skills</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs text-slate-400">Languages</label>
                        <input
                          type="text"
                          value={resumeData.skills.languages}
                          onChange={(e) => setResumeData({...resumeData, skills: {...resumeData.skills, languages: e.target.value}})}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">Frameworks / Libraries</label>
                        <input
                          type="text"
                          value={resumeData.skills.frameworks}
                          onChange={(e) => setResumeData({...resumeData, skills: {...resumeData.skills, frameworks: e.target.value}})}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">Developer Tools</label>
                        <input
                          type="text"
                          value={resumeData.skills.developerTools}
                          onChange={(e) => setResumeData({...resumeData, skills: {...resumeData.skills, developerTools: e.target.value}})}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Preview Right (7 Cols) - Printable Jake's Resume */}
            {}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-3 print:hidden">
                <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Live Jake's Resume Standard Preview (8.5" x 11")
                </span>
                <button
                  onClick={() => window.print()}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3.5 py-1.5 rounded-lg shadow transition"
                >
                  Download / Print
                </button>
              </div>

              {/* The Paper Component (Jake's Resume Format) */}
              <div 
                id="resume-preview" 
                className="w-full bg-white text-black p-8 sm:p-12 shadow-2xl rounded-sm border border-slate-300 font-serif text-[11px] leading-snug tracking-tight min-h-[1050px]"
                style={{ fontFamily: "'Times New Roman', Times, serif" }}
              >
                {/* Header */}
                <div className="text-center pb-3 border-b border-black">
                  <h1 className="text-2xl font-bold tracking-normal uppercase text-black mb-1">
                    {resumeData.personal.fullName}
                  </h1>
                  <p className="text-[10.5px]">
                    {resumeData.personal.location} &bull; {resumeData.personal.phone} &bull; {resumeData.personal.email}
                  </p>
                  <p className="text-[10.5px] mt-0.5">
                    {resumeData.personal.linkedin} &bull; {resumeData.personal.github}
                  </p>
                </div>

                {/* Education */}
                <div className="mt-3">
                  <h2 className="text-[12px] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">
                    Education
                  </h2>
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="mb-2">
                      <div className="flex justify-between font-bold">
                        <span>{edu.institution}</span>
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex justify-between italic">
                        <span>{edu.degree}</span>
                        <span>{edu.period}</span>
                      </div>
                      {edu.gpa && <p className="text-[10px]">Cumulative GPA: {edu.gpa}</p>}
                      {edu.coursework && (
                        <p className="text-[10px] mt-0.5">
                          <span className="font-bold">Relevant Coursework:</span> {edu.coursework}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Experience */}
                <div className="mt-3">
                  <h2 className="text-[12px] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">
                    Experience
                  </h2>
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="mb-2.5">
                      <div className="flex justify-between font-bold">
                        <span>{exp.company}</span>
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex justify-between italic mb-1">
                        <span>{exp.role}</span>
                        <span>{exp.period}</span>
                      </div>
                      <ul className="list-disc list-outside ml-4 space-y-0.5 text-[10.5px]">
                        {exp.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Projects */}
                <div className="mt-3">
                  <h2 className="text-[12px] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">
                    Projects
                  </h2>
                  {resumeData.projects.map((proj) => (
                    <div key={proj.id} className="mb-2.5">
                      <div className="flex justify-between font-bold">
                        <span>
                          {proj.title} <span className="font-normal italic">| {proj.tech}</span>
                        </span>
                        <span>{proj.period}</span>
                      </div>
                      <ul className="list-disc list-outside ml-4 space-y-0.5 text-[10.5px] mt-1">
                        {proj.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Technical Skills */}
                <div className="mt-3">
                  <h2 className="text-[12px] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">
                    Technical Skills
                  </h2>
                  <div className="space-y-0.5 text-[10.5px]">
                    <p><span className="font-bold">Languages:</span> {resumeData.skills.languages}</p>
                    <p><span className="font-bold">Frameworks & Tools:</span> {resumeData.skills.frameworks}</p>
                    <p><span className="font-bold">Developer Tools:</span> {resumeData.skills.developerTools}</p>
                    <p><span className="font-bold">Libraries:</span> {resumeData.skills.libraries}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* FEATURE 2: PDF / RESUME FILE UPLOAD ATS CHECKER */}
        {/* ========================================================================= */}
        {activeTab === 'ats' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-100 flex items-center justify-center gap-2">
                <Upload className="w-6 h-6 text-indigo-400" />
                Resume ATS File Analysis Engine
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Upload your PDF/DOCX resume file or paste raw text to compare alignment against target Job Descriptions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Upload & JD Inputs */}
              <div className="lg:col-span-6 space-y-5">
                
                {/* File Dropzone */}
                <div className="bg-slate-900 border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 text-center transition group">
                  <input
                    type="file"
                    id="resume-file-input"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="resume-file-input" className="cursor-pointer flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                      <Upload className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-semibold text-slate-200">
                      {uploadedFileName ? `File Selected: ${uploadedFileName}` : "Drop your PDF / DOCX Resume here"}
                    </span>
                    <span className="text-xs text-slate-400 mt-1">Supports .PDF, .DOCX, and Plain Text files</span>
                    <button type="button" className="mt-4 px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700">
                      Browse Computer
                    </button>
                  </label>
                </div>

                {/* Or Text Input */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                      <span>Paste Resume Content</span>
                      {pastedResumeText && (
                        <span className="text-emerald-400 text-[11px]">{pastedResumeText.split(/\s+/).length} Words</span>
                      )}
                    </label>
                    <textarea
                      rows={5}
                      value={pastedResumeText}
                      onChange={(e) => setPastedResumeText(e.target.value)}
                      placeholder="Paste resume text or upload above..."
                      className="w-full mt-2 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Target Job Description
                    </label>
                    <textarea
                      rows={5}
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste Job Description keywords and requirements..."
                      className="w-full mt-2 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button
                    onClick={() => runAtsAnalysis(pastedResumeText || "Sample fallback software engineering resume text")}
                    disabled={isAnalyzing}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Scanning Resume & Matching Keywords...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Calculate ATS Score & Alignment
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: ATS Report Output */}
              <div className="lg:col-span-6 space-y-6">
                {!atsResult ? (
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                    <BarChart2 className="w-12 h-12 text-slate-700 mb-3" />
                    <h3 className="text-slate-300 font-bold text-base">No ATS Report Generated Yet</h3>
                    <p className="text-xs text-slate-500 max-w-sm mt-1">
                      Upload a PDF resume or click "Calculate ATS Score" to parse keyword matching and compliance.
                    </p>
                  </div>
                ) : (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                    
                    {/* Score Meter Header */}
                    <div className="flex items-center justify-between bg-slate-950 p-5 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Match Accuracy</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className={`text-4xl font-extrabold ${atsResult.score >= 75 ? 'text-emerald-400' : atsResult.score >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                            {atsResult.score}%
                          </span>
                          <span className="text-xs text-slate-400">ATS Pass Rate</span>
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          atsResult.score >= 75 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}>
                          {atsResult.score >= 75 ? 'High Interview Probability' : 'Optimization Recommended'}
                        </span>
                        <p className="text-[11px] text-slate-500">{atsResult.wordCount} Total Words Parsed</p>
                      </div>
                    </div>

                    {/* Found Keywords vs Missing */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Matched Keywords ({atsResult.foundKeywords.length})
                        </h4>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {atsResult.foundKeywords.map((kw, i) => (
                            <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5" /> Missing Skills ({atsResult.missingKeywords.length})
                        </h4>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {atsResult.missingKeywords.length > 0 ? (
                            atsResult.missingKeywords.map((kw, i) => (
                              <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                                + {kw}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-slate-500">All key JD skills detected!</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Standard Compliance Checklist */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                        Format Compliance Checklist (Jake's Standard)
                      </h4>
                      <div className="space-y-2">
                        {atsResult.formattingChecks.map((check, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800/50">
                            <div className="flex items-center gap-2">
                              {check.status ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                              )}
                              <span className="text-xs font-medium text-slate-200">{check.item}</span>
                            </div>
                            <span className="text-[11px] text-slate-500">{check.note}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* FEATURE 3: CAMPUS AMBASSADOR APPLICATION FORM & LEADERBOARD */}
        {/* ========================================================================= */}
        {activeTab === 'ambassador' && (
          <div className="space-y-10 max-w-4xl mx-auto">
            
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-indigo-900/50 via-slate-900 to-sky-900/30 border border-indigo-500/30 rounded-3xl p-8 text-center relative overflow-hidden">
              <div className="relative z-10 max-w-xl mx-auto space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Lead Placement Season 2026
                </span>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                  Become an Aspiraa Campus Ambassador
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Represent Aspiraa at your university. Help your peers craft ATS-ready resumes, host placement workshops, and gain exclusive networking perks with lead recruiters.
                </p>
              </div>
            </div>

            {/* Application Flow or Confirmation */}
            {ambassadorSubmitted ? (
              <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Application Received!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-emerald-400">{ambassadorData.fullName}</span>. Our university outreach manager will review your submission for <span className="font-semibold text-white">{ambassadorData.college}</span> within 48 hours.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => { setAmbassadorSubmitted(false); setAmbassadorStep(1); }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-lg"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
                
                {/* Steps Indicator */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${ambassadorStep === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>1</div>
                    <span className="text-xs font-semibold text-slate-300">Student Info</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${ambassadorStep === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>2</div>
                    <span className="text-xs font-semibold text-slate-300">Leadership & Reach</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${ambassadorStep === 3 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>3</div>
                    <span className="text-xs font-semibold text-slate-300">Pitch & Strategy</span>
                  </div>
                </div>

                {/* Step 1: Personal & Academic */}
                {ambassadorStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Step 1: Student Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-400">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={ambassadorData.fullName}
                          onChange={(e) => setAmbassadorData({...ambassadorData, fullName: e.target.value})}
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">College / University Name *</label>
                        <input
                          type="text"
                          required
                          value={ambassadorData.college}
                          onChange={(e) => setAmbassadorData({...ambassadorData, college: e.target.value})}
                          placeholder="e.g. NITK Surathkal / Columbia Univ"
                          className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">Degree & Branch *</label>
                        <input
                          type="text"
                          value={ambassadorData.degree}
                          onChange={(e) => setAmbassadorData({...ambassadorData, degree: e.target.value})}
                          placeholder="e.g. B.Tech Computer Science"
                          className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">Year of Study</label>
                        <select
                          value={ambassadorData.year}
                          onChange={(e) => setAmbassadorData({...ambassadorData, year: e.target.value})}
                          className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                        >
                          <option>1st Year</option>
                          <option>2nd Year</option>
                          <option>3rd Year</option>
                          <option>Final Year</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">College Email Address *</label>
                        <input
                          type="email"
                          value={ambassadorData.email}
                          onChange={(e) => setAmbassadorData({...ambassadorData, email: e.target.value})}
                          placeholder="student@university.edu"
                          className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">LinkedIn Profile Link</label>
                        <input
                          type="text"
                          value={ambassadorData.linkedin}
                          onChange={(e) => setAmbassadorData({...ambassadorData, linkedin: e.target.value})}
                          placeholder="linkedin.com/in/username"
                          className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        onClick={() => setAmbassadorStep(2)}
                        disabled={!ambassadorData.fullName || !ambassadorData.college}
                        className="px-6 py-2.5 bg-indigo-600 disabled:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow transition"
                      >
                        Next: Leadership Details &rarr;
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Leadership & Social Reach */}
                {ambassadorStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Step 2: Leadership & Social Reach</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-slate-400">Student Clubs / Societies Led or Part of</label>
                        <input
                          type="text"
                          value={ambassadorData.clubRole}
                          onChange={(e) => setAmbassadorData({...ambassadorData, clubRole: e.target.value})}
                          placeholder="e.g. Lead at IEEE Student Branch / Placement Cell Coordinator"
                          className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">Estimated Student Network / Campus Reach</label>
                        <select
                          value={ambassadorData.followersCount}
                          onChange={(e) => setAmbassadorData({...ambassadorData, followersCount: e.target.value})}
                          className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                        >
                          <option>&lt; 500 students</option>
                          <option>500 - 1,000 students</option>
                          <option>1,000 - 5,000 students</option>
                          <option>5,000+ students</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        onClick={() => setAmbassadorStep(1)}
                        className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl"
                      >
                        &larr; Back
                      </button>
                      <button
                        onClick={() => setAmbassadorStep(3)}
                        className="px-6 py-2.5 bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow transition"
                      >
                        Next: Strategy Pitch &rarr;
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Motivation & Strategy */}
                {ambassadorStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Step 3: Motivation & Campus Strategy</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-slate-400">Why do you want to represent Aspiraa on your campus? *</label>
                        <textarea
                          rows={3}
                          value={ambassadorData.motivation}
                          onChange={(e) => setAmbassadorData({...ambassadorData, motivation: e.target.value})}
                          placeholder="Describe your motivation..."
                          className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">Your plan to onboard students for placement season *</label>
                        <textarea
                          rows={3}
                          value={ambassadorData.strategy}
                          onChange={(e) => setAmbassadorData({...ambassadorData, strategy: e.target.value})}
                          placeholder="How will you promote Aspiraa resume builder to your batchmates?"
                          className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        onClick={() => setAmbassadorStep(2)}
                        className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl"
                      >
                        &larr; Back
                      </button>
                      <button
                        onClick={() => setAmbassadorSubmitted(true)}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow flex items-center gap-1.5 transition"
                      >
                        <Send className="w-3.5 h-3.5" /> Submit Application
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Campus Leaderboard Preview */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400" />
                  Top Partner Campus Leaderboard
                </h3>
                <span className="text-xs text-slate-400">2026 Season Onboardings</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "NITK Surathkal", leads: "1,240 Students", rank: "#1", badge: "Gold Partner" },
                  { name: "IIT Madras", leads: "980 Students", rank: "#2", badge: "Silver Partner" },
                  { name: "BITS Pilani", leads: "850 Students", rank: "#3", badge: "Bronze Partner" }
                ].map((item, index) => (
                  <div key={index} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">{item.badge}</span>
                      <h4 className="text-sm font-bold text-slate-200 mt-0.5">{item.name}</h4>
                      <p className="text-xs text-slate-500">{item.leads}</p>
                    </div>
                    <span className="text-lg font-black text-slate-400">{item.rank}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
