import { useState, useEffect } from "react";

import { ProductService } from "./services/product";
import { createDefaultFilters } from "./utils/supportUtil";
import { createDefaultNumericFilter } from "./utils/supportUtil";
import { createDefaultProduct } from "./utils/supportUtil";
import { APP_CONFIG } from "./config/config";
import { FilterUtils } from "./utils/supportUtil";
import {
  ProductsGrid,
  ResultsSummary,
  Pagination,
  CreateProductForm,
  AppHeader,
  FiltersPanel,
} from "@/components";

// ============ MAIN APPLICATION (Open/Closed & Dependency Inversion) ============
export default function App() {
  // State Management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState(createDefaultFilters());
  const [priceFilter, setPriceFilter] = useState(createDefaultNumericFilter());
  const [ratingFilter, setRatingFilter] = useState(
    createDefaultNumericFilter()
  );
  const [newProduct, setNewProduct] = useState(createDefaultProduct());

  // Service Instance (Dependency Injection)
  const productService = new ProductService(`${APP_CONFIG.API_BASE_URL}/products`);

  // Effects
  useEffect(() => {
    fetchProducts();
  }, [filters, priceFilter, ratingFilter]);

  // Data Fetching
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.fetchProducts(
        filters,
        priceFilter,
        ratingFilter
      );
      setProducts(data.products);
      setTotalProducts(data.nbHits);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Product Creation
  const createProduct = async (e) => {
    e.preventDefault();
    try {
      await productService.createProduct(newProduct);
      setNewProduct(createDefaultProduct());
      setShowCreateForm(false);
      fetchProducts();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  // Filter Management
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filters change
    }));
  };

  const clearAllFilters = () => {
    setFilters(createDefaultFilters());
    setPriceFilter(createDefaultNumericFilter());
    setRatingFilter(createDefaultNumericFilter());
  };

  // Computed Values
  const totalPages = FilterUtils.calculateTotalPages(
    totalProducts,
    filters.limit
  );
  const hasActiveFilters = FilterUtils.hasActiveFilters(
    filters,
    priceFilter,
    ratingFilter
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <AppHeader
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        onToggleCreateForm={() => setShowCreateForm(!showCreateForm)}
        hasActiveFilters={hasActiveFilters}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CreateProductForm
          show={showCreateForm}
          product={newProduct}
          onChange={setNewProduct}
          onSubmit={createProduct}
          onCancel={() => setShowCreateForm(false)}
        />

        <FiltersPanel
          show={showFilters}
          filters={filters}
          priceFilter={priceFilter}
          ratingFilter={ratingFilter}
          onFilterChange={handleFilterChange}
          onPriceFilterChange={setPriceFilter}
          onRatingFilterChange={setRatingFilter}
          onClearFilters={clearAllFilters}
          hasActiveFilters={hasActiveFilters}
        />

        <ResultsSummary
          productsCount={products.length}
          totalProducts={totalProducts}
          currentPage={filters.page}
          totalPages={totalPages}
        />

        <ProductsGrid products={products} loading={loading} />

        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={(page) => handleFilterChange("page", page)}
        />
      </div>
    </div>
  );
}
