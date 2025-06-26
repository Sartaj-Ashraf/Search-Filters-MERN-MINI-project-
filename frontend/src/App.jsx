"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import {
  Search,
  Plus,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Package,
  Building2,
  Calendar,
  DollarSign,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react"

const API_BASE_URL = "http://localhost:5000/api/v1/products" // Adjust this to your backend URL

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalProducts, setTotalProducts] = useState(0)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showFilters, setShowFilters] = useState(true)

  // Filter states
  const [filters, setFilters] = useState({
    name: "",
    company: "",
    featured: "",
    sort: "",
    page: 1,
    limit: 12,
  })

  // Numeric filter states
  const [priceFilter, setPriceFilter] = useState({ operator: "", value: "" })
  const [ratingFilter, setRatingFilter] = useState({ operator: "", value: "" })

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    rating: "",
    company: "",
    featured: false,
  })

  const companies = ["ikea", "liddy", "caressa", "marcos"]
  const operators = [
    { value: "=", label: "Equal to" },
    { value: ">", label: "Greater than" },
    { value: ">=", label: "Greater or equal" },
    { value: "<", label: "Less than" },
    { value: "<=", label: "Less or equal" },
  ]

  const sortOptions = [
    { value: "", label: "Default" },
    { value: "name", label: "Name A-Z" },
    { value: "-name", label: "Name Z-A" },
    { value: "price", label: "Price Low-High" },
    { value: "-price", label: "Price High-Low" },
    { value: "rating", label: "Rating Low-High" },
    { value: "-rating", label: "Rating High-Low" },
    { value: "createdAt", label: "Oldest First" },
    { value: "-createdAt", label: "Newest First" },
  ]

  useEffect(() => {
    fetchProducts()
  }, [filters, priceFilter, ratingFilter])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams()

      // Add basic filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value)
        }
      })

      // Build numeric filters
      const numericFilters = []
      if (priceFilter.operator && priceFilter.value) {
        numericFilters.push(`price${priceFilter.operator}${priceFilter.value}`)
      }
      if (ratingFilter.operator && ratingFilter.value) {
        numericFilters.push(`rating${ratingFilter.operator}${ratingFilter.value}`)
      }
      if (numericFilters.length > 0) {
        queryParams.append("numericFilters", numericFilters.join(","))
      }

      const response = await axios.get(`${API_BASE_URL}?${queryParams}`)
      setProducts(response.data.products)
      setTotalProducts(response.data.nbHits)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const createProduct = async (e) => {
    e.preventDefault()
    try {
      await axios.post(API_BASE_URL, {
        ...newProduct,
        price: Number(newProduct.price),
        rating: Number(newProduct.rating),
      })
      setNewProduct({ name: "", price: "", rating: "", company: "", featured: false })
      setShowCreateForm(false)
      fetchProducts()
    } catch (error) {
      console.error("Error creating product:", error)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filters change
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      name: "",
      company: "",
      featured: "",
      sort: "",
      page: 1,
      limit: 12,
    })
    setPriceFilter({ operator: "", value: "" })
    setRatingFilter({ operator: "", value: "" })
  }

  const totalPages = Math.ceil(totalProducts / filters.limit)

  const hasActiveFilters =
    filters.name || filters.company || filters.featured || filters.sort || priceFilter.operator || ratingFilter.operator

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Product Hub</h1>
                <p className="text-sm text-gray-500">Manage & Filter Products</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  showFilters ? "bg-blue-100 text-blue-700 border border-blue-200" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    !
                  </span>
                )}
              </button>
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Plus className="h-4 w-4" />
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Product Form */}
        {showCreateForm && (
          <div className="bg-white rounded-2xl shadow-lg border p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create New Product</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={createProduct} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, price: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={newProduct.rating}
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, rating: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="4.5"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Company</label>
                <select
                  value={newProduct.company}
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, company: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select Company</option>
                  {companies.map((company) => (
                    <option key={company} value={company}>
                      {company.charAt(0).toUpperCase() + company.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-3 pt-8">
                <input
                  type="checkbox"
                  id="featured"
                  checked={newProduct.featured}
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <span>Featured Product</span>
                </label>
              </div>
              <div className="flex space-x-3 pt-6">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-sm"
                >
                  Create Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-lg border p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500"></div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <Filter className="h-6 w-6 text-gray-700" />
                <h2 className="text-2xl font-bold text-gray-900">Filters & Search</h2>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-red-600 hover:text-red-700 underline font-medium"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Name Search */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Search Products</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={filters.name}
                    onChange={(e) => handleFilterChange("name", e.target.value)}
                    placeholder="Search by name..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Company Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Company</label>
                <select
                  value={filters.company}
                  onChange={(e) => handleFilterChange("company", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">All Companies</option>
                  {companies.map((company) => (
                    <option key={company} value={company}>
                      {company.charAt(0).toUpperCase() + company.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Featured Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Featured Status</label>
                <select
                  value={filters.featured}
                  onChange={(e) => handleFilterChange("featured", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">All Products</option>
                  <option value="true">Featured Only</option>
                  <option value="false">Non-Featured</option>
                </select>
              </div>

              {/* Sort */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Sort By</label>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange("sort", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Price Filter</label>
                <div className="flex space-x-2">
                  <select
                    value={priceFilter.operator}
                    onChange={(e) => setPriceFilter((prev) => ({ ...prev, operator: e.target.value }))}
                    className="flex-1 px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  >
                    <option value="">Operator</option>
                    {operators.map((op) => (
                      <option key={op.value} value={op.value}>
                        {op.value}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    step="0.01"
                    value={priceFilter.value}
                    onChange={(e) => setPriceFilter((prev) => ({ ...prev, value: e.target.value }))}
                    placeholder="Value"
                    className="flex-1 px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Rating Filter</label>
                <div className="flex space-x-2">
                  <select
                    value={ratingFilter.operator}
                    onChange={(e) => setRatingFilter((prev) => ({ ...prev, operator: e.target.value }))}
                    className="flex-1 px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  >
                    <option value="">Operator</option>
                    {operators.map((op) => (
                      <option key={op.value} value={op.value}>
                        {op.value}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={ratingFilter.value}
                    onChange={(e) => setRatingFilter((prev) => ({ ...prev, value: e.target.value }))}
                    placeholder="Value"
                    className="flex-1 px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  />
                </div>
              </div>

              {/* Items per page */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Items per Page</label>
                <select
                  value={filters.limit}
                  onChange={(e) => handleFilterChange("limit", Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value={6}>6 items</option>
                  <option value={12}>12 items</option>
                  <option value={24}>24 items</option>
                  <option value={48}>48 items</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600">
            <span className="font-semibold text-gray-900">{products.length}</span> of{" "}
            <span className="font-semibold text-gray-900">{totalProducts}</span> products
            {filters.page > 1 && (
              <span className="ml-2 text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                Page {filters.page} of {totalPages}
              </span>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or create a new product.</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              Create First Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    {product.featured && (
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                        <Sparkles className="h-3 w-3" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        <span className="text-2xl font-bold text-green-600">${product.price}</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold text-yellow-700">{product.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-600">
                      <Building2 className="h-4 w-4" />
                      <span className="text-sm font-medium capitalize">{product.company}</span>
                    </div>

                    {product.createdAt && (
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                          {new Date(product.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handleFilterChange("page", Math.max(1, filters.page - 1))}
              disabled={filters.page === 1}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed bg-white rounded-xl border hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, filters.page - 2)) + i
                return (
                  <button
                    key={pageNum}
                    onClick={() => handleFilterChange("page", pageNum)}
                    className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
                      filters.page === pageNum
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-700 hover:bg-gray-100 bg-white border"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => handleFilterChange("page", Math.min(totalPages, filters.page + 1))}
              disabled={filters.page === totalPages}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed bg-white rounded-xl border hover:bg-gray-50 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
