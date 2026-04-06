import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Context
import { StoreProvider } from './context/StoreContext';
import { LanguageProvider } from './context/LanguageContext';

// Styles
import GlobalStyles from './components/GlobalStyles';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RegisterModal from './components/RegisterModal';
import ProtectedRoute from './components/ProtectedRoute';
import WelcomeScreen from './components/WelcomeScreen';
import LanguageToggle from './components/LanguageToggle';

// Odia Pages
import OdiaHome from './pages/odia/OdiaHome';
import OdiaShop from './pages/odia/OdiaShop';
import OdiaProductDetail from './pages/odia/OdiaProductDetail';


// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import UserProfile from './pages/UserProfile';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Orders from './pages/Orders';
import Returns from './pages/Returns';
import Shipping from './pages/Shipping';
import FAQ from './pages/FAQ';
import Journal from './pages/Journal';

// Admin Pages (nested routes)
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import AdminOrders from './pages/admin/AdminOrders';
import AdminOrderDetails from './pages/admin/AdminOrderDetails';
import AdminUsers from './pages/admin/AdminUsers';
import AdminReviews from './pages/admin/AdminReviews';
import AdminSettings from './pages/admin/AdminSettings';

const AppContent: React.FC = () => {
  const { pathname } = useLocation();
  const isOdiaRoute = pathname.startsWith('/odia');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <LanguageToggle />
      <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--bg-main)' }}>
        {!isOdiaRoute && <Navbar />}
        <RegisterModal />
        <main className={`flex-grow ${isOdiaRoute ? 'pt-0' : 'pt-[146px] md:pt-[166px]'}`}>
          <Routes>
            {/* Odia / Simple Mode Routes */}
            <Route path="/odia" element={<OdiaHome />} />
            <Route path="/odia/shop" element={<OdiaShop />} />
            <Route path="/odia/product/:id" element={<OdiaProductDetail />} />

            {/* English Premium Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/story" element={<About />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/journal" element={<Journal />} />

            {/* Protected User Routes */}
            <Route path="/wishlist" element={<Wishlist />} />

            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />

            <Route path="/orders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />

            <Route path="/orders/:id" element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            } />

            <Route path="/order-confirmation/:id" element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            } />

            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />

            <Route path="/checkout/success" element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            } />

            {/* Admin Routes - Nested */}
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin>
                <Admin />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="products/edit/:id" element={<EditProduct />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="orders/:id" element={<AdminOrderDetails />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={
              <div className="min-h-screen pt-40 pb-24 flex items-center justify-center font-sans-custom transition-all" style={{ background: 'var(--bg-main)' }}>
                <div className="container-custom text-center">
                  <h1 className="text-9xl mb-4 font-display" style={{ color: 'var(--text-primary)' }}>404</h1>
                  <h2 className="text-4xl mb-6 font-display" style={{ color: 'var(--ink)' }}>Thread Lost in the Loom</h2>
                  <p className="text-xl mb-8" style={{ color: 'var(--warm)' }}>The page you're looking for has wandered off like a loose thread.</p>
                  <a href="/" className="btn-gold font-sans-custom">Return to Home</a>
                </div>
              </div>
            } />
          </Routes>
        </main>
        {/* <AIAssistant /> */}
        {!isOdiaRoute && <Footer />}

      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <StoreProvider>
        <GlobalStyles />
        <WelcomeScreen />
        <Router>
          <AppContent />
        </Router>
      </StoreProvider>
    </LanguageProvider>
  );
};


export default App;