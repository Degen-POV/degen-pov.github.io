import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Whitepaper from './whitepaper/[id]';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    const path = router.asPath;
    if (path.startsWith('/whitepaper/')) {
      const id = path.split('/')[2];
      if (id && !isNaN(Number(id))) {
        router.push(`/whitepaper/${id}`, undefined, { shallow: true });
      }
    }
  }, [router]);

  if (router.asPath.startsWith('/whitepaper/')) {
    return <Whitepaper />;
  }

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}
