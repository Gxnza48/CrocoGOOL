import React, { useState, useEffect } from 'react';
import { User, ShoppingBag, Heart, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProfileDashboard = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [newProfilePicture, setNewProfilePicture] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [activeSection, setActiveSection] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
      setNewEmail(currentUser.email);
    } else {
      navigate('/auth');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    onLogout();
    navigate('/');
    toast.info('Logged out successfully');
  };

  const handleProfilePictureChange = () => {
    if (newProfilePicture) {
      updateUser({ profilePicture: newProfilePicture });
      setNewProfilePicture('');
      toast.success('Profile picture updated successfully');
    }
  };

  const handleEmailChange = () => {
    if (newEmail && newEmail !== user.email) {
      updateUser({ email: newEmail });
      toast.success('Email updated successfully');
    }
  };

  const handlePasswordChange = () => {
    if (newPassword) {
      updateUser({ password: newPassword });
      setNewPassword('');
      toast.success('Password updated successfully');
    }
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setUser(updatedUser);
  };

  const getOrderHistory = () => {
    return JSON.parse(localStorage.getItem(`orderHistory_${user.id}`) || '[]');
  };

  const getWishlist = () => {
    return JSON.parse(localStorage.getItem(`wishlist_${user.id}`) || '[]');
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="glassmorphism p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Profile Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={64} />
                )}
              </div>
              <h2 className="text-xl font-semibold">{user.email}</h2>
              <p className="text-sm text-gray-500 mt-2">Member since {new Date(user.id).toLocaleDateString()}</p>
              <div className="mt-4 w-full">
                <button
                  onClick={() => setActiveSection('profile')}
                  className={`w-full mb-2 px-4 py-2 rounded ${activeSection === 'profile' ? 'bg-blue-400 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveSection('orders')}
                  className={`w-full mb-2 px-4 py-2 rounded ${activeSection === 'orders' ? 'bg-blue-400 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  Order History
                </button>
                <button
                  onClick={() => setActiveSection('wishlist')}
                  className={`w-full mb-2 px-4 py-2 rounded ${activeSection === 'wishlist' ? 'bg-blue-400 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  Wishlist
                </button>
                <button
                  onClick={() => setActiveSection('settings')}
                  className={`w-full mb-2 px-4 py-2 rounded ${activeSection === 'settings' ? 'bg-blue-400 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  Account Settings
                </button>
                <button onClick={handleLogout} className="w-full bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition-colors">
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            {activeSection === 'profile' && (
              <div className="glassmorphism p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Profile Picture URL</label>
                  <input
                    type="text"
                    value={newProfilePicture}
                    onChange={(e) => setNewProfilePicture(e.target.value)}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white mb-2"
                  />
                  <button
                    onClick={handleProfilePictureChange}
                    className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors"
                  >
                    Update Profile Picture
                  </button>
                </div>
              </div>
            )}
            {activeSection === 'orders' && (
              <div className="glassmorphism p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <ShoppingBag className="mr-2" /> Order History
                </h3>
                {getOrderHistory().length > 0 ? (
                  <ul>
                    {getOrderHistory().map((order, index) => (
                      <li key={index} className="mb-4 p-4 bg-gray-800 rounded">
                        <p>Order ID: {order.id}</p>
                        <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                        <p>Total: ${order.total.toFixed(2)}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No order history available.</p>
                )}
              </div>
            )}
            {activeSection === 'wishlist' && (
              <div className="glassmorphism p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Heart className="mr-2" /> Wishlist
                </h3>
                {getWishlist().length > 0 ? (
                  <ul>
                    {getWishlist().map((item, index) => (
                      <li key={index} className="mb-4 p-4 bg-gray-800 rounded flex items-center">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p>${item.price.toFixed(2)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Your wishlist is empty.</p>
                )}
              </div>
            )}
            {activeSection === 'settings' && (
              <div className="glassmorphism p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Settings className="mr-2" /> Account Settings
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white mb-2"
                  />
                  <button
                    onClick={handleEmailChange}
                    className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors"
                  >
                    Update Email
                  </button>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white mb-2"
                  />
                  <button
                    onClick={handlePasswordChange}
                    className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;