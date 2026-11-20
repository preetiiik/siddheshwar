import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Search, SlidersHorizontal } from 'lucide-react';
import { catalogue, productService, services } from './data';
import { catalogueCategories, homepageProductCategories, mainProductCategory } from './product-categories';
import { SiteImage } from './Image';
import { ContactCTA } from './components';
import './products-catalogue.css';

const categoryOrder = catalogueCategories.map(c=>c.id);
const brandOrder = ['Akubela','Basalte','MDT','Moorgen','Schneider Electric','Theben','Somfy','OneTouch','Ephesus','1Home'];
export default function ProductsCatalogue() {
 const [params,setParams] = useSearchParams();
 const [filtersOpen,setFiltersOpen]=useState(false);
 const [pagination,setPagination]=useState({key:'',count:24});
 const category=params.get('category') || 'all';
 const query=params.get('search') || '';
 const inCategory=catalogue.filter(p=>category==='all'||(services.some(s=>s.id===category)?productService(p)===category:mainProductCategory(p)===category));
 const availableBrands=brandOrder.filter(brand=>inCategory.some(p=>p.brand===brand));
 const brand=availableBrands.includes(params.get('brand') || '')?params.get('brand')!:'all';
 const filtered=inCategory.filter(p=>(brand==='all'||p.brand===brand)&&`${p.name} ${p.brand || ''} ${p.collection || ''} ${p.shortDescription}`.toLowerCase().includes(query.trim().toLowerCase()));
 const limit=pagination.key===params.toString()?pagination.count:24;
 const visible=filtered.slice(0,limit);
 const update=(key:string,value:string)=>setParams(previous=>{const next=new URLSearchParams(previous);if(!value||value==='all')next.delete(key);else next.set(key,value);if(key==='category')next.delete('brand');return next;},{preventScrollReset:true});
 const reset=()=>setParams({},{preventScrollReset:true});
 return <div className="pc-page">
  <section className="pc-hero" aria-labelledby="pc-hero-title"><SiteImage className="pc-hero-image" src="/solutions/S1.png" alt="Contemporary connected-home interior with architectural lighting and integrated controls" width={1920} height={1080} fetchPriority="high" decoding="async" /><div className="s-container"><nav aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Products</span></nav><p className="pc-label">OUR COLLECTION</p><h1 id="pc-hero-title">Explore <span>Our Products</span></h1><p>Discover intelligent controls, automation technologies and smart security products from trusted brands.</p></div></section>
  <section className="pc-collection s-container" aria-label="Product catalogue">
   <button className="pc-filter-toggle" type="button" aria-expanded={filtersOpen} aria-controls="catalogue-filters" onClick={()=>setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={17} aria-hidden="true" />{filtersOpen?'Hide Filters':'Filter Products'}</button><aside id="catalogue-filters" className={`pc-sidebar ${filtersOpen?'is-open':''}`} ><h2><SlidersHorizontal size={17} aria-hidden="true" />Categories</h2><div role="group" aria-label="Filter product categories"><button type="button" aria-pressed={category==='all'} onClick={()=>update('category','all')}>All Products</button>{categoryOrder.map(id=>{const c=catalogueCategories.find(item=>item.id===id)!;return <button type="button" key={id} aria-pressed={category===id} onClick={()=>update('category',id)}>{c.name}</button>;})}</div>{availableBrands.length>0 && <div className="pc-brands" role="group" aria-label="Filter product brands"><span>BRANDS</span><button type="button" aria-pressed={brand==='all'} onClick={()=>update('brand','all')}>All Brands</button>{availableBrands.map(name=><button type="button" key={name} aria-pressed={brand===name} onClick={()=>update('brand',name)}>{name}</button>)}</div>}<div className="pc-sidebar-note"><p>Technology for your space.</p><Link to="/contact?interest=Product%20Consultation">Need help choosing?<ArrowUpRight size={15} aria-hidden="true" /></Link></div></aside>
   <div className="pc-results"><div className="pc-tools"><div><h2>{catalogueCategories.find(c=>c.id===category)?.name || 'Our Collection'}</h2>{homepageProductCategories.some(c=>c.id===category) && <Link className="pc-collection-link" to={`/products/categories/${category}`}>Explore this collection<ArrowUpRight size={14} aria-hidden="true" /></Link>}<p className="pc-count" role="status">{filtered.length} {filtered.length===1?'product':'products'}</p></div><label className="pc-search"><Search size={18} aria-hidden="true" /><span className="s-sr-only">Search products</span><input type="search" placeholder="Search products or models" value={query} onChange={e=>update('search',e.target.value)} /></label></div>

    {filtered.length>0?<div className="pc-grid">{visible.map(p=><Link className="s-product-card pc-card" key={p.id} to={p.detailPath!} aria-label={`View ${p.name}`}><div className="pc-image">{p.imageStatus==='placeholder' && <span className="pc-placeholder-label">Illustrative artwork</span>}{p.image ? <SiteImage src={p.image} alt={p.alt} width={600} height={500} loading="lazy" decoding="async" /> : <span className="pc-image-pending">Product image coming soon</span>}</div><div className="pc-card-copy"><p className="pc-brand">{p.brand || 'Product collection'}</p><h3>{p.name}</h3>{p.productKind==='software' && <span className="pc-software">SOFTWARE & PLATFORM</span>}<p className="pc-type">{catalogueCategories.find(c=>c.id===mainProductCategory(p))?.name || p.collection || (p.category==='lighting'?'Lighting':'Automation')}</p><span className="pc-card-bottom"><span>View Product</span><span className="pc-arrow"><ArrowUpRight size={17} aria-hidden="true" /></span></span></div></Link>)}</div>:<div className="s-empty pc-empty"><h2>{query?'No matching products.':'Let’s find the right solution for you.'}</h2><p>{query?'Try another model, category or brand.':'A verified product list for this category is not yet available. Contact us to discuss suitable options for your space.'}</p><button type="button" onClick={reset}>Show all products<ArrowUpRight size={16} aria-hidden="true" /></button><Link to="/contact?interest=Product%20Consultation">Discuss Your Requirements<ArrowUpRight size={16} aria-hidden="true" /></Link></div>}
    {filtered.length>0 && <div className="pc-pagination"><p>Showing {visible.length} of {filtered.length} products</p>{visible.length<filtered.length && <button type="button" onClick={()=>setPagination({key:params.toString(),count:limit+24})}>Load More Products<ArrowUpRight size={16} aria-hidden="true" /></button>}</div>}
   </div>
  </section>
  <ContactCTA />
 </div>;
}
