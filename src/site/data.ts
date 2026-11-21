import type { Product } from '../product-data';
import { unifiedCatalogue } from './unified-catalogue';
import solutionDetails from './solution-details.json';

export const company = {
  name: 'Siddheshwar Smart Technologies', email: 'info@ssthomeautomation.in', phone: '+91 70190 80943',
  address: 'Siddheshwar Krupa building, opposite to Government ITI College, Vidyanagar, Hubli 580021',
};
export type ServiceId = 'home-automation' | 'audio-video' | 'security-safety' | 'networking' | 'lighting';
export type Service = { id: ServiceId; name: string; headline: string; description: string; image: string; capabilities: string[] };
export const services: Service[] = [
  { id: 'home-automation', name: 'Home Automation', headline: 'Your Space. Your Comfort. Your Control.', description: 'Bring lighting, curtains, climate and connected devices into one thoughtful everyday experience.', image: '/solutions/S1.png', capabilities: ['Smart lighting', 'Smart switches and touch panels', 'Curtain and blind automation', 'Climate control', 'Personalized smart scenes', 'Centralized control', 'Compatible voice-control integrations'] },
  { id: 'audio-video', name: 'Audio & Video', headline: 'Every Experience, Beautifully Connected.', description: 'Make room for immersive entertainment, music that moves with you, and simpler control of your connected media.', image: '/movie%20time.png.jpeg', capabilities: ['Home entertainment integration', 'Multi-room audio', 'Audio-video distribution', 'Meeting room AV integration', 'Centralized entertainment control'] },
  { id: 'security-safety', name: 'Security & Safety', headline: 'Confidence Built Into Every Space.', description: 'Plan monitoring, access and safety systems around the way your space is used, with a clear view of what matters.', image: '/away%20mode.png.jpeg', capabilities: ['Surveillance integration', 'Smart access control', 'Video door communication', 'Intrusion monitoring', 'Safety system integration', 'Centralized monitoring'] },
  { id: 'networking', name: 'Networking', headline: 'The Foundation of Every Connected Space.', description: 'Thoughtfully planned connectivity supports everyday work, entertainment and the devices that bring your space together.', image: '/products/space-we-transform/corporate-offices.png', capabilities: ['Structured networking', 'Wi-Fi connectivity', 'Network infrastructure', 'Smart device connectivity', 'Residential networking', 'Commercial networking'] },
  { id: 'lighting', name: 'Lighting', headline: 'Light That Shapes the Experience.', description: 'Architectural and decorative lighting that brings out the materials, details and atmosphere of your space.', image: '/lighting-home.png', capabilities: ['Downlights', 'Wall Lights', 'Decorative Lights', 'Outdoor Lights'] },
];
export const catalogue: Product[] = unifiedCatalogue;
export const featuredProducts = unifiedCatalogue.slice(0, 8);
export const productService = (p: Product): ServiceId => p.category === 'lighting' ? 'lighting' : /lock|security|sensor|intercom|doorbell/i.test(p.name) ? 'security-safety' : 'home-automation';
export const lightingGroups = [
  { name: 'Downlights', pattern: /downlight|adjustable spotlight/i },
  { name: 'Wall Lights', pattern: /sconce|up.down|led wall|picture light/i },
  { name: 'Decorative Lights', pattern: /chandelier|pendant|hanging|ceiling light/i },
  { name: 'Outdoor Lights', pattern: /garden|bollard|outdoor wall|landscape/i },
];
export type SiteSolution = { id: string; title: string; description: string; image: string; capabilities: string[]; productIds: string[] };
export const solutions: SiteSolution[] = solutionDetails.map(s => ({
  id: s.slug, title: s.slug === 'security-solutions' ? 'Home Security & VDP' : s.name,
  description: s.intro, image: s.images[0], capabilities: s.features, productIds: [],
}));
// Supplied project logos. No authorization or partnership status is implied.
export const brands: { name: string; logo: string; relationship: string; width: number; height: number }[] = [
  { name: 'Akubela', logo: '/brands/Akubela-Logo.webp', relationship: '', width: 256, height: 85 },
  { name: 'Basalte', logo: '/brands/basalte-logo.webp', relationship: '', width: 239, height: 116 },
  { name: 'MDT', logo: '/brands/MDT-logo.webp', relationship: '', width: 256, height: 99 },
  { name: 'Moorgen', logo: '/brands/Moorgen-Logo.webp', relationship: '', width: 256, height: 171 },
  { name: 'OneTouch', logo: '/brands/OneTouch-Logo.webp', relationship: '', width: 256, height: 85 },
  { name: 'Schneider Electric', logo: '/brands/Schneider-Logo.webp', relationship: '', width: 256, height: 85 },
  { name: 'Theben', logo: '/brands/Theben-Logo.webp', relationship: '', width: 256, height: 85 },
];
export const technologyTopics = ['Intelligent control', 'Architectural lighting', 'Connected spaces', 'Thoughtful integration'];
export const team = [
  { name: 'Siddharth S Kammar', role: 'COO - Chief Operating Officer', image: '/team/Mr.Siddharth S Kammar .jpeg' },
  { name: 'Sushmitha S Kammar', role: 'CEO', image: '/team/Mrs.Sushmitha S Kammar .jpeg' },
  { name: 'Karthik Radhakrishnan', role: 'Lighting Consultant', image: '/team/Mr.Karthik Radhakrishnan.jpeg' },
  { name: 'Harish Kumar', role: 'Lighting Consultant', image: '/team/Mr.Harish kumar.jpeg' },
  { name: 'Vinay', role: 'Technical Consultant', image: '/team/Mr.Vinay .jpeg' },
];
export const routes = [
  ['/', 'Home'], ['/what-we-do', 'What We Do'], ['/brands', 'Brands We Integrate'], ['/products', 'Products'], ['/solutions', 'Solutions'],
  ...services.map(s => [`/${s.id}`, s.name]), ['/about', 'About Us'], ['/contact', 'Contact Us'], ['/support', 'Support'],
];
