const express = require('express');
const router = express.Router();
const users = require('../../models/Users')

//Get All Users
router.get('/', (req, res) => res.json(users))
router.get('/:id', (req, res) => {
    const found = users.some(user => user.email === req.params.email)
    if (found) {
        res.json(users.filter(user => { user.email === req.params.email }));
    } else {
        res.status(400).json({ msg: `no user with emial ${req.params.email}` })
    }
})

module.exports = router;