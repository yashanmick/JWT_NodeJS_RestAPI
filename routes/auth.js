const router = require('express').Router();
const User = require('../models/User');
const { registerValidation } = require('../validation');





router.post('/register', async (req, res) => {

    //Validate the data before we make a user
    const { error } = registerValidation(req.body);
    // res.send(error.details[0].message);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if the user already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;