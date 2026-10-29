import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { productGroups } from './product-data';
import { ArrowUpRight } from 'lucide-react';
import ProductShowcase from './ProductShowcase';

export function WhatWeOffer() {
  const reduced = Boolean(useReducedMotion());
  const [opened, setOpened] = useState<string | null>(null);
  return <section id="what-we-offer" className="premium-offer" aria-labelledby="offer-title">
    <div className="mx-auto max-w-[1344px]">
      <motion.div className="premium-offer-heading" initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .7 }}>
        <p>DISCOVER OUR EXPERTISE</p><h2 id="offer-title">What We Offer</h2>
        <div>Intelligent automation. Exceptional lighting. Beautifully connected spaces.</div>
      </motion.div>
      <div className="grid gap-6 md:grid-cols-2">{productGroups.map((group, index) => {
        const title = index === 0 ? 'Home Automation' : 'Lighting';
        return <motion.a key={group.slug} href={`/products/${group.slug}`} className={`premium-offer-card ${opened === group.slug ? 'is-open' : ''}`} onHoverStart={() => setOpened(group.slug)} onHoverEnd={() => setOpened(null)} onFocus={() => setOpened(group.slug)} onBlur={() => setOpened(null)} onClick={event => { if (window.matchMedia('(hover: none)').matches && opened !== group.slug) { event.preventDefault(); setOpened(group.slug); } }} aria-label={`Explore ${title}`} initial={reduced ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} whileHover="hover" whileFocus="hover" viewport={{ once: true, amount: .15 }} transition={{ duration: .75, delay: reduced ? 0 : index * .12 }}>
          <div className="premium-offer-image"><motion.img src={group.image} alt={group.alt} loading="lazy" decoding="async" width={1200} height={1400} variants={{ hover: { scale: reduced ? 1 : 1.05 } }} transition={{ duration: .8 }} /></div>
          <div className="premium-offer-copy"><h3>{title}</h3><div className="premium-offer-details"><p>{group.description}</p><span>Explore {title}<motion.span variants={{ hover: { x: reduced ? 0 : 5 } }}><ArrowUpRight size={20} /></motion.span></span></div></div>
        </motion.a>;
      })}</div>
      <p className="premium-offer-image-note">Product selection is tailored to your project.</p>
    </div>
  </section>;
}

export function HomeProductsPreview() {
  return <ProductShowcase />;
}
