import { Link } from 'react-router-dom';
import { ArrowUpRight, SlidersHorizontal, Smartphone, PanelsTopLeft, Network, Tablet, Video, LockKeyhole } from 'lucide-react';
import { Reveal } from './components';
import { SiteImage } from './Image';
import { homepageProductCategories, categoryCataloguePath } from './product-categories';
import './products-showcase.css';
const categoryOrder = [
 {id:'smart-keypad-switches',Icon:SlidersHorizontal},
 {id:'smart-remote-controls',Icon:Smartphone},
 {id:'curtain-controllers',Icon:PanelsTopLeft},
 {id:'actuators-gateways',Icon:Network},
 {id:'smart-touch-panels',Icon:Tablet},
 {id:'video-door-phones',Icon:Video},
 {id:'smart-door-locks',Icon:LockKeyhole},
];
export default function OurProducts() {
 return <section className="s-product-categories" aria-labelledby="home-products-title"><div className="s-container">
  <Reveal className="s-category-heading"><p className="s-category-label">OUR PRODUCT CATEGORIES</p><h2 id="home-products-title">Shop by Category</h2><p>Discover smart technology products designed to bring comfort, convenience and intelligent control into your space.</p></Reveal>
  <div className="s-category-grid">{categoryOrder.map(({id,Icon})=>{
   const category=homepageProductCategories.find(c=>c.id===id)!;
   return <Link key={id} className={`s-category-tile s-category-tile--${id} ${category.image ? 'has-image' : 'is-pending'}`} to={categoryCataloguePath(id)} aria-label={`Explore ${category.name}`}>{category.image && <SiteImage src={category.image} alt={category.alt} loading="lazy" decoding="async" width={800} height={650} />}<div className="s-category-tile-copy"><span className="s-category-tile-icon"><Icon size={22} strokeWidth={1.35} aria-hidden="true" /></span><h3>{category.name}</h3><p>{category.description}</p>{!category.image && <span className="s-category-pending-note">Product imagery coming soon</span>}</div><ArrowUpRight className="s-category-tile-arrow" size={19} strokeWidth={1.5} aria-hidden="true" /></Link>;
  })}</div><div className="s-category-all"><Link to="/products#catalogue-filters">Explore All 12 Categories<ArrowUpRight size={16} aria-hidden="true" /></Link></div>
 </div></section>;
}
