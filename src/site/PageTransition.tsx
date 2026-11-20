import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';

export default function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || typeof IntersectionObserver === 'undefined') return;
    const root = document.getElementById('main-content');
    if (!root) return;
    const seen = new WeakSet<Element>();
    let index = 0;
    let frame = 0;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        element.classList.add('site-section-enter');
        observer.unobserve(element);
      }
    }, { rootMargin: '0px 0px 80px 0px', threshold: 0 });
    const scan = () => {
      frame = 0;
      root.querySelectorAll<HTMLElement>('section, .s-hero-feature-band').forEach(section => {
        if (seen.has(section)) return;
        seen.add(section);
        // The hero and sticky scroll experiences already have their own motion.
        if (section.matches('.s-hero, .auto-pinned, .s-loading, .s-not-found') || section.querySelector('.auto-pinned')) return;
        section.dataset.sectionMotion = ['up', 'left', 'right', 'zoom', 'down'][index++ % 5];
        observer.observe(section);
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(scan); };
    const mutations = new MutationObserver(schedule);
    mutations.observe(root, { childList: true, subtree: true });
    scan();
    return () => { cancelAnimationFrame(frame); mutations.disconnect(); observer.disconnect(); };
  }, [pathname, reduced]);
  return <motion.div key={pathname} initial={reduced || pathname === '/' ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .35 }}>{children}</motion.div>;
}
