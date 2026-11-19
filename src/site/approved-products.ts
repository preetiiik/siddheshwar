import collections from './product-collection-details.json';
import { ionprimeProducts } from '../ionprime-data';
import { homepageProductCategories } from './product-categories';
import type { Product } from '../product-data';

// Preserve the user-approved selection as an input to the canonical merged catalogue.
export const approvedProducts: Product[] = collections.flatMap(collection => collection.products.map(model => ({
 id:`approved-${model.id}`,slug:`approved-${model.id}`,name:model.name,title:model.name,
 brand:model.brand,category:'automation' as const,primaryCategory:collection.slug,subcategory:collection.name,sourceCatalogue:'User-approved Siddheshwar selection',verificationStatus:'user-supplied' as const,imageStatus:model.placeholder?'placeholder' as const:'actual' as const,productKind:'hardware' as const,
 collection:homepageProductCategories.find(c=>c.id===collection.slug)!.name,
 image:model.image,alt:model.placeholder?`Illustrative placeholder for ${model.brand} ${model.name}`:`${model.brand} ${model.name}`,
 shortDescription:collection.intro,
 fullDescription:`${model.brand} ${model.name} is included in the ${collection.name} collection. Product specifications, finishes and suitability are confirmed during consultation.${model.placeholder?' The displayed artwork is an illustrative placeholder.':''}`,
 features:[],applications:[],relatedProductIds:[],aliases:[],products:[model.name],
}))).map(product=>{
 const source=product.brand==='Theben'?ionprimeProducts.find(p=>p.id===(product.name.includes('CP4')?'ionprime-cp4-knx':'ionprime-pb-knx')):undefined;
 return source?{...source,...product,shortDescription:source.shortDescription,fullDescription:source.fullDescription,features:source.features,specifications:source.specifications,catalogUrl:source.catalogUrl,contentSource:source.contentSource,sourceCatalogue:'iONprime_Market Launch PPT_11-2025.pdf',verificationStatus:'catalogue-listed' as const,modelNumber:source.specifications?.find(s=>s.label==='Article number')?.value}:product;
});
