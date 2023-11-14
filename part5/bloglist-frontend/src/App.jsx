import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import LogoutUser from "./components/Logout";
import BlogAddingForm from "./components/BlogAddingForm";
import Notification from "./components/Notification";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    failure: false,
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    console.log("Blogs retrieved");
    setNotification({ message: "Retrieved the blogs", failure: false });
    setTimeout(() => {
      setNotification({
        message: null,
        failure: false,
      });
    }, 5000);
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
      <div>
        <Notification {...notification} />
        <h2>Blogs</h2>
        <LoginForm setUser={setUser} setNotification={setNotification} />
      </div>
    );
  } else {
    return (
      <div>
        <Notification {...notification} />
        <h2>Blogs</h2>
        <div>
          <p>Welcome back, {user.name}</p>
          <LogoutUser setUser={setUser} setNotification={setNotification} />
        </div>
        <BlogAddingForm
          Token={user.token}
          blogs={blogs}
          setBlogs={setBlogs}
          setNotification={setNotification}
        />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
};

export default App;
