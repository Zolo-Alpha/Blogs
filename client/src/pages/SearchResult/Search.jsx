import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import PostCard from "../../components/Home/Card/PostCard";
import apiClient from "../../helper/apiClient";

const Search = () => {
    const { term } = useParams();
    const [data, setData] = useState([]); // Store all blogs data
    const [filteredBlogs, setFilteredBlogs] = useState([]); // Store filtered blogs

    // Fetch data from the API on component mount
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await apiClient.get("http://localhost:3000/blog/"); // Fetch all blogs
                setData(response.data); // Set the blogs data
                console.log("Response data: ", response.data);
            } catch (error) {
                console.error("There was an error fetching the blogs!", error); // Handle the error
            }
        };

        fetchBlogs(); 
    }, []);

    // Filter blogs based on the search term whenever it changes
    useEffect(() => {
        const filtered = data.filter((blog) =>
            blog.title.toLowerCase().includes(term.toLowerCase()) ||
            blog.description.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredBlogs(filtered);
    }, [term, data]); // Run this effect whenever term or data changes

    return (
        <>
            <Navbar />
            <div className="flex flex-col p-10 justify-center">
                <h1 className="text-5xl mb-12 font-bold text-white text-center">
                    Search Results for: {term}
                </h1>
                <div id="topPics">
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((blog) => (
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
                        <p className="text-white text-center text-4xl">No results found for "{term}".</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Search;
