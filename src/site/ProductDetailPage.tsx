import { useEffect, useState } from 'react';
import featureReview from './product-feature-review.json';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, Check, FileText, SlidersHorizontal, ShieldCheck, PanelTop, Thermometer, Layers3, Lightbulb, Hand, Wifi, Network, Smartphone, PanelsTopLeft, LayoutGrid, Gem, Workflow } from 'lucide-react';
import { ContactCTA, Reveal } from './components';
import { SiteImage } from './Image';
import { productCategory, productEnquiryPath, relatedProducts, resolveProduct, verifiedFeatures, verifiedSpecifications } from './product-detail-data';
import './product-detail.css';

function featureIcon(text:string) {
 if (/temperature|humidity|climate|sensor/i.test(text)) return Thermometer;
 if (/light|dimm|brightness/i.test(text)) return Lightbulb;
 if (/button|touch|rocker/i.test(text)) return Hand;
 if (/wireless|wifi/i.test(text)) return Wifi;
 if (/knx|integration|connect/i.test(text)) return Network;
 if (/phone|app/i.test(text)) return Smartphone;
 if (/blind|curtain|shad/i.test(text)) return PanelsTopLeft;
 if (/configur|adjust/i.test(text)) return SlidersHorizontal;
 if (/display|screen/i.test(text)) return PanelTop;
 if (/material|finish|glass/i.test(text)) return Gem;
 if (/security|access/i.test(text)) return ShieldCheck;
 if (/scene|automation/i.test(text)) return Workflow;
 if (/function|control/i.test(text)) return LayoutGrid;
 return Layers3;
}
type Feature = { title:string; description:string; verificationStatus:string };
const reviewData: Record<string, { features: Feature[]; verifiedFeatures?: Feature[] }> = featureReview;
export default function ProductDetailPage() {
 const {productSlug}=useParams();
 const location=useLocation();
 const product=resolveProduct(productSlug);
 const [activeImage,setActiveImage]=useState(0);
 useEffect(()=>{setActiveImage(0);},[productSlug]);
 if(!product)return <section className="s-container dp-not-found"><p className="dp-label">PRODUCT NOT FOUND</p><h1>This product could not be found.</h1><p>Explore the current catalogue or contact us for help finding a model.</p><Link className="dp-button" to="/products">Back to Products<ArrowUpRight size={17} /></Link></section>;
 if(location.pathname!==product.detailPath)return <Navigate to={product.detailPath!} replace />;
 const category=productCategory(product)!;
 const isReviewedOriginal = Boolean(reviewData[product.id]);
 // Only the two Theben entries have supplied model-specific manufacturer documentation.
 const features: Feature[] = isReviewedOriginal ? (reviewData[product.id].verifiedFeatures || []) : verifiedFeatures(product).map((description, i) => ({ title:`Product feature ${i+1}`, description, verificationStatus:'existing' }));
 const specs=verifiedSpecifications(product);
 const related=relatedProducts(product);
 const images=[{src:product.image,alt:product.alt},...(product.galleryImages||[]).filter(img=>img.src!==product.image)];
 const photo=images[activeImage]||images[0];
 const contact=productEnquiryPath(product);
 const description=features.length?product.shortDescription:`Explore ${product.brand} ${product.name}, listed in our ${category.name} collection.`;
 return <article className="dp-page">
  <section className="dp-hero" aria-labelledby="dp-product-title"><div className="dp-hero-art" aria-hidden="true"><SiteImage src={product.image} alt="" width={900} height={650} /></div><div className="s-container"><nav className="dp-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/products">Products</Link><span>/</span><Link to={`/products?category=${category.id}`}>{category.name}</Link><span>/</span><Link to={`/products?brand=${encodeURIComponent(product.brand!)}`}>{product.brand}</Link></nav><Reveal><p className="dp-label">{category.name}</p><h1 id="dp-product-title">{product.name}</h1><p>{description}</p></Reveal></div></section>
  <section className="dp-overview dp-section s-container" aria-labelledby="dp-overview-title"><Reveal className="dp-gallery" direction="left" distance={48}><div className="dp-image"><SiteImage key={photo.src} src={photo.src} alt={photo.alt} width={900} height={750} fetchPriority="high" decoding="async" />{product.imageStatus==='placeholder'&&<span>Illustrative placeholder · image under review</span>}</div>{images.length>1&&<div className="dp-thumbnails" role="group" aria-label="Product images">{images.map((img,i)=><button key={img.src} type="button" aria-label={`View product image ${i+1}`} aria-pressed={activeImage===i} onClick={()=>setActiveImage(i)}><SiteImage src={img.src} alt="" width={100} height={100} /></button>)}</div>}</Reveal><Reveal className="dp-overview-copy" direction="right" distance={48} delay={.08}><Link className="dp-label" to={`/products?brand=${encodeURIComponent(product.brand!)}`}>{product.brand}</Link><h2 id="dp-overview-title">{product.name}</h2><p className="dp-model">{product.modelNumber?`Model / article: ${product.modelNumber}`:category.name}{product.productKind==='software'?' · Software / platform':''}</p><p>{product.fullDescription}</p>{features.length>0&&<ul className="dp-highlights">{features.slice(0,3).map(f=><li key={f.title}><Check size={16} aria-hidden="true" />{f.description}</li>)}</ul>}{product.verificationStatus==='user-supplied'&&<p className="dp-review-note">This name was supplied for the catalogue. Manufacturer model details require confirmation.</p>}<div className="dp-actions"><Link className="dp-button" to={contact}>Request Consultation<ArrowUpRight size={17} aria-hidden="true" /></Link><Link className="dp-button dp-button-outline" to={`/products?category=${category.id}`}><ArrowLeft size={16} aria-hidden="true" />Back to Products</Link></div>{product.catalogUrl&&<a className="dp-source" href={`${product.catalogUrl}${product.contentSource?.pages[0]?`#page=${product.contentSource.pages[0]}`:''}`} target="_blank" rel="noreferrer"><FileText size={16} aria-hidden="true" />View supplied product catalogue<ArrowUpRight size={14} aria-hidden="true" /></a>}</Reveal></section>
  <section className="dp-features dp-section" aria-labelledby="dp-features-title"><div className="s-container"><Reveal className="dp-heading"><p className="dp-label">KEY FEATURES</p><h2 id="dp-features-title">Designed for Everyday Intelligent Living</h2></Reveal>{features.length>0?<div className="dp-feature-grid">{features.map(f=>{const Icon=featureIcon(f.title+' '+f.description);return <div key={f.title}><Icon size={25} strokeWidth={1.4} aria-hidden="true" /><div><h3>{f.title}</h3><p>{f.description}</p></div></div>;})}</div>:<div className="dp-content-pending"><p>Feature details depend on the exact model and will be confirmed with your selection.</p><Link to={contact}>Ask our team for product information<ArrowUpRight size={15} aria-hidden="true" /></Link></div>}</div></section>
  <section className="dp-section s-container dp-specifications" aria-labelledby="dp-spec-title"><Reveal className="dp-heading"><p className="dp-label">{product.productKind==='software'?'PLATFORM INFORMATION':'PRODUCT INFORMATION'}</p><h2 id="dp-spec-title">Technical Overview</h2></Reveal>{specs.length>0&&<dl className={specs.length<=3?'dp-spec-cards':'dp-spec-table'}>{specs.map((s,i)=><Reveal key={s.label} delay={(i%4)*.04}><dt>{s.label}</dt><dd>{s.value}</dd></Reveal>)}</dl>}<p className="dp-spec-note">Only supplied product information is shown. {product.productKind==='software'?'Platform requirements and supported services':'Model-specific installation and compatibility details'} are confirmed during consultation.</p></section>
  <section className="dp-related dp-section" aria-labelledby="dp-related-title"><div className="s-container"><Reveal className="dp-heading"><p className="dp-label">CONTINUE EXPLORING</p><h2 id="dp-related-title">Explore More in This Range</h2></Reveal><div className="dp-related-grid">{related.map(p=><Link className="dp-related-card" to={p.detailPath!} key={p.id}><div><SiteImage src={p.image} alt={p.alt} width={600} height={500} loading="lazy" /></div><p>{p.brand}</p><h3>{p.name}</h3><span className="dp-related-meta">{productCategory(p)?.name}<span><ArrowUpRight size={16} aria-hidden="true" /></span></span></Link>)}</div></div></section>
  <ContactCTA className="dp-cta" headingId="dp-cta-title" buttonClassName="dp-button" to={contact} />
 </article>;
}
