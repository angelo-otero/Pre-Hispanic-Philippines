// jshint esversion: 6
const express = require("express");
const ejs = require("ejs");
const vue = require("vue");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

// const quiz = new Vue({
//   el: '#quiz',
//   data: {
//
//   }
// });

app.get("/", function(req,res){
  res.render("index");
});

app.get("/lowland", function(req,res){
  res.render("lowland");
});

app.listen('3000', function(){
  console.log("Server started on port 3000");
});
