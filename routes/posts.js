const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({ posts: { title: 'my first post', description: 'desc' } });
});



module.exports = router;