import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password') {
      checkPasswordStrength(e.target.value);
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 6) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        toast.success('Logged in successfully!');
      } else {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        toast.success('Registered successfully!');
      }
      navigate('/profile');
    } catch (error) {
      toast.error(error.message);
    }

    setFormData({ email: '', password: '', confirmPassword: '' });
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glassmorphism p-8 rounded-lg max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-6">{isLogin ? 'Login' : 'Register'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {!isLogin && (
              <div className="password-strength-meter mt-2">
                <div
                  className={`${
                    passwordStrength === 0
                      ? ''
                      : passwordStrength === 1
                      ? 'strength-weak'
                      : passwordStrength === 2
                      ? 'strength-fair'
                      : passwordStrength === 3
                      ? 'strength-good'
                      : 'strength-strong'
                  }`}
                  style={{ width: `${passwordStrength * 25}%` }}
                ></div>
              </div>
            )}
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
              />
            </div>
          )}
          <motion.button
            type="submit"
            className="gradient-button w-full text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLogin ? 'Login' : 'Register'}
          </motion.button>
        </form>
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default Auth;