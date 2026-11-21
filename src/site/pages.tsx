import { solutionDetailPath } from './solution-links';
import { homepageProductCategories, mainProductCategory } from './product-categories';
import OurProducts from './OurProducts';
import ProductsCatalogue from './ProductsCatalogue';
import SiddheshwarApproach from './SiddheshwarApproach';
import OurSolutions from './OurSolutions';
import HomeProductCarousel from './HomeProductCarousel';
import MobileAppControl from './MobileAppControl';
import WhatWeDoExperience from './WhatWeDoExperience';
import Team from './Team';
import { SiteImage } from './Image';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Check, Search, Sun, Film, ShieldCheck, Moon, SlidersHorizontal, Users, Building2, Link2, ScanSearch, Sparkles, Settings2, ClipboardCheck } from 'lucide-react';
import { Action, BrandMarquee, ContactCTA, HeroCarousel, PageHero, ProductCard, ProductModal, Reveal, SectionHeading } from './components';
import { brands, catalogue, lightingGroups, productService, services, solutions, type Service } from './data';
import { ContactDetails, EnquiryForm } from './Forms';
import { lightingItems, type Product } from '../product-data';

export function Home() {
  return <><HeroCarousel /><WhatWeDoExperience /><OurProducts /><BrandMarquee /><OurSolutions /><HomeProductCarousel /><MobileAppControl /><SiddheshwarApproach /><ContactCTA /></>;
}
export function Products({ lightingOnly = false }: { lightingOnly?: boolean }) {
 return lightingOnly ? <LegacyProducts lightingOnly /> : <ProductsCatalogue />;
}
function LegacyProducts({ lightingOnly = false }: { lightingOnly?: boolean }) {
  const [searchParams,setSearchParams]=useSearchParams();
  const [lightingCategory,setLightingCategory]=useState('all');
  const requestedCategory=searchParams.get('category') || 'all';
  const mainCategory=homepageProductCategories.find(c=>c.id===requestedCategory);
  const category=lightingOnly?lightingCategory:(mainCategory||services.some(s=>s.id===requestedCategory)?requestedCategory:'all');
  const setCategory=(value:string)=>{if(lightingOnly)setLightingCategory(value);else setSearchParams(previous=>{const next=new URLSearchParams(previous);if(value==='all')next.delete('category');else next.set('category',value);return next;},{preventScrollReset:true});};
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Product | null>(null);
  const filtered = (lightingOnly ? lightingItems : catalogue).filter(p => {
    if (lightingOnly && p.category !== 'lighting') return false;
    if (category !== 'all') {
      if (lightingOnly) { const group = lightingGroups.find(g => g.name === category); if (!group?.pattern.test(p.name)) return false; }
      else if (mainCategory) { if(mainProductCategory(p)!==category)return false; }
      else if (productService(p) !== category) return false;
    }
    return `${p.name} ${p.shortDescription} ${p.brand || ''}`.toLowerCase().includes(query.toLowerCase().trim());
  });
  const tabs = lightingOnly ? lightingGroups.map(g => ({ id: g.name, name: g.name })) : mainCategory ? homepageProductCategories : services;
  return <><PageHero label={lightingOnly ? 'Lighting' : 'Products'} title={lightingOnly ? 'Light that shapes the experience.' : 'Technology designed for better living.'} text={lightingOnly ? 'Explore architectural and decorative lighting for the spaces you want to create.' : 'Explore thoughtful interfaces, connected controls and lighting from the supplied product collection.'} image={lightingOnly ? '/lighting-home.png' : '/solutions/S1.png'} /><section className="s-section s-container"><div className="s-catalogue-tools"><div className="s-filter-label"><SlidersHorizontal size={17} />Explore the collection</div><label className="s-search"><Search size={18} /><span className="s-sr-only">Search products</span><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products or models" /></label></div><div className="s-filters" role="group" aria-label="Filter product categories">{[{ id: 'all', name: 'All' }, ...tabs].map(tab => <button type="button" key={tab.id} aria-pressed={category === tab.id} onClick={() => setCategory(tab.id)}>{tab.name}</button>)}</div><p className="s-result-count" role="status">{filtered.length} {filtered.length === 1 ? 'product' : 'products'}</p>{filtered.length ? <div className="s-product-grid">{filtered.map(p => <ProductCard key={p.id} product={p} onSelect={setSelected} />)}</div> : <div className="s-empty"><h2>{query ? 'No matching products.' : 'Let’s select the right system together.'}</h2><p>{query ? 'Try a different product name or category.' : 'A verified equipment list for this service has not been supplied. Tell us about your project so product options can be assessed.'}</p><button type="button" className="s-text-link" onClick={() => { setQuery(''); setCategory('all'); }}>Show all products<ArrowUpRight size={15} /></button><Action to="/contact">Discuss Your Requirements</Action></div>}<div className="s-catalogue-bottom"><h2>Choose the experience.<br />We’ll help connect the details.</h2><Action to="/solutions" secondary>Related Solutions</Action></div></section><ContactCTA /><ProductModal product={selected} onClose={() => setSelected(null)} /></>;
}
export function Solutions() {
  const [selected, setSelected] = useState<Product | null>(null);
  return <><PageHero label="Solutions" title="One connected experience. Endless possibilities." text="Thoughtful technology brings individual systems together around the way a space is used." image="/solutions-hero.jpeg" /><nav className="s-solution-jumps s-container" aria-label="Jump to a solution">{solutions.map(s => <Link to={`#${s.id}`} key={s.id}>{s.title}<ArrowUpRight size={14} /></Link>)}</nav><div className="s-container s-solutions-list">{solutions.map((s, index) => <section key={s.id} id={s.id} className={`s-editorial s-section ${index % 2 ? 'is-reversed' : ''}`}><Reveal className="s-editorial-image" direction={index % 2 ? 'right' : 'left'}><SiteImage src={s.image} alt={`${s.title} application`} loading="lazy" width={1000} height={1000} /></Reveal><Reveal direction={index % 2 ? 'left' : 'right'} delay={.08}><p className="s-eyebrow">Solution {String(index + 1).padStart(2, '0')}</p><h2>{s.title}</h2><p>{s.description}</p><ul className="s-check-list">{s.capabilities.map(c => <li key={c}><Check size={16} />{c}</li>)}</ul><div className="s-related">{catalogue.filter(p => s.productIds.includes(p.id)).slice(0, 3).map(p => <button type="button" key={p.id} onClick={() => setSelected(p)}>{p.name}<ArrowUpRight size={14} /></button>)}</div><Action to={solutionDetailPath(s.id) || `/contact?interest=${encodeURIComponent(s.title)}`}>{solutionDetailPath(s.id) ? 'Explore This Solution' : 'Discuss This Solution'}</Action></Reveal></section>)}</div><ContactCTA /><ProductModal product={selected} onClose={() => setSelected(null)} /></>;
}
export function Scenes() {
  const scenes = [
    { name: 'Good Morning', Icon: Sun, image: '/lighting-home.png', text: 'Welcome the day with brighter lighting, open curtains and a comfortable room setting.', light: '85%', curtains: 'Open', temperature: '24°C' },
    { name: 'Movie Time', Icon: Film, image: '/movie%20time.png.jpeg', text: 'Dim the lights, draw the curtains and bring your entertainment controls together.', light: '15%', curtains: 'Closed', temperature: '22°C' },
    { name: 'Away Mode', Icon: ShieldCheck, image: '/away%20mode.png.jpeg', text: 'Switch off selected lights and appliances while enabling compatible monitoring functions.', light: 'Off', curtains: 'Closed', temperature: 'Eco' },
    { name: 'Good Night', Icon: Moon, image: '/goodnight.png.jpeg', text: 'Settle into a quiet atmosphere with low lighting and your chosen overnight settings.', light: '5%', curtains: 'Closed', temperature: '25°C' },
  ];
  const [active, setActive] = useState(0);
  const scene = scenes[active];
  return <section className="s-section s-scenes"><div className="s-container"><SectionHeading label="An everyday possibility" title="One touch. A different atmosphere." text="Explore an illustrative scene preview. Available functions depend on the selected installation." /><div className="s-filters" role="group" aria-label="Choose a room scene">{scenes.map((s, i) => <button key={s.name} type="button" aria-pressed={active === i} onClick={() => setActive(i)}><s.Icon size={16} />{s.name}</button>)}</div><div className="s-scene-preview"><SiteImage src={scene.image} alt={`${scene.name} interior scene`} loading="lazy" width={1100} height={800} /><div aria-live="polite"><p className="s-eyebrow">Scene preview</p><h3>{scene.name}</h3><p>{scene.text}</p><dl><div><dt>Lighting</dt><dd>{scene.light}</dd></div><div><dt>Curtains</dt><dd>{scene.curtains}</dd></div><div><dt>Climate setting</dt><dd>{scene.temperature}</dd></div></dl></div></div></div></section>;
}
export function ServicePage({ service }: { service: Service }) {
  const [selected, setSelected] = useState<Product | null>(null);
  const related = catalogue.filter(p => productService(p) === service.id).slice(0, 3);
  return <><PageHero label={service.name} title={service.headline} text={service.description} image={service.image} /><section className="s-section s-container"><SectionHeading label="Built around your requirements" title={`A considered approach to ${service.name.toLowerCase()}.`} text="Start with what your space needs. We help define the capabilities, interfaces and integration choices that make everyday use feel natural." /><div className="s-capability-grid">{service.capabilities.map((c, i) => <Reveal key={c}><span className="s-index">0{i + 1}</span><h3>{c}</h3><p>{capabilityText(c)}</p></Reveal>)}</div></section>{service.id === 'home-automation' && <Scenes />}{related.length > 0 ? <section className="s-section s-container"><div className="s-split-heading"><SectionHeading label="Explore the possibilities" title="Products for your space." /><Action to="/products" secondary>All Products</Action></div><div className="s-product-grid">{related.map(p => <ProductCard key={p.id} product={p} onSelect={setSelected} />)}</div></section> : <section className="s-section s-container s-service-consult"><h2>Every system starts with a plan.</h2><p>Equipment selection follows your room layout, usage and integration requirements. Contact us to discuss suitable options for your project.</p><Action to="/contact">Plan Your Project</Action></section>}<ContactCTA /><ProductModal product={selected} onClose={() => setSelected(null)} /></>;
}
function capabilityText(name: string) {
  const copy: Record<string, string> = {
    'Smart lighting': 'Shape the atmosphere with room-based lighting, dimming and coordinated scenes.',
    'Smart switches and touch panels': 'Use considered wall interfaces to bring everyday controls within easy reach.',
    'Curtain and blind automation': 'Coordinate daylight and privacy with compatible motorized window treatments.',
    'Climate control': 'Bring compatible climate systems into a room-focused control experience.',
    'Personalized smart scenes': 'Combine selected lighting, curtain and comfort settings into a single action.',
    'Centralized control': 'Manage connected functions through a coordinated interface selected for your installation.',
    'Compatible voice-control integrations': 'Explore hands-free control where the selected equipment supports integration.',
    'Home entertainment integration': 'Coordinate screens, sources and room controls for an enjoyable viewing experience.',
    'Multi-room audio': 'Plan how music is selected, distributed and controlled across different spaces.',
    'Audio-video distribution': 'Connect selected media sources to the rooms and displays where they are needed.',
    'Meeting room AV integration': 'Bring presentation, sound and room controls into a practical meeting setup.',
    'Centralized entertainment control': 'Simplify everyday access to compatible media equipment and room settings.',
    'Surveillance integration': 'Plan camera locations, viewing access and recording needs around your site.',
    'Smart access control': 'Explore entry management suited to the doors, users and routines of your space.',
    'Video door communication': 'Plan convenient communication with visitors through compatible door-entry systems.',
    'Intrusion monitoring': 'Consider sensing, alerts and monitoring requirements as part of a coordinated installation.',
    'Safety system integration': 'Assess how selected safety systems can work alongside the wider technology plan.',
    'Centralized monitoring': 'Bring supported status information into an accessible monitoring experience.',
    'Structured networking': 'Plan cabling, connection points and equipment locations for a clear infrastructure.',
    'Wi-Fi connectivity': 'Consider coverage, access-point placement and usage throughout the property.',
    'Network infrastructure': 'Create a coordinated foundation for selected connected systems and everyday devices.',
    'Smart device connectivity': 'Plan the wired and wireless connections required by the selected installation.',
    'Residential networking': 'Support work, media and connected living across the rooms of your home.',
    'Commercial networking': 'Plan connectivity around workplace use, building layout and operational requirements.',
  };
  return copy[name] || `Explore ${name.toLowerCase()} selected around your architecture, daily routines and project requirements.`;
}
export function WhatWeDo() {
  return <><PageHero label="What We Do" title="Technology that works beautifully together." text="Five complementary disciplines. One thoughtful approach to the connected environment." image="/products/space-we-transform/commercial-buildings.png" /><div className="s-container s-expertise-list">{services.map((s, i) => <section className={`s-section s-editorial ${i % 2 ? 'is-reversed' : ''}`} key={s.id}><Reveal className="s-editorial-image" direction={i % 2 ? 'right' : 'left'} distance={64}><SiteImage src={({ 'home-automation': '/what we do- home automation.png', 'lighting': '/what we do-lighting.png', 'audio-video': '/what we do-audio video.png', 'networking': '/what we do - networking.png' } as Record<string, string>)[s.id] || s.image} alt={`${s.name} application`} loading="lazy" width={900} height={1000} /></Reveal><Reveal direction={i % 2 ? 'left' : 'right'} distance={64} delay={.12}><p className="s-eyebrow">0{i + 1} / Our expertise</p><h2>{s.name}</h2><p>{s.description}</p><ul className="s-check-list">{s.capabilities.slice(0, 4).map(c => <li key={c}><Check size={16} />{c}</li>)}</ul><p className="s-muted">{s.id === 'home-automation' ? 'Explore touch panels, switches, dimmers and room controllers.' : s.id === 'lighting' ? 'Explore downlights, wall lights, decorative lights and outdoor lighting.' : 'Product selection is tailored to your project and supported integration needs.'}</p><Action to={`/${s.id}`} secondary>Explore {s.name}</Action></Reveal></section>)}</div><ContactCTA /></>;
}
export function Brands() {
  return <><PageHero label="Brands We Integrate" title="Thoughtful choices. Connected possibilities." text="A technology ecosystem should be selected for the experience it supports, the space it serves and the systems it needs to connect." /><section className="s-section s-container">{brands.length ? <div className="s-brand-grid">{brands.map(b => <Reveal key={b.name}><SiteImage src={b.logo} alt={b.name} loading="lazy" /><h2>{b.name}</h2><p>{b.relationship}</p></Reveal>)}</div> : <div className="s-empty"><p className="s-eyebrow">Our brand ecosystem</p><h2>A considered selection,<br />built around your project.</h2><p>Our brand presentation is being prepared. Contact us to discuss the products and integration options suitable for your space.</p><Action to="/contact">Discuss Your Requirements</Action></div>}<div className="s-capability-grid">{['Project-first selection', 'Compatibility planning', 'Clear product information'].map((t, i) => <Reveal key={t}><span className="s-index">0{i + 1}</span><h3>{t}</h3><p>{['We start with your requirements, architecture and the experience you want to create.', 'Supported functions and connections are assessed for the equipment selected.', 'Product choices are grounded in supplied catalogues and project-specific confirmation.'][i]}</p></Reveal>)}</div></section><ContactCTA /></>;
}
export function About() {
  return <article className="s-about-page"><PageHero label="About Us" title="Thoughtful technology. Effortless living." text="Siddheshwar Smart Technologies brings connected systems and considered design together for homes and professional spaces." image="/about us - hero.png" /><section className="s-section s-container s-editorial"><Reveal className="s-editorial-image" direction="left" distance={64}><SiteImage src="/about us- who we are.png" alt="Contemporary architecture and living space" loading="lazy" width={1000} height={1100} /></Reveal><Reveal direction="right" distance={64} delay={.12}><p className="s-eyebrow">Who we are</p><h2>Connected spaces.<br />Human priorities.</h2><p>We focus on the relationship between people, architecture and technology. A connected space should be comfortable to use and thoughtfully planned from the start.</p><p>Our expertise spans home automation, audio and video, security and safety, networking and lighting. We consider how those systems work together, alongside the details that make a space your own.</p><Action to="/what-we-do" secondary>Explore Our Expertise</Action></Reveal></section><section className="s-section s-graphite"><div className="s-container"><SectionHeading label="What we believe" title="The best technology makes room for living." /><div className="s-capability-grid">{[['Start with people', 'Understand everyday routines, preferences and the purpose of each room.'], ['Respect the architecture', 'Choose interfaces, lighting and integration paths that complement the space.'], ['Connect with purpose', 'Bring systems together where the result makes everyday use clearer and more convenient.']].map(([h, p], i) => { const Icon = [Users, Building2, Link2][i]; return <Reveal key={h} direction={i % 2 ? 'right' : 'left'} delay={i*.08}><Icon className="s-about-card-icon" size={26} strokeWidth={1.5} aria-hidden="true" /><span className="s-index">0{i + 1}</span><h3>{h}</h3><p>{p}</p></Reveal>; })}</div></div></section><section className="s-section s-container"><SectionHeading label="Our approach" title="Listen. Plan. Integrate." text="We begin with a conversation, work through system choices and plan the connections required for the intended experience." /><div className="s-approach">{['Understand the space', 'Define the experience', 'Select compatible systems', 'Coordinate the details'].map((t, i) => { const Icon = [ScanSearch, Sparkles, Settings2, ClipboardCheck][i]; return <Reveal key={t} direction={i % 2 ? 'right' : 'left'} delay={i*.08}><Icon className="s-about-card-icon" size={26} strokeWidth={1.5} aria-hidden="true" /><span>0{i + 1}</span><h3>{t}</h3></Reveal>; })}</div></section><section className="s-section s-container s-team" id="our-team"><p className="s-eyebrow">Our team</p><h2>A conversation with the people<br />behind your connected space.</h2><p>Discuss your priorities with Siddheshwar Smart Technologies and explore a considered approach to your project.</p><Team /><Action to="/contact" secondary>Discuss Your Project</Action></section><ContactCTA /></article>;
}
export function Contact() {
  return <><PageHero label="Contact Us" title="A smarter space starts with a conversation." text="Tell us what you have in mind. We’ll explore the technology, priorities and possibilities together." /><section className="s-section s-container s-contact-grid"><Reveal><p className="s-eyebrow">Get in touch</p><h2>Let’s connect<br />the possibilities.</h2><p>For a new home, a workplace or an existing installation, start with the details that matter to you.</p><ContactDetails /></Reveal><EnquiryForm /></section></>;
}
export function Support() {
  const faqs = [
    ['How do I get help with an existing product?', 'Use the support form or contact us directly. Include the product model, installation location and a description of what you are experiencing.'],
    ['Can you help assess an integration?', 'Share the equipment details and the functions you want to connect. Compatibility needs to be checked against the selected products and installation.'],
    ['What should I include in a service enquiry?', 'Tell us your contact details, the system involved and when the issue occurs. Avoid sharing passwords or other private access credentials.'],
    ['Where can I find product information?', 'Open a product in our catalogue to view supplied details. Where available, a source catalogue link is included in the product overview.'],
  ];
  return <article className="s-support-page"><PageHero label="Support" title="Here to help you stay connected." text="Product questions, installation assistance and service enquiries start with the right information." image="/living/intelligent-spaces-1536.webp" /><section className="s-section s-container"><SectionHeading label="Common questions" title="A little clarity goes a long way." /><div className="s-faq">{faqs.map(([q, a], i) => <Reveal key={q} direction={i % 2 ? 'right' : 'left'} distance={48} delay={i*.04}><details><summary>{q}<span>+</span></summary><p>{a}</p></details></Reveal>)}</div></section><section className="s-section s-container s-contact-grid"><Reveal direction="left" distance={64}><p className="s-eyebrow">Product & service support</p><h2>Tell us what<br />you need.</h2><p>For product assistance, include the model and installation details. For a service enquiry, describe the space and the support you are looking for.</p><ContactDetails /></Reveal><Reveal direction="right" distance={64} delay={.12}><EnquiryForm support /></Reveal></section></article>;
}
