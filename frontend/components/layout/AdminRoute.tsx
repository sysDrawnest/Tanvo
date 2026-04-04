// components/layout/AdminRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

const AdminRoute: React.FC = () => {
  const { user, isAdmin, loading } = useStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#C9A84C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;