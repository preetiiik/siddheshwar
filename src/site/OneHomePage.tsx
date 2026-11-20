import { Link, useLocation } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Box, Cable, Cloud, Home, Network, Settings2, Smartphone, Wifi } from 'lucide-react';
import { ContactCTA, Reveal } from './components';
import SelectedFeatures from './SelectedFeatures';
import './onehome.css';

const integrations = ['KNX', 'Matter', 'Apple Home', 'Google Home', 'Amazon Alexa', 'Sonos', 'Crestron Home'];
const knxFeatures = [
 { title:'KNX-to-Matter Bridge', description:'Bring supported KNX devices to compatible Matter ecosystems.', Icon:Network },
 { title:'Smart Home Integration', description:'Use compatible platforms including Apple Home, Google Home and Samsung SmartThings through Matter.', Icon:Smartphone },
 { title:'Voice Assistant Compatibility', description:'Control supported devices through compatible voice interfaces.', Icon:Wifi },
 { title:'Local Control', description:'Operate supported KNX smart-home functions locally.', Icon:Home },
 { title:'Built-in Automations', description:'Configure automations; the base model includes two enabled automations.', Icon:Settings2 },
];
const chFeatures = [
 { title:'Crestron Home Integration', description:'Integrate compatible KNX devices into Crestron Home.', Icon:Network },
 { title:'Local Integration', description:'Connect KNX and Crestron Home through a local architecture.', Icon:Home },
 { title:'Automatic ETS Device Detection', description:'Identify KNX devices from an ETS project file.', Icon:Settings2 },
 { title:'Built-in Automations', description:'Configure automation logic for supported KNX requirements.', Icon:Wifi },
 { title:'1Home Mobile App', description:'Use the 1Home app to access supported KNX functionality.', Icon:Smartphone },
];
function ImagePending({ name }: { name:string }) {
 return <div className="oh-image-pending" role="img" aria-label={`${name} image coming soon`}><Box size={40} strokeWidth={1} aria-hidden="true"/><span>{name}</span><small>Product image coming soon</small></div>;
}
export default function OneHomePage() {
 const isCH=useLocation().pathname.endsWith('1home-server-ch');
 return <article className="oh-page">
  <section className="oh-hero"><div className="s-container oh-hero-grid"><Reveal><nav className="oh-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/products">Products</Link><span>/</span><span>{isCH?'1Home Server CH':'1Home Server KNX'}</span></nav><p className="oh-label">1HOME / SMART HOME INTEGRATION</p><h1>Making Smart Homes <span>Smarter</span></h1><p className="oh-intro">Connect KNX with modern smart-home platforms and bring more of your home together with 1Home Server.</p><a className="oh-button" href={isCH?'#server-ch':'#server-knx'}>Explore {isCH?'Server CH':'Server KNX'} <ArrowDown size={17} aria-hidden="true" /></a></Reveal><div className="oh-hero-visual"><div className="oh-orbit" aria-hidden="true"/><ImagePending name={isCH?'1Home Server CH':'1Home Server KNX'}/></div></div></section>
  <section className="oh-section s-container"><Reveal className="oh-heading"><p className="oh-label">YOUR CONNECTED ECOSYSTEM</p><h2>Connecting Your Smart Home Ecosystem</h2><p>Bring together the technologies and platforms that support your connected home.</p></Reveal><div className="oh-platforms">{integrations.map(name=><div key={name}>{name}</div>)}</div><p className="oh-note">Integration graphics will be added when supplied. Supported integrations vary by server and configuration.</p></section>
  <section className="oh-technology oh-section"><div className="s-container oh-split"><Reveal><p className="oh-label">CONNECTED TECHNOLOGIES</p><h2>One Server. Multiple Smart Home Possibilities.</h2><p>Connect KNX with Matter and bring compatible devices and smart-home platforms into a connected experience.</p></Reveal><div className="oh-network" aria-label="KNX and Matter connected through 1Home"><div>KNX</div><Cable size={27} aria-hidden="true"/><strong>1Home</strong><Cable size={27} aria-hidden="true"/><div>Matter</div></div></div></section>
  <section id="server-knx" className="oh-section s-container"><div className="oh-split"><ImagePending name="1Home Server KNX"/><Reveal><p className="oh-label">SMART HOME INTEGRATION</p><h2>1Home Server KNX</h2><p>Connect KNX with modern platforms, mobile applications and voice assistants, with local control for your smart home.</p><SelectedFeatures features={knxFeatures} id="onehome-knx-more-features"/><Link className="oh-text-link" to="/contact?interest=1Home%20Server%20KNX">Enquire about Server KNX <ArrowUpRight size={16}/></Link></Reveal></div></section>
  <section id="server-ch" className="oh-ch oh-section"><div className="s-container oh-split"><Reveal><p className="oh-label">CRESTRON HOME INTEGRATION</p><h2>Effortlessly Control KNX Devices in Crestron Home</h2><p>1Home Server CH synchronises KNX configurations with Crestron Home, bringing devices into a familiar control experience.</p><SelectedFeatures features={chFeatures} id="onehome-ch-more-features"/><Link className="oh-button oh-button-light" to="/contact?interest=1Home%20Server%20CH">Discuss Server CH <ArrowUpRight size={16}/></Link></Reveal><ImagePending name="1Home Server CH"/></div></section>
  <section className="oh-section s-container"><Reveal className="oh-heading"><p className="oh-label">THE 1HOME RANGE</p><h2>Choose your connection.</h2><p>Explore the server designed for your smart-home ecosystem.</p></Reveal><div className="oh-products">{[['1Home Server KNX','1home-server-knx','Connect KNX with smart-home platforms.'],['1Home Server CH','1home-server-ch','Bring KNX into Crestron Home.']].map(([name,slug,description])=><Link className="oh-product" key={slug} to={`/products/${slug}#${slug.endsWith('ch')?'server-ch':'server-knx'}`}><span className="oh-product-icon"><Cloud size={24} aria-hidden="true"/></span><div><h3>{name}</h3><p>{description}</p></div><span>View product <ArrowUpRight size={16}/></span></Link>)}</div></section>
  <ContactCTA to="/contact?interest=1Home%20Server" />
 </article>;
}
