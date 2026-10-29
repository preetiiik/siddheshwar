import { useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Cpu, Lightbulb, FileBadge, Cable, PencilRuler, Layers, SlidersHorizontal, ImageOff } from 'lucide-react';
import { certificates, technologyPartners, certificatePreviewSlots, type Certificate, type TechnologyPartner } from './certifications-data';
import { allProducts, productHref } from './product-data';

const standards = [
  { id: 'knx-technology', name: 'KNX Technology', Icon: Cpu, description: 'An internationally recognized standard for building automation, supporting coordinated control of compatible lighting, climate, shading and other building systems.', productIds: ['knx-smart-touch-panels', 'knx-switching-actuators', 'smart-climate-hvac-controllers'] },
  { id: 'dali-technology', name: 'DALI Technology', Icon: Lightbulb, description: 'A digital lighting control protocol designed for flexible lighting management, dimming and individual or grouped luminaire control.', productIds: ['dali-lighting-controllers'] },
];
const quality = [
  { title: 'Technology Compatibility', description: 'Selecting suitable products and protocols for coordinated system operation.', Icon: Cable },
  { title: 'Thoughtful System Design', description: 'Planning solutions around the requirements of each space.', Icon: PencilRuler },
  { title: 'Professional Integration', description: 'Bringing compatible automation and lighting components together.', Icon: Layers },
  { title: 'Long-Term Usability', description: 'Prioritizing intuitive control, flexibility and maintainability.', Icon: SlidersHorizontal },
];
const ease = [.22, 1, .36, 1] as const;

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = Boolean(useReducedMotion());
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: reduced ? 0 : .7, delay: reduced ? 0 : delay, ease }}>{children}</motion.div>;
}

function CertificateCard({ certificate }: { certificate: Certificate }) {
  const [missing, setMissing] = useState(false);
  return <article className="trust-certificate-card"><div className="trust-certificate-image">{missing ? <div className="trust-document-fallback"><FileBadge size={35} strokeWidth={1.2} aria-hidden="true" /><span>Preview unavailable</span></div> : <img src={certificate.image} alt={`${certificate.name}, issued by ${certificate.issuer}`} loading="lazy" decoding="async" width={630} height={891} onError={() => setMissing(true)} />}</div><div className="trust-certificate-details"><h3>{certificate.name}</h3><p>{certificate.issuer}</p>{certificate.year && <p>{certificate.year}</p>}<a href={certificate.documentUrl ?? certificate.image} target="_blank" rel="noopener noreferrer" aria-label={`View ${certificate.name} certificate in a new tab`}>View Certificate<ArrowUpRight size={17} /></a></div></article>;
}

function PartnerLogo({ partner }: { partner: TechnologyPartner }) {
  const [missing, setMissing] = useState(false);
  const content = missing ? <span>{partner.name}</span> : <img src={partner.logo} alt={partner.name} width={220} height={90} loading="lazy" onError={() => setMissing(true)} />;
  return partner.website ? <a className="trust-partner" href={partner.website} target="_blank" rel="noopener noreferrer">{content}</a> : <div className="trust-partner">{content}</div>;
}

