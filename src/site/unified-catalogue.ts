import { approvedProducts } from './approved-products';
import { akubelaProducts } from '../akubela-data';
import { catalogueCategories } from './product-categories';
import { akubelaBase } from './akubela/catalogue';
import type { Product } from '../product-data';

// Exact manufacturer collection mappings, overridden below by primary function.
const categoryMap:Record<string,string> = {
 'Smart Control Panels':'smart-touch-panels',
 'Smart Switches & Scene Panels':'smart-keypad-switches',
 'Smart Door Locks':'smart-door-locks',
 'Smart Sensors & Detectors':'smart-sensors-detectors',
 'Gateways & Network Controllers':'actuators-gateways',
 'Automation & Dimmer Modules':'actuators-gateways',
 'Climate & Temperature Control':'climate-temperature-control',
 'Smart Lighting':'smart-lighting-dimmers',
 'Smart Plugs, Sockets & Motorized Accessories':'smart-plugs-accessories',
 'Smart Home Software & Cloud':'smart-home-software-cloud',
};
export function akubelaPrimaryCategory(p:Product):string {
 if(/curtain|shades motor/i.test(p.name))return 'curtain-controllers';
 if(/temperature control panel/i.test(p.name))return 'climate-temperature-control';
 if(/dimmer|zigbee.*led (controller|driver)/i.test(p.name))return 'smart-lighting-dimmers';
 const mapped=categoryMap[p.collection || ''];
 if(!mapped)throw new Error(`Unmapped Akubela collection: ${p.collection}`);
 return mapped;
}
const imported:Product[]=akubelaProducts.map(p=>({...p,
 primaryCategory:akubelaPrimaryCategory(p),subcategory:p.collection,
 sourceCatalogue:'akubela Smart Home Catalogue260701.pdf',verificationStatus:'catalogue-listed',imageStatus:'actual',
 productKind:p.collection==='Smart Home Software & Cloud'?'software':'hardware',
 detailPath:`${akubelaBase}/products/${p.slug}`,
}));
const normalized=(value:string)=>value.normalize('NFKC').toLowerCase().replace(/[^a-z0-9]/g,'');
export const mergedDuplicates:{retainedId:string;mergedId:string;name:string;reason:string}[]=[];
const retained:Product[]=[];
for(const existing of approvedProducts){
 const match=imported.find(p=>p.brand===existing.brand && normalized(p.name)===normalized(existing.name));
 if(match){
  // Aura is an exact brand/name match with the same source image; retain the manufacturer route.
  match.aliases=[...new Set([...match.aliases,existing.id,existing.slug])];
  mergedDuplicates.push({retainedId:match.id,mergedId:existing.id,name:existing.name,reason:'Exact brand and verified product-name match; identical product image.'});
 }else retained.push(existing);
}
export const unifiedCatalogue:Product[]=[...retained,...imported].map(p=>({...p,detailPath:p.detailPath || `/products/${p.slug.replace(/^approved-/, '')}`}));
export const catalogueAudit={
 importedAkubela:imported.length,total:unifiedCatalogue.length,
 byCategory:catalogueCategories.map(c=>({id:c.id,name:c.name,count:unifiedCatalogue.filter(p=>p.primaryCategory===c.id).length})),
 byBrand:[...new Set(unifiedCatalogue.map(p=>p.brand!))].sort().map(brand=>({brand,count:unifiedCatalogue.filter(p=>p.brand===brand).length})),
 mergedDuplicates,
 uncertainMatches:retained.filter(p=>p.brand==='Akubela').map(p=>({id:p.id,name:p.name,reason:'Generic marketing description; insufficient manufacturer model information to match a specific HyPanel.'})),
 uncertainVariantGroups:[{brand:'OneTouch',names:['OT 630','Digital Door Lock OT 630'],reason:'Shared OT 630 reference, but no manufacturer part numbers or documentation establishing that these user-supplied entries are identical; retained separately.'}],
 placeholderImages:unifiedCatalogue.filter(p=>p.imageStatus==='placeholder').map(p=>({id:p.id,name:p.name,brand:p.brand})),
 userSupplied:unifiedCatalogue.filter(p=>p.verificationStatus==='user-supplied').map(p=>p.id),
};
