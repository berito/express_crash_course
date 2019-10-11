const express = require('express')
const uuid = require('uuid')
const members = require('../../models/Members')
const router = express.Router();
//Gets All Members
router.get('/', (req, res) => res.json(members))
    //Gets Member By Id
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg: `No member with id of ${req.params.id}` })
    }
});
//Create Member
router.post('/', (req, res) => {
        const member = {
            id: uuid.v4(),
            name: req.body.name,
            email: req.body.email,
            status: 'active'
        }
        console.log(req.body.name, req.body.email)
        if (!member.name || !member.email) {
            res.status(400).json({ msg: "please include and email fields" })
        } else {

            members.push(member);
            // res.json(members)
            res.redirect('/')
        }

    })
    //Update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if (found) {
        const updateMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;
                res.json({ msg: "Member updated", member });
            }
        })

    } else {
        res.status(400).json({ msg: `No member with id of ${req.params.id}` })
    }
});
//Delete Member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if (found) {
        res.json({ msg: "Member Deleted", members: members.filter(member => member.id != parseInt(req.params.id)) })
    } else {
        res.status(400).json({ msg: `No member with id of ${req.params.id}` })
    }
});
module.exports = router