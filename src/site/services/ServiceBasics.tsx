import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { unifiedCatalogue } from '../unified-catalogue';
import { SiteImage } from '../Image';
import { Reveal } from '../components';

export function ServiceBreadcrumb({name}:{name:string}) {
 return <nav className="sv-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>{name}</span></nav>;
}
export function ServiceProducts({ids,title}:{ids:string[];title:string}) {
 const products=ids.flatMap(id=>unifiedCatalogue.find(p=>p.id===id)||[]);
 return <section className="sv-section s-container"><Reveal className="sv-heading"><p className="sv-label">EXPLORE THE TECHNOLOGY</p><h2>{title}</h2></Reveal><div className="sv-products">{products.map(p=><Link key={p.id} to={p.detailPath!}><div><SiteImage src={p.image} alt={p.alt} width={600} height={500} loading="lazy" /></div><p>{p.brand}</p><h3>{p.name}</h3><span>View product<ArrowUpRight size={17} aria-hidden="true" /></span></Link>)}</div><p className="sv-note">Product selection and supported functions are assessed for the requirements of your project.</p></section>;
}
