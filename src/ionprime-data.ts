import type { Product } from './product-data';

export const ionprimeCatalogUrl = '/iONprime_Market%20Launch%20PPT_11-2025.pdf';
const image = (file: string) => `/products/ionprime/${file}.png`;
const applications = ['Smart homes and luxury villas', 'Apartments', 'Hotels', 'Offices'];
const finishes = [
  { code: 'MBR', name: 'Brushed Brass', file: '18_Brushed_Brass_MBR', description: 'Premium brushed brass with an elegant golden appearance, suited to luxury interiors.', articles: ['9080058', '9080065', '9080072'] },
  { code: 'ABR', name: 'Brushed Aluminum', file: '19_Brushed_Aluminum_ABR', description: 'Refined brushed aluminum for contemporary residential and commercial interiors.', articles: ['9080057', '9080064', '9080071'] },
  { code: 'MBK', name: 'Black Metal Matte', file: '20_Matte_Black_Metal_MBK', description: 'Premium matte black metal, similar to RAL 9004, for sophisticated minimalist interiors.', articles: ['9080059', '9080066', '9080073'] },
  { code: 'MWH', name: 'Metal White Matte', file: '21_Matte_White_Metal_MWH', description: 'Elegant matte white metal, similar to RAL 9016, for bright and minimal spaces.', articles: ['9080060', '9080067', '9080074'] },
  { code: 'PGR', name: 'Plastic Grey', file: '22_Grey_Plastic_PGR', description: 'Neutral grey plastic, similar to RAL 7044, for understated modern interiors.', articles: ['9080063', '9080070', '9080077'] },
  { code: 'PBK', name: 'Black Plastic', file: '23_Black_Plastic_PBK', description: 'Black plastic, similar to RAL 9004, with a clean contemporary appearance.', articles: ['9080062', '9080069', '9080076'] },
  { code: 'PWH', name: 'White Plastic', file: '24_White_Plastic_PWH', description: 'Clean white plastic, similar to RAL 9016, for subtle integration into residential and commercial spaces.', articles: ['9080061', '9080068', '9080075'] },
];
const base = { category: 'automation' as const, brand: 'Theben', collection: 'iONprime', applications, aliases: [], products: [], catalogUrl: ionprimeCatalogUrl };
const rockerIds = finishes.map(finish => `ionprime-pb-${finish.code.toLowerCase()}`);
export const ionprimeProducts: Product[] = [
  {
    ...base, id: 'ionprime-cp4-knx', slug: 'ionprime-cp4-knx', name: 'iONprime CP4 KNX - Room Controller', title: 'iONprime CP4 KNX',
    shortDescription: 'A premium 4-inch KNX touchscreen for lighting, dimming, blinds, temperature and personalized room scenes.',
    fullDescription: 'Manage your room from one interface with up to 48 functions across 6 pages. Integrated temperature, humidity, brightness and proximity sensors support intuitive everyday control.',
    image: image('04_CP4_Room_Controller'), alt: 'Theben iONprime CP4 KNX room controller and touchscreen features',
    features: ['Up to 48 functions across 6 pages', '4-inch touchscreen, 480 × 480 pixels', 'Temperature, humidity, brightness and proximity sensors', 'Individually configurable interface', 'Glass front with aluminum frame'],
    specifications: [{ label: 'Article number', value: '4969300' }, { label: 'System', value: 'KNX' }, { label: 'Dimensions', value: '86 × 86 × 12 mm' }, { label: 'Mounting', value: 'Flush-mounted' }, { label: 'KNX bus', value: '21–32 V DC' }, { label: 'Auxiliary supply', value: '12–30 V DC' }, { label: 'Protection', value: 'IP20' }, { label: 'Operating temperature', value: '-5 to 45 °C' }],
    relatedProductIds: ['ionprime-pb-knx'], contentSource: { document: 'iONprime_Market Launch PPT_11-2025.pdf', pages: [10] },
  },
  {
    ...base, id: 'ionprime-pb-knx', slug: 'ionprime-pb-knx', name: 'iONprime PB KNX - Push Button Sensor', title: 'iONprime PB KNX',
    shortDescription: 'A configurable KNX smart switch with up to 8 buttons, RGB indicators and interchangeable rocker covers.',
    fullDescription: 'Control lighting, dimming, blinds, scenes and room temperature with configurable buttons. Integrated environmental sensors and seven interchangeable rocker finishes bring smart control into your interior.',
    image: image('11_PB_Push_Button_Sensor'), alt: 'Theben iONprime PB KNX push button sensor',
    features: ['Up to 8 configurable buttons with RGB LEDs', 'Lighting, dimming, blinds and scene control', 'Integrated temperature, humidity, brightness, CO₂ and proximity sensors', 'Seven rocker finishes in 1R, 2R and 4R configurations', 'Rocker covers selected separately'],
    specifications: [{ label: 'Article number (without rocker)', value: '4969301' }, { label: 'System', value: 'KNX' }, { label: 'Dimensions', value: '86 × 86 × 11 mm' }, { label: 'Mounting', value: 'Flush-mounted' }, { label: 'KNX bus', value: '21–32 V DC' }, { label: 'Protection', value: 'IP20' }, { label: 'Operating temperature', value: '-5 to 45 °C' }],
    relatedProductIds: rockerIds, contentSource: { document: 'iONprime_Market Launch PPT_11-2025.pdf', pages: [14] },
  },
  ...finishes.map((finish, index): Product => ({
    ...base, id: rockerIds[index], slug: rockerIds[index], name: `iONprime PB - ${finish.name}`, title: `iONprime PB ${finish.code}`,
    shortDescription: finish.description, fullDescription: `${finish.description} Interchangeable rocker covers for the iONprime PB KNX push button sensor, available as a single rocker (1R), two rockers (2R) or four rockers (4R). The sensor is selected separately.`,
    image: image(finish.file), alt: `iONprime PB ${finish.name} rocker covers in 1R, 2R and 4R configurations`,
    features: [`${finish.name} finish (${finish.code})`, '1R: single rocker', '2R: two rockers', '4R: four rockers', 'For the iONprime PB KNX sensor'],
    variants: finish.articles.map((article, variantIndex) => ({ name: `iONprime PB ${[1, 2, 4][variantIndex]}R ${finish.code}`, article })),
    relatedProductIds: ['ionprime-pb-knx', ...rockerIds.filter(id => id !== rockerIds[index])],
    contentSource: { document: 'iONprime_Market Launch PPT_11-2025.pdf', pages: [18 + index] },
  })),
];
