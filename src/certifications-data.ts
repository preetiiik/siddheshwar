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
export const certificates: Certificate[] = [];
export const technologyPartners: TechnologyPartner[] = [];

// Layout previews only; these are not verified credentials.
export const certificatePreviewSlots = Array.from({ length: 5 }, (_, index) => ({
  id: `certificate-preview-${index + 1}`,
  title: `Sample Certificate ${String(index + 1).padStart(2, '0')}`,
}));
