import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Eye, Target, Lightbulb, SlidersHorizontal, Network, Handshake, Search, PencilRuler, Layers, Sparkles } from 'lucide-react';
import { automationServices } from './automation-data';
import Team from './Team';

const ease = [.22, 1, .36, 1] as const;
const philosophy = [
  { title: 'Design-Led Thinking', description: 'Technology and lighting planned to complement the architecture and character of each space.', Icon: Lightbulb },
  { title: 'Personalized Solutions', description: 'Automation experiences tailored to different lifestyles, spaces and project requirements.', Icon: SlidersHorizontal },
  { title: 'Integrated Approach', description: 'Bringing compatible systems together for convenient, coordinated control.', Icon: Network },
  { title: 'Customer-Centric Experience', description: 'Understanding individual requirements and creating practical, intuitive solutions.', Icon: Handshake },
];
const process = [
  { title: 'Understand', description: 'We explore your space, lifestyle, functional requirements and project goals.', Icon: Search },
  { title: 'Design', description: 'We plan suitable automation and lighting systems around your needs and the architecture of your space.', Icon: PencilRuler },
  { title: 'Integrate', description: 'We bring compatible technologies, products and controls together into a cohesive solution.', Icon: Layers },
  { title: 'Experience', description: 'We focus on creating intuitive environments designed for everyday comfort and convenience.', Icon: Sparkles },
];


function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = Boolean(useReducedMotion());
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: reduced ? 0 : .75, delay: reduced ? 0 : delay, ease }}>{children}</motion.div>;
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <Reveal className="about-section-heading"><p className="about-eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p className="about-description">{description}</p>}</Reveal>;
}

export default function About() {
  const reduced = Boolean(useReducedMotion());
  return <div className="about-page">
    <section className="about-hero" aria-labelledby="about-title">
      <motion.img src={automationServices[6].image} alt="Contemporary living room with layered lighting and full-height windows" width={1800} height={1200} fetchPriority="high" className="about-background-image" initial={reduced ? false : { scale: 1.055 }} animate={{ scale: 1 }} transition={{ duration: reduced ? 0 : 1.8, ease }} />
      <div className="about-hero-shade" />
      <div className="about-inner about-hero-content"><nav aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span aria-current="page">About Us</span></nav><Reveal><p className="about-eyebrow">ABOUT SIDDHESHWAR SMART TECHNOLOGIES</p><h1 id="about-title">Where Technology Meets<br /><span>Timeless Elegance.</span></h1><p className="about-hero-description">We bring together intelligent automation and sophisticated lighting to transform everyday spaces into connected, comfortable and beautifully designed environments.</p></Reveal></div>
    </section>

    <section className="about-section about-who" aria-labelledby="about-who-title"><div className="about-inner about-who-grid">
      <Reveal className="about-story-image"><img src={automationServices[0].image} alt="Architectural lighting integrated into a refined residential interior" width={1200} height={1500} loading="lazy" /><span>THOUGHTFULLY CONNECTED SPACES</span></Reveal>
      <Reveal delay={.1} className="about-story-copy"><p className="about-eyebrow">WHO WE ARE</p><h2 id="about-who-title">Smarter Spaces.<br /><span>Better Living.</span></h2><p>Siddheshwar Smart Technologies focuses on bringing together smart automation and architectural lighting solutions for residential and commercial environments.</p><p>We believe technology should simplify everyday life while complementing the beauty and functionality of a space.</p><p>Our approach combines thoughtful planning, intelligent control and design-conscious lighting to create environments that feel effortless and intuitive.</p></Reveal>
    </div></section>

    <section className="about-section about-surface" aria-labelledby="about-purpose-title"><div className="about-inner"><Reveal><p className="about-eyebrow">A SHARED PURPOSE</p><h2 id="about-purpose-title" className="about-purpose-title">Looking ahead.<br /><span>Making everyday better.</span></h2></Reveal><div className="about-purpose-grid">{[
      { title: 'Our Vision', Icon: Eye, description: 'To make intelligent, beautifully integrated automation and lighting an essential part of modern spaces, creating environments that are more comfortable, efficient and connected.' },
      { title: 'Our Mission', Icon: Target, description: 'To deliver thoughtfully designed automation and lighting solutions that combine reliable technology, personalized functionality and exceptional user experiences.' },
    ].map(({ title, Icon, description }, index) => <Reveal key={title} delay={index * .1}><article className="about-purpose-card"><Icon size={28} strokeWidth={1.25} aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article></Reveal>)}</div></div></section>

    <section className="about-section"><div className="about-inner"><SectionHeading eyebrow="OUR EXPERTISE" title="Two Disciplines. One Seamless Experience." description="Intelligent automation and thoughtfully designed lighting, working together to create exceptional spaces." /><div className="about-expertise-grid">{[
      { title: 'Smart Automation', description: 'Intelligent control of lighting, curtains, climate, personalized scenes and compatible building systems.', action: 'Explore Automation', href: '/products/automation', image: automationServices[6].image, alt: 'Modern residential interior designed for connected comfort' },
      { title: 'Architectural & Decorative Lighting', description: 'Carefully considered lighting solutions that enhance the atmosphere, functionality and character of every space.', action: 'Explore Lighting', href: '/products/lighting', image: automationServices[0].image, alt: 'Architectural lighting in an elegant home interior' },
    ].map((item, index) => <Reveal key={item.href} delay={index * .1}><a href={item.href} className="about-expertise-card"><img src={item.image} alt={item.alt} width={1000} height={1200} loading="lazy" /><div className="about-expertise-shade" /><div className="about-expertise-copy"><h3>{item.title}</h3><p>{item.description}</p><span>{item.action}<ArrowUpRight size={19} /></span></div></a></Reveal>)}</div></div></section>

    <section className="about-section about-surface"><div className="about-inner"><SectionHeading eyebrow="WHAT DRIVES US" title="Built Around Your Experience." /><div className="about-value-grid">{philosophy.map(({ title, description, Icon }, index) => <Reveal key={title} delay={index * .07}><article className="about-value-card"><Icon size={27} strokeWidth={1.25} aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article></Reveal>)}</div></div></section>

    <section id="our-approach" className="about-section"><div className="about-inner"><SectionHeading eyebrow="HOW WE WORK" title="From Concept to Connected Living." description="A thoughtful approach to creating intelligent, functional and beautifully integrated environments." /><ol className="about-process">{process.map(({ title, description, Icon }, index) => <li key={title}><Reveal delay={index * .1}><div className="about-process-marker"><span>{String(index + 1).padStart(2, '0')}</span><Icon size={22} strokeWidth={1.3} aria-hidden="true" /></div><h3>{title}</h3><p>{description}</p></Reveal></li>)}</ol></div></section>



    <Team />

    <section className="about-closing" aria-labelledby="about-closing-title"><img src={automationServices[2].image} alt="" loading="lazy" width={1600} height={1000} className="about-background-image" /><div className="about-closing-shade" /><Reveal className="about-inner about-closing-content"><p className="about-eyebrow">YOUR NEXT SPACE</p><h2 id="about-closing-title">Let's Create a Smarter<br /><span>Space Together.</span></h2><p>Discover how intelligent automation and thoughtfully designed lighting can transform your next project.</p><a href="/contact" className="about-contact-link">Discuss Your Project<ArrowUpRight size={19} /></a></Reveal></section>
  </div>;
}
