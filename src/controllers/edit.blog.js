const { v4: uuid } = require("uuid");
const Io = require("../utils/io");
const Blogs = new Io("./db/blogs.json");
const Joi = require("joi");


const editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;
    const { user_id } = req.user;
    const { image } = req.files;

    const schema = Joi.object({
      title: Joi.string().required(),
      desc: Joi.string().required(),
    });
    const { error } = schema.validate({ title, desc });
    if (error) {
      res.status(401).json({ message: error.message });
      return;
    }

    // image ga nom berish
    const imageName = `${uuid()}.${image.mimetype.split("/")[1]}`;
    // imageni yuklash
    image.mv(`${process.cwd()}/uploads/${imageName}`);

    const blogs = await Blogs.read();
    const findBlog = blogs.find((blog) => blog.id == id);
    if (!findBlog) {
      res.writeHead(404);
      res.end(JSON.stringify({ massage: "Blog not found" }));
      return;
    }

    if (findBlog.user_id !== user_id) {
      res
        .status(400)
        .json({ message: "You are not authorized to edite this blog" });
      return;
    }
    const data = blogs.map((blog) =>
      blog.id == id
        ? { ...blog, title: title, description: desc, image: imageName }
        : blog
    );
    Blogs.write(data);
    res.status(201).json({ message: "Updated blog" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = editBlog;
