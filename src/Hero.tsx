import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import { useEffect } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const reduced = Boolean(useReducedMotion());
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
    <section id="home" className="cinematic-home" aria-labelledby="cinematic-home-title">
      <motion.img className="cinematic-home-image" src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2400&q=90" alt="Contemporary living room with integrated lighting and connected home comfort" fetchPriority="high" initial={reduced ? false : { scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2, delay: 1.3, ease: 'easeOut' }} />
      <div className="cinematic-home-shade" />
      <motion.div className="cinematic-home-copy" initial={reduced ? false : { opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .9, delay: 1.9 }}>
        <p className="cinematic-home-eyebrow">SIDDHESHWAR SMART TECHNOLOGIES</p>
        <h1 id="cinematic-home-title">Smart spaces.<br /><em>Better living.</em></h1>
        <p className="cinematic-home-description">Thoughtfully connected homes.<br />Designed around the way you live.</p>
        <a className="cinematic-home-cta" href="/solutions">Explore the possibilities <ArrowUpRight size={19} /></a>
      </motion.div>
      <div className="cinematic-home-note">AUTOMATION / LIGHTING / CONNECTED LIVING</div>
      <a className="cinematic-home-scroll" href="#what-we-offer">Scroll to explore <ArrowDown size={17} /></a>
    </section>
  </>;
}
