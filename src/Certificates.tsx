import { useState } from 'react';
import { FileBadge } from 'lucide-react';

import { certificates as suppliedCertificates } from './certifications-data';

const certificates = suppliedCertificates.filter(certificate => certificate.verified).map(certificate => ({ title: certificate.name, image: certificate.image }));

function CertificateCard({ certificate }: { certificate: typeof certificates[number] }) {
  const [missing, setMissing] = useState(false);
  return <figure className="certificate-card"><div className="certificate-paper">{missing ? <div className="certificate-placeholder"><FileBadge size={39} strokeWidth={1} /><span>Certificate image<br />to be added</span><small>PREVIEW PLACEHOLDER</small></div> : <a href={certificate.image} target="_blank" rel="noreferrer" aria-label={`Open ${certificate.title} certificate`}><img src={certificate.image} alt={`${certificate.title} certificate`} loading="lazy" width={420} height={594} onError={() => setMissing(true)} /></a>}</div><figcaption>{certificate.title}</figcaption></figure>;
}

export default function Certificates({ embedded = false }: { embedded?: boolean }) {
  const contents = <>{!embedded && <h2 id="certificates-heading">Achievement &amp; Certificates</h2>}<div className="certificates-grid">{certificates.map(certificate => <CertificateCard key={certificate.title} certificate={certificate} />)}</div><p className="certificates-note">Select a certificate to view the full-size document.</p></>;
  if (embedded) return <div className="certificates-embedded">{contents}</div>;
  return <section id="certifications" className="certificates-section" aria-labelledby="certificates-heading"><div className="certificates-inner">{contents}</div></section>;
}
