function openNav(id, blur = true) {
    const sidebar = document.getElementById(id)
    const overlay = document.getElementById("overlay")

    if (sidebar.classList.contains('open')) {
        closeNav(id)
        return
    }
    
    sidebar.classList.add('open')
    if (blur) {
        overlay?.classList.add('active')
        document.body.classList.add("no-scroll")
    }
}

function closeNav(id) {
    const sidebar = document.getElementById(id)
    const overlay = document.getElementById("overlay")

    sidebar.classList.remove('open')
    overlay?.classList.remove('active')
    document.body.classList.remove("no-scroll")
}