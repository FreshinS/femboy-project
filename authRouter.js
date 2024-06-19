const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require("express-validator")
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')

router.post('/registration', [
    check('name', "Имя не может быть пустым").notEmpty(),
    check('surname', "Фамилия не может быть пустой").notEmpty(),
    check('email', "Неверный формат почты").isEmail(),
    check('avatar', "Вставьте автар").notEmpty(),
    check('birthday', "Введите дату рождения").notEmpty(),
    check('about', "Заполните поле о себе").notEmpty(),
    check('password', "Пароль не может быть короче 4 или длинее 16 символов").isLength({min:4, max:16}),
    check('city', 'Поле "Ваш город/область" не может быть пустым').notEmpty(),
    check('characters', "Укажите ваших любимых персонажей").notEmpty(),
    check('anime', "Укажите ваши любимые аниме").notEmpty(),
], controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)
router.post('/userInfo', authMiddleware, controller.getUserInfo)

module.exports = router