const Io = require("../utils/io");
const Blogs = new Io("./db/blogs.json");

// read blogs
const read = async (req, res) => {
  try {
    const blogs = await Blogs.read();
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = read;
