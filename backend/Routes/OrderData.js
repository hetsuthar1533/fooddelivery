const express = require('express')
const router = express.Router()
const order = require('../models/Orders')


router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    // console.log(typeof (data.items))
    await data.items.splice(0, 0, { Order_date: req.body.order_date })
    // console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await order.findOne({ 'email': req.body.email })
    console.log(eId)
    if (eId === null) {
        try {
            // console.log(data)
            // console.log("1231242343242354",req.body.email)
            await order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})
  
router.post('/myorderData', async (req, res) => {
    try {
        let mydata = await order.findOne({email: req.body.email});
        res.json(mydata);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});



module.exports = router;