import { useState } from "react";
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };


  const setVisibility = () =>{
    setVisible(!visible);
  }

  if (visible) {
    return (
      <div style={blogStyle}>
        <p>
          {blog.title} by {blog.author}
        </p>
        <input type="button" onClick={setVisibility} value="Hide"></input>
        <p>URL: {blog.url}</p>
        <p>Likes: {blog.likes}</p>
        <p>Added by: {blog.user.name}</p>
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
