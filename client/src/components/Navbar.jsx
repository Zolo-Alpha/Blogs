import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex items-center px-5 py-4 w-full border-b border-neutral-500">
      <div className="flex items-center md:w-[10vw] w-[30vw] md:ml-10">
        <div className="flex items-center gap-5 text-xl font-bold">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4e2ecd4b9fb5f51af1697ea4e2a9929d899f365bc2942ccb5debc4f8efc4951?apiKey=cb0dbcd120c84cf4a6cf9d039ebac0a2&"
            alt="Logo"
            className="w-[23px] h-[23px] object-contain"
          />
          <div className="hidden md:block text-white text-base">Blogs</div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full md:w-[80vw]">
        <div className="hidden md:flex gap-8 items-center text-sm md:text-base font-light ml-4">
          <a href="/#topPics" className="text-white hover:text-stone-300">
            Top Pics
          </a>
          <Link to="/about-us" className="text-white hover:text-stone-300">
            About Us
          </Link>
          <Link to="/write" className="text-white hover:text-stone-300">
            Write
          </Link>
        </div>

        <div className="md:flex items-center">
          <div className={`flex items-center justify-between md:w-[20vw]`}>
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-gray-800 rounded-3xl border border-neutral-600 px-4 py-1 w-full"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d48ead5f195b654d237698cfceb2eef3f5dd60346e5f886dae2b2fa34baa3e4e?apiKey=cb0dbcd120c84cf4a6cf9d039ebac0a2&"
                alt="Search Icon"
                className="w-5 h-5"
              />
              <input
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-transparent text-stone-300 text-xs md:text-base outline-none ml-2 w-[40vw] md:w-full"
              />
            </form>
          </div>

          <button
            aria-label="Notifications"
            className="bg-transparent border-none p-0 ml-4 hidden md:block"
          >
            <Link to="/dashboard">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/81014a5be615d9cf0f59dd6ceb10aa64ca1b93b4ad87b38514daba0dc57ae184?apiKey=cb0dbcd120c84cf4a6cf9d039ebac0a2&"
                alt="Notifications"
                className="w-[20px] md:w-[23px]"
              />
            </Link>
          </button>
        </div>
      </div>

      <button
        className="text-white ml-10 text-xl md:hidden z-40"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      {menuOpen && (
        <div className="flex flex-row z-30 absolute right-0 top-2 gap-10 w-[80vw] bg-custom-black p-4 rounded-lg md:hidden">
          <a
            href="#topPics"
            className="text-sm text-stone-300 hover:text-white py-1"
          >
            Top Pics
          </a>
          <a
            href="/about-us"
            className="text-sm text-stone-300 hover:text-white py-1"
          >
            About Us
          </a>
          <a
            href="/write"
            className="text-sm text-stone-300 hover:text-white py-1"
          >
            Write
          </a>
        </div>
      )}
    </header>
  );
}

export default Navbar;
