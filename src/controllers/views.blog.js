const Io = require("../utils/io");
const Blogs = new Io("./db/blogs.json");
const Views = new Io("./db/views.json");

const views = async (req, res) => {
  try {
    const { id } = req.params; // blogning id si
    const { user_id } = req.user; // foydalanuvchi id si

    const blogs = await Blogs.read(); 
    const findBlog = blogs.find((b) => b.id == id); 

    if (!findBlog) {
      return res.status(404).json({ message: "Bunday blog mavjud emas" });
    }

    const views = await Views.read(); 
    const findViews = views.find(
      (v) => v.user_id == user_id && v.blog_id == id
    );

    let data;
    if (!findViews) {
      data = [...views, { user_id, blog_id: id }]; // yangi ko'rish qo'shish
    } else {
      data = views; // ko'rishlar ro'yxati o'zgartirilmagan
      res.status(201).json({ message: "Ko'rilgan" });
      return;
    }
    await Views.write(data); // ko'rishlar ro'yxatini yangilash

    res.status(201).json({ message: "Ko'rishlar soni oshirildi" });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi sodir bo'ldi" });
  }
};

module.exports = views;
