const router = require('express').Router();
const fs = require('fs');
const ImageModel = require('../../models/Image').ImageModel;
const auth = require("../../middleware/auth");

router.post('/save', auth.required, function (req, res) {
    let image = new ImageModel();
    image.target_id = req.body.target_id;
    image.type = req.body.type;
    image.img.data = fs.readFileSync(req.files[0].path);
    image.img.contentType = 'image/png';
    image.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
    fs.unlinkSync(req.files[0].path);
});

module.exports = router;