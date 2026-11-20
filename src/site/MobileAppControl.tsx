import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Lightbulb, PanelsTopLeft, Thermometer, Sparkles, Smartphone } from 'lucide-react';
import { Reveal } from './components';
import { SiteImage } from './Image';
import './mobile-app-control.css';

const features=[
 {id:'lighting',title:'Smart Lighting',text:'Explore lighting-control options for compatible devices.',image:'/solutions/S2.png',Icon:Lightbulb},
 {id:'curtains',title:'Smart Curtains',text:'Consider convenient daylight and privacy settings for supported curtains.',image:'/solutions/S4.png',Icon:PanelsTopLeft},
 {id:'climate',title:'Climate Control',text:'Bring supported temperature settings into your everyday routine.',image:'/solutions/S5.png',Icon:Thermometer},
 {id:'scenes',title:'Smart Scenes',text:'Explore personalized scenes around the way you use each room.',image:'/goodnight.png.jpeg',Icon:Sparkles},
];
export default function MobileAppControl() {
 const [active,setActive]=useState('lighting');
 const selected=features.find(f=>f.id===active)!;
 const reduced=useReducedMotion();
 const Icon=selected.Icon;
 return <section className="mac-section" aria-labelledby="mobile-app-control-title"><div className="s-container mac-layout">
  <Reveal className="mac-copy" direction="left"><p className="mac-label">SMART LIVING, SIMPLIFIED</p><h2 id="mobile-app-control-title">Your Home. Your Control.<br /><span>One Tap Away.</span></h2><p className="mac-description">Experience convenient control of compatible smart-home devices directly from your smartphone. Adjust lighting, manage curtains, control temperature and activate personalized scenes — all from one intuitive interface.</p>
   <div className="mac-controls" role="group" aria-label="Explore mobile app control features">{features.map(({id,title,Icon:FeatureIcon})=><button key={id} type="button" aria-pressed={active===id} aria-controls="mobile-feature-preview" onClick={()=>setActive(id)}><FeatureIcon size={20} strokeWidth={1.5} aria-hidden="true" />{title}</button>)}</div>
   <Link className="mac-cta" to="/solutions/home-automation">Explore Smart Home Solutions<ArrowUpRight size={17} aria-hidden="true" /></Link><p className="mac-compatibility">Available functions depend on compatible devices and the selected installation.</p>
  </Reveal>
  <Reveal className="mac-visual" direction="right" delay={.08}>
   <div className="mac-stage"><div className="mac-scene-images" aria-hidden="true">{features.map(f=><SiteImage key={f.id} className={active===f.id?'is-active':''} src={f.image} alt="" loading="lazy" width={1000} height={900} />)}</div>
    <div className="mac-device"><div className="mac-screen"><img src="/hero/belahome-official.png" alt="BelaHome smart home app interface" width={1242} height={2208} loading="lazy" decoding="async" /></div></div>
    <div id="mobile-feature-preview" className="mac-feature-preview" aria-live="polite" aria-atomic="true"><AnimatePresence mode="wait" initial={false}><motion.div key={active} initial={reduced?false:{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={reduced?undefined:{opacity:0,y:-4}} transition={{duration:reduced?0:.22}}><span className="mac-preview-icon"><Icon size={23} strokeWidth={1.4} aria-hidden="true" /></span><p className="mac-preview-label">FEATURE PREVIEW</p><h3>{selected.title}</h3><p>{selected.text}</p></motion.div></AnimatePresence></div>
   </div>
   <div className="mac-app-caption"><span><Smartphone size={15} aria-hidden="true" />BelaHome App · supplied catalogue preview</span><Link to="/products?brand=Akubela">Explore Akubela products<ArrowUpRight size={14} aria-hidden="true" /></Link></div>
   <p className="mac-preview-note">Illustrative feature preview. This website does not connect to or control devices.</p>
  </Reveal>
 </div></section>;
}
