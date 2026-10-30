import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { ArrowUpRight, Circle, Code, Grid3X3, Layers, Sun, Waves, Zap } from 'lucide-react';
import { automationProducts, lightingProducts, productHref, type Product, type ProductCategory } from './product-data';

const ease = [.22, 1, .36, 1] as const;
const floatingSquares = [[6,20,12],[12,32,8],[8,44,6],[88,18,10],[92,30,14],[85,42,7],[90,52,5],[14,56,5]];
const magneticPositions = [
  [[5,30,16],[10,42,10],[3,52,7],[80,70,14],[85,82,9],[78,60,6]],
  [[82,55,16],[88,68,10],[78,72,7],[85,42,6],[90,80,8]],
  [[4,24,16],[10,36,10],[2,44,7],[78,78,14],[84,88,8]],
  [[82,26,14],[88,38,10],[78,44,7],[84,54,5],[90,60,8]],
];
const marqueeItems = [
  { name: 'Touch Controls', Icon: Grid3X3 }, { name: 'Smart Scenes', Icon: Layers },
  { name: 'Climate Control', Icon: Waves }, { name: 'Connected Living', Icon: ArrowUpRight },
  { name: 'Architectural Lighting', Icon: Sun }, { name: 'DALI Control', Icon: Code },
  { name: 'Energy Management', Icon: Zap }, { name: 'Presence Sensing', Icon: Circle },
];

function FloatingSquare({ position, index, progress, reduced }: { position: number[]; index: number; progress: MotionValue<number>; reduced: boolean }) {
  const offset = useTransform(progress, [0, 1], [0, -(80 + index * 30)]);
  const y = useSpring(offset, { stiffness: 40, damping: 20 });
  return <motion.div className="absolute" style={{ left: `${position[0]}%`, top: `${position[1]}%`, y: reduced ? 0 : y }}><motion.div className="bg-black" style={{ width: position[2], height: position[2] }} animate={reduced ? undefined : { y: [0, -10, 0] }} transition={{ duration: 3 + index * .4, repeat: Infinity, ease: 'easeInOut', delay: index * .3 }} /></motion.div>;
}

function MagneticSquare({ position, pointerX, pointerY, reduced }: { position: number[]; pointerX: MotionValue<number>; pointerY: MotionValue<number>; reduced: boolean }) {
  const offsetX = useTransform(pointerX, value => (value - .5) * 40);
  const offsetY = useTransform(pointerY, value => (value - .5) * 40);
  const x = useSpring(offsetX, { stiffness: 80, damping: 18, mass: .6 });
  const y = useSpring(offsetY, { stiffness: 80, damping: 18, mass: .6 });
  return <motion.span className="absolute bg-black" style={{ left: `${position[0]}%`, top: `${position[1]}%`, width: position[2], height: position[2], x: reduced ? 0 : x, y: reduced ? 0 : y }} />;
}

function ShowcaseCard({ product, index }: { product: Product; index: number }) {
  const reduced = Boolean(useReducedMotion());
  const [active, setActive] = useState(false);
  const pointerX = useMotionValue(.5);
  const pointerY = useMotionValue(.5);
  return <motion.a href={productHref(product)} className="case-product-card group relative block aspect-[4/3] overflow-hidden" onMouseEnter={() => setActive(true)} onMouseLeave={() => { setActive(false); pointerX.set(.5); pointerY.set(.5); }} onFocus={() => setActive(true)} onBlur={() => setActive(false)} onMouseMove={event => { if (reduced) return; const bounds = event.currentTarget.getBoundingClientRect(); pointerX.set((event.clientX - bounds.left) / bounds.width); pointerY.set((event.clientY - bounds.top) / bounds.height); }} initial={reduced ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .7, delay: reduced ? 0 : index * .1, ease }}>
    <img src={product.image} alt={product.alt} loading="lazy" decoding="async" width={800} height={600} className="absolute inset-0 h-full w-full object-cover" />
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">{Array.from({ length: 96 }, (_, block) => { const row = Math.floor(block / 12); const col = block % 12; return <motion.span key={block} className="absolute bg-black/80" style={{ left: `${col * 100 / 12}%`, top: `${row * 100 / 8}%`, width: '8.4%', height: '12.6%' }} initial={false} animate={{ scale: active ? 1 : 0, opacity: active ? 1 : 0 }} transition={{ duration: reduced ? 0 : .25, delay: reduced ? 0 : active ? (row + col) * .018 : ((8 - row) + (12 - col)) * .012, ease }} />; })}</div>
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">{magneticPositions[index % 4].map((position, i) => <MagneticSquare key={i} position={position} pointerX={pointerX} pointerY={pointerY} reduced={reduced} />)}</div>
    <span aria-hidden="true" className="absolute right-4 top-4 z-10 flex h-7 w-7 items-center justify-center border border-white/30 text-xs text-white">+</span>
    <motion.div className="case-product-hover-copy" initial={false} animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }} transition={{ duration: reduced ? 0 : .3, delay: active && !reduced ? .18 : 0, ease }}><p>{product.shortDescription}</p><span>Explore Product <ArrowUpRight size={18} /></span></motion.div>
    <div className="case-product-plate absolute bottom-0 left-0 z-20 bg-white text-[#1e3a8a]"><h3>{product.name}</h3><div><span>{product.category === 'automation' ? 'Automation Products' : 'Lighting Category'}</span></div></div>
  </motion.a>;
}

