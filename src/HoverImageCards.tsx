import { ArrowUpRight } from 'lucide-react';

type Card = { id: string; title: string; image: string; alt: string; description: string; href: string; action?: string };
export default function HoverImageCards({ items }: { items: Card[] }) {
  return <div className="automation-service-grid">{items.map(item => <article key={item.id} id={item.id} className="automation-service-card"><a href={item.href}><div className="automation-service-photo"><img src={item.image} alt={item.alt} loading="lazy" width={900} height={1200} /></div><span className="automation-service-label" aria-hidden="true">{item.title}</span><div className="automation-service-card-copy"><h3>{item.title}</h3><p>{item.description}</p><span className="automation-service-more">{item.action ?? 'Explore more'}<ArrowUpRight size={15} /></span></div></a></article>)}</div>;
}
