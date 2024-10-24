import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    brand: '',
    priceWithoutPatch: 0,
    priceWithPatch: 0,
    image: '',
    description: '',
    features: [''],
    additionalImages: ['', '']
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products: ", error);
      toast.error("Failed to load products. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...newProduct.features];
    updatedFeatures[index] = value;
    setNewProduct(prev => ({ ...prev, features: updatedFeatures }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...newProduct.additionalImages];
    updatedImages[index] = value;
    setNewProduct(prev => ({ ...prev, additionalImages: updatedImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id), newProduct);
        toast.success('Product updated successfully');
        setEditingProduct(null);
      } else {
        await addDoc(collection(db, 'products'), newProduct);
        toast.success('Product added successfully');
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Error adding/updating product: ", error);
      toast.error('Failed to save product. Please try again.');
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      category: '',
      brand: '',
      priceWithoutPatch: 0,
      priceWithPatch: 0,
      image: '',
      description: '',
      features: [''],
      additionalImages: ['', '']
    });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product: ", error);
        toast.error('Failed to delete product. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      <form onSubmit={handleSubmit} className="glassmorphism p-6 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Nombre del Producto</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Categoría</label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
              required
            >
              <option value="">Seleccionar categoría</option>
              <option value="champions">Champions League</option>
              <option value="international">Fútbol Internacional</option>
              <option value="argentine">Fútbol Argentino</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Marca</label>
            <input
              type="text"
              name="brand"
              value={newProduct.brand}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Precio sin Parche</label>
            <input
              type="number"
              name="priceWithoutPatch"
              value={newProduct.priceWithoutPatch}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Precio con Parche</label>
            <input
              type="number"
              name="priceWithPatch"
              value={newProduct.priceWithPatch}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Imagen Principal</label>
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block mb-2">Descripción</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mt-4">
          <label className="block mb-2">Características (una por línea)</label>
          {newProduct.features.map((feature, index) => (
            <input
              key={index}
              type="text"
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white mb-2"
            />
          ))}
          <button
            type="button"
            onClick={() => setNewProduct(prev => ({ ...prev, features: [...prev.features, ''] }))}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Añadir Característica
          </button>
        </div>
        <div className="mt-4">
          <label className="block mb-2">Imágenes Adicionales</label>
          {newProduct.additionalImages.map((image, index) => (
            <input
              key={index}
              type="text"
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white mb-2"
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-6 bg-green-700 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
        >
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
        {editingProduct && (
          <button
            type="button"
            onClick={() => {
              setEditingProduct(null);
              resetForm();
            }}
            className="mt-6 ml-4 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Cancel Edit
          </button>
        )}
      </form>

      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="glassmorphism p-4">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-300 mb-2">{product.brand}</p>
            <p className="text-lg font-bold mb-2">Sin parche: ${product.priceWithoutPatch.toLocaleString()}</p>
            <p className="text-lg font-bold mb-4">Con parche: ${product.priceWithPatch.toLocaleString()}</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleEdit(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;