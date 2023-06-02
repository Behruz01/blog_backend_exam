const Io = require("../utils/io");
const Blogs = new Io("./db/blogs.json");
const Views = new Io("./db/views.json");

const views = async (req, res) => {
  try {
    const { id } = req.params; // blogning id si
    const { user_id } = req.user; // foydalanuvchi id si

    const blogs = await Blogs.read(); // barcha bloglar
    const findBlog = blogs.find((b) => b.id == id); // berilgan id li blogni topish

    if (!findBlog) {
      return res.status(404).json({ message: "Bunday blog mavjud emas" }); // agar blog topilmagan bo'lsa 404 xatosi qaytarish
    }

    const views = await Views.read(); // barcha ko'rishlar
    const findViews = views.find(
      (v) => v.user_id == user_id && v.blog_id == id
    ); // foydalanuvchining shu blogni ko'rishini tekshirish

    let data;
    if (!findViews) {
      data = [...views, { user_id, blog_id: id }]; // yangi ko'rish qo'shish
    } else {
      data = views; // ko'rishlar ro'yxati o'zgartirilmagan
    }
    await Views.write(data); // ko'rishlar ro'yxatini yangilash

    res.status(201).json({ message: "Ko'rishlar soni oshirildi" });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi sodir bo'ldi" });
  }
};

module.exports = views;
