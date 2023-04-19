var myArray = [];

var QA_data = [];

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
  
  getUsers().then(() => {
    var email_id = myArray.toString(); // Convert myArray to a string
    console.log(email_id); // The string representation of myArray
    data = {
        email_id: email_id,
    }
    api("UserQa", "POST", data).then((res) => {
             console.log(res);

        
  });
  })
