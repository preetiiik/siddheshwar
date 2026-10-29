import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { lightingServices, lightingApplications } from './lighting-data';
import HoverImageCards from './HoverImageCards';

export function LightingCards() {
  return <HoverImageCards items={lightingServices.map(service => ({ id: service.slug, title: service.title, image: service.image, alt: `Illustrative interior for ${service.title.toLowerCase()}`, description: service.description, href: `/lighting/${service.slug}`, action: 'Explore lighting' }))} />;
}

export function LightingDetail({ slug }: { slug: string }) {
  const service = lightingServices.find(s => s.slug === slug);
  if (!service) return <section className="automation-detail-missing"><h1>Lighting solution not found</h1><a href="/lighting">All Lighting Solutions</a></section>;
  return <><section className="automation-detail"><div className="automation-detail-inner"><nav aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/lighting">Lighting</a><span>/</span><span>{service.title}</span></nav><div className="automation-detail-layout"><div className="automation-detail-copy"><p className="automation-detail-eyebrow">INTELLIGENT LIGHTING SOLUTIONS</p><h1>{service.title}</h1><p>{service.description}</p><p>Plan compatible lighting fixtures, sensors and controllers around your space, activities and preferred atmosphere.</p><a href={`/contact?interest=${encodeURIComponent(service.title)}#contact`} className="automation-detail-cta">Discuss Your Lighting<ArrowUpRight size={18} /></a><a href="/lighting#our-lighting-solutions" className="automation-detail-back"><ArrowLeft size={15} />All Lighting Solutions</a></div><div className="automation-detail-image"><img src={service.image} alt={`Illustrative interior for ${service.title.toLowerCase()}`} width={1200} height={900} fetchPriority="high" /></div></div></div></section><section className="automation-detail-features"><div><p className="automation-detail-eyebrow">DESIGNED FOR YOUR SPACE</p><h2>Lighting Applications</h2><ul>{lightingApplications.map(application => <li key={application}><Check size={18} /><span>{application}</span></li>)}</ul><p className="automation-detail-note">Illustrative imagery. Final capabilities depend on the selected fixtures and compatible control systems.</p></div></section><section className="automation-related"><h2>More Lighting Solutions</h2><div>{lightingServices.filter(s => s.slug !== slug).map(s => <a key={s.slug} href={`/lighting/${s.slug}`}>{s.title}<ArrowUpRight size={16} /></a>)}</div></section></>;
}
