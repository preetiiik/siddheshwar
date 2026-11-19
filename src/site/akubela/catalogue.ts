import manifest from './manifest.json';

export const akubelaBase = '/products/automation/akubela';
export const akubelaCategories = manifest.categories;
export const akubelaItems = manifest.products;
export type AkubelaItem = typeof akubelaItems[number];
export const categoryPath = (slug: string) => `${akubelaBase}/categories/${slug}`;
export const productPath = (slug: string) => `${akubelaBase}/products/${slug}`;
export const categoryFor = (item: AkubelaItem) => akubelaCategories.find(c => c.slug === item.category)!;
export const isSoftware = (item: AkubelaItem) => item.category === 'smart-home-software-cloud';
export function akubelaTitle(path: string) {
  if (path === '/products/automation') return 'Automation';
  if (!path.startsWith(akubelaBase)) return undefined;
  const slug = path.split('/').pop();
  return akubelaItems.find(p => p.slug === slug)?.name || akubelaCategories.find(c => c.slug === slug)?.name || 'Akubela Smart Home Technology';
}
