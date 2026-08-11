'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <Link href="/" className="text-xl font-semibold text-gray-800">
        Ignite
      </Link>
      <div className="flex gap-4">
        <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
          Log in
        </Link>
        <Link
          href="/signup"
          className="text-sm bg-gray-900 text-white px-3 py-1.5 rounded hover:bg-gray-700"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
}