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

// const scan = document.getElementById("scan");
const questions= document.getElementById("questions");
const answers= document.getSelectorAll(".answers");

const question = document.getElementById("question_title");
const choice1_text = document.getElementById("choice1_text")
const choice2_text  = document.getElementById("choice2_text")
const choice3_text  = document.getElementById("choice3_text")
const choice4_text  = document.getElementById("choice4_text")
const nextBtn = document.getElementById("next");

let currentQuestion = 0;
let score = 0 ;
loadScan()

function loadScan() {
deselectAnswers()

const currentQuestionData = data[currentQuestion]

question.innerText = currentQuestionData.question
choice1_text.innerText = currentQuestionData.choice1
choice2_text.innerText = currentQuestionData.choice2
choice3_text.innerText = currentQuestionData.choice3
choice4_text.innerText = currentQuestionData.choice4
}

function deselectAnswers() {
    answers.array.forEach(answer => answer.checked = false);
}

// function getSelected(){
//     let answer = answer.forEach
// }

