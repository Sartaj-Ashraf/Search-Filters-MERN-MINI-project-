
// Product Create Form Component
export default function ProductCreateForm({ show, product, onChange, onSubmit, onCancel }) {
    if (!show) return null
  
    const companyOptions = APP_CONFIG.COMPANIES.map(company => ({
      value: company,
      label: FilterUtils.capitalizeFirstLetter(company)
    }))
  
    return (
      <div className="bg-white rounded-2xl shadow-lg border p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create New Product</h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TextInput
            label="Product Name"
            value={product.name}
            onChange={(e) => onChange({ ...product, name: e.target.value })}
            placeholder="Enter product name"
            required
          />
          <TextInput
            label="Price ($)"
            type="number"
            step="0.01"
            value={product.price}
            onChange={(e) => onChange({ ...product, price: e.target.value })}
            placeholder="0.00"
            required
          />
          <TextInput
            label="Rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={product.rating}
            onChange={(e) => onChange({ ...product, rating: e.target.value })}
            placeholder="4.5"
            required
          />
          <SelectInput
            label="Company"
            value={product.company}
            onChange={(e) => onChange({ ...product, company: e.target.value })}
            options={companyOptions}
            placeholder="Select Company"
            required
          />
          <CheckboxInput
            id="featured"
            label="Featured Product"
            checked={product.featured}
            onChange={(e) => onChange({ ...product, featured: e.target.checked })}
            icon={Sparkles}
          />
          <div className="flex space-x-3 pt-6">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                onSubmit(e)
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-sm"
            >
              Create Product
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }
  