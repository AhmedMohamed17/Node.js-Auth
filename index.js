const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware.js");
const app = express();
const port = 3000;
// middleware
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = "mongodb://127.0.0.1:27017/ninjaTest";
// const dbURI =
//   "mongodb+srv://ahmedmohamed7sayed:Test1234@cluster0.opkel12.mongodb.net/node-auth";
mongoose
  .connect(dbURI)
  .then(() => app.listen(port))
  .catch((err) => console.log("error ya ahmed =", err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);

// app.get("/set-cookies", (req, res) => {
//   // res.setHeader("Set-cookie", "newUser=true");
//   res.cookie("newUser", false);
//   res.cookie("isEmployee", true, {
//     maxAge: 1000 * 60 * 60 * 24,
//     httpOnly: true,
//   });

//   res.send("you got the cookies");
// });

// app.get("/read-cookie", (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies);
//   res.json(cookies);
// });
