const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.urlencoded({ extended : false }));
app.use(express.json);

app.use(morgan('dev'));

app.use('/api/authors', require('../routes/authors'));
app.use('/api/books', require('../routes/books'));

const PORT = 3000;

app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`);
})