import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

const DiscordIcon: React.FC = () => (
  <div className="relative group mr-0 transform transition-transform duration-200 hover:scale-110">
    <a
      href="https://discord.gg/UvNtN8JyQf"
      target="_blank"
      rel="noopener noreferrer"
      className="mr-2 text-[#ffff33] hover:text-[#d1d100] transform transition-transform duration-200 hover:scale-110"
    >
      <FontAwesomeIcon icon={faDiscord} className="header-icon" />
    </a>
    <div className="absolute hidden group-hover:block bg-[#26437d] text-[#ffff33] p-1 rounded-lg left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm">
      Discord
    </div>
  </div>
);

export default DiscordIcon;