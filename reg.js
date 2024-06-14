let name = document.querySelector('#name')
let surname = document.querySelector('#surname')
let osebe = document.querySelector('#osebe')
let gorod = document.querySelector('#gorod')
let submit = document.querySelector('#submit')
let password2 = document.querySelector('#password2')

let users = {};

function User(name, surname, password2) {
	this.name = name;
	this.surname = surname;
	this.password2 = password2;

} 

function createId(users) {
	return Object.keys(users).length;
}

let image1 = document.getElementById('image1');

if (submit) {
    submit.addEventListener('click', () => {
        const nameUser = name.value;
        const surnameUser = surname.value;
        const password2User = password2.value;

        const user = new User(nameUser, surnameUser, password2User);

        const userId = 'User' + createId(users);
        users[userId] = user;

        console.log(users)
    })
};