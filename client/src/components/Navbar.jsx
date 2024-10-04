import React, { useState } from 'react';

function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); 
  };

  return (
    <header className="flex flex-col justify-center px-12 py-5 w-full border-b border-neutral-500 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 justify-between items-start w-full max-md:max-w-full">
        <nav className="flex gap-10 items-center text-white min-w-[240px] max-md:max-w-full">
          <div className="flex gap-1 items-center self-stretch my-auto text-xl font-bold tracking-normal leading-tight whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4e2ecd4b9fb5f51af1697ea4e2a9929d899f365bc2942ccb5debc4f8efc4951?apiKey=cb0dbcd120c84cf4a6cf9d039ebac0a2&"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto aspect-[0.96] w-[23px]"
            />
            <div className="self-stretch my-auto">Blogs</div>
          </div>
          <div className="flex gap-10 items-center self-stretch my-auto text-base font-light leading-8 text-center min-w-[240px]">
            <a href="#top-pics" className="self-stretch my-auto">Top Pics</a>
            <a href="#about-us" className="self-stretch my-auto">About Us</a>
            <a href="#write" className="self-stretch my-auto">Write</a>
          </div>
        </nav>
        <div className="flex gap-6 items-center text-xs font-light leading-8 text-center whitespace-nowrap min-w-[240px] text-stone-300">
          <form className="flex flex-col self-stretch my-auto w-[234px] ml-[10vw]">
            <div className="flex gap-5 px-2.5 bg-gray-800 rounded-3xl border border-solid border-neutral-600 border-opacity-40">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d48ead5f195b654d237698cfceb2eef3f5dd60346e5f886dae2b2fa34baa3e4e?apiKey=cb0dbcd120c84cf4a6cf9d039ebac0a2&"
                alt=""
                className="object-contain shrink-0 my-auto w-5 aspect-square"
              />
              <input
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="grow shrink w-[172px] bg-transparent text-stone-300 outline-none"
              />
            </div>
          </form>
          <button aria-label="Notifications" className="bg-transparent border-none p-0">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/81014a5be615d9cf0f59dd6ceb10aa64ca1b93b4ad87b38514daba0dc57ae184?apiKey=cb0dbcd120c84cf4a6cf9d039ebac0a2&"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-[24px] aspect-square"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
