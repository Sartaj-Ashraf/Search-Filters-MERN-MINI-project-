
// Filters Panel Component
import { APP_CONFIG } from "../config/config";
import { FilterUtils } from "../utils/supportUtil";
import { SelectInput,SearchInput } from "./inputs";
import { NumericFilter } from "@/components";

import { Filter } from "lucide-react";

export default function FiltersPanel({ 
    show, 
    filters, 
    priceFilter, 
    ratingFilter, 
    onFilterChange, 
    onPriceFilterChange, 
    onRatingFilterChange,
    onClearFilters,
    hasActiveFilters 
  }) {
    if (!show) return null
  
    const companyOptions = APP_CONFIG.COMPANIES.map(company => ({
      value: company,
      label: FilterUtils.capitalizeFirstLetter(company)
    }))
  
    const featuredOptions = [
      { value: "", label: "All Products" },
      { value: "true", label: "Featured Only" },
      { value: "false", label: "Non-Featured" }
    ]
  
    const limitOptions = [
      { value: 6, label: "6 items" },
      { value: 12, label: "12 items" },
      { value: 24, label: "24 items" },
      { value: 48, label: "48 items" }
    ]
  
    return (
      <div className="bg-white rounded-2xl shadow-lg border p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500"></div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <Filter className="h-6 w-6 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-900">Filters & Search</h2>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-red-600 hover:text-red-700 underline font-medium"
            >
              Clear All Filters
            </button>
          )}
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <SearchInput
            value={filters.name}
            onChange={(e) => onFilterChange("name", e.target.value)}
            placeholder="Search by name..."
          />
  
          <SelectInput
            label="Company"
            value={filters.company}
            onChange={(e) => onFilterChange("company", e.target.value)}
            options={companyOptions}
            placeholder="All Companies"
          />
  
          <SelectInput
            label="Featured Status"
            value={filters.featured}
            onChange={(e) => onFilterChange("featured", e.target.value)}
            options={featuredOptions}
          />
  
          <SelectInput
            label="Sort By"
            value={filters.sort}
            onChange={(e) => onFilterChange("sort", e.target.value)}
            options={APP_CONFIG.SORT_OPTIONS}
          />
  
          <NumericFilter
            label="Price Filter"
            filter={priceFilter}
            onChange={onPriceFilterChange}
            operators={APP_CONFIG.OPERATORS}
            step="0.01"
          />
  
          <NumericFilter
            label="Rating Filter"
            filter={ratingFilter}
            onChange={onRatingFilterChange}
            operators={APP_CONFIG.OPERATORS}
            step="0.1"
            min="0"
            max="5"
          />
  
          <SelectInput
            label="Items per Page"
            value={filters.limit}
            onChange={(e) => onFilterChange("limit", Number(e.target.value))}
            options={limitOptions}
          />
        </div>
      </div>
    )
  }
  