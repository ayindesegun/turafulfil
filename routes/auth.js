const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const {registerValidation, loginValidation} = require('../validation')


router.post('/register', async (req, res) => {
  //Validating user before creating a user
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  //Checking if a contact exists
  const contactExists = await User.findOne({
    contact: req.body.contact
  })
  if (contactExists) return res.status(400).send('Phone number already exists')


  //hashing passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  //Create a new user
  const user = new User({
    name: req.body.name,
    password: hashedPassword,
    contact: req.body.contact,
    email: req.body.email,
    businessName: req.body.businessName
  })
  try {
    const savedUser = await user.save()
    res.send({user: user._id})
  } catch (err) {
    res.status(400).send(err)
  }
})

//Login route 
router.post('/login', async (req, res) => {
   //Validating user before logging a user in
   const { error } = loginValidation(req.body)
   if (error) return res.status(400).send(error.details[0].message)
   //Checking if contact exists on DB

   const user = await User.findOne({
    contact: req.body.contact
   })
   if (!user) return res.status(400).send('User does not exist, please signup')
   //Checking and comparing password
   const validPass = await bcrypt.compare(req.body.password, user.password)
   if (!validPass) return res.status(400).send('Invalid Password')
   // Create and assign a token
const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
res.header('auth-token', token).send(token)

   /* res.send("Logged in") */
})


module.exports = router
