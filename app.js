const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use('/js', express.static(path.join(__dirname,'public/js')));

app.get('/', (req, res) => res.render('index'));

app.listen(3232, () => console.log('Server running on port 3232'));