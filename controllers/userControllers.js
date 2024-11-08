const recipes = require('../model/recipeSchema')
const users = require('../model/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(400).json('User already exists')
        }
        else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = new users({
                username,
                email,
                password: hashedPassword,
                about: '',
                instagram: '',
                youtube: '',
                profilepic: '',
                uploadrecipe: []
            })
            newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await users.findOne({ email })

        if (existingUser) {
            const isPassword = await bcrypt.compare(password, existingUser.password)
            if (!isPassword) {
                res.status(400).json('Invalid username or password')
            }
            else {
                const token = jwt.sign({ userId: existingUser._id }, 'secretKey')
                res.status(200).json({ existingUser, token })
            }
        }
        else {
            res.status(400).json('Invalid username or password')
        }
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.payload
        const { username, password, email, about, instagram, youtube, profilepic } = req.body
        profileImage = req.file ? req.file.filename : profilepic
        const existingUser = await users.findByIdAndUpdate({ _id: userId }, {
            username, password, email, about, instagram, youtube, profilepic: profileImage
        }, { new: true })
        await existingUser.save()
        res.status(200).json(existingUser)
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

exports.getUserDet = async (req, res) => {
    try {
        const { id } = req.params
        const existingUser = await users.findOne({_id:id})
        res.status(200).json(existingUser)

    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}