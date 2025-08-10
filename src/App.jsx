import { useEffect, useMemo, useState } from "react";
import IMG_6633 from './assets/IMG_6633.jpeg';

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
    { id: 1, title: "Login Page UI Design", category: "UI Design", thumb: "/p1.jpg", desc: "Clean sign-in flow and responsive layout." },
    { id: 2, title: "Landing Page", category: "Web Development", thumb: "/p2.jpg", desc: "Marketing site with A/B-tested hero." },
    { id: 3, title: "Landing Page UI Design", category: "UI Design", thumb: "/p3.jpg", desc: "Design system-driven visuals." },
    { id: 4, title: "Mobile App", category: "Mobile Development", thumb: "/p4.jpg", desc: "Prototype of trip planner app." },
    { id: 5, title: "Dashboard", category: "Web Development", thumb: "/p5.jpg", desc: "Analytics dashboard with charts." },
    { id: 6, title: "Admin Panel", category: "Web Development", thumb: "/p6.jpg", desc: "Role-based access and tables." },
  ]), []);

  const categories = ["All", "UI Design", "Web Development", "Mobile Development"];
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
          <p className="muted">Explore selected work across UI, web, and mobile.</p>
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
                  <div className="thumb" style={{backgroundImage:`url(${p.thumb})`}} />
                  <div className="pc-head">
                    <h3 className="h3">{p.title}</h3>
                    <span className="badge">{p.category}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {openProject && (
            <Modal onClose={() => setOpenProject(null)}>
              <div className="preview">
                <div className="mock">
                  <div className="mock-left">
                    <h3 className="h3">{openProject.title}</h3>
                    <p className="muted">{openProject.desc}</p>
                    <div className="spacer" />
                    <a className="btn" href="#">View Case Study</a>
                  </div>
                  <div className="mock-right" />
                </div>
                <div className="caption">{openProject.title} · <span className="muted">{openProject.category}</span></div>
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
          <p className="muted">Hi, my name is</p>
          <h1 className="display">Ali Altimimi!</h1>
          <p className="lead">I am a softare engineer, a Coffee Connoisseur, member of the SJSU Software Engineering Club </p>
          <a className="link" onClick={onOverview}>Go To Overview →</a>
          <div className="stats">
            <Stat label="Projects" value={stats.projects} />
            <Stat label="Experience" value={`${stats.experienceYears} yrs`} />
            <Stat label="Nationality" value="American 🇺🇸" />
          </div>
        </div>
        <div className="hero-right">
          <div className="tilt-card">
          <div className="tilt-inner">
            <img src={IMG_6633} alt="Headshot Preview" className="tilt-inner" />
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
        <span className="water">Overview</span>
        <h1 className="h1">Overview</h1>
        <p className="muted">My name is Ali Altimimi, I am a software engineer in the most software engeering place in the world</p>
        <h2 className="h2">Education</h2>
        <ul className="timeline">
          <li><Dot /> 2020–2022 Community College </li>
          <li><Dot /> 2023–2026 San Jose State University</li>
        </ul>
        <h2 className="h2">Occupation</h2>
        <ul className="timeline">
          <li><Dot />Welcome Center Mission College </li>
          <li><Dot />Second Harvest of Silicon Valley</li>
          <li><Dot />Abu Barista Coffee Pop up's</li>
        </ul>
      </div>
      <figcaption style={{textAlign: 'center'}}>Photo taken 2023</figcaption>
    </section>
  );
}

