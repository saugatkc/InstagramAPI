const express = require("express");
const mongoose = require("mongoose");
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const uploadRouter = require('./routes/upload');
const dotenv = require('dotenv').config();
const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then((db) => {
        console.log("Successfully connected to Mongodb server");    
    }, (err) => console.log(err));

    app.use('/users', userRouter);
    app.use('/posts', postRouter);
    app.use('/uploads', uploadRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCde = 500;
    res.json({message: err.message});
});

app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost: ${process.env.PORT}`);
});