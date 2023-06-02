const { Router } = require("express");
const router = Router();
const isAuth = require("../middlewares/isAuth");

const addBlog = require("../controllers/add.blog");
const readBlogs = require("../controllers/read.blogs");
const editBlog = require("../controllers/edit.blog");
const deleteBlog = require("../controllers/delete.blog");
const likeBlog = require("../controllers/like.blog");
const views = require("../controllers/views.blog");
const isAdmin = require("../middlewares/isAdmin");
const adminBlog = require("../controllers/admin.blog");

router.post("/blog/add", isAuth, addBlog);
router.get("/blog/read", isAuth, readBlogs);
router.put("/blog/:id", isAuth, editBlog);
router.delete("/blog/:id", isAuth, deleteBlog);
router.post("/blog/like/:id", isAuth, likeBlog);
router.post("/blog/views/:id", isAuth, views);
router.post("/admin/:id", isAdmin, adminBlog);

module.exports = router;
