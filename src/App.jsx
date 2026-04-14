import { useEffect, useMemo, useState } from "react";
import IMG_6633 from './assets/IMG_6633.jpeg';
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";


// Simple hash router (no extra deps)
function useRoute(defaultRoute = "overview") {
  const [route, setRoute] = useState(() => (window.location.hash.replace('#', '') || defaultRoute));
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace('#', '') || defaultRoute);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [defaultRoute]);
  const navigate = (r) => { window.location.hash = r; };
  return { route, navigate };
}

export default function App() {
  const { route, navigate } = useRoute("overview");
  const stats = { projects: 7, experienceYears: 5, nationality: "American" };

  const projects = useMemo(() => ([
    {
      id: 1,
      title: "BrainBoard",
      category: "Full Stack",
      stack: "React · Node.js · MongoDB · GPT-4 · Redis · WebSockets",
      date: "Jan 2026 – Mar 2026",
      desc: "AI-powered collaborative whiteboard that transforms rough ideas into structured concept maps in real time. An embedded GPT-4 agent automatically clusters, expands, and connects user input — supporting 10+ simultaneous collaborators with sub-2s AI response times.",
      bullets: [
        "Accelerated team ideation sessions by 3× by building a real-time collaborative whiteboard with React, Node.js, and MongoDB.",
        "Achieved 90% contextual relevance by engineering a prompt system with persona-based prompts, summarization chains, and temperature-tuned expansion tailored to each brainstorming domain.",
        "Supported 10+ simultaneous users with sub-2s AI suggestions by architecting a WebSocket sync engine with Redis pub/sub and batched AI request queuing to avoid rate limits.",
      ],
    },
    {
      id: 2,
      title: "Voyage",
      category: "Full Stack",
      stack: "JavaScript · Flask · HTML · CSS · Docker · Gemini API",
      date: "Aug 2025 – Dec 2025",
      desc: "Full-stack travel planning application that lets users build custom itineraries or generate AI-powered trip plans via the Gemini API. Features persistent user accounts, cross-device responsiveness, and a custom caching layer that cut AI token costs by 20%.",
      bullets: [
        "Enabled users to plan trips through custom itineraries or AI-generated travel plans by building a full-stack application with JavaScript, Flask, HTML, CSS, and Docker, integrated with the Gemini API.",
        "Delivered a responsive cross-device experience with quick retrieval of past plans by building user account management with persistent itinerary storage.",
        "Reduced API latency and cut Gemini AI token costs by 20% by containerizing the application with Docker and implementing a custom caching layer for Gemini AI and Google Maps API responses.",
      ],
    },
    {
      id: 3,
      title: "LinkPulse",
      category: "Full Stack",
      stack: "Express.js · React · PostgreSQL · Redis · WebSockets",
      date: "Jan 2025 – May 2025",
      desc: "High-performance URL shortener with a live analytics dashboard. Achieved sub-10ms redirect times and reduced PostgreSQL read load by 60% through Redis caching. Streams real-time click data — including geo distribution, referrer tracking, and time-series charts — to a React dashboard via WebSockets.",
      bullets: [
        "Achieved sub-10ms redirect response times and reduced PostgreSQL read load by 60% by implementing a Redis caching layer for high-frequency short link lookups under simulated concurrent traffic.",
        "Delivered real-time click analytics including geographic distribution, referrer tracking, and time-series visualizations by building a WebSocket-driven event pipeline that streams click data to a React dashboard.",
        "Prevented API abuse while sustaining 500+ requests per minute per user by designing Express.js rate-limiting middleware with Redis-backed sliding window counters.",
      ],
    },
    {
      id: 4,
      title: "Abu Barista Coffee",
      category: "Freelance",
      stack: "MongoDB · Express.js · React · Node.js · JWT · Bcrypt",
      date: "Sep 2025 – Jan 2026",
      desc: "Production MERN platform built for a local coffee vendor serving 35+ daily active users. Delivers secure authentication, seasonal menu management, inventory tracking, and event inquiry workflows — eliminating the manual coordination overhead the client previously relied on.",
      bullets: [
        "Ensured secure data storage for 35+ daily active users by engineering a full-stack MERN application with Bcrypt password hashing and JWT authentication.",
        "Enabled the client to manage seasonal menus, track inventory, and process vending requests by building a secure, lightweight platform that eliminated manual coordination overhead.",
        "Drove engagement and shortened order cycles by streamlining menu accuracy and event inquiry workflows, reducing staff workload.",
      ],
    },
  ]), []);

  const categories = ["All", "Full Stack", "Freelance"];
  const [activeCat, setActiveCat] = useState("All");
  const filtered = activeCat === "All" ? projects : projects.filter(p => p.category === activeCat);
  const [openProject, setOpenProject] = useState(null);

  return (
    <div className="shell">
      <TopBar onNav={navigate} route={route} />

      {route === "overview" && (
        <>
          <Hero stats={stats} onOverview={() => navigate('about')} />
          <Overview />
        </>
      )}

      {route === "about" && <Overview />}
      {route === "skills" && <Skills />}

      {route === "projects" && (
        <section className="wrap">
          <h1 className="h1">Projects</h1>
          <p className="muted">A selection of full-stack and freelance work — spanning AI-powered tools, real-time systems, and production client applications.</p>
          <div className="projects-layout">
            <aside className="proj-filter">
              <ul>
                {categories.map((c) => (
                  <li key={c}>
                    <button className={c===activeCat?"pill active":"pill"} onClick={() => setActiveCat(c)}>
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="cta">
                <a className="btn" href="#contact">Got a project?</a>
              </div>
            </aside>
            <div className="proj-grid">
              {filtered.map(p => (
                <article key={p.id} className="proj-card" onClick={() => setOpenProject(p)}>
                  <div className="pc-head">
                    <div>
                      <h3 className="h3">{p.title}</h3>
                      <p className="proj-date">{p.date}</p>
                    </div>
                    <span className="badge">{p.category}</span>
                  </div>
                  <p className="proj-desc">{p.desc}</p>
                  <p className="proj-stack">{p.stack}</p>
                </article>
              ))}
            </div>
          </div>

          {openProject && (
            <Modal onClose={() => setOpenProject(null)}>
              <div className="preview">
                <div className="mock">
                  <div className="mock-left">
                    <div className="modal-header">
                      <div>
                        <h3 className="h3">{openProject.title}</h3>
                        <p className="proj-date">{openProject.date}</p>
                      </div>
                      <span className="badge">{openProject.category}</span>
                    </div>
                    <p className="modal-desc">{openProject.desc}</p>
                    <ul className="modal-bullets">
                      {openProject.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                    <p className="proj-stack">{openProject.stack}</p>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </section>
      )}

      {route === "contact" && <Contact />}

      <Footer />

      {/* Styles */}
      <Style />
    </div>
  );
}

function TopBar({ onNav, route }) {
  const items = [
    { id: "overview", label: "Overview" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <header className="topbar">
      <div className="wrap row">
        <a className="logo" href="#overview">S</a>
        <nav className="nav">
          {items.map(i => (
            <a key={i.id} className={route===i.id?"navlink active":"navlink"} href={`#${i.id}`}>{i.label}</a>
          ))}
        </nav>
        <a className="btn" href="#contact">Got a Project?</a>
      </div>
    </header>
  );
}

function Hero({ stats, onOverview }) {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-left">
          <p className="hero-eyebrow">Hi, my name is</p>
          <h1 className="display">Ali Altimimi!</h1>
          <p className="lead">Software engineer with a B.S. in Computer Science from SJSU — passionate about building things that are fast, well-crafted, and genuinely useful. Coffee enthusiast and SJSU Software Engineering Club officer.</p>
          <div className="hero-actions">
            <a className="btn" href="/resume.pdf" target="_blank" rel="noreferrer" download>Download Resume</a>
            <a className="link" href="#about">Go To Overview →</a>
          </div>
          <div className="stats">
            <Stat label="Projects" value={stats.projects} />
            <Stat label="Experience" value={`${stats.experienceYears} yrs`} />
            <Stat label="Nationality" value="American 🇺🇸" />
          </div>
        </div>
        <div className="hero-right">
          <div className="tilt-card">
            <div className="tilt-frame">
              <img src={IMG_6633} alt="Headshot Preview" className="tilt-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}

function Overview() {
  return (
    <section className="wrap overview">
      <div className="ov-left">
        <h1 className="h1">About Me</h1>
        <p className="muted">Based in San Jose, CA. I've built platforms serving 35+ daily active users, achieved sub-10ms response times with Redis caching, and cut AI API costs by 20% through custom caching layers. I'm drawn to problems at the intersection of performance engineering and intelligent systems — particularly integrating LLM APIs to ship features that make a measurable difference.</p>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/ali-altimimi/" target="_blank" rel="noreferrer">
            <FaLinkedin size={28} color="#0A66C2" />
          </a>
          <a href="https://github.com/alia49" target="_blank" rel="noreferrer">
            <FaGithub size={28} color="#fff" />
          </a>
        </div>
        <h2 className="h2">Education</h2>
        <ul className="timeline">
          <li><Dot /><span><strong>B.S. Computer Science</strong> · San Jose State University, San Jose, CA · Dec 2025</span></li>
        </ul>
        <h2 className="h2">Experience</h2>
        <ul className="timeline">
          <li><Dot /><span><strong>Full Stack Developer</strong> · Abu Barista Coffee <span className="tl-date">Sep 2025 – Jan 2026</span></span></li>
          <li><Dot /><span><strong>Software Engineering Club Officer</strong> · San Jose State University <span className="tl-date">Aug 2023 – Dec 2025</span></span></li>
          <li><Dot /><span><strong>Student Worker</strong> · Welcome Center, Mission College</span></li>
          <li><Dot /><span><strong>Volunteer</strong> · Second Harvest of Silicon Valley</span></li>
        </ul>
      </div>
    </section>
  );
}

function Skills() {
  const items = [
    {
      title: "Front-End Development",
      body: "Builds responsive, accessible UIs with React, JavaScript, TypeScript, HTML, and CSS. Focused on performance, component architecture, and seamless cross-device experiences.",
      color: "#f8eacc",
    },
    {
      title: "Back-End Development",
      body: "Develops server-side logic, RESTful APIs, and microservices using Node.js, Express.js, and Flask. Experienced with PostgreSQL, MongoDB, Redis, and message queues.",
      color: "#d6eadf",
    },
    {
      title: "AI & LLM Integration",
      body: "Integrates LLM APIs — including OpenAI GPT-4 and Google Gemini — with custom prompt engineering pipelines to build intelligent, production-grade user-facing features.",
      color: "#e6dcf5",
    },
    {
      title: "Cloud & DevOps",
      body: "Experienced with Docker for containerization and AWS services including EC2, S3, Lambda, and IAM. Comfortable deploying, scaling, and monitoring applications in cloud environments.",
      color: "#f4e6f6",
    },
    {
      title: "Databases & Caching",
      body: "Designs schemas and optimizes queries across MongoDB, PostgreSQL, and ChromaDB. Implements Redis caching strategies to reduce database load and achieve sub-10ms response times.",
      color: "#f8eac7",
    },
    {
      title: "Linux & Systems",
      body: "Proficient in Linux system administration, shell scripting, and CLI tooling for development and server management. Comfortable working in terminal-first environments.",
      color: "#d6eadf",
    },
  ];

  return (
    <section className="wrap">
      <h1 className="h1">Skills</h1>
      <p className="muted">A breakdown of the technical areas I work in most — built through coursework, personal projects, and production deployments.</p>
      <div className="sk-grid">
        {items.map((it, i) => (
          <article key={i} className="sk-card">
            <div className="sk-illus" style={{background: it.color}} />
            <h3 className="h3">{it.title}</h3>
            <p className="muted">{it.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="wrap contact">
      <h1 className="h1">Get In Touch</h1>
      <p className="muted">I'm always open to new opportunities, collaborations, or just a good conversation about software. Feel free to reach out through any of the channels below.</p>
      <div className="contact-grid">
        <div className="contact-card">
          <div className="icon">📞</div>
          <div>
            <div className="label">Phone</div>
            <a href="tel:+17036720111">+1 (703)-672-0111</a>
          </div>
        </div>
        <div className="contact-card">
          <div className="icon">✉️</div>
          <div>
            <div className="label">Email</div>
            <a href="mailto:alialtimimiwork@proton.me">alialtimimiwork@proton.me</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer(){
  return (
    <footer className="footer">
      <div className="wrap row between">
        <p className="muted">© {new Date().getFullYear()} Ali Altimimi</p>
        <a className="link" href="#overview">Back to top ↑</a>
      </div>
    </footer>
  );
}

function Dot(){
  return <span className="dot" />
}

function Modal({ children, onClose }){
  useEffect(() => {
    const onKey = (e) => (e.key === 'Escape') && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-body" onClick={(e)=>e.stopPropagation()}>
        <button className="close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}

function Style(){
  return (
    <style>{`
      :root{
        --bg:#0f1720; /* deep blue/gray */
        --panel:#151b23;
        --ink:#e6edf3;
        --muted:#9aa4b2;
        --line:#232b36;
        --brand:#23b08f;
        --accent:#7aa2f7;
      }
      *{box-sizing:border-box}
      html,body,#root{height:100%}
      body{margin:0;background:var(--bg);color:var(--ink);font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial}
      img{max-width:100%;display:block}
      a{color:inherit}
      .wrap{max-width:1100px;margin:0 auto;padding:24px}
      .row{display:flex;align-items:center;gap:16px}
      .between{justify-content:space-between}
      .btn{background:var(--brand);color:#001b12;border-radius:10px;padding:10px 14px;text-decoration:none;font-weight:700;border:1px solid #1b8f74}
      .btn:hover{opacity:.95}
      .nav{display:flex;gap:18px}
      .navlink{opacity:.8;text-decoration:none}
      .navlink.active,.navlink:hover{opacity:1}
      .logo{display:grid;place-items:center;width:32px;height:32px;border-radius:8px;background:#b9f5e2;color:#0b3b2e;text-decoration:none;font-weight:800;border:1px solid #8bd7c2}
      .topbar{position:sticky;top:0;backdrop-filter:saturate(120%) blur(8px);background:rgba(15,23,32,.6);border-bottom:1px solid var(--line);z-index:20}

      .hero{padding:80px 0 64px;background:radial-gradient(65% 70% at 75% 30%, rgba(122,162,247,.12), transparent 60%)}
      .hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
      @media (max-width:900px){.hero-grid{grid-template-columns:1fr}}
      .hero-left{display:flex;flex-direction:column;gap:16px}
      .hero-eyebrow{margin:0;font-size:14px;letter-spacing:.1em;text-transform:uppercase;color:var(--brand)}
      .display{font-size:52px;line-height:1.08;margin:0;font-weight:900}
      .lead{margin:0;color:var(--muted);max-width:44ch;line-height:1.65}
      .link{cursor:pointer;text-decoration:underline;text-underline-offset:4px;color:var(--accent)}
      .hero-actions{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
      .stats{display:flex;gap:0;margin-top:8px;border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--panel)}
      .stat{flex:1;padding:14px 16px;border-right:1px solid var(--line)}
      .stat:last-child{border-right:none}
      .stat-label{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.12em;margin-bottom:4px}
      .stat-value{font-size:17px;font-weight:800}
      .hero-right{display:grid;place-items:center}
      .tilt-card{transform:rotate(-3deg);background:#ffffff0d;border-radius:20px;padding:12px;border:1px solid #ffffff1a;box-shadow:0 24px 64px rgba(0,0,0,.5)}
      .tilt-frame{width:340px;max-width:100%;height:420px;border-radius:12px;background:linear-gradient(135deg,#5b7cfa22,#7aa2f722);overflow:hidden}
      .tilt-img{width:100%;height:100%;object-fit:cover;object-position:top;border-radius:12px}

      .overview{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;padding-top:24px}
      @media (max-width:900px){.overview{grid-template-columns:1fr}}
      .ov-left{position:relative}
      .h1{font-size:28px;margin:0 0 8px;font-weight:900;position:relative;z-index:0}
      .h2{font-size:18px;margin:16px 0 8px;font-weight:800}
      .h3{font-size:16px;margin:0;font-weight:800}
      .muted{color:var(--muted)}
      .timeline{list-style:none;padding:0;margin:8px 0 0;display:grid;gap:12px}
      .timeline li{display:flex;align-items:baseline;gap:0;font-size:14px;line-height:1.5}
      .tl-date{font-size:12px;color:var(--muted);margin-left:8px}
      .dot{display:inline-block;flex-shrink:0;width:9px;height:9px;border-radius:99px;background:#bcd;box-shadow:0 0 0 3px #7aa2f722;margin-right:10px;margin-top:4px}
      .social-links{display:flex;gap:8px;align-items:center}
      .spacer{flex:1}

      .projects-layout{display:grid;grid-template-columns:260px 1fr;gap:20px;margin-top:16px}
      @media (max-width:900px){.projects-layout{grid-template-columns:1fr}}
      .proj-filter{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:14px}
      .pill{width:100%;text-align:left;background:transparent;color:var(--ink);border:1px solid var(--line);padding:8px 10px;border-radius:999px;margin:6px 0;cursor:pointer}
      .pill.active{background:#ffffff0a;border-color:#ffffff22}
      .cta{margin-top:8px}
      .proj-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
      @media (max-width:700px){.proj-grid{grid-template-columns:1fr}}
      .proj-card{background:var(--panel);border:1px solid var(--line);border-radius:12px;cursor:pointer;overflow:hidden;padding:16px;display:flex;flex-direction:column;gap:10px;transition:border-color .15s}
      .proj-card:hover{border-color:#ffffff33}
      .pc-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
      .proj-date{font-size:12px;color:var(--muted);margin:3px 0 0}
      .proj-desc{font-size:13px;color:var(--muted);line-height:1.6;margin:0;flex:1}
      .proj-stack{font-size:11px;color:var(--accent);margin:0;opacity:.8}
      .badge{font-size:12px;color:#cfe4ff;background:#3a4a62;border:1px solid #4b5d78;border-radius:999px;padding:4px 8px;white-space:nowrap;flex-shrink:0}

      .modal{position:fixed;inset:0;background:rgba(0,0,0,.6);display:grid;place-items:center;z-index:40;padding:20px}
      .modal-body{background:var(--panel);border:1px solid var(--line);border-radius:16px;max-width:980px;width:100%;padding:18px;position:relative}
      .close{position:absolute;top:8px;right:10px;background:#ffffff14;border:1px solid #ffffff22;color:var(--ink);border-radius:999px;width:28px;height:28px}
      .preview{display:grid;gap:12px}
      .mock{background:#fff1;border:1px solid #ffffff22;border-radius:12px;padding:20px}
      .mock-left{display:flex;flex-direction:column;gap:12px}
      .modal-header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
      .modal-desc{font-size:14px;color:var(--ink);line-height:1.7;margin:0}
      .modal-bullets{margin:0;padding-left:18px;display:grid;gap:8px}
      .modal-bullets li{font-size:13px;color:var(--muted);line-height:1.6}

      .sk-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
      @media (max-width:900px){.sk-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media (max-width:600px){.sk-grid{grid-template-columns:1fr}}
      .sk-card{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:14px}
      .sk-illus{height:110px;border-radius:10px;margin-bottom:10px;border:1px solid #ffffff33}

      .contact-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:12px}
      @media (max-width:600px){.contact-grid{grid-template-columns:1fr}}
      .contact-card{display:flex;gap:12px;align-items:center;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:14px}
      .icon{width:44px;height:44px;border-radius:10px;display:grid;place-items:center;background:#ffffff11;border:1px solid #ffffff22}
      .label{font-size:12px;color:var(--muted)}

      .footer{border-top:1px solid var(--line);margin-top:32px}
    `}</style>
  );
}
