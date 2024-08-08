'use client';

import UpArrow from '@/components/ui/UpArrow';
import DownArrow from '@/components/ui/DownArrow';
import Header from '@/components/Header';
import React, { useState } from 'react';

export default function MintWhitepaper() {
  const [mintAmount, setMintAmount] = useState(1);
  const [mintFor, setMintFor] = useState('holders');

  const handleMintAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (isNaN(value)) {
      setMintAmount(1);
    } else if (value > 1000) {
      setMintAmount(1000);
    } else if (value < 1) {
      setMintAmount(1);
    } else {
      setMintAmount(value);
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center min-h-screen bg-[#26437d] text-[#ffff33] mt-4 pt-0">
        <div className="w-full bg-[#1e3260] p-8 rounded-lg">
          <h1 className="text-4xl font-bold mb-8 text-center">
            <span className="border-b-4 border-[#ffff33]">Mint the Whitepaper</span>
          </h1>
          <div className="flex flex-col items-center">
            <iframe
              src="/whitepaper"
              className="w-[70vh] h-[50vh] rounded-lg"
              title="Degen POV Whitepaper"
            />
            <div className="mt-4 w-[70vh]">
              <div className="flex items-center mb-2">
                <span>Mint</span>
                <div className="relative mx-2 w-24">
                  <input
                    type="number"
                    id="mintAmount"
                    min="1"
                    max="1000"
                    value={mintAmount}
                    onChange={handleMintAmountChange}
                    placeholder="1-1000"
                    className="w-full pl-2 bg-[#26437d] text-[#ffff33] border border-[#ffff33] rounded-lg placeholder-[#ffff33] placeholder-opacity-50 text-left appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none transform transition-transform duration-200 hover:scale-110"
                  />
                  <div className="absolute right-2 top-0 bottom-0 flex flex-col justify-center">
                    <button onClick={() => handleMintAmountChange({ target: { value: (mintAmount + 1).toString() } } as React.ChangeEvent<HTMLInputElement>)} className="text-[#ffff33] focus:outline-none">
                      <UpArrow />
                    </button>
                    <button onClick={() => handleMintAmountChange({ target: { value: (mintAmount - 1).toString() } } as React.ChangeEvent<HTMLInputElement>)} className="text-[#ffff33] focus:outline-none">
                      <DownArrow />
                    </button>
                  </div>
                </div>
                <span>for</span>
                <select
                  value={mintFor}
                  onChange={(e) => setMintFor(e.target.value)}
                  className="ml-2 bg-[#26437d] text-[#ffff33] border border-[#ffff33] rounded-lg transform transition-transform duration-200 hover:scale-110"
                >
                  <option value="holders">&nbsp;holders</option>
                  <option value="me">&nbsp;me</option>
                  <option value="friends">&nbsp;my friend(s)</option>
                </select>.
              </div>
              <button className="w-full mt-4 p-2 bg-[#26437d] text-[#ffff33] rounded-lg font-bold transform transition-transform duration-200 hover:scale-110">
                Mint
              </button>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}