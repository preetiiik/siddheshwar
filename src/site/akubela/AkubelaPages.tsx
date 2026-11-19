import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowUpRight, Search } from 'lucide-react';
import { Action, ContactCTA, Reveal } from '../components';
import { akubelaBase, akubelaCategories, akubelaItems, categoryFor, categoryPath, productPath, type AkubelaItem } from './catalogue';
import './akubela.css';

function Breadcrumb({ category, product }: { category?: typeof akubelaCategories[number]; product?: string }) {
  return <nav className="ak-breadcrumb" aria-label="Breadcrumb"><Link to="/products">Products</Link><span>/</span><Link to="/products/automation">Automation</Link><span>/</span><Link to={akubelaBase}>Akubela</Link>{category && <><span>/</span><Link to={categoryPath(category.slug)}>{category.name}</Link></>}{product && <><span>/</span><span aria-current="page">{product}</span></>}</nav>;
}
function CategoryCards() {
  return <div className="ak-grid">{akubelaCategories.map((c, i) => {
    const image = akubelaItems.find(p => p.category === c.slug)!;
    return <Reveal key={c.slug}><Link className="ak-card ak-category" to={categoryPath(c.slug)}><div className="ak-image"><img src={image.image} alt={image.name} width={image.width} height={image.height} loading="lazy" decoding="async" /></div><div className="ak-card-copy"><p className="ak-label">{String(i + 1).padStart(2, '0')} / {c.count} {c.slug === 'smart-home-software-cloud' ? 'platforms' : 'products'}</p><h3>{c.name}</h3><p>{c.description}</p><span className="ak-link">Explore Category <ArrowUpRight size={17} /></span></div></Link></Reveal>;
  })}</div>;
}
function ProductCard({ item }: { item: AkubelaItem }) {
  return <Link className="ak-card ak-product" to={productPath(item.slug)}><div className="ak-image"><img src={item.image} alt={`Akubela ${item.name}`} width={item.width} height={item.height} loading="lazy" decoding="async" /></div><div className="ak-card-copy"><p className="ak-label">{categoryFor(item).name}</p><h3>{item.name}</h3><span className="ak-link">View Details <ArrowUpRight size={17} /></span></div></Link>;
}
export function Automation() {
  return <div className="ak-page"><section className="ak-section s-container"><Breadcrumb /><p className="ak-label">Connected spaces</p><h1>Automation, thoughtfully considered.</h1><p className="ak-intro">Explore Akubela's connected-home collection, or discover our approach to home automation.</p><div className="ak-actions"><Action to={akubelaBase}>Explore Akubela</Action><Action to="/home-automation" secondary>Home Automation Solutions</Action></div></section><ContactCTA to="/contact?interest=Akubela" /></div>;
}
export function AkubelaHome() {
  const hero = akubelaItems.find(p => p.name === 'HyPanel Supreme')!;
  return <div className="ak-page"><section className="ak-hero"><div className="s-container"><Breadcrumb /><div className="ak-hero-grid"><Reveal><p className="ak-label">AKUBELA SMART HOME TECHNOLOGY</p><h1>Intelligent Living.<br /><em>Beautifully Connected.</em></h1><p className="ak-intro">Discover Akubela's range of smart control panels, intelligent switches, smart locks, sensors, automation modules and connected-home technologies.</p><div className="ak-actions"><Action to={`${akubelaBase}/products`}>Explore Products</Action><Action to="/contact?interest=Akubela" secondary>Enquire Now</Action></div><p className="ak-hero-note">10 collections <span>·</span> 79 products & platforms</p></Reveal><div className="ak-hero-image"><img src={hero.image} alt="Akubela HyPanel Supreme smart control touchscreen" width={hero.width} height={hero.height} fetchPriority="high" /><span>HyPanel Supreme / Smart Control Panels</span></div></div></div></section><section className="ak-section s-container"><div className="ak-heading"><div><p className="ak-label">The Akubela collection</p><h2>A considered detail.<br />For every space.</h2></div><Link className="ak-link" to={`${akubelaBase}/categories`}>Explore all categories <ArrowUpRight size={17} /></Link></div><CategoryCards /></section><ContactCTA to="/contact?interest=Akubela" /></div>;
}
export function AkubelaCategories() {
  return <div className="ak-page"><section className="ak-section s-container"><Breadcrumb /><p className="ak-label">10 curated collections</p><h1>Explore the possibilities.</h1><p className="ak-intro">Find the controls, accessories and platforms for your connected-home project.</p><CategoryCards /></section><ContactCTA to="/contact?interest=Akubela" /></div>;
}
export function AkubelaListing() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const category = akubelaCategories.find(c => c.slug === categorySlug);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('collection');
  if (categorySlug && !category) return <Missing />;
  const items = akubelaItems.filter(p => (!category || p.category === category.slug) && `${p.name} ${categoryFor(p).name}`.toLowerCase().includes(query.trim().toLowerCase()));
  if (sort !== 'collection') items.sort((a, b) => sort === 'az' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  return <div className="ak-page"><section className="ak-section s-container"><Breadcrumb category={category} /><p className="ak-label">Akubela / {category ? `${category.count} entries` : '79 products & platforms'}</p><h1>{category?.name || 'All Akubela Products'}</h1><p className="ak-intro">{category?.description || 'Explore the complete collection, from thoughtful interfaces to connected-home essentials.'}</p><div className="ak-tools"><label className="ak-search"><Search size={18} /><span className="s-sr-only">Search Akubela products</span><input type="search" placeholder="Search products or categories" value={query} onChange={e => setQuery(e.target.value)} /></label><label>Category<select aria-label="Akubela category" value={category?.slug || ''} onChange={e => { navigate(e.target.value ? categoryPath(e.target.value) : `${akubelaBase}/products`); }}><option value="">All categories</option>{akubelaCategories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label><label>Sort<select value={sort} onChange={e => setSort(e.target.value)}><option value="collection">Collection order</option><option value="az">Name A–Z</option><option value="za">Name Z–A</option></select></label></div><p className="ak-results" role="status">{items.length} {items.length === 1 ? 'entry' : 'entries'}</p>{items.length ? <div className="ak-grid">{items.map(p => <ProductCard key={p.slug} item={p} />)}</div> : <div className="ak-empty"><h2>No matching products.</h2><p>Try another name or choose a different category.</p><button onClick={() => setQuery('')}>Clear search</button></div>}</section><ContactCTA to="/contact?interest=Akubela" /></div>;
}
function Missing() { return <section className="s-container ak-section"><h1>Collection not found.</h1><Action to={akubelaBase}>Explore Akubela</Action></section>; }
