import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import solutions from './solutions-data';

const featuredSolutions = solutions.filter(solution => solution.featured).sort((a, b) => a.featuredOrder - b.featuredOrder);

export default function HomeSolutions() {
  const reduced = Boolean(useReducedMotion());
  return <section id="solutions" className="home-solutions-split" aria-labelledby="home-solutions-title">
    <aside className="home-solutions-intro">
      <div className="home-services-heading">
        <p className="home-services-eyebrow"><span />Our Solutions</p>
        <h2 id="home-solutions-title" className="luxury-heading">Intelligent Solutions.<br /><span>Modern Living.</span></h2>
        <p className="home-services-subtitle">From the first light of morning to the final moments of your day, discover automation designed around you.</p>
        <a href="/solutions">Explore All Solutions <ArrowUpRight size={14} /></a>
      </div>
    </aside>
    <div className="home-solutions-stories">{featuredSolutions.map((solution) => <article key={solution.slug} className="home-solutions-story"><a href={`/solutions/${solution.slug}`} className="home-solutions-story-link"><motion.div className="home-solutions-image" initial={reduced ? false : { opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduced ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}><img src={solution.image} alt={solution.title} loading="lazy" /><span className="home-solutions-image-action" aria-hidden="true"><ArrowUpRight size={22} /></span></motion.div><div className="home-solutions-story-heading"><h3>{solution.title}</h3></div><p className="home-solutions-story-subtitle">{solution.headline}</p><p className="home-solutions-story-summary">{solution.homeSummary}</p></a></article>)}<div className="home-solutions-end"><p>One connected experience.<br />Endless possibilities.</p><a href="/solutions">View All Solutions <ArrowUpRight size={16} /></a></div></div>
  </section>;
}
