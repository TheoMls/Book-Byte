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

        document.getElementById('create-pass').classList.remove('hidden')
    }

}

function login() {
    const email = document.getElementById('email').value
    const password = document.getElementById('login-password').value
    const msg = document.getElementById('message')

    if (getPassDb(email) == password) {
        msg.textContent = "Logged in successfully!"
        msg.style.color = "green"
        window.location.href = "index.html"
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

    const interestsContainer = document.getElementById('interests-container')

    if (interestsContainer) {
        interestsContainer.innerHTML = ""

        categoriesData.forEach(cat => {
            const label = document.createElement('label')

            const input = document.createElement('input')
            input.type = "checkbox"
            input.name = "interest"
            input.value = cat.id

            label.appendChild(input)
            label.appendChild(document.createTextNode(" " + cat.name))

            interestsContainer.appendChild(label)
        })

    }
})

function createAccount() {
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

    msg.textContent = ""

    document.getElementById('create-pass').classList.add('hidden')
    document.getElementById('create-personal').classList.remove('hidden')
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

function createPersonal() {
    const dobInput = document.getElementById('dob').value
    const fname = document.getElementById('fname').value
    const lname = document.getElementById('lname').value
    const msg = document.getElementById('message')


    if (!fname || !lname || !dobInput) {
        msg.textContent = "Please fill out all fields."
        msg.style.color = "red"
        return
    }

    const age = Date.now() - new Date(dobInput).getTime()

    // (365.25 days (.25 due to 1/4 leap years) * 24 hours * 60 min * 60 sec * 1000 ms)
    const msInYear = 365.25 * 24 * 60 * 60 * 1000
    if (age < 16 * msInYear) {
        msg.textContent = "You must be at least 16 years old to create an account."
        msg.style.color = "red"
        return
    } else if (age > 120 * msInYear) {
        msg.textContent = "Seems unlikely."
        msg.style.color = "red"
        return
    }

    msg.textContent = ""
    document.getElementById('create-personal').classList.add('hidden')
    document.getElementById('create-interests').classList.remove('hidden')
}

function createInterests() {
    const email = document.getElementById('email').value
    const fname = document.getElementById('fname').value
    const lname = document.getElementById('lname').value
    const dob = document.getElementById('dob').value

    const experienceRadio = document.querySelector('input[name="experience"]:checked')
    const experience = experienceRadio.parentNode.textContent.trim()

    const selectedInterests = Array.from(document.querySelectorAll('input[name="interest"]:checked'))
        .map(checkbox => checkbox.parentNode.textContent.trim())

    const summaryHTML = `
        <div class="summary-group">
            <h4>Personal Details</h4>
            <p><strong>Name:</strong> ${fname} ${lname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date of Birth:</strong> ${dob}</p>
        </div>
        
        <hr style="border: 0; border-top: 1px solid #ddd; margin: 10px 0;">

        <div class="summary-group">
            <h4>Profile Preferences</h4>
            <p><strong>Experience Level:</strong> ${experience}</p>
            <p><strong>Interests:</strong> ${selectedInterests.length > 0 ? selectedInterests.join(', ') : '<i>None selected</i>'}</p>
        </div>
    `

    document.getElementById('summary-content').innerHTML = summaryHTML

    document.getElementById('create-interests').classList.add('hidden')
    document.getElementById('create-review').classList.remove('hidden')
}

function finalizeAccount() {
    const termsCheckbox = document.getElementById('terms')
    const msg = document.getElementById('message')
    if (!termsCheckbox.checked) {
        msg.textContent = "You must agree to the Terms and Conditions."
        msg.style.color = "red"
        return
    }



    const email = document.getElementById('email').value
    const pw = document.getElementById('new-password').value

    putDb(email, pw)


    document.getElementById('create-review').classList.add('hidden')
    goBack()
    msg.textContent = "Account successfully created!"
    msg.style.color = "green"
}

function goBack(where) {
    document.getElementById('message').textContent = ""

    document.querySelectorAll('.step').forEach(step => {
        step.classList.add('hidden')
    })


    if (where) {
        document.getElementById(where).classList.remove('hidden')
    } else {
        document.querySelectorAll('input').forEach(input => {
            if (['checkbox', 'radio'].includes(input.type)) {
                input.checked = false
                if (input.value === "beginner")
                    input.checked = true
            } else
                input.value = ""


        })
        document.getElementById('email-step').classList.remove('hidden')
    }

}
