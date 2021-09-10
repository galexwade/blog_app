const express = require('express');
const app = express();
const logger = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// Connect to mongodb
const dbConfig = 'mongodb+srv://galexwade:Basketball25@nodeblog.r4b7n.mongodb.net/nodeblog?retryWrites=true&w=majority';
mongoose.connect(dbConfig)
.then((result) => console.log('Connected to database'))
.catch((err) => console.log(err));

// Register view engine
app.set('view engine', 'ejs');

// Logger middleware
app.use(logger('dev'));

// Middleware & Static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// Logger middleware
app.use(logger('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// Home page
app.get('/', (req, res) => {
    res.redirect('/blogs')
});

// About page
app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: "404" });
});

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Port listening on port ${port}`);
});