import { useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, CircleCheck } from 'lucide-react';
import { spaces, findSpace, getSpaceSolutions, getSpaceProducts, type Space } from './spaces-data';
import { SolutionCard } from './SolutionCards';
import { ProductGrid } from './Products';

const ease = [.22,1,.36,1] as const;
function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
 const reduced = Boolean(useReducedMotion());
 return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: reduced ? 0 : .7, delay: reduced ? 0 : delay, ease }}>{children}</motion.div>;
}
function SpaceImage({ space, eager = false }: { space: Space; eager?: boolean }) {
 const [missing,setMissing] = useState(false);
 return missing ? <div className="solution-image-placeholder" role="img" aria-label={`Image pending for ${space.title}`}><span>ARCHITECTURAL IMAGE</span><p>Image to be added</p></div> : <img src={space.image} alt={space.imageAlt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" width={1600} height={1100} onError={() => setMissing(true)} />;
}
function SpaceGrid({ items, compact = false, featured = false }: { items: Space[]; compact?: boolean; featured?: boolean }) {
 return <div className={`space-grid ${compact ? 'space-grid-compact' : ''}`}>{items.map((space,index) => <Reveal key={space.id} delay={(index % 4) * .07}><a className="space-card" href={`/spaces/${space.slug}`}><div className="space-card-image"><SpaceImage space={space} /></div><div className="space-card-copy"><h3>{space.title}</h3>{!compact && <p>{featured ? space.homeDescription : space.shortDescription}</p>}<span>Explore Space<ArrowUpRight size={18} /></span></div></a></Reveal>)}</div>;
}
export function FeaturedSpaces() {
 const featured = spaces.filter(space => space.featured).sort((a,b) => a.featuredOrder-b.featuredOrder);
 return <section id="spaces" className="solution-section spaces-section" aria-labelledby="featured-spaces-title"><div className="solution-inner"><Reveal className="solution-section-heading"><p className="solution-eyebrow">WHERE INNOVATION COMES TO LIFE</p><h2 id="featured-spaces-title">Spaces We Transform</h2><p>From private residences to commercial environments, discover intelligent automation and lighting solutions designed around the unique needs of every space.</p></Reveal><SpaceGrid items={featured} featured /><a href="/spaces" className="spaces-view-all">View All Spaces<ArrowUpRight size={18} /></a></div></section>;
}
function SpaceHero({ space }: { space?: Space }) {
 return <section className="solutions-hero" aria-labelledby="space-title"><div className="solutions-hero-image"><SpaceImage space={space ?? spaces[0]} eager /></div><div className="solutions-hero-shade" /><div className="solution-inner solutions-hero-content"><nav aria-label="Breadcrumb"><a href="/">Home</a><span>/</span>{space ? <><a href="/spaces">Spaces</a><span>/</span><span aria-current="page">{space.title}</span></> : <span aria-current="page">Spaces</span>}</nav><Reveal><p className="solution-eyebrow">SPACES WE TRANSFORM</p><h1 id="space-title">{space ? space.slug === 'luxury-villas' ? 'Intelligent Living for Luxury Villas' : space.title : <>Intelligent Spaces.<br /><span>Exceptional Experiences.</span></>}</h1><p>{space ? space.slug === 'luxury-villas' ? 'Transform every corner of your villa with thoughtfully integrated automation, personalized lighting and intuitive controls.' : space.shortDescription : 'Explore how thoughtfully integrated automation and lighting solutions can enhance residential, hospitality and commercial environments.'}</p></Reveal></div></section>;
}
function SpaceEnquiry({ space }: { space?: Space }) {
 return <section className="solution-section solution-enquiry"><Reveal className="solution-inner"><p className="solution-eyebrow">YOUR SPACE. YOUR POSSIBILITIES.</p><h2>Let's Design Your<br /><span>Intelligent Space.</span></h2><p>Explore automation and lighting possibilities tailored to your project.</p><a className="solution-enquiry-button" href={space ? `/contact?interest=${encodeURIComponent(space.title)}#contact` : '/contact'}>Discuss Your Project<ArrowUpRight size={19} /></a></Reveal></section>;
}
export default function SpacesPage({ slug }: { slug?: string }) {
 const space = slug ? findSpace(slug) : undefined;
 if (slug && !space) return <section className="px-6 pb-32 pt-56 text-center"><h1 className="luxury-heading text-5xl">Space not found</h1><a href="/spaces" className="mt-8 inline-block text-[#1e3a8a]">View All Spaces</a></section>;
 return <div className="solutions-page spaces-page"><SpaceHero space={space} />{space ? <>
   <section className="solution-section"><div className="solution-inner solution-overview-layout"><Reveal><p className="solution-eyebrow">DESIGNED AROUND YOUR ENVIRONMENT</p><h2>About This Space</h2></Reveal><Reveal>{space.fullDescription.split('\n\n').map(paragraph => <p key={paragraph} className="solution-overview-paragraph">{paragraph}</p>)}</Reveal></div></section>
   <section className="solution-section solution-surface"><div className="solution-inner"><Reveal className="solution-section-heading"><p className="solution-eyebrow">RECOMMENDED SOLUTIONS</p><h2>Solutions Designed for Your Space</h2></Reveal><div className="solution-grid">{getSpaceSolutions(space).map((solution,index) => <SolutionCard key={solution.id} solution={solution} index={index} />)}</div></div></section>
   <section className="solution-section"><div className="solution-inner"><Reveal className="solution-section-heading"><p className="solution-eyebrow">RELATED PRODUCTS</p><h2>Products That Bring It Together</h2><p>Selected from the recommended solutions for this space. Final models and compatibility are confirmed during project planning.</p></Reveal><ProductGrid products={getSpaceProducts(space)} dark actionLabel="View Product" /></div></section>
   <section className="solution-section solution-surface"><div className="solution-inner"><Reveal className="solution-section-heading"><p className="solution-eyebrow">THOUGHTFUL EVERYDAY BENEFITS</p><h2>Designed for the Way You Use It</h2></Reveal><div className="solution-benefit-grid">{space.benefits.map((benefit,index) => <Reveal key={benefit} delay={index*.07}><article className="solution-benefit-card"><CircleCheck size={26} strokeWidth={1.3} aria-hidden="true" /><h3>{benefit}</h3></article></Reveal>)}</div></div></section>
 </> : <section className="solution-section"><div className="solution-inner"><Reveal className="solution-section-heading"><p className="solution-eyebrow">EXPLORE BY SPACE</p><h2>Designed for Every Kind of Space.</h2></Reveal><SpaceGrid items={spaces} /></div></section>}<SpaceEnquiry space={space} /></div>;
}
