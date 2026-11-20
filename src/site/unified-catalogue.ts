import { approvedProducts } from './approved-products';
import { catalogueCategories } from './product-categories';
import type { Product } from '../product-data';

// Retain every product from the original selected catalogue, including Aura.
const retained = approvedProducts.map(p => p.id === 'approved-akubela-aura-series-smart-switch'
 ? {...p, aliases:[...p.aliases, 'akubela-aura-series-smart-switch']} : p);
const mergedDuplicates = [{ retainedId:'approved-akubela-aura-series-smart-switch', mergedId:'akubela-aura-series-smart-switch', name:'Aura Series Smart Switch', reason:'The original selected product is retained; the imported duplicate is removed.' }];
const ephesus:Product = {
 id:'ephesus-knx-room-controller-hvac', slug:'ephesus-knx-room-controller-hvac', name:'EPHESUS KNX Room Controller & HVAC', title:'EPHESUS KNX Room Controller & HVAC', category:'automation', brand:'Ephesus', primaryCategory:'knx-room-controllers', collection:'KNX Room Controllers',
 shortDescription:'A KNX-based room controller with integrated temperature, humidity and ambient light sensors, HVAC control and customisable button configurations.',
 fullDescription:'A KNX-based room controller bringing integrated sensors, HVAC control and customisable buttons together for connected spaces.', image:'', alt:'', features:['LCD Touch Screen','Temperature & Humidity Sensors','Ambient Light Sensor','3 LED Colour Options','Handcrafted Production'], applications:[], relatedProductIds:[], aliases:[], products:[], verificationStatus:'user-supplied', productKind:'hardware', detailPath:'/products/ephesus-knx-room-controller-hvac',
};
const oneHome:Product[] = [
 { id:'1home-server-knx', slug:'1home-server-knx', name:'1Home Server KNX', title:'1Home Server KNX', category:'automation', brand:'1Home', primaryCategory:'smart-home-servers-gateways', collection:'Smart Home Servers & Gateways', shortDescription:'A smart-home integration server connecting KNX with modern smart-home platforms, mobile applications and voice assistants.', fullDescription:'A smart-home integration server connecting KNX with modern smart-home platforms, mobile applications and voice assistants.', image:'', alt:'', features:[], applications:[], relatedProductIds:[], aliases:[], products:[], verificationStatus:'user-supplied', productKind:'hardware', detailPath:'/products/1home-server-knx' },
 { id:'1home-server-ch', slug:'1home-server-ch', name:'1Home Server CH', title:'1Home Server CH', category:'automation', brand:'1Home', primaryCategory:'smart-home-servers-gateways', collection:'Smart Home Servers & Gateways', shortDescription:'An integration solution that synchronises KNX configurations with Crestron Home for seamless smart-home control.', fullDescription:'An integration solution that synchronises KNX configurations with Crestron Home for seamless smart-home control.', image:'', alt:'', features:[], applications:[], relatedProductIds:[], aliases:[], products:[], verificationStatus:'user-supplied', productKind:'hardware', detailPath:'/products/1home-server-ch' },
];
export const unifiedCatalogue:Product[]=[...retained,ephesus,...oneHome].map(p=>({...p,detailPath:p.detailPath || `/products/${p.slug.replace(/^approved-/, '')}`}));
export const catalogueAudit={
 importedAkubela:0,total:unifiedCatalogue.length,
 byCategory:catalogueCategories.map(c=>({id:c.id,name:c.name,count:unifiedCatalogue.filter(p=>p.primaryCategory===c.id).length})),
 byBrand:[...new Set(unifiedCatalogue.map(p=>p.brand!))].sort().map(brand=>({brand,count:unifiedCatalogue.filter(p=>p.brand===brand).length})),
 mergedDuplicates,
 uncertainMatches:retained.filter(p=>p.brand==='Akubela').map(p=>({id:p.id,name:p.name,reason:'Generic marketing description; insufficient manufacturer model information to match a specific HyPanel.'})),
 uncertainVariantGroups:[{brand:'OneTouch',names:['OT 630','Digital Door Lock OT 630'],reason:'Shared OT 630 reference, but no manufacturer part numbers or documentation establishing that these user-supplied entries are identical; retained separately.'}],
 placeholderImages:unifiedCatalogue.filter(p=>p.imageStatus==='placeholder').map(p=>({id:p.id,name:p.name,brand:p.brand})),
 userSupplied:unifiedCatalogue.filter(p=>p.verificationStatus==='user-supplied').map(p=>p.id),
};
