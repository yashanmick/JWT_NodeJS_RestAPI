const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

//Register

router.post('/register', async (req, res) => {

    //Validate the data before we make a user
    const { error } = registerValidation(req.body);
    // res.send(error.details[0].message);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if the user already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
});


//Login
router.post('/login', async (req, res) => {

    //Validate the data before we make a user
    const { error } = loginValidation(req.body);
    // res.send(error.details[0].message);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if the email exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email doesen\'t exist');

    //check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    res.send('Logged in');
});


module.exports = router;