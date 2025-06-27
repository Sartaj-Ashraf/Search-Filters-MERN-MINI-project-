// Numeric Filter Component
export default function NumericFilter({
  label,
  filter,
  onChange,
  operators,
  ...inputProps
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="flex space-x-2">
        <select
          value={filter.operator}
          onChange={(e) => onChange({ ...filter, operator: e.target.value })}
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
          value={filter.value}
          onChange={(e) => onChange({ ...filter, value: e.target.value })}
          placeholder="Value"
          className="flex-1 px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
          {...inputProps}
        />
      </div>
    </div>
  );
}
