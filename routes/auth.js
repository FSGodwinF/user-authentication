const router = require('express').Router();
const User = require('../model/User');
const{ registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




//REGISTERING A USER
router.post('/register', async (req, res)=>{
   //Validating the user before creating a new user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user exists in the database
    //we will check using the email of the new user
    const emailExists = await User.findOne({email:req.body.email});
    if(emailExists) return res.status(400).send('Email already exists');

    //HASH THE PASSWORDS
    // this salt combines with the user password to create a mess of a text
    // that makes the password not appear as text in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);



    //creating a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }

});

//LOGIN AN EXISTING USER
router.post('/login', async (req, res)=>{
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //checking if user exists through the email
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email or password is incorrect.');
    //checking if the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid Password!!!');

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
})
module.exports = router;