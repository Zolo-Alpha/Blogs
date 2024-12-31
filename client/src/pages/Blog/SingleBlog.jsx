import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomeLayout from "../../layout/HomeLayout";
import "./SingleBlog.css";
import { Link } from "react-router-dom";
import apiClient from "../../helper/apiClient";
import { FaComment } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import background from "../../assets/Main-background.png"
import profileimage from "../../assets/Profilelogo.png"

export default function SingleBlog({ title }) {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        console.log("hi");
        const response = await apiClient.get(`/blog/${id}`);
        console.log(response);
        if (!response.status === 200) {
          throw new Error(`Error fetching blog`);
        }
        const data = response.data;
        console.log("Response data is " + JSON.stringify(data));

        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  console.log(blog);

  if (loading) {
    return (
      <HomeLayout>
        <div className="main-background"></div>
        <div className="blog-content-wrapper">
          <h1 className="blog-title">Loading...</h1>
        </div>
      </HomeLayout>
    );
  }

  if (error) {
    return (
      <HomeLayout>
        <div className="main-background"></div>
        <div className="blog-content-wrapper">
          <h1 className="blog-title">Error: {error}</h1>
        </div>
      </HomeLayout>
    );
  }

  if (!blog) {
    return (
      <HomeLayout>
        <div className="main-background"></div>
        <div className="blog-content-wrapper">
          <h1 className="blog-title">Blog not found!</h1>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="main-background"></div>
      <div className="blog-content-wrapper">
        <div
          className="bg-cover bg-center bg-no-repeat h-full w-full"
          style={{
            backgroundImage: `url(${background})`,
          }}>

          <div className="blog-header">
            <h1 className="blog-title">{blog.title}</h1>
            <div className="blog-author-info">
              <div className="author-profile">
                <img className="profile-image" src={blog.image} alt="Author" />

                <div className="author-details">
                  <p className="author-name">{blog.author?.name || "Anonymous"}</p>
                  <p className="author-date">
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Edit Button */}
              <Link to={`/write/${blog.id}`}>
                <button className="edit-button">Edit</button>
              </Link>
            </div>
            {/* Interaction Section */}
            <div className="interaction-info">
              {/* Horizontal line above */}
              <div className="horizontal-line"></div>

              {/* Likes and Comments */}
              <div className="likes-comments">
                <div className="text-[#FFB5B5] flex items-center space-x-2">
                  {/* <img src="like.png" className="h-4" alt="likes" /> */}
                  <AiFillLike />
                  <p>{blog.likes || 0}</p>
                </div>
                <div className="text-[#FFB5B5] flex items-center space-x-2">
                  {/* <img src="comments.png" className="h-4" alt="comments" /> */}
                  <FaComment />

                  <p>{blog.comments.length}</p>
                </div>
              </div>

              {/* Horizontal line below */}
              <div className="horizontal-line"></div>
            </div>
          </div>

          <div className="blog-image-section">
            <p className="blog-paragraph">{blog.description}</p>
          </div>

          {/* TODO: Interaction Section is incomplete, add option to add comments and view comments*/}
          <div className="interaction-info">
            <div className="horizontal-line"></div>
          </div>

          {/* Likes and Comments */}
          <div className="likes-comments">
            <div className="text-[#FFB5B5] flex items-center space-x-2">
              <AiFillLike />
              <p>{blog.likes || 0}</p>
            </div>
            <div className="text-[#FFB5B5] flex items-center space-x-2">
              <FaComment />

              <p>{blog.comments.length}</p>
            </div>
          </div>


          <div className="horizontal-line"></div>
        </div>


        {/* Comment Section */}
        <div className="comments-section">
          <div className="comments-header">
            <span>Comments:-</span>
            <span>{blog.comments.length}</span>
          </div>
          <div className="input-section">
            <img className="profile-image" src={profileimage} alt="Author" />
            <input
              type="text"
              placeholder="Type something"
              className="comment-input"
            />
          </div>
          <div className="comment">
            {
              blog.comments.length > 0 ? (
                <div className="comment-container">
                  <img className="profile-image" src={profileimage} alt="Author" />
                  <div className="comment-details">
                    <h3 className="username">
                      {blog.comments?.[0].user.name || "Username"}
                    </h3>
                    <p className="comment-text">
                      {blog.comments?.[0].content}
                    </p>
                    <div className="likes-comments">
                      <div className="text-[#FFB5B5] flex items-center space-x-2">
                        <AiFillLike />
                        <p>{blog.likes || 0}</p>
                      </div>
                      <div className="text-[#FFB5B5] flex items-center space-x-2">
                        <FaComment />
                        <p>{blog.comments.length}</p>
                      </div>
                      <button className="reply-link">Reply</button>
                    </div>
                  </div>
                  <button className="options-button">⋮</button>
                </div>
              ) : null}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
