const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const logger = require('morgan');
const path = require('path');

const app = express();

app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'Your Session Secret goes here',
  store: new session.MemoryStore
}));

app.use(flash());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

app.get('/', (req, res) => {
  res.render('index');
});
app.post('/', (req, res, next) => {
  req.flash('errors', { msg: 'Error occurs.' });
  req.flash('info', { msg: 'This is an information.' });
  req.flash('success', { msg: 'Success!' });
  return res.redirect('/');
});

app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d', app.get('port'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
