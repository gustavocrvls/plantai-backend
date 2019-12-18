var router = require('express').Router();
const fs = require('fs')
const Image = require('../../models/Image')

router.post('/save',function(req,res){
    // console.log(req.body.file);
    
    var newItem = new Image();
    newItem.img.data = fs.readFileSync(req.files[0].path)
    newItem.img.contentType = 'image/png'
    newItem.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
   })

module.exports = router

///home/carvalho/Workspace/Javascript/plantai-old/plantai/public/imgs/envolvidos/gustavoCarvalho.jpg