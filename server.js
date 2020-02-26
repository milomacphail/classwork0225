const express =  require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const grads = require('./routes/api/grads');
app.use(express.json());

const db = process.env.DB_CONNECTION;

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("Connected");
})

app.use('/api/grads', grads);
app.use(express.static('public'));


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})