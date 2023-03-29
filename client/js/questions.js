"use strict"
var questionData = [{
   
    question: 'Is het proces handmatig en repetitief',
    choice1: 'Ja',
    choice2: 'Nee',
   
},
{
  
    question: "Is het proces op regels gebaseerd?",
    choice1: "Ja",
    choice2: "Grotendeels wel",
    choice3: "Grotendeels niet",
    choice4: "Nee",
   
},
{
    question: "Gaat het proces of de applicaties die worden gebruikt in de komende 6 maanden drastisch wijzigen?",
    choice1: "Ja",
    choice2: "Nee",
},
{
    
    question: "Hoe zou je die input voor het proces typeren?",
    choice1: "Digitaal en gestructureerd",
    choice2: "Digitaal en niet gestructureerd",
    choice3: "Niet digitaal en gestructureerd",
    choice4: "Niet digitaal en ongestructureerd",
    
    
},
{
    
    question: "Kan de input gestructureerd worden?",
    choice1: "Ja",
    choice2: "Nee",
    
},

];

console.log(questionData + "test");
// const scan = document.getElementById("scan");
const questions= document.getElementById("questions");
// const answers= document.getSelectorAll(".answers");

const question = document.getElementById("question_title");
const choice1 = document.getElementById("choice1_text")
const choice2  = document.getElementById("choice2_text")
const choice3 = document.getElementById("choice3_text")
const choice4  = document.getElementById("choice4_text")
const nextBtn = document.getElementById("next_btn");

let currentQuestion = 0;
let score = 0 ;
let questionNumber = 1;


nextBtn.onclick = () => {
    if (currentQuestion < questionData.length - 1) { // als de vragen teller hoger is dan de aantal vragen
        currentQuestion++; //vragen teller erbij
        questionNumber++; //vraag nummer erbij
        loadScan(currentQuestion);
        
    }
}

console.log(currentQuestion);
function loadScan(currentQuestion) {
const quest = document.querySelector(".question_title");
let question_title = '<h1 id="question_title">'+questionData[currentQuestion].question+'</h1>';
let choicestag1 = "<input type='radio' id='choice1' name='answer' class='answer'>"+"<label for='choice1'>"+questionData[currentQuestion].choice1+"</label><br>";
let choicestag2 = "<input type='radio' id='choice2' name='answer' class='answer'>"+"<label for='choice2'>"+questionData[currentQuestion].choice2+"</label><br>";
let choicestag3 = "<input type='radio' id='choice3' name='answer' class='answer'>"+"<label for='choice3'>"+questionData[currentQuestion].choice3+"</label><br>";
let choicestag4 = "<input type='radio' id='choice4' name='answer' class='answer'>"+"<label for='choice4'>"+questionData[currentQuestion].choice4+"</label><br>";

const choice1 = document.querySelector("#choice1");
const choice2 = document.querySelector("#choice2");
const choice3 = document.querySelector("#choice3");
const choice4 = document.querySelector("#choice4");


quest.innerHTML = question_title;

if (questionData[currentQuestion].choice1 !== undefined) {
    choice1.innerHTML = choicestag1;
  }
  
  if (questionData[currentQuestion].choice2 !== undefined) {
    choice2.innerHTML = choicestag2;
  }
  
  if (questionData[currentQuestion].choice3 !== undefined) {
    choice3.innerHTML= choicestag3;
  
  if (questionData[currentQuestion].choice4 !== undefined) {
    choice4.innerHTML = choicestag4;
  }
  

  }
}





loadScan()