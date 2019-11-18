var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoOp = require("./models/user");
var router = express.Router();
var cors = require('cors')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));
const cp = require('cookie-parser');
const passport = require('passport');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const secret = process.env.SECRET || 'the default secret';
const jwt = require('jsonwebtoken');


app.use(cors())
app.use(passport.initialize());
require('./models/passport-config')(passport);
app.use(cp());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



router.post('/signup', (req, res) => {
    mongoOp.findOne({ userEmail: req.body.userEmail })
        .then(user => {
            if (user) {
                let error = 'Email Address Exists in Database.';
                return res.status(400).json(error);
            } else {
                const newUser = new mongoOp({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userEmail: req.body.userEmail,
                    userPassword: req.body.userPassword,
                    role: req.body.role
                });
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        console.log(err);
                        throw err
                    };
                    bcrypt.hash(newUser.userPassword, salt,
                        (err, hash) => {
                            if (err) throw err;
                            newUser.userPassword = hash;
                            newUser.save(function (err) {
                                if (err) {
                                    return res.json({
                                        statusCode: 0,
                                        role: db.role,
                                        error: "Error adding data !"
                                    })
                                    return;
                                } else {
                                    return res.json({
                                        statusCode: 1,
                                        error: "You are added successfully  !"
                                    })
                                }
                            })
                        })
                })
            }
        });
});

router.post('/login', (req, res) => {
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;
    mongoOp.findOne({ userEmail: req.body.userEmail })
        .then(user => {
            if (!user) {
                return res.json({
                    statusCode: 0,
                    error: "No Account Found",
                });
            } else {
                bcrypt.compare(userPassword, user.userPassword)
                    .then(isMatch => {
                        if (isMatch) {
                            const payload = {
                                _id: user._id,
                                firstName: user.firstName
                            };
                            jwt.sign(payload, secret, { expiresIn: 36000 },
                                (err, token) => {
                                    if (err) res.status(500)
                                    return res.json({
                                        statusCode: 1,
                                        _id:user._id,
                                        role:user.role,
                                        success: true,
                                        token: `${token}`
                                    });
                                });
                        } else {
                             return res.json({
                                statusCode: 0,
                                error:  "Password is incorrect",
                            });
                        }
                    })
                    .catch((err) => {
                        return err;
                    })
            }
        })
        .catch((err) => {
            return err;
        })

});




router.route("/users", { useUnifiedTopology: true })
    .get(function (req, res) {
        var response = {};
        mongoOp.find({}, function (err, data) {
            if (err) {
                response = { "message": "Error fetching data" };
                return err;
            } else {
                res.json({
                    statusCode: 1,
                    user: data,
                    message: "Data is fetched !",
                })
            }
        });
    })



router.route("/users/:id")
    .get(function (req, res) {
        var response = {};
        mongoOp.findById(req.params.id, function (err, data) {
            if (err) {
                response = { "message": "Error fetching data" };
                return;
            } else {
                response = { "message": data };
            }
            res.json(response);
        });
    })





app.use('/', router);

app.listen(5000);
console.log(`Listening to PORT 5000`);