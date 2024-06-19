import Cookies from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.mjs';

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5500/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    if (response.ok) {
        const result = await response.json();
        console.log('User login succesfully:', result);
        Cookies.set('token', result.token);
        Cookies.set('email', email);
        console.log(`cookie jwt: ${Cookies.get('token')}`);
        window.location.pathname = '/index4.html';
    } else {
        console.error('Login failed');
    }
});