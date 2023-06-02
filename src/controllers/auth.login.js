const Io = require("../utils/io");
const Users = new Io("./db/users.json");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

// login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await Users.read();

    const schema = Joi.object({
      username: Joi.string().alphanum().required(),
      password: Joi.string().alphanum().required(),
    });
    const { error } = schema.validate({ username, password });
    // console.log(error);

    const findUser = users.find((user) => user.username == username);
    if (!findUser)
      return res
        .status(403)
        .json({ message: "Incorrect username or password" });

    const comparePass = await bcrypt.compare(password, findUser.password);
    if (!comparePass)
      return res
        .status(403)
        .json({ message: "Incorrect username or password" });

    const token = jwt.sign({ id: findUser.id }, process.env.SECRET_KEY);
    res.cookie("token", token, {
      maxAge: 86400000,
    });
    res.status(200).json({ massage: "Success", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = login;
