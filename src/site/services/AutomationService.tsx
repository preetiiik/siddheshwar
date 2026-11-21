import { useRef, useState } from 'react';
import { useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { ArrowDown, Lightbulb, PanelsTopLeft, Thermometer, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Action, ContactCTA, Reveal } from '../components';
import { SiteImage } from '../Image';
import { ServiceBreadcrumb, ServiceProducts } from './ServiceBasics';
import './services.css';

const scenes=[
 {name:'Morning',time:'A gentle beginning',image:'/solutions/S4.png',text:'Consider a morning routine that brings supported lighting, curtains and climate settings together.',lighting:'A brighter start',curtains:'Welcome daylight',climate:'Preferred comfort settings'},
 {name:'Afternoon',time:'Room for everyday life',image:'/solutions/S1.png',text:'Plan room controls around working, relaxing and the changing rhythm of your day.',lighting:'Settings for daily activities',curtains:'Balance daylight and privacy',climate:'Room-by-room requirements'},
 {name:'Evening',time:'A different atmosphere',image:'/goodnight.png.jpeg',text:'Explore a configured evening scene for a more relaxed atmosphere, using compatible connected systems.',lighting:'A softer atmosphere',curtains:'Consider evening privacy',climate:'Comfort for winding down'},
];
export default function AutomationService() {
 const story=useRef<HTMLDivElement>(null);
 const [active,setActive]=useState(0);
 const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:story,offset:['start start','end end']});
 useMotionValueEvent(scrollYProgress,'change',value=>{if(!reduced&&window.matchMedia('(min-width:751px)').matches)setActive(Math.min(2,Math.floor(value*3)));});
 const scene=scenes[active];
 return <article className="sv-page auto-service">
  <section className="auto-hero sv-photo-hero"><SiteImage src="/what we do- home automation.png" alt="Contemporary connected-home interior at sunset" width={1920} height={1080} fetchPriority="high" /><div className="s-container"><ServiceBreadcrumb name="Automation" /><Reveal><p className="sv-label">A DAY IN YOUR SMART HOME</p><h1>Your Space.<br />Smarter Every Day.</h1><p>Thoughtfully connected lighting, curtains and climate, planned around the way you live.</p><a href="#automation-story" className="auto-discover">Discover a day at home<ArrowDown size={17} aria-hidden="true" /></a></Reveal></div></section>
  <section className="s-container sv-section auto-intro"><Reveal><p className="sv-label">CONNECTED LIVING</p><h2>Less to think about.<br /><span>More room to live.</span></h2></Reveal><Reveal><p>A smart home begins with everyday moments. We consider the rooms you use, your routines and the controls that should feel natural, then plan how compatible systems can work together.</p><Action to="/solutions/home-automation" secondary>Complete Home Automation</Action></Reveal></section>
  <div ref={story} id="automation-story" className="auto-story"><section className="auto-pinned" aria-labelledby="auto-story-title"><div className="auto-scene-images" aria-hidden="true">{scenes.map((s,i)=><SiteImage className={active===i?'is-active':''} key={s.name} src={s.image} alt="" loading="lazy" width={1800} height={1100} />)}</div><div className="s-container auto-story-layout"><div><p className="sv-label">01 — 03 / AN EVERYDAY POSSIBILITY</p><h2 id="auto-story-title">One home.<br />A changing rhythm.</h2><div className="auto-scene-tabs" role="group" aria-label="Explore configured home scenes">{scenes.map((s,i)=><button key={s.name} type="button" aria-pressed={active===i} onClick={()=>setActive(i)}>{s.name}</button>)}</div><p className="auto-scroll-cue">Scroll to explore, or choose a scene.</p></div><div className="auto-scene-card" aria-live="polite" aria-atomic="true"><p className="sv-label">{scene.name}</p><h3>{scene.time}</h3><p>{scene.text}</p><ul><li><Lightbulb size={19} aria-hidden="true" /><span>{scene.lighting}</span></li><li><PanelsTopLeft size={19} aria-hidden="true" /><span>{scene.curtains}</span></li><li><Thermometer size={19} aria-hidden="true" /><span>{scene.climate}</span></li></ul><small>Illustrative scene planning. Available functions depend on selected devices and configuration.</small></div></div></section></div>
  <section className="sv-section s-container auto-controls"><Reveal><p className="sv-label">LIGHT. PRIVACY. COMFORT.</p><h2>Individual systems.<br /><span>A considered experience.</span></h2></Reveal><div>{[[Lightbulb,'Lighting','Consider brightness and configured scenes alongside the purpose of each room.'],[PanelsTopLeft,'Curtains','Plan movement and privacy around your windows and supported controls.'],[Thermometer,'Climate','Discuss compatible temperature settings as part of your comfort requirements.']].map(([Icon,title,text])=>{const ItemIcon=Icon as typeof Lightbulb;return <Reveal key={String(title)}><ItemIcon size={25} strokeWidth={1.4} aria-hidden="true" /><h3>{String(title)}</h3><p>{String(text)}</p></Reveal>;})}</div></section>
  <section className="auto-mobile sv-section"><div className="s-container"><Reveal><Smartphone size={31} strokeWidth={1.3} aria-hidden="true" /><p className="sv-label">COMPATIBLE MOBILE CONTROL</p><h2>Keep your home<br />within reach.</h2><p>Explore supported smartphone interfaces alongside your selected system. App functions, access and device compatibility are confirmed during planning.</p><Link className="sv-text-link" to="/products/automation/akubela/products/akubela-belahome-app">Explore BelaHome App<Smartphone size={16} aria-hidden="true" /></Link></Reveal><SiteImage src="/products/akubela/akubela-belahome-app.webp" alt="Supplied BelaHome App catalogue preview showing its mobile interface" loading="lazy" width={733} height={1100} /></div></section>
  <ServiceProducts title="Thoughtful interfaces for everyday living." ids={['akubela-hypanel-supreme','akubela-aura-series-smart-switch','akubela-curtain-control-panel','akubela-temperature-control-panel-with-4-buttons']} />
  <ContactCTA to="/contact?interest=Home%20Automation" />
 </article>;
}
