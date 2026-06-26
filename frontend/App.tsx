import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Context
import { StoreProvider } from './context/StoreContext';
import { AuthProvider } from './context/AuthContext';

// Styles
import GlobalStyles from './components/GlobalStyles';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RegisterModal from './components/RegisterModal';
import ProtectedRoute from './components/ProtectedRoute';
import WelcomeScreen from './components/WelcomeScreen';
import WhatsAppConcierge from './components/WhatsAppConcierge';


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
import Billing from './pages/admin/Billing';

// Auth & Security Pages
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';

// Legal Pages
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';
import CookiePolicy from './pages/legal/CookiePolicy';

// Support Pages
import ReportBug from './pages/ReportBug';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth');

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--bg-main)' }}>
      {!isAuthPage && <Navbar />}
      <RegisterModal />
      <main className={`flex-grow ${isAuthPage ? '' : 'pt-[116px] md:pt-[136px]'}`}>
        <Routes>
          {/* Public Routes */}
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
          <Route path="/report-bug" element={<ReportBug />} />

          {/* Auth Specialized Routes */}
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/auth/verify-email" element={<VerifyEmail />} />

          {/* Legal Routes */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />

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
            <Route path="billing" element={<Billing />} />
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
      {!isAuthPage && <Footer />}

      {/* Floating WhatsApp Button */}
      {!isAuthPage && (
        <div style={{
          position: 'fixed',
          bottom: '28px',
          right: '24px',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '6px'
        }}>
          <p style={{
            fontSize: '10px',
            color: '#1A6634',
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 500,
            letterSpacing: '0.05em',
            opacity: 0.8
          }}>
            Personal assistance
          </p>
          <WhatsAppConcierge size="md" label="Order via WhatsApp" />
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <StoreProvider>
        <GlobalStyles />
        <WelcomeScreen />
        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>
      </StoreProvider>
    </AuthProvider>
  );
};

export default App;