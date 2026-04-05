// context/StoreContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../services/api';
import { User, Product, Cart, CartItem, LoginCredentials, RegisterData } from '../types';

// ── Guest Types ──────────────────────────────────────────────
interface GuestCartItem {
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
  // Snapshot of product info for display (fetched and stored locally)
  name?: string;
  price?: number;
  image?: string;
  category?: string;
  weave?: string;
  fabric?: string;
  stock?: number;
}

// ── Context Type ────────────────────────────────────────────
interface StoreContextType {
  // State
  user: User | null;
  cart: Cart | null;
  wishlist: string[];
  products: Product[];
  loading: boolean;
  error: string | null;

  // Guest State
  guestCart: GuestCartItem[];
  guestWishlist: string[];
  isGuest: boolean;

  // Auth
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: any }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  mergeGuestData: () => Promise<void>;
  isAdmin: boolean;
  isAuthenticated: boolean;

  // Cart
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number, color?: string, size?: string) => Promise<void>;
  updateCartQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  removeGuestCartItem: (productId: string) => void;
  updateGuestCartQuantity: (productId: string, quantity: number) => void;
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

const GUEST_CART_KEY = 'tanvo_guest_cart';
const GUEST_WISHLIST_KEY = 'tanvo_guest_wishlist';

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
  const [loading, setLoading] = useState(!!localStorage.getItem('token'));
  const [error, setError] = useState<string | null>(null);

  // Guest state — persisted in localStorage
  const [guestCart, setGuestCart] = useState<GuestCartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(GUEST_CART_KEY) || '[]');
    } catch { return []; }
  });
  const [guestWishlist, setGuestWishlist] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(GUEST_WISHLIST_KEY) || '[]');
    } catch { return []; }
  });

  const isGuest = !user;

  // Persist guest data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(guestCart));
  }, [guestCart]);

  useEffect(() => {
    localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(guestWishlist));
  }, [guestWishlist]);

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
    // Keep guest data intact on logout so previous session isn't lost
  };

  // ==================== MERGE GUEST DATA ====================
  const mergeGuestData = async () => {
    // Merge guest cart items
    const savedGuestCart: GuestCartItem[] = JSON.parse(localStorage.getItem(GUEST_CART_KEY) || '[]');
    const savedGuestWishlist: string[] = JSON.parse(localStorage.getItem(GUEST_WISHLIST_KEY) || '[]');

    // Add each guest cart item to the server cart
    for (const item of savedGuestCart) {
      try {
        await API.post('/cart/add', {
          productId: item.productId,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        });
      } catch (err) {
        console.error('Failed to merge cart item:', item.productId, err);
      }
    }

    // Merge guest wishlist
    for (const productId of savedGuestWishlist) {
      try {
        // Only add if not already in the user's wishlist
        if (!wishlist.includes(productId)) {
          await API.post('/users/wishlist/toggle', { productId });
        }
      } catch (err) {
        console.error('Failed to merge wishlist item:', productId, err);
      }
    }

    // Clear guest data after merging
    localStorage.removeItem(GUEST_CART_KEY);
    localStorage.removeItem(GUEST_WISHLIST_KEY);
    setGuestCart([]);
    setGuestWishlist([]);

    // Refresh from server
    await fetchCart();
    await fetchWishlist();
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
    if (!isAuthenticated) {
      // GUEST MODE: Add to localStorage cart
      setGuestCart(prev => {
        const existing = prev.find(i => i.productId === productId && i.color === color && i.size === size);
        if (existing) {
          return prev.map(i =>
            i.productId === productId && i.color === color && i.size === size
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        // Fetch product info asynchronously and update the item with a snapshot
        API.get(`/products/${productId}`).then(({ data }) => {
          setGuestCart(g =>
            g.map(i =>
              i.productId === productId && i.color === color && i.size === size
                ? {
                  ...i,
                  name: data.name,
                  price: data.price,
                  image: data.images?.[0]?.url,
                  category: data.category,
                  weave: data.weave,
                  fabric: data.fabric,
                  stock: data.stock,
                }
                : i
            )
          );
        }).catch(() => { });
        return [...prev, { productId, quantity, color, size }];
      });
      return;
    }

    // LOGGED IN: Call API
    try {
      setLoading(true);
      const { data } = await API.post('/cart/add', { productId, quantity, color, size });
      setCart(data.cart);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  const removeGuestCartItem = (productId: string) => {
    setGuestCart(prev => prev.filter(i => i.productId !== productId));
  };

  const updateGuestCartQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setGuestCart(prev =>
      prev.map(i => i.productId === productId ? { ...i, quantity } : i)
    );
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

  const cartCount = isAuthenticated
    ? (cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0)
    : guestCart.reduce((acc, item) => acc + item.quantity, 0);

  // ==================== WISHLIST ====================
  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const { data } = await API.get('/users/wishlist');

      if (Array.isArray(data)) {
        setWishlist(data.map((item: any) => item._id || item.id));
      } else if (data.wishlist && Array.isArray(data.wishlist)) {
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
    if (!isAuthenticated) {
      // GUEST MODE: Toggle in localStorage
      setGuestWishlist(prev =>
        prev.includes(productId)
          ? prev.filter(id => id !== productId)
          : [...prev, productId]
      );
      return;
    }

    // LOGGED IN: Call API
    try {
      setLoading(true);
      const { data } = await API.post('/users/wishlist/toggle', { productId });

      if (Array.isArray(data)) {
        setWishlist(data.map((item: any) => item._id || item.id));
      } else if (data.wishlist && Array.isArray(data.wishlist)) {
        setWishlist(data.wishlist.map((item: any) => item._id || item.id));
      } else if (data.isInWishlist !== undefined) {
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

  const isInWishlist = (productId: string) => {
    if (isAuthenticated) return wishlist.includes(productId);
    return guestWishlist.includes(productId);
  };

  const wishlistCount = isAuthenticated
    ? wishlist.length
    : guestWishlist.length;

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
    user, cart, wishlist, products, loading, error,
    guestCart, guestWishlist, isGuest,

    // Auth
    login, register, logout, mergeGuestData, isAdmin, isAuthenticated,

    // Cart
    fetchCart, addToCart, updateCartQuantity, removeFromCart, clearCart,
    removeGuestCartItem, updateGuestCartQuantity, cartCount,

    // Wishlist
    fetchWishlist, toggleWishlist, isInWishlist, wishlistCount,

    // Products
    fetchProducts, fetchProductById,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};