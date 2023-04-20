const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let questionCounter = 0;
let availableQuesions = [];
let results = [];
let questions = [
  {
    question: "Is het proces handmatig en repetitief?",
    choice1: "Ja",
    choice2: "Nee",
  },
  {
    question: "Is het proces op regels gebaseerd?",
    choice1: "Ja",
    choice2: "Grotendeels wel",
    choice3: "Grotendeels niet",
    choice4: "Nee",
  },
  {
    question:
      "Gaat het proces of de applicaties die worden gebruikt in de komende 6 maanden drastisch wijzigen?",
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

// Start Quickscan
startQuickscan = () => {
  questionCounter = 0;
  availableQuesions = [...questions];
  getNewQuestion();

  getUsers().then(() => {
    console.log(myArray.toString());
  });
};

var myArray = [];
function getUsers() {
  data = {
    token: getCookie("token"),
  };

  return api("secure", "GET", data).then((res) => {
    if (res.message == "success") {
      // Save the received JWT in a cookie
      myArray.push(res.decoded.email.id);
    }
  });
}

getNewQuestion = () => {
  const selectedChoice = document.querySelector(".choice-text.selected");
  if (selectedChoice) {
    selectedChoice.classList.remove("selected");
  }
  if (availableQuesions.length === 0 || questionCounter >= questions.length) {
    // console.log(results[0].question);
    // console.log(results[0].selectedAnswer);

    // Fetch data from html
    data = {
      question1: results[0].question,
      selectedAnswer1: results[0].selectedAnswer,
      question2: results[1].question,
      selectedAnswer2: results[1].selectedAnswer,
      question3: results[2].question,
      selectedAnswer3: results[2].selectedAnswer,
      question4: results[3].question,
      selectedAnswer4: results[3].selectedAnswer,
      question5: results[4].question,
      selectedAnswer5: results[4].selectedAnswer,
      email_id: myArray.toString(),
    };
    // Submit data to API
    api("qa", "POST", data).then((res) => {
      if (res.message == "success") {
        // Save the received JWT in a cookie

        console.log("het is gelukt");
      }
    });

    //go to the end page

    return window.location.assign("../client/summary.html");
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
    choice1.innerHTML =
      '<p data-number="1">' + currentQuestion.choice1 + "</p>";
  } else {
    option1.style.display = "none";
  }

  if (currentQuestion.hasOwnProperty("choice2")) {
    option2.style.display = "inline";
    choice2.innerHTML =
      '<p data-number="2">' + currentQuestion.choice2 + "</p>";
  } else {
    option2.style.display = "none";
  }

  if (currentQuestion.hasOwnProperty("choice3")) {
    option3.style.display = "inline";
    choice3.innerHTML =
      '<p data-number="3">' + currentQuestion.choice3 + "</p>";
  } else {
    option3.style.display = "none";
  }

  if (currentQuestion.hasOwnProperty("choice4")) {
    option4.style.display = "inline";
    choice4.innerHTML =
      '<p data-number="4">' + currentQuestion.choice4 + "</p>";
  } else {
    option4.style.display = "none";
  }

  const backButton = document.getElementById("back-button");
  if (questionCounter === 0) {
    nextButton.disabled = true;

    backButton.style.display = "none";
  } else {
    backButton.style.display = "block";
  }
};

const selectAnswer = (choice) => {
  const selectedAnswer = choice.textContent;

  // store the question and selected answer in a variable
  const questionText = currentQuestion.question;

  // Find the index of the question in the results array
  const resultIndex = results.findIndex(
    (result) => result.question === questionText
  );

  if (resultIndex !== -1) {
    // If the question is already in the results array, update the selected answer
    results[resultIndex].selectedAnswer = selectedAnswer;
  } else {
    // If the question is not in the results array, add it with the selected answer
    const result = {
      question: questionText,
      selectedAnswer: selectedAnswer,
    };
    results.push(result);
  }

  // Add a class to the selected choice to indicate that it's been selected
  const selectedChoice = document.querySelector(".choice-text.selected");
  if (selectedChoice) {
    selectedChoice.classList.remove("selected");
  }
  choice.classList.add("selected");
  // Enable the next button
  const nextButton = document.getElementById("front-button");
  nextButton.disabled = false;
};
//Get User's Choice
choices.forEach((choice) => {
  choice.addEventListener("click", () => selectAnswer(choice));
});

const nextButton = document.getElementById("front-button");
nextButton.addEventListener("click", () => {
  questionCounter++;
  console.log(questionCounter);
  getNewQuestion();
  nextButton.disabled = true;
  choices.forEach((choice) => {
    choice.classList.remove("disabled");
  });
});

const backButton = document.getElementById("back-button");
backButton.addEventListener("click", () => {
  // Decrement the question counter
  questionCounter--;

  // Get the previous question
  currentQuestion = availableQuesions[questionCounter];

  // Update the UI with the previous question
  question.innerText = currentQuestion.question;
  const option1 = document.getElementById("antwoord-1");
  const option2 = document.getElementById("antwoord-2");
  const option3 = document.getElementById("antwoord-3");
  const option4 = document.getElementById("antwoord-4");

  if (currentQuestion.hasOwnProperty("choice1")) {
    option1.style.display = "inline";
    choice1.innerHTML =
      '<p data-number="1">' + currentQuestion.choice1 + "</p>";
  } else {
    option1.style.display = "none";
  }

  if (currentQuestion.hasOwnProperty("choice2")) {
    option2.style.display = "inline";
    choice2.innerHTML =
      '<p data-number="2">' + currentQuestion.choice2 + "</p>";
  } else {
    option2.style.display = "none";
  }

  if (currentQuestion.hasOwnProperty("choice3")) {
    option3.style.display = "inline";
    choice3.innerHTML =
      '<p data-number="3">' + currentQuestion.choice3 + "</p>";
  } else {
    option3.style.display = "none";
  }

  if (currentQuestion.hasOwnProperty("choice4")) {
    option4.style.display = "inline";
    choice4.innerHTML =
      '<p data-number="4">' + currentQuestion.choice4 + "</p>";
  } else {
    option4.style.display = "none";
  }

  // Disable the back button if we're at the first question
  if (questionCounter === 0) {
    nextButton.disabled = true;

    backButton.style.display = "none";
  } else {
    backButton.style.display = "block";
  }
  console.log(questionCounter);
  // Enable the next button
  nextButton.disabled = false;
  // Look up the selected answer for this question in the results array
  const questionText = currentQuestion.question;
  const resultIndex = results.findIndex(
    (result) => result.question === questionText
  );
  if (resultIndex !== -1) {
    // If the question is already in the results array, select the corresponding choice
    const selectedChoice = choices.find(
      (choice) => choice.textContent === results[resultIndex].selectedAnswer
    );
    if (selectedChoice) {
      // Only remove "selected" class from other choices if the selected choice has changed
      if (!selectedChoice.classList.contains("selected")) {
        choices.forEach((choice) => {
          choice.classList.remove("selected");
        });
      }
      selectedChoice.classList.add("selected");
    }
  }
});

//api function to get infro from the server to frontend
function api(endpoint, method = "GET", data = {}) {
  const API = "http://localhost:3000/";
  return fetch(API + endpoint, {
    method: method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: method == "GET" ? null : JSON.stringify(data),
  }).then((res) => res.json());
}

//get cookie function
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

startQuickscan();
