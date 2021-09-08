const express = require('express');
const app = express();
const logger = require('morgan');

// Register view engine
app.set('view engine', 'ejs');

// Logger middleware
app.use(logger('dev'));

// Middleware & Static files
app.use(express.static('public'));

// Home page
app.get('/', (req, res) => {
    const blogs = [
        {title: "Drake drops CLB", snippet: "lorem ipsum dolor sit amet consectectur"},
        {title: "Kanye drops Donda", snippet: "lorem ipsum dolor sit amet consectectur"},
        {title: "Kendrick drops a single", snippet: "lorem ipsum dolor sit amet consectectur"}
    ];
    res.render('index', { title: "Home", blogs: blogs });
});

// About page
app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
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