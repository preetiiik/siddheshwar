import pages from './site-content.json';
const photos = ['1600607687920-4e2a09cf159d', '1600607688969-a5bfcd646154', '1497366754035-f200968a6e72', '1611892440504-42a792e24d32', '1600585154340-be6161a56a0c'];
export const projectCategories = pages.find(p => p.path === '/projects')!.sections.find(s => s.title === 'Project Categories')!.cards.map((card, index) => ({
  title: card.title,
  slug: card.title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  description: card.paragraphs[0],
  image: `https://images.unsplash.com/photo-${photos[index]}?w=1800&q=85`,
}));
