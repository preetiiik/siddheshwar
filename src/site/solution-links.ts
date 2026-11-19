import details from './solution-details.json';

export const solutionDetailPath = (id: string) => details.some(s => s.slug === id) ? `/solutions/${id}` : null;
