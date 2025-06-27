// ============ CONSTANTS & CONFIGURATION (Single Responsibility) ============
export const APP_CONFIG = {
    API_BASE_URL: "http://localhost:5000/api/v1",
    DEFAULT_PAGINATION: {
      page: 1,
      limit: 12,
    },
    COMPANIES: ["ikea", "liddy", "caressa", "marcos"],
    OPERATORS: [
      { value: "=", label: "Equal to" },
      { value: ">", label: "Greater than" },
      { value: ">=", label: "Greater or equal" },
      { value: "<", label: "Less than" },
      { value: "<=", label: "Less or equal" },
    ],
    SORT_OPTIONS: [
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
  }
  