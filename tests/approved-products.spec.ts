import {test,expect} from '@playwright/test';
test('merged catalogue accounts for all sources without duplicate records',async({page})=>{
 await page.goto('/products');await page.locator('.pc-card').first().waitFor();
 const data=await page.evaluate(async()=>{const m=await import('/src/site/unified-catalogue.ts');return {audit:m.catalogueAudit,products:m.unifiedCatalogue};});
 expect(data.audit.total).toBe(116);expect(data.audit.importedAkubela).toBe(79);expect(new Set(data.products.map(p=>p.id)).size).toBe(116);
 expect(data.audit.byCategory.map(c=>c.count)).toEqual([20,4,5,15,23,2,10,9,14,5,5,4]);expect(data.audit.mergedDuplicates).toHaveLength(1);
 expect(data.products.filter(p=>p.name==='Aura Series Smart Switch')).toHaveLength(1);expect(data.products.filter(p=>p.productKind==='software')).toHaveLength(4);
 expect(data.products.filter(p=>p.brand==='Akubela')).toHaveLength(84);
 for(const p of data.products){expect(p.primaryCategory).toBeTruthy();expect(p.sourceCatalogue).toBeTruthy();expect(p.verificationStatus).toBeTruthy();}
 for(const c of data.audit.byCategory){await page.goto(`/products?category=${c.id}`);await expect(page.locator('.pc-card')).toHaveCount(c.count);}
});
