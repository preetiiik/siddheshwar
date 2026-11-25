import { company } from './data';

export type TeamMember = {
  id: string; name: string; designation: string; image: string;
  phone: string; email: string; linkedin?: string;
};

// Company contact details are used where individual details have not been supplied.
export const teamMembers: TeamMember[] = [
  { id: 'siddharth', name: 'Siddharth S Kammar', designation: 'COO / Chief Operating Officer', image: '/team/Mr.Siddharth S Kammar .jpeg', phone: '+91 70190 80943', email: 'siddharthkammar615@gmail.com', linkedin: 'https://in.linkedin.com/in/siddharth-s-kammar' },
  { id: 'sushmitha', name: 'Sushmitha S Kammar', designation: 'CEO', image: '/team/Mrs.Sushmitha S Kammar .jpeg', phone: '+91 98800 97457', email: company.email },
  { id: 'karthik', name: 'Karthik Radhakrishnan', designation: 'Lighting Consultant', image: '/team/Mr.Karthik Radhakrishnan.jpeg', phone: company.phone, email: company.email },
  { id: 'vinay', name: 'Vinay A P', designation: 'Technical Consultant', image: '/team/Mr.Vinay .jpeg', phone: '+91 94485 24400', email: 'vinay@shreemcontrols.in' },
];