export default function CertificationsPage() {
  const reduced = Boolean(useReducedMotion());
  const verifiedCertificates = certificates.filter(certificate => certificate.verified);
  const confirmedPartners = technologyPartners.filter(partner => partner.confirmed);
  return <div className="trust-page">
    <section className="trust-hero" aria-labelledby="trust-title"><motion.img className="trust-hero-image" src="/lighting-home.png" alt="Architectural lighting and connected living in an elegant home interior" width={1774} height={887} fetchPriority="high" initial={reduced ? false : { scale: 1.035 }} animate={{ scale: 1 }} transition={{ duration: reduced ? 0 : 1.8, ease }} /><div className="trust-hero-shade" /><div className="trust-inner trust-hero-content"><nav aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span aria-current="page">Certifications</span></nav><Reveal><p className="trust-eyebrow">TECHNOLOGY &amp; TRUST</p><h1 id="trust-title">Engineered for Intelligence.<br /><span>Built on Standards.</span></h1><p>Discover the technologies, integration principles and quality-focused approach behind thoughtfully connected spaces.</p></Reveal></div></section>

    <section id="technology-standards" className="trust-section" aria-labelledby="trust-standards-title"><div className="trust-inner"><Reveal className="trust-heading"><p className="trust-eyebrow">TECHNOLOGY STANDARDS</p><h2 id="trust-standards-title">Technology That<br /><span>Connects Everything</span></h2><p>Explore established technologies that support intelligent control and integrated lighting.</p></Reveal><div className="trust-standards-grid">{standards.map(({ id, name, Icon, description, productIds }, index) => <Reveal key={id} delay={index * .1}><article id={id} className="trust-standard-card"><Icon size={31} strokeWidth={1.2} aria-hidden="true" /><h3>{name}</h3><p>{description}</p><h4>Related Products</h4><ul>{productIds.map(id => { const product = allProducts.find(item => item.id === id); return product ? <li key={id}><a href={productHref(product)}>{product.name}<ArrowUpRight size={16} /></a></li> : null; })}{id === 'dali-technology' && <li><a href="/products/lighting">Compatible Dimmable Lighting Systems<ArrowUpRight size={16} /></a></li>}</ul></article></Reveal>)}</div><p className="trust-standards-note">Technology standards describe how compatible systems can work together; they do not represent company certification. Product and driver compatibility is confirmed for each project.</p></div></section>

    <section id="company-certifications" className="trust-section trust-light trust-certificate-section" aria-labelledby="trust-certificates-title"><div className="trust-inner"><Reveal><h2 id="trust-certificates-title" className="trust-gallery-heading">Achievement &amp; Certificates</h2></Reveal>{verifiedCertificates.length ? <div className="trust-certificates-grid">{verifiedCertificates.map((certificate, index) => <Reveal key={certificate.id} delay={(index % 3) * .08}><CertificateCard certificate={certificate} /></Reveal>)}</div> : <div className="certificates-grid">{certificatePreviewSlots.map((slot,index) => <Reveal key={slot.id} delay={index * .06}><figure className="certificate-card"><div className="certificate-paper"><div className="certificate-placeholder"><FileBadge size={39} strokeWidth={1} aria-hidden="true" /><span>Certificate image<br />to be added</span><small>PREVIEW PLACEHOLDER</small></div></div><figcaption>{slot.title}</figcaption></figure></Reveal>)}</div>}<p className="certificates-note">{verifiedCertificates.length ? 'Select View Certificate to open the full-size document.' : 'Certificate images and verified credential details will be added once provided.'}</p></div></section>

    <section id="technology-partners" className="trust-section trust-light trust-partners-section" aria-labelledby="trust-partners-title"><div className="trust-inner"><Reveal className="trust-heading"><p className="trust-eyebrow">CONNECTED ECOSYSTEMS</p><h2 id="trust-partners-title">Technology Partners</h2><p>Working with compatible technologies and trusted industry ecosystems.</p></Reveal>{confirmedPartners.length ? <div className="trust-partner-grid">{confirmedPartners.map(partner => <PartnerLogo key={partner.id} partner={partner} />)}</div> : <div className="trust-partner-empty">{import.meta.env.DEV ? <><ImageOff size={22} strokeWidth={1.3} aria-hidden="true" /><div><strong>Development placeholder</strong><p>Confirmed partner names and approved logos have not been supplied. No brands are presented as official partners.</p></div></> : <p>Partner details will be added when confirmed.</p>}</div>}</div></section>

    <section id="quality-and-integration" className="trust-section" aria-labelledby="trust-quality-title"><div className="trust-inner"><Reveal className="trust-heading"><p className="trust-eyebrow">QUALITY &amp; INTEGRATION</p><h2 id="trust-quality-title">Designed for<br /><span>Reliable Integration</span></h2></Reveal><div className="trust-quality-grid">{quality.map(({ title, description, Icon }, index) => <Reveal key={title} delay={index * .07}><article className="trust-quality-card"><Icon size={27} strokeWidth={1.25} aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article></Reveal>)}</div></div></section>

    <section className="trust-section trust-cta" aria-labelledby="trust-cta-title"><Reveal className="trust-inner"><p className="trust-eyebrow">THOUGHTFULLY CONNECTED</p><h2 id="trust-cta-title">Let's Make Your<br /><span>Space Smarter.</span></h2><p>Explore the right combination of automation technology and lighting for your next project.</p><div className="trust-cta-actions"><a href="/contact" className="trust-primary-link">Discuss Your Project<ArrowUpRight size={18} /></a><a href="/solutions" className="trust-secondary-link">Explore Our Solutions<ArrowUpRight size={18} /></a></div></Reveal></section>
  </div>;
}
