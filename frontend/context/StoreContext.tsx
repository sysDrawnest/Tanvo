// context/StoreContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../services/api';
import { User, Product, Cart, CartItem, LoginCredentials, RegisterData } from '../types';

interface StoreContextType {
  // State
  user: User | null;
  cart: Cart | null;
  wishlist: string[];
  products: Product[];
  loading: boolean;
  error: string | null;

  // Auth
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: any }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAdmin: boolean;
  isAuthenticated: boolean;

  // Cart
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number, color?: string, size?: string) => Promise<void>;
  updateCartQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  cartCount: number;

  // Wishlist
  fetchWishlist: () => Promise<void>;
  toggleWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;

  // Products
  fetchProducts: (filters?: any) => Promise<void>;
  fetchProductById: (id: string) => Promise<Product | null>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile();
    }
    fetchCart();
    fetchWishlist();
  }, []);

  // ==================== AUTH ====================
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/auth/profile');
      setUser(data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await API.post('/auth/login', { email, password });

      localStorage.setItem('token', data.token);
      setUser(data);
      await fetchCart();
      await fetchWishlist();

      return { success: true, user: data };
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Login failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await API.post('/auth/register', userData);

      localStorage.setItem('token', data.token);
      setUser(data);

      return { success: true };
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Registration failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCart(null);
    setWishlist([]);
  };

  const isAdmin = user?.role === 'admin';
  const isAuthenticated = !!user;

  // ==================== CART ====================
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const { data } = await API.get('/cart');
      setCart(data.cart);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  const addToCart = async (productId: string, quantity = 1, color?: string, size?: string) => {
    try {
      setLoading(true);
      const { data } = await API.post('/cart/add', {
        productId,
        quantity,
        color,
        size
      });
      setCart(data.cart);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  const updateCartQuantity = async (itemId: string, quantity: number) => {
    try {
      setLoading(true);
      const { data } = await API.put(`/cart/update/${itemId}`, { quantity });
      setCart(data.cart);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to update cart');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      setLoading(true);
      const { data } = await API.delete(`/cart/remove/${itemId}`);
      setCart(data.cart);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to remove from cart');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await API.delete('/cart/clear');
      setCart(null);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };

  const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  // ==================== WISHLIST ====================
  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const { data } = await API.get('/users/wishlist');

      // Handle different response structures
      if (Array.isArray(data)) {
        // If data is an array of products
        setWishlist(data.map((item: any) => item._id || item.id));
      } else if (data.wishlist && Array.isArray(data.wishlist)) {
        // If data has wishlist property
        setWishlist(data.wishlist.map((item: any) => item._id || item.id));
      } else {
        setWishlist([]);
      }
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
      setWishlist([]);
    }
  };

  const toggleWishlist = async (productId: string) => {
    try {
      setLoading(true);
      const { data } = await API.post('/users/wishlist/toggle', { productId });

      // Handle different response structures
      if (Array.isArray(data)) {
        // If response is array of products
        setWishlist(data.map((item: any) => item._id || item.id));
      } else if (data.wishlist && Array.isArray(data.wishlist)) {
        // If response has wishlist property
        setWishlist(data.wishlist.map((item: any) => item._id || item.id));
      } else if (data.isInWishlist !== undefined) {
        // If response just tells us the new state
        setWishlist(prev =>
          data.isInWishlist
            ? [...prev, productId]
            : prev.filter(id => id !== productId)
        );
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to update wishlist');
    } finally {
      setLoading(false);
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);
  const wishlistCount = wishlist.length;

  // ==================== PRODUCTS ====================
  const fetchProducts = async (filters = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams(filters).toString();
      const { data } = await API.get(`/products?${params}`);
      setProducts(data.products || []);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to fetch products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (id: string): Promise<Product | null> => {
    try {
      setLoading(true);
      const { data } = await API.get(`/products/${id}`);
      return data;
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to fetch product');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    // State
    user,
    cart,
    wishlist,
    products,
    loading,
    error,

    // Auth
    login,
    register,
    logout,
    isAdmin,
    isAuthenticated,

    // Cart
    fetchCart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartCount,

    // Wishlist
    fetchWishlist,
    toggleWishlist,
    isInWishlist,
    wishlistCount,

    // Products
    fetchProducts,
    fetchProductById,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};