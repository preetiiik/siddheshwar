import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LockKeyhole, Video, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { ContactCTA, Reveal } from '../components';
import { SiteImage } from '../Image';
import { ServiceBreadcrumb, ServiceProducts } from './ServiceBasics';
import './services.css';

const devices=[
 {name:'Smart door locks',Icon:LockKeyhole,x:'54%',y:'68%',title:'A considered way to arrive.',text:'Assess door suitability and supported entry methods before choosing smart locking hardware.',image:'/hero/akubela-sl60-wide.webp',to:'/products?category=smart-door-locks'},
 {name:'Video door phones',Icon:Video,x:'67%',y:'54%',title:'See and speak to visitors.',text:'Plan visitor communication and entrance viewing around a compatible video door phone system.',image:'/products/VDP.jpg',to:'/products?category=video-door-phones'},
 {name:'Compatible sensors',Icon:ShieldCheck,x:'29%',y:'43%',title:'Consider the openings that matter.',text:'Discuss compatible door, window and other sensor options as part of your wider security plan.',image:'/products/akubela/akubela-door-window-sensor.webp',to:'/products?category=smart-sensors-detectors'},
];
export default function SecurityService() {
 const [active,setActive]=useState(0);const device=devices[active];const Icon=device.Icon;
 return <article className="sv-page security-service">
  <section className="security-hero sv-photo-hero"><SiteImage src="/hero/akubela-sl60-wide.webp" alt="Akubela SL60 smart lock on a contemporary entrance door" width={1920} height={1080} fetchPriority="high" /><div className="s-container"><ServiceBreadcrumb name="Security" /><Reveal><p className="sv-label">SECURITY AT EVERY ENTRANCE</p><h1>Smarter Access.<br />Greater Peace of Mind.</h1><p>Bring smart access, visitor communication and compatible sensors into a thoughtfully planned entrance experience.</p><a className="sv-text-link" href="#security-entrance">Explore the entrance<ArrowUpRight size={17} /></a></Reveal></div></section>
  <section className="sv-section security-intro"><div className="s-container"><p className="sv-label">START WITH YOUR SPACE</p><h2>Security is a collection<br />of considered details.</h2><p>We look at how people arrive, the entrances they use and the information you need. The right combination of devices follows the property layout and the requirements of its occupants.</p></div></section>
  <section id="security-entrance" className="s-container sv-section"><Reveal className="sv-heading"><p className="sv-label">EXPLORE THE ENTRANCE</p><h2>Every opening has a role.</h2><p>Select a marker to explore a device’s purpose.</p></Reveal><div className="security-entrance-layout"><div className="security-entrance-visual"><SiteImage src="/products/space-we-transform/independent-homes.png" alt="Modern residential entrance used as an illustrative security planning setting" width={1200} height={1000} loading="lazy" /><div role="group" aria-label="Explore security devices">{devices.map((d,i)=><button key={d.name} type="button" style={{left:d.x,top:d.y}} aria-label={d.name} aria-pressed={active===i} onClick={()=>setActive(i)}><span>{i+1}</span></button>)}</div><small>Conceptual device positions, not a completed installation.</small></div><div className="security-device-card" aria-live="polite" aria-atomic="true"><div className={`security-device-photo security-device-photo-${active}`}><SiteImage src={device.image} alt={device.name} width={800} height={650} loading="lazy" /></div><Icon size={26} strokeWidth={1.4} aria-hidden="true" /><p className="sv-label">{device.name}</p><h3>{device.title}</h3><p>{device.text}</p><Link className="sv-text-link" to={device.to}>Explore products<ArrowUpRight size={16} /></Link></div></div></section>
  <section className="security-system sv-section"><div className="s-container"><Reveal><p className="sv-label">ENTRANCE & MONITORING SOLUTIONS</p><h2>Plan the complete<br />arrival experience.</h2></Reveal><div>{[['01','Understand the entrances','Review the property’s access points, door construction and everyday arrival patterns.'],['02','Select suitable equipment','Assess locks, visitor interfaces and sensors against the requirements of the project.'],['03','Coordinate supported functions','Discuss compatible connections and any configured notifications with the selected installation.']].map(([n,title,text])=><Reveal key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div></div></section>
  <ServiceProducts title="Explore access and sensing products." ids={['akubela-sl60-smart-lock','akubela-sl30-smart-lock','akubela-door-window-sensor','akubela-motion-sensor']} />
  <ContactCTA to="/contact?interest=Security%20%26%20Access" />
 </article>;
}
