'use client';

import { useAuth } from '@/context/AuthContext';

export default function TestPage() {
  const { user, loading, token } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      {user ? (
        <>
          <p>✅ Logged in as: {user.email}</p>
          <p>🔑 Token (short): {token?.slice(0, 10)}...</p>
        </>
      ) : (
        <p>❌ Not logged in</p>
      )}
    </div>
  );
}