export default function ProductShowcase() {
  const section = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [category, setCategory] = useState<ProductCategory>('automation');
  const reduced = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({ target: section, offset: ['start end', 'end start'] });
  const categories: ProductCategory[] = ['automation', 'lighting'];
  const items = category === 'automation' ? automationProducts.slice(0, 4) : lightingProducts;
  return <section ref={section} id="products" className="case-products relative bg-white text-slate-800" aria-labelledby="products-title">
    <div className="relative px-6 pb-10 pt-10 sm:px-10 lg:px-16 lg:pt-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">{floatingSquares.map((position, index) => <FloatingSquare key={index} position={position} index={index} progress={scrollYProgress} reduced={reduced} />)}</div>
      <motion.div className="relative mx-auto max-w-7xl text-center" initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .7, ease }}><p className="mb-5 text-xs uppercase tracking-[.25em] text-[#1e3a8a]">CURATED FOR INTELLIGENT LIVING</p><h2 id="products-title" className="luxury-heading text-4xl font-semibold leading-tight text-[#1e3a8a] md:text-6xl">Explore Our Products</h2><p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-slate-600">Intelligent controls and thoughtful lighting for beautifully connected spaces.</p></motion.div>
    </div>
    <div className="mx-auto max-w-7xl px-6 pb-16 sm:px-10 lg:px-16">
      <div role="tablist" aria-label="Product categories" className="case-product-tabs">{categories.map((item, index) => <button key={item} ref={element => { tabs.current[index] = element; }} type="button" role="tab" id={`product-tab-${item}`} aria-controls={`product-panel-${item}`} aria-selected={category === item} tabIndex={category === item ? 0 : -1} onClick={() => setCategory(item)} onKeyDown={event => { let next: number; if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') next = 1 - index; else if (event.key === 'Home') next = 0; else if (event.key === 'End') next = 1; else return; event.preventDefault(); setCategory(categories[next]); tabs.current[next]?.focus(); }}>{item === 'automation' ? 'Automation' : 'Lighting'}</button>)}</div>
      <AnimatePresence mode="wait" initial={false}><motion.div key={category} role="tabpanel" id={`product-panel-${category}`} aria-labelledby={`product-tab-${category}`} tabIndex={0} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .2, ease }}><div className="grid gap-4 md:grid-cols-2">{items.map((product, index) => <ShowcaseCard key={product.id} product={product} index={index} />)}</div><div className="case-product-view-all"><span>Explore lighting and automation selected around your project.</span><a href={`/products/${category}`}>View All {category === 'automation' ? 'Automation' : 'Lighting'} Products <ArrowUpRight size={17} /></a></div></motion.div></AnimatePresence>
    </div>
    <div className="mx-auto max-w-7xl px-6 pb-6 sm:px-10 lg:px-16"><div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between"><div className="max-w-md"><span aria-hidden="true" className="mb-4 flex h-7 w-7 items-center justify-center border border-black/20 text-xs">+</span><p className="text-sm leading-8 text-slate-600">Bring intelligent controls and thoughtful lighting together in one connected space. Explore compatible products with our team and plan a selection around your everyday needs.</p><a href="/contact" className="group mt-6 inline-flex items-end"><span className="inline-flex items-center gap-[10px] bg-[#93c5fd] px-6 py-4 text-xs font-semibold uppercase tracking-widest text-[#172554] transition-colors group-hover:bg-[#bfdbfe]">Let?s plan your space</span><span className="mb-6 flex h-6 w-6 items-center justify-center bg-[#1e3a8a] text-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:mb-9"><ArrowUpRight size={16} /></span></a></div><div className="min-w-0 flex-1 overflow-hidden border-t border-black/10 md:ml-12 md:border-0"><div className="case-product-marquee overflow-hidden py-5" aria-label="Touch controls, smart scenes, climate control, connected living, architectural lighting, DALI control, energy management, presence sensing"><div className="marquee-projects flex w-max" aria-hidden="true">{[0,1].map(copy => <div className="flex shrink-0" key={copy}>{marqueeItems.map(({ name, Icon }) => <div key={name} className="flex shrink-0 items-center gap-2.5 px-8"><Icon size={21} strokeWidth={1.7} /><span className="whitespace-nowrap text-sm font-medium tracking-wide text-black/80">{name}</span></div>)}</div>)}</div></div></div></div></div>
    <div className="h-12" />
  </section>;
}
