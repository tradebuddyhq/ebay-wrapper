import { BaseAPI } from "../base-api.js";
import type {
  AspectMetadata,
  CategorySubtree,
  CategorySuggestionsResponse,
  CategoryTree,
  CompatibilityPropertiesResponse,
  CompatibilityPropertyValuesResponse,
  DefaultCategoryTreeIdResponse,
} from "../types.js";

/**
 * eBay Commerce Taxonomy API — category trees, suggestions, aspects, and compatibility.
 * @see https://developer.ebay.com/api-docs/commerce/taxonomy/overview.html
 */
export class TaxonomyAPI extends BaseAPI {
  private static readonly BASE = "/commerce/taxonomy/v1";

  /** Get the default category tree ID for a marketplace. */
  async getDefaultCategoryTreeId(marketplaceId: string): Promise<DefaultCategoryTreeIdResponse> {
    return this.get<DefaultCategoryTreeIdResponse>(
      `${this.ctx.baseUrl}${TaxonomyAPI.BASE}/get_default_category_tree_id`,
      { marketplace_id: marketplaceId },
    );
  }

  /** Get a full category tree by its ID. */
  async getCategoryTree(categoryTreeId: string): Promise<CategoryTree> {
    return this.get<CategoryTree>(
      `${this.ctx.baseUrl}${TaxonomyAPI.BASE}/category_tree/${encodeURIComponent(categoryTreeId)}`,
    );
  }

  /** Get a subtree starting from a specific category. */
  async getCategorySubtree(categoryTreeId: string, categoryId: string): Promise<CategorySubtree> {
    return this.get<CategorySubtree>(
      `${this.ctx.baseUrl}${TaxonomyAPI.BASE}/category_tree/${encodeURIComponent(categoryTreeId)}/get_category_subtree`,
      { category_id: categoryId },
    );
  }

  /** Get category suggestions based on a keyword query. */
  async getCategorySuggestions(categoryTreeId: string, q: string): Promise<CategorySuggestionsResponse> {
    return this.get<CategorySuggestionsResponse>(
      `${this.ctx.baseUrl}${TaxonomyAPI.BASE}/category_tree/${encodeURIComponent(categoryTreeId)}/get_category_suggestions`,
      { q },
    );
  }

  /** Get item aspects (attributes) for a category. */
  async getItemAspectsForCategory(categoryTreeId: string, categoryId: string): Promise<AspectMetadata> {
    return this.get<AspectMetadata>(
      `${this.ctx.baseUrl}${TaxonomyAPI.BASE}/category_tree/${encodeURIComponent(categoryTreeId)}/get_item_aspects_for_category`,
      { category_id: categoryId },
    );
  }

  /** Get compatibility properties for a category (e.g., Year, Make, Model). */
  async getCompatibilityProperties(categoryTreeId: string, categoryId: string): Promise<CompatibilityPropertiesResponse> {
    return this.get<CompatibilityPropertiesResponse>(
      `${this.ctx.baseUrl}${TaxonomyAPI.BASE}/category_tree/${encodeURIComponent(categoryTreeId)}/get_compatibility_properties`,
      { category_id: categoryId },
    );
  }

  /** Get values for a compatibility property (e.g., all makes for "Make"). */
  async getCompatibilityPropertyValues(
    categoryTreeId: string,
    categoryId: string,
    compatibilityPropertyName: string,
    filter?: Record<string, string>,
  ): Promise<CompatibilityPropertyValuesResponse> {
    const params: Record<string, string> = {
      category_id: categoryId,
      compatibility_property: compatibilityPropertyName,
    };
    if (filter) {
      const filterParts = Object.entries(filter).map(([k, v]) => `${k}:{${v}}`);
      params["filter"] = filterParts.join(",");
    }
    return this.get<CompatibilityPropertyValuesResponse>(
      `${this.ctx.baseUrl}${TaxonomyAPI.BASE}/category_tree/${encodeURIComponent(categoryTreeId)}/get_compatibility_property_values`,
      params,
    );
  }
}
