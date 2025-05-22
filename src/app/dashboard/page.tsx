'use client';

import LogoutButton from '@/components/LogoutButton';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome, {user?.email} 🎉</p>
      </div>

    </ProtectedRoute>
  );
}
