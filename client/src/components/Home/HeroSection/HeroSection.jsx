import React from "react";
import { Link } from "react-router-dom";
const HeroSection = () => {
  return (
    <>
      <div className="bg-hero-pattern bg-top-4 bg-no-repeat bg-cover	 z-10">
        <div
          className={`w-full h-[70%] bg-[length:139px_152px] relative overflow-hidden `}
        >
          
          <div className="flex  ">
            <div className="md:max-h-full md:py-32 md:px-20 ">
              <h1 className="md:text-6xl text-xl font-extralight text-white text-wrap m-8">
                Innovate, Learn, Connect
              </h1>
              <p className="max-w-full md:text-xl text-[#A79E9E] font-normal text-wrap mx-8">
                Explore the latest tech trends, gain insights from industry
                experts, and engage with fellow tech enthusiasts. From AI
                breakthroughs to coding tips, our blog is your go-to resource
                for all things.
              </p>
              <div className="flex justify-start items-center md:w-full">
                <Link to={"/login"}>
                  <button className="bg-blue-500 text-white max-w-full md:w-28 w-16 p-0.5 h-10 rounded-3xl m-8 hover:bg-[#65558F] ease-out">
                    Login
                  </button>
                </Link>
                <Link to={"/write"}>
                  <button className="bg-[#A3C8F0] text-black max-w-full md:w-28 w-16 h-10 rounded-3xl">
                    Write
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex items-center md:w-[900px] max-h-full mt-28 ">
              <img
                src="/Saly-11.png"
                alt="Hero Section Image"
                className="h-[497px] w-[477px] max-w-none hidden md:block "
              />
              <img
                src="/Saly-mobile.png"
                alt="Hero Section Image"
                className="max-w-none block md:hidden w-[200px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
