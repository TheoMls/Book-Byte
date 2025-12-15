function openNav(id, push, blur = true) {
    const sidebar = document.getElementById(id)
    const mainContent = document.getElementById("main")
    const overlay = document.getElementById("overlay")

    sidebar.classList.add('open')
    if (push) {
        mainContent?.classList.add('pushed')
    } else if (blur) {
        overlay?.classList.add('active')
    }
}

function closeNav(id) {
    const sidebar = document.getElementById(id)
    const mainContent = document.getElementById("main")
    const overlay = document.getElementById("overlay")

    sidebar.classList.remove('open')
    overlay?.classList.remove('active')
    mainContent?.classList.remove('pushed')
}