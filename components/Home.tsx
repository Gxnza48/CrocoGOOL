import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="glassmorphism p-8 rounded-lg text-center retro-border" variants={itemVariants}>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-crocogol-green-500 to-crocogol-green-300 text-transparent bg-clip-text retro-text">Bienvenido a Crocogol</h1>
        <p className="text-xl mb-8">Revive la magia del fútbol con nuestras camisetas retro</p>
        <Link to="/products" className="gradient-button text-white px-6 py-3 rounded-full inline-flex items-center hover:bg-crocogol-green-600 transition-colors">
          Comprar Ahora
          <ArrowRight className="ml-2" />
        </Link>
      </motion.div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div className="glassmorphism p-6 rounded-lg retro-border" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 retro-text">Champions League</h2>
          <p>Revive los momentos más gloriosos de la competición europea.</p>
        </motion.div>
        <motion.div className="glassmorphism p-6 rounded-lg retro-border" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 retro-text">Fútbol Internacional</h2>
          <p>Viste los colores de las selecciones más emblemáticas del mundo.</p>
        </motion.div>
        <motion.div className="glassmorphism p-6 rounded-lg retro-border" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 retro-text">Fútbol Argentino</h2>
          <p>Lleva contigo la pasión del fútbol argentino en cada camiseta.</p>
        </motion.div>
      </div>

      <motion.div className="mt-12" variants={itemVariants}>
        <h2 className="text-3xl font-bold mb-6 text-center retro-text">Productos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glassmorphism p-4 rounded-lg retro-border">
            <img src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Camiseta Retro Argentina" className="w-full h-48 object-cover mb-4 rounded" />
            <h3 className="text-xl font-semibold mb-2">Camiseta Retro Argentina 1986</h3>
            <p className="text-gray-300 mb-2">Revive la gloria del '86</p>
            <Link to="/products" className="text-crocogol-green-400 hover:text-crocogol-green-300 transition-colors">Ver Detalles</Link>
          </div>
          <div className="glassmorphism p-4 rounded-lg retro-border">
            <img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Camiseta Boca Juniors 1981" className="w-full h-48 object-cover mb-4 rounded" />
            <h3 className="text-xl font-semibold mb-2">Camiseta Boca Juniors 1981</h3>
            <p className="text-gray-300 mb-2">La época dorada xeneize</p>
            <Link to="/products" className="text-crocogol-green-400 hover:text-crocogol-green-300 transition-colors">Ver Detalles</Link>
          </div>
          <div className="glassmorphism p-4 rounded-lg retro-border">
            <img src="https://images.unsplash.com/photo-1614632537239-e7b59c222f88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Camiseta River Plate 1986" className="w-full h-48 object-cover mb-4 rounded" />
            <h3 className="text-xl font-semibold mb-2">Camiseta River Plate 1986</h3>
            <p className="text-gray-300 mb-2">El equipo de los Caballeros</p>
            <Link to="/products" className="text-crocogol-green-400 hover:text-crocogol-green-300 transition-colors">Ver Detalles</Link>
          </div>
        </div>
      </motion.div>

      <motion.div className="mt-12 text-center" variants={itemVariants}>
        <h2 className="text-3xl font-bold mb-6 retro-text">Leyendas del Fútbol</h2>
        <div className="flex justify-center space-x-8">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnLklrq464Sae3ZIPnhrSZkGJJqfroPDnbw&s" alt="Diego Maradona" className="w-24 h-24 rounded-full object-cover retro-border" />
          <img src="https://elcomercio.pe/resizer/xiALGLf_51MB-6wB8nhx9jCQ_iA=/1200x680/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/X5VZTIZ5LVGX7FNHVMHIUE22RI.jpg" alt="Pelé" className="w-24 h-24 rounded-full object-cover retro-border" />
          <img src="https://library.sportingnews.com/styles/twitter_card_120x120/s3/2021-11/martin-palermo-boca-real-madrid-intercontinental-cup-28112000_1i4xq8yieega519lrt0t4f3w1y.jpg?itok=1OlpwvYi" alt="Martín Palermo" className="w-24 h-24 rounded-full object-cover retro-border" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;