const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const app = express();
const port = 3000;
// middleware

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
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authRoutes);
