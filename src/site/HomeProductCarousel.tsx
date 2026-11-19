import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { unifiedCatalogue } from './unified-catalogue';
import { catalogueCategories } from './product-categories';
import { SiteImage } from './Image';
import { Reveal } from './components';
import './home-product-carousel.css';

const featured=['akubela-hypanel-supreme','akubela-hypanel-lux-ring','akubela-hypanel-lux-piano','akubela-hypanel-lux-vase'];
const products=[...unifiedCatalogue].sort((a,b)=>{
 const rank=(id:string,placeholder:boolean)=>featured.includes(id)?featured.indexOf(id):placeholder?6:5;
 return rank(a.id,a.imageStatus==='placeholder')-rank(b.id,b.imageStatus==='placeholder');
});
const filterIds=['smart-touch-panels','curtain-controllers','smart-remote-controls','smart-keypad-switches','actuators-gateways','video-door-phones','smart-door-locks'];
export default function HomeProductCarousel() {
 const [category,setCategory]=useState('all');
 const [edges,setEdges]=useState({start:true,end:false});
 const track=useRef<HTMLDivElement>(null);
 const drag=useRef<{x:number;left:number;moved:boolean}|null>(null);
 const suppressClick=useRef(false);
 const reduced=useReducedMotion();
 const filtered=products.filter(p=>category==='all'||p.primaryCategory===category);
 const update=useCallback(()=>{const el=track.current;if(!el)return;const next={start:el.scrollLeft<=4,end:el.scrollWidth-el.clientWidth-el.scrollLeft<=4};setEdges(old=>old.start===next.start&&old.end===next.end?old:next);},[]);
 useEffect(()=>{const el=track.current;if(!el)return;el.scrollTo({left:0,behavior:'instant'});const resize=new ResizeObserver(update);resize.observe(el);update();return()=>resize.disconnect();},[category,update]);
 const move=(direction:number,edge?:'start'|'end')=>{const el=track.current;if(!el)return;const step=(el.firstElementChild?.getBoundingClientRect().width||el.clientWidth)+parseFloat(getComputedStyle(el).columnGap);el.scrollTo({left:edge==='start'?0:edge==='end'?el.scrollWidth:el.scrollLeft+step*direction,behavior:reduced?'instant':'smooth'});};
 const endDrag=()=>{if(drag.current?.moved){suppressClick.current=true;window.setTimeout(()=>{suppressClick.current=false;},0);}drag.current=null;if(track.current)track.current.style.scrollSnapType='';};
 return <section className="hpc-section" aria-labelledby="home-product-range-title"><div className="s-container">
  <Reveal className="hpc-heading"><p className="hpc-label">OUR PRODUCTS</p><h2 id="home-product-range-title">Explore our smart home <span>range</span></h2><p>Premium smart controls, designed for modern living.</p></Reveal>
  <div className="hpc-filters" role="group" aria-label="Filter homepage products"><button type="button" aria-pressed={category==='all'} onClick={()=>setCategory('all')}>All Products</button>{filterIds.map(id=>{const c=catalogueCategories.find(c=>c.id===id)!;return <button type="button" key={id} aria-pressed={category===id} onClick={()=>setCategory(id)}>{c.name}</button>;})}</div>
  <div className="hpc-frame"><button className="hpc-nav hpc-prev" type="button" disabled={edges.start} aria-label="Previous products" aria-controls="home-product-track" onClick={()=>move(-1)}><ArrowLeft size={19} /></button>
   <div id="home-product-track" className="hpc-track" ref={track} tabIndex={0} role="region" aria-label="Product range. Swipe or use arrow keys to browse." onScroll={update} onKeyDown={e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();move(e.key==='ArrowLeft'?-1:1,e.key==='Home'?'start':e.key==='End'?'end':undefined);}}} onPointerDown={e=>{if(e.pointerType==='mouse'&&e.button===0)drag.current={x:e.clientX,left:e.currentTarget.scrollLeft,moved:false};}} onPointerMove={e=>{if(!drag.current||e.buttons!==1)return;const dx=e.clientX-drag.current.x;if(Math.abs(dx)>6){drag.current.moved=true;e.preventDefault();e.currentTarget.style.scrollSnapType='none';e.currentTarget.setPointerCapture(e.pointerId);e.currentTarget.scrollLeft=drag.current.left-dx;}}} onPointerUp={endDrag} onPointerCancel={endDrag} onClickCapture={e=>{if(suppressClick.current){e.preventDefault();e.stopPropagation();}}} onDragStart={e=>e.preventDefault()}>
    {filtered.map(p=><Link className="hpc-card" to={p.detailPath!} key={p.id} aria-label={`View ${p.name}`}><div className="hpc-image"><SiteImage src={p.image} alt={p.alt} loading="lazy" decoding="async" width={600} height={500} />{p.imageStatus==='placeholder'&&<span>Illustrative artwork</span>}</div><h3>{p.name}</h3><p className="hpc-brand">{p.brand}</p><p className="hpc-category">{catalogueCategories.find(c=>c.id===p.primaryCategory)?.name}</p><span className="hpc-view">View Product<ArrowUpRight size={15} aria-hidden="true" /></span></Link>)}
   </div><button className="hpc-nav hpc-next" type="button" disabled={edges.end} aria-label="Next products" aria-controls="home-product-track" onClick={()=>move(1)}><ArrowRight size={19} /></button>
  </div>
  <div className="hpc-footer"><Link to={category==='all'?'/products':`/products?category=${category}`}>Explore All Products<ArrowUpRight size={17} aria-hidden="true" /></Link><span className="s-sr-only" role="status">{filtered.length} products in this selection</span></div>
 </div></section>;
}
