import { useState } from "react";
import blogService from "../services/blogs";
export default function BlogAddingForm({ Token, blogs, setBlogs }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
      };
      const result = await blogService.addBlog({ Token, newBlog });
      console.log(result);
      setTitle("");
      setAuthor("");
      setUrl("");
      setBlogs(blogs.concat(result));
    } catch (exception) {
      console.log(exception.message);
    }
  };
  return (
    <div>
      <form onSubmit={submit}>
        <h2>Add new blog</h2>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            name="title"
          ></input>
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            name="author"
          ></input>
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            name="url"
          ></input>
        </div>
        <input type="submit" value="Add"></input>
      </form>
    </div>
  );
}
