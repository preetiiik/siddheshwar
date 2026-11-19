import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';

export default function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  return <motion.div key={pathname} initial={reduced || pathname === '/' ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .35 }}>{children}</motion.div>;
}
