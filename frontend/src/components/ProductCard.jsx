import {
  Star,
  Building2,
  Calendar,
  DollarSign,
  Sparkles,
} from "lucide-react"
import { FilterUtils } from "../utils/supportUtil";

// Product Card Component
export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden group">
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
              <span className="text-2xl font-bold text-green-600">
                ${product.price}
              </span>
            </div>
            <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold text-yellow-700">
                {product.rating}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-gray-600">
            <Building2 className="h-4 w-4" />
            <span className="text-sm font-medium capitalize">
              {product.company}
            </span>
          </div>

          {product.createdAt && (
            <div className="flex items-center space-x-2 text-gray-500">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                {FilterUtils.formatDate(product.createdAt)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
