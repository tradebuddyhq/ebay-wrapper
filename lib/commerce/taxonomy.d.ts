import { BaseAPI } from "../base-api.js";
import type { AspectMetadata, CategorySubtree, CategorySuggestionsResponse, CategoryTree, CompatibilityPropertiesResponse, CompatibilityPropertyValuesResponse, DefaultCategoryTreeIdResponse } from "../types.js";
/**
 * eBay Commerce Taxonomy API — category trees, suggestions, aspects, and compatibility.
 * @see https://developer.ebay.com/api-docs/commerce/taxonomy/overview.html
 */
export declare class TaxonomyAPI extends BaseAPI {
    private static readonly BASE;
    /** Get the default category tree ID for a marketplace. */
    getDefaultCategoryTreeId(marketplaceId: string): Promise<DefaultCategoryTreeIdResponse>;
    /** Get a full category tree by its ID. */
    getCategoryTree(categoryTreeId: string): Promise<CategoryTree>;
    /** Get a subtree starting from a specific category. */
    getCategorySubtree(categoryTreeId: string, categoryId: string): Promise<CategorySubtree>;
    /** Get category suggestions based on a keyword query. */
    getCategorySuggestions(categoryTreeId: string, q: string): Promise<CategorySuggestionsResponse>;
    /** Get item aspects (attributes) for a category. */
    getItemAspectsForCategory(categoryTreeId: string, categoryId: string): Promise<AspectMetadata>;
    /** Get compatibility properties for a category (e.g., Year, Make, Model). */
    getCompatibilityProperties(categoryTreeId: string, categoryId: string): Promise<CompatibilityPropertiesResponse>;
    /** Get values for a compatibility property (e.g., all makes for "Make"). */
    getCompatibilityPropertyValues(categoryTreeId: string, categoryId: string, compatibilityPropertyName: string, filter?: Record<string, string>): Promise<CompatibilityPropertyValuesResponse>;
}
//# sourceMappingURL=taxonomy.d.ts.map