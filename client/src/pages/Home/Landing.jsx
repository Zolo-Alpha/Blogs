import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/Home/HeroSection/HeroSection";
import HomeNav from "../../components/Home/HomeNav/HomeNav";
import PostCard from "../../components/Home/Card/PostCard";
import Card from "../../components/Home/Card/CardLatest";
import WriteForUs from "../../components/Home/WriteForUs/WriteForUs";
import Footer from "../../components/Footer";
import apiClient from "../../helper/apiClient";

export default function Landing() {
  // State to store the fetched blog data
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiClient.get("http://localhost:3000/blog/"); // Fetch all blogs
        setData(response.data); // Set the blogs data in state
        console.log("Response data: ", response.data);
      } catch (error) {
        console.error("There was an error fetching the blogs!", error); // Handle any error
      }
    };

    fetchBlogs(); 
  }, []); // Empty dependency array to run this effect only once when the component mounts

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-full w-full overflow-hidden ">
        <div className="w-[100%] md:mb-[150px]">
          <div
            className="border-b-2"
            style={{
              borderImageSource:
                "linear-gradient(141.07deg, #00336C 3.32%, #D51B10 95.71%)",
              borderImageSlice: 1,
            }}
          >
            <HeroSection />
          </div>

          <div className="w-[95%] mt-5">
            <HomeNav />
            <div id="topPics">
              {data.length > 0 ? (
                data.map((blog, id) => (
                  <Link to={`/blog/${blog._id}`} key={blog._id}>
                     <PostCard
                      logo={blog.image}  // Assuming 'image' here refers to the blog's logo
                      image={blog.image}
                      author={blog.author?.name || "Anonymous"} // Use optional chaining in case 'author' is missing
                      category={blog.tags.map(tag => tag.name).join(", ")} // Join all tags if present
                      title={blog.title}
                      description={blog.description}
                      date={new Date(blog.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                      })}
                      likes={blog.likes || 0} // Use a fallback value for likes if it's not provided
                      comments={blog.comments.length}
                                />
                  </Link>
                ))
              ) : (
                <p className="text-white text-center">Loading blogs...</p>
              )}
            </div>

            <div className="ml-[5%]">
              <h1 className="text-white text-3xl ml-[7%] mb-2 text-left">
                Latest
              </h1>
              <div className="bg-black w-full h-full flex flex-wrap items-center justify-evenly py-10 gap-y-6 border-t-2 border-b-2 bg-opacity-0 mb-[-30px] relative z-50 border-t-red-600 border-b-blue-500 p-4 rounded-md">
                {data.length > 0 ? (
                  data.map((blog, id) => (
                    <Link to={`/blog/${blog._id}`} key={blog._id}>
                        <Card
                      logo={blog.image} 
                      image={blog.image}
                      author={blog.author?.name || "Anonymous"} // Use optional chaining in case 'author' is missing
                      category={blog.tags.map(tag => tag.name).join(", ")} // Join all tags if present
                      title={blog.title}
                      description={blog.description}
                      date={new Date(blog.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                      })}
                      likes={blog.likes || 0} // Use a fallback value for likes if it's not provided
                      comments={blog.comments.length}
                                />
                    </Link>
                  ))
                ) : (
                  <p className="text-white text-center">Loading latest blogs...</p>
                )}
              </div>
            </div>
          </div>

          <WriteForUs />
        </div>
      </div>
      <Footer />
    </>
  );
}
