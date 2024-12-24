import Card from "../../components/Home/Card/CardLatest";
import HomeNav from "../../components/Home/HomeNav/HomeNav";
import data from "../../../data/blogs";
import PostCard from "../../components/Home/Card/PostCard";
import HeroSection from "../../components/Home/HeroSection/HeroSection";
import WriteForUs from "../../components/Home/WriteForUs/WriteForUs";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import blogs from "../../../data/blogs";
import { Link } from "react-router-dom";
export default function Landing() { {/** remove this title */}
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

          <div></div>
          <div className="w-[95%] mt-5">
            <HomeNav />
            <div id="topPics">
              {data.map((blog, id) => (
                <Link to={`/blog/${id}`}>
                  <PostCard
                    key={id}
                    logo={blog.logo}
                    image={blog.image}
                    author={blog.author}
                    category={blog.category}
                    title={blog.title}
                    description={blog.content}
                    date={blog.date.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}
                    likes={blog.likes}
                    comments={blog.comments.length}
                  />
                </Link>
              ))}
            </div>
            <div className="ml-[5%]">
              <h1 className="text-white text-3xl ml-[7%] mb-2 text-left">
                Latest
              </h1>
              <div className="bg-black w-full h-full flex flex-wrap items-center justify-evenly py-10  gap-y-6 border-t-2 border-b-2 bg-opacity-0 mb-[-30px] relative z-50 border-t-red-600 border-b-blue-500 p-4 rounded-md">
                {blogs.map((blog, id) => (
                  <Link to={`/blog/${id}`}>
                    <Card
                      key={id}
                      logo={blog.logo}
                      author={blog.author}
                      category={blog.category}
                      title={blog.title}
                      date={blog.date.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}
                      likes={blog.likes}
                      comments={blog.comments.length}
                    />
                  </Link>
                ))}
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
