import solutions from './solutions-data';
import { getProductsForSolution } from './solution-products';
import type { Product } from './product-data';
export type Space = {
 id: string; slug: string; title: string; shortDescription: string; fullDescription: string;
 image: string; imageAlt: string; category: 'residential' | 'commercial' | 'hospitality';
 relatedSolutionIds: string[]; benefits: string[]; featured: boolean; featuredOrder: number; homeDescription?: string;
};
export const spaces: Space[] = [
  {
    "id": "luxury-villas",
    "slug": "luxury-villas",
    "title": "Luxury Villas",
    "shortDescription": "Whole-home automation, personalized lighting, curtain control and intelligent climate management for sophisticated living.",
    "fullDescription": "Across living areas, bedrooms and outdoor spaces, automation can bring daily routines into one coordinated experience. Personalized scenes can combine lighting, curtains and compatible climate controls, while architectural lighting complements the character of the villa.\n\nThe solution is planned around the property, its users and compatible equipment. Final products, supported functions and installation requirements are confirmed for each project.",
    "image": "/products/space-we-transform/luxury-villas.png",
    "imageAlt": "Illustrative luxury villas environment",
    "category": "residential",
    "relatedSolutionIds": [
      "complete-smart-home-automation",
      "intelligent-lighting-automation",
      "luxury-architectural-lighting",
      "curtain-blind-automation",
      "climate-hvac-automation",
      "smart-scene-mood-lighting",
      "outdoor-landscape-lighting"
    ],
    "benefits": [
      "Convenient whole-home control",
      "Personalized comfort and scenes",
      "Layered interior and outdoor lighting",
      "Coordinated room automation"
    ],
    "featured": true,
    "featuredOrder": 0,
    "homeDescription": "Whole-home automation, personalized lighting, curtain control and intelligent climate management."
  },
  {
    "id": "apartments-flats",
    "slug": "apartments-flats",
    "title": "Apartments & Flats",
    "shortDescription": "Smart, convenient and elegant automation solutions tailored to modern apartment living.",
    "fullDescription": "Apartment living benefits from thoughtful lighting and controls that fit naturally into everyday routines. Planning considers room use, available installation space and how occupants want to manage lighting, curtains and compatible climate equipment.\n\nThe solution is planned around the property, its users and compatible equipment. Final products, supported functions and installation requirements are confirmed for each project.",
    "image": "/products/space-we-transform/apartments-flats.png",
    "imageAlt": "Illustrative apartments & flats environment",
    "category": "residential",
    "relatedSolutionIds": [
      "complete-smart-home-automation",
      "intelligent-lighting-automation",
      "curtain-blind-automation",
      "climate-hvac-automation",
      "smart-scene-mood-lighting"
    ],
    "benefits": [
      "Convenient everyday controls",
      "Personalized room settings",
      "Thoughtful lighting for compact spaces",
      "Coordinated lighting and climate"
    ],
    "featured": true,
    "featuredOrder": 1,
    "homeDescription": "Smart lighting, convenient controls and automation tailored to modern apartment living."
  },
  {
    "id": "independent-homes",
    "slug": "independent-homes",
    "title": "Independent Homes",
    "shortDescription": "Personalized smart home and lighting solutions that make everyday living more comfortable and convenient.",
    "fullDescription": "An independent home brings together different rooms, routines and outdoor areas. Coordinated controls and layered lighting can make those spaces easier to use, with the configuration shaped around the household and architecture.\n\nThe solution is planned around the property, its users and compatible equipment. Final products, supported functions and installation requirements are confirmed for each project.",
    "image": "/products/space-we-transform/independent-homes.png",
    "imageAlt": "Illustrative independent homes environment",
    "category": "residential",
    "relatedSolutionIds": [
      "complete-smart-home-automation",
      "intelligent-lighting-automation",
      "luxury-architectural-lighting",
      "curtain-blind-automation",
      "climate-hvac-automation",
      "outdoor-landscape-lighting"
    ],
    "benefits": [
      "Personalized family routines",
      "Convenient room control",
      "Integrated interior and outdoor lighting",
      "Comfort designed around daily life"
    ],
    "featured": false,
    "featuredOrder": -1
  },
  {
    "id": "corporate-offices",
    "slug": "corporate-offices",
    "title": "Corporate Offices",
    "shortDescription": "Integrated automation and lighting solutions designed to support productive, comfortable and efficient workplaces.",
    "fullDescription": "Workplace planning considers different activities, occupancy patterns and operating hours. Lighting zones, compatible climate controls and occupancy-based routines can support comfortable working environments and practical day-to-day operation.\n\nThe solution is planned around the property, its users and compatible equipment. Final products, supported functions and installation requirements are confirmed for each project.",
    "image": "/products/space-we-transform/corporate-offices.png",
    "imageAlt": "Illustrative corporate offices environment",
    "category": "commercial",
    "relatedSolutionIds": [
      "commercial-office-automation",
      "intelligent-lighting-automation",
      "climate-hvac-automation",
      "energy-management-optimization",
      "lighting-management-system"
    ],
    "benefits": [
      "Lighting aligned with occupancy",
      "Comfortable working environments",
      "Coordinated operating schedules",
      "Visibility into supported energy use"
    ],
    "featured": true,
    "featuredOrder": 2,
    "homeDescription": "Intelligent lighting management, occupancy-based automation and efficient climate control."
  },
  {
    "id": "hotels-resorts",
    "slug": "hotels-resorts",
    "title": "Hotels & Resorts",
    "shortDescription": "Intelligent guest-room and hospitality lighting solutions designed to enhance comfort and operational convenience.",
    "fullDescription": "Hospitality environments need to feel welcoming and straightforward for guests. Coordinated guest-room controls, lighting scenes and compatible climate and curtain systems can bring convenience to accommodation and shared spaces.\n\nThe solution is planned around the property, its users and compatible equipment. Final products, supported functions and installation requirements are confirmed for each project.",
    "image": "/products/space-we-transform/hotels-resorts.png",
    "imageAlt": "Illustrative hotels & resorts environment",
    "category": "hospitality",
    "relatedSolutionIds": [
      "hotel-hospitality-automation",
      "intelligent-lighting-automation",
      "luxury-architectural-lighting",
      "curtain-blind-automation",
      "climate-hvac-automation",
      "energy-management-optimization",
      "outdoor-landscape-lighting"
    ],
    "benefits": [
      "Intuitive guest-room controls",
      "Personalized lighting scenes",
      "Coordinated curtains and climate",
      "Operation shaped around occupancy"
    ],
    "featured": true,
    "featuredOrder": 3,
    "homeDescription": "Guest-room automation, personalized lighting and coordinated climate and curtain control."
  },
  {
    "id": "retail-showrooms",
    "slug": "retail-showrooms",
    "title": "Retail & Showrooms",
    "shortDescription": "Thoughtfully designed display lighting and automation solutions that enhance product presentation and customer experience.",
    "fullDescription": "Retail and showroom environments rely on lighting that supports presentation as well as circulation. Layered illumination and coordinated scenes can highlight displays, complement interior finishes and adapt to the way the space is used.\n\nThe solution is planned around the property, its users and compatible equipment. Final products, supported functions and installation requirements are confirmed for each project.",
    "image": "/products/space-we-transform/retail-showrooms.png",
    "imageAlt": "Illustrative retail & showrooms environment",
    "category": "commercial",
    "relatedSolutionIds": [
      "intelligent-lighting-automation",
      "luxury-architectural-lighting",
      "smart-scene-mood-lighting",
      "commercial-office-automation",
      "lighting-management-system"
    ],
    "benefits": [
      "Considered product presentation",
      "Adaptable display lighting",
      "Coordinated lighting scenes",
      "Practical control of shared spaces"
    ],
    "featured": false,
    "featuredOrder": -1
  },
  {
    "id": "restaurants-cafes",
    "slug": "restaurants-cafes",
    "title": "Restaurants & Cafés",
    "shortDescription": "Atmospheric lighting and intuitive automation that help create memorable dining environments.",
    "fullDescription": "Dining environments bring functional lighting and atmosphere together. Scenes can help adapt the room for different times of day, while thoughtfully selected decorative lighting contributes to the character of the venue.\n\nThe solution is planned around the property, its users and compatible equipment. Final products, supported functions and installation requirements are confirmed for each project.",
    "image": "/products/space-we-transform/restaurants-cafes.png",
    "imageAlt": "Illustrative restaurants & cafés environment",
    "category": "hospitality",
    "relatedSolutionIds": [
      "intelligent-lighting-automation",
      "luxury-architectural-lighting",
      "smart-scene-mood-lighting",
      "climate-hvac-automation"
    ],
    "benefits": [
      "Atmosphere tailored to dining",
      "Flexible scenes for different moments",
      "Decorative lighting with character",
      "Convenient room controls"
    ],
    "featured": false,
    "featuredOrder": -1
  },
  {
    "id": "commercial-buildings",
    "slug": "commercial-buildings",
    "title": "Commercial Buildings",
    "shortDescription": "Centralized building automation, lighting management and energy monitoring for larger commercial environments.",
    "fullDescription": "Larger properties require a coordinated approach to multiple rooms, shared areas and building services. Lighting management, compatible climate systems and energy monitoring can be planned together around the building and its operating requirements.\n\nThe solution is planned around the property, its users and compatible equipment. Final products, supported functions and installation requirements are confirmed for each project.",
    "image": "/products/space-we-transform/commercial-buildings.png",
    "imageAlt": "Illustrative commercial buildings environment",
    "category": "commercial",
    "relatedSolutionIds": [
      "building-automation-integration",
      "commercial-office-automation",
      "intelligent-lighting-automation",
      "climate-hvac-automation",
      "energy-management-optimization",
      "lighting-management-system"
    ],
    "benefits": [
      "Coordinated building services",
      "Centralized lighting management",
      "Schedules aligned with operations",
      "Visibility into supported energy use"
    ],
    "featured": false,
    "featuredOrder": -1
  }
];
export const findSpace = (slug: string) => spaces.find(space => space.slug === slug);
export const getSpaceSolutions = (space: Space) => space.relatedSolutionIds.flatMap(id => {
 const solution = solutions.find(item => item.id === id);
 return solution ? [solution] : [];
});
export function getSpaceProducts(space: Space): Product[] {
 const products = getSpaceSolutions(space).flatMap(getProductsForSolution);
 return [...new Map(products.map(product => [product.id, product])).values()];
}
