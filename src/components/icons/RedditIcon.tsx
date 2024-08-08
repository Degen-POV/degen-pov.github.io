import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons";

const RedditIcon: React.FC = () => (
  <div className="relative group mr-2 transform transition-transform duration-200 hover:scale-110">
    <a
      href="https://www.reddit.com/r/DegenPOVCTO/"
      target="_blank"
      rel="noopener noreferrer"
      className="mr-2 text-[#ffff33] hover:text-[#d1d100] transform transition-transform duration-200 hover:scale-110"
    >
      <FontAwesomeIcon icon={faRedditAlien} className="header-icon" />
    </a>
    <div className="absolute hidden group-hover:block bg-[#26437d] text-[#ffff33] p-1 rounded-lg left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm">
      Reddit
    </div>
  </div>
);
export default RedditIcon;