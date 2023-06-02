require("dotenv").config();
const express = require("express");
const app = express();

const cookie = require("cookie-parser");
app.use(cookie());

const fileUpload = require("express-fileupload");
app.use(fileUpload());

app.use(express.static(process.cwd() + "/uploads"));

const routes = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use([routes]);

PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portida ishga tushdi!`);
});
