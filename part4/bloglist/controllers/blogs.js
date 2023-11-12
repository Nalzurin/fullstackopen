const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");
const middleware = require("../utils/middleware");
require("express-async-errors");

blogsRouter.get("/", async (request, response) => {
  logger.info("Fetching all blogs");
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  logger.info(`Fetching blog with id: ${id}`);
  const blog = await Blog.findById(id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const blog = new Blog(request.body);
  const user = request.user;

  if (!blog.url || !blog.title) {
    response.status(400).end();
  }
  if (!blog.likes) {
    blog.likes = 0;
  }

  blog.user = user.id;

  logger.info("Adding blog:", blog);

  const result = await blog.save();

  user.blogs = user.blogs.concat(blog._id);

  await user.save();

  response.status(201).json(result);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(401).json({ error: "blog doesn't exist" });
    }
    const user = request.user;

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: "invalid user" });
    }
    await Blog.deleteOne(blog);
    await User.findOneAndUpdate(user, { $pull: { blogs: blog._id } });
    response.status(204).end();
  }
);

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });
  response.status(200).json(updatedBlog);
});
module.exports = blogsRouter;
