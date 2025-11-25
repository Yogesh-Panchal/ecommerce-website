const express = require('express')
//const authMiddleware = require('../../middleware/authMiddleware'); 
const { registerUser,loginUser, logoutUser,authmiddleware } = require('../../controllers/auth/auth-controllers')

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/check-auth',authmiddleware,(req,res) =>{
    const user = req.user;
    req.status(200).json({
        success:true,
        message:'Authenticated User!',
        user,
    })
})

module.exports = router;