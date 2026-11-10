import type { Product } from './product-data';
import entries from './akubela-products.json';

const descriptions: Record<string, string> = {
  HyPanels: 'Bring everyday smart-home controls together through an Akubela HyPanel interface.',
  'Smart Switches': 'Manage everyday lighting through a dedicated smart wall switch.',
  'Smart Locks': 'Explore smart access control for residential entrances and connected homes.',
  'Matter Add-ons': 'Connect compatible devices through a multifunctional smart-home gateway.',
  'ZigBee Electrical & Switches': 'Add connected switching and electrical control to a compatible ZigBee installation.',
  'ZigBee Plugs & Climate': 'Extend connected control to compatible appliances, climate systems and room comfort.',
  'ZigBee Lighting': 'Create connected lighting with dedicated ZigBee luminaires, dimmers and LED controllers.',
  'ZigBee Security & Sensors': 'Add sensing and monitoring to a compatible connected-home installation.',
  'ZigBee Other': 'Extend your smart-home system with compatible ZigBee connectivity and control.',
  'KNX Add-ons': 'Build an integrated KNX installation with dedicated control and system modules.',
  'RS485 Add-ons': 'Integrate compatible wired controls through dedicated RS485 devices.',
  'Software Platforms': 'Manage your connected-home experience through the Akubela software ecosystem.',
};

export const akubelaProducts: Product[] = entries.map(entry => {
  const name = entry.name.replace('Gateway (G30)', 'Gateway (G31)').replace('6 Gang 0–10V', '4 Gang 0–10V');
  const summary = descriptions[entry.group];
  return {
    id: entry.slug, slug: entry.slug, name, title: name, category: 'automation', brand: 'Akubela', collection: entry.group,
    shortDescription: summary,
    fullDescription: `${name} is part of the Akubela ${entry.group} range. ${summary} Select the catalog link to review the model's detailed functions and installation requirements.`,
    image: entry.image, alt: `Akubela ${name}`,
    features: [entry.group, ...(entry.group.startsWith('ZigBee') ? ['ZigBee smart-home integration'] : entry.group === 'KNX Add-ons' ? ['KNX building automation'] : entry.group === 'RS485 Add-ons' ? ['RS485 wired integration'] : [])],
    applications: ['Connected homes', 'Apartments and villas'],
    relatedProductIds: entries.filter(item => item.group === entry.group && item.slug !== entry.slug).slice(0, 4).map(item => item.slug),
    aliases: [], products: [name], specifications: [{ label: 'Brand', value: 'Akubela' }, { label: 'Product range', value: entry.group }],
    catalogUrl: '/akubela%20Smart%20Home%20Catalogue260701.pdf', catalogLabel: 'Akubela Catalog',
    contentSource: { document: 'akubela Smart Home Catalogue260701.pdf', pages: [entry.page] },
  };
});
