const Io = require("../utils/io");
const Blogs = new Io("./db/blogs.json");

// administratsiya
const adminBlog = async (req, res) => {
  try {
    const verify = req.verify;
    const { id } = req.params;
    const blogs = await Blogs.read();
    if (verify == true) {
      const findBlog = blogs.find((blog) => blog.id == id);

      if (!findBlog) {
        res.status(400).json({ message: "Blog not found" });
        return;
      }
      const data = blogs.map((blog) =>
        blog.id == id ? { ...blog, verify: true } : blog
      );
      Blogs.write(data);
      res.status(200).json({ message: findBlog });
      return;
    }
    res.status(400).json({
      message: "Kechirasiz bu blogni ko'rish uchun adminning ruxsati kerak!",
    });
  } catch (error) {
    res.status(400).json({ message: "Serverda xatolik bor!" });
  }
};
module.exports = adminBlog;
