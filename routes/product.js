const router = require('express').Router()


router.get('/', (req, res) => {
    res.send("This is the product display page")
})

router.post('/', (req, res) => {
    
})




module.exports = router