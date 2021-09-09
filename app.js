const express = require('express');
const app = express();
const logger = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')

// Connect to mongodb
const dbConfig = 'mongodb+srv://galexwade:Basketball25@nodeblog.r4b7n.mongodb.net/nodeblog?retryWrites=true&w=majority';
mongoose.connect(dbConfig)
.then((result) => console.log('Connected to db'))
.catch((err) => console.log(err));

// Register view engine
app.set('view engine', 'ejs');

// Logger middleware
app.use(logger('dev'));

// Middleware & Static files
app.use(express.static('public'));

// Home page
app.get('/', (req, res) => {
    res.redirect('/blogs')
});

// About page
app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});

// All blogs route
app.get('/blogs', (req, res) => {
    Blog.find().sort( { createdAt: -1 })
    .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result })
    })
    .catch((err) => {
        console.log(err);
    })
});

// Create a blog page
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Create a new blog" })
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: "404" });
});

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Port listening on port ${port}`);
});