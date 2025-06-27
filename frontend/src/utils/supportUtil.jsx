// ============ UTILITY FUNCTIONS (Single Responsibility) ============
export class FilterUtils {
  static hasActiveFilters(filters, priceFilter, ratingFilter) {
    return (
      filters.name ||
      filters.company ||
      filters.featured ||
      filters.sort ||
      priceFilter.operator ||
      ratingFilter.operator
    );
  }

  static calculateTotalPages(totalProducts, limit) {
    return Math.ceil(totalProducts / limit);
  }

  static formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

export const createDefaultFilters = () => ({
  name: "",
  company: "",
  featured: "",
  sort: "",
  page: 1,
  limit: 12,
});

export const createDefaultNumericFilter = () => ({ operator: "", value: "" });

export const createDefaultProduct = () => ({
  name: "",
  price: "",
  rating: "",
  company: "",
  featured: false,
});
