import { useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { Solution } from './solutions-data';
const ease = [.22,1,.36,1] as const;
function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = Boolean(useReducedMotion());
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: reduced ? 0 : .7, delay: reduced ? 0 : delay, ease }}>{children}</motion.div>;
}

export function SolutionImage({ solution, eager = false }: { solution: Solution; eager?: boolean }) {
  const [missing, setMissing] = useState(false);
  return missing ? <div className="solution-image-placeholder" role="img" aria-label={`Architectural image pending for ${solution.title}`}><span>ARCHITECTURAL IMAGERY</span><p>Image to be added</p></div> : <img src={solution.image} alt={`Illustrative architectural setting for ${solution.title.toLowerCase()}`} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" width={1600} height={1100} onError={() => setMissing(true)} />;
}

export function SolutionCard({ solution, index = 0 }: { solution: Solution; index?: number }) {
  return <Reveal delay={(index % 3) * .08} className="solution-card-reveal"><a href={`/solutions/${solution.slug}`} className="solution-card"><div className="solution-card-image"><SolutionImage solution={solution} /></div><div className="solution-card-copy"><p className="solution-card-category">{solution.category}</p><h3>{solution.title}</h3><p>{solution.shortDescription}</p><span>Explore Solution<ArrowUpRight size={18} /></span></div></a></Reveal>;
}

