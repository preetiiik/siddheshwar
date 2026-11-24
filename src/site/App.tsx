import { resolveProduct } from './product-detail-data';
import PageTransition from './PageTransition';
import solutionDetails from './solution-details.json';
import productCollections from './product-collection-details.json';
import PageError from './PageError';
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { Footer, Navbar } from './components';
import { routes } from './data';
import './site.css';
import { akubelaTitle } from './akubela/catalogue';
const OneHomePage = lazy(() => import('./OneHomePage'));
const EphesusPage = lazy(() => import('./EphesusPage'));
const ProductDetailPage = lazy(() => import('./ProductDetailPage'));
const Automation = lazy(() => import('./akubela/AkubelaPages').then(m => ({ default: m.Automation })));

const ProductCollectionDetail = lazy(() => import('./ProductCollectionDetail'));
const SolutionDetail = lazy(() => import('./SolutionDetail'));
const Home = lazy(() => import('./pages').then(m => ({ default: m.Home })));
const Products = lazy(() => import('./pages').then(m => ({ default: m.Products })));
const Solutions = lazy(() => import('./pages').then(m => ({ default: m.Solutions })));
const AutomationService = lazy(() => import('./services/AutomationService'));
const SecurityService = lazy(() => import('./services/SecurityService'));
const AudioVideoService = lazy(() => import('./services/AudioVideoService'));
const NetworkingService = lazy(() => import('./services/NetworkingService'));
const LightingService = lazy(() => import('./services/LightingService'));
const WhatWeDo = lazy(() => import('./pages').then(m => ({ default: m.WhatWeDo })));
const Brands = lazy(() => import('./pages').then(m => ({ default: m.Brands })));
const TeamProfilePage = lazy(() => import('./Team').then(m => ({ default: m.TeamProfilePage })));
const About = lazy(() => import('./pages').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages').then(m => ({ default: m.Contact })));
const Support = lazy(() => import('./pages').then(m => ({ default: m.Support })));
function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const title = (pathname.startsWith('/products/') ? resolveProduct(pathname.split('/').pop())?.name : undefined) || akubelaTitle(pathname) || productCollections.find(c => pathname === `/products/categories/${c.slug}`)?.name || solutionDetails.find(s => pathname === `/solutions/${s.slug}`)?.name || routes.find(([path]) => path === pathname)?.[1] || 'Page not found';
    document.title = `${title} | Siddheshwar Smart Technologies`;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.append(meta); }
    meta.content = `${title}: explore thoughtfully integrated automation, lighting, audio-video, security and networking with Siddheshwar Smart Technologies in Hubli.`;
    if (!hash) { window.scrollTo({ top: 0, behavior: 'instant' }); return; }
    const id = decodeURIComponent(hash.slice(1));
    let attempts = 0;
    const timer = window.setInterval(() => { const target = document.getElementById(id); if (target) { target.scrollIntoView({ behavior: 'instant', block: 'start' }); window.clearInterval(timer); } else if (++attempts > 50) window.clearInterval(timer); }, 50);
    return () => window.clearInterval(timer);
  }, [pathname, hash]);
  return null;
}
function RetiredAkubelaProduct() {
  const { productSlug } = useParams();
  return <Navigate replace to={productSlug === 'akubela-aura-series-smart-switch' ? '/products/akubela-aura-series-smart-switch' : '/products?brand=Akubela'} />;
}
function PageLoading() {
  const { pathname } = useLocation();
  if (pathname === '/') return <div className="s-home-splash s-home-loading" role="status" aria-label="Loading home page"><div className="s-logo"><img src="/logo-f.png" alt="" /></div></div>;
  return <div className="s-loading" role="status">Preparing your connected experience?</div>;
}
export default function App() {
  return <BrowserRouter><MotionConfig reducedMotion="user"><RouteEffects /><a className="s-skip" href="#main-content">Skip to content</a><Navbar /><main id="main-content"><PageError><PageTransition><Suspense fallback={<PageLoading />}><Routes><Route path="/" element={<Home />} /><Route path="/what-we-do" element={<WhatWeDo />} /><Route path="/brands" element={<Brands />} /><Route path="/products" element={<Products />} /><Route path="/products/categories/:categorySlug" element={<ProductCollectionDetail />} /><Route path="/products/automation" element={<Automation />} /><Route path="/products/automation/akubela/products/:productSlug" element={<RetiredAkubelaProduct />} /><Route path="/products/automation/akubela/*" element={<Navigate to="/products?brand=Akubela" replace />} /><Route path="/products/1home-server-knx" element={<OneHomePage />} /><Route path="/products/1home-server-ch" element={<OneHomePage />} /><Route path="/products/ephesus-knx-room-controller-hvac" element={<EphesusPage />} /><Route path="/products/:productSlug" element={<ProductDetailPage />} /><Route path="/solutions" element={<Solutions />} /><Route path="/solutions/:slug" element={<SolutionDetail />} /><Route path="/home-automation" element={<AutomationService />} /><Route path="/security-safety" element={<SecurityService />} /><Route path="/audio-video" element={<AudioVideoService />} /><Route path="/networking" element={<NetworkingService />} /><Route path="/lighting" element={<LightingService />} /><Route path="/products/lighting" element={<Products lightingOnly />} /><Route path="/about" element={<About />} /><Route path="/team/:memberId" element={<TeamProfilePage />} /><Route path="/contact" element={<Contact />} /><Route path="/support" element={<Support />} /><Route path="*" element={<section className="s-container s-not-found"><p className="s-eyebrow">404</p><h1>This space hasnâ€™t been connected.</h1><Link className="s-action" to="/">Return Home</Link></section>} /></Routes></Suspense></PageTransition></PageError></main><Footer /></MotionConfig></BrowserRouter>;
}
