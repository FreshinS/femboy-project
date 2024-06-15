const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const { secret } = require("./config")

const generateAccesToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            } 
            const {name, surname, avatar, email, sex, password, city, birthday, about, characters, anime} = req.body
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: "Пользователь c этой почтой уже зарегистрирован"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({name: name, surname: surname, avatar: avatar, email: email, sex: sex, password: hashPassword, city: city, birthday: birthday, about: about, characters: characters, anime: anime, roles: [userRole.value]})
            await user.save()
            return res.json({message: "Пользователь успешно зарегистрирован"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: "Пользователя c таким именем не существует"})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: "Введён неверный пароль"})
            }
            const token = generateAccesToken(user._id, user.roles)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()