const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const key = require('../../config/keys').secret;
const User = require('../../models/User');



router.get('/', async (req, res) => {
    try {
        let users = await User.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(400).json("Error" +err);
    }
});

router.get('/find/:id', async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json("Error" +err);
    }
});


router.put('/:id', async (req, res) => {


    await User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;
            user.name = req.body.name;
            user.email = req.body.email
            user.phone_number = req.body.phone_number;

            user.save()
                .then(() => res.status(200).json({ msg: 'User has been edited successfully', user: user, success: true }))
                .catch((err) => res.status(400).json({ msg: err, success: false }));

        })
        .catch(err => res.status(400).json({ msg: err }));

});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ user: user, success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err, success: false });
    }
});

//Route to register a new user
router.post('/register', async (req, res) => {
    let { name, username, email, phone_number, password, confirmPassword} = req.body;
    let regexforEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (password !== confirmPassword) {
        return res.status(400).json({
            msg: "Password don't match",
            success: false
        })
    }

    if (name.length < 3 || name == null || name.trim() === '') {
        return res.status(400).json({
            msg: 'Name should be 3 or more characters long',
            success: false
        })
    }
    if (email.trim() === '' || email == null || !regexforEmail.test(email)) {
        return res.status(400).json({
            msg: 'Email should be valid',
            success: false
        })
    }

    if(phone_number.length < 8 || phone_number.trim() === '') {
        return res.status(400).json({
            msg: 'Phone number should be valid',
            success: false
        })
    }

    if (password.length < 6 || password == null || password.trim() === '') {
        return res.status(400).json({
            msg: 'Password should be 6 or more characters long',
            success: false
        })
    }


    if (username.length < 6 || username == null || username.trim() === '') {
        return res.status(400).json({
            msg: 'Username should be 6 or more characters long',
            success: false
        })
    }
    //Check that username doesn't exists for user to register
    const userUsername = await User.findOne({ username: username })
    if (userUsername) {
        return res.status(400).json({
            msg: "Username is already taken",
            success: false,
        });
    }

    //Check that email doesn't exists for user
    const userEmail = await User.findOne({ email: email });
    if (userEmail) {
        return res.status(400).json({
            msg: "Email is already taken. Did you forget your password.",
            success: false,
        })
    }

    //  .then(user => {
    // //     if (user) {
    // //         return res.status(400).json({
    // //             msg: "Email is already taken. Did you forget your password.",
    // //             success: false,
    // //         });
    // //     }
    // // });

    let newUser = new User({
        name,
        username,
        password,
        email,
        phone_number,
    });

    //Hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "User is now registered"
                });
            });
        });
    });
});


router.post('/login', async (req, res) => {
    let user = await User.findOne({ username: req.body.username })
    if (!user) {
        return res.status(404).json({
            msg: "Username not found",
            success: false
        });
    }

    //Nese ekziston user atehere i krahasojme passwords
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
            //User password eshte korrekt dhe dergojme JSON Token per ate user
            const payload = {
                _id: user._id,
                username: user.username,
                name: user.name,
                email: user.email
            }
            jwt.sign(payload, key, {
                expiresIn: 604800
            }, (err, token) => {
                res.status(200).json({
                    success: true,
                    token: `Bearer ${token}`,
                    user: user,
                    msg: "You're now logged in"
                });
            })
        }
        else {
            return res.status(404).json({
                msg: "Incorrect password",
                success: false
            })
        }
    })
});


router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        user: req.user
    })
})

module.exports = router;