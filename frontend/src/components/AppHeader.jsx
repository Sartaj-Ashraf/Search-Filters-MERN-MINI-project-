// Header Component
import { Plus, Package, SlidersHorizontal } from "lucide-react";

export default function AppHeader({
  showFilters,
  onToggleFilters,
  onToggleCreateForm,
  hasActiveFilters,
}) {
  return (
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
              onClick={onToggleFilters}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                showFilters
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-100"
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
              onClick={onToggleCreateForm}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
