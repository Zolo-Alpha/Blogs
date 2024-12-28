import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import PostCard from "../../components/Home/Card/PostCard";
import blogs from "../../../data/blogs";
// In place of importing make axios call through apiclient

const Search = () => {
    const { term } = useParams();
    const [data, setdata] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);

    useEffect(() => {
        const filtered = blogs.filter((blog) =>
            blog.title.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredBlogs(filtered);
    }, [term]);

    return (
        <>
            <Navbar />
            <div className="flex flex-col p-10 justify-center">
                <h1 className="text-5xl mb-12 font-bold text-white text-center">
                    Search Results for : {term}
                </h1>
                <div id="topPics">
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((blog, id) => (
                            <Link to={`/blog/${id}`} key={id}>
                                <PostCard
                                    logo={blog.logo}
                                    image={blog.image}
                                    author={blog.author}
                                    category={blog.category}
                                    title={blog.title}
                                    description={blog.content}
                                    date={new Date(blog.date).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                    })}
                                    likes={blog.likes}
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
