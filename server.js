const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.use((req, res, next) => {
  var now =  new Date().toString();
  var log = `${now}: ${req.method}  ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('There is an error')

    }
  })

  next()
});
app.use((req, res, next) => {
  res.render('maintenance.hbs');
})


hbs.registerHelper('PageDate', () => {
  return new Date().getFullYear()
})
hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
})

app.set('view engine', 'hbs')


app.get('/about', (req , res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
})

app.get('/' ,(req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Welcome users'
  });

})

app.get('/bad',(req, res) => {
  res.send({
    errorMessage: 'Too bad Cant Handle request'
  })
})

app.listen(3000, () => {
  console.log('Server is Up on 3000')
});