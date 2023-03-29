const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
   
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
        
    }
  
];

// Start Quickscan
startQuickscan = () => {
  questionCounter = 0;
  score = 100;
  availableQuesions = [...questions];
  getNewQuestion();

  }

// Display Next Random Question and Answers
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= questions.length) {


    //go to the end page
    return window.location.assign("../html/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${questions.length}`;

  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / questions.length) * 100}%`;

  currentQuestion = availableQuesions[questionCounter];
  question.innerText = currentQuestion.question;

  // Get Answers
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//Get User's Choice
choices.forEach(choice => {
  choice.addEventListener("click", e => {
   
    getNewQuestion();
  });
});



startQuickscan();
