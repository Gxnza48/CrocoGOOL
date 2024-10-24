import React from 'react';
import { toast } from 'react-toastify';
import { products } from '../data/products';

const ProductList = ({ filters, addToCart, openProductModal }) => {
  const filteredProducts = products.filter((product) => {
    return (
      (filters.category === 'all' || product.category === filters.category) &&
      (product.priceWithoutPatch >= filters.priceRange[0] && product.priceWithoutPatch <= filters.priceRange[1])
    );
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 pb-6">
      {filteredProducts.map((product) => (
        <div key={product.id} className="glassmorphism p-3 rounded-lg">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full aspect-square object-cover mb-2 rounded-lg cursor-pointer" 
            onClick={() => openProductModal(product)}
          />
          <h2 className="text-base md:text-lg font-semibold mb-1">{product.name}</h2>
          <p className="text-gray-300 text-sm mb-1">{product.brand}</p>
          <p className="text-sm md:text-base font-bold mb-1">Sin parche: ${product.priceWithoutPatch.toLocaleString()}</p>
          <p className="text-sm md:text-base font-bold mb-2">Con parche: ${product.priceWithPatch.toLocaleString()}</p>
          <button
            onClick={() => openProductModal(product)}
            className="w-full bg-green-700 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition-colors text-sm"
          >
            Agregar al Carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;