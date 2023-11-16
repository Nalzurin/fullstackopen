import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import LogoutUser from "./components/Logout";
import BlogAddingForm from "./components/BlogAddingForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    failure: false,
  });

  function sortBlogs(blogs) {
    console.log("sorting blogs", blogs);
    const sortedBlogs = [...blogs].sort((a, b) => {
      return b.likes - a.likes;
    });
    setBlogs(sortedBlogs);
  }
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
      sortBlogs(blogs);
    });

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
        <Togglable buttonLabel="New Blog">
          <BlogAddingForm
            Token={user.token}
            blogs={blogs}
            setBlogs={setBlogs}
            setNotification={setNotification}
          />
        </Togglable>

        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            blogsList={blogs}
            user={user}
            setBlogs={setBlogs}
            sortBlogs={sortBlogs}
          />
        ))}
      </div>
    );
  }
};

export default App;
