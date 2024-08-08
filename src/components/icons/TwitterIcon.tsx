import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faTwitter,
    faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
const TwitterIcon: React.FC = () => (
  <div className="relative group transform transition-transform duration-200 hover:scale-110">
    <a
      href="https://twitter.com/degenpovcto"
      target="_blank"
      rel="noopener noreferrer"
      className="mr-2 text-[#ffff33] group hover:text-[#d1d100]"
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
    <div className="absolute hidden group-hover:block bg-[#26437d] text-[#ffff33] p-1 rounded-lg left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm">
      X / Twitter
    </div>
  </div>
);

export default TwitterIcon;