const bcrypt = require('bcryptjs')
const {User} = require('../../models/user')
const PasswordInit = require('../../models/passwordInit').PasswordInit
const express = require('express')
const router = express.Router()
var nodemailer = require('nodemailer');

router.post('/login', async (req, res) => {
        let user = await User.findOne({email: req.body.email})
        if (!user || !req.body.password) {
            return res.status(403).send({error: 'Username or password incorrect'})
        }
        const passwordMatches = await bcrypt.compare(req.body.password, user.password)
        if (passwordMatches) {
            const token = user.generateAuthToken()
            return res.status(200).send({user: user, token: token})
        }
        return res.status(403).send({error: 'Username or password incorrect'})
    }
)

router.post('/init/password', async (req, res) => {
        let key = await PasswordInit.findOne({key: req.body.key})
        if (!key) {
            return res.status(400).send({error: 'Viga päringu tegemisel. Kontrolliga sisestatud andmeid'})
        }
        if (req.body.newPassword !== req.body.newPasswordConfirm) {
            return res.status(400).send({error: 'Parool ja parooli kinnitus ei klapi'})
        }
        const user = User.findOne({_id: key.userId})
        user.password = await bcrypt.hash(req.body.newPassword, 10);
        user.save;
        PasswordInit.deleteOne({_id: key._id}).then(() => {
        })
        return res.status(200).send({success: 'Parooli uuendamine õnnestus'})
    }
)



module.exports = router
