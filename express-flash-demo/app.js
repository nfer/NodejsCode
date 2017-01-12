const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();

app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

app.get('/', (req, res) => {
  res.locals.messages = {
    errors:[{msg:"Error Tips"}],
    info:[{msg:"Info Tips"}],
    success:[{msg:"Success Tips"}]
  };
  res.render('index');
});
app.post('/', (req, res, next) => {
	return res.redirect('/');
});

app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d', app.get('port'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
