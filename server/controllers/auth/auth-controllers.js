const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');


//register

const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });

        if (checkUser) return res.json({ success: false, message: 'User alreday exist With the same email please try again' })
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName,
            email,
            password: hashPassword,
        })

        await newUser.save()
        res.status(200).json({
            success: true,
            message: "Registration Sucessfull",
        })
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "some error occured",
        });
    }
};

//login

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.json({
                success: false,
                message: "User doesn't exist! Please register first."
            });
        }

        // ✅ Compare password
        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if (!checkPasswordMatch) {
            return res.json({
                success: false,
                message: "Incorrect password! Please try again."
            });
        }

         // ✅ Generate token
        const token = jwt.sign(
            { id: checkUser._id, role: checkUser.role, email: checkUser.email },
            'CLIENT_SECRET_KEY', // ideally move this to process.env.JWT_SECRET
            { expiresIn: '60m' }
        );

        // ✅ Send cookie + response
        res.cookie('token', token, { httpOnly: true, secure: false }).json({
            success: true,
            message: 'Login successful!',
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id
            }
        });

    } catch (e) {
        console.error("Login error:", e);
        res.status(500).json({
            success: false,
            message: "Some error occurred during login.",
        });
    }
};

//logout

const logoutUser =(req,res)=> {
    req.clearCookie('token').json({
        success:true,
        message:"Logged Out Sucessfully !"
    })
}

//auth middleware

const authmiddleware = async(req,res,next) =>{
    const token = req.cookie.token;
    if(!token) return res.status(400).json({
        success:false,
        message:'Unauthorized User!'
    })
    try{
        const decoded = jwt.verify(token,'CLIENT_SECRET_KEY');
        req.user = decoded;
        next();
    }catch(error){
        res.status(401).json({
        success:false,
        message:'Unauthorized User!'
    })
    }
}


module.exports = { registerUser,loginUser,logoutUser,authmiddleware }