function Skills() {
  const items = [
    { title: "Linux Perficianat", body: "Proficient in navigating Linux systems and utilizing the command line interface for various tasks. ", color: "#d6eadf" },
    { title: "Front End Web Development", body: "Proficient in HTML, CSS, and JavaScript. Experienced in building responsive and interactive user interfaces using React.", color: "#f8eacc" },
    { title: "Back End Web Development", body: "Proficient in server-side logic, databases, and APIs using Node.js, Express, and SQL.", color: "#d6eadf" },
    { title: "Programming Languages", body: "Java, C++, C, Python, Git, HTML, CSS, JavaScript, SQL, Express.js, React.js, Node.js", color: "#f8eac7" },
    { title: "Amazon Web Services (AWS)", body: "Familiar with AWS cloud platform, including services like EC2, S3, Lambda, and IAM. Capable of deploying and managing applications on AWS.", color: "#f4e6f6" },
    { title: "Software Development", body: "Involves planning, designing, coding, testing, and deploying software applications.", color: "#e6dcf5" },
  ];

  return (
    <section className="wrap">
      <h1 className="h1">Skills</h1>
      <p className="muted">Some skills that I have.</p>
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
      <h1 className="h1">Contact</h1>
      <p className="muted">You can contact me through the two contacts below.</p>
      <div className="contact-grid">
        <div className="contact-card">
          <div className="icon">📞</div>
          <div>
            <div className="label">Phone</div>
            <a href="tel:+6212348921">+1 (703)-672-0111</a>
          </div>
        </div>
        <div className="contact-card">
          <div className="icon">✉️</div>
          <div>
            <div className="label">Email</div>
            <a href="mailto:support@collosal.tld">aaltimimiwork@protonmail.com</a>
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

      .hero{padding:40px 0;background:radial-gradient(60% 80% at 70% 20%, rgba(122,162,247,.15), transparent 60%)}
      .hero-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:40px}
      @media (max-width:900px){.hero-grid{grid-template-columns:1fr}}
      .display{font-size:48px;line-height:1.05;margin:.1em 0 .2em;font-weight:900}
      .lead{color:var(--muted);max-width:40ch}
      .link{cursor:pointer;text-decoration:underline;text-underline-offset:4px}
      .stats{display:flex;gap:28px;margin-top:28px}
      .stat-label{font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.12em}
      .stat-value{font-size:18px;font-weight:800}
      .hero-right{display:grid;place-items:center}
      .tilt-card{transform:rotate(-4deg);background:#fff1;border-radius:18px;padding:10px;border:1px solid #ffffff22;box-shadow:0 30px 80px rgba(0,0,0,.45)}
      .tilt-inner{width:460px;max-width:100%;height:300px;border-radius:12px;background:linear-gradient(135deg,#5b7cfa22,#7aa2f722);}

      .overview{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;padding-top:24px}
      @media (max-width:900px){.overview{grid-template-columns:1fr}}
      .water{position:absolute;transform:translateY(-20px);font-size:72px;opacity:.06;font-weight:900;letter-spacing:-.04em}
      .h1{font-size:28px;margin:0 0 8px;font-weight:900}
      .h2{font-size:18px;margin:16px 0 8px;font-weight:800}
      .h3{font-size:16px;margin:0;font-weight:800}
      .muted{color:var(--muted)}
      .timeline{list-style:none;padding:0;margin:8px 0 0;display:grid;gap:10px}
      .dot{display:inline-block;width:9px;height:9px;border-radius:99px;background:#bcd;box-shadow:0 0 0 3px #7aa2f722;margin-right:8px}
      .photo-card{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:12px;box-shadow:0 10px 30px rgba(0,0,0,.35);transform:rotate(3deg)}
      .photo-card img{border-radius:10px}
      .photo-card figcaption{text-align:center;margin-top:6px;color:var(--muted);font-size:12px}

      .projects-layout{display:grid;grid-template-columns:260px 1fr;gap:20px;margin-top:16px}
      @media (max-width:900px){.projects-layout{grid-template-columns:1fr}}
      .proj-filter{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:14px}
      .pill{width:100%;text-align:left;background:transparent;color:var(--ink);border:1px solid var(--line);padding:8px 10px;border-radius:999px;margin:6px 0;cursor:pointer}
      .pill.active{background:#ffffff0a;border-color:#ffffff22}
      .cta{margin-top:8px}
      .proj-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
      @media (max-width:900px){.proj-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media (max-width:600px){.proj-grid{grid-template-columns:1fr}}
      .proj-card{background:var(--panel);border:1px solid var(--line);border-radius:12px;cursor:pointer;overflow:hidden}
      .thumb{aspect-ratio:16/10;background:#ffffff0f;background-size:cover;background-position:center}
      .pc-head{display:flex;align-items:center;justify-content:space-between;padding:10px 12px}
      .badge{font-size:12px;color:#cfe4ff;background:#3a4a62;border:1px solid #4b5d78;border-radius:999px;padding:4px 8px}

      .modal{position:fixed;inset:0;background:rgba(0,0,0,.6);display:grid;place-items:center;z-index:40;padding:20px}
      .modal-body{background:var(--panel);border:1px solid var(--line);border-radius:16px;max-width:980px;width:100%;padding:18px;position:relative}
      .close{position:absolute;top:8px;right:10px;background:#ffffff14;border:1px solid #ffffff22;color:var(--ink);border-radius:999px;width:28px;height:28px}
      .preview{display:grid;gap:12px}
      .mock{display:grid;grid-template-columns:1fr 1fr;gap:16px;background:#fff1;border:1px solid #ffffff22;border-radius:12px;padding:14px}
      .mock-left{display:grid;align-content:start;gap:8px}
      .mock-right{min-height:260px;border-radius:10px;background:linear-gradient(135deg,#7aa2f7,#7aa2f733)}
      .caption{text-align:center;color:var(--muted)}

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
