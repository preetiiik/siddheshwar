import { Link } from 'react-router-dom';
import { ArrowUpRight, Layers3, House, Settings, ShieldCheck, Wifi, SlidersHorizontal } from 'lucide-react';
import { Reveal } from './components';
import { SiteImage } from './Image';
import './approach.css';
const principles = [
 { title:'Integrated Planning',text:'Solutions designed around your space.',Icon:Layers3 },
 { title:'Architectural Harmony',text:'Technology that complements your interiors.',Icon:House },
 { title:'Seamless Automation',text:'Lighting, climate, entertainment and more.',Icon:Settings },
 { title:'Reliable & Future-Ready',text:'Solutions planned around your space and changing needs.',Icon:ShieldCheck },
];
function Principle({index}:{index:number}) {const {title,text,Icon}=principles[index];return <div className="s-approach-principle"><span className="s-approach-principle-icon"><Icon size={31} strokeWidth={1.55} aria-hidden="true" /></span><div><h3>{title}</h3><p>{text}</p></div></div>;}
export default function SiddheshwarApproach() {
 return <section className="s-approach-home" aria-labelledby="s-approach-title"><div className="s-container">
  <Reveal className="s-approach-home-heading"><p className="s-approach-home-label">THE SIDDHESHWAR APPROACH</p><h2 id="s-approach-title">Thoughtful technology. <span>Effortless living.</span></h2><p>Great integration begins with understanding how you want to live, work and spend time in your space.</p><p>We connect automation, lighting, entertainment, security and networking through considered planning, clear choices and an eye for architectural detail.</p></Reveal>
  <div className="s-approach-home-grid">
   <Reveal className="s-approach-home-side" direction="left" distance={56}><Principle index={0} /><Principle index={1} /></Reveal>
   <Reveal className="s-approach-home-centre" direction="up" distance={44}><div className="s-approach-home-visual"><div className="s-approach-orbit" aria-hidden="true" /><div className="s-approach-house"><SiteImage src="/products/space-we-transform/independent-homes.png" alt="Contemporary home with warm wood details, a landscaped entrance and clean architectural lines" loading="lazy" decoding="async" width={1448} height={1086} /></div><span className="s-approach-orbit-icon is-home" aria-hidden="true"><House size={24} /></span><span className="s-approach-orbit-icon is-control" aria-hidden="true"><SlidersHorizontal size={24} /></span><span className="s-approach-orbit-icon is-network" aria-hidden="true"><Wifi size={24} /></span><span className="s-approach-orbit-icon is-security" aria-hidden="true"><ShieldCheck size={24} /></span></div><Link className="s-approach-story" to="/about">Discover Our Story<ArrowUpRight size={18} aria-hidden="true" /></Link></Reveal>
   <Reveal className="s-approach-home-side" direction="right" distance={56}><Principle index={2} /><Principle index={3} /></Reveal>
  </div>
 </div></section>;
}
