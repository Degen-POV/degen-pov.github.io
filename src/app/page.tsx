"use client";

import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import "@fontsource/coming-soon"; // Import the Google Font

export default function Home() {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleCopy = (e: React.MouseEvent) => {
    navigator.clipboard.writeText("0x4c96A67b0577358894407AF7Bc3158fC1DfFbeB5");
    setTooltipPosition({ x: e.clientX - 75, y: e.clientY + 280 }); // Offset tooltip above the cursor
    setTooltipVisible(true);
    setTimeout(() => {
      setTooltipVisible(false);
    }, 2000); // Tooltip fades out after 2 seconds
  };

  return (
    <main
      className="relative flex flex-col items-center justify-start min-h-screen bg-[#26437d] text-[#ffff33] p-4 pt-2 mt-0 pb-0 mb-0"
      style={{ fontFamily: '"Coming Soon", cursive' }}
    >
      <div className="w-full pt-0 mt-0">
        <Image
          src="hero.png"
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
          “Oh, you can't help that,”
          <br />
          said the Cat
          <br />
          “we're all degens here. I'm a degen. You're a degen.”
          <br />
          “How do you know I'm a degen?”
          <br />
          said Alice.
          <br />
          “You must be,” said the Cat, “or you wouldn't have come here.”
          {/* eslint-enable */}
        </p>
        <div
          className="mt-4 pb-4 font-bold flex flex-col sm:flex-row items-center cursor-pointer relative justify-center"
          onClick={handleCopy}
        >
          <span className="mr-2 text-2xl hover:underline ca-line text-center">
            CA 0x4c96A67b0577358894407AF7Bc3158fC1DfFbeB5
          </span>
          <FontAwesomeIcon
            icon={faCopy}
            className="mt-2 sm:mt-0 mb-2 sm:mb-0 pb-2 sm:pb-0"
          />
        </div>
      </div>
      {tooltipVisible && (
        <div
          className="absolute bg-gray-700 text-white p-1 rounded transition-opacity duration-500"
          style={{
            top: tooltipPosition.y, // Position above the mouse cursor
            left: tooltipPosition.x,
            whiteSpace: "nowrap", // Prevent new lines
          }}
        >
          copied, you degen
        </div>
      )}
    </main>
  );
}
