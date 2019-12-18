var router = require('express').Router();
const fs = require('fs')

router.post('/photo',function(req,res){
    var newItem = new Item();
    newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
    newItem.img.contentType = 'image/png'
    newItem.save();
   })

module.exports = router

///home/carvalho/Workspace/Javascript/plantai-old/plantai/public/imgs/envolvidos/gustavoCarvalho.jpg