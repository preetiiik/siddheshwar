import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Globe, Mail, MapPin, Phone, Share2, UserPlus, MessageCircle } from 'lucide-react';
import { teamMembers } from './team-data';
import type { TeamMember } from './team-data';
import { SiteImage } from './Image';
import { Reveal } from './components';

export function TeamCard({ member }: { member: TeamMember }) {
  return <Reveal><Link className="s-team-card" to={`/team/${member.id}`} aria-label={`View ${member.name}'s profile`}><SiteImage src={member.image} alt="" loading="lazy" width={600} height={700} /><span className="s-team-card-heading"><span>{member.name}</span><ArrowUpRight size={18} aria-hidden="true" /></span><span className="s-team-role">{member.designation}</span></Link></Reveal>;
}

function TeamProfile({ member }: { member: TeamMember }) {
  const vcard = `BEGIN:VCARD\r\nVERSION:3.0\r\nFN:${member.name}\r\nTITLE:${member.designation}\r\nTEL:${member.phone}\r\nEMAIL:${member.email}\r\nEND:VCARD\r\n`;
  const vcardUrl = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcard)}`;
  const shareProfile = async () => {
    const url = new URL(`/team/${member.id}`, window.location.origin);
    if (navigator.share) {
      try { await navigator.share({ title: member.name, url: url.href }); } catch { /* The visitor may cancel sharing. */ }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url.href).catch(() => {});
    }
  };
  return <div className="s-team-profile-page"><Link className="s-team-back" to="/about#our-team">Back to our team</Link><article className="s-team-modal s-team-profile-card" aria-labelledby="team-modal-name">
      <div className="s-profile-brand"><img src="/logo-f.png" alt="Siddheshwar Smart Technologies" /></div>
      <div className="s-profile-band" aria-hidden="true" />
      <div className="s-team-modal-content"><div className="s-team-modal-photo"><SiteImage src={member.image} alt={member.name} width={600} height={700} /></div>
        <h2 id="team-modal-name">{member.name}</h2><p className="s-team-modal-designation">{member.designation}</p><p id="team-modal-description" className="s-team-modal-intro">{member.shortDescription}</p>
        <div className="s-profile-actions">
          <a href={`tel:${member.phone.replace(/\s/g, '')}`}><Phone size={16} /> Call</a><a href={`https://wa.me/${member.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> WhatsApp</a><a href={`mailto:${member.email}`}><Mail size={16} /> Email</a>
          <a href="/"><Globe size={16} /> Website</a><a download={`${member.id}.vcf`} href={vcardUrl}><UserPlus size={16} /> Save Contact</a><button type="button" onClick={() => void shareProfile()}><Share2 size={16} /> Share</button>
        </div>
        <div className="s-profile-details"><div><span className="s-profile-icon s-profile-icon-phone"><Phone size={16} /></span><p><small>PHONE</small><a href={`tel:${member.phone.replace(/\s/g, '')}`}>{member.phone}</a></p></div><div><span className="s-profile-icon s-profile-icon-mail"><Mail size={16} /></span><p><small>EMAIL</small><a href={`mailto:${member.email}`}>{member.email}</a></p></div><div><span className="s-profile-icon s-profile-icon-web"><Globe size={16} /></span><p><small>WEBSITE</small><a href="/">Siddheshwar Smart Technologies</a></p></div><div><span className="s-profile-icon s-profile-icon-address"><MapPin size={16} /></span><p><small>ADDRESS</small>Siddheshwar Krupa building, opposite Government ITI College, Vidyanagar, Hubli 580021</p></div></div>
        <div className="s-profile-social"><span>CONNECT ON SOCIAL</span><div><button type="button" disabled aria-label="Instagram link unavailable"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg></button><button type="button" disabled aria-label="Facebook link unavailable"><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V10H7.7v3h2.7v8h3.1Z" /></svg></button></div></div>
      </div><div className="s-profile-footer"><strong>Siddheshwar Smart Technologies</strong><span>© {new Date().getFullYear()} Siddheshwar Smart Technologies. All rights reserved.</span><a href="/"><Globe size={13} /> Siddheshwar Smart Technologies</a></div>
    </article></div>;
}

export function TeamProfilePage() {
  const { memberId } = useParams();
  const member = teamMembers.find(person => person.id === memberId);
  if (!member) return <section className="s-container s-not-found"><h1>Team member not found.</h1><Link className="s-action" to="/about#our-team">Meet our team</Link></section>;
  return <TeamProfile member={member} />;
}

export default function Team() {
  const [params] = useSearchParams();
  const member = teamMembers.find(person => person.id === params.get('team'));
  if (member) return <Navigate to={`/team/${member.id}`} replace />;
  return <div className="s-team-grid">{teamMembers.map(person => <TeamCard key={person.id} member={person} />)}</div>;
}
