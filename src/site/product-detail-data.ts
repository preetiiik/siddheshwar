import type { Product } from '../product-data';
import { unifiedCatalogue } from './unified-catalogue';
import { catalogueCategories } from './product-categories';

export function resolveProduct(slug:string|undefined) {
 return slug?unifiedCatalogue.find(p=>p.slug===slug||p.id===slug||p.aliases.includes(slug)||p.detailPath?.split('/').pop()===slug):undefined;
}
export function productCategory(p:Product) { return catalogueCategories.find(c=>c.id===p.primaryCategory); }
export function verifiedFeatures(p:Product) {
 // Manufacturer collection labels are taxonomy, not verified technical features.
 return [...new Set(p.features)].filter(f=>f.trim()&&f!==p.collection&&f!==p.subcategory).slice(0,6);
}
export function featureTitle(text:string,index:number) {
 if(/touchscreen|pixels/i.test(text))return 'Touchscreen interface';
 if(/rgb leds/i.test(text))return 'Configurable buttons and RGB indicators';
 if(/lighting.*dimming.*blind/i.test(text))return 'Lighting, blinds and scenes';
 if(/finishes.*configurations/i.test(text))return 'Interchangeable rocker finishes';
 if(/rocker covers selected separately/i.test(text))return 'Separate rocker selection';
 if(/48 functions/i.test(text))return 'Multifunction room control';
 if(/configurable interface/i.test(text))return 'Configurable interface';
 if(/sensor/i.test(text))return 'Integrated sensing';
 if(/function|pages/i.test(text))return 'Control functions';
 if(/front|frame|cover|finish/i.test(text))return 'Materials and finishes';
 if(/button/i.test(text))return 'Button controls';
 return `Product highlight ${index+1}`;
}
export function verifiedSpecifications(p:Product) {
 const specs=(p.specifications||[]).filter(s=>s.label.trim()&&s.value.trim());
 if(!specs.some(s=>s.label.toLowerCase()==='brand')&&p.brand)specs.push({label:'Brand',value:p.brand});
 if(!specs.some(s=>s.label.toLowerCase()==='product type')&&p.productKind)specs.push({label:'Product type',value:p.productKind==='software'?'Software / platform':'Hardware'});
 return specs.filter((s,i)=>specs.findIndex(other=>other.label.toLowerCase()===s.label.toLowerCase())===i);
}
export function relatedProducts(p:Product) {
 const others=unifiedCatalogue.filter(item=>item.id!==p.id);
 const category=others.filter(item=>item.primaryCategory===p.primaryCategory);
 const brand=others.filter(item=>item.brand===p.brand&&!category.some(c=>c.id===item.id));
 return [...category,...brand].slice(0,4);
}
export function productEnquiryPath(p:Product) {
 const params=new URLSearchParams({interest:`${p.brand} — ${p.name}`,product:p.name,brand:p.brand||'',model:p.modelNumber||p.name});
 return `/contact?${params}`;
}
export function productContentReview(p:Product) {
 const features=verifiedFeatures(p);
 const specs=(p.specifications||[]).filter(s=>!['brand','collection','product type'].includes(s.label.toLowerCase())&&s.value.trim());
 return {id:p.id,name:p.name,brand:p.brand,path:p.detailPath,imageReview:p.imageStatus==='placeholder',missingVerifiedFeatures:features.length===0,missingTechnicalSpecifications:specs.length===0,nameReview:p.verificationStatus==='user-supplied',verificationStatus:p.verificationStatus};
}
