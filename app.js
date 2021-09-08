const express = require('express');
const app = express();

// Register view engine
app.set('view engine', 'ejs');

// Home page
app.get('/', (req, res) => {
    res.render('index');
});
// About page
app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/blogs/create', (req, res) => {
    res.render()
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404');
});

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Port listening on port ${port}`);
});