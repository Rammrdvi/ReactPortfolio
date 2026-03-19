import { useState, useEffect, useRef, useCallback } from "react";

/* ─── DATA ─────────────────────────────────────────────────────────── */
const SKILLS_DATA = [
  { cat:"Back-End",    icon:"⚙️", color:"#00e5ff", level:95, items:["PHP","Laravel","CodeIgniter","Node.js","AJAX","RESTful APIs","Core PHP"] },
  { cat:"Front-End",   icon:"🎨", color:"#a78bfa", level:85, items:["JavaScript","Angular","React.js","HTML5","CSS3","Bootstrap","jQuery","Ionic"] },
  { cat:"Databases",   icon:"🗄️", color:"#34d399", level:90, items:["MySQL","MongoDB","Firebase"] },
  { cat:"ERP/Domains", icon:"🏭", color:"#f59e0b", level:92, items:["Mill Production","Plantation Mgmt","Weighbridge","CRM","Maintenance Systems"] },
  { cat:"3D & Mobile", icon:"📱", color:"#f472b6", level:75, items:["Three.js","Babylon.js","Ionic","Angular","Hybrid Apps"] },
  { cat:"Tools",       icon:"🔧", color:"#60a5fa", level:88, items:["JIRA","Git/GitHub","MERN Stack","Offline-Online Sync","Firebase"] },
];

const TECH_BARS = [
  { name:"PHP / Laravel",    level:95, color:"#00e5ff" },
  { name:"MySQL / MongoDB",  level:90, color:"#34d399" },
  { name:"JavaScript",       level:85, color:"#f59e0b" },
  { name:"Angular / React",  level:82, color:"#a78bfa" },
  { name:"Node.js",          level:72, color:"#60a5fa" },
  { name:"ERP Architecture", level:93, color:"#f472b6" },
  { name:"Project Mgmt",     level:95, color:"#00e5ff" },
  { name:"Client Management",level:92, color:"#34d399" },
];

const EXPERIENCE = [
  { role:"Project Manager", company:"Airei India Pvt Ltd", period:"Nov 2024 – Present", flag:"🇮🇳", color:"#00e5ff", tag:"Current Role",
    points:["Leading a 15-member development team across multiple simultaneous projects","Achieved 20% rise in customer satisfaction & 15% reduction in delivery time","Reduced project costs by 10% through JIRA implementation & process optimisation"] },
  { role:"Remote Client Manager – PHC Palm Oil ERP", company:"Airei India Pvt Ltd · Client: PHC Congo 🇨🇬", period:"Nov 2024 – Present", flag:"🇨🇬", color:"#34d399", tag:"Remote – Completed",
    points:["Managed PHC Congo palm oil ERP entirely remotely — never visited on-site","Handled end-to-end client communication & requirement gathering from Congo","Delivered modules: Mill Production, Plantation Management & Weighbridge","Implemented bidirectional offline/online sync for low-connectivity plantation sites","Led Image-to-Text digitisation module to convert handwritten field records","Project successfully completed & handed over to client"] },
  { role:"On-site Project Manager – Minsawi Palm Oil ERP", company:"Airei India Pvt Ltd · Client: Minsawi Malaysia 🇲🇾", period:"Feb 2025 – Present", flag:"🇲🇾", color:"#f59e0b", tag:"On-site · Ongoing",
    points:["Travelled directly to Malaysia for on-site ERP deployment & go-live support","Conducted hands-on training sessions for every end-user at the client site","Managing cross-border coordination between India dev team & Malaysian stakeholders","Providing live technical support, customisation & post-deployment assistance","Project currently ongoing with continuous on-site & remote support"] },
  { role:"PHP Full Stack Developer", company:"Pamz3d Private India Ltd", period:"Mar 2016 – Oct 2024", flag:"🇮🇳", color:"#a78bfa", tag:"8+ Years",
    points:["Built websites, job portals, ERP & CRM systems using PHP, Laravel & MySQL","Developed 3D web applications using Three.js & Babylon.js","Created hybrid mobile apps with Ionic & Angular with real-time Firebase features","Directly handled US client communication for Service Provider & Seeker platform 🇺🇸","Gathered requirements, managed feedback & delivered the project end-to-end for US client","Project successfully completed & signed off by the US client"] },
  { role:"Web Developer", company:"M8it Solutions", period:"Oct 2014 – Mar 2016", flag:"🇮🇳", color:"#f472b6", tag:"1.5 Years",
    points:["Delivered responsive web designs that increased mobile traffic by 30%","Reduced bounce rate by 20% through UI/UX performance improvements"] },
];

const PROJECTS = [
  { name:"PHC Palm Oil ERP – Congo 🇨🇬", status:"Completed", desc:"Remote-managed palm oil ERP for PHC Congo. Covered Mill Production, Plantation Management & Weighbridge with offline/online sync and Image-to-Text digitisation. Client interaction 100% remote.", stack:["PHP","Laravel","MySQL","Angular"], icon:"🌴", color:"#34d399" },
  { name:"Minsawi Palm Oil ERP – Malaysia 🇲🇾", status:"Ongoing", desc:"On-site ERP deployment for Minsawi Malaysia. Travelled directly to Malaysia, conducted user training for all staff, providing continuous on-site & remote support.", stack:["PHP","Laravel","MySQL","Angular"], icon:"🏭", color:"#f59e0b" },
  { name:"ERP – Project & Employee Mgmt", status:"Completed", desc:"Full-featured ERP covering project management, employee tracking, time logging and detailed reporting.", stack:["Laravel","JavaScript","AJAX","MySQL"], icon:"📊", color:"#a78bfa" },
  { name:"Grocery Management System", status:"Completed", desc:"User & admin mobile apps with real-time order notifications and complete order management system.", stack:["Ionic","Angular","PHP","MySQL","Firebase"], icon:"🛒", color:"#f59e0b" },
  { name:"Job Portal", status:"Completed", desc:"Online CV upload, video call interviews, automated scheduling and real-time job alerts.", stack:["Core PHP","MySQL"], icon:"💼", color:"#f472b6" },
  { name:"Service Provider Platform – US 🇺🇸", status:"Completed", desc:"Built for a US client with direct client interaction. Real-time service mapping, request management, push notifications and user ratings. Requirement gathering, development & delivery all handled directly with the US client.", stack:["Ionic","Angular","PHP","MySQL","Firebase"], icon:"📍", color:"#00e5ff" },
];

