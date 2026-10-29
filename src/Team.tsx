import { useState } from 'react';

const members = [
  { name: 'Mrs. Sushmitha S Kammar', role: 'CEO', fullRole: 'Chief Executive Officer', image: '/team/Mrs.Sushmitha S Kammar .jpeg', initials: 'SK', position: 'center 30%' },
  { name: 'Mr. Siddharth S Kammar', role: 'COO', fullRole: 'Chief Operating Officer', image: '/team/Mr.Siddharth S Kammar .jpeg', initials: 'SK', position: 'center 35%' },
  { name: 'Mr. Vinay', role: 'Technical Consultant', fullRole: '', image: '/team/Mr.Vinay .jpeg', initials: 'V', position: 'center 30%' },
  { name: 'Mr. Harish Kumar', role: 'Lighting Consultant', fullRole: '', image: '/team/Mr.Harish kumar.jpeg', initials: 'HK', position: 'center 30%' },
];

function Portrait({ member }: { member: typeof members[number] }) {
  const [missing, setMissing] = useState(false);
  return <div className="team-portrait">{missing ? <span className="team-initials" aria-hidden="true">{member.initials}</span> : <img src={member.image} alt={member.name} loading="lazy" width={600} height={750} style={{ objectPosition: member.position }} onError={() => setMissing(true)} />}</div>;
}

export default function Team() {
  return <section id="our-team" className="team-section" aria-labelledby="team-heading"><div className="team-inner"><div className="team-heading"><p>THE PEOPLE BEHIND SIDDHESHWAR</p><h2 id="team-heading">Meet Our <span>Team.</span></h2></div><div className="team-grid">{members.map(member => <article className="team-member" key={member.name}><Portrait member={member} /><div className="team-member-details"><h3>{member.name}</h3><p>{member.role}</p>{member.fullRole && <span>{member.fullRole}</span>}</div></article>)}</div></div></section>;
}
