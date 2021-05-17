const express = require('express')
const router = express.Router({mergeParams: true})
fs = require('fs');
const UiConfuration = require('../../models/ui_config').UiConfuration

router.route('/style.css').get(async function (req, res) {
    let config = await UiConfuration.findOne({key: "color"})
    if (config && config.value) {
        fs.writeFileSync(__dirname + "/style.css",
            ".Toastify__toast--success {\n" +
            "    background: " + config.value + " !important;\n" +
            "}\n" +
            ".MuiSvgIcon-root { \n   fill: " + config.value + " !important;\n}\n" +
            ".MuiButton-containedPrimary {\n" +
            "    background-color: " + config.value + " !important;\n" +
            "}" +
            ".MuiButton-textPrimary {\n" +
            "    color: " + config.value + " !important;\n" +
            "}");
    } else {
        fs.writeFileSync(__dirname + "/style.css",
            ".Toastify__toast--success {\n" +
            "    background: #005400 !important;\n" +
            "}\n" +
            ".MuiSvgIcon-root { \n   fill: #005400 !important;\n}\n" +
            ".MuiButton-containedPrimary {\n" +
            "    background-color: #005400 !important;\n" +
            "}" +
            ".MuiButton-textPrimary {\n" +
            "    color: #005400 !important;\n" +
            "}");
    }

    res.sendFile(__dirname + '/style.css');
})


router.route('/icon.png').get(async function (req, res) {
    let config = await UiConfuration.findOne({key: "logo"})
    res.json({url: config.value})
})

module.exports = router
