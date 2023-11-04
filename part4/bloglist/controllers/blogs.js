const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");
require("express-async-errors");

blogsRouter.get("/", async (request, response) => {
  logger.info("Fetching all blogs");
  const blogs = await Blog.find({});
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

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  if (!blog.url || !blog.title) {
    response.status(400).end();
  }
  if (!blog.likes) {
    blog.likes = 0;
  }
  logger.info("Adding blog:", blog);
  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const note = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, note, {
    new: true,
    runValidators: true,
    context: "query",
  });
  response.status(200).json(updatedBlog);
});
module.exports = blogsRouter;
