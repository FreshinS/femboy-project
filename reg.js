document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const avatarInput = document.getElementById('avatar');
    const avatarFile = avatarInput.files[0];

    let uploadedAvatarUrl = '';
    if (avatarFile) {
        const formData = new FormData();
        formData.append('avatar', avatarFile);

        const uploadResponse = await fetch('http://localhost:5500/upload', {
            method: 'POST',
            body: formData,
        });

        if (uploadResponse.ok) {
            const uploadResult = await uploadResponse.json();
            uploadedAvatarUrl = uploadResult.url;
        } else {
            console.error('Failed to upload avatar');
            return;
        }
    }

    
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const birthday = document.getElementById('birthday').value;
    const city = document.getElementById('city').value;
    const about = document.getElementById('about').value;
    const anime = document.getElementById('anime').value;
    const characters = document.getElementById('characters').value;
    let sex;

    const path = window.location.pathname;
    if (path === '/index2.html') sex = 'man'; 
    else if (path === '/index3.html') sex = 'woman'

    console.log(JSON.stringify({
            name: name,
            surname: surname,
            email: email,
            sex: sex,
            password: password,
            city: city,
            birthday: birthday,
            avatar: uploadedAvatarUrl,
            about: about,
            characters: characters,
            anime: anime}));

    const response = await fetch('http://localhost:5500/auth/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            surname: surname,
            email: email,
            sex: sex,
            password: password,
            city: city,
            birthday: birthday,
            avatar: uploadedAvatarUrl,
            about: about,
            characters: characters,
            anime: anime
        })
    });

    if (response.ok) {
        const result = await response.json();
        console.log('User registered:', result);
    } else {
        console.error('Registration failed');
    }
});
