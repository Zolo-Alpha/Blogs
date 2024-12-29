import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  headingsPlugin,
  quotePlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  BlockTypeSelect,
  CodeToggle,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertCodeBlock,
  InsertFrontmatter,
  InsertImage,
  InsertSandpack,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
} from "@mdxeditor/editor";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar.jsx";

export default function WriteBlog() {
  const navigate = useNavigate(); // Initialize navigation
  const [md, setMd] = useState("Welcome to Techno Blogs");
  const ref = useRef(null);

  // Check for the token in cookies when the component is mounted
  useEffect(() => {
    // Retrieve the token from cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    // If no token is found, redirect to the login page
    if (!token) {
      navigate("/login");
    }
  }, [navigate]); // Empty dependency array ensures this runs once when the component mounts

  // Handle editor content change
  const handleChange = () => {
    setMd(ref.current.getMarkdown());
    // console.log(md)
    // TODO: Make a request to the server to save the blog content (add a Debounce function to avoid multiple requests)
  };

  return (
    <>
      <Navbar />
      {/* TODO: Add A Header (I Don't know Which one) */}
      <div className="h-[80svh]">
        <MDXEditor
          className="bg-white h-full"
          ref={ref}
          markdown={md}
          plugins={[
            headingsPlugin(),
            quotePlugin(),
            toolbarPlugin({
              toolbarClassName: "my-classname",
              toolbarContents: () => (
                <>
                  {" "}
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <BlockTypeSelect />
                  <CodeToggle />
                  <CreateLink />
                  <DiffSourceToggleWrapper />
                  <InsertCodeBlock />
                  <InsertFrontmatter />
                  <InsertImage />
                  <InsertSandpack />
                  <InsertTable />
                  <InsertThematicBreak />
                  <ListsToggle />
                </>
              ),
            }),
          ]}
          onChange={handleChange}
        />
      </div>
      <Footer />
    </>
  );
}
