import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { productGroups } from './product-data';

const slides = productGroups.map(group => ({ ...group,
  heading: group.slug === 'akubela' ? ['Akubela.', 'Connected living.'] : group.slug === 'automation' ? ['Smart control.', 'Every day.'] : ['Beautiful light.', 'Every space.'],
}));

export default function Hero() {
  const reduced = Boolean(useReducedMotion());
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const slide = slides[active];
  const move = (direction: number) => setActive(index => (index + direction + slides.length) % slides.length);

  useEffect(() => {
    if (reduced || paused || hovered || focused) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % slides.length), 7000);
    return () => window.clearInterval(timer);
  }, [reduced, paused, hovered, focused, active]);
  const progress = useMotionValue(0);
  const counter = useTransform(progress, value => Math.round(value).toString().padStart(3, '0'));
  const bar = useTransform(progress, [0, 100], ['0%', '100%']);

  useEffect(() => {
    if (reduced) return;
    const animation = animate(progress, 100, { duration: 1.15, ease: 'easeInOut' });
    return () => animation.stop();
  }, [progress, reduced]);

  return <>
    {!reduced && <motion.div className="home-entrance" aria-hidden="true" initial={{ y: 0, borderRadius: '0 0 0% 0%' }} animate={{ y: '-110%', borderRadius: '0 0 50% 50%' }} transition={{ duration: 1.15, delay: 1.3, ease: [0.76, 0, 0.24, 1] }}>
      <motion.div className="home-entrance-brand" animate={{ opacity: 0 }} transition={{ delay: 1.15, duration: .3 }}><img src="/logo.png" alt="" width={1212} height={601} /><div className="home-entrance-progress"><motion.div style={{ width: bar }} /></div><motion.span>{counter}</motion.span></motion.div>
    </motion.div>}
    <section id="home" className="cinematic-home product-hero" aria-label="Product categories" aria-roledescription="carousel" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }} onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1); } }}>
      {slides.map((item, index) => <motion.img key={item.slug} className={`cinematic-home-image product-hero-image product-hero-image--${item.slug}`} src={item.image} alt={item.alt} aria-hidden={active !== index} fetchPriority={index === 0 ? 'high' : 'auto'} initial={false} animate={{ opacity: active === index ? 1 : 0, scale: active === index ? 1 : 1.04 }} transition={{ duration: reduced ? 0 : .8 }} />)}
      <div className="cinematic-home-shade" />
      <motion.div className="cinematic-home-copy" initial={reduced ? false : { opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .9, delay: 1.9 }}>
        <p className="cinematic-home-eyebrow">SIDDHESHWAR SMART TECHNOLOGIES / {slide.title}</p>
        <h1 id="cinematic-home-title">{slide.heading[0]}<br /><em>{slide.heading[1]}</em></h1>
        <p className="cinematic-home-description">{slide.description}</p>
        <a className="cinematic-home-cta" href={`/products/${slide.slug}`}>Explore {slide.title} <ArrowUpRight size={19} /></a>
      </motion.div>
      <div className="product-hero-controls">
        <div className="product-hero-selectors" aria-label="Choose a product category">{slides.map((item, index) => <button key={item.slug} type="button" aria-label={`Show ${item.title}`} aria-pressed={active === index} onClick={() => setActive(index)}><span>0{index + 1}</span>{item.title}</button>)}</div>
        <div className="product-hero-arrows"><span className="product-hero-count" aria-live={paused || focused || hovered || reduced ? 'polite' : 'off'}>{String(active + 1).padStart(2, '0')} / 03</span><button type="button" onClick={() => move(-1)} aria-label="Previous product category"><ChevronLeft size={20} /></button><button type="button" onClick={() => move(1)} aria-label="Next product category"><ChevronRight size={20} /></button>{!reduced && <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Play carousel' : 'Pause carousel'}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>}</div>
      </div>
    </section>
  </>;
}
