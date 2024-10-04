import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./SideProfile";
import Navbar from "../Navbar";

function Draft(props) {
  const [activeTab, setActiveTab] = useState("Draft");
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/blog/search");
        setBlogs(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
  }, []);

 
  const filteredBlogs = blogs
    .filter((blog) =>
      activeTab === "Draft" ? blog.review !== "approved" : blog.review === "approved"
    )
    .filter((blog) => 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      blog.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen  bg-custom-black flex flex-col">
      <Navbar onSearch={handleSearch} /> 
      <div className="flex flex-1 flex-col sm:flex-row overflow-hidden sm:ml-12 mt-8">
        <div className="hidden sm:block left-[10vw] mr-[2vw] items-center sm:ml-0 sm:fixed w-[296px] sm:h-[900px] sm:w-[296px] flex-col z-10 mb-4 sm:mb-0">
          <Sidebar />
        </div>

        <main className="flex-1 overflow-y-auto ml-[3%] sm:ml-[10vw] absolute items-center sm:left-[25vw] p-4 sm:p-8">
          <div className="max-w-4xl mx-auto ">
            <div className="mb-4 sm:mb-8 ">
              <div className="flex justify-between items-center ">
                <div>
                  <span
                    className={`cursor-pointer  text-gray-500 text-[16px] sm:text-[20px] font-mono mr-6 sm:mr-20 pb-2 border-b-2 ${
                      activeTab === "Draft"
                        ? "border-pink-500 text-white"
                        : "border-transparent text-gray-700"
                    }`}
                    onClick={() => handleTabClick("Draft")}
                  >
                    Draft
                  </span>
                  <span
                    className={`cursor-pointer text-gray-500 text-[16px] sm:text-[20px] font-mono mr-4 pb-2 border-b-2 ${
                      activeTab === "Published"
                        ? "border-pink-500 text-white"
                        : "border-transparent text-gray-700"
                    }`}
                    onClick={() => handleTabClick("Published")}
                  >
                    Published
                  </span>
                </div>
                <a href="/createPost" className="ml-[28.2vw]">
                  <button className="text-center bg-blue-500 cursor-pointer px-4 py-2 sm:text-lg hover:bg-blue-600 text-white rounded-full font-mono">
                    Post
                  </button>
                </a>
              </div>
            </div>

            <div>
              {filteredBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="mb-6 bg-card-black h-auto sm:h-[180px] w-full rounded-lg overflow-hidden shadow-lg relative"
                >
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div className="sm:w-2/3 pt-6 pl-6">
                      <h2 className="text-xl sm:text-2xl font-mono font-bold mb-2 text-white">
                        {blog.title}
                      </h2>
                      <p className="text-white mb-4 w-full sm:w-[460px] h-auto font-mono">
                        {blog.content.substring(0, 100)}...
                      </p>
                      <div className="flex items-center">
                        <span className="text-gray-500 text-sm font-mono">
                          {activeTab === "Draft" ? "last edited" : "published"}{" "}
                          {new Date(blog.date).toLocaleDateString()}
                        </span>
                        <a href="/UpdatePost">
                          <button className="bg-blue-500 cursor-pointer hover:bg-blue-600 w-[70px] sm:w-[87px] h-[27px] text-white ml-4 sm:ml-[80px] rounded-full font-mono">
                            View
                          </button>
                        </a>
                      </div>
                    </div>
                    <div className="w-full p-3 sm:p-0 sm:w-[270px] h-[160px] sm:h-[180px] mt-4 sm:mt-0 flex-shrink-0 relative">
                      <div className="hidden sm:block absolute inset-0 bg-gradient-to-l from-black via-transparent to-[#151825] rounded-r-lg z-10"></div>
                      <img
                        src={blog.image}
                        alt={`${activeTab} Image`}
                        className="w-full h-full rounded-md object-cover rounded-r-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Draft;
