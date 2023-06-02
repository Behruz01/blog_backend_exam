const Io = require("../utils/io");
const Likes = new Io("./db/likes.json");

const likeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;

    const likes = await Likes.read();
    const findLike = likes.find((l) => l.user_id == user_id && l.blog_id == id);

    let data;
    if (findLike) {
      data = likes.filter((l) => l.user_id !== user_id || l.blog_id != id);
    } else {
      data = [...likes, { user_id, blog_id: id }];
    }

    await Likes.write(data);

    res.status(201).json({ message: "like" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Serveral error" });
  }
};

module.exports = likeBlog;
