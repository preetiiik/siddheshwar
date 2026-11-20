import type { Product } from '../product-data';
export const homepageProductCategories = [
 {id:'smart-keypad-switches',name:'Smart Keypad Switches',description:'Elegant control at your fingertips.',image:'/products/all products/Smart Keypad Switch.png',alt:'Smart keypad switch with illuminated controls'},
 {id:'smart-touch-panels',name:'Smart Touch Panels',description:'One interface. Intelligent control.',image:'/products/all products/Smart Touch Panel.png',alt:'Smart touch panel in a contemporary interior'},
 {id:'smart-door-locks',name:'Smart Door Locks',description:'Smarter access to your home.',image:'/products/all products/Door Lock System .png',alt:'Smart door locks on an entrance door'},
 {id:'curtain-controllers',name:'Curtain Controllers',description:'Privacy and comfort, simplified.',image:'/products/all products/Curtain Controller.png',alt:'Curtain control interface beside automated curtains and blinds in a contemporary interior'},
 {id:'smart-remote-controls',name:'Smart Remote Controls',description:'Control your space effortlessly.',image:'/products/all products/Smart remote control.png',alt:'Smart remote control in a contemporary setting'},
 {id:'video-door-phones',name:'Video Door Phones (VDP)',description:"See who's at your door.",image:'/products/all products/Video door phone.png',alt:'Video door phone entrance unit'},
 {id:'actuators-gateways',name:'Actuators & Gateways',description:'Intelligent technology behind seamless automation.',image:'/products/all products/Actuator.png',alt:'Living room with integrated automation controls'},
] as const;
export const catalogueCategories = [
 ...['smart-keypad-switches','smart-remote-controls','curtain-controllers','actuators-gateways','smart-touch-panels','video-door-phones','smart-door-locks'].map(id=>homepageProductCategories.find(c=>c.id===id)!),
 {id:'knx-room-controllers',name:'KNX Room Controllers'},
 {id:'smart-home-servers-gateways',name:'Smart Home Servers & Gateways'},
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
