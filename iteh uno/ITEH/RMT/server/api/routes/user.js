var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.post('/register', (req, res, next) => {
    User.find({ email: req.body.email, username: req.body.username })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Email or username already exists!"
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            surname: req.body.surname,
                            email: req.body.email,
                            username: req.body.username,
                            password: hash
                        });

                        user.save()
                            .then(result => {
                                res.status(201).json({
                                    message: 'User created!'
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/login', (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "AUTH FAILED!"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "AUTH FAILED!"
                    });
                }

                if (result) {
                    const token = jwt.sign(
                        {
                            username: user[0].username,
                            userId: user[0]._id
                        },
                        'secret',
                        {
                            expiresIn: "1h"
                        });

                    return res.status(200).json({
                        message: "AUTH SUCCESSFUL",
                        idToken: token,
                        username: user[0].username
                    });
                }

                res.status(401).json({
                    message: "AUTH FAILED!"
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:userId', (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted!"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;