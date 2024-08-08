import WhitepaperIcon from './icons/WhitepaperIcon';
import TwitterIcon from './icons/TwitterIcon';
import TelegramIcon from './icons/TelegramIcon';
import DiscordIcon from './icons/DiscordIcon';
import RedditIcon from './icons/RedditIcon';
import TiktokIcon from '@/components/icons/TiktokIcon';
import HomeIcon from './icons/HomeIcon';
import MintIcon from './icons/MintIcon';

const Header = () => (
  <header className="flex justify-end pr-4 pb-0 mb-0 pt-2 bg-[#26437d] text-4xl">
    <HomeIcon />
    <WhitepaperIcon />
    <TwitterIcon />
    <TelegramIcon />
    <DiscordIcon />
    <RedditIcon />
    <TiktokIcon />
  </header>
);

export default Header;
