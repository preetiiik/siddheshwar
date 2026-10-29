import pages from './site-content.json';
const photos = ['1600607687920-4e2a09cf159d', '1600210492486-724fe5c67fb0', '1600585154340-be6161a56a0c', '1600607687939-ce8a6c25118c', '1600607688969-a5bfcd646154', '1600566753190-17f0baa2a6c3', '1600607687644-c7171b42498f', '1497366754035-f200968a6e72', '1600566753086-00f18fb6b3ea'];
const page = pages.find(p => p.path === '/lighting')!;
export const lightingServices = page.sections.find(s => s.title === 'Our Lighting Solutions')!.cards.map((card, index) => ({
  title: card.title,
  slug: card.title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  description: card.paragraphs[0],
  image: `https://images.unsplash.com/photo-${photos[index]}?w=1800&q=85`,
}));
export const lightingApplications = page.sections.find(s => s.title === 'Applications')!.paragraphs[0].split('\n').map(line => line.replace(/^- /, ''));
