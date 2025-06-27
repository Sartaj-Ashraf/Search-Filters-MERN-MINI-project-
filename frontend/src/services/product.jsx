import axios from "axios"

export class ProductService {
    constructor(baseUrl) {
      this.baseUrl = baseUrl
    }
  
    async fetchProducts(filters, priceFilter, ratingFilter) {
      const queryParams = new URLSearchParams()
  
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value)
        }
      })
  
      const numericFilters = this._buildNumericFilters(priceFilter, ratingFilter)
      if (numericFilters.length > 0) {
        queryParams.append("numericFilters", numericFilters.join(","))
      }
  
      const response = await axios.get(`${this.baseUrl}?${queryParams}`)
      return response.data
    }
  
    async createProduct(productData) {
      const payload = {
        ...productData,
        price: Number(productData.price),
        rating: Number(productData.rating),
      }
      return await axios.post(this.baseUrl, payload)
    }
  
    _buildNumericFilters(priceFilter, ratingFilter) {
      const numericFilters = []
      if (priceFilter.operator && priceFilter.value) {
        numericFilters.push(`price${priceFilter.operator}${priceFilter.value}`)
      }
      if (ratingFilter.operator && ratingFilter.value) {
        numericFilters.push(`rating${ratingFilter.operator}${ratingFilter.value}`)
      }
      return numericFilters
    }
  }
  