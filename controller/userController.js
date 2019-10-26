const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, validate } = require('../model/user');

async function registerUser(req, res) {
            const user = new User({
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password,
                role: req.body.role,
            });
            const { error } = validate(req.body);
            if (error) return res.status(400).send(error.details[0].message);
            user.save().then(result => {
                res.status(201).json({
                    message: 'User Created',
                    result: result
                });
            }).catch(err => {
                res.status(500).json({
                    message: 'User Exist',
                    error: err
                });
            });
       
}

async function authenticate(req, res) {
    User.findOne({ username: req.body.username }).then(user => {
        if (!user) {
            return res.status(400).json({
                message: 'Username is incorrect'
            });
        }
        return bcrypt.compare(req.body.password, user.password);
    }).then(result => {
        User.findOne({ username: req.body.username }).then(user => {
            if (!result) {
                return res.status(400).json({
                    message: 'Password is incorrect'
                });
            }
            const token = jwt.sign({ id: user.id, userName: user.username, role: user.role }, "pfe_grh_2019_imbustn"
                , { expiresIn: 60 }
            );

            res.status(200).json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });
        }).catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            });
        });
    });
}

module.exports = { authenticate, registerUser }