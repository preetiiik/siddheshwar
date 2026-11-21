import { catalogueCategories, homepageProductCategories } from './product-categories';
import { unifiedCatalogue } from './unified-catalogue';
import approvedCollections from './product-collection-details.json';
import { akubelaBase, akubelaItems } from './akubela/catalogue';
import { SiteImage } from './Image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ArrowUp, Mail, Phone, MapPin, Check, ChevronDown, House, Lightbulb, ShieldCheck, Smartphone, X } from 'lucide-react';
import { brands, company, services, solutions } from './data';
import type { Product } from '../product-data';

export function Reveal({ children, className = '', delay = 0, direction = 'up', distance = 28 }: { children: ReactNode; className?: string; delay?: number; direction?: 'up' | 'left' | 'right'; distance?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, x: direction === 'left' ? -distance : direction === 'right' ? distance : 0, y: direction === 'up' ? distance : 0 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, amount: 0, margin: '0px 0px 80px 0px' }} transition={{ duration: reduced ? 0 : .5, delay: reduced ? 0 : Math.min(delay, .18), ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
export function Action({ to, children, secondary = false }: { to: string; children: ReactNode; secondary?: boolean }) {
  return <Link className={`s-action ${secondary ? 's-action-outline' : ''}`} to={to}>{children}<ArrowUpRight size={17} aria-hidden="true" /></Link>;
}
export function SectionHeading({ label, title, text }: { label: string; title: string; text?: string }) {
  return <Reveal className="s-section-heading"><p className="s-eyebrow">{label}</p><h2>{title}</h2>{text && <p>{text}</p>}</Reveal>;
}
export function PageHero({ label, title, text, image }: { label: string; title: string; text: string; image?: string }) {
  return <section className={`s-page-hero ${image ? 'has-image' : ''}`}>{image && <SiteImage src={image} alt="" fetchPriority="high" />}<div className="s-container"><nav className="s-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>{label}</span></nav><Reveal><p className="s-eyebrow">{label}</p><h1>{title}</h1><p className="s-lead">{text}</p></Reveal></div></section>;
}
function ProductMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const [category, setCategory] = useState<string>(homepageProductCategories[0].id);
  const [brand, setBrand] = useState('');
  const [previewId, setPreviewId] = useState('');
  const current = catalogueCategories.find(item => item.id === category)!;
  const items = unifiedCatalogue.filter(product => product.primaryCategory === category);
  const brands = [...new Set(items.map(product => product.brand).filter((name): name is string => Boolean(name)))];
  const activeBrand = brands.includes(brand) ? brand : brands[0];
  const visible = items.filter(product => product.brand === activeBrand);
  const picture = visible.find(product => product.id === previewId) || visible[0];
  const categoryPath = approvedCollections.some(item => item.slug === category) ? `/products/categories/${category}` : `/products?category=${encodeURIComponent(category)}`;
  return <div className="s-product-mega" aria-label="Explore products">
    <div className="s-mega-categories" aria-label="Product categories">{catalogueCategories.map(item => <button type="button" key={item.id} className={category === item.id ? 'is-active' : ''} onMouseEnter={() => { setCategory(item.id); setBrand(''); }} onFocus={() => { setCategory(item.id); setBrand(''); }} onClick={() => { setCategory(item.id); setBrand(''); }}>{item.name}</button>)}<Link to="/products" onClick={onNavigate}>View all products <ArrowUpRight size={14} /></Link></div>
    <div className="s-mega-content"><p className="s-mega-label">{current.name}</p><p className="s-mega-description">{homepageProductCategories.find(item => item.id === category)?.description || 'Explore products selected for connected spaces.'}</p><div className="s-mega-brands" role="group" aria-label="Filter by brand">{brands.map(name => <button type="button" key={name} className={activeBrand === name ? 'is-active' : ''} aria-pressed={activeBrand === name} onMouseEnter={() => setBrand(name)} onFocus={() => setBrand(name)} onClick={() => setBrand(name)}>{name}</button>)}</div><div className="s-mega-products">{visible.map(product => <Link key={product.id} to={product.detailPath!} onMouseEnter={() => setPreviewId(product.id)} onFocus={() => setPreviewId(product.id)} onClick={onNavigate}>{product.name}<ArrowUpRight size={14} aria-hidden="true" /></Link>)}</div><Link className="s-mega-view" to={categoryPath} onClick={onNavigate}>View all in {current.name} <ArrowUpRight size={14} /></Link></div>
    <div className="s-mega-image">{picture?.image ? <><SiteImage src={picture.image} alt={picture.alt} width={500} height={420} />{picture.imageStatus === 'placeholder' && <span className="s-mega-image-note">Illustrative artwork</span>}</> : <span>Product image coming soon</span>}</div>
  </div>;
}
function InfoMegaMenu({ kind, onNavigate }: { kind: 'Solutions' | 'What We Do'; onNavigate: () => void }) {
  const entries = kind === 'Solutions'
    ? solutions.map(item => ({ title:item.title, description:item.description, path:`/solutions/${item.id}` }))
    : services.map(item => ({ title:item.name, description:item.description, path:`/${item.id}` }));
  return <div className="s-info-mega"><p className="s-info-mega-label">{kind === 'Solutions' ? 'SOLUTIONS FOR INTELLIGENT LIVING' : 'OUR EXPERTISE'}</p><div className="s-info-mega-grid">{entries.map(item => <Link key={item.path} to={item.path} onClick={onNavigate}><strong>{item.title}</strong><span>{item.description}</span></Link>)}</div></div>;
}
export function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoOnLight, setLogoOnLight] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const dropdownTimer = useRef<number | null>(null);
  useEffect(() => () => { if (dropdownTimer.current !== null) window.clearTimeout(dropdownTimer.current); }, []);
  useEffect(() => {
    let threshold = 35;
    const update = () => setScrolled(window.scrollY > threshold);
    const measure = () => {
      const hero = document.querySelector<HTMLElement>('#main-content :is(.s-hero, .s-page-hero, .pc-hero, .sd-hero, .pd-hero, .dp-hero, .sv-photo-hero, .ak-hero, .oh-hero, .eph-hero)');
      threshold = hero ? Math.max(35, hero.offsetHeight - 100) : 35;
      update();
    };
    measure();
    const observer = new ResizeObserver(measure);
    const hero = document.querySelector<HTMLElement>('#main-content :is(.s-hero, .s-page-hero, .pc-hero, .sd-hero, .pd-hero, .dp-hero, .sv-photo-hero, .ak-hero, .oh-hero, .eph-hero)');
    if (hero) observer.observe(hero);
    const contentObserver = new MutationObserver(measure);
    contentObserver.observe(document.getElementById('main-content') || document.body, { childList:true, subtree:true });
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', measure);
    return () => { observer.disconnect(); contentObserver.disconnect(); window.removeEventListener('scroll', update); window.removeEventListener('resize', measure); };
  }, [location.pathname]);
  useEffect(() => {
    let timer = 0;
    const inspect = () => {
      timer = 0;
      const logo = document.querySelector<HTMLElement>('.s-header .s-logo');
      if (!logo) return;
      const box = logo.getBoundingClientRect();
      const elements = document.elementsFromPoint(box.left + box.width / 2, box.top + box.height * .8).filter(el => !el.closest('.s-header, .s-skip'));
      for (const element of elements) {
        if (element.closest('.s-hero, .s-hero-feature-band, .sv-photo-hero, .s-page-hero.has-image, .s-contact-cta, .s-footer, .s-living-why, .lighting-architecture, .auto-pinned, .sd-hero, .ak-hero')) { setLogoOnLight(false); return; }
        if (element.tagName === 'IMG') { setLogoOnLight(false); return; }
        const background = getComputedStyle(element).backgroundColor;
        const values = background.match(/[\d.]+/g)?.map(Number);
        if (!values || values.length < 3 || (values.length > 3 && values[3] < .6)) continue;
        const [r,g,b] = values;
        const scale = background.startsWith('color(') ? 1 : 255;
        setLogoOnLight((r*.2126 + g*.7152 + b*.0722)/scale > .55);
        return;
      }
      setLogoOnLight(true);
    };
    const schedule = () => { if (!timer) timer = window.setTimeout(inspect, 100); };
    const observer = new MutationObserver(schedule);
    observer.observe(document.getElementById('main-content') || document.body, { childList:true, subtree:true });
    schedule();
    window.addEventListener('scroll', schedule, { passive:true });
    window.addEventListener('resize', schedule);
    return () => { window.clearTimeout(timer); observer.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [location.pathname]);
  useEffect(() => { if (!open) return; const previous = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = previous; }; }, [open]);
  const close = () => { setOpen(false); setDropdown(null); };
  const groups = { Products: [['All Products', '/products'], ...catalogueCategories.map(c=>[c.name, approvedCollections.some(a=>a.slug===c.id)?`/products/categories/${c.id}`:`/products?category=${c.id}`])], Solutions: solutions.map(s => [s.title, `/solutions/${s.id}`]), 'What We Do': [['Automation', '/home-automation'], ['Security', '/security-safety'], ['Audio Video', '/audio-video'], ['Networking', '/networking'], ['Lighting', '/lighting']] };
  return <header className={`s-header ${logoOnLight && !open ? 's-header--light-logo' : ''} ${location.pathname === '/' ? 's-header--home' : ''} ${scrolled || open ? 'is-solid' : ''}`} onKeyDown={e => { if (e.key === 'Escape') { close(); document.getElementById('s-menu-toggle')?.focus(); } }}><div className="s-nav-wrap"><Link to="/" className="s-logo" onClick={close} aria-label="Siddheshwar home"><SiteImage src="/logo.png" alt="Siddheshwar" width={1212} height={601} /></Link><button id="s-menu-toggle" className="s-menu-toggle" type="button" aria-expanded={open} aria-controls="s-main-nav" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}><span className="s-menu-content"><span className="s-menu-word">{open ? 'Close' : 'Menu'}</span><span className="s-menu-lines" aria-hidden="true"><span /><span /></span></span></button><div className="s-header-cluster"><nav id="s-main-nav" aria-label="Main navigation" className={open ? 'is-open' : ''}><NavLink to="/" onClick={close}>Home</NavLink>{Object.entries(groups).map(([name, links]) => <div className="s-dropdown" key={name} onPointerEnter={event => { if (dropdownTimer.current !== null) window.clearTimeout(dropdownTimer.current); if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 901px)').matches) setDropdown(name); }} onPointerLeave={event => { if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 901px)').matches) { const element = event.currentTarget; dropdownTimer.current = window.setTimeout(() => { if (!element.contains(document.activeElement)) setDropdown(current => current === name ? null : current); }, 180); } }} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setDropdown(current => current === name ? null : current); }} onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); setDropdown(null); event.currentTarget.querySelector<HTMLAnchorElement>('.s-dropdown-label')?.focus(); } }}><div className="s-dropdown-trigger" style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}><NavLink className="s-dropdown-label" to={name === 'Products' ? '/products' : name === 'Solutions' ? '/solutions' : '/what-we-do'} onClick={close} onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); setDropdown(name); window.setTimeout(() => document.getElementById(`nav-${name.replaceAll(' ', '-')}`)?.querySelector<HTMLAnchorElement>('a')?.focus(), 0); } }}>{name}</NavLink><button className="s-dropdown-toggle" type="button" aria-label={`${dropdown === name ? 'Close' : 'Open'} ${name} menu`} aria-expanded={dropdown === name} aria-controls={`nav-${name.replaceAll(' ', '-')}`} onClick={() => setDropdown(dropdown === name ? null : name)}><ChevronDown size={13} aria-hidden="true" /></button></div>{dropdown === name && <div id={`nav-${name.replaceAll(' ', '-')}`} className={`s-dropdown-menu${name === 'Products' ? ' s-products-dropdown' : ' s-info-dropdown'}`}>{name === 'Products' ? <ProductMegaMenu onNavigate={close} /> : <InfoMegaMenu kind={name as 'Solutions' | 'What We Do'} onNavigate={close} />}<div className="s-mega-mobile-links">{links.map(([label, to]) => <Link key={to} to={to} onClick={close}>{label}</Link>)}</div></div>}</div>)}<NavLink to="/about" onClick={close}>About Us</NavLink><NavLink to="/support" onClick={close}>Support</NavLink><div className="s-mobile-nav-actions"><Link className="s-nav-cta" to="/contact" onClick={close}>Get in Touch<ArrowUpRight size={15} /></Link><a className="s-nav-whatsapp" href={`https://wa.me/${company.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="Chat with Siddheshwar on WhatsApp" onClick={close}><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .1 5.4.1 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6a12 12 0 0 0 5.8 1.5h.1c6.6 0 12-5.4 12-12 0-3.2-1.3-6.2-3.6-8.4ZM12.1 21.9c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a10 10 0 0 1-1.5-5.3C2.2 6.5 6.6 2 12.1 2a9.9 9.9 0 0 1 9.9 9.9c0 5.5-4.4 10-9.9 10Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.8-2.1-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.4s1.1 2.8 1.3 3c.1.2 2.1 3.2 5.1 4.5.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z" /></svg></a></div></nav><div className={`s-header-actions ${open ? 'is-open' : ''}`}><Link className="s-nav-cta" to="/contact" onClick={close}>Get in Touch<ArrowUpRight size={15} /></Link><a className="s-nav-whatsapp" href={`https://wa.me/${company.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="Chat with Siddheshwar on WhatsApp" onClick={close}><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .1 5.4.1 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6a12 12 0 0 0 5.8 1.5h.1c6.6 0 12-5.4 12-12 0-3.2-1.3-6.2-3.6-8.4ZM12.1 21.9c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a10 10 0 0 1-1.5-5.3C2.2 6.5 6.6 2 12.1 2a9.9 9.9 0 0 1 9.9 9.9c0 5.5-4.4 10-9.9 10Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.8-2.1-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.4s1.1 2.8 1.3 3c.1.2 2.1 3.2 5.1 4.5.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z" /></svg></a></div></div></div></header>;
}
export function Footer() {
  const groups = [{ name: 'Explore', links: [['What We Do', '/what-we-do'], ['Brands We Integrate', '/brands'], ['About Us', '/about'], ['Contact Us', '/contact'], ['Support', '/support']] }, { name: 'Products', links: catalogueCategories.slice(0, 6).map(c=>[c.name, approvedCollections.some(a=>a.slug===c.id)?`/products/categories/${c.id}`:`/products?category=${c.id}`]) }, { name: 'Solutions', links: solutions.map(s => [s.title, `/solutions/${s.id}`]) }];
  return <footer className="s-footer"><div className="s-container">
    <div className="s-footer-top"><Link className="s-logo" to="/" aria-label="Siddheshwar home"><SiteImage src="/logo.png" alt="Siddheshwar" width={1212} height={601} loading="lazy" /></Link><p>Thoughtful technology.<br /><span>Beautifully connected spaces.</span></p><Link className="s-footer-contact-cta" to="/contact">Let?s Discuss Your Space<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
    <div className="s-footer-grid">{groups.map(group => <nav key={group.name} aria-label={`${group.name} footer`}><h3>{group.name}</h3>{group.links.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}{group.name === 'Products' && <Link className="s-footer-products-cta" to="/products">Explore All Products<ArrowUpRight size={15} aria-hidden="true" /></Link>}</nav>)}<div className="s-footer-details"><h3>Get in Touch</h3><a href={`mailto:${company.email}`}><Mail size={17} strokeWidth={1.4} aria-hidden="true" /><span>{company.email}</span></a><a href={`tel:+${company.phone.replace(/[^0-9]/g,'')}`}><Phone size={17} strokeWidth={1.4} aria-hidden="true" /><span>{company.phone}</span></a><address><MapPin size={18} strokeWidth={1.4} aria-hidden="true" /><span>{company.address}</span></address></div></div>
    <div className="s-footer-bottom"><p>&copy; {new Date().getFullYear()} {company.name}. All rights reserved.</p><a className="s-footer-powered" href="https://spitel.com" target="_blank" rel="noopener noreferrer">Powered by Spitel Pvt. Ltd.</a><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>Back to top<span><ArrowUp size={16} aria-hidden="true" /></span></button></div>
  </div></footer>;
}
const heroSlides = [
  { title: 'A smarter\nwelcome home.', text: 'Thoughtful access and connected living, designed around your everyday routine.', image: '/hero/hero1.png', mobileImage: '/hero/hero2-mobile.png', name: 'Smart door lock in a contemporary home', id: 'hero-one', width: 1672, height: 941 },
  { title: 'Your space.\nYour way.', text: 'Create a more comfortable home with thoughtful control at your fingertips.', image: '/hero/hero2.png', mobileImage: '/hero/hero3-mobile.png', name: 'Smart home control in a living room', id: 'hero-two', width: 1610, height: 977 },
  { title: 'Comfort in\nevery detail.', text: 'Bring lighting, climate and everyday controls together in your connected space.', image: '/hero/hero3.png', mobileImage: '/hero/hero1-mobile.png', name: 'Smart controls in a contemporary living space', id: 'hero-three', width: 1670, height: 941 },
];
const heroFeatures = [
  { title: 'Smart Home', caption: 'Seamless Control', Icon: House },
  { title: 'Smart Lighting', caption: 'Set Every Mood', Icon: Lightbulb },
  { title: 'Smart Security', caption: 'Secure Access', Icon: ShieldCheck },
  { title: 'Remote Access', caption: 'Control Anywhere', Icon: Smartphone },
];

