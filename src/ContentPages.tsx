import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import pages from './site-content.json';
import solutions from './solutions-data';
import { productGroups } from './product-data';
import About from './About';
import SpacesPage from './Spaces';
import Certificates from './Certificates';
import { AutomationServiceCards, AutomationServiceDetail } from './HomeAutomation';
import { ProductCategoryCards, ProductCategoryDetail } from './Products';
import { ProjectCards, ProjectDetail } from './Projects';
import { LightingCards, LightingDetail } from './Lighting';

const sectionId = (text: string) => text.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function Copy({ text }: { text: string }) {
  if (text.startsWith('CTA:')) return null;
  if (text.startsWith('- ')) return <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">{text.split('\n').map(line => <li key={line} className="flex gap-3"><span className="text-[#1d4ed8]">—</span>{line.replace(/^- /, '')}</li>)}</ul>;
  const split = text.indexOf(': ');
  return <p className="mt-5 text-sm leading-8 text-slate-600">{split > 0 && split < 35 ? <><strong className="font-medium text-[#1d4ed8]">{text.slice(0, split + 1)}</strong>{text.slice(split + 1)}</> : text}</p>;
}

export function ContentPage({ path }: { path: string }) {
  if (path === '/spaces' || path.startsWith('/spaces/')) return <SpacesPage slug={path === '/spaces' ? undefined : path.slice('/spaces/'.length)} />;
  if (path === '/about') return <About />;
  if (path === '/privacy-policy') return <section className="bg-[#f8fafc] px-6 pb-24 pt-48 md:px-12"><div className="mx-auto max-w-3xl"><a href="/" className="inline-flex items-center gap-2 text-sm text-[#1e3a8a] underline underline-offset-4">Back to home</a><h1 className="luxury-heading mt-8 text-5xl font-semibold text-[#1e3a8a]">Privacy Policy</h1><div className="mt-10 space-y-8 text-sm leading-8 text-slate-600"><section><h2 className="text-xl font-semibold text-[#1e3a8a]">Information you provide</h2><p>The consultation form currently operates as a demonstration. Submitting it displays a confirmation on this page; it does not send your details to a backend or email service.</p></section><section><h2 className="text-xl font-semibold text-[#1e3a8a]">External content and links</h2><p>This website loads fonts and images from third-party providers. Your browser connects to those providers when loading this content. External websites, including links in our footer, follow their own privacy policies.</p></section><section><h2 className="text-xl font-semibold text-[#1e3a8a]">Questions and updates</h2><p>For privacy questions, please visit our <a href="/contact" className="text-[#1e3a8a] underline underline-offset-4">contact page</a>. This policy should be updated when enquiry handling or other data collection features are enabled.</p></section></div></div></section>;
  if (path.startsWith('/home-automation/')) return <AutomationServiceDetail slug={path.slice('/home-automation/'.length)} />;
  if (path.startsWith('/products/')) return <ProductCategoryDetail slug={path.slice('/products/'.length)} />;
  if (path.startsWith('/projects/')) return <ProjectDetail slug={path.slice('/projects/'.length)} />;
  if (path.startsWith('/lighting/')) return <LightingDetail slug={path.slice('/lighting/'.length)} />;
  const page = pages.find(p => p.path === path);
  if (!page) return <section className="px-6 py-56 text-center"><h1 className="text-5xl">Page not found</h1><a href="/" className="mt-8 inline-block text-[#1d4ed8]">Return Home</a></section>;
  const images: Record<string, string> = { '/about': '1600607687939-ce8a6c25118c', '/home-automation': '1600210492486-724fe5c67fb0', '/lighting': '1600607687920-4e2a09cf159d', '/projects': '1600566752355-35792bedcfea' };
  return <>
    <section className="photo-surface relative overflow-hidden px-6 pb-24 pt-48 md:px-12 md:pt-56">
      <img src={`https://images.unsplash.com/photo-${images[path] ?? '1600566753086-00f18fb6b3ea'}?w=1800&q=85`} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/50" />
      <div className="relative mx-auto max-w-[1344px]"><nav aria-label="Breadcrumb" className="mb-10 text-xs text-slate-600"><a href="/">Home</a> / <span className="text-[#1d4ed8]">{page.name}</span></nav><p className="text-xs uppercase tracking-[0.3em] text-[#1d4ed8]">{page.name}</p><h1 className="luxury-heading mt-7 max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">{page.headline}</h1><div className="max-w-2xl">{page.intro.map(p => <Copy key={p} text={p} />)}</div><a href={path === '/contact' ? '#contact' : '/contact'} className="mt-9 inline-flex items-center gap-5 bg-[#93c5fd] px-7 py-4 text-xs font-semibold uppercase tracking-widest text-black">{page.cta}<ArrowUpRight size={18} /></a></div>
    </section>
    {page.sections.filter(s => !['Product Detail Page Format', 'Individual Project Page', 'Contact Form', 'Contact Details'].includes(s.title)).map((section, i) => <section id={sectionId(section.title)} key={section.title} className={`px-6 py-20 md:px-12 ${i % 2 === 0 ? 'bg-[#eef4fb]' : ''}`}><div className="mx-auto max-w-[1344px]"><h2 className="luxury-heading text-3xl font-semibold md:text-5xl">{section.title === 'Company Certifications' ? 'Achievement & Certificates' : path === '/products' && section.title === 'Product Categories' ? 'Explore Our Products' : section.title}</h2>
      {section.title === 'Company Certifications' ? <Certificates embedded /> : section.title === 'Technology Partners' ? <p className="mt-6 text-sm leading-8 text-slate-600">Confirmed manufacturer and technology partners will be added here.</p> : section.paragraphs.map(p => <Copy key={p} text={p} />)}
      {path === '/home-automation' && section.title === 'Our Home Automation Services' ? <AutomationServiceCards /> : path === '/products' && section.title === 'Product Categories' ? <ProductCategoryCards /> : path === '/projects' && section.title === 'Project Categories' ? <ProjectCards /> : path === '/lighting' && section.title === 'Our Lighting Solutions' ? <LightingCards /> : section.cards.length > 0 && <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{section.cards.map((card, index) => <article id={sectionId(card.title)} key={card.title} className={`scroll-mt-36 border border-slate-300/10 bg-[#FFFFFF] p-7 transition-colors hover:border-[#93c5fd]/50 ${path === '/why-choose-us' ? 'why-choose-card' : ''}`}><p className="text-xs text-[#1d4ed8]">{String(index + 1).padStart(2, '0')}</p><h3 className="luxury-heading mt-5 text-2xl font-semibold">{card.title}</h3>{card.paragraphs.map(p => <Copy key={p} text={p} />)}{path === '/products' && <a href={`/contact?interest=${encodeURIComponent(card.title)}#contact`} className="mt-6 inline-flex items-center gap-3 text-xs uppercase tracking-widest text-[#1d4ed8]">Enquire About Products<ArrowUpRight size={16} /></a>}</article>)}</div>}
    </div></section>)}
    {path === '/projects' && <p className="mx-auto max-w-[1440px] px-6 py-8 text-sm text-slate-600 md:px-12">These categories illustrate project applications. Completed project details and photography will be added when available.</p>}
    {path !== '/contact' && <section className="border-t border-slate-300/10 bg-[#FFFFFF] px-6 py-20 text-center"><h2 className="luxury-heading text-4xl font-semibold">Let's Make Your Space Smarter.</h2><p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-slate-600">Connect with Siddheshwar Smart Technologies to discuss intelligent solutions tailored to your requirements.</p><a href="/contact" className="mt-8 inline-block bg-[#93c5fd] px-7 py-4 text-sm font-semibold text-black">{page.cta}</a></section>}
  </>;
}

export function HomeStrengths() {
  const section = pages[0].sections.find(s => s.title === 'Why Choose Us?')!;
  return <section className="bg-[#eef4fb] px-6 py-24 md:px-12"><div className="mx-auto max-w-[1344px]"><p className="text-xs uppercase tracking-[0.3em] text-[#1d4ed8]">Why Choose Us?</p><h2 className="luxury-heading mt-6 text-4xl font-semibold md:text-6xl">{section.paragraphs[0]}</h2><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{section.paragraphs[1].split('\n').map(p => <div key={p} className="why-choose-card border border-slate-300/10 p-6 text-lg">{p.replace(/^- /, '')}</div>)}</div></div></section>;
}

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState('home');
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 40);
      const current = Array.from(document.querySelectorAll<HTMLElement>('main section[id]')).filter(s => s.getBoundingClientRect().top <= 150).at(-1);
      setSection(current?.id ?? 'home');
    };
    update(); window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  const navigationOrder = ['/', '/about', '/products', '/solutions', '/spaces', '/certifications', '/contact'];
  const navigation = navigationOrder.flatMap(path => path === '/spaces' ? [{ ...pages[0], path: '/spaces', name: 'Spaces We Transform', sections: [] }] : pages.filter(page => page.path === path));
  function links(mobile: boolean) {
    return navigation.map(page => {
      const active = (page.path === '/' ? path === '/' && section === 'home' : path === page.path || path.startsWith(page.path + '/') || (path === '/' && ({ solutions: '/solutions', spaces: '/spaces', about: '/about', 'our-team': '/about', automation: '/home-automation', lighting: '/lighting', projects: '/projects', contact: '/contact' } as Record<string,string>)[section] === page.path));
      const children = page.path === '/solutions' ? [{ label: 'All Solutions', href: '/solutions' }, ...solutions.map(s => ({ label: s.title, href: `/solutions/${s.slug}` }))] : page.path === '/products' ? productGroups.map(group => ({ label: group.title, href: `/products/${group.slug}` })) : ['/home-automation', '/certifications'].includes(page.path) ? page.sections.flatMap(s => s.cards.length ? s.cards.map(c => ({ label: c.title, href: ['/home-automation', '/products'].includes(page.path) ? `${page.path}/${sectionId(c.title)}` : `${page.path}#${sectionId(c.title)}` })) : page.path === '/certifications' && s.title !== 'Quality & Integration' ? [{ label: s.title, href: `${page.path}#${sectionId(s.title)}` }] : []) : [];
      const style = page.path === '/contact'
        ? `site-nav-contact text-[10px] uppercase tracking-[0.08em] ${active ? 'is-active' : ''}`
        : `site-nav-link py-2 text-[10px] uppercase tracking-[0.08em] ${active ? 'is-active text-[#1d4ed8]' : 'text-slate-800'}`;
      return <div key={page.path}
        className={mobile ? 'flex flex-wrap items-center justify-between' : 'site-nav-item relative flex items-center gap-1'}
        onMouseEnter={event => {
          if (mobile || !window.matchMedia('(hover: hover)').matches) return;
          const dropdown = event.currentTarget.querySelector('details');
          if (dropdown) dropdown.open = true;
        }}
        onMouseLeave={event => {
          if (mobile || event.currentTarget.contains(document.activeElement)) return;
          const dropdown = event.currentTarget.querySelector('details');
          if (dropdown) dropdown.open = false;
        }}
        onBlur={event => {
          if (mobile || event.currentTarget.contains(event.relatedTarget as Node) || event.currentTarget.matches(':hover')) return;
          const dropdown = event.currentTarget.querySelector('details');
          if (dropdown) dropdown.open = false;
        }}
        onKeyDown={event => {
          if (event.key !== 'Escape') return;
          const dropdown = event.currentTarget.querySelector('details');
          if (dropdown?.open) {
            dropdown.open = false;
            dropdown.querySelector('summary')?.focus();
          }
        }}
      ><a href={page.path} aria-current={path === page.path ? 'page' : undefined} className={style} onClick={() => setOpen(false)}>{page.name}</a>{children.length > 0 && <details className={mobile ? 'group' : 'group'}><summary aria-label={`Open ${page.name} menu`} className="cursor-pointer list-none p-1 text-[#1d4ed8]"><ChevronDown size={13} /></summary><div className={`${mobile ? 'relative mt-3 w-full' : 'absolute right-0 top-full mt-3 w-72'} z-50 max-h-[65vh] overflow-y-auto border border-slate-300/10 bg-[#eef4fb] p-3 shadow-2xl`}>{children.map(c => <a key={c.href} href={c.href} onClick={() => setOpen(false)} aria-current={path === c.href ? 'page' : undefined} className={`block px-3 py-2 text-xs leading-6 hover:bg-slate-900/5 hover:text-[#1d4ed8] ${path === c.href ? 'text-[#1d4ed8]' : 'text-slate-800'}`}>{c.label}</a>)}</div></details>}</div>;
    });
  }
  return <header className={`site-header fixed top-0 z-50 w-full transition-all ${path === '/' ? 'home-header' : ''} ${scrolled || path !== '/' ? 'glass py-3' : 'nav-transparent bg-transparent py-5'}`}><div className="mx-auto flex max-w-[1440px] items-center justify-between gap-5 px-6 md:px-10"><a href="/" aria-label="Siddheshwar home" className="w-36 shrink-0 md:w-40"><div className="relative"><img src="/logo.png" alt="Siddheshwar" width={1212} height={601} className="h-auto w-full" /><img src="/logo.png" alt="" aria-hidden="true" width={1212} height={601} className="absolute inset-0 h-auto w-full brightness-0 [clip-path:inset(68%_0_0_0)]" /></div></a><nav aria-label="Main navigation" className="hidden items-center gap-4 xl:flex">{links(false)}</nav><button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label="Toggle navigation" className="xl:hidden">{open ? <X /> : <Menu />}</button></div>{open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="glass mt-3 grid max-h-[75vh] gap-3 overflow-y-auto px-7 py-5 xl:hidden">{links(true)}</nav>}</header>;
}
