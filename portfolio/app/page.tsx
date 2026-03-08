"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ChevronDown, Database, ChartBar, Terminal, Activity, Download, ArrowRight, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

// --- Extracted Data ---
const RESUME_DATA = {
  basics: {
    name: "MAITREE SHAH",
    title: "Data Analyst",
    summary: "Data Analyst with 3+ years of experience specializing in SQL, Python, Tableau, and Power BI to drive product and business performance. Proven track record in automating ETL pipelines, statistical modeling, and delivering executive-level insights that reduce costs and improve operational efficiency. Strong interest in fintech and lending analysis, focusing on customer lifecycle improvement and funnel optimization.",
    location: "Chicago, IL",
    email: "shahmaitree10@gmail.com",
    phone: "(224)-551-1088",
    links: { linkedin: "https://www.linkedin.com/in/maitree-shah-0a0b2b341/", 
      github: "https://github.com/MaitreeShah01" }
  },
  impactMetrics:[
    { value: "$1,000+", label: "Immediate Cost Savings" },
    { value: "60%", label: "Reduction in Manual Reporting" },
    { value: "$10,000", label: "Inventory Losses Prevented" }
  ],
  experience:[
    {
      company: "Excelerate",
      role: "Data Visualization Intern",
      dates: "Apr 2025 – May 2025",
      bullets:[
        "Analyzed digital marketing and engagement data to identify bottlenecks in the conversion funnel, resulting in $1,000+ in immediate cost savings.",
        "Developed comprehensive attribution models to track lead sources, allowing the marketing team to reallocate budget toward high-performing channels.",
        "Designed interactive Tableau dashboards to monitor ROI and weekly performance trends, providing stakeholders with real-time visibility into campaign health.",
        "Collaborated with cross-functional teams to translate complex datasets into actionable executive summaries, improving reporting clarity by 35%."
      ]
    },
    {
      company: "Amitron Corporation",
      role: "Assistant Data Analyst",
      dates: "May 2023 – Jan 2024",
      bullets:[
        "Architected automated SQL and Power Query pipelines to consolidate fragmented data sources, reducing manual reporting time by 60%.",
        "Engineered real-time KPI dashboards in Power BI to monitor operational health and supply chain risks, enabling faster response times to production anomalies.",
        "Performed deep-dive analysis on 250,000+ records to identify root causes of manufacturing defects, leading to an 18% reduction in material waste.",
        "Partnered with operations management to define data governance standards and establish a culture of data-driven decision-making across the facility."
      ]
    },
    {
      company: "IV Infotech",
      role: "System Analyst I",
      dates: "Jul 2021 – Feb 2023",
      bullets:[
        "Developed robust Python-based ETL solutions to clean, validate, and migrate structured data into PostgreSQL, ensuring 99.9% data integrity.",
        "Optimized complex SQL queries and database indexing strategies, which enhanced overall system efficiency and data retrieval speeds by 20%.",
        "Built Tableau inventory tracking systems that flagged low-stock scenarios and expiration risks, preventing over $10,000 in potential inventory losses.",
        "Gathered technical requirements from business users to design custom software solutions that streamlined internal workflows and improved data accessibility."
      ]
    }
  ],
  projects:[
    {
      title: "Mental Health Outcome Analysis",
      dates: "Feb 2025 – Mar 2025",
      bullets:[
        "Executed Exploratory Data Analysis (EDA) on 5,000+ survey responses to identify key determinants of mental health outcomes using Python.",
        "Optimized multi-variable regression models through rigorous feature selection, improving predictive precision by 22%."
      ]
    },
    {
      title: "Sales Performance Application",
      dates: "Oct 2024 – Nov 2024",
      bullets:[
        "Built a Python-based analytics tool integrated with a SQLite database to monitor consumer spending patterns and seasonal sales trends.",
        "Automated the generation of weekly performance reports and data visualizations, cutting manual data entry efforts by 70%."
      ]
    }
  ],
  skills: [
    { category: "Programming & Statistics", items:["Python (Pandas, NumPy, Scikit-learn)", "R", "Statistical Analysis", "Regression Modeling", "Hypothesis Testing"] },
    { category: "Data Visualization", items:["Tableau", "Power BI", "KPI Dashboards", "Funnel & Trend Analysis"] },
    { category: "Databases & Engineering", items:["MySQL", "PostgreSQL", "SQLite", "ETL Pipelines", "Power Query", "Tableau Prep"] },
    { category: "Tools & Frameworks", items:["Git/GitHub", "Jupyter", "Adobe Analytics", "LLM Tools", "Advanced Excel (VLOOKUP, Pivot Tables)"] }
  ],
  education:[
    { degree: "Master of Science in Computer Science", institution: "DePaul University", dates: "Expected Jun 2026" },
    { degree: "Bachelor of Computer Application", institution: "HNGU, Mehsana", dates: "" }
  ],
  certifications:[
    "Google IT Automation with Python", "Deloitte Data Analytics", "Wells Fargo Software Engineering"
  ]
};

