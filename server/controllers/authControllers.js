const User = require('../models/authModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const userExist = await User.findOne({ email })
        if (userExist) {
            res.status(400).json({ message: 'User already exist' })
            return
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create(
            {
                name,
                email,
                password: hashedPassword
            }
        )
        res.status(201).json({ message: 'Register successfully ' })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userExist = await User.findOne({ email })
        if (!userExist) {
            res.status(401).json({ message: 'Invalid email' })
            return
        }
        const isMatch = await bcrypt.compare(password, userExist.password)
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid password' })
            return
        }
        const token = jwt.sign(
            { id: userExist._id },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
        )
        res.json({ token, message: 'Login succesfully' })
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

const getHome = async (req, res) => {
    const user = await User.findById(req.userId);
    res.json(user);
};

module.exports = { register, login, getHome }