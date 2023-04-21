var myArray = [];
var emailArray = [];
let UserQa;

function getUsers() {
  data = {
    token: getCookie("token"),
  };

  return api("secure", "GET", data).then((res) => {
    if (res.message == "success") {
      myArray.push(res.decoded.email.id);
    }
  });
}




function sendEmail(Quser_email) {

  
  data = {
    email: emailArray.toString,
    x: "test",
  };
  console.log(emailArray)

  return api("emailSend", "POST", data).then((res) => {
    if (res.message == "success") {
    console.log("het is verstuurd")
    }
  });






}
getUsers().then(() => {
  var email_id = myArray.toString(); // Convert myArray to a string
  console.log(email_id); // The string representation of myArray
  data = {
    email_id: email_id,
  };
  api("UserQa", "POST", data).then((res) => {
    console.log(res);
    UserQa = res[0];
    console.log(UserQa);

    displayUserQa(UserQa);
  });
  api("getQuser", "POST", data).then((res) => {
    console.log(res[0].email);
    Quser_email = res[0].email;
   emailArray.push(res[0].email);
    
    displayQuser(Quser_email);
  })

});
console.log("dadadada"+emailArray);
function displayQuser(Quser_email){

  const Quser = document.getElementById("Quser");

  Quser.innerText = Quser_email;

}

// console.log(email)
function displayUserQa(UserQa){
const question1 = document.getElementById("question1");
const question2 = document.getElementById("question2");
const question3 = document.getElementById("question3");
const question4 = document.getElementById("question4");
const question5 = document.getElementById("question5");

const ChAnswer1 = document.getElementById("chosen-answers1");
const ChAnswer2 = document.getElementById("chosen-answers2");
const ChAnswer3 = document.getElementById("chosen-answers3");
const ChAnswer4 = document.getElementById("chosen-answers4");
const ChAnswer5 = document.getElementById("chosen-answers5");

question1.innerText = UserQa.question1;
question2.innerText = UserQa.question2;
question3.innerText = UserQa.question3;
question4.innerText = UserQa.question4;
question5.innerText = UserQa.question5;

ChAnswer1.innerText = UserQa.selectedAnswer1;
ChAnswer2.innerText = UserQa.selectedAnswer2;
ChAnswer3.innerText = UserQa.selectedAnswer3;
ChAnswer4.innerText = UserQa.selectedAnswer4;
ChAnswer5.innerText = UserQa.selectedAnswer5;

}


function connectButton(id, event) {
  let element = document.getElementById(id);
  if (element) {
    element.addEventListener("click", event);
  }

}//you can add all the buttons you want to connect to the api or button functions
document.addEventListener("DOMContentLoaded", function () {
  connectButton("button-summary", sendEmail);
});

const submitHandler = async (event) => {
  event.preventDefault()
  console.log("submit")
}



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