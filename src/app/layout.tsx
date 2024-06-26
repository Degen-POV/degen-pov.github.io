import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Ensure this is the correct path to your global CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faRedditAlien,
  faTelegram,
  faTiktok,
  faTwitter,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "your degen pov",
  description: "We're all degens here...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="your degen pov" />
        <meta name="twitter:creator" content="Degen POV CTO" />
        <meta property="og:url" content="https://degenpov.me" />
        <meta property="og:title" content="your degen pov" />
        <meta property="og:description" content="We're all degens here..." />
        <meta property="og:image" content="https://degenpov.me/card.png" />
      </head>
      <body className={inter.className}>
        <header className="flex justify-end pr-4 pb-0 mb-0 pt-2 bg-[#26437d] text-4xl">
          <a
            href="https://twitter.com/degenpovcto"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 text-[#ffff33] group"
          >
            <FontAwesomeIcon
              icon={faXTwitter}
              className="header-icon group-hover:hidden"
            />
            <FontAwesomeIcon
              icon={faTwitter}
              className="header-icon hidden group-hover:inline"
            />
          </a>
          <a
            href="https://t.me/degenpovcto"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 text-[#ffff33]"
          >
            <FontAwesomeIcon
              icon={faTelegram}
              className="header-icon"
              style={{ color: "#ffff33" }}
            />
          </a>
          <a
            href="https://discord.gg/UvNtN8JyQf"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 text-[#ffff33]"
          >
            <FontAwesomeIcon icon={faDiscord} className="header-icon" />
          </a>
          <a
            href="https://www.reddit.com/r/DegenPOVCTO/"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 text-[#ffff33]"
          >
            <FontAwesomeIcon icon={faRedditAlien} className="header-icon" />
          </a>
          <a
            href="https://www.tiktok.com/@degenpovcto/"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-12 text-[#ffff33]"
          >
            <FontAwesomeIcon icon={faTiktok} className="header-icon" />
          </a>
        </header>
        {children}
      </body>
    </html>
  );
}
