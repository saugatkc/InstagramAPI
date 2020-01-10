const express = require('express');
const Posts = require('../models/posts');

const router = express.Router();

router.route('/')
    .get((req, res, next) => {
        console.log(req.user);
        Posts.find({})
            .then((post) => {
                if(post == null) throw new Error("Post not found!")
                res.json(post);
            }).catch(next);
    }) 

    .post((req, res, next) => {
        Posts.create(req.body)
            .then((post) => {
                res.statusCode = 201;
                res.json(post);
            }).catch(next);
    })

    .put((req, res, next) => {
        res.statusCode = 405;
        res.send("Method not supported");
    })

    .delete((req, res, next) => {
        Posts.deleteMany({})
            .then((post) => {
                res.json(post);
            }).catch(next);
    });

    router.route('/:id')
        .get((req, res, next) => {
            Posts.findById({_id: req.param.id})
                .then((post) => {
                    if(post == null) throw new Error("Post not found!")
                    res.json(post);
                }).catch(next);
        })

        .post((req, res) => {
            res.statusCode = 405;
            res.json({message: "Method not supported"});
        })

        .put((req, res, next) => {
            Posts.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
                .then((post) => {
                    res.json(post);
                }).catch(next);
        })
        
        .delete((req, res, next) => {
            Posts.findOneAndDelete({_id: req.params.id})
                .then((post) => {
                    res.json(post);
                }).catch(next);
        });

module.exports = router;