import { catalogueCategories } from './product-categories';
import approvedCollections from './product-collection-details.json';
import { akubelaBase, akubelaItems } from './akubela/catalogue';
import { SiteImage } from './Image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ArrowUp, Mail, Phone, MapPin, Check, ChevronDown, House, Lightbulb, ShieldCheck, Smartphone, X } from 'lucide-react';
import { brands, company, solutions } from './data';
import type { Product } from '../product-data';

export function Reveal({ children, className = '', delay = 0, direction = 'up', distance = 28 }: { children: ReactNode; className?: string; delay?: number; direction?: 'up' | 'left' | 'right'; distance?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, x: direction === 'left' ? -distance : direction === 'right' ? distance : 0, y: direction === 'up' ? distance : 0 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: .65, delay: reduced ? 0 : delay }}>{children}</motion.div>;
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
export function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoOnLight, setLogoOnLight] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const dropdownTimer = useRef<number | null>(null);
  useEffect(() => () => { if (dropdownTimer.current !== null) window.clearTimeout(dropdownTimer.current); }, []);
  useEffect(() => {
    const update = () => {
      const hero = document.querySelector<HTMLElement>('.s-hero');
      const threshold = location.pathname === '/' ? (hero?.offsetHeight ?? window.innerHeight) - 100 : 35;
      setScrolled(window.scrollY > threshold);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [location.pathname]);
  useEffect(() => {
    let frame = 0;
    const inspect = () => {
      frame = 0;
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
    const schedule = () => { if (!frame) frame = requestAnimationFrame(inspect); };
    const observer = new MutationObserver(schedule);
    observer.observe(document.getElementById('main-content') || document.body, { childList:true, subtree:true });
    schedule();
    window.addEventListener('scroll', schedule, { passive:true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [location.pathname]);
  useEffect(() => { if (!open) return; const previous = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = previous; }; }, [open]);
  const close = () => { setOpen(false); setDropdown(null); };
  const groups = { Products: [['All Products', '/products'], ...catalogueCategories.map(c=>[c.name, approvedCollections.some(a=>a.slug===c.id)?`/products/categories/${c.id}`:`/products?category=${c.id}`])], Solutions: solutions.map(s => [s.title, `/solutions/${s.id}`]), 'What We Do': [['Automation', '/home-automation'], ['Security', '/security-safety'], ['Audio Video', '/audio-video'], ['Networking', '/networking'], ['Lighting', '/lighting']] };
  return <header className={`s-header ${logoOnLight && !open ? 's-header--light-logo' : ''} ${location.pathname === '/' ? 's-header--home' : ''} ${scrolled || open || location.pathname !== '/' ? 'is-solid' : ''}`} onKeyDown={e => { if (e.key === 'Escape') { close(); document.getElementById('s-menu-toggle')?.focus(); } }}><div className="s-nav-wrap"><Link to="/" className="s-logo" onClick={close} aria-label="Siddheshwar home"><SiteImage src="/logo.png" alt="Siddheshwar" width={1212} height={601} /></Link><button id="s-menu-toggle" className="s-menu-toggle" type="button" aria-expanded={open} aria-controls="s-main-nav" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}><span className="s-menu-content"><span className="s-menu-word">{open ? 'Close' : 'Menu'}</span><span className="s-menu-lines" aria-hidden="true"><span /><span /></span></span></button><div className="s-header-cluster"><nav id="s-main-nav" aria-label="Main navigation" className={open ? 'is-open' : ''}><NavLink to="/" onClick={close}>Home</NavLink>{Object.entries(groups).map(([name, links]) => <div className="s-dropdown" key={name} onPointerEnter={event => { if (dropdownTimer.current !== null) window.clearTimeout(dropdownTimer.current); if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 901px)').matches) setDropdown(name); }} onPointerLeave={event => { if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 901px)').matches) { const element = event.currentTarget; dropdownTimer.current = window.setTimeout(() => { if (!element.contains(document.activeElement)) setDropdown(current => current === name ? null : current); }, 180); } }} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setDropdown(current => current === name ? null : current); }} onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); setDropdown(null); event.currentTarget.querySelector<HTMLAnchorElement>('.s-dropdown-label')?.focus(); } }}><div className="s-dropdown-trigger" style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}><NavLink className="s-dropdown-label" to={name === 'Products' ? '/products' : name === 'Solutions' ? '/solutions' : '/what-we-do'} onClick={close} onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); setDropdown(name); window.setTimeout(() => document.getElementById(`nav-${name.replaceAll(' ', '-')}`)?.querySelector<HTMLAnchorElement>('a')?.focus(), 0); } }}>{name}</NavLink><button className="s-dropdown-toggle" type="button" aria-label={`${dropdown === name ? 'Close' : 'Open'} ${name} menu`} aria-expanded={dropdown === name} aria-controls={`nav-${name.replaceAll(' ', '-')}`} onClick={() => setDropdown(dropdown === name ? null : name)}><ChevronDown size={13} aria-hidden="true" /></button></div>{dropdown === name && <div id={`nav-${name.replaceAll(' ', '-')}`} className="s-dropdown-menu">{links.map(([label, to]) => <Link key={to} to={to} onClick={close}>{label}</Link>)}</div>}</div>)}<NavLink to="/about" onClick={close}>About Us</NavLink><NavLink to="/support" onClick={close}>Support</NavLink></nav><div className={`s-header-actions ${open ? 'is-open' : ''}`}><Link className="s-nav-cta" to="/contact" onClick={close}>Get in Touch<ArrowUpRight size={15} /></Link><a className="s-nav-whatsapp" href={`https://wa.me/${company.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="Chat with Siddheshwar on WhatsApp" onClick={close}><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .1 5.4.1 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6a12 12 0 0 0 5.8 1.5h.1c6.6 0 12-5.4 12-12 0-3.2-1.3-6.2-3.6-8.4ZM12.1 21.9c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a10 10 0 0 1-1.5-5.3C2.2 6.5 6.6 2 12.1 2a9.9 9.9 0 0 1 9.9 9.9c0 5.5-4.4 10-9.9 10Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.8-2.1-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.4s1.1 2.8 1.3 3c.1.2 2.1 3.2 5.1 4.5.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z" /></svg></a></div></div></div></header>;
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
  { title: 'Technology meets\nbeautiful design.', text: 'Discover the Akubela HyPanel KeyPlus for your connected space.', image: '/hero/akubela-hypanel-keyplus-wide.webp', category: 'Connected interiors', name: 'Akubela HyPanel KeyPlus', id: 'keyplus', width: 1672, height: 941 },
  { title: 'Intelligence in\nevery touch.', text: 'Explore thoughtful smart-home control with the Akubela HyPanel Supreme.', image: '/hero/akubela-hypanel-supreme-wide.webp', category: 'Smart home control', name: 'Akubela HyPanel Supreme', id: 'supreme', width: 1671, height: 941 },
  { title: 'A brighter way\nto live.', text: 'Meet the Aura Series Smart Switch, designed to complement considered interiors.', image: '/hero/akubela-aura-series-wide.webp', category: 'Intelligent lighting', name: 'Akubela Aura Series Smart Switch', id: 'aura', width: 1672, height: 941 },
  { title: 'Comfort. Control.\nPeace of mind.', text: 'Explore smart access for your entrance with the Akubela SL60 Smart Lock.', image: '/hero/akubela-sl60-wide.webp', category: 'Security & comfort', name: 'Akubela SL60 Smart Lock', id: 'sl60', width: 1671, height: 941 },
  { title: 'A smarter\nwelcome home.', text: 'Bring a considered touch to your doorway with the Akubela SL30 Smart Lock.', image: '/hero/akubela-sl30-wide.webp', category: 'Smart access', name: 'Akubela SL30 Smart Lock', id: 'sl30', width: 1536, height: 1024 },
];
const heroSrcSet = (slide: typeof heroSlides[number]) => `${slide.image.replace('-wide', '-640')} 640w, ${slide.image.replace('-wide', '-1024')} 1024w, ${slide.image} ${slide.width}w`;
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
    image.sizes = '(max-width: 900px) 100vw, max(100vw, 178vh)';
    image.srcset = heroSrcSet(next);
    image.src = next.image;
  }, [active]);
  const slide = heroSlides[active];
  return <><section className="s-hero s-hero--editorial s-hero--bottom-layout" data-product={slide.id} data-playing={playing} aria-label="Smart technology highlights" aria-roledescription="carousel" tabIndex={0}
    onMouseOver={event => setHovered(Boolean((event.target as HTMLElement).closest('a, button')))} onMouseLeave={() => setHovered(false)}
    onFocusCapture={event => setFocused((event.target as HTMLElement).matches(':focus-visible'))} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    onTouchStart={event => { startX.current = event.touches[0].clientX; }}
    onTouchCancel={() => { startX.current = null; }}
    onTouchEnd={event => { if (startX.current !== null) { const delta = event.changedTouches[0].clientX - startX.current; if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1); startX.current = null; } }}
    onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); event.currentTarget.focus({ preventScroll: true }); move(event.key === 'ArrowLeft' ? -1 : 1); } }}>
    <div className="s-hero-media">
      <AnimatePresence initial={false}>
        <motion.img key={slide.image} className={`s-hero-image s-hero-image--${slide.id}`} src={slide.image} srcSet={heroSrcSet(slide)} sizes="(max-width: 900px) 100vw, max(100vw, 178vh)" alt={slide.name}
          width={slide.width} height={slide.height} fetchPriority={active === 0 ? 'high' : 'auto'} decoding="async"
          initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 1, ease: 'easeInOut' }} />
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
