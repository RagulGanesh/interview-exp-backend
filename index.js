const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors=require('cors');
const saltRounds = 10;
const User = require("./models/User");
const Post = require("./models/Post");

const app = express();


// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });
app.use(cors());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
});


//User - Login
app.post("/login", async function (req, res) {
  const rollno = req.body.rollno;
  const password = req.body.password;

  const userDoc = await User.findOne({ rollno: rollno });
  const pass = bcrypt.compareSync(password, userDoc.password);
  if (pass) {
    res.send("Success");
  } else {
    res.send("False");
  }

});


//User-register
app.post("/register", function (req, res) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    const newUser = new User({
      rollno: req.body.rollno,
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    newUser.save();
  });
});

//Blog-create
app.post("/create",function(req, res){
  const newPost = Post({
    rollno: 106,
    username: "username",
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags.split(",")
  });

  newPost.save();

})

// app.patch("/",function(req, res){
//   Post.update(
//     {title: articleTitle},
//     {content: req.body.newContent},
//     function(err){
//       if (!err){
//         res.send("Successfully updated selected article.");
//       } else {
//         res.send(err);
//       }
//     });
// })

app.listen(4000, function () {
  console.log("Server started on port 4000.");
});
