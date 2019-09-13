// jshint esversion: 6
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

// quiz variables
let questionNumber = 0;
let answerScore = 0;
let randomQuestion = "Before you begin...";
let randomChoices = "It's best that you read through the rest of the website first. It's no fun simply googling the answers. Good luck! 😀";

//array containing questions and their choices
const questionAndChoices = [{
  question: 'About how many Filipino ethnolinguistic groups currently exist?',
  choices: `<input class='people' type='radio' name='ethnolinguistic-number' value='a'> 1<br>
    <input class='people' type='radio' name='ethnolinguistic-number' value='b'> 365<br>
    <input class='people' type='radio' name='ethnolinguistic-number' value='c'> 175<br>
    <input class='people' type='radio' name='ethnolinguistic-number' value='d'> 25`
}, {
  question: 'What are the three major regions of the Philippines?',
  choices: `<input type='checkbox' name='regions' value='a'> Mindoro<br>
      <input type='checkbox' name='regions' value='b'> Luzon<br>
      <input type='checkbox' name='regions' value='c'> Mindanao<br>
      <input type='checkbox' name='regions' value='d'> Visayas`
}, {
  question: 'Who led the first Spanish expedition to the Philippines?',
  choices: `<input type='radio' name='conquistador' value='a'> Karimul Makhdum<br>
      <input type='radio' name='conquistador' value='b'> Zheng He<br>
      <input type='radio' name='conquistador' value='c'> Ferdinand Magellan<br>
      <input type='radio' name='conquistador' value='d'> Miguel Lopez de Legazpi`
}, {
  question: 'Which Filipino ethnolinguistic group is the most well-known?',
  choices: `<input type='radio' name='famous-group' value='a'> T'boli<br>
      <input type='radio' name='famous-group' value='b'> Tagalog<br>
      <input type='radio' name='famous-group' value='c'> Tutsi<br>
      <input type='radio' name='famous-group' value='d'> Uyghurs`
}, {
  question: 'The Philippines is a(n):',
  choices: `<input type='radio' name='land-type' value='a'> peninsula or land mostly surrounded by water <br>
      <input type='radio' name='land-type' value='b'> isthmus or narrow land connecting two larger areas across water<br>
      <input type='radio' name='land-type' value='c'> fjord or long, narrow inlet with steep sides or cliffs<br>
      <input type='radio' name='land-type' value='d'> archipelago or group of islands`
}, {
  question: 'Which of these places in the Philippines is listed as a UNESCO World Heritage Site?',
  choices: `<input type='radio' name='UNESCO' value='a'> Borubudur Temple Compounds<br>
      <input type='radio' name='UNESCO' value='b'> Rice Terraces of Philippine Cordilleras<br>
      <input type='radio' name='UNESCO' value='c'> Plaza Moraga<br>
      <input type='radio' name='UNESCO' value='d'> Banaue Rice Terraces`
}, {
  question: 'Which Filipino groups resisted Spanish expansion the longest?',
  choices: `<input type='checkbox' name='resist' value='a'> Mestizos<br>
      <input type='checkbox' name='resist' value='b'> Highlanders<br>
      <input type='checkbox' name='resist' value='c'> Muslim Sultanates<br>
      <input type='checkbox' name='resist' value='d'> Lowlanders`
}, {
  question: 'How long did the Spanish Colonial Era last?',
  choices: `<input type='radio' name='colonial-era' value='a'> 1000 years<br>
      <input type='radio' name='colonial-era' value='b'> 333 years<br>
      <input type='radio' name='colonial-era' value='c'> 42 days<br>
      <input type='radio' name='colonial-era' value='d'> 12 weeks`
}, {
  question: 'The Laguna Copperplate Inscription is important because:',
  choices: `<input type='checkbox' name='LCI' value='a'> it's the earliest written record found in the Philippines<br>
      <input type='checkbox' name='LCI' value='b'>it's written by Jose Rizal <br>
      <input type='checkbox' name='LCI' value='c'> it proves the existence of ancient aliens<br>
      <input type='checkbox' name='LCI' value='d'> it provides evidence of cultural exchange due to different languages used<br>`
}, {
  question: 'Who is credited for bringing Islam to the Philippines?',
  choices: `<input type='radio' name='islam' value='a'>An-Nasir Salah ad-Din Yusuf ibn Ayyub <br>
      <input type='radio' name='islam' value='b'> Abdul Alhazred<br>
      <input type='radio' name='islam' value='c'> Karimul Makhdum<br>
      <input type='radio' name='islam' value='d'> Muhammad Ali`
}];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/lowland", function(req, res) {
  res.render("lowland");
});

app.get("/highland", function(req, res) {
  res.render("highland");
});

app.get("/quiz", function(req, res) {
  res.render("quiz", {randomQuestion: randomQuestion,
  randomChoices: randomChoices, questionNumber: questionNumber});
});

app.post("/quiz", function(req, res) {
  //randomly generate an integer between 0 and length of the array
  let i = Math.floor(Math.random() * questionAndChoices.length);

  //checks to see if array is empty
  //if not empty, randomly choose and render a question and choices object
  //then remove that object from the array
  if (!questionAndChoices || !questionAndChoices.length) {
    randomQuestion = "You've finished!";
    randomChoices = "Congratulations!";
  } else {
    randomQuestion = questionAndChoices[i].question;
    randomChoices = questionAndChoices[i].choices;
    questionAndChoices.splice(i, 1);
    questionNumber++;
    console.log(questionNumber);
  }

  res.redirect('/quiz');
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/further-reading", function(req, res) {
  res.render("further-reading");
});

app.listen('3000', function() {
  console.log("Server started on port 3000");
});
