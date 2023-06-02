// const Io = require("../utils/io");
// const Blogs = new Io("./db/blogs.json");

// const deleteBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const blogs = await Blogs.read();
//     const findBlog = blogs.find((blog) => blog.id == id);
//     if (!findBlog) {
//       res.status(400).json({ message: "Blog not found" });
//       return;
//     }
//     const data = blogs.filter((blog) => blog.id != id);
//     Blogs.write(data);
//     res.status(200).json({ message: "Deleted blog" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Serveral error" });
//   }
// };

// module.exports = deleteBlog;
const Io = require("../utils/io");
const Blogs = new Io("./db/blogs.json");

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;

    const blogs = await Blogs.read();
    const findBlog = blogs.find((blog) => blog.id == id);

    if (!findBlog) {
      res.status(400).json({ message: "Blog not found" });
      return;
    }

    if (findBlog.user_id !== user_id) {
      res
        .status(400)
        .json({ message: "You are not authorized to delete this blog" });
      return;
    }

    const data = blogs.filter((blog) => blog.id != id);
    Blogs.write(data);
    res.status(200).json({ message: "Deleted blog" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = deleteBlog;
