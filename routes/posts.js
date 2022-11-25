const router = require('express').Router();
const verify = require('./verifytokens');

router.get('/', verify, (req, res)=>{
    res.json({
        posts: {
        title: "Welcome to my page",
        description: "You should not be here without access"
        }
    })
});



module.exports = router;