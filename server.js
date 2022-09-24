'use strict';


const express = require('express');
const cors = require('cors');
const notFound = require('./error_handlers/404');
const internalError = require('./error_handlers/500');
const userRoute = require('./routes/user.route');
const taskRouter = require('./routes/task.route');
const statusRouter = require('./routes/status.route');
const app = express();

app.use(express.json());
app.use(cors());
app.use(userRoute);
app.use(taskRouter);
app.use(statusRouter);

// testing route
app.get('/', (req, res) => {
    res.status(200).send('SERVER UP !');
});


app.use(internalError);
app.use(notFound);


function start(port) {
    app.listen(port, () => {
        console.log(`Server is listening on PORT ${port}`);
    });
}


module.exports = {
    app,
    start
}