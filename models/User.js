const {Schema, model} = require('mongoose')

const User = new Schema({
    name: {type: String, unique: false, required: true},
    surname: {type: String, unique: false, required: true},
    avatar: {type: String, unique: false, required: false},
    email: {type: String, unqiue: true, required: true },
    sex: {type: String, unique: false, required: true},
    password: {type: String, unique: false, required: true},
    city: {type: String, unique: false, required: true},
    birthday: {type: Date, unique: false, required: true},
    about: {type: String, unique: false, required: true},
    characters: {type: String, unique: false, required: true},
    anime: {type: String, unique: false, required: true},
    roles: [{type: String, ref: 'Role'}]
})

module.exports = model('User', User)