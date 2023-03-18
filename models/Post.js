const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true
});

const postSchema = new mongoose.Schema({
    rollno : {
        type : Number,
        unique : true,
        required : true
    },
    username : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    tags: [{
        type: String,
        required : true,
    }],
    content : {
        type : String,
        required : true,
    },
    upvotes : {
        type : Number,
        default : 0,
    }, 
    createdAt : { type : Date, default: Date.now },

});

const Post = mongoose.model("Post", postSchema);

module.exports=Post