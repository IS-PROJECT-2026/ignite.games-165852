'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <main className="max-w-sm mx-auto px-6 py-16">
        <h1 className="text-xl font-semibold mb-2">Check your email</h1>
        <p className="text-sm text-gray-500">
          We&apos;ve sent a confirmation link to {email}. Confirm it, then{' '}
          <Link href="/login" className="underline">log in</Link>.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-sm mx-auto px-6 py-16">
      <h1 className="text-xl font-semibold mb-6">Sign up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="text-sm text-gray-600 block mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm text-gray-600 block mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 text-white text-sm py-2 rounded hover:bg-gray-700 disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-4">
        Already have an account? <Link href="/login" className="underline">Log in</Link>
      </p>
    </main>
  );
}