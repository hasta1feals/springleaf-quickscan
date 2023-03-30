const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

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

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= questions.length) {
        console.log(results)
        //go to the end page
        return window.location.assign("../client/eindscherm.html");
    }

    currentQuestion = availableQuesions[questionCounter];
    question.innerText = currentQuestion.question;

    const choice1 = document.querySelector("#choice1");
    const choice2 = document.querySelector("#choice2");
    const choice3 = document.querySelector("#choice3");
    const choice4 = document.querySelector("#choice4");

    const option1 = document.getElementById("antwoord-1");
    const option2 = document.getElementById("antwoord-2");
    const option3 = document.getElementById("antwoord-3");
    const option4 = document.getElementById("antwoord-4");

    if (currentQuestion.hasOwnProperty("choice1")) {
        option1.style.display = "inline";
        choice1.innerHTML = '<p data-number="1">' + currentQuestion.choice1 + '</p>';
    } else {
        option1.style.display = "none";
    }

    if (currentQuestion.hasOwnProperty("choice2")) {
        option2.style.display = "inline";
        choice2.innerHTML = '<p data-number="2">' + currentQuestion.choice2 + '</p>';
    } else {
        option2.style.display = "none";
    }

    if (currentQuestion.hasOwnProperty("choice3")) {
        option3.style.display = "inline";
        choice3.innerHTML = '<p data-number="3">' + currentQuestion.choice3 + '</p>';
    } else {
        option3.style.display = "none";
    }

    if (currentQuestion.hasOwnProperty("choice4")) {
        option4.style.display = "inline";
        choice4.innerHTML = '<p data-number="4">' + currentQuestion.choice4 + '</p>';
    } else {
        option4.style.display = "none";
    }

    acceptingAnswers = true;
};

let results = [];
//Get User's Choice
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.textContent; // get the text of the selected choice
        console.log(selectedAnswer);

        // store the question and selected answer in a variable
        const questionText = currentQuestion.question;
        const userResponse = selectedAnswer;

     
        // Save question and selected answer
        const result = {
            question: questionText,
            selectedAnswer: userResponse
        };
        results.push(result);

        // Move on to the next question
        questionCounter++;
        getNewQuestion();
    });
});



startQuickscan();
