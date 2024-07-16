import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faRedditAlien,
  faTiktok,
  faTwitter,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";

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
            href="/whitepaper/degenpov_whitepaper_v2_3.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 text-[#ffff33] hover:text-[#d1d100] transform transition-transform duration-200 hover:scale-110"
          >
            <FontAwesomeIcon icon={faFileLines} className="header-icon" />
          </a>
          <a
            href="https://twitter.com/degenpovcto"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 text-[#ffff33] group hover:text-[#d1d100] transform transition-transform duration-200 hover:scale-110"
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
            className="mr-2 text-[#ffff33] hover:text-[#d1d100] transform transition-transform duration-200 hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 512 512" fill="currentColor">
              <path d="m470.4354553 45.4225006-453.6081524 175.8265381c-18.253809 8.1874695-24.4278889 24.5854034-4.4127407 33.4840851l116.3710175 37.1726685 281.3674316-174.789505c15.3625488-10.9733887 31.0910339-8.0470886 17.5573425 4.023468l-241.6571311 219.9348907-7.5913849 93.0762329c7.0313721 14.3716125 19.9055786 14.4378967 28.1172485 7.2952881l66.8582916-63.5891418 114.5050659 86.1867065c26.5942688 15.8265076 41.0652466 5.6130371 46.7870789-23.3935242l75.1055603-357.4697647c7.7979126-35.7059288-5.5005798-51.437891-39.3996277-37.7579422z" />
            </svg>
          </a>
          <a
            href="https://discord.gg/UvNtN8JyQf"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 text-[#ffff33] hover:text-[#d1d100] transform transition-transform duration-200 hover:scale-110"
          >
            <FontAwesomeIcon icon={faDiscord} className="header-icon" />
          </a>
          <a
            href="https://www.reddit.com/r/DegenPOVCTO/"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 text-[#ffff33] hover:text-[#d1d100] transform transition-transform duration-200 hover:scale-110"
          >
            <FontAwesomeIcon icon={faRedditAlien} className="header-icon" />
          </a>
          <a
            href="https://www.tiktok.com/@degenpovcto/"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-12 text-[#ffff33] hover:text-[#d1d100] transform transition-transform duration-200 hover:scale-110"
          >
            <FontAwesomeIcon icon={faTiktok} className="header-icon" />
          </a>
        </header>
        {children}
      </body>
    </html>
  );
}
