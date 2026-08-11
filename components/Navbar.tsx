'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';

export default function Navbar() {
  const { user, loading, signOut } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <Link href="/" className="text-xl font-semibold text-gray-800">
        Ignite
      </Link>
      <div className="flex items-center gap-4">
        {loading ? null : user ? (
          <>
            <span className="text-sm text-gray-600">{user.email}</span>
            <button
              onClick={signOut}
              className="text-sm bg-gray-100 px-3 py-1.5 rounded hover:bg-gray-200"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-sm bg-gray-900 text-white px-3 py-1.5 rounded hover:bg-gray-700"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}