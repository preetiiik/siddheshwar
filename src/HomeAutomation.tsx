import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { automationServices } from './automation-data';

export function AutomationServiceCards() {
  return <div className="automation-service-grid">{automationServices.map(service => <article id={service.slug} key={service.slug} className="automation-service-card">
    <a href={`/home-automation/${service.slug}`}>
      <div className="automation-service-photo"><img src={service.image} alt={service.alt} loading="lazy" width={900} height={1200} /></div>
      <span className="automation-service-label" aria-hidden="true">{service.title}</span>
      <div className="automation-service-card-copy"><h3>{service.title}</h3><p>{service.description}</p><span className="automation-service-more">Explore service <ArrowUpRight size={15} /></span></div>
    </a>
  </article>)}</div>;
}

export function AutomationServiceDetail({ slug }: { slug: string }) {
  const service = automationServices.find(service => service.slug === slug);
  if (!service) return <section className="automation-detail-missing"><h1>Service not found</h1><a href="/home-automation">Back to Home Automation</a></section>;
  return <>
    <section className="automation-detail"><div className="automation-detail-inner"><nav aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/home-automation">Home Automation</a><span>/</span><span>{service.title}</span></nav><div className="automation-detail-layout"><div className="automation-detail-copy"><p className="automation-detail-eyebrow">HOME AUTOMATION SERVICES</p><h1>{service.title}</h1><p>{service.description}</p><a className="automation-detail-cta" href={`/contact?interest=${encodeURIComponent(service.title)}#contact`}>Request a Consultation <ArrowUpRight size={18} /></a><a className="automation-detail-back" href="/home-automation#our-home-automation-services"><ArrowLeft size={15} /> All Home Automation Services</a></div><div className="automation-detail-image"><img src={service.image} alt={service.alt} width={1200} height={900} fetchPriority="high" /></div></div></div></section>
    <section className="automation-detail-features"><div><p className="automation-detail-eyebrow">THOUGHTFULLY CONNECTED</p><h2>Features &amp; Capabilities</h2><ul>{service.features.map(feature => <li key={feature}><Check size={18} /><span>{feature.charAt(0).toUpperCase() + feature.slice(1)}</span></li>)}</ul><p className="automation-detail-note">The final configuration is planned around your space and compatible devices.</p></div></section>
    <section className="automation-related"><h2>Explore More Services</h2><div>{automationServices.filter(item => item.slug !== slug).map(item => <a key={item.slug} href={`/home-automation/${item.slug}`}>{item.title}<ArrowUpRight size={16} /></a>)}</div></section>
  </>;
}
