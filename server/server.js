const express = require('express');
const bodyParser = require('body-parser');

const PORT = 5000;
const app = express();
const router = require('./routes/task_router')

app.use( bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

//Routes
app.use('/task', router);




app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});