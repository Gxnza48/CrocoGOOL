import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const provinces = [
  'Buenos Aires',
  'Ciudad Autónoma de Buenos Aires',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán'
];

const Cart = ({ isOpen, toggleCart, cartItems, removeFromCart }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    lastName: '',
    province: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (!customerInfo.name || !customerInfo.lastName || !customerInfo.province) {
      toast.error('Por favor, complete todos los campos antes de continuar.');
      return;
    }

    const message = encodeURIComponent(`¡Hola! Me gustaría hacer un pedido con la siguiente información:

Nombre: ${customerInfo.name}
Apellido: ${customerInfo.lastName}
Provincia: ${customerInfo.province}

Artículos:
${cartItems.map(item => `${item.name} (Talla: ${item.size}, ${item.option === 'withPatch' ? 'Con parche' : 'Sin parche'}) - $${item.price.toLocaleString()} ARS`).join('\n')}

Total: $${total.toLocaleString()} ARS`);

    window.open(`https://wa.me/3456445369?text=${message}`, '_blank');
    toast.success('¡Redirigiendo a WhatsApp para finalizar tu compra!');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-y-0 right-0 w-full md:w-80 glassmorphism z-50"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Carrito</h2>
                <button 
                  onClick={toggleCart}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="flex-grow overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <p>Tu carrito está vacío</p>
              ) : (
                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.li
                      key={item.cartId}
                      className="flex justify-between items-center bg-gray-800 p-3 rounded-lg"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex-grow">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-400">
                          Talla: {item.size}, {item.option === 'withPatch' ? 'Con parche' : 'Sin parche'}
                        </p>
                        <p className="text-green-500">${item.price?.toLocaleString()} ARS</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="ml-2 p-1 hover:bg-red-600 rounded-full transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-4 border-t border-gray-700">
                <div className="mb-4">
                  <p className="text-lg font-semibold flex justify-between">
                    <span>Total:</span>
                    <span>${total.toLocaleString()} ARS</span>
                  </p>
                </div>
                
                <div className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Apellido"
                    value={customerInfo.lastName}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                  />
                  <select
                    name="province"
                    value={customerInfo.province}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                  >
                    <option value="">Seleccione una provincia</option>
                    {provinces.map(province => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-green-700 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Comprar por WhatsApp
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;