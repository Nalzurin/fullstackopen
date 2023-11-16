import { useState } from "react";
import blogs from "../services/blogs";
const Blog = ({ user, blog, blogsList, setBlogs, sortBlogs }) => {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const setVisibility = () => {
    setVisible(!visible);
  };
  const likeBlog = async () => {
    const newBlog = await blogs.likeBlog({ blog });

    setBlogs(
      blogsList.map((blog) => {
        if (blog.id === newBlog.id) {
          blog.likes = newBlog.likes;
        }
      })
    );
    sortBlogs(blogsList);
  };

  const deleteBlog = async () => {
    const token = user.token;
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      await blogs.deleteBlog({ token, blog });
      setBlogs(blogsList.filter((elem) => elem.id !== blog.id));
    }
  };

  if (visible) {
    return (
      <div style={blogStyle}>
        <p>
          {blog.title} by {blog.author}
        </p>
        <input type="button" onClick={setVisibility} value="Hide"></input>
        <p>URL: {blog.url}</p>
        <p>Likes: {blog.likes}</p>
        <input type="button" onClick={likeBlog} value="Like"></input>
        <p>Added by: {blog.user.name}</p>
        {blog.user.username === user.username ? (
          <input type="button" onClick={deleteBlog} value="Delete Blog"></input>
        ) : (
          ""
        )}
      </div>
    );
  } else {
    return (
      <div style={blogStyle}>
        <p>
          {blog.title} by {blog.author}
        </p>
        <input type="button" onClick={setVisibility} value="Show"></input>
      </div>
    );
  }
};

export default Blog;
