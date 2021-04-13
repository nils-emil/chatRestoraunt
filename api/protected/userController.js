const auth = require('../../middleware/auth')
const PasswordInit = require('../../models/passwordInit').PasswordInit
const User = require('../../models/user').User
const express = require('express')
const router = express.Router()
const UserService = require('../../services/userService')
const userService = new UserService()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var uuid = require('uuid');
const EmailService = require('../../services/emailService')
const emailService = new EmailService()

router.get('/current', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    res.send(user)
})

router.post('/current/new-password', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    if (req.body.newPassword != req.body.newPasswordConfirm) {
        res.status(400).send({error: "Parool ja parooli kinnitus ei klapi"})
        return;
    }

    const userWithPassword = await User.findOne({
        _id: req.user._id
    });
    const passwordMatches = await bcrypt.compare(req.body.oldPassword, userWithPassword.password)
    if (!passwordMatches) {
        res.status(400).send({error: "Vale parool"})
        return;
    }

    user.password = await bcrypt.hash(req.body.newPassword, 10)
    user.save();
    res.send(user)
})

router.get('/all', auth, async (req, res) => {
    const users = await userService.fetchAll()
    res.json(users)
})


router.route('/add').post(async function (req, res) {
    const user = new User(req.body)
    console.log(user)
    const usertoken = req.headers.authorization;
    const decoded = jwt.verify(usertoken, process.env.JWT_KEY);
    const creator = await User.findById(decoded._id).select('-password')
    let preExistingUser = await userService.findById(user._id);
    const pwkey = new PasswordInit()
    pwkey.key = uuid.v4();
    if (preExistingUser) {
        user.password = preExistingUser.password;
        preExistingUser.username = user.username;
        preExistingUser.email = user.email;
        preExistingUser.isAdmin = user.isAdmin;
        preExistingUser.save();
        pwkey.userId = preExistingUser._id;
        pwkey.save();
        res.status(200).json(preExistingUser)
    } else {
        await user.save().then((e, a) => {
            User.findOne({email: user.email}).then(usr => {
                pwkey.userId = usr._id;
                pwkey.save();
                let protocal = req.secure ? 'https://' : 'http://'
                let link = `Parooli määramine - ${protocal}${req.headers.host}/init?key=${pwkey.key}`;
                console.log(link)
                emailService.sendEmail(user.email, "Parooli määramine", `Alljärgneval lingil saate oma kontole määrata parooli<br>${link}`)
            })
            res.status(200).json(e)
        }).catch(e => {
            res.status(400).send('Unable to save to database')
        });
    }
})

router.route('/delete').post(function (req, res) {
    User.deleteOne({_id: req.body._id}, (err) => {
        if (err) {
            res.json(err)
        } else {
            res.json('Successfully removed')
        }
    })
})


module.exports = router
