const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./api/user');
const taskRouter = require('./api/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app