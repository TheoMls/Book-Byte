const fakeDB = {
    "p3220145@aueb.gr": { password: "1234" }
}

function checkEmail() {
    const email = document.getElementById('email').value

    document.getElementById('email-step').classList.add('hidden')
    if (fakeDB[email]) {
        document.getElementById('login-step').classList.remove('hidden')
    } else {
        document.getElementById('create-step').classList.remove('hidden')
    }
}

function login() {
    const email = document.getElementById('email').value
    const password = document.getElementById('login-password').value

    if (fakeDB[email].password == password) {
        document.getElementById('message').textContent = "Logged in successfully!"
    } else {
        document.getElementById('message').textContent = "Incorrect password."
    }
}

function createAccount() {
    const email = document.getElementById('email').value
    const pw = document.getElementById('new-password').value
    const pw2 = document.getElementById('confirm-password').value

    if (pw !== pw2) {
        document.getElementById('message').textContent = "Passwords do not match."
        return
    }

    fakeDB[email] = { password: pw }
    document.getElementById('message').textContent = "Account created! You can now log in."
}
