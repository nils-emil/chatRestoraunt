const express = require('express')
const router = express.Router({mergeParams: true})
fs = require('fs');
const UiConfuration = require('../../models/ui_config').UiConfuration

router.route('/update/').post(async function (req, res) {
    let conf = await UiConfuration.findOne({key: req.body.key});
    console.log(conf)
    if (conf) {
        conf.value = req.body.value;
        await conf.save();
        res.json(conf)
    } else {
        let newConf = new UiConfuration();
        newConf.key = req.body.key;
        newConf.value = req.body.value;
        await newConf.save();
        res.json(newConf)
    }
})

router.route('/get/all').get(async function (req, res) {
    let conf = await UiConfuration.find();
    res.json(conf)
})

module.exports = router
