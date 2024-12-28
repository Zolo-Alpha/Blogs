import React from "react";
import { Link } from "react-router-dom";
import image from "../../../assets/Saly-38.png"
const WriteForUs = () => {
  return (
    <>
      <div className="w-full mt-[30px] h-[35vh] md:h-[100vh] absolute z-0  bg-gradient-to-r from-blue-500 to-black bg-opacity-100">
        {" "}
      </div>
      <div className="flex md:max-w-full relative z-10 h-[70vh] md:h-[110vh]  mb-10 bg-top-4  bg-hero-pattern bg-no-repeat bg-cover items-center ">
        <div className="md:max-h-full md:py-32 md:pl-20 pl-10">
          <h1 className="md:text-6xl text-2xl font-extralight text-white text-wrap md:m-8 m-2">
            Write for Us
          </h1>
          <p className="max-w-full md:text-xl text-sm text-white font-normal text-wrap md:mx-8 m-2">
            Have a unique tech insight or a breakthrough project you'd like to
            share? Join our community of writers and make your mark on the tech
            world. Your expertise and experiences can inspire and educate fellow
            students and tech enthusiasts. Start writing today and contribute to
            our growing collection of technical blogs.
          </p>
          <Link to={"/write"}>
          <button className="bg-blue-500 text-white md:max-w-full md:w-28 w-16 h-10 rounded-3xl m-8 hover:bg-[#65558F] ease-out">
            Write
          </button>
          </Link>
        </div>
        <img
          src={image}
          alt="Write for Us"
          className="hidden md:block"
        />
        <img
          src={image}
          alt="Write for Us"
          className=" block h-[250px] w-[200px]  md:hidden"
        />
      </div>
    </>
  );
};

export default WriteForUs;
