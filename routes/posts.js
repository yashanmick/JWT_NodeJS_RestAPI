const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    // res.json({ posts: { title: 'my first post', description: 'desc' } });
    res.send(req.user);
    User.findbyOne({ _id: req.user })
});



module.exports = router;