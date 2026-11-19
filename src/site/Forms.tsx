import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { company, services } from './data';

export function ContactDetails() {
  return <div className="s-contact-details"><a href="tel:+917019080943"><Phone size={20} /><span><small>Call us</small>{company.phone}</span></a><a href={`mailto:${company.email}`}><Mail size={20} /><span><small>Email us</small>{company.email}</span></a><div><MapPin size={20} /><span><small>Visit us</small>{company.address}</span></div></div>;
}
export function EnquiryForm({ support = false }: { support?: boolean }) {
  const [params] = useSearchParams();
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error' | 'unconfigured'>('idle');
  const endpoint = support ? import.meta.env.VITE_SUPPORT_ENDPOINT : import.meta.env.VITE_CONTACT_ENDPOINT;
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!endpoint) { setState('unconfigured'); return; }
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    setState('sending');
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, type: support ? 'support' : 'project' }) });
      if (!response.ok) throw new Error('Request failed');
      setState('sent');
    } catch { setState('error'); }
  }
  return <form className="s-form" onSubmit={submit}><p className="s-eyebrow">{support ? 'Product & service assistance' : 'Tell us about your space'}</p><h2>{support ? 'How can we help?' : 'Let’s start a conversation.'}</h2><p>All fields are required.</p>{params.get('interest') && <p className="s-form-interest">Product enquiry: {params.get('interest')}</p>}<input type="hidden" name="product" value={params.get('product') || params.get('interest') || ''} /><input type="hidden" name="brand" value={params.get('brand') || ''} /><input type="hidden" name="model" value={params.get('model') || ''} /><div className="s-form-grid"><label>Full Name<input name="name" autoComplete="name" required maxLength={120} /></label><label>Phone Number<input name="phone" type="tel" autoComplete="tel" required pattern="[+0-9() .\-]{7,25}" title="Enter a phone number with 7 to 25 characters." /></label><label className="s-wide">Email Address<input name="email" type="email" autoComplete="email" required maxLength={254} /></label><label htmlFor="enquiry-service">Service Interested In<select id="enquiry-service" name="service" required defaultValue=""><option value="" disabled>Select a service</option>{services.map(s => <option key={s.id}>{s.name}</option>)}</select></label><label htmlFor="enquiry-project">{support ? 'Request Type' : 'Project Type'}<select id="enquiry-project" name="projectType" required defaultValue=""><option value="" disabled>Select an option</option>{(support ? ['Product assistance', 'Existing installation', 'Service enquiry', 'Other'] : ['Apartment', 'Independent home / Villa', 'Office / Commercial', 'Hotel / Hospitality', 'Other']).map(o => <option key={o}>{o}</option>)}</select></label><label className="s-wide">{support ? 'Describe your request' : 'Message'}<textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder={support ? 'Tell us about the product, installation and assistance you need.' : 'Tell us about your space, priorities and requirements.'} /></label></div>{!endpoint && <p className="s-form-notice">Online submission is not connected yet. Please call or email us to send your enquiry.</p>}<button className="s-action" type="submit" disabled={state === 'sending' || state === 'sent'}>{state === 'sending' ? 'Sending…' : state === 'sent' ? 'Request received' : support ? 'Send Support Request' : 'Send Enquiry'}<ArrowUpRight size={17} /></button><div role="status" aria-live="polite">{state === 'unconfigured' && <p>Your enquiry has not been sent. Please use the phone or email details on this page.</p>}{state === 'sent' && <p>Thank you. Your request has been received.</p>}{state === 'error' && <p>We couldn’t send your request. Please try again or contact us by phone or email.</p>}</div></form>;
}