/* ─── AI CHAT DATA ──────────────────────────────────────────────────── */
const QUICK_QUESTIONS = [
  "Who are you?","What are your top skills?","Tell me about your experience",
  "Which countries have you worked with?","What ERP projects have you done?","Are you available for hire?",
];

const BOT_ANSWERS = {
  "who are you": `Hi! I'm **Ramanarayanan M** 👋\n\nI'm a **PHP Full Stack Developer & Project Manager** with **11+ years** of experience building scalable web apps, ERP systems, and mobile apps.\n\nCurrently working at **Airei India Pvt Ltd** as Project Manager, leading a 15-member team.`,
  "top skills": `My strongest skills are:\n\n⚙️ **Back-End:** PHP, Laravel, CodeIgniter, Node.js\n🎨 **Front-End:** JavaScript, Angular, React.js, Ionic\n🗄️ **Databases:** MySQL, MongoDB, Firebase\n🏭 **ERP:** Mill Production, Weighbridge, Plantation Mgmt\n🔧 **Tools:** JIRA, Git, Three.js, Babylon.js`,
  "experience": `I have **11+ years** of experience:\n\n🇮🇳 **Project Manager** @ Airei India (Nov 2024–Present)\n🇨🇬 **PHC Congo ERP** – Remote client manager, project completed\n🇲🇾 **Minsawi Malaysia ERP** – On-site PM, currently ongoing\n🇺🇸 **US Client** – Service Provider app at Pamz3d\n🇮🇳 **PHP Developer** @ Pamz3d (2016–2024, 8+ years)`,
  "countries": `I've worked with clients across **4 countries** 🌍\n\n🇮🇳 **India** – Current base, leading dev teams\n🇨🇬 **Congo** – PHC Palm Oil ERP (100% remote, completed)\n🇲🇾 **Malaysia** – Minsawi ERP (visited on-site, ongoing)\n🇺🇸 **USA** – Service Provider platform (remote, completed)`,
  "erp": `I've built multiple ERP systems:\n\n🌴 **PHC Palm Oil ERP (Congo)** – Mill, Plantation, Weighbridge + offline sync\n🏭 **Minsawi ERP (Malaysia)** – On-site deployment & training\n📊 **Project & Employee ERP** – Tracking, time logs, reporting\n\nSpecialties: Offline-Online sync, Image-to-Text, Weighbridge software`,
  "available": `Yes, I'm **open to opportunities!** 🚀\n\nI'm available for:\n✅ Full-time roles (PM or Full Stack)\n✅ International projects & remote work\n✅ ERP consultation & development\n✅ Freelance projects\n\n📞 +91-9597896676\n✉️ ramji1604@gmail.com`,
};

function getBotReply(input) {
  const q = input.toLowerCase();
  if (q.includes("who") || q.includes("about you") || q.includes("yourself")) return BOT_ANSWERS["who are you"];
  if (q.includes("skill") || q.includes("tech") || q.includes("know")) return BOT_ANSWERS["top skills"];
  if (q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("career")) return BOT_ANSWERS["experience"];
  if (q.includes("countr") || q.includes("international") || q.includes("malaysia") || q.includes("congo") || q.includes("us ") || q.includes("usa")) return BOT_ANSWERS["countries"];
  if (q.includes("erp") || q.includes("palm") || q.includes("plantation") || q.includes("weighbridge")) return BOT_ANSWERS["erp"];
  if (q.includes("availab") || q.includes("hire") || q.includes("freelance") || q.includes("contact")) return BOT_ANSWERS["available"];
  return `Good question! I'm **Ramanarayanan M**, a PHP Full Stack Developer & PM with 11+ years of experience.\n\nTry asking me about:\n• My skills\n• My experience\n• Countries I've worked with\n• ERP projects\n• Availability for hire`;
}

/* ─── HOOKS ─────────────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useTypingEffect(words, speed = 100, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), pause);
        else setCharIdx(c => c + 1);
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) { setDeleting(false); setWordIdx(w => (w + 1) % words.length); setCharIdx(0); }
        else setCharIdx(c => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

/* ─── PARTICLE CANVAS ───────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth, H = canvas.height = window.innerHeight;
    const pts = Array.from({ length: 80 }, () => ({ x:Math.random()*W, y:Math.random()*H, vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4, r:Math.random()*1.5+.5, a:Math.random()*.5+.1 }));
    let mx = W/2, my = H/2;
    const onM = e => { mx=e.clientX; my=e.clientY; };
    const onR = () => { W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; };
    window.addEventListener("mousemove",onM); window.addEventListener("resize",onR);
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      pts.forEach(p => {
        const dx=mx-p.x, dy=my-p.y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<120){p.vx+=dx*.00015; p.vy+=dy*.00015;}
        p.x+=p.vx; p.y+=p.vy; p.vx*=.99; p.vy*=.99;
        if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(0,229,255,${p.a})`; ctx.fill();
      });
      pts.forEach((a,i)=>pts.slice(i+1).forEach(b=>{const d=Math.hypot(a.x-b.x,a.y-b.y);if(d<100){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(0,229,255,${.12*(1-d/100)})`;ctx.lineWidth=.5;ctx.stroke();}}));
      raf=requestAnimationFrame(draw);
    };
    draw();
    return ()=>{cancelAnimationFrame(raf);window.removeEventListener("mousemove",onM);window.removeEventListener("resize",onR);};
  },[]);
  return <canvas ref={canvasRef} style={{position:"fixed",top:0,left:0,zIndex:0,pointerEvents:"none"}}/>;
}

/* ─── COUNTER ───────────────────────────────────────────────────────── */
function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.5);
  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target); let start = 0;
    const step = Math.ceil(num/40);
    const t = setInterval(() => { start+=step; if(start>=num){setCount(num);clearInterval(t);}else setCount(start); }, 40);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count}</span>;
}

