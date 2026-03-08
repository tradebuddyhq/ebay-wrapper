import { BaseAPI } from "../base-api.js";
/**
 * eBay Commerce Taxonomy API — category trees, suggestions, aspects, and compatibility.
 * @see https://developer.ebay.com/api-docs/commerce/taxonomy/overview.html
 */
export class TaxonomyAPI extends BaseAPI {
    static BASE = "/commerce/taxonomy/v1";
    /** Get the default category tree ID for a marketplace. */
    async getDefaultCategoryTreeId(marketplaceId) {
        return this.get(`${this.ctx.baseUrl}${TaxonomyAPI.BASE}/get_default_category_tree_id`, { marketplace_id: marketplaceId });
    }
    /** Get a full category tree by its ID. */
    async getCategoryTree(categoryTreeId) {
        return this.get(`${this.ctx.baseUrl}${TaxonomyAPI.BASE}/category_tree/${encodeURIComponent(categoryTreeId)}`);
    }
    /** Get a subtree starting from a specific category. */
    async getCategorySubtree(categoryTreeId, categoryId) {
        return this.get(`${this.ctx.baseUrl}${TaxonomyAPI.BASE}/category_tree/${encodeURIComponent(categoryTreeId)}/get_category_subtree`, { category_id: categoryId });
    }
    /** Get category suggestions based on a keyword query. */
    async getCategorySuggestions(categoryTreeId, q) {
        return this.get(`${this.ctx.baseUrl}${TaxonomyAPI.BASE}/category_tree/${encodeURIComponent(categoryTreeId)}/get_category_suggestions`, { q });
    }
    /** Get item aspects (attributes) for a category. */
    async getItemAspectsForCategory(categoryTreeId, categoryId) {
        return this.get(`${this.ctx.baseUrl}${TaxonomyAPI.BASE}/category_tree/${encodeURIComponent(categoryTreeId)}/get_item_aspects_for_category`, { category_id: categoryId });
    }
    /** Get compatibility properties for a category (e.g., Year, Make, Model). */
    async getCompatibilityProperties(categoryTreeId, categoryId) {
        return this.get(`${this.ctx.baseUrl}${TaxonomyAPI.BASE}/category_tree/${encodeURIComponent(categoryTreeId)}/get_compatibility_properties`, { category_id: categoryId });
    }
    /** Get values for a compatibility property (e.g., all makes for "Make"). */
    async getCompatibilityPropertyValues(categoryTreeId, categoryId, compatibilityPropertyName, filter) {
        const params = {
            category_id: categoryId,
            compatibility_property: compatibilityPropertyName,
        };
        if (filter) {
            const filterParts = Object.entries(filter).map(([k, v]) => `${k}:{${v}}`);
            params["filter"] = filterParts.join(",");
        }
        return this.get(`${this.ctx.baseUrl}${TaxonomyAPI.BASE}/category_tree/${encodeURIComponent(categoryTreeId)}/get_compatibility_property_values`, params);
    }
}
//# sourceMappingURL=taxonomy.js.map