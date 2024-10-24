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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
      {filteredProducts.map((product) => (
        <div key={product.id} className="glassmorphism p-4 rounded-lg">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full aspect-square object-cover mb-4 rounded-lg cursor-pointer" 
            onClick={() => openProductModal(product)}
          />
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
          <p className="text-gray-300 mb-2">{product.brand}</p>
          <p className="text-lg font-bold mb-2">Sin parche: ${product.priceWithoutPatch.toLocaleString()}</p>
          <p className="text-lg font-bold mb-4">Con parche: ${product.priceWithPatch.toLocaleString()}</p>
          <button
            onClick={() => openProductModal(product)}
            className="w-full bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Agregar al Carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;