/* ─── SKILL BAR ─────────────────────────────────────────────────────── */
function SkillBar({ name, level, color, delay=0 }) {
  const [ref, inView] = useInView(0.2);
  return (
    <div ref={ref} style={{marginBottom:16}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:7,fontSize:13,fontWeight:600}}>
        <span style={{color:"#c8d0e0"}}>{name}</span>
        <span style={{color,fontWeight:700}}>{level}%</span>
      </div>
      <div style={{height:8,background:"#12182a",borderRadius:99,overflow:"hidden",position:"relative"}}>
        <div style={{position:"absolute",inset:0,background:"repeating-linear-gradient(90deg,transparent,transparent 8px,#ffffff04 8px,#ffffff04 9px)"}}/>
        <div style={{height:"100%",borderRadius:99,background:`linear-gradient(90deg,${color},${color}99)`,width:inView?`${level}%`:"0%",transition:`width 1.4s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,boxShadow:`0 0 14px ${color}70`,position:"relative"}}>
          <div style={{position:"absolute",right:0,top:"50%",transform:"translateY(-50%)",width:12,height:12,borderRadius:"50%",background:color,boxShadow:`0 0 8px ${color}`,opacity:inView?1:0,transition:`opacity 0.3s ${delay+1200}ms`}}/>
        </div>
      </div>
    </div>
  );
}

/* ─── FLOAT CARD ────────────────────────────────────────────────────── */
function FloatCard({ children, delay=0, style={} }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} style={{opacity:inView?1:0,transform:inView?"translateY(0) scale(1)":"translateY(40px) scale(0.96)",transition:`opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,...style}}>
      {children}
    </div>
  );
}

/* ─── TILT CARD ─────────────────────────────────────────────────────── */
function TiltCard({ children, style={}, className="" }) {
  const r = useRef(null);
  const onM = useCallback(e => {
    if(!r.current) return;
    const b=r.current.getBoundingClientRect(), x=(e.clientX-b.left)/b.width-.5, y=(e.clientY-b.top)/b.height-.5;
    r.current.style.transform=`perspective(600px) rotateY(${x*12}deg) rotateX(${-y*12}deg) translateZ(8px)`;
    r.current.style.boxShadow=`${-x*20}px ${y*20}px 40px rgba(0,0,0,0.4),0 0 30px rgba(0,229,255,0.08)`;
  },[]);
  const onL = useCallback(() => {
    if(!r.current) return;
    r.current.style.transform="perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0)";
    r.current.style.boxShadow="";
  },[]);
  return <div ref={r} className={className} onMouseMove={onM} onMouseLeave={onL} style={{transition:"transform 0.15s ease,box-shadow 0.15s ease",...style}}>{children}</div>;
}

