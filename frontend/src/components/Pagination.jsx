import { ChevronLeft, ChevronRight } from "lucide-react"
// Pagination Component
export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null
  
    const getVisiblePages = () => {
      const pages = []
      const start = Math.max(1, Math.min(totalPages - 4, currentPage - 2))
      const end = Math.min(totalPages, start + 4)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    }
  
    return (
      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed bg-white rounded-xl border hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>
  
        <div className="flex space-x-1">
          {getVisiblePages().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
                currentPage === pageNum
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100 bg-white border"
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
  
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed bg-white rounded-xl border hover:bg-gray-50 transition-colors"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    )
  }
  