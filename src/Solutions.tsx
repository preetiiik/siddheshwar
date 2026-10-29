import { useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ChevronDown, SlidersHorizontal, Sparkles, Layers, CircleCheck, MapPin } from 'lucide-react';
import solutions, { findSolution, getRelatedSolutions, type Solution, type SolutionCategory } from './solutions-data';
import HomeSolutions from './HomeSolutions';
import { ProductGrid } from './Products';
import { getProductsForSolution } from './solution-products';
import { SolutionImage, SolutionCard } from './SolutionCards';

const ease = [.22, 1, .36, 1] as const;
const benefitIcons = [SlidersHorizontal, Sparkles, Layers, CircleCheck];

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = Boolean(useReducedMotion());
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: reduced ? 0 : .7, delay: reduced ? 0 : delay, ease }}>{children}</motion.div>;
}

export function SolutionsMenu({ mobile = false, active = false }: { mobile?: boolean; active?: boolean }) {
  const path = window.location.pathname.replace(/\/+$/, '');
  return <details className={`relative ${mobile ? '' : 'solutions-menu'}`}><summary className={`flex cursor-pointer list-none items-center gap-2 border-b py-2 text-xs uppercase tracking-widest hover:text-[#1e3a8a] ${active ? 'border-[#93c5fd] text-[#1e3a8a]' : 'border-transparent text-slate-800'}`}>Solutions<ChevronDown size={14} /></summary><div className={mobile ? 'mt-4 grid gap-3 border-l border-[#93c5fd]/30 pl-4' : 'absolute left-0 top-full mt-4 grid max-h-[70vh] w-80 gap-1 overflow-y-auto border border-slate-300/10 bg-[#eef4fb] p-3 shadow-2xl'}><a href="/solutions" className="px-3 py-2 text-sm text-[#1e3a8a]">All Solutions</a>{solutions.map(solution => <a key={solution.id} href={`/solutions/${solution.slug}`} aria-current={path === `/solutions/${solution.slug}` ? 'page' : undefined} className="px-3 py-2 text-sm text-slate-800 hover:bg-slate-900/5">{solution.title}</a>)}</div></details>;
}

export function SolutionsOverview({ home = false }: { home?: boolean }) {
  if (home) return <HomeSolutions />;
  return <SolutionsExplorer />;
}

function SolutionsExplorer() {
  const [filter, setFilter] = useState<'All Solutions' | SolutionCategory>('All Solutions');
  const filters = ['All Solutions', 'Residential', 'Lighting', 'Commercial'] as const;
  const visible = filter === 'All Solutions' ? solutions : solutions.filter(solution => solution.category === filter);
  return <section id="explore-solutions" className="solution-section" aria-labelledby="explore-solutions-title"><div className="solution-inner"><Reveal className="solution-section-heading"><p className="solution-eyebrow">EXPLORE WHAT'S POSSIBLE</p><h2 id="explore-solutions-title">Solutions Designed<br /><span>Around Your Space.</span></h2><p>From intelligent homes to commercial environments, explore solutions that bring automation, lighting and thoughtful design together.</p></Reveal><div className="solution-filter-row"><div className="solution-filters" role="group" aria-label="Filter solutions by category">{filters.map(item => <button key={item} type="button" aria-pressed={filter === item} aria-controls="solutions-list" onClick={() => setFilter(item)}>{item}</button>)}</div><p role="status">{visible.length} {visible.length === 1 ? 'solution' : 'solutions'}</p></div><div id="solutions-list" key={filter} className="solution-grid">{visible.map((solution, index) => <SolutionCard key={solution.id} solution={solution} index={index} />)}</div></div></section>;
}

function SolutionsHero({ solution }: { solution?: Solution }) {
  const reduced = Boolean(useReducedMotion());
  return <section className="solutions-hero" aria-labelledby="solutions-title"><motion.div className="solutions-hero-image" initial={reduced ? false : { scale: 1.045 }} animate={{ scale: 1 }} transition={{ duration: reduced ? 0 : 1.8, ease }}><SolutionImage solution={solution ?? solutions[0]} eager /></motion.div><div className="solutions-hero-shade" /><div className="solution-inner solutions-hero-content"><nav aria-label="Breadcrumb"><a href="/">Home</a><span>/</span>{solution ? <><a href="/solutions">Solutions</a><span>/</span><span aria-current="page">{solution.title}</span></> : <span aria-current="page">Solutions</span>}</nav><Reveal><p className="solution-eyebrow">{solution ? `${solution.category.toUpperCase()} SOLUTIONS` : 'OUR SOLUTIONS'}</p><h1 id="solutions-title">{solution ? solution.title : <>Intelligent Solutions for<br /><span>Extraordinary Spaces.</span></>}</h1><p>{solution?.shortDescription ?? 'Discover thoughtfully integrated automation and lighting solutions designed to enhance comfort, convenience, efficiency and the way you experience every space.'}</p></Reveal></div></section>;
}

