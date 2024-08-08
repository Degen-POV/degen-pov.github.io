"use client";

import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import "@fontsource/coming-soon"; // Import the Google Font
import Header from "@/components/Header";

export default function Home() {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipOpacity, setTooltipOpacity] = useState(1);

  const handleCopy = (e: React.MouseEvent) => {
    navigator.clipboard.writeText("0x4c96A67b0577358894407AF7Bc3158fC1DfFbeB5");
    setTooltipPosition({ x: e.clientX, y: e.clientY });
    setTooltipVisible(true);
    setTooltipOpacity(1);
    
    setTimeout(() => {
      setTooltipOpacity(0);
    }, 1500);
  
    setTimeout(() => {
      setTooltipVisible(false);
    }, 2000);
  };


  return (
    <>
      <Header />
      <main
        className="relative flex flex-col items-center justify-start min-h-screen bg-[#26437d] text-[#ffff33] p-4 pt-2 mt-0 pb-0 mb-0"
        style={{ fontFamily: '"Coming Soon", cursive' }}
      >
        <div className="w-full pt-0 mt-0">
          <Image
            src="/hero.png"
            alt="Your Degen POV"
            width={1920}
            height={1080}
            className="w-full h-auto"
            priority={true}
          />
        </div>
        <div className="mt-8 w-full max-w-2xl text-left pt-2 mt-0">
          <p className="text-l font-bold">
            {/* eslint-disable */}
            "Oh, you can't help that,"
            <br />
            said the Cat
            <br />
            "we're all degens here. I'm a degen. You're a degen."
            <br />
            "How do you know I'm a degen?"
            <br />
            said I.
            <br />
            "You must be," said the Cat, "or you wouldn't have come here."
            {/* eslint-enable */}
          </p>
          <div className="mt-4 pb-4 font-bold flex flex-col sm:flex-row items-center relative justify-center">
            <a
              href="https://basescan.org/token/0x4c96A67b0577358894407AF7Bc3158fC1DfFbeB5"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-2 text-2xl hover:underline ca-line text-center"
            >
              CA 0x4c96A67b0577358894407AF7Bc3158fC1DfFbeB5
            </a>
            <div className="relative">
              <FontAwesomeIcon
                icon={faCopy}
                className="mt-2 sm:mt-0 mb-2 sm:mb-0 pb-2 sm:pb-0 cursor-pointer"
                onClick={handleCopy}
              />

              {tooltipVisible && (
                <div
                  className="fixed bg-gray-700 text-white p-2 rounded-lg"
                  style={{
                    top: tooltipPosition.y - 62,
                    left: tooltipPosition.x - 105,
                    pointerEvents: 'none',
                    opacity: tooltipOpacity,
                    transition: 'opacity 0.5s ease-out'
                  }}
                >
                  copied, you degen
                </div>
              )}



            </div>
          </div>
        </div>
      </main>
    </>
  );
}
