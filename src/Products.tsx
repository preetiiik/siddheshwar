import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { allProducts, catalogProducts, lightingProducts, lightingItems, productGroups, productHref, resolveProduct, type Product } from './product-data';
import { getSolutionsUsingProduct } from './solution-products';

export function ProductGrid({ products, dark = false, actionLabel = 'Explore Product' }: { products: Product[]; dark?: boolean; actionLabel?: string }) {
  const reduced = Boolean(useReducedMotion());
  return <div className={`product-grid ${dark ? 'product-grid-dark' : ''}`}>{products.map((product, index) => <motion.a key={product.id} href={productHref(product)} className="catalog-product-card" initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .45, delay: reduced ? 0 : (index % 4) * .07 }}><div className="catalog-product-image"><img src={product.image} alt={product.alt} loading="lazy" decoding="async" width={800} height={600} /></div><div className="catalog-product-copy"><p className="catalog-product-label">{product.category === 'automation' ? 'Automation' : product.parentId ? lightingProducts.find(item => item.id === product.parentId)?.name : 'Lighting category'}</p><h3>{product.name}</h3><p className="catalog-product-description">{product.shortDescription}</p><span>{actionLabel}<ArrowUpRight size={17} /></span></div></motion.a>)}</div>;
}

export function ProductCategoryCards() {
  const [filter, setFilter] = useState<'all' | 'automation' | 'lighting'>('all');
  const [lightingType, setLightingType] = useState('all');
  const products = catalogProducts.filter(product => (filter === 'all' || product.category === filter) && (filter !== 'lighting' || lightingType === 'all' || product.parentId === lightingType));
  return <div className="catalog-browser">
    <div className="catalog-filter-row"><div role="group" aria-label="Filter products by category" className="catalog-filters catalog-main-filters">{[
      { value: 'all', label: 'All Products' },
      { value: 'automation', label: 'Automation' },
      { value: 'lighting', label: 'Lighting' },
    ].map(option => <button key={option.value} type="button" aria-pressed={filter === option.value} aria-controls="filtered-product-list" onClick={() => { setFilter(option.value as typeof filter); setLightingType('all'); }}>{option.label}</button>)}</div><p role="status">{products.length} {filter === 'lighting' ? 'lighting products' : filter === 'automation' ? 'automation products' : 'products'}</p></div>
    {filter === 'lighting' && <div role="group" aria-label="Filter by lighting type" className="catalog-filters catalog-type-filters mt-5"><button type="button" aria-pressed={lightingType === 'all'} onClick={() => setLightingType('all')}>All Lighting</button>{lightingProducts.map(type => <button key={type.id} type="button" aria-pressed={lightingType === type.id} onClick={() => setLightingType(type.id)}>{type.name}</button>)}</div>}
    <div id="filtered-product-list"><ProductGrid products={products} /></div>
    <p className="catalog-note">Model options and installation requirements are confirmed for your project.</p>
  </div>;
}

function ProductBreadcrumb({ product }: { product: Product }) {
  return <nav aria-label="Breadcrumb" className="catalog-breadcrumb"><a href="/">Home</a><span>/</span><a href="/products">Products</a><span>/</span><a href={`/products/${product.category}`}>{product.category === 'automation' ? 'Automation' : 'Lighting'}</a><span>/</span>{product.parentId && <><a href={`/products/lighting/${product.parentId}`}>{lightingProducts.find(item => item.id === product.parentId)?.name}</a><span>/</span></>}<span aria-current="page">{product.name}</span></nav>;
}

function ProductFeature({ text }: { text: string }) {
  const separator = text.indexOf(':');
  return separator > 0 && separator < 85 ? <span><strong className="catalog-feature-label">{text.slice(0, separator)}:</strong> {text.slice(separator + 1).trim()}</span> : <span>{text}</span>;
}

