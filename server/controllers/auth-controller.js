const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try{
        res.status(200).send("Welcome to the Router Page!");
    }
    catch(error) {
        console.log(error);
    }
};

const register = async(req, res) => {
    try{
        const {username, email, phone, password, confirm_password} = req.body;
        const userExists = await User.findOne({email: email});

        if(userExists) {
            return res.status(400).json({"message": "email already exits"});
        }

        if(password !== confirm_password) {
            return res.status(400).json({"message": "Passwords do not match."});
        }
        const userCreated = await User.create({username, email, phone, password});

        console.log(req.body);
        //userId: userCreated._id.toString()
        res.status(200).json({"message": "Registration successful!", token: await userCreated.generateToken(), user: userCreated});
    }
    catch(error) {
        res.status(500).json("Internal server error!");
        console.log(error);
    }
}

const login = async(req, res) => {
    try{
        const {email, password} = req.body;
        const userExists = await User.findOne({email: email});

        if(!userExists) {
            return res.status(400).json({message: "Invalid Credentials!"});
        }

        // const isPasswordValid = await bcrypt.compare(password, userExists.password);
        const user = await userExists.comparePasswords(password);
        if(user) {
            res.status(200).json({"message": "Login successful!", token: await userExists.generateToken(), userId: userExists._id.toString()});
        }
        else{
            res.status(401).json({message: "Invalid email or password!"});
        }
    }
    catch(error) {
        // res.status(500).json("Internal server error!");
        console.log(error);
        next(error);
    }
}

const setIcon = async (req, res) => {
  try {
    const { userId, icon } = req.body;
    const user = await User.findByIdAndUpdate(userId, { icon }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "Icon updated successfully" });
  } catch (error) {
    console.error("Icon update error:", error);
    res.status(500).json({ message: "Server error while updating icon" });
  }
};


//to send user data
const user = async (req, res) => {
    try{
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({userData});
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = {home, register, login, setIcon, user};