function HeroHeadline({ title, reduced }: { title: string; reduced: boolean }) {
  const lines = title.split('\n');
  return <h1 className="s-hero-headline" aria-label={title.replace(/\n/g, ' ')}>
    {lines.map((line, lineIndex) => <span className="s-hero-reveal-line" key={`${title}-${lineIndex}`} aria-hidden="true">
      {line.split(' ').map((word, index) => {
        const order = lines.slice(0, lineIndex).reduce((count, previous) => count + previous.split(' ').length, 0) + index;
        return <motion.span className="s-hero-reveal-word" key={`${word}-${index}`}
          initial={reduced ? false : { opacity: 0, y: '35%', scale: 1.08, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: '0%', scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: reduced ? 0 : .85, delay: reduced ? 0 : .12 + order * .095, ease: [.16, 1, .3, 1] }}>
          {word}{' '}
        </motion.span>;
      })}
    </span>)}
  </h1>;
}

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reduced = useReducedMotion();
  const startX = useRef<number | null>(null);
  const [opening, setOpening] = useState(true);
  const [splash, setSplash] = useState(true);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (reduced) { setSplash(false); return; }
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const fraction = Math.min((now - started) / 1450, 1);
      setProgress(Math.round((1 - Math.pow(1 - fraction, 2)) * 100));
      if (fraction < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const timer = window.setTimeout(() => setSplash(false), 1550);
    return () => { cancelAnimationFrame(frame); window.clearTimeout(timer); };
  }, [reduced]);
  const playing = !paused && !hovered && !focused && !reduced;
  const move = (direction: number) => {
    setOpening(false);
    setPaused(true);
    setActive(index => (index + direction + heroSlides.length) % heroSlides.length);
  };
  useEffect(() => {
    if (!paused) return;
    const timer = window.setTimeout(() => setPaused(false), 9000);
    return () => window.clearTimeout(timer);
  }, [paused, active]);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => { setOpening(false); setActive(index => (index + 1) % heroSlides.length); }, opening ? 8500 : 6500);
    return () => window.clearTimeout(timer);
  }, [playing, active, opening]);
  useEffect(() => {
    const next = heroSlides[(active + 1) % heroSlides.length];
    const image = new Image();
    image.src = next.image;
  }, [active]);
  const slide = heroSlides[active];
  return <><AnimatePresence>{splash && !reduced && <motion.div className="s-home-splash" aria-hidden="true" initial={{ clipPath: 'ellipse(150% 150% at 50% 0%)' }} exit={{ clipPath: 'ellipse(150% 0% at 50% 0%)' }} transition={{ duration: .9, ease: [0.76, 0, 0.24, 1] }}><div className="s-home-splash-content"><div className="s-logo"><img src="/logo.png" alt="" /></div><div className="s-home-progress"><span style={{ transform: `scaleX(${progress / 100})` }} /></div><span className="s-home-progress-number">{String(progress).padStart(3, '0')}</span></div></motion.div>}</AnimatePresence><section className="s-hero s-hero--editorial s-hero--bottom-layout" data-product={slide.id} data-playing={playing} aria-label="Smart technology highlights" aria-roledescription="carousel" tabIndex={0}
    onMouseOver={event => setHovered(Boolean((event.target as HTMLElement).closest('a, button')))} onMouseLeave={() => setHovered(false)}
    onFocusCapture={event => setFocused((event.target as HTMLElement).matches(':focus-visible'))} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    onTouchStart={event => { startX.current = event.touches[0].clientX; }}
    onTouchCancel={() => { startX.current = null; }}
    onTouchEnd={event => { if (startX.current !== null) { const delta = event.changedTouches[0].clientX - startX.current; if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1); startX.current = null; } }}
    onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); event.currentTarget.focus({ preventScroll: true }); move(event.key === 'ArrowLeft' ? -1 : 1); } }}>
    <div className="s-hero-media">
      <AnimatePresence initial={false}>
        <motion.picture key={slide.image} className="s-hero-picture"
          initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 1, ease: 'easeInOut' }}>
          <source media="(max-width: 900px)" srcSet={slide.mobileImage} />
          <img className={`s-hero-image s-hero-image--${slide.id}`} src={slide.image} alt={slide.name}
            width={slide.width} height={slide.height} fetchPriority={active === 0 ? 'high' : 'auto'} decoding="async" />
        </motion.picture>
      </AnimatePresence>
    </div>
    <div className="s-hero-overlay" aria-hidden="true" />
    <motion.div className="s-container s-hero-content" initial={false}>
      <motion.div className="s-hero-copy" key={active} initial={false}>
        <HeroHeadline title={slide.title} reduced={Boolean(reduced) || opening} />
        <motion.p className="s-hero-model" initial={reduced || opening ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced || opening ? 0 : .65, delay: reduced || opening ? 0 : .4 }}>{slide.name}</motion.p>
        <motion.p className="s-lead" initial={reduced || opening ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced || opening ? 0 : .65, delay: reduced || opening ? 0 : .65 }}>{slide.text}</motion.p>
        <motion.div className="s-hero-cta-reveal" initial={reduced || opening ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced || opening ? 0 : .65, delay: reduced || opening ? 0 : .9 }}><Action to="/products">Explore Products</Action></motion.div>
      </motion.div>
    </motion.div>
    <div className="s-hero-dots" role="group" aria-label="Choose a hero slide">{heroSlides.map((item, index) => <button key={item.id} type="button" aria-label={`Show slide ${index + 1} of ${heroSlides.length}`} aria-pressed={active === index} onClick={() => { setOpening(false); setPaused(true); setActive(index); }}><span /></button>)}</div>
  </section>
    <div className="s-hero-feature-band"><ul className="s-hero-features" aria-label="Smart home capabilities">
      {heroFeatures.map(({ title, caption, Icon }) => <li key={title}>
        <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
        <strong>{title}</strong><p>{caption}</p>
      </li>)}
    </ul></div>
  </>;
}
export function BrandMarquee() {
  return <section className="s-brands" aria-labelledby="s-brands-title">
    <div className="s-container"><div className="s-brand-heading">
      <p className="s-eyebrow">Brands We Offer</p>
      <h2 id="s-brands-title">Powered by <span>Trusted Brands.</span></h2>
      <p className="s-brand-description">Discover leading technologies that bring comfort, intelligence and control to every space.</p>
    </div></div>
    <div className="s-marquee" role="region" tabIndex={0} aria-label="Brand logos. Scrolling pauses on hover or keyboard focus.">
      <div className="s-marquee-track">
        {[false, true].map(duplicate => <ul className="s-marquee-group" key={String(duplicate)} aria-label={duplicate ? undefined : 'Brands we offer'} aria-hidden={duplicate ? true : undefined}>
          {brands.map(brand => <li key={brand.name}><Link to={`/products?brand=${encodeURIComponent(brand.name)}`} tabIndex={duplicate?-1:undefined} aria-label={duplicate?undefined:`Explore ${brand.name} products`}><img src={brand.logo} alt={duplicate ? '' : brand.name} width={brand.width} height={brand.height} loading="lazy" decoding="async" draggable={false} /></Link></li>)}
        </ul>)}
      </div>
    </div>
  </section>;
}
export function ContactCTA({to='/contact',className='',headingId='s-contact-cta-title',buttonClassName=''}:{to?:string;className?:string;headingId?:string;buttonClassName?:string}) {
  return <section className={`s-contact-cta ${className}`} aria-labelledby={headingId}><SiteImage src="/products/space-we-transform/independent-homes.png" alt="" width={1920} height={1080} loading="lazy" /><div className="s-container"><Reveal className="s-cta-copy"><p className="s-eyebrow">Let’s create something considered</p><h2 id={headingId}>Ready to make your<br />space smarter?</h2><p>Let’s explore intelligent solutions designed around your space and requirements.</p><Link className={`s-action ${buttonClassName}`} to={to}>Discuss Your Project<ArrowUpRight size={17} aria-hidden="true" /></Link></Reveal></div></section>;
}
export function ProductCard({ product, onSelect }: { product: Product; onSelect: (p: Product) => void }) {
  const content=<><div className="s-product-image"><SiteImage src={product.image} alt={product.alt} loading="lazy" decoding="async" width={600} height={500} /><span><ArrowUpRight size={19} /></span></div><div className="s-product-copy"><p className="s-eyebrow">{product.brand || (product.category === 'lighting' ? 'Lighting' : 'Home Automation')}</p><h3>{product.name}</h3><p>{product.shortDescription}</p><span className="s-text-link">View details <ArrowUpRight size={15} /></span></div></>;
  return product.detailPath ? <Link className="s-product-card" to={product.detailPath}>{content}</Link> : <button type="button" className="s-product-card" onClick={()=>onSelect(product)}>{content}</button>;
}
export function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { const element = dialog.current; if (!product || !element) return; const previous = document.activeElement as HTMLElement | null; element.showModal(); const overflow = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { element.close(); document.body.style.overflow = overflow; previous?.focus(); }; }, [product]);
  return <dialog className="s-product-modal" ref={dialog} onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }} aria-labelledby="s-product-modal-title">{product && <div className="s-modal-inner"><button className="s-modal-close" type="button" aria-label="Close product details" onClick={onClose} autoFocus><X /></button><div className="s-modal-image"><SiteImage src={product.image} alt={product.alt} /></div><div className="s-modal-copy"><p className="s-eyebrow">{product.brand || product.category}</p><h2 id="s-product-modal-title">{product.name}</h2><p>{product.fullDescription}</p><h3>Product overview</h3><ul className="s-check-list">{product.features.slice(0, 7).map(f => <li key={f}><Check size={16} />{f}</li>)}</ul>{product.specifications && <dl>{product.specifications.map(s => <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>)}</dl>}{product.brand === 'Akubela' && akubelaItems.some(item=>item.slug===product.slug) && <Link className="s-text-link" to={`${akubelaBase}/products/${product.slug}`} onClick={onClose}>Full product page<ArrowUpRight size={15} /></Link>}{product.catalogUrl && <a className="s-text-link" href={product.catalogUrl} target="_blank" rel="noreferrer">View supplied catalogue<ArrowUpRight size={15} /></a>}<Link className="s-action" to={`/contact?interest=${encodeURIComponent(product.name)}`} onClick={onClose}>Enquire about this product<ArrowUpRight size={17} /></Link><Link className="s-text-link" to={`/solutions#${product.category === 'lighting' ? 'intelligent-lighting-automation' : 'home-automation'}`} onClick={onClose}>Explore related solutions<ArrowUpRight size={15} /></Link></div></div>}</dialog>;
}
export function ProductCarousel({ products, onSelect }: { products: Product[]; onSelect: (p: Product) => void }) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; scroll: number; moved: boolean } | null>(null);
  const reduced = useReducedMotion();
  const scroll = (direction: number) => { const el = track.current; if (el) el.scrollBy({ left: direction * (el.querySelector('button')?.clientWidth || 360), behavior: reduced ? 'instant' : 'smooth' }); };
  return <><div className="s-carousel-toolbar"><p>Thoughtful interfaces. Powerful possibilities.</p><div className="s-controls"><button type="button" aria-label="Previous products" onClick={() => scroll(-1)}><ArrowLeft size={18} /></button><button type="button" aria-label="Next products" onClick={() => scroll(1)}><ArrowRight size={18} /></button></div></div><div className="s-product-track" ref={track} tabIndex={0} aria-label="Featured products, swipe or use arrow keys to browse" onKeyDown={e => { if (e.target === e.currentTarget && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) { e.preventDefault(); scroll(e.key === 'ArrowLeft' ? -1 : 1); } }} onPointerDown={e => { if (e.pointerType !== 'mouse') return; drag.current = { x: e.clientX, scroll: e.currentTarget.scrollLeft, moved: false }; }} onPointerMove={e => { if (!drag.current || e.buttons !== 1) return; const delta = e.clientX - drag.current.x; if (Math.abs(delta) > 5) { drag.current.moved = true; e.currentTarget.scrollLeft = drag.current.scroll - delta; } }} onPointerUp={() => { window.setTimeout(() => { drag.current = null; }, 0); }} onPointerLeave={() => { drag.current = null; }} onClickCapture={e => { if (drag.current?.moved) { e.preventDefault(); e.stopPropagation(); } }} onDragStart={e => e.preventDefault()}>{products.map(p => <ProductCard key={p.id} product={p} onSelect={onSelect} />)}</div></>;
}
