import { Link } from 'react-router-dom';
import { ArrowUpRight, Lightbulb, PanelsTopLeft, Thermometer, MonitorPlay } from 'lucide-react';
import { SiteImage } from './Image';
import { Reveal } from './components';
import './solutions-bento.css';
const cards = [
 { title:'Smart Lighting', description:'Set the perfect ambience with intelligent lighting scenes, dimming and scheduled control.', image:'/solutions/S2.png', to:'/solutions/intelligent-lighting-automation', Icon:Lightbulb },
 { title:'Smart Curtains', description:'Control privacy, daylight and comfort with smooth automated curtain solutions.', image:'/solutions/S4.png', to:'/solutions/curtain-blind-automation', Icon:PanelsTopLeft },
 { title:'Smart Climate Control', description:'Maintain ideal temperature and comfort with smart AC and climate management.', image:'/solutions/S5.png', to:'/solutions/climate-hvac-automation', Icon:Thermometer },
 { title:'Smart Entertainment', description:'Enjoy effortless control of TV, audio and media for a connected entertainment experience.', image:'/movie%20time.png.jpeg', to:'/solutions/smart-entertainment', Icon:MonitorPlay },
];
export default function OurSolutions() {
 return <section className="s-solutions-bento s-section" aria-labelledby="our-solutions-title"><div className="s-container">
  <Reveal className="s-section-heading"><p className="s-eyebrow">OUR SOLUTIONS</p><h2 id="our-solutions-title">Smart <span>ecosystem</span></h2><p>Integrated solutions that bring comfort, convenience, security and elegance to every space.</p></Reveal>
  <div className="s-bento-grid">{[cards[0],cards[2],cards[1],cards[3]].map(({title,description,image,to,Icon},index)=><Reveal key={title} className="s-bento-reveal" delay={index%4*.05}><Link className="s-bento-card" to={to}>
   <SiteImage src={image} alt={`${title} in a contemporary interior`} loading="lazy" decoding="async" width={600} height={550} />
   <div className="s-bento-copy"><span className="s-bento-icon"><Icon size={21} strokeWidth={1.45} aria-hidden="true" /></span><span className="s-bento-number">{String(index+1).padStart(2,'0')}</span><h3>{title}</h3><p>{description}</p></div><span className="s-bento-arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
  </Link></Reveal>)}</div>
  <div className="s-bento-footer"><Link className="s-bento-all-solutions" to="/solutions">EXPLORE SOLUTIONS<ArrowUpRight size={16} aria-hidden="true" /></Link></div>
 </div></section>;
}
