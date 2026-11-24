export type TeamMember = {
  id: string; name: string; designation: string; image: string; shortDescription: string;
  phone: string; email: string; linkedin?: string; experience: string; expertise: string[];
};

// Example profile details are placeholders and should be replaced before publication.
export const teamMembers: TeamMember[] = [
  { id: 'siddharth', name: 'Siddharth S Kammar', designation: 'COO / Chief Operating Officer', image: '/team/Mr.Siddharth S Kammar .jpeg', shortDescription: 'Siddharth helps bring people, projects and technology together to create thoughtful connected spaces.', phone: '+1 202 555 0101', email: 'siddharth@example.com', experience: 'Operations and project coordination', expertise: ['Operations', 'Project delivery', 'Connected spaces'] },
  { id: 'sushmitha', name: 'Sushmitha S Kammar', designation: 'CEO', image: '/team/Mrs.Sushmitha S Kammar .jpeg', shortDescription: 'Sushmitha guides the team’s vision for considered technology and meaningful client experiences.', phone: '+1 202 555 0102', email: 'sushmitha@example.com', experience: 'Leadership and client relationships', expertise: ['Leadership', 'Client experience', 'Business strategy'] },
  { id: 'karthik', name: 'Karthik Radhakrishnan', designation: 'Lighting Consultant', image: '/team/Mr.Karthik Radhakrishnan.jpeg', shortDescription: 'Karthik explores lighting solutions that complement the architecture and character of each space.', phone: '+1 202 555 0103', email: 'karthik@example.com', experience: 'Lighting consultation and planning', expertise: ['Architectural lighting', 'Lighting design', 'Consultation'] },
  { id: 'vinay', name: 'Vinay A P', designation: 'Technical Consultant', image: '/team/Mr.Vinay .jpeg', shortDescription: 'Vinay supports the technical planning behind reliable, thoughtfully integrated systems.', phone: '+1 202 555 0104', email: 'vinay@example.com', experience: 'Technical consultation and integration', expertise: ['System integration', 'Technical planning', 'Connectivity'] },
];
