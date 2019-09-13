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
let inputType = "";
let inputName = "";
let choice1 = "";
let choice2 = "";
let choice3 = "";
let choice4 = "";

//array containing questions and their choices
const questionAndChoices = [{
  question: 'About how many Filipino ethnolinguistic groups currently exist?',
  inputType: 'radio',
  inputName: 'ethnolinguistic-group',
  choice1: '1',
  choice2: '365',
  choice3: '175',
  choice4: '25'
}, {
  question: 'What are the three major regions of the Philippines?',
  inputType: 'checkbox',
  inputName: 'regions',
  choice1: 'Mindoro',
  choice2: 'Luzon',
  choice3: 'Mindanao',
  choice4: 'Visayas'
}, {
  question: 'Who led the first Spanish expedition to the Philippines?',
  inputType: 'radio',
  inputName: 'conquistador',
  choice1: 'Karimul Makhdum',
  choice2: 'Zheng He',
  choice3: 'Ferdinand Magellan',
  choice4: 'Miguel Lopez de Legazpi'
}, {
  question: 'Which Filipino ethnolinguistic group is the most well-known?',
  inputType: 'radio',
  inputName: 'famous-group',
  choice1: "T'boli",
  choice2: 'Tagalog',
  choice3: 'Tutsi',
  choice4: 'Uyghurs'
}, {
  question: 'The Philippines is a(n):',
  inputType: 'radio',
  inputName: 'land-type',
  choice1: 'peninsula or land mostly surrounded by water',
  choice2: 'isthmus or narrow land connecting two larger areas across water',
  choice3: 'fjord or long, narrow inlet with steep sides or cliffs',
  choice4: 'archipelago or group of islands'
}, {
  question: 'Which of these places in the Philippines is listed as a UNESCO World Heritage Site?',
  inputType: 'radio',
  inputName: 'UNESCO',
  choice1: 'Borubudur Temple Compounds',
  choice2: 'Rice Terraces of Philippine Cordilleras',
  choice3: 'Plaza Moraga',
  choice4: 'Banaue Rice Terraces'
}, {
  question: 'Which Filipino groups resisted Spanish expansion the longest?',
  inputType: 'checkbox',
  inputName: 'resist',
  choice1: 'Mestizos',
  choice2: 'Highlanders',
  choice3: 'Muslim Sultanates',
  choice4: 'Lowlanders'
}, {
  question: 'How long did the Spanish Colonial Era last?',
  inputType: 'radio',
  inputName: 'colonial-era',
  choice1: '1000 years',
  choice2: '333 years',
  choice3: '42 days',
  choice4: '12 weeks'
}, {
  question: 'The Laguna Copperplate Inscription is important because:',
  inputType: 'checkbox',
  inputName: 'LCI',
  choice1: "it's the earliest written record found in the Philippines",
  choice2: "it's written by Jose Rizal",
  choice3: "it proves the existence of ancient aliens",
  choice4: "it provides evidence of cultural exchange due to different languages used"
}, {
  question: 'Who is credited for bringing Islam to the Philippines?',
  inputType: 'radio',
  inputName: 'islam',
  choice1: "An-Nasir Salah ad-Din Yusuf ibn Ayyub",
  choice2: "Abdul Alhazred",
  choice3: "Karimul Makhdum",
  choice4: "Muhammad Ali"
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
  res.render("quiz", {
    randomQuestion: randomQuestion,
    randomChoices: randomChoices,
    questionNumber: questionNumber,
    inputType: inputType,
    inputName: inputName,
    choice1: choice1,
    choice2: choice2,
    choice3: choice3,
    choice4: choice4
  });
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
    inputType = questionAndChoices[i].inputType;
    inputName = questionAndChoices[i].inputName;
    choice1 = questionAndChoices[i].choice1;
    choice2 = questionAndChoices[i].choice2;
    choice3 = questionAndChoices[i].choice3;
    choice4 = questionAndChoices[i].choice4;
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
