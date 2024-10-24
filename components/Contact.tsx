import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData)
    toast.success('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <motion.div 
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glassmorphism p-8 rounded-lg max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Contáctanos</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">Asunto</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">Mensaje</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 transition duration-300"
            ></textarea>
          </div>
          <motion.button 
            type="submit" 
            className="w-full bg-gradient-to-r from-green-700 to-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-400 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enviar Mensaje
          </motion.button>
        </form>
      </div>
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Información de Contacto</h2>
        <p className="mb-2">Email: crocogol@gmail.com</p>
        <p className="mb-2">Teléfono: 3456445369</p>
        <p>Síguenos en Instagram: @crocogol</p>
      </div>
    </motion.div>
  )
}

export default Contact