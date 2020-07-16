const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const app = express();
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io');

io.once('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});


mongoose.connect('mongodb+srv://admin:admin@cluster0.vms3e.mongodb.net/Project2?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
    }
);

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(cors());
app.use(express());
app.use(express.urlencoded({extended:true}));
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));

app.use(require('./routes'));

server.listen(3333);