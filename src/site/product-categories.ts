import type { Product } from '../product-data';
export const homepageProductCategories = [
 {id:'smart-keypad-switches',name:'Smart Keypad Switches',description:'Elegant control at your fingertips.',image:'/hero/akubela-aura-series-wide.webp',alt:'Akubela Aura switches installed beside a contemporary living area'},
 {id:'smart-touch-panels',name:'Smart Touch Panels',description:'One interface. Intelligent control.',image:'/hero/akubela-hypanel-supreme-wide.webp',alt:'Akubela HyPanel Supreme touchscreen in a contemporary interior'},
 {id:'smart-door-locks',name:'Smart Door Locks',description:'Smarter access to your home.',image:'/hero/akubela-sl60-wide.webp',alt:'Akubela SL60 smart lock installed on an entrance door'},
 {id:'curtain-controllers',name:'Curtain Controllers',description:'Privacy and comfort, simplified.',image:'/products/automation/motorized-curtain-blind-controllers.png',alt:'Curtain control interface beside automated curtains and blinds in a contemporary interior'},
 {id:'smart-remote-controls',name:'Smart Remote Controls',description:'Control your space effortlessly.',image:'/products/SMART%20REMOTE%20CONTROL.jpg',alt:'Black smart remote control with silver trim and physical control buttons'},
 {id:'video-door-phones',name:'Video Door Phones (VDP)',description:"See who's at your door.",image:'/products/VDP.jpg',alt:'Video door phone entrance unit mounted beside a front door'},
 {id:'actuators-gateways',name:'Actuators & Gateways',description:'Intelligent technology behind seamless automation.',image:'/products/akubela/akubela-gateway-g31.webp',alt:'Akubela Gateway G31 automation gateway'},
] as const;
export const catalogueCategories = [
 ...['smart-keypad-switches','smart-remote-controls','curtain-controllers','actuators-gateways','smart-touch-panels','video-door-phones','smart-door-locks'].map(id=>homepageProductCategories.find(c=>c.id===id)!),
 {id:'smart-sensors-detectors',name:'Smart Sensors & Detectors'},
 {id:'smart-lighting-dimmers',name:'Smart Lighting & Dimmers'},
 {id:'smart-plugs-accessories',name:'Smart Plugs & Accessories'},
 {id:'climate-temperature-control',name:'Climate & Temperature Control'},
 {id:'smart-home-software-cloud',name:'Smart Home Software & Cloud'},
];
export type HomepageProductCategory = typeof homepageProductCategories[number];
export const categoryCataloguePath = (id:string) => `/products?category=${encodeURIComponent(id)}`;
// Classify only existing records; do not manufacture remote-control or VDP models.
export function mainProductCategory(product:Product):string|undefined {
 if(product.primaryCategory)return product.primaryCategory;
 const explicit=homepageProductCategories.find(c=>c.name===product.collection);
 if(explicit)return explicit.id;
 const text=`${product.name} ${product.id}`;
 if(/curtain|blind|shades motor/i.test(text))return 'curtain-controllers';
 if(/smart lock|door lock/i.test(text))return 'smart-door-locks';
 if(/hypanel|ionprime-cp4|knx-smart-touch-panels/i.test(text)||product.collection==='Smart Control Panels')return 'smart-touch-panels';
 if(product.collection==='Smart Switches & Scene Panels'||/ionprime-pb|smart-touch-switches/i.test(text))return 'smart-keypad-switches';
 if(/remote control/i.test(product.name))return 'smart-remote-controls';
 if(/video door phone|video doorphone|intercom|\bvdp\b/i.test(product.name))return 'video-door-phones';
 if(/gateway|actuator|module|dali-lighting-controllers/i.test(text))return 'actuators-gateways';
 return undefined;
}
