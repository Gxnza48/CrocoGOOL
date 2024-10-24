import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, MessageCircle } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductList from './components/ProductList';
import Filter from './components/Filter';
import Cart from './components/Cart';
import ProductModal from './components/ProductModal';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 100000],
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const addToCart = (product) => {
    const cartId = Date.now();
    setCartItems(prevItems => [...prevItems, { ...product, cartId }]);
  };

  const removeFromCart = (cartId) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartId !== cartId));
  };

  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/3456445369', '_blank');
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black text-white">
        <header className="bg-black fixed w-full z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold text-green-700">
                <img src="https://i.ibb.co/bNcp5mh/6f6f2b4c-4e57-41f1-a55b-77006582bc5a.jpg" alt="Crocogol Logo" className="h-20" />
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link to="/" className="hover:text-green-500 transition-colors">
                  Inicio
                </Link>
                <Link
                  to="/products"
                  className="hover:text-green-500 transition-colors"
                >
                  Productos
                </Link>
                <Link
                  to="/about"
                  className="hover:text-green-500 transition-colors"
                >
                  Nosotros
                </Link>
                <Link
                  to="/contact"
                  className="hover:text-green-500 transition-colors"
                >
                  Contacto
                </Link>
              </nav>
              <div className="flex items-center space-x-4">
                <button onClick={toggleCart} className="relative">
                  <ShoppingCart size={24} />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartItems.length}
                    </span>
                  )}
                </button>
                <button className="md:hidden" onClick={toggleMenu}>
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.nav 
                  className="mt-4 flex flex-col space-y-2 md:hidden"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to="/" className="hover:text-green-500 transition-colors">
                    Inicio
                  </Link>
                  <Link
                    to="/products"
                    className="hover:text-green-500 transition-colors"
                  >
                    Productos
                  </Link>
                  <Link
                    to="/about"
                    className="hover:text-green-500 transition-colors"
                  >
                    Nosotros
                  </Link>
                  <Link
                    to="/contact"
                    className="hover:text-green-500 transition-colors"
                  >
                    Contacto
                  </Link>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </header>

        <main className="container mx-auto p-4 pt-28 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={
                <div className="flex flex-col md:flex-row h-[calc(100vh-12rem)]">
                  <aside className="md:w-1/4 mb-4 md:mb-0 md:pr-4">
                    <Filter filters={filters} updateFilters={updateFilters} />
                  </aside>
                  <div className="md:w-3/4 overflow-y-auto">
                    <ProductList
                      filters={filters}
                      addToCart={addToCart}
                      openProductModal={openProductModal}
                    />
                  </div>
                </div>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Cart
          isOpen={isCartOpen}
          toggleCart={toggleCart}
          cartItems={cartItems}
          removeFromCart={removeFromCart}
        />
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            closeModal={closeProductModal}
            addToCart={addToCart}
          />
        )}

        <button
          onClick={handleWhatsAppClick}
          className="fixed bottom-6 right-6 bg-green-600 p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-50"
        >
          <MessageCircle size={24} />
        </button>

        <Footer />
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  );
}

export default App;