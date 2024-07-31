import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Whitepaper, { generateMetadata } from './whitepaper/[id]';

export default function Custom404() {
  const router = useRouter();
  const [content, setContent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const path = router.asPath;
    if (path.startsWith('/whitepaper/')) {
      const segments = path.split('/');
      const id = segments[2];
      if (id && !isNaN(Number(id))) {
        if (path.endsWith('.json')) {
          const metadata = generateMetadata(id);
          // Set raw JSON content
          setContent(JSON.stringify(metadata));
        } else {
          setContent(<Whitepaper />);
        }
      }
    } else {
      setContent(
        <div>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
      );
    }
  }, [router.asPath]);

  if (typeof content === 'string' && router.asPath.endsWith('.json')) {
    // If content is a string (JSON), return it as raw JSON
    return <>{content}</>;
  }

  return content;
}
