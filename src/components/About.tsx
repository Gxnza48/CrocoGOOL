import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <motion.div 
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glassmorphism p-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-6">Sobre Crocogol</h1>
        <p className="text-lg mb-4">
          Crocogol es tu destino premium para camisetas de fútbol retro argentino. Nos apasiona proporcionar a nuestros clientes las mejores réplicas de camisetas históricas que han marcado el fútbol de nuestro país.
        </p>
        <p className="text-lg mb-4">
          Fundada en 2024, nuestra misión es ofrecer una selección cuidadosamente curada de camisetas retro de alta calidad a precios competitivos. Trabajamos directamente con fabricantes de confianza para asegurar que nuestros clientes tengan acceso a las mejores réplicas del mercado.
        </p>
        <p className="text-lg mb-6">
          En Crocogol, creemos que cada camiseta cuenta una historia y es parte de nuestra rica herencia futbolística. Es por eso que nos comprometemos a ayudarte a encontrar esa camiseta especial que te conecte con los momentos más gloriosos del fútbol argentino.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Nuestros Valores</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Calidad: Solo ofrecemos productos que cumplen con nuestros altos estándares.</li>
          <li>Autenticidad: Nos esforzamos por capturar la esencia de cada camiseta histórica.</li>
          <li>Pasión: Compartimos tu amor por el fútbol y su historia.</li>
          <li>Servicio al Cliente: Tu satisfacción es nuestra prioridad número uno.</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4">Nuestro Equipo</h2>
        <p className="text-lg mb-4">
          Nuestro equipo está formado por apasionados del fútbol y expertos en moda deportiva retro. Con años de experiencia en la industria, estamos aquí para brindarte recomendaciones personalizadas y un servicio al cliente de primera clase.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Visítanos</h2>
        <p className="text-lg">
          Te invitamos a explorar nuestra tienda en línea y sumergirte en la nostalgia del fútbol argentino. Ya seas un coleccionista ávido o un fanático que busca conectar con la historia de su club, en Crocogol tenemos algo especial para ti.
        </p>
      </div>
    </motion.div>
  )
}

export default About