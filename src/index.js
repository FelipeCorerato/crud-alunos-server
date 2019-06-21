const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://prato:prato@cluster0-zjvza.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use(bodyParser.json());

app.use((req, res, next) => {
    req.io = io;

    next();
});

app.use(cors());

app.use(require('./routes'));

app.listen(3030);