/* ─── MAG BUTTON ────────────────────────────────────────────────────── */
function MagBtn({ children, onClick, className, href }) {
  const b = useRef(null);
  const onM = e => { if(!b.current)return; const r=b.current.getBoundingClientRect(); b.current.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.35}px,${(e.clientY-r.top-r.height/2)*.35}px)`; };
  const onL = () => { if(b.current) b.current.style.transform="translate(0,0)"; };
  if(href) return <a ref={b} href={href} className={className} onMouseMove={onM} onMouseLeave={onL} style={{transition:"transform 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}>{children}</a>;
  return <button ref={b} className={className} onClick={onClick} onMouseMove={onM} onMouseLeave={onL} style={{transition:"transform 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}>{children}</button>;
}

/* ─── CURSOR ────────────────────────────────────────────────────────── */
function CustomCursor() {
  const dot=useRef(null), ring=useRef(null);
  useEffect(() => {
    let mx=0,my=0,rx=0,ry=0;
    const onM=e=>{mx=e.clientX;my=e.clientY;};
    window.addEventListener("mousemove",onM);
    let raf;
    const anim=()=>{
      rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
      if(dot.current){dot.current.style.left=mx+"px";dot.current.style.top=my+"px";}
      if(ring.current){ring.current.style.left=rx+"px";ring.current.style.top=ry+"px";}
      raf=requestAnimationFrame(anim);
    };
    anim();
    return ()=>{cancelAnimationFrame(raf);window.removeEventListener("mousemove",onM);};
  },[]);
  return (<>
    <div ref={dot} style={{position:"fixed",width:8,height:8,borderRadius:"50%",background:"#00e5ff",pointerEvents:"none",zIndex:9999,transform:"translate(-50%,-50%)"}}/>
    <div ref={ring} style={{position:"fixed",width:36,height:36,borderRadius:"50%",border:"1.5px solid #00e5ff80",pointerEvents:"none",zIndex:9998,transform:"translate(-50%,-50%)",transition:"transform 0.4s cubic-bezier(0.34,1.56,0.64,1)"}}/>
  </>);
}

/* ─── GLITCH ────────────────────────────────────────────────────────── */
function GlitchText({ text }) {
  return <span className="glitch" data-text={text} style={{position:"relative",display:"inline-block"}}>{text}</span>;
}

/* ─── SCROLL PROGRESS ───────────────────────────────────────────────── */
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn=()=>{const el=document.documentElement;setP((el.scrollTop/(el.scrollHeight-el.clientHeight))*100);};
    window.addEventListener("scroll",fn); return ()=>window.removeEventListener("scroll",fn);
  },[]);
  return <div style={{position:"fixed",top:0,left:0,right:0,height:3,zIndex:200,background:"#1a2035"}}><div style={{height:"100%",width:`${p}%`,background:"linear-gradient(90deg,#00e5ff,#a78bfa)",transition:"width 0.1s",boxShadow:"0 0 10px #00e5ff"}}/></div>;
}

/* ─── SECTION ───────────────────────────────────────────────────────── */
function Section({ id, children, dark=false }) {
  const [ref, inView] = useInView(0.05);
  return (
    <section id={id} ref={ref} style={{padding:"100px 40px",background:dark?"#0a0f1a":"#060b14",position:"relative",opacity:inView?1:0,transform:inView?"translateY(0)":"translateY(30px)",transition:"opacity 0.8s ease,transform 0.8s ease"}}>
      {children}
    </section>
  );
}

/* ─── CHAT BOT ───────────────────────────────────────────────────────── */
function formatMsg(text) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <span key={i}>
        {parts.map((p, j) => j % 2 === 1 ? <strong key={j} style={{color:"#00e5ff",fontWeight:700}}>{p}</strong> : p)}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    );
  });
}

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from:"bot", text:"Hi! 👋 I'm Ram's AI assistant.\n\nAsk me anything about **Ramanarayanan M** — his skills, experience, projects, or availability!", ts: Date.now() }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef(null);

  useEffect(() => { if(open){ setUnread(0); setTimeout(()=>bottomRef.current?.scrollIntoView({behavior:"smooth"}),100); } }, [open, messages]);

  const send = useCallback((text) => {
    const q = text || input.trim();
    if (!q) return;
    setInput("");
    setMessages(m => [...m, { from:"user", text:q, ts:Date.now() }]);
    setTyping(true);
    setTimeout(() => {
      setMessages(m => [...m, { from:"bot", text: getBotReply(q), ts:Date.now() }]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  }, [input]);

  const onKey = e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };

  return (
    <>
      {/* Bubble */}
      <div onClick={() => setOpen(o => !o)} style={{position:"fixed",bottom:28,right:28,zIndex:500,width:58,height:58,borderRadius:"50%",background:"linear-gradient(135deg,#00e5ff,#0072ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,cursor:"none",boxShadow:"0 0 0 0 #00e5ff40",animation:"chat-pulse 2.5s infinite"}}>
        {open ? "✕" : "💬"}
        {!open && unread > 0 && <div style={{position:"absolute",top:-4,right:-4,width:18,height:18,borderRadius:"50%",background:"#f472b6",fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",border:"2px solid #060b14"}}>{unread}</div>}
      </div>

      {/* Window */}
      {open && (
        <div style={{position:"fixed",bottom:100,right:28,zIndex:499,width:360,maxHeight:520,display:"flex",flexDirection:"column",background:"#0a0f1a",border:"1px solid #00e5ff30",borderRadius:20,boxShadow:"0 24px 80px rgba(0,0,0,0.7),0 0 40px #00e5ff15",overflow:"hidden",animation:"chat-slide-in 0.35s cubic-bezier(0.34,1.56,0.64,1)"}}>
          {/* Header */}
          <div style={{background:"linear-gradient(135deg,#00e5ff18,#0072ff18)",borderBottom:"1px solid #1a2035",padding:"16px 20px",display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:40,height:40,borderRadius:"50%",overflow:"hidden",border:"2px solid #00e5ff40",flexShrink:0}}>
              <img src="/profile.jpg" alt="Ram" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}/>
            </div>
            <div>
              <div style={{fontWeight:800,fontSize:14,color:"#e8eaf0"}}>Ask About Ram</div>
              <div style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"#34d399"}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:"#34d399",display:"inline-block",animation:"blink 1.5s infinite"}}/>
                AI Assistant · Always Online
              </div>
            </div>
            <div style={{marginLeft:"auto",fontSize:11,color:"#636c7e"}}>11+ yrs exp</div>
          </div>

          {/* Messages */}
          <div style={{flex:1,overflowY:"auto",padding:"16px 16px 8px",display:"flex",flexDirection:"column",gap:10}}>
            {messages.map((msg, i) => (
              <div key={i} style={{display:"flex",justifyContent:msg.from==="user"?"flex-end":"flex-start",gap:8,alignItems:"flex-end"}}>
                {msg.from==="bot" && <div style={{width:28,height:28,borderRadius:"50%",overflow:"hidden",border:"1px solid #00e5ff30",flexShrink:0}}><img src="/profile.jpg" alt="" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}/></div>}
                <div style={{maxWidth:"78%",background:msg.from==="user"?"linear-gradient(135deg,#00e5ff,#0072ff)":"#141b2e",color:msg.from==="user"?"#000":"#c8d0e0",borderRadius:msg.from==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",padding:"10px 14px",fontSize:13,lineHeight:1.65,fontWeight:msg.from==="user"?600:400,border:msg.from==="bot"?"1px solid #1a2035":"none"}}>
                  {formatMsg(msg.text)}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{display:"flex",gap:8,alignItems:"flex-end"}}>
                <div style={{width:28,height:28,borderRadius:"50%",overflow:"hidden",border:"1px solid #00e5ff30"}}><img src="/profile.jpg" alt="" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}/></div>
                <div style={{background:"#141b2e",border:"1px solid #1a2035",borderRadius:"16px 16px 16px 4px",padding:"12px 16px",display:"flex",gap:5}}>
                  {[0,1,2].map(i=><span key={i} style={{width:6,height:6,borderRadius:"50%",background:"#00e5ff",display:"inline-block",animation:`typing-dot 1.2s ${i*0.2}s infinite`}}/>)}
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Quick questions */}
          <div style={{padding:"8px 16px",borderTop:"1px solid #1a2035",display:"flex",gap:6,flexWrap:"wrap"}}>
            {QUICK_QUESTIONS.slice(0,3).map(q => (
              <button key={q} onClick={()=>send(q)} style={{background:"#141b2e",border:"1px solid #1a2035",color:"#8892a4",borderRadius:100,padding:"4px 10px",fontSize:11,cursor:"none",fontFamily:"inherit",transition:"all 0.2s",whiteSpace:"nowrap"}} className="chip-btn">{q}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{padding:"12px 16px",borderTop:"1px solid #1a2035",display:"flex",gap:10,alignItems:"center"}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKey} placeholder="Ask me anything..." style={{flex:1,background:"#141b2e",border:"1px solid #1a2035",borderRadius:10,padding:"10px 14px",color:"#e8eaf0",fontFamily:"inherit",fontSize:13,outline:"none",transition:"border-color 0.2s"}} className="chat-input"/>
            <button onClick={()=>send()} style={{width:38,height:38,borderRadius:10,background:"linear-gradient(135deg,#00e5ff,#0072ff)",border:"none",color:"#000",fontSize:16,cursor:"none",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800}}>→</button>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── MAIN ───────────────────────────────────────────────────────────── */
const NAV = ["About","Skills","Experience","Projects","Contact"];

export default function Portfolio() {
  const [active, setActive] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSkillCat, setActiveSkillCat] = useState(0);
  const typedRole = useTypingEffect(["PHP Full Stack Developer","Project Manager","ERP Architect","International Tech Lead","MERN Stack Developer"]);
  const scrollTo = id => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); };

  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) setActive(e.target.id); }), {threshold:0.3});
    NAV.forEach(n => { const el=document.getElementById(n); if(el) obs.observe(el); });
    return () => obs.disconnect();
  },[]);

  const activeSk = SKILLS_DATA[activeSkillCat];

  return (
    <div style={{fontFamily:"'Sora',sans-serif",background:"#060b14",color:"#e8eaf0",minHeight:"100vh",overflowX:"hidden",cursor:"none"}}>
      <style>{CSS}</style>
      <CustomCursor />
      <ParticleCanvas />
      <ScrollProgress />
      <ChatBot />

      {/* NAV */}
      <nav style={{position:"fixed",top:3,left:0,right:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 48px",background:"rgba(6,11,20,0.88)",backdropFilter:"blur(20px)",borderBottom:"1px solid #1a2035"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:40,height:40,borderRadius:12,background:"linear-gradient(135deg,#00e5ff,#0072ff)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:18,color:"#000",boxShadow:"0 0 20px #00e5ff40"}}>R</div>
          <span style={{fontWeight:800,fontSize:17}}>Ram<span style={{color:"#00e5ff"}}>.dev</span></span>
        </div>
        <div className="nav-links">
          {NAV.map(n => <button key={n} onClick={()=>scrollTo(n)} className={`nav-btn${active===n?" nav-active":""}`}>{n}</button>)}
        </div>
        <a href="mailto:ramji1604@gmail.com" className="hire-btn">Hire Me →</a>
        <button className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?"✕":"☰"}</button>
        {menuOpen && (
          <div style={{position:"absolute",top:"100%",left:0,right:0,background:"#0a0f1a",borderBottom:"1px solid #1a2035",display:"flex",flexDirection:"column"}}>
            {NAV.map(n=><button key={n} onClick={()=>scrollTo(n)} style={{background:"none",border:"none",color:"#8892a4",fontFamily:"inherit",fontSize:16,padding:"16px 48px",textAlign:"left",cursor:"none",fontWeight:500}}>{n}</button>)}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="About" style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",padding:"140px 48px 80px",overflow:"hidden"}}>
        <div className="ring ring1"/><div className="ring ring2"/><div className="ring ring3"/>
        <div style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",gap:72,flexWrap:"wrap",justifyContent:"center",maxWidth:1100,width:"100%"}}>
          <div style={{position:"relative",flexShrink:0}}>
            <div className="orbit-ring"/>
            <div style={{width:280,height:280,borderRadius:"50%",padding:4,background:"linear-gradient(135deg,#00e5ff,#0072ff,#a78bfa)",boxShadow:"0 0 60px #00e5ff30"}}>
              <img src="/profile.jpg" alt="Ramanarayanan M" style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover",objectPosition:"center top",display:"block",border:"4px solid #060b14"}}/>
            </div>
            <div className="float-badge badge-php">PHP Expert</div>
            <div className="float-badge badge-erp">ERP Architect</div>
            <div className="float-badge badge-pm">🇲🇾 On-site PM</div>
            <div style={{position:"absolute",bottom:16,left:"50%",transform:"translateX(-50%)",background:"#0a0f1a",border:"1px solid #00e5ff40",color:"#00e5ff",borderRadius:100,padding:"6px 18px",fontSize:12,fontWeight:600,whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:6,boxShadow:"0 0 20px #00e5ff20"}}>
              <span style={{width:8,height:8,borderRadius:"50%",background:"#00ff88",display:"inline-block",animation:"blink 1.5s infinite"}}/>Available for Work
            </div>
          </div>
          <div style={{flex:1,minWidth:300,maxWidth:580}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"#00e5ff0f",border:"1px solid #00e5ff25",color:"#00e5ff",borderRadius:100,padding:"6px 18px",fontSize:12,fontWeight:700,marginBottom:24,textTransform:"uppercase",letterSpacing:2}}>11+ Years Experience</div>
            <h1 style={{fontSize:"clamp(34px,6vw,68px)",fontWeight:900,letterSpacing:"-3px",margin:"0 0 8px",lineHeight:1.0}}>
              <GlitchText text="Ramanarayanan"/><span style={{color:"#00e5ff"}}> M</span>
            </h1>
            <div style={{fontSize:"clamp(16px,2.5vw,22px)",color:"#8892a4",marginBottom:8,minHeight:32,fontWeight:500}}>
              <span style={{color:"#a78bfa"}}>{typedRole}</span><span className="cursor-blink">|</span>
            </div>
            <p style={{fontSize:15.5,color:"#5a6375",lineHeight:1.85,marginBottom:36}}>
              Building scalable ERP systems & web applications across borders. On-site deployments in <span style={{color:"#00e5ff",fontWeight:600}}>🇲🇾 Malaysia</span> & remote delivery to <span style={{color:"#34d399",fontWeight:600}}>🇨🇬 Congo</span> & <span style={{color:"#60a5fa",fontWeight:600}}>🇺🇸 USA</span>. Leading a 15-member team.
            </p>
            <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:52}}>
              <MagBtn className="btn-primary" onClick={()=>scrollTo("Projects")}>View Projects ↗</MagBtn>
              <MagBtn className="btn-outline" onClick={()=>scrollTo("Contact")}>Let's Talk →</MagBtn>
              <MagBtn className="btn-ghost" href="mailto:ramji1604@gmail.com">Hire Me</MagBtn>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:0,borderTop:"1px solid #1a2035",paddingTop:28}}>
              {[["11","+ Yrs","#00e5ff"],["15","Team","#a78bfa"],["4","Countries","#34d399"],["20","% Saved","#f59e0b"]].map(([v,l,c])=>(
                <div key={l} style={{paddingRight:28,marginRight:28,borderRight:"1px solid #1a2035"}}>
                  <div style={{fontSize:32,fontWeight:900,color:c,letterSpacing:"-2px",lineHeight:1}}><AnimatedCounter target={v}/>{l.includes("+")?"+ ":""}{l.replace("+","").trim()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:6,color:"#2a3140",fontSize:11,letterSpacing:3,textTransform:"uppercase"}}>
          <span>scroll</span><div className="scroll-arrow"/>
        </div>
      </section>

      {/* SKILLS - COMPLETELY REBUILT */}
      <Section id="Skills" dark>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <FloatCard>
            <div style={{marginBottom:56}}>
              <h2 style={{fontSize:"clamp(26px,5vw,50px)",fontWeight:900,letterSpacing:"-2px",marginBottom:8}}>
                Technical <span style={{color:"#00e5ff"}}>Skills</span>
              </h2>
              <p style={{color:"#636c7e",fontSize:15}}>11+ years across full-stack, ERP, mobile & 3D web development</p>
            </div>
          </FloatCard>

          {/* ── Skill Category Tabs + Animated Tag Cloud ── */}
          <FloatCard delay={100}>
            <div style={{background:"#0a0f1a",border:"1px solid #1a2035",borderRadius:20,padding:"32px",marginBottom:32}}>
              {/* Tabs */}
              <div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:28}}>
                {SKILLS_DATA.map((sk,i)=>(
                  <button key={sk.cat} onClick={()=>setActiveSkillCat(i)}
                    style={{background:activeSkillCat===i?`${sk.color}20`:"#12182a",border:`1px solid ${activeSkillCat===i?sk.color:"#1a2035"}`,color:activeSkillCat===i?sk.color:"#636c7e",borderRadius:100,padding:"8px 18px",fontSize:13,fontWeight:700,cursor:"none",fontFamily:"inherit",transition:"all 0.25s",display:"flex",alignItems:"center",gap:6,boxShadow:activeSkillCat===i?`0 0 18px ${sk.color}30`:"none"}}>
                    <span>{sk.icon}</span>{sk.cat}
                    {activeSkillCat===i && <span style={{background:sk.color,color:"#000",borderRadius:100,padding:"1px 8px",fontSize:10,fontWeight:800,marginLeft:2}}>{sk.level}%</span>}
                  </button>
                ))}
              </div>

              {/* Active category detail */}
              <div style={{display:"flex",gap:32,flexWrap:"wrap",alignItems:"flex-start"}}>
                {/* Tags with pop animation */}
                <div style={{flex:1,minWidth:220}}>
                  <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:2,color:activeSk.color,marginBottom:14,fontWeight:700}}>Technologies</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                    {activeSk.items.map((item,i)=>(
                      <span key={item} style={{background:`${activeSk.color}15`,border:`1px solid ${activeSk.color}30`,color:activeSk.color,borderRadius:8,padding:"7px 14px",fontSize:13,fontWeight:600,animation:`tag-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i*60}ms both`,display:"inline-block"}}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Proficiency arc */}
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                  <div style={{position:"relative",width:110,height:110}}>
                    <svg width="110" height="110" style={{transform:"rotate(-90deg)"}}>
                      <circle cx="55" cy="55" r="46" fill="none" stroke="#12182a" strokeWidth="8"/>
                      <circle cx="55" cy="55" r="46" fill="none" stroke={activeSk.color} strokeWidth="8"
                        strokeDasharray={`${2*Math.PI*46*activeSk.level/100} ${2*Math.PI*46}`}
                        strokeLinecap="round" style={{transition:"stroke-dasharray 1s ease",filter:`drop-shadow(0 0 6px ${activeSk.color})`}}/>
                    </svg>
                    <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                      <span style={{fontSize:22,fontWeight:900,color:activeSk.color,letterSpacing:"-1px"}}>{activeSk.level}%</span>
                      <span style={{fontSize:9,color:"#636c7e",textTransform:"uppercase",letterSpacing:1}}>Proficiency</span>
                    </div>
                  </div>
                  <div style={{fontSize:12,color:"#636c7e",textAlign:"center",fontWeight:600}}>{activeSk.icon} {activeSk.cat}</div>
                </div>
              </div>
            </div>
          </FloatCard>

          {/* ── Skill Progress Bars ── */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:28,marginBottom:32}}>
            <FloatCard delay={150}>
              <div style={{background:"#0a0f1a",border:"1px solid #1a2035",borderRadius:16,padding:"24px 24px"}}>
                <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:2,color:"#00e5ff",marginBottom:20,fontWeight:700}}>⚙️ Core Proficiency</div>
                {TECH_BARS.slice(0,4).map((b,i)=><SkillBar key={b.name} name={b.name} level={b.level} color={b.color} delay={i*120}/>)}
              </div>
            </FloatCard>
            <FloatCard delay={220}>
              <div style={{background:"#0a0f1a",border:"1px solid #1a2035",borderRadius:16,padding:"24px 24px"}}>
                <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:2,color:"#a78bfa",marginBottom:20,fontWeight:700}}>🚀 Leadership & Delivery</div>
                {TECH_BARS.slice(4).map((b,i)=><SkillBar key={b.name} name={b.name} level={b.level} color={b.color} delay={i*120}/>)}
              </div>
            </FloatCard>
          </div>

          {/* ── Country Experience Tiles ── */}
          <FloatCard delay={300}>
            <div style={{background:"#0a0f1a",border:"1px solid #1a2035",borderRadius:16,padding:"24px 28px"}}>
              <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:2,color:"#34d399",marginBottom:20,fontWeight:700}}>🌍 International Client Experience</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14}}>
                {[
                  {flag:"🇮🇳",country:"India",role:"Team Lead & PM",color:"#00e5ff",tag:"Base"},
                  {flag:"🇲🇾",country:"Malaysia",role:"On-site PM · Minsawi ERP",color:"#f59e0b",tag:"On-site"},
                  {flag:"🇨🇬",country:"Congo",role:"Remote PM · PHC ERP",color:"#34d399",tag:"Remote"},
                  {flag:"🇺🇸",country:"USA",role:"Remote Dev · Service App",color:"#60a5fa",tag:"Remote"},
                ].map(c=>(
                  <div key={c.country} style={{background:`${c.color}08`,border:`1px solid ${c.color}25`,borderRadius:12,padding:"16px",display:"flex",flexDirection:"column",gap:6,transition:"all 0.25s"}} className="country-tile">
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontSize:26}}>{c.flag}</span>
                      <span style={{background:`${c.color}20`,color:c.color,border:`1px solid ${c.color}30`,borderRadius:100,padding:"2px 10px",fontSize:10,fontWeight:700}}>{c.tag}</span>
                    </div>
                    <div style={{fontSize:14,fontWeight:800,color:"#e8eaf0"}}>{c.country}</div>
                    <div style={{fontSize:12,color:"#636c7e",lineHeight:1.5}}>{c.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </FloatCard>
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="Experience">
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <FloatCard>
            <div style={{marginBottom:56}}>
              <h2 style={{fontSize:"clamp(26px,5vw,50px)",fontWeight:900,letterSpacing:"-2px",marginBottom:8}}>Work <span style={{color:"#a78bfa"}}>Experience</span></h2>
              <p style={{color:"#636c7e",fontSize:15}}>From developer to international project manager</p>
            </div>
          </FloatCard>
          <div style={{position:"relative",paddingLeft:40}}>
            <div style={{position:"absolute",left:0,top:0,bottom:0,width:2,background:"linear-gradient(180deg,#00e5ff,#a78bfa,#34d399,#f59e0b,#f472b6)"}}/>
            {EXPERIENCE.map((exp,i)=>(
              <FloatCard key={i} delay={i*100}>
                <div style={{position:"relative",marginBottom:28}}>
                  <div style={{position:"absolute",left:-47,top:24,width:14,height:14,borderRadius:"50%",background:exp.color,boxShadow:`0 0 0 4px ${exp.color}30,0 0 20px ${exp.color}60`}}/>
                  <TiltCard className="tilt-card" style={{background:"#0a0f1a",border:`1px solid ${exp.color}20`,borderRadius:18,padding:"26px 28px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:16}}>
                      <div style={{flex:1,minWidth:200}}>
                        <h3 style={{fontSize:16,fontWeight:800,marginBottom:6,lineHeight:1.35,color:"#e8eaf0"}}>{exp.flag} {exp.role}</h3>
                        <p style={{color:exp.color,fontSize:13,fontWeight:600}}>{exp.company}</p>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6,flexShrink:0}}>
                        <span style={{background:`${exp.color}15`,border:`1px solid ${exp.color}30`,color:exp.color,borderRadius:100,padding:"4px 14px",fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>{exp.period}</span>
                        <span style={{background:"#1a2035",border:"1px solid #2a3550",color:"#8892a4",borderRadius:100,padding:"3px 12px",fontSize:10,fontWeight:600,whiteSpace:"nowrap"}}>{exp.tag}</span>
                      </div>
                    </div>
                    <ul style={{listStyle:"none",padding:0,margin:0}}>
                      {exp.points.map((p,j)=>(
                        <li key={j} style={{color:"#8892a4",fontSize:13.5,lineHeight:1.75,marginBottom:5,display:"flex",gap:10,alignItems:"flex-start"}}>
                          <span style={{color:exp.color,marginTop:2,flexShrink:0}}>▸</span><span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </div>
              </FloatCard>
            ))}
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="Projects" dark>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <FloatCard>
            <div style={{marginBottom:56}}>
              <h2 style={{fontSize:"clamp(26px,5vw,50px)",fontWeight:900,letterSpacing:"-2px",marginBottom:8}}>Key <span style={{color:"#34d399"}}>Projects</span></h2>
              <p style={{color:"#636c7e",fontSize:15}}>Real-world solutions across industries and borders</p>
            </div>
          </FloatCard>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:24}}>
            {PROJECTS.map((p,i)=>(
              <FloatCard key={i} delay={i*80}>
                <TiltCard className="tilt-card proj-card" style={{background:"#0a0f1a",border:`1px solid ${p.color}20`,borderRadius:18,padding:"28px 24px",height:"100%",display:"flex",flexDirection:"column"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                    <div style={{fontSize:32,filter:`drop-shadow(0 0 12px ${p.color}80)`}}>{p.icon}</div>
                    <span style={{borderRadius:100,padding:"4px 14px",fontSize:11,fontWeight:700,background:p.status==="Ongoing"?"#00ff8818":"#4fc3f715",color:p.status==="Ongoing"?"#00ff88":"#4fc3f7",border:`1px solid ${p.status==="Ongoing"?"#00ff8835":"#4fc3f730"}`}}>
                      {p.status==="Ongoing"?"● Ongoing":"✓ Completed"}
                    </span>
                  </div>
                  <h3 style={{fontSize:16,fontWeight:800,marginBottom:10,lineHeight:1.35,color:"#e8eaf0"}}>{p.name}</h3>
                  <p style={{color:"#5a6375",fontSize:13.5,lineHeight:1.75,marginBottom:18,flex:1}}>{p.desc}</p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {p.stack.map(t=><span key={t} style={{background:`${p.color}12`,border:`1px solid ${p.color}25`,borderRadius:5,padding:"3px 10px",fontSize:11,color:`${p.color}cc`,fontWeight:600}}>{t}</span>)}
                  </div>
                </TiltCard>
              </FloatCard>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="Contact">
        <div style={{maxWidth:700,margin:"0 auto",textAlign:"center"}}>
          <FloatCard>
            <div style={{marginBottom:48}}>
              <h2 style={{fontSize:"clamp(26px,5vw,50px)",fontWeight:900,letterSpacing:"-2px",marginBottom:8}}>Let's <span style={{color:"#f59e0b"}}>Connect</span></h2>
              <p style={{color:"#636c7e",fontSize:15}}>Available for freelance, full-time & international projects</p>
            </div>
          </FloatCard>
          <FloatCard delay={200}>
            <TiltCard className="tilt-card" style={{background:"#0a0f1a",border:"1px solid #1a2035",borderRadius:24,padding:"40px"}}>
              {[["📞","Phone","+91-9597896676","tel:+919597896676","#00e5ff"],["✉️","Email","ramji1604@gmail.com","mailto:ramji1604@gmail.com","#a78bfa"],["🐙","GitHub","github.com/Rammrdvi","https://github.com/Rammrdvi","#34d399"],["📍","Location","Coimbatore, India",null,"#f59e0b"],["🌐","Languages","Tamil, English",null,"#f472b6"]].map(([icon,label,val,href,color])=>(
                <div key={label} style={{display:"flex",alignItems:"center",gap:20,marginBottom:22,textAlign:"left"}} className="contact-row">
                  <div style={{width:50,height:50,background:`${color}12`,border:`1px solid ${color}25`,borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0,transition:"all 0.3s"}} className="contact-icon">{icon}</div>
                  <div>
                    <div style={{fontSize:11,color:"#636c7e",textTransform:"uppercase",letterSpacing:1.5,marginBottom:3,fontWeight:600}}>{label}</div>
                    {href?<a href={href} style={{color,fontWeight:700,fontSize:15,textDecoration:"none"}} className="contact-link">{val}</a>:<div style={{color,fontWeight:700,fontSize:15}}>{val}</div>}
                  </div>
                </div>
              ))}
              <div style={{borderTop:"1px solid #1a2035",paddingTop:28,display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
                <MagBtn className="btn-primary" href="mailto:ramji1604@gmail.com">Send Email ✉️</MagBtn>
                <MagBtn className="btn-outline" onClick={()=>window.open("https://github.com/Rammrdvi")}>View GitHub →</MagBtn>
              </div>
            </TiltCard>
          </FloatCard>
        </div>
      </Section>

      <footer style={{background:"#040710",borderTop:"1px solid #1a2035",padding:"28px 48px",textAlign:"center",color:"#2a3140",fontSize:13}}>
        <p style={{marginBottom:4}}>© 2025 Ramanarayanan M · PHP Full Stack Developer & Project Manager</p>
        <p style={{color:"#1a2035",fontSize:11}}>Built with React 18 · Coimbatore, India 🇮🇳</p>
      </footer>
    </div>
  );
}

/* ─── CSS ────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{cursor:none;}
a,button{cursor:none;}

.nav-links{display:flex;gap:2px;}
.nav-btn{background:none;border:none;color:#8892a4;font-family:inherit;font-size:14px;padding:8px 16px;border-radius:8px;font-weight:500;transition:all 0.2s;}
.nav-btn:hover{color:#e8eaf0;background:#ffffff08;}
.nav-active{color:#00e5ff!important;background:#00e5ff12!important;}
.hire-btn{background:linear-gradient(135deg,#00e5ff,#0072ff);color:#000;border:none;padding:10px 22px;border-radius:9px;font-family:inherit;font-weight:700;font-size:13px;text-decoration:none;transition:all 0.3s;box-shadow:0 0 20px #00e5ff30;}
.hire-btn:hover{box-shadow:0 0 32px #00e5ff60;transform:translateY(-2px);}
.menu-toggle{display:none;background:none;border:none;color:#e8eaf0;font-size:22px;}

.btn-primary{background:linear-gradient(135deg,#00e5ff,#0072ff);color:#000;border:none;padding:13px 28px;border-radius:11px;font-family:inherit;font-weight:800;font-size:14px;box-shadow:0 0 28px #00e5ff35;transition:all 0.3s;text-decoration:none;display:inline-block;}
.btn-primary:hover{box-shadow:0 0 44px #00e5ff60;transform:translateY(-3px);}
.btn-outline{background:transparent;color:#e8eaf0;border:1px solid #2a3550;padding:13px 28px;border-radius:11px;font-family:inherit;font-weight:700;font-size:14px;transition:all 0.3s;}
.btn-outline:hover{border-color:#00e5ff;color:#00e5ff;background:#00e5ff08;}
.btn-ghost{background:transparent;color:#636c7e;border:1px dashed #2a3550;padding:13px 22px;border-radius:11px;font-family:inherit;font-weight:600;font-size:14px;transition:all 0.3s;text-decoration:none;display:inline-block;}
.btn-ghost:hover{color:#e8eaf0;border-color:#636c7e;}

.glitch{position:relative;}
.glitch::before,.glitch::after{content:attr(data-text);position:absolute;top:0;left:0;width:100%;height:100%;}
.glitch::before{color:#00e5ff;animation:glitch1 4s infinite;clip-path:polygon(0 0,100% 0,100% 35%,0 35%);}
.glitch::after{color:#a78bfa;animation:glitch2 4s infinite;clip-path:polygon(0 65%,100% 65%,100% 100%,0 100%);}
@keyframes glitch1{0%,90%,100%{transform:none;opacity:0;}92%{transform:translate(-2px,1px);opacity:0.8;}95%{transform:translate(2px,-1px);opacity:0.8;}97%{transform:none;opacity:0;}}
@keyframes glitch2{0%,88%,100%{transform:none;opacity:0;}90%{transform:translate(2px,2px);opacity:0.8;}93%{transform:translate(-2px,-1px);opacity:0.8;}96%{transform:none;opacity:0;}}

.cursor-blink{animation:blink 1s infinite;color:#00e5ff;}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}

.orbit-ring{position:absolute;inset:-24px;border-radius:50%;border:1.5px solid #00e5ff20;animation:orbit-spin 12s linear infinite;}
.orbit-ring::after{content:'';position:absolute;width:10px;height:10px;border-radius:50%;background:#00e5ff;top:6px;left:50%;transform:translateX(-50%);box-shadow:0 0 12px #00e5ff;}
@keyframes orbit-spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}

.ring{position:absolute;border-radius:50%;border:1px solid;pointer-events:none;animation:ring-pulse 6s ease-in-out infinite;}
.ring1{width:600px;height:600px;border-color:#00e5ff08;top:50%;left:50%;transform:translate(-50%,-50%);animation-delay:0s;}
.ring2{width:900px;height:900px;border-color:#a78bfa06;top:50%;left:50%;transform:translate(-50%,-50%);animation-delay:2s;}
.ring3{width:1200px;height:1200px;border-color:#34d39904;top:50%;left:50%;transform:translate(-50%,-50%);animation-delay:4s;}
@keyframes ring-pulse{0%,100%{opacity:0.3;transform:translate(-50%,-50%) scale(1);}50%{opacity:1;transform:translate(-50%,-50%) scale(1.03);}}

.float-badge{position:absolute;background:#0a0f1a;border:1px solid #1a2035;color:#e8eaf0;border-radius:100px;padding:6px 14px;font-size:11px;font-weight:700;white-space:nowrap;box-shadow:0 8px 24px rgba(0,0,0,0.4);}
.badge-php{top:-20px;right:-30px;border-color:#00e5ff30;color:#00e5ff;animation:float1 3s ease-in-out infinite;}
.badge-erp{bottom:60px;right:-50px;border-color:#a78bfa30;color:#a78bfa;animation:float2 3.5s ease-in-out infinite;}
.badge-pm{left:-40px;top:50%;border-color:#34d39930;color:#34d399;animation:float1 4s ease-in-out infinite;}
@keyframes float1{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
@keyframes float2{0%,100%{transform:translateY(0);}50%{transform:translateY(10px);}}

.scroll-arrow{width:18px;height:18px;border-right:2px solid #2a3140;border-bottom:2px solid #2a3140;transform:rotate(45deg);animation:bounce-arrow 1.5s ease-in-out infinite;}
@keyframes bounce-arrow{0%,100%{transform:rotate(45deg) translateY(0);}50%{transform:rotate(45deg) translateY(5px);}}

@keyframes tag-pop{from{opacity:0;transform:scale(0.6) translateY(8px);}to{opacity:1;transform:scale(1) translateY(0);}}
@keyframes typing-dot{0%,80%,100%{transform:scale(0.8);opacity:0.4;}40%{transform:scale(1.1);opacity:1;}}
@keyframes chat-pulse{0%,100%{box-shadow:0 0 0 0 #00e5ff40;}70%{box-shadow:0 0 0 12px transparent;}}
@keyframes chat-slide-in{from{opacity:0;transform:translateY(20px) scale(0.95);}to{opacity:1;transform:translateY(0) scale(1);}}

.country-tile:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,0.3);}
.contact-row:hover .contact-icon{transform:scale(1.15) rotate(-5deg);}
.contact-link:hover{opacity:0.75;}
.chip-btn:hover{background:#1a2035!important;border-color:#2a3550!important;color:#e8eaf0!important;}
.chat-input:focus{border-color:#00e5ff50!important;box-shadow:0 0 0 3px #00e5ff10;}

@media(max-width:768px){
  .nav-links,.hire-btn{display:none;}
  .menu-toggle{display:block!important;}
  nav{padding:14px 20px!important;}
  section{padding:80px 20px!important;}
  .ring1,.ring2,.ring3{display:none;}
}
`;
