const express = require('express');
const session = require("express-session");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require('path');
const app = express();
const port = 3000;
const { engine } = require('express-handlebars');
const usersFilePath = path.join(__dirname, "data", "users.json");
const isAuthenticated = require('./middlewares/authentication')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);
app.engine('hbs', engine({
  defaultLayout: 'index',
  extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.get('/', isAuthenticated, (req, res) => {
  res.render('calendar');
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  if (users.some((user) => user.username === username)) {
    return res.status(400).send("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  writeUsers(users);

  res.render('/');
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const user = users.find((user) => user.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user.username;
    res.redirect("/");
  } else {
    res.status(400).send("Invalid credentials");
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.clearCookie("connect.sid");
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

function readUsers() {
  const data = fs.readFileSync(usersFilePath, "utf8");
  console.log(data)
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}