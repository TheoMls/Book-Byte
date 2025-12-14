const fakeDB = {
    "p3220145@aueb.gr": { password: "123456Aa" }
}

function inDb(email) {
    return email in fakeDB
}

function getPassDb(email) {
    return fakeDB[email]?.password
}

function putDb(email, password) {
    fakeDB[email] = { password: password }
}

function checkEmail() {
    const emailInput = document.getElementById('email')
    const email = emailInput.value.trim()
    const msg = document.getElementById('message')

    msg.textContent = ""
    document.getElementById('email-step').classList.add('hidden')

    if (inDb(email)) {
        document.getElementById('login-step').classList.remove('hidden')
    } else {
        document.querySelectorAll('.req-item').forEach(element => {
            element.classList.remove('valid')
        })

        document.getElementById('new-password').type = "password"
        document.getElementById('show-password').textContent = "👁️"

        document.getElementById('create-step').classList.remove('hidden')
    }

}

function login() {
    const email = document.getElementById('email').value
    const password = document.getElementById('login-password').value
    const msg = document.getElementById('message')

    if (getPassDb(email) == password) {
        msg.textContent = "Logged in successfully!"
        msg.style.color = "green"
    } else {
        msg.textContent = "Incorrect password."
        msg.style.color = "red"
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('new-password')

    if (passwordInput) {
        passwordInput.addEventListener('input', function () {
            const val = passwordInput.value

            const setStatus = (id, isValid) => {
                const el = document.getElementById(id)
                if (isValid) {
                    el.classList.add('valid')
                } else {
                    el.classList.remove('valid')
                }
            }

            // Length 8 chars
            setStatus('req-length', val.length >= 8)

            // Lowercase
            setStatus('req-lower', /[a-z]/.test(val))

            // Uppercase
            setStatus('req-upper', /[A-Z]/.test(val))

            // Digit
            setStatus('req-num', /\d/.test(val))
        })
    }
})

function createAccount() {
    const email = document.getElementById('email').value
    const pw = document.getElementById('new-password').value
    const pw2 = document.getElementById('confirm-password').value
    const msg = document.getElementById('message')

    const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

    if (!complexityRegex.test(pw)) {
        msg.textContent = "Please meet all password requirements above."
        msg.style.color = "red"
        return
    }

    if (pw !== pw2) {
        msg.textContent = "Passwords do not match."
        msg.style.color = "red"
        return
    }


    putDb(email, pw)

    document.getElementById('create-step').classList.add('hidden')
    msg.textContent = "Account created! You can now log in."
    msg.style.color = "green"

    document.getElementById('email-step').classList.remove('hidden')
    document.getElementById('email').value = ""
    document.getElementById('new-password').value = ""
    document.getElementById('confirm-password').value = ""
}

function toggleVisibility(inputId, iconButton) {
    const input = document.getElementById(inputId)

    if (input.type === "password") {
        input.type = "text"
        iconButton.textContent = "❌"
    } else {
        input.type = "password"
        iconButton.textContent = "👁️"
    }
}

function goBack() {
    document.getElementById('login-step').classList.add('hidden')
    document.getElementById('create-step').classList.add('hidden')

    document.getElementById('email-step').classList.remove('hidden')

    document.getElementById('message').textContent = ""
    document.querySelectorAll('input').forEach(input => {
        input.value = ""
    })
}
