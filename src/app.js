const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const { engine } = require('express-handlebars');

app.engine('hbs', engine({
  defaultLayout: 'index',
  extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('header', { message: 'Hello' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});