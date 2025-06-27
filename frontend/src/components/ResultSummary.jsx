// Results Summary Component
export default function ResultSummary({ productsCount, totalProducts, currentPage, totalPages }) {
    return (
    <div className="flex justify-between items-center mb-6">
      <div className="text-gray-600">
        <span className="font-semibold text-gray-900">{productsCount}</span> of{" "}
        <span className="font-semibold text-gray-900">{totalProducts}</span> products
        {currentPage > 1 && (
          <span className="ml-2 text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            Page {currentPage} of {totalPages}
          </span>
        )}
      </div>
    </div>
  )
}