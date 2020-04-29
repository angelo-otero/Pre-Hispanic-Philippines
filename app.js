// jshint esversion: 6
require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_PASSWORD, { useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

const leaderboardSchema = new mongoose.Schema ({
  name: String,
  score: Number
});

const User = mongoose.model("User", leaderboardSchema);

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
const correctAnswers = [];
const userAnswers = [];
const questions = [];
const choicesArray = [];
const tempArray = [];
let getScoreClicked = 0;


//array containing questions and their choices
const questionAndChoices = [{
  question: 'About how many Filipino ethnolinguistic groups currently exist?',
  inputType: 'radio',
  inputName: 'ethnolinguisticGroup',
  choice1: '1',
  choice2: '365',
  choice3: '175',
  choice4: '25',
  answer: process.env.ANSWER_ONE
}, {
  question: 'What are the three major regions of the Philippines?',
  inputType: 'checkbox',
  inputName: 'regions',
  choice1: 'Mindoro',
  choice2: 'Luzon',
  choice3: 'Mindanao',
  choice4: 'Visayas',
  answer: process.env.ANSWER_TWO.split(',')
}, {
  question: 'Who led the first Spanish expedition to the Philippines?',
  inputType: 'radio',
  inputName: 'conquistador',
  choice1: 'Karimul Makhdum',
  choice2: 'Zheng He',
  choice3: 'Ferdinand Magellan',
  choice4: 'Miguel Lopez de Legazpi',
  answer: process.env.ANSWER_THREE
}, {
  question: 'Which Filipino ethnolinguistic group is the most well-known?',
  inputType: 'radio',
  inputName: 'famousGroup',
  choice1: "T'boli",
  choice2: 'Tagalog',
  choice3: 'Tutsi',
  choice4: 'Uyghurs',
  answer: process.env.ANSWER_FOUR
}, {
  question: 'The Philippines is a(n):',
  inputType: 'radio',
  inputName: 'landType',
  choice1: 'peninsula or land mostly surrounded by water',
  choice2: 'isthmus or narrow land connecting two larger areas across water',
  choice3: 'fjord or long, narrow inlet with steep sides or cliffs',
  choice4: 'archipelago or group of islands',
  answer: process.env.ANSWER_FIVE
}, {
  question: 'Which of these places in the Philippines is listed as a UNESCO World Heritage Site?',
  inputType: 'radio',
  inputName: 'UNESCO',
  choice1: 'Borubudur Temple Compounds',
  choice2: 'Rice Terraces of Philippine Cordilleras',
  choice3: 'Plaza Moraga',
  choice4: 'Banaue Rice Terraces',
  answer: process.env.ANSWER_SIX
}, {
  question: 'Which Filipino groups resisted Spanish expansion the longest?',
  inputType: 'checkbox',
  inputName: 'resist',
  choice1: 'Mestizos',
  choice2: 'Highlanders',
  choice3: 'Muslim Sultanates',
  choice4: 'Lowlanders',
  answer: process.env.ANSWER_SEVEN.split(',')
}, {
  question: 'How long did the Spanish Colonial Era last?',
  inputType: 'radio',
  inputName: 'colonialEra',
  choice1: '1000 years',
  choice2: '333 years',
  choice3: '42 days',
  choice4: '12 weeks',
  answer: process.env.ANSWER_EIGHT
}, {
  question: 'The Laguna Copperplate Inscription is important because:',
  inputType: 'checkbox',
  inputName: 'LCI',
  choice1: "it's the earliest written record found in the Philippines",
  choice2: "it's written by Filipino national hero, Jose Rizal",
  choice3: "it proves the existence of ancient aliens",
  choice4: "it provides evidence of cultural exchange due to different languages used",
  answer: process.env.ANSWER_NINE.split(',')
}, {
  question: 'Who is credited for bringing Islam to the Philippines?',
  inputType: 'radio',
  inputName: 'islam',
  choice1: "An-Nasir Salah ad-Din Yusuf ibn Ayyub",
  choice2: "Abdul Alhazred",
  choice3: "Karimul Makhdum",
  choice4: "Muhammad Ali",
  answer: process.env.ANSWER_TEN
}];


  function restartQuiz () {
    // resets variables to default values
    questionNumber = 0;
    answerScore = 0;
    randomQuestion = "Before you begin...";
    randomChoices = "It's best that you read through the rest of the website first. It's no fun simply googling the answers. Good luck! 😀";

    // add all quiz temporarily removed items back
    tempArray.forEach(function(item){
      questionAndChoices.push(item);
    });
    // removes values from previous quiz
    correctAnswers.splice(0, correctAnswers.length);
    userAnswers.splice(0, userAnswers.length);
    questions.splice(0, questions.length);
    choicesArray.splice(0, choicesArray.length);
    getScoreClicked = 0;
    console.log("restart");
  }


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

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
  User.find({}, function(err, foundUsers){
    res.render("quiz", {
      randomQuestion: randomQuestion,
      randomChoices: randomChoices,
      questionNumber: questionNumber,
      inputType: inputType,
      inputName: inputName,
      choice1: choice1,
      choice2: choice2,
      choice3: choice3,
      choice4: choice4,
      answerScore: answerScore,
      userAnswers: userAnswers,
      correctAnswers: correctAnswers,
      questions: questions,
      choicesArray: choicesArray,
      foundUsers: foundUsers,
      tempArray: tempArray
    });
  });

});

function getScore(correctAnswers, userAnswers, choicesArray, username) {
  // if there is no username, tally up score based on correct answers
  // if score is tallied and user submits a username, save it to database
  getScoreClicked++;
  if(!username) {
    for (let i = 0; i < correctAnswers.length; i++) {
      if (JSON.stringify(correctAnswers[i]) == JSON.stringify(userAnswers[i])) {
        answerScore++;
        console.log(answerScore);
      }
    }
  } else {
    const user = new User({
      name: username,
      score: answerScore * 10
    });
    user.save();
    restartQuiz();
  }
  if (getScoreClicked > 1) {
    restartQuiz();
  }
}



app.post("/quiz", function(req, res) {
  const reqBody = req.body;
  const username = req.body.username;
  //randomly generate an integer between 0 and length of the array
  let i = Math.floor(Math.random() * questionAndChoices.length);
  let obj = {};
  let obj2 = {};

  //checks to see if array is empty
  //if not empty, randomly choose and render a question and its choices object
  //then remove that object from the array
  if (!questionAndChoices || !questionAndChoices.length || questionNumber == 10) {
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

    obj[inputName] = questionAndChoices[i].answer;
    obj2.a = choice1;
    obj2.b = choice2;
    obj2.c = choice3;
    obj2.d = choice4;

    tempArray.push(questionAndChoices[i]);
    correctAnswers.push(obj);
    questionAndChoices.splice(i, 1);
    questions.push(randomQuestion);
    questionNumber++;
    choicesArray.push(obj2);
    console.log(questionNumber);
  }

  if (questionNumber > 1) {
    userAnswers.push(reqBody);
  }

  if (randomQuestion == "You've finished!") {
    getScore(correctAnswers, userAnswers, choicesArray, username);
  }

  res.redirect('/quiz');
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/further-reading", function(req, res) {
  res.render("further-reading");
});

let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfully");
});
