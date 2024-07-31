import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Whitepaper from './whitepaper/[id]';

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
          setContent(<pre>{JSON.stringify(metadata, null, 2)}</pre>);
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

  return content;
}

function generateMetadata(id: string) {
  return {
    name: `Degen POV Whitepaper NFT #${id}`,
    description: "Congratulations, degen!\n\nYou got an exclusive NFT of the Degen POV Whitepaper.\nOnly given to the biggest degens.\n\nHow do we know you're a degen?\nYou got this NFT didn't you?",
    image: "https://degenpov.me/whitepaper/degenpovcover.png",
    animation_url: `https://degenpov.me/whitepaper/`,
    external_url: "https://degenpov.me/whitepaper/degenpov_whitepaper.pdf",
    attributes: [{ trait_type: "Degen Level", value: "Maximum" }],
    properties: {
      cover_image: "https://degenpov.me/whitepaper/degenpovcover.png",
      website: "https://degenpov.me/",
      whitepaper: "https://degenpov.me/whitepaper/degenpovwhitepaper.pdf",
      linktree: "https://linktr.ee/degenpovcto"
    }
  };
}
