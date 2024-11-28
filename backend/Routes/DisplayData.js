const express = require('express')
const router = express.Router()


router.post('/foodData',  (req, res) => {
    try{
           res.send([global.fooditems,global.foodCategory])
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
})

module.exports = router;