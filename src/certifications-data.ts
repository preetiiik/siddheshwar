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
