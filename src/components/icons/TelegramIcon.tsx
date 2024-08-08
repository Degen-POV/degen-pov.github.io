import React from 'react';

const TelegramIcon: React.FC = () => (
  <div className="relative group mr-2 transform transition-transform duration-200 hover:scale-110">
    <a
      href="https://t.me/degenpovcto"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#ffff33] group hover:text-[#d1d100]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 512 512" fill="currentColor">
        <path d="m470.4354553 45.4225006-453.6081524 175.8265381c-18.253809 8.1874695-24.4278889 24.5854034-4.4127407 33.4840851l116.3710175 37.1726685 281.3674316-174.789505c15.3625488-10.9733887 31.0910339-8.0470886 17.5573425 4.023468l-241.6571311 219.9348907-7.5913849 93.0762329c7.0313721 14.3716125 19.9055786 14.4378967 28.1172485 7.2952881l66.8582916-63.5891418 114.5050659 86.1867065c26.5942688 15.8265076 41.0652466 5.6130371 46.7870789-23.3935242l75.1055603-357.4697647c7.7979126-35.7059288-5.5005798-51.437891-39.3996277-37.7579422z" />
      </svg>
    </a>
    <div className="absolute hidden group-hover:block bg-[#26437d] text-[#ffff33] p-1 rounded-lg -bottom-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm">
      Telegram
    </div>
  </div>
);

export default TelegramIcon;
