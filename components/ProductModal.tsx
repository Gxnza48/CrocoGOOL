import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductModal = ({ product, closeModal, addToCart }) => {
  const [selectedOption, setSelectedOption] = useState('withoutPatch');
  const [selectedSize, setSelectedSize] = useState('M');

  const handleAddToCart = () => {
    const selectedProduct = {
      ...product,
      price: selectedOption === 'withPatch' ? product.priceWithPatch : product.priceWithoutPatch,
      option: selectedOption,
      size: selectedSize
    };
    addToCart(selectedProduct);
    closeModal();
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="glassmorphism w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button 
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <X size={24} />
          </button>

          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <div className="grid grid-cols-3 gap-2">
                  {product.additionalImages?.map((img, index) => (
                    <img 
                      key={index} 
                      src={img} 
                      alt={`${product.name} ${index + 1}`} 
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-300">{product.brand}</p>
                <div>
                  <label className="block mb-2">Opción:</label>
                  <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  >
                    <option value="withoutPatch">Sin parche</option>
                    <option value="withPatch">Con parche</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2">Talla:</label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XL">XXL</option>
                  </select>
                </div>

                <p className="text-2xl font-bold">
                  ${(selectedOption === 'withPatch' ? product.priceWithPatch : product.priceWithoutPatch).toLocaleString()} ARS
                </p>

                <p className="text-gray-300">{product.description}</p>

                <ul className="list-disc list-inside space-y-2">
                  {product.features?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>

                <motion.button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-green-700 to-green-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-400 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Agregar al Carrito
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;