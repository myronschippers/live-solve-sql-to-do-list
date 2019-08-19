const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

const tasksRouter = require('./routers/tasks.router');

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/tasks', tasksRouter);

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});