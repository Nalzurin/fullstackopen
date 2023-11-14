import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import LogoutUser from "./components/Logout";
import BlogAddingForm from "./components/BlogAddingForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  if (user === null) {
    return (
      <>
        <h2>Blogs</h2>
        <LoginForm setUser={setUser} />
      </>
    );
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <div>
        <p>Welcome back, {user.name}</p>
        <LogoutUser setUser={setUser}/>
        </div>
        <BlogAddingForm Token={user.token} blogs={blogs} setBlogs={setBlogs}/>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
       
      </div>
    );
  }
};

export default App;
