import { team } from './data';
import { SiteImage } from './Image';
import { Reveal } from './components';

export default function Team() {
  return <div className="s-team-grid">{team.map(member => <Reveal key={member.name}><SiteImage src={member.image} alt={member.name} loading="lazy" width={600} height={700} /><h3>{member.name}</h3><p className="s-team-role">{member.role}</p></Reveal>)}</div>;
}
