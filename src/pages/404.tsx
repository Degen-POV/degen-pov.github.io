import React from 'react';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-yellow-300 font-bold">
      <h1 className="text-4xl mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">The page you are looking for does not exist.</p>
      <Link href="/">
        <a className="px-4 py-2 bg-yellow-300 text-blue-900 rounded hover:bg-yellow-400 transition-colors">
          Go back home
        </a>
      </Link>
    </div>
  );
}
