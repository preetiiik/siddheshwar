import { Link, useParams } from 'react-router-dom';
import { Lightbulb, PanelsTopLeft, ShieldCheck, Thermometer, MonitorPlay, House, Check, ArrowRight } from 'lucide-react';
import { Action, ContactCTA, Reveal } from './components';
import { SiteImage } from './Image';
import details from './solution-details.json';
import './solution-details.css';

function AccentTitle({text}:{text:string}) {
 const words=text.split(' '); const end=words.splice(-2).join(' ');
 return <>{words.length>0 && `${words.join(' ')} `}<span className="sd-title-accent">{end}</span></>;
}

const icons = [Lightbulb, PanelsTopLeft, ShieldCheck, Thermometer, MonitorPlay, House];
export default function SolutionDetail() {
 const { slug } = useParams();
 const index = details.findIndex(s => s.slug === slug);
 const solution = details[index];
 if (!solution) return <section className="s-container s-not-found"><h1>Solution not found.</h1><Action to="/solutions">Explore Our Solutions</Action></section>;
 const Icon = icons[index];
 const contact = `/contact?interest=${encodeURIComponent(solution.name)}`;
 return <article className={`sd-page sd-page--${solution.slug}`}>
  <section className="sd-hero" aria-labelledby="solution-title">
   <SiteImage src={solution.images[0]} alt={solution.alts[0]} width={1920} height={1080} fetchPriority="high" />
   <div className="s-container sd-hero-copy"><nav className="sd-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/solutions">Solutions</Link><span>/</span><span>{solution.name}</span></nav><p className="s-eyebrow">{solution.label}</p><h1 id="solution-title"><AccentTitle text={solution.title} /></h1><p>{solution.intro}</p><Action to={contact}>Request Consultation</Action><span className="sd-hero-index">0{index + 1} / INTELLIGENT LIVING</span></div>
  </section>
  <section className={`s-container sd-section sd-overview ${index % 2 ? 'sd-reverse' : ''}`} aria-labelledby="overview-title">
   <Reveal className="sd-overview-photo" direction={index % 2 ? 'right' : 'left'} distance={48}><SiteImage src={solution.images[1]} alt={solution.alts[1]} loading="lazy" width={1000} height={900} /><span><Icon size={24} strokeWidth={1.4} />{solution.name}</span></Reveal>
   <Reveal direction={index % 2 ? 'left' : 'right'} distance={48} delay={.08}><p className="s-eyebrow">OVERVIEW</p><h2 id="overview-title"><AccentTitle text={solution.overviewTitle} /></h2><p className="sd-body">{solution.overview}</p><Action to={contact}>Request Consultation</Action></Reveal>
  </section>
  <section className="sd-features sd-section" aria-labelledby="features-title"><div className="s-container"><Reveal className="sd-heading"><p className="s-eyebrow">THE EVERYDAY DIFFERENCE</p><h2 id="features-title"><AccentTitle text={solution.featureTitle} /></h2></Reveal><div className="sd-feature-grid">{solution.features.map((feature,i)=><Reveal key={feature}><Icon size={30} strokeWidth={1.3} aria-hidden="true" /><span>0{i+1}</span><h3>{feature}</h3></Reveal>)}</div></div></section>
  <section className="s-container sd-section sd-capabilities" aria-labelledby="capabilities-title"><Reveal className="sd-heading"><p className="s-eyebrow">CAPABILITIES</p><h2 id="capabilities-title"><AccentTitle text={solution.capabilityTitle} /></h2></Reveal><div className="sd-capability-grid">{solution.capabilities.map(([title,text],i)=><Reveal key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div></Reveal>)}</div><p className="sd-compatibility">Available functions depend on compatible devices, the selected installation and project configuration.</p></section>
  <section className="sd-process sd-section" aria-labelledby="process-title"><div className="s-container"><Reveal className="sd-heading"><p className="s-eyebrow">HOW IT WORKS</p><h2 id="process-title"><AccentTitle text={solution.processTitle} /></h2></Reveal><ol>{solution.steps.map(([title,text],i)=><li key={title}><Reveal><span className="sd-step-number">0{i+1}</span><ArrowRight size={18} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></Reveal></li>)}</ol></div></section>
  <section className="s-container sd-section sd-showcase" aria-labelledby="showcase-title"><Reveal className="sd-heading"><p className="s-eyebrow">IN FOCUS</p><h2 id="showcase-title"><AccentTitle text={solution.showcaseTitle} /></h2></Reveal><div className="sd-showcase-grid">{[1,2].map(i=><Reveal key={i}><figure><SiteImage src={solution.images[i]} alt={solution.alts[i]} width={1200} height={900} loading="lazy" /><figcaption>{solution.alts[i]}</figcaption></figure></Reveal>)}</div></section>
  <section className="sd-applications sd-section" aria-labelledby="applications-title"><div className="s-container"><Reveal className="sd-heading"><p className="s-eyebrow">APPLICATIONS</p><h2 id="applications-title"><AccentTitle text={solution.applicationsTitle} /></h2></Reveal><ul>{solution.applications.map(item=><li key={item}><Check size={18} strokeWidth={1.5} aria-hidden="true" />{item}</li>)}</ul></div></section>
  <ContactCTA className="sd-final" headingId="final-title" to={contact} />
 </article>;
}
