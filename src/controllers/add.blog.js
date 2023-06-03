const { v4: uuid } = require("uuid");
const Io = require("../utils/io");
const Blogs = new Io("./db/blogs.json");
const Blog = require("../models/blog.js");
// blog qo'shish
const addBlog = async (req, res) => {
  const { title, desc } = req.body;

  const { image } = req.files;
  // image ga nom berish
  const imageName = `${uuid()}.${image.mimetype.split("/")[1]}`;
  // imageni yuklash
  image.mv(`${process.cwd()}/uploads/${imageName}`);

  const {user_id} = req.user;
  const blogs = await Blogs.read();

  const id = (blogs[blogs.length - 1]?.id || 0) + 1;

  const date = new Date();
  const newBlog = new Blog(id, imageName, title, desc, date, user_id);

  const data = blogs.length ? [...blogs, newBlog] : [newBlog];
  Blogs.write(data);
  res.status(201).json({ message: "Created successfuly" });
};

module.exports = addBlog;
