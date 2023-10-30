const dummy = () => {
  return 1;
};
const totalLikes = (blogs) => {
  if (blogs.length === 1) {
    return blogs[0].likes;
  }
  var totalLikes = 0;
  blogs.map((blog) => (totalLikes = totalLikes + blog.likes));
  return totalLikes;
};
const favouriteBlog = (blogs) => {
  if (blogs.length === 1) {
    const Obj = {
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes,
    };
    return Obj;
  }
  var favBlog = { likes: 0 };
  blogs.forEach((blog) => {
    if (blog.likes > favBlog.likes) {
      favBlog = blog;
    }
  });
  const Obj = {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes,
  };
  return Obj;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 1) {
    const Obj = {
      author: blogs[0].author,
      blogs: 1,
    };
    return Obj;
  }
  var map = new Map();

  blogs.forEach((blog) => {
    if (map.has(blog.author)) {
      map.set(blog.author, map.get(blog.author) + 1);
    } else {
      map.set(blog.author, 1);
    }
  });
  var author = blogs[0].author;
  map.forEach((value, key) => {
    if (map.get(author) < value) {
      author = key;
    }
  });
  const Obj = {
    author: author,
    blogs: map.get(author),
  };
  return Obj;
};

const mostLikes = (blogs) => {
  if (blogs.length === 1) {
    const Obj = {
      author: blogs[0].author,
      likes: blogs[0].likes,
    };
    return Obj;
  }
  var map = new Map();

  blogs.forEach((blog) => {
    if (map.has(blog.author)) {
      map.set(blog.author, map.get(blog.author) + blog.likes);
    } else {
      map.set(blog.author, blog.likes);
    }
  });
  var author = blogs[0].author;
  map.forEach((value, key) => {
    if (map.get(author) < value) {
      author = key;
    }
  });
  const Obj = {
    author: author,
    likes: map.get(author),
  };
  return Obj;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