// --- Sub-components ---
const Splash = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, y: -50, scale: 0.98 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500 mb-8"
      >
        MS.
      </motion.div>
      <div className="w-48 h-[2px] bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
        />
      </div>
    </motion.div>
  );
};

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [expandedExp, setExpandedExp] = useState<number | null>(0);

  return (
    <>
      <AnimatePresence>
        {loading && <Splash onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <main className="relative min-h-screen z-10">
          {/* Scroll Progress Bar */}
          <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-40" style={{ scaleX }} />

          {/* Hero Section */}
          <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl w-full text-center space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium mb-4">
                <Activity size={16} /> Data-Driven Impact
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                {RESUME_DATA.basics.name}
              </h1>
              <h2 className="text-2xl md:text-3xl text-slate-400 font-light">
                {RESUME_DATA.basics.title}
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed text-lg">
                {RESUME_DATA.basics.summary}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <button onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto px-8 py-3 rounded-xl bg-white text-slate-950 font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                  View Experience <ArrowRight size={18} />
                </button>
                {/*<button onClick={() => window.print()} className="w-full sm:w-auto px-8 py-3 rounded-xl glass-card text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  Download Resume <Download size={18} />
                </button>*/}
                <a href="/Resume_MAITREE.pdf" download="Maitree_Shah_Resume.pdf" className="w-full sm:w-auto px-8 py-3 rounded-xl glass-card text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  Download Resume <Download size={18} />
                </a>
              </div>

              <div className="flex items-center justify-center gap-6 pt-8 text-slate-400">
                <a href={`mailto:${RESUME_DATA.basics.email}`} className="hover:text-blue-400 transition-colors flex items-center gap-2"><Mail size={18}/></a>
                <a href={RESUME_DATA.basics.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-2"><Linkedin size={18}/></a>
                <a href={RESUME_DATA.basics.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-2"><Github size={18}/></a>
                <span className="flex items-center gap-1"><MapPin size={18}/> {RESUME_DATA.basics.location}</span>
                <span className="flex items-center gap-1"><Phone size={18}/> {RESUME_DATA.basics.phone}</span>
              </div>
            </motion.div>
          </section>

          {/* Top 3 Impact Strip */}
          <section className="px-6 py-12">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              {RESUME_DATA.impactMetrics.map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.15 }}
                  className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center group hover:border-blue-500/50 transition-colors"
                >
                  <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500 group-hover:scale-110 transition-transform">
                    {metric.value}
                  </span>
                  <span className="text-slate-400 mt-2 font-medium">{metric.label}</span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Experience Timeline */}
          <section id="experience" className="px-6 py-20 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-10 flex items-center gap-3"><Terminal className="text-blue-500"/> Professional Experience</h3>
            <div className="space-y-6">
              {RESUME_DATA.experience.map((exp, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="glass-card rounded-2xl overflow-hidden"
                >
                  <button 
                    onClick={() => setExpandedExp(expandedExp === idx ? null : idx)}
                    className="w-full text-left p-6 flex items-center justify-between focus:outline-none"
                  >
                    <div>
                      <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                      <p className="text-blue-400 font-medium">{exp.company} <span className="text-slate-500 text-sm ml-2">| {exp.dates}</span></p>
                    </div>
                    <ChevronDown className={`transform transition-transform duration-300 ${expandedExp === idx ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {expandedExp === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <ul className="p-6 pt-0 space-y-3 border-t border-slate-800/50">
                          {exp.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-3 text-slate-300">
                              <span className="mt-2 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                              <span className="leading-relaxed">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="px-6 py-20 max-w-5xl mx-auto">
             <h3 className="text-3xl font-bold mb-10 flex items-center gap-3"><Database className="text-violet-500"/> Technical Projects</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {RESUME_DATA.projects.map((proj, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass-card p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300"
                  >
                    <h4 className="text-xl font-bold mb-2">{proj.title}</h4>
                    <p className="text-slate-500 text-sm mb-6">{proj.dates}</p>
                    <ul className="space-y-3">
                      {proj.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="text-slate-300 text-sm leading-relaxed flex items-start gap-2">
                           <span className="mt-1.5 w-1 h-1 bg-violet-400 rounded-full shrink-0" /> {b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
             </div>
          </section>

          {/* Skills & Tech Stack */}
          <section className="px-6 py-20 bg-slate-900/50 border-y border-slate-800 backdrop-blur-sm">
             <div className="max-w-5xl mx-auto">
               <h3 className="text-3xl font-bold mb-10 text-center"><ChartBar className="inline text-blue-500 mr-2"/> Skills & Expertise</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {RESUME_DATA.skills.map((skillGroup, idx) => (
                   <div key={idx} className="space-y-4">
                     <h4 className="text-lg font-semibold text-slate-200">{skillGroup.category}</h4>
                     <div className="flex flex-wrap gap-2">
                       {skillGroup.items.map((skill, sIdx) => (
                         <span key={sIdx} className="px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-sm text-slate-300 hover:border-blue-500 transition-colors cursor-default">
                           {skill}
                         </span>
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </section>

          {/* Education & Certs */}
          <section className="px-6 py-20 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-slate-100">Education</h3>
                <div className="space-y-6">
                  {RESUME_DATA.education.map((edu, idx) => (
                    <div key={idx} className="border-l-2 border-blue-500 pl-4 py-1">
                      <h4 className="font-bold text-lg">{edu.degree}</h4>
                      <p className="text-slate-400">{edu.institution}</p>
                      {edu.dates && <p className="text-sm text-slate-500">{edu.dates}</p>}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-slate-100">Certifications</h3>
                <ul className="space-y-3">
                  {RESUME_DATA.certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-center gap-3 p-4 rounded-xl glass-card">
                      <div className="w-2 h-2 rounded-full bg-violet-500" />
                      <span className="font-medium text-slate-200">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-800">
             © {new Date().getFullYear()} {RESUME_DATA.basics.name}. All rights reserved.
          </footer>
        </main>
      )}
    </>
  );
}