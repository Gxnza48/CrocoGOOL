import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre Crocogol</h3>
            <p className="text-sm">Crocogol es tu tienda en línea para camisetas de fútbol retro argentino. Ofrecemos productos de alta calidad para revivir los momentos más gloriosos del fútbol.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-green-500 transition-colors">Inicio</Link></li>
              <li><Link to="/products" className="text-sm hover:text-green-500 transition-colors">Productos</Link></li>
              <li><Link to="/about" className="text-sm hover:text-green-500 transition-colors">Nosotros</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-green-500 transition-colors">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Conéctate con Nosotros</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/crocogol" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors"><Instagram size={24} /></a>
              <a href="#" className="hover:text-green-500 transition-colors"><Facebook size={24} /></a>
              <a href="#" className="hover:text-green-500 transition-colors"><Twitter size={24} /></a>
              <a href="#" className="hover:text-green-500 transition-colors"><Youtube size={24} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2024 Crocogol. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer