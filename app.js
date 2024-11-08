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
const customerHelpers = require('./helpers/customerHelpers')

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
  const { username, password, repeatPassword } = req.body;
  const users = readUsers();

  if (users.some((user) => user.username === username)) {
    return res.status(400).send("User already exists");
  } else if (password !== repeatPassword) {
    return res.status(400).send("The passwords are different!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  writeUsers(users);
  res.redirect("/");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find((user) => user.username === username);

  customerHelpers.login(req, res, user, password);
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
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}