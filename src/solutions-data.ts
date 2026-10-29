import rawSolutions from './solutions-data.json';
export type SolutionCategory = 'Residential' | 'Lighting' | 'Commercial';
export type Solution = {
  id: string; slug: string; title: string; category: SolutionCategory;
  shortDescription: string; fullDescription: string; image: string;
  benefits: string[]; applications: string[]; relatedProductIds: string[];
  featured: boolean; featuredOrder: number; headline: string; homeSummary: string; aliases: string[];
};
function category(value: string): SolutionCategory {
  if (value === 'Residential' || value === 'Lighting' || value === 'Commercial') return value;
  throw new Error(`Unknown solution category: ${value}`);
}
const solutions: Solution[] = rawSolutions.map(solution => ({ ...solution, category: category(solution.category) }));
export default solutions;
export const findSolution = (slug: string) => solutions.find(solution => solution.slug === slug || solution.aliases.includes(slug));
export function getRelatedSolutions(solution: Solution): Solution[] {
  return solutions.filter(item => item.id !== solution.id).map(item => ({
    item, score: item.relatedProductIds.filter(id => solution.relatedProductIds.includes(id)).length + (item.category === solution.category ? 2 : 0),
  })).sort((a, b) => b.score - a.score || a.item.slug.localeCompare(b.item.slug)).slice(0, 3).map(entry => entry.item);
}