function SolutionEnquiry({ solution }: { solution?: Solution }) {
  return <section className="solution-section solution-enquiry"><Reveal className="solution-inner"><p className="solution-eyebrow">LET'S TALK ABOUT YOUR SPACE</p><h2>Ready to Transform<br /><span>Your Space?</span></h2><p>Let's explore the right automation and lighting solution for your project.</p><a className="solution-enquiry-button" href={solution ? `/contact?interest=${encodeURIComponent(solution.title)}#contact` : '/contact'}>{solution ? 'Enquire About This Solution' : 'Discuss Your Project'}<ArrowUpRight size={19} /></a></Reveal></section>;
}

function SolutionDetail({ solution }: { solution: Solution }) {
  const related = getRelatedSolutions(solution);
  return <>
    <SolutionsHero solution={solution} />
    <section className="solution-section"><div className="solution-inner solution-overview-layout"><Reveal><p className="solution-eyebrow">DESIGNED AROUND YOUR SPACE</p><h2>About This Solution</h2></Reveal><Reveal delay={.1}>{solution.fullDescription.split('\n\n').map(paragraph => <p className="solution-overview-paragraph" key={paragraph}>{paragraph}</p>)}</Reveal></div></section>
    <section className="solution-section solution-surface"><div className="solution-inner"><Reveal className="solution-section-heading"><p className="solution-eyebrow">EVERYDAY ADVANTAGES</p><h2>Key Benefits</h2></Reveal><div className="solution-benefit-grid">{solution.benefits.map((benefit, index) => { const Icon = benefitIcons[index % benefitIcons.length]; return <Reveal key={benefit} delay={index * .07}><article className="solution-benefit-card"><Icon size={26} strokeWidth={1.3} aria-hidden="true" /><h3>{benefit}</h3></article></Reveal>; })}</div></div></section>
    <section className="solution-section"><div className="solution-inner solution-applications-layout"><Reveal><p className="solution-eyebrow">WHERE IT WORKS</p><h2>Applications</h2><p className="solution-muted-copy">Planned around the character of each space and the people who use it.</p></Reveal><ul className="solution-applications">{solution.applications.map((application, index) => <li key={application}><Reveal delay={index * .06}><MapPin size={17} strokeWidth={1.5} aria-hidden="true" /><span>{application}</span></Reveal></li>)}</ul></div></section>
    <section className="solution-section solution-surface" aria-labelledby="solution-products-title"><div className="solution-inner"><Reveal className="solution-section-heading"><p className="solution-eyebrow">SELECTED FOR THIS APPLICATION</p><h2 id="solution-products-title">Products Used in This Solution</h2><p>These product combinations are proposed applications, not confirmed installed systems. Final models, compatibility and supported functions are confirmed for your project.</p></Reveal><ProductGrid products={getProductsForSolution(solution)} actionLabel="View Product" dark /></div></section>
    <section className="solution-section"><div className="solution-inner"><Reveal className="solution-section-heading"><p className="solution-eyebrow">EXPLORE MORE</p><h2>Related Solutions</h2></Reveal><div className="solution-grid">{related.map((item, index) => <SolutionCard key={item.id} solution={item} index={index} />)}</div></div></section>
    <SolutionEnquiry solution={solution} />
  </>;
}

export function SolutionsPage({ slug }: { slug?: string }) {
  const solution = slug ? findSolution(slug) : undefined;
  if (slug && !solution) return <section className="px-6 pb-32 pt-56 text-center"><h1 className="luxury-heading text-5xl">Solution not found</h1><p className="my-8 text-slate-600">Explore our solutions to find the right fit for your space.</p><a href="/solutions" className="inline-flex min-h-11 items-center gap-4 bg-[#93c5fd] px-6 py-4 text-sm text-[#172554]">All Solutions<ArrowUpRight size={18} /></a></section>;
  return <div className="solutions-page">{solution ? <SolutionDetail solution={solution} /> : <><SolutionsHero /><SolutionsExplorer /><SolutionEnquiry /></>}</div>;
}
