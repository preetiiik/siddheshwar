import solutions from './solutions-data';
import { productCategories, allProducts, type Product } from './product-data';

// Relationships live only in solutions-data.json; reverse links are derived.
export function getProductsForSolution(solution: { relatedProductIds: string[] }): Product[] {
  return solution.relatedProductIds.flatMap(id => {
    const product = productCategories.find(item => item.id === id);
    return product ? [product] : [];
  });
}

export function getSolutionsUsingProduct(productId: string) {
  const product = allProducts.find(item => item.id === productId);
  return solutions.filter(solution => solution.relatedProductIds.includes(productId) || (product?.parentId ? solution.relatedProductIds.includes(product.parentId) : false));
}
