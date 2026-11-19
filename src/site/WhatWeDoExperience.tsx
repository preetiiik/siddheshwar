import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, House, CalendarDays, Smartphone, SlidersHorizontal, Leaf, ShieldCheck, Play } from 'lucide-react';
import { Reveal } from './components';
import './living.css';
const controls = [
 {title:'Whole-Home Control',Icon:House,to:'/solutions/home-automation'},
 {title:'Custom Routines',Icon:CalendarDays,to:'/solutions/home-automation#process-title'},
 {title:'Control from Anywhere',Icon:Smartphone,to:'/contact?interest=Remote%20Home%20Control'},
];
const benefits = [
 {title:'Seamless Integration',text:"Connect your home's devices into one unified system.",Icon:SlidersHorizontal},
 {title:'Everyday Comfort',text:'Create the right atmosphere for work, rest and living.',Icon:Leaf},
 {title:'Enhanced Peace of Mind',text:'Stay aware, in control and connected at all times.',Icon:ShieldCheck},
];
export default function WhatWeDoExperience() {
 return <section id="what-we-do" className="s-living-experience" aria-labelledby="s-living-title"><div className="s-container">
  <div className="s-living-layout">
   <Reveal className="s-living-copy"><p className="s-living-label">SMART HOME SOLUTIONS</p><h2 id="s-living-title">Intelligent spaces for <span>the way you live</span></h2><p className="s-living-description">Bring together lighting, climate, security, entertainment and more with a connected system that adapts to your routines, preferences and every moment at home.</p><div className="s-living-actions"><Link className="s-living-consult" to="/contact?interest=Smart%20Home%20Solutions">Request Consultation<ArrowRight size={18} aria-hidden="true" /></Link><Link className="s-living-preview" to="/solutions/home-automation#showcase-title"><span><Play size={16} fill="currentColor" aria-hidden="true" /></span>See It in Action</Link></div></Reveal>
   <Reveal className="s-living-visual"><div className="s-living-photo"><img src="/living/intelligent-spaces-1536.webp" srcSet="/living/intelligent-spaces-640.webp 640w, /living/intelligent-spaces-1024.webp 1024w, /living/intelligent-spaces-1536.webp 1536w" sizes="(max-width:900px) 100vw, 55vw" width={1536} height={1024} alt="Contemporary smart-home interior with warm wood finishes, architectural lighting and a wall-mounted control panel" loading="lazy" decoding="async" /></div><ul className="s-living-controls">{controls.map(({title,Icon,to})=><li key={title}><Link to={to}><span><Icon size={21} strokeWidth={1.6} aria-hidden="true" /></span>{title}<ChevronRight size={18} aria-hidden="true" /></Link></li>)}</ul></Reveal>
  </div>
  <Reveal><ul className="s-living-benefits">{benefits.map(({title,text,Icon})=><li key={title}><span className="s-living-benefit-icon"><Icon size={30} strokeWidth={1.5} aria-hidden="true" /></span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ul></Reveal>
 </div></section>;
}
