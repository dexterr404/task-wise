import passport from "passport";
import User from "../models/User.js";
import jwt from "jsonwebtoken"

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const registerUser = async(req,res) => {
    try {
        const {name,email,password} = req.body;
        console.log("Incoming register:", req.body);
        const userExists = await User.findOne({email});
        if(userExists)
            return res.status(400).json({message: "User already exists"});

        const user = await User.create({name,email,password,focus: null});

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({message: "Server error", error})
    }
}

export const loginUser = async(req,res) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user)
            return res.status(400).json({message: "Invalid credentials"});

        const isMatch = await user.matchPassword(password);
        if(!isMatch)
            return res.status(400).json({message: "Invalid credentials"});
        
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            focus: user.focus,
            token: generateToken(user._id),
            insights: user.insights
        })
    } catch (error) {
        res.status(500).json({message: "Server error", error})
    }
}

export const googleAuthCallback = (req,res) => {
    const { token, user } = req.user;
    const redirect = req.query.state || "";

    res.redirect(
        `${process.env.APP_BASE_URL2}/auth/success/?token=${token}&userId=${user._id}&provider=google&redirect=${encodeURIComponent(redirect)}`
    )
}

export const getCurrentUser = async(req,res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}