  import React from 'react';
  import Link from 'next/link';

  const MintIcon: React.FC = () => (
    <div className="relative group mr-2 transform transition-transform duration-200 hover:scale-110">
      <Link
        href="/whitepaper/mint"
        className="header-icon"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9"
          viewBox="0 0 2064.7082 1856.419"
          fill-rule="evenodd"
          clip-rule="evenodd"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
          image-rendering="optimizeQuality"
        >
          <path
            id="Anvil"
            fill="currentColor"
            d="m 697.105,1029.8479 h 1170.6 v 171.74 c -393.56,62.483 -463.56,194.15 -467.2,310.86 -2.8103,90.13 0.728,199.13 201.4,305.29 v 94.922 h -244.82 c -3.5246,-87.401 -76.119,-157.8 -164.37,-157.8 h -96.992 c -88.264,0 -160.88,70.403 -164.41,157.8 h -277.53 v -98.946 c 141.43,-42.886 189.29,-109.02 180.8,-177.61 -6.1326,-49.496 -20.597,-127.78 -71.583,-172.03 -65.511,-56.925 -177.64,-75.539 -264.41,-94.128 -190.3,-40.775 -429.55,-77.197 -498.59,-280.93 h 614.78 v -12.671 h 82.272 v -46.485 z m -582.17,109.85 c 133.5,80.749 289.42,134.67 486.19,139.37 49.563,1.7657 50.615,66.865 0,65.47 -235.37,-16.754 -383,-95.152 -486.19,-204.84 z"
          />
          <g id="Hammer" className="hammer">
            <path
              fill="currentColor"
              d="m 906.96205,55.481376 9.6651,4.67658 7.3726,-13.50268 35.903,-65.98688 c 16.533,-30.32421 51.10695,-44.947 76.84695,-32.48524 l 134.56,65.13454 c 25.745,12.45516 33.281,47.45689 16.761,77.806556 l -35.875,65.974628 -7.3737,13.53473 897.56,434.40313 c 19.626,9.46818 27.896,31.50655 18.366,48.98243 l -18.049,33.20276 c -9.5166,17.45608 -33.354,23.94389 -52.954,14.43799 l-897.54,-434.37485 -43.27,79.45185 -29.513,54.21153 c -0.2834,0.54629 -1.0446,0.73062 -1.6914,0.39326 l -45.64795,-22.08268 -134.57,-65.12794 -45.641,-22.07043 c -0.63429,-0.3168 -0.944,-1.00971 -0.63429,-1.5495 l 29.501,-54.21152 43.24899,-79.45841 -9.6583,-4.67762 c -19.6,-9.48704 -27.89599,-31.53106 -18.4,-48.99374 l 18.11,-33.228214 c 9.4629,-17.45608 33.274,-23.95049 52.914,-14.45685 z"
            />
          </g>
          <style>{`
            .hammer {
              transform-origin: 90% 50%;
              transition: transform 0.3s ease-in-out;
            }
            svg:hover .hammer {
              transform: rotate(-25deg) translate(20px, 20px);
            }
          `}</style>
        </svg>
      </Link>
      <div className="absolute hidden group-hover:block bg-[#26437d] text-[#ffff33] p-1 mt-2 rounded-lg left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm">
        Mint Whitepaper
      </div>
    </div>
  );

  export default MintIcon;
