import React from 'react'

const Filter = ({ filters, updateFilters }) => {
  return (
    <div className="glassmorphism p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Filtros</h2>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Categoría</label>
        <select
          value={filters.category}
          onChange={(e) => updateFilters({ category: e.target.value })}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
        >
          <option value="all">Todas</option>
          <option value="champions">Champions League</option>
          <option value="international">Fútbol Internacional</option>
          <option value="argentine">Fútbol Argentino</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Rango de Precio</label>
        <div className="flex items-center">
          <input
            type="number"
            value={filters.priceRange[0]}
            onChange={(e) => updateFilters({ priceRange: [Number(e.target.value), filters.priceRange[1]] })}
            className="w-1/2 p-2 bg-gray-800 border border-gray-700 rounded-l text-white"
          />
          <span className="px-2">-</span>
          <input
            type="number"
            value={filters.priceRange[1]}
            onChange={(e) => updateFilters({ priceRange: [filters.priceRange[0], Number(e.target.value)] })}
            className="w-1/2 p-2 bg-gray-800 border border-gray-700 rounded-r text-white"
          />
        </div>
      </div>
    </div>
  )
}

export default Filter