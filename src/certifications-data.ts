export type Certificate = {
  id: string;
  name: string;
  issuer: string;
  year?: string;
  image: string;
  documentUrl?: string;
  verified: boolean;
};
export type TechnologyPartner = {
  id: string;
  name: string;
  logo: string;
  website?: string;
  confirmed: boolean;
};

// Publish only supplied, verified certificates and explicitly confirmed partners.
// Sample documents and protocol logos are not proof of company credentials.
export const certificates: Certificate[] = [
  { id: 'knx-partner', name: 'KNX Partner — Siddharth Kammar', issuer: 'KNX Association', year: '2025', image: '/certifications/WhatsApp%20Image%202026-11-07%20at%2016.32.57.jpeg', verified: true },
  { id: 'knx-advanced', name: 'KNX Advanced — Siddharth Kammar', issuer: 'KNX Association', year: '2025', image: '/certifications/3.jpeg', verified: true },
  { id: 'ets-ecampus', name: 'ETS eCampus — Siddharth Kammar', issuer: 'KNX Association', year: '2025', image: '/certifications/2.jpeg', verified: true },
];
export const technologyPartners: TechnologyPartner[] = [
  { id: 'knx', name: 'KNX Partner', logo: '/KNX%20Partner%20Arched%20Logo.png', confirmed: true },
];

// Layout previews only; these are not verified credentials.
export const certificatePreviewSlots = Array.from({ length: 5 }, (_, index) => ({
  id: `certificate-preview-${index + 1}`,
  title: `Sample Certificate ${String(index + 1).padStart(2, '0')}`,
}));
