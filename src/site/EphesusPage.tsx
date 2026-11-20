import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Hand, Lightbulb, Monitor, Sun, Thermometer, Wind, Blinds, Power, Fan, Sparkles, Settings2 } from 'lucide-react';
import { ContactCTA, Reveal } from './components';
import SelectedFeatures from './SelectedFeatures';
import './ephesus.css';

const features = [
 { title:'KNX Integration', description:'Designed for communication within a KNX building automation system.', Icon:Monitor },
 { title:'HVAC Temperature Control', description:'Supports heating and cooling control with compatible HVAC equipment.', Icon:Thermometer },
 { title:'Integrated Environmental Sensors', description:'Supported room-controller variants include temperature, humidity and ambient-light sensing.', Icon:Sun },
 { title:'Lighting Control', description:'Configurable buttons can operate compatible lighting functions.', Icon:Lightbulb },
 { title:'Dimming Control', description:'Supports configured dimming operations within a KNX system.', Icon:Hand },
];
const functions = [
 { title:'Switching (On-Off)', Icon:Power }, { title:'Curtains / Blinds', Icon:Blinds },
 { title:'Air Conditioning', Icon:Wind }, { title:'Fan Control', Icon:Fan },
 { title:'Dimming', Icon:Sun }, { title:'Scenario Management', Icon:Sparkles },
 { title:'Operating Mode Settings', Icon:Settings2 },
];
const sensors = [
 ['Temperature & humidity', 'Integrated sensing brings room conditions into the control experience.'],
 ['Ambient light', 'An integrated light sensor responds to the surrounding environment.'],
 ['Heating & cooling', 'Manage heating and cooling operation through the room controller.'],
 ['Fan speed', 'Adjust fan speed to suit the space and its occupants.'],
 ['Operating modes', 'Choose the operating mode that suits the way the room is used.'],
];
export default function EphesusPage() {
 return <article className="eph-page">
  <section className="eph-hero"><div className="s-container eph-hero-grid"><Reveal><nav className="eph-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/products">Products</Link><span>/</span><span>EPHESUS</span></nav><p className="eph-label">EPHESUS / KNX ROOM CONTROLLERS</p><h1>EPHESUS KNX Room Controller <span>&amp; HVAC</span></h1><p className="eph-intro">A KNX-based room controller with integrated temperature, humidity and ambient light sensors, HVAC control and customisable button configurations.</p><a className="eph-button" href="#ephesus-features">Explore Features <ArrowDown size={17} aria-hidden="true" /></a></Reveal><div className="eph-image-pending" role="img" aria-label="Product image coming soon"><span>EPHESUS</span><p>Product image coming soon</p></div></div></section>
  <section className="eph-section s-container" id="ephesus-features"><Reveal><p className="eph-label">DESIGNED FOR EVERYDAY CONTROL</p><h2>Intelligence in every detail.</h2></Reveal><SelectedFeatures features={features} id="ephesus-more-features"/><p className="eph-note">Functions and button configuration depend on the selected model.</p></section>
  <section className="eph-overview eph-section"><div className="s-container eph-split"><Reveal><p className="eph-label">PRODUCT OVERVIEW</p><h2>Considered design. Connected comfort.</h2></Reveal><Reveal><p>EPHESUS brings room control and integrated sensing together in a handcrafted KNX controller. Its touch screen and customisable buttons support everyday control across a connected smart-home system.</p><p>Temperature, humidity and ambient light sensors complement HVAC controls, bringing useful room functions into one interface. Contact our team for details on materials and available configurations.</p></Reveal></div></section>
  <section className="eph-section s-container"><Reveal><p className="eph-label">MAIN FUNCTIONS</p><h2>More control, in one place.</h2></Reveal><div className="eph-function-grid">{functions.map(({title,Icon})=><div key={title}><Icon size={22} strokeWidth={1.5} aria-hidden="true"/><h3>{title}</h3><ArrowUpRight size={16} aria-hidden="true"/></div>)}</div></section>
  <section className="eph-sensors eph-section"><div className="s-container eph-split"><Reveal><p className="eph-label">INTEGRATED SENSORS & HVAC</p><h2>Comfort that responds to your space.</h2><p>Bring room sensing and climate controls together through a single KNX interface.</p></Reveal><div className="eph-sensor-list">{sensors.map(([title,text])=><div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>
  <section className="eph-section s-container"><Reveal><p className="eph-label">LED COLOUR OPTIONS</p><h2>A subtle detail, your choice.</h2><p className="eph-lead">Choose from three status LED colours.</p></Reveal><div className="eph-led-grid">{[['White','white'],['Blue','blue'],['Amber','amber']].map(([name,colour])=><div key={name}><span className={`eph-led eph-led--${colour}`} aria-hidden="true"/><h3>{name}</h3></div>)}</div><p className="eph-note">LED reference images will be added when available.</p></section>
  <section className="eph-overview eph-section"><div className="s-container eph-split"><Reveal><p className="eph-label">CUSTOMISATION</p><h2>Made personal to your space.</h2></Reveal><Reveal><p>Personalise the controller with laser engraving and text for a control interface tailored to your space. Ask our team about available button symbols and configurations.</p><Link className="eph-text-link" to="/contact?interest=EPHESUS%20KNX%20Room%20Controller">Discuss customisation <ArrowUpRight size={16}/></Link></Reveal></div></section>
  <section className="eph-section s-container"><Reveal><p className="eph-label">PRODUCT VARIANTS</p><h2>Find your configuration.</h2><p className="eph-lead">Finishes, colours and button configurations are available to discuss with our team. Product images and model details will be added when supplied.</p></Reveal></section>
  <ContactCTA to="/contact?interest=EPHESUS%20KNX%20Room%20Controller" />
 </article>;
}

