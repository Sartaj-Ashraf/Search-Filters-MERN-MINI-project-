import {
  PiIcon,
  Search,
} from "lucide-react"

export const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
  ...props
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      placeholder={placeholder}
      required={required}
      {...props}
    />
  </div>
);

export const SelectInput = ({
  label,
  value,
  onChange,
  options,
  placeholder = "",
  required = false,
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-700">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      required={required}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export const CheckboxInput = ({ id, label, checked, onChange, icon: Icon }) => (
  <div className="flex items-center space-x-3 pt-8">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
    <label
      htmlFor={id}
      className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
    >
      {Icon && <PiIcon className="h-4 w-4 text-yellow-500" />}
      <span>{label}</span>
    </label>
  </div>
);

export const SearchInput = ({ value, onChange, placeholder }) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-700">
      Search Products
    </label>
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
    </div>
  </div>
);
