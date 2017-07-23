const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;


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
app.get('/maintenance',(req, res) => {
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

app.get('/project' ,(req, res) => {
  res.render('project.hbs', {
    pageTitle: 'Welcome Project'
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

app.listen(port, () => {
  console.log(`Server is Up on ${port}`)
});
