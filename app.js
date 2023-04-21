const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
require("dotenv").config();
const app = express();
const db = new sqlite3.Database("database.db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cors = require("cors");
app.use(cors());
app.use(express.json());

// define routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      res.status(500).send({ error: "Error fetching users" });
    } else {
      res.send(rows);
    }
  });
});

const secret = process.env.SECRET_KEY;

app.post("/login", (req, res) => {
  // Get data from request
  const username = req.body.username;
  const password = req.body.password;

  // Get user from database
  const qry = "SELECT * FROM `users` WHERE `username` = ?";
  db.get(qry, [username], (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error while fetching user from the database" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }

    // Check if password is correct
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create JWT
    const token = jwt.sign({ user }, secret, { expiresIn: "1h" });
    return res.status(200).json({ token: ` ${token}`, message: "success" });
  });
});

app.post("/emailToken", (req, res) => {
  const email = req.body.email;

  const qry = "SELECT * FROM `email` WHERE `email` = ?";
  db.get(qry, [email], (err, email) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error while fetching email from the database" });
    }
    if (!email) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // Create JWT
    const token = jwt.sign({ email }, secret, { expiresIn: "1h" });
    return res.status(200).json({ token: ` ${token}`, message: "success" });
  });
});

app.post("/qa", (req, res) => {
  const question1 = req.body.question1;
  const selectedAnswer1 = req.body.selectedAnswer1;
  const question2 = req.body.question2;
  const selectedAnswer2 = req.body.selectedAnswer2;
  const question3 = req.body.question3;
  const selectedAnswer3 = req.body.selectedAnswer3;
  const question4 = req.body.question4;
  const selectedAnswer4 = req.body.selectedAnswer4;
  const question5 = req.body.question5;
  const selectedAnswer5 = req.body.selectedAnswer5;
  const email_id = req.body.email_id;

  db.run(
    "INSERT INTO QA (question1, selectedAnswer1, question2, selectedAnswer2, question3, selectedAnswer3, question4, selectedAnswer4, question5, selectedAnswer5, email_id) VALUES (?, ?, ?,?,?,?,?,?,?,?,?)",
    [
      question1,
      selectedAnswer1,
      question2,
      selectedAnswer2,
      question3,
      selectedAnswer3,
      question4,
      selectedAnswer4,
      question5,
      selectedAnswer5,
      email_id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Error creating QA" });
      }
      res.json({ message: "success" });
    }
  );
});

app.post("/UserQa", (req, res) => {
  const email_id = req.body.email_id; // Parse request body to integer
  console.log(email_id);
  const qry = "SELECT * FROM `QA` WHERE email_id = ? ORDER by id  DESC ";
  db.all(qry, email_id, (err, rows) => {
    if (!email_id) {
      res.status(500).send({ error: "Error fetching email" });
    } else {
      res.send(rows);
    }
  });
});

//gets you the token where the users info is stored
app.get("/secure", (req, res) => {
  // get token from request
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized, token is missing",
    });
  }

  if (!token.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized, token is invalid",
    });
  }
  // Removing Bearer from the token
  token = token.slice(7, token.length);
  // verify token
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(401).send({ error: "Invalid token" });
    } else {
      res.json({ message: "success", decoded });
    }
  });
});

app.post("/register", (req, res) => {
  // get user data from request body
  const { username, password, name } = req.body;

  // Hash the password
  bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
    if (err) {
      return res.status(500).json({ error: "Error hashing the password" });
    }
    // create a new user in the database
    db.run(
      "INSERT INTO users (username, password, name) VALUES (?, ?, ?)",
      [username, hashedPassword, name],
      function (err) {
        if (err) {
          return res.status(500).json({ error: "Error creating user" });
        }
        res.json({ message: "success" });
      }
    );
  });
});

app.post("/email", (req, res) => {
  // get user data from request body
  const { email } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate the email address
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Invalid email address." });
    return;
  }
  const qry = "Select id from email Where email = ?";
  db.get(qry, [email], (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error while fetching user from the database" });
    }
    console.log(user);
    if (!user) {
      let params = [req.body.email];
      let qry2 = `INSERT INTO "email"
      (email)
      VALUES (?)`;
      db.run(qry2, params, function (err) {
        if (err) {
          console.log(err);
          res
            .status(500)
            .json({ message: "Error inserting email address into database" });
        } else {
          console.log(`Inserted email address ${email} into database`);
          res
            .status(201)
            .json({ message: "Email address received and stored." });
        }
      });
    } else {
      // Create JWT
      const token = jwt.sign({ email }, secret, { expiresIn: "1h" });
      return res.status(200).json({ token: ` ${token}`, message: "success" });
    }
  });
});


app.post('/emailSend', (req, res) => {

  const email = req.body.email;
  const x = req.body.x;
  
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });



  const cssString = `

`;
//dit is de header van de email
const htmlString = `


    <header style="display: flex; width: 640px; height:80px;
    background-color: black;
    /* justify-content: space-between; */
    align-items: center;
    padding-left: 10px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    margin: 0 auto;">
    <div href="index.html" class="logo">
    <img src="cid:rsz_rsz_logo" style="display: flex;
            align-items: center;
            padding: 15;
            margin-left: 9%;"></img>
    </div>     
</header>
<body>
    <div class="mail-container" style="display: flex; background-color: gray; align-items: center; margin: 0 auto; width: 640px; padding-bottom:400px ;">
    <p>${x}</p>
    </div>   
</body>
`;
//dit is de body van de email
const emailBody = `
  <style>${cssString}</style>
  ${htmlString}
`;
//dit is de email die verstuurd wordt
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Springleaf Quickscan',
    html: emailBody, // Pass the combined HTML and CSS string
    html: `
    <html>
      <body>
        ${htmlString}
      </body>
    </html>
  `,
  ///dit is de afbeelding die in de email komt
  attachments: [{
    filename: 'logo.jpg',
    path: `client/img/rsz_rsz_logo.png`,
    cid: 'rsz_rsz_logo' // same cid value as in the html img src
  }]
 
  };

  //verstuurd de email met de gegevens van hierboven en laat de fouten ook zien!
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to send email' });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ message: 'success' });
    }
  });
});



app.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  db.run(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [name, email, id],
    function (err) {
      if (err) {
        res.status(500).send({ error: "Error updating user" });
      } else {
        res.send({ changes: this.changes });
      }
    }
  );
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).send({ error: "Error deleting user" });
    } else {
      res.send({ changes: this.changes });
    }
  });
});

// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
