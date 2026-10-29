import pages from './site-content.json';
const photos = [
  ['1600607687920-4e2a09cf159d', 'Architectural lighting in a modern living space'],
  ['1616486338812-3dadae4b4ace', 'Interior with full-height curtains and natural light'],
  ['1600566753190-17f0baa2a6c3', 'Comfortable interior designed for climate control'],
  ['1600585154340-be6161a56a0c', 'Residential entrance and exterior'],
  ['1600607687644-c7171b42498f', 'Home entertainment lounge'],
  ['1600566753086-00f18fb6b3ea', 'Connected interior with centralized home controls'],
  ['1600210492486-724fe5c67fb0', 'Smart living space with integrated home systems'],
  ['1600566752355-35792bedcfea', 'Residential space connected with the outdoors'],
];
const cards = pages.find(page => page.path === '/home-automation')!.sections.find(section => section.title === 'Our Home Automation Services')!.cards;
export const automationServices = cards.map((card, index) => ({
  title: card.title,
  slug: card.title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  description: card.paragraphs.find(p => !p.startsWith('Features:')) ?? '',
  features: (card.paragraphs.find(p => p.startsWith('Features:')) ?? '').replace(/^Features:\s*/, '').replace(/\.$/, '').split(/,\s*(?:and\s+)?|\s+and\s+/).filter(Boolean),
  image: `https://images.unsplash.com/photo-${photos[index][0]}?w=1800&q=85`,
  alt: photos[index][1],
}));
