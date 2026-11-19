import type { Product } from './product-data';
import { akubelaItems, categoryFor } from './site/akubela/catalogue';
export const akubelaProducts: Product[] = akubelaItems.map(item => {
  const category = categoryFor(item);
  return {
    id: item.slug, slug: item.slug, name: item.name, title: item.name, category: 'automation', brand: 'Akubela', collection: category.name,
    shortDescription: category.description, fullDescription: `${item.name} is part of the Akubela ${category.name} collection. ${category.description}`,
    image: item.image, alt: `Akubela ${item.name}`, features: [category.name], applications: [], aliases: [], products: [item.name],
    relatedProductIds: akubelaItems.filter(p => p.category === item.category && p.slug !== item.slug).slice(0,4).map(p => p.slug),
    specifications: [{label: 'Brand', value: 'Akubela'}, {label: 'Collection', value: category.name}],
    catalogUrl: '/akubela%20Smart%20Home%20Catalogue260701.pdf', catalogLabel: 'Akubela Catalogue',
    ...(item.sourcePage ? {contentSource: {document: 'akubela Smart Home Catalogue260701.pdf', pages: [item.sourcePage]}} : {}),
  };
});