function ProductDetailPage({ product }: { product: Product }) {
  const related = allProducts.filter(item => product.relatedProductIds.includes(item.id));
  const relatedSolutions = getSolutionsUsingProduct(product.id);
  return <div className="catalog-detail">
    <section className="catalog-detail-hero"><div className="mx-auto max-w-[1344px]"><ProductBreadcrumb product={product} /><div className="catalog-detail-layout"><div><p className="product-eyebrow">{product.category === 'automation' ? 'AUTOMATION PRODUCTS' : product.parentId ? 'LIGHTING PRODUCTS' : 'LIGHTING CATEGORY'}</p><h1>{product.name}</h1><p className="catalog-detail-intro">{product.shortDescription}</p><a className="catalog-enquire" href={`/contact?interest=${encodeURIComponent(product.name)}#contact`}>Enquire Now<ArrowUpRight size={19} /></a><p className="catalog-note">Product appearance may vary by selected model.</p></div><img className="catalog-detail-visual" src={product.image} alt={product.alt} width={800} height={600} fetchPriority="high" /></div></div></section>
    <section className="catalog-detail-section"><div className="mx-auto max-w-[1344px]"><h2>Product Overview</h2><div className="catalog-overview">{product.fullDescription.split('\n\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div><div className="catalog-features"><div><h3>Key Features</h3><ul>{product.features.map(feature => <li key={feature}><Check size={17} /><ProductFeature text={feature} /></li>)}</ul></div><div><h3>Applications</h3><ul>{product.applications.map(application => <li key={application}><Check size={17} /><span>{application}</span></li>)}</ul></div></div></div></section>
    {(product.controlledAppliances?.length || product.specifications?.length) ? <section className="catalog-detail-section bg-[#eef4fb]"><div className="mx-auto max-w-[1344px] catalog-product-facts">{product.controlledAppliances && <div><h2>Appliances You Can Control</h2><ul className="catalog-appliances">{product.controlledAppliances.map(appliance => <li key={appliance}><Check size={17} aria-hidden="true" />{appliance}</li>)}</ul></div>}{product.specifications && <div><h2>Technical Specifications</h2><dl className="catalog-specifications">{product.specifications.map(specification => <div key={specification.label}><dt>{specification.label}</dt><dd>{specification.value}</dd></div>)}</dl></div>}</div></section> : null}
    {(product.contentSections?.length || product.closingLine) ? <section className="catalog-detail-section"><div className="mx-auto max-w-[1344px] catalog-editorial-content">{product.contentSections?.map(section => <div key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>)}{product.closingLine && <p className="catalog-closing-line">{product.closingLine}</p>}</div></section> : null}
    {product.category === 'lighting' && !product.parentId && <section className="catalog-detail-section bg-[#eef4fb]"><div className="mx-auto max-w-[1344px]"><h2>Explore {product.name}</h2><p className="catalog-overview">Choose a lighting type to explore its applications. Specific fixture models and technical details are confirmed during project planning.</p><ProductGrid products={lightingItems.filter(item => item.parentId === product.id)} /></div></section>}
    <section className="catalog-detail-section"><div className="mx-auto max-w-[1344px]"><h2>Solutions Using This Product</h2><p className="catalog-overview">Proposed applications for this product category. Final selection and compatibility are confirmed for your project.</p><div className="catalog-solution-links">{relatedSolutions.map(solution => <a key={solution.slug} href={`/solutions/${solution.slug}`}>{solution.title}<ArrowUpRight size={18} /></a>)}</div></div></section>
    <section className="catalog-detail-section bg-[#eef4fb]"><div className="mx-auto max-w-[1344px]"><h2>Related Products</h2><ProductGrid products={related} /><a href={`/products/${product.category}`} className="catalog-back"><ArrowLeft size={17} />All {product.category === 'automation' ? 'Automation' : 'Lighting'} Products</a></div></section>
  </div>;
}

function ProductGroupListing({ group }: { group: typeof productGroups[number] }) {
  const [lightingType, setLightingType] = useState('all');
  const products = group.slug === 'lighting' && lightingType !== 'all'
    ? group.products.filter(product => product.parentId === lightingType)
    : group.products;
  return <div>
    {group.slug === 'lighting' && <div className="catalog-filter-row mt-8"><div role="group" aria-label="Filter lighting by type" className="catalog-filters catalog-type-filters"><button type="button" aria-pressed={lightingType === 'all'} aria-controls="lighting-type-products" onClick={() => setLightingType('all')}>All Lighting</button>{lightingProducts.map(type => <button key={type.id} type="button" aria-pressed={lightingType === type.id} aria-controls="lighting-type-products" onClick={() => setLightingType(type.id)}>{type.name}</button>)}</div><p role="status">{products.length} lighting products</p></div>}
    <div id={group.slug === 'lighting' ? 'lighting-type-products' : undefined}><ProductGrid products={products} /></div>
  </div>;
}

export function ProductCategoryDetail({ slug }: { slug: string }) {
  const group = productGroups.find(item => item.slug === slug);
  if (group) return <section className="catalog-category"><div className="mx-auto max-w-[1344px]"><nav aria-label="Breadcrumb" className="catalog-breadcrumb"><a href="/">Home</a><span>/</span><a href="/products">Products</a><span>/</span><span aria-current="page">{group.title}</span></nav><p className="product-eyebrow">CURATED FOR YOUR SPACE</p><h1>{group.title}</h1><p className="catalog-overview">{group.description}</p><ProductGroupListing group={group} /><p className="catalog-note">Model options and installation requirements are confirmed during project planning.</p><a href="/products" className="catalog-back"><ArrowLeft size={16} />All Product Categories</a></div></section>;
  const product = resolveProduct(slug);
  if (!product) return <section className="automation-detail-missing"><h1>Product not found</h1><a href="/products">All Product Categories</a></section>;
  return <ProductDetailPage product={product} />;
}
