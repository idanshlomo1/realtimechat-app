import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const signUp = async (req, res) => {
    try {
        const { firstName, lastName, username, password, confirmPassword, gender } = req.body

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" })
        }

        const user = await User.findOne({ username })

        if (user) {
            return res.status(400).json({ error: "This username already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
        const otherProfilePic = `https://avatar.iran.liara.run/public`

        const newUser = new User({
            firstName,
            lastName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : gender === "female" ? girlProfilePic : otherProfilePic
        })

        await newUser.save()

        generateTokenAndSetCookie(newUser._id, res)

        res.status(201).json({
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        })

    } catch (error) {
        console.log("Error in sign up controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const signIn = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" })
        }

        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            profilePic: user.profilePic,
        })

    } catch (error) {
        console.log("Error in sign in controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0),
        });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
