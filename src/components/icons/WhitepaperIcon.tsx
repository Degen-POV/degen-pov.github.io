import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";

const WhitepaperIcon: React.FC = () => (
  <div className="relative group mr-2 transform transition-transform duration-200 hover:scale-110">
    <a
      href="/whitepaper/degenpovwhitepaper.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#ffff33] hover:text-[#d1d100]"
    >
      <FontAwesomeIcon icon={faFileLines} className="header-icon" />
    </a>
    <div className="absolute hidden group-hover:block bg-[#26437d] text-[#ffff33] p-1 rounded-lg left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm">
      View Whitepaper
    </div>
  </div>
);

export default WhitepaperIcon;
