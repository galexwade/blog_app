const express = require('express');
const app = express();

// Register view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Port listening on port ${port}`);
});