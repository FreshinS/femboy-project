import Cookies from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.mjs';

function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    const dayDifference = today.getDate() - birth.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }

    return age;
}

function ageWord(birthDate) {
    const age = calculateAge(birthDate);
    let ageWord;

    if (age % 10 === 1 && age % 100 !== 11) {
        ageWord = 'год';
    } else if (age % 10 >= 2 && age % 10 <= 4 && (age % 100 < 10 || age % 100 >= 20)) {
        ageWord = 'года';
    } else {
        ageWord = 'лет';
    }

    return ageWord;
}

function formatDate(date1) {
    const date = new Date(date1);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return `${day}.${month}.${year}`;
}

const token = Cookies.get('token')
const email = Cookies.get('email')

console.log(token)
console.log(email)

const response = await fetch('http://localhost:5500/auth/userInfo', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
        email: email
    })
});

if (response.ok) {
    const result = (await response.json())[0];
    console.log(result);
    const birthday = result.birthday;
    const age = calculateAge(birthday);
    const name = result.name + ' ' + result.surname + ', ' + age + ' ' + ageWord(birthday);
    console.log(name);
    const avatar = (new URL(result.avatar)).pathname;
    console.log(avatar);
    const email = result.email;
    const city = result.city;
    const about = result.about;
    const anime = result.anime;
    const characters = result.characters;

    document.getElementById('name').textContent = name;
    document.getElementById('birthday').textContent = `Дата рождения: ${formatDate(birthday)}`;
    document.getElementById('city').textContent = `Мой город: ${city}`;
    document.getElementById('about').textContent = about;
    document.getElementById('anime').textContent = anime;
    document.getElementById('characters').textContent = characters;
    document.getElementById('avatar').src = avatar;
} else {
    console.error('Please login!');
    window.location.pathname = '/index6.html';
}