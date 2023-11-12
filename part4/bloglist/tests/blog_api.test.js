const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("../utils/api_test_helper");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 13,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];
var token;
beforeEach(async () => {
  await Blog.deleteMany({});
  const user = {
    username: "root",
    password: "salainen",
  };
  const login = await api.post("/api/login").send(user);
  token = login.body.token;
  console.log(login.body);
  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("Blog viewing functionality", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("All blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("blogs contain property id", async () => {
    const response = await api.get("/api/blogs").expect(200);
    const contents = response.body;
    contents.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });

  test("blog with a certain id exists", async () => {
    const Blogs = await helper.blogsInDb();
    const blog = Blogs[0];
    const response = await api.get(`/api/blogs/${blog.id}`).expect(200);
    expect(response.body).toEqual(blog);
  });

  test("fails with 404 if blog with id doesn't exist", async () => {
    const id = "5a422bc61b54a67aa34d17fc";
    await api.get(`/api/blogs/${id}`).expect(404);
  });
});

describe("Blog adding functionality", () => {
  test("new blog gets added correctly", async () => {
    const newBlog = {
      _id: "5a422bc61b54a676414d17dc",
      title: "Test Title",
      author: "Olexandr O. Karpenko",
      url: "https://www.youtube.com/",
      likes: 1999,
      __v: 0,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const titles = response.body.map((blog) => blog.title);

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain("Test Title");
  });

  test("blog without a 'likes' property defaults to 0(zero) likes", async () => {
    const newBlog = {
      _id: "5a422bc61b54a676414aa7dc",
      title: "Zero Likes Blogs",
      author: "Olexandr O. Karpenko",
      url: "https://www.youtube.com/",
      __v: 0,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const titles = response.body.map((blog) => blog.title);

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain("Zero Likes Blogs");
  });

  test("post request without a 'title' or 'url' in the request data returns 400 Bad Request", async () => {
    const newBlog = {
      _id: "5a422bc61b54a676414ad7dc",
      author: "Olexandr O. Karpenko",
      __v: 0,
    };
    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("Blog deleting functionality", () => {
  test("delete requests succeeds with status code 204 if id is valid", async () => {
    const BlogsAtStart = await helper.blogsInDb();
    const blogToDelete = BlogsAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const BlogsAtEnd = await helper.blogsInDb();

    expect(BlogsAtEnd).toHaveLength(BlogsAtStart.length - 1);

    const urls = BlogsAtEnd.map((r) => r.url);

    expect(urls).not.toContain(blogToDelete.url);
  });
});

describe("Blog updating functionality", () => {
  test("update request succeeds with status code 200 if id is valid", async () => {
    const BlogsAtStart = await helper.blogsInDb();
    const blogToUpdate = BlogsAtStart[0];
    blogToUpdate.likes = 150;
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);
    const BlogsAtEnd = await helper.blogsInDb();

    expect(BlogsAtEnd).toHaveLength(BlogsAtStart.length);

    const likes = BlogsAtEnd.map((r) => r.likes);

    expect(likes).toContain(150);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
