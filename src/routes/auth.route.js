const { Router } = require("express");
const login = require("../controllers/auth.login");
const register = require("../controllers/auth.register");
const isAuth = require("../middlewares/isAuth");
const router = Router();

router.post("/auth/login",isAuth, login);
router.post("/auth/register",isAuth, register);

module.exports = router;
