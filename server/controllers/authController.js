//server/controllers/authController.js
const UserAuthModel = require('../model/UserAuth')
const jwt = require('jsonwebtoken')

//Get: '/' 
const test = (req,res) =>{
    res.json('test is working')
}
//POST: '/register' endpoint create user in the database on post 
const registerUser = async (req,res) =>{
    try {
        const {name,username,password,role} = req.body;
        //check if password is good
        if(password.length <6){
            return res.json({
                err: 'Password should be at least 6 charecter long'
            })           
        }
        //check if username already exits
        const exists = await UserAuthModel.findOne({username})
        if(exists){
            return res.json({
                err: 'username already exists'
            })           
        }
        //'Create' data User to the database if all checks ok
        const user = await UserAuthModel.create({
            name,username,password,role
        })
        return res.json(user)
        
    } catch (error) {
        console.log(error)       
    }
    
}

//POST: '/login' endpoint  for user in the database
const loginUser = async (req,res) => {
    try {
        const {username,password} = req.body; //destructure the inserted login and pass 
        //check if the user exist
        const user = await UserAuthModel.findOne({username});
        if(!user){
            return res.json({
                err: 'No user found'
            })
        }
        //check if the password match
        //if a user is found, it then compares the  password stored in the database (user.password)
        // with the plaintext password provided by the user.
            if (user.password !== password) {
            return res.json({
                err: 'Password is incorrect'
            });
            }else{
                jwt.sign({username: user.username, id: user._id, name: user.name,role: user.role},process.env.JWT_SECRET,{},(err,token) =>{
                    if(err) throw err;
                    res.cookie('token',token).json(user)
                })
                //res.json({ message: 'Login successful', user: user._id });
            } 
    } catch (error) {
        console.log(error);
    }
}

//GET: '/getProfile' endpoint 
const getProfile = (req,res)=>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
            if (err) throw err;
            res.json(user)
        })
    }else{
        res.json(null)
    }
}

// server-side express.js code to clear a cookie
const doLogout = (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.send({ message: 'Logged out successfully' });
};


module.exports = {
    test,registerUser,loginUser, getProfile, doLogout
}
