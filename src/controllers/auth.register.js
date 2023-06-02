const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const Io = require("../utils/io");
const Users = new Io("./db/users.json");
const UserModel = require("../models/user");
require("dotenv").config();

// register
const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { image } = req.files;

    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
    const { error } = schema.validate({ username, password });
    // console.log(error);

    const users = await Users.read();
    const findUser = users.find((user) => user.username == username);

    if (findUser) {
      res.status(401).json({ message: "Username already exixsts" });
      return;
    }

    // image ga nom berish
    const imageName = `${uuid()}.${image.mimetype.split("/")[1]}`;
    // imageni yuklash
    image.mv(`${process.cwd()}/uploads/${imageName}`);

    const id = uuid();
    const hashPass = await bcrypt.hash(password, 7);

    const newUser = new UserModel(id, username, hashPass, imageName);

    const data = users.length ? [...users, newUser] : [newUser];
    Users.write(data);
    console.log(findUser);
    const token = jwt.sign({ id: id }, process.env.SECRET_KEY);
    // console.log(token);
    res.cookie("token", token, {
      maxAge: 86400000,
    });
    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = register;
