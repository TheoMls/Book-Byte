function openNav(id, push) {
    updateWindowSize();

    console.log(window_size)
    document.getElementById(id).style.width = window_size + "px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    if (push)
        document.getElementById("main").style.marginLeft = window_size + "px";
}

function closeNav(id) {
    document.getElementById(id).style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}
let window_size = 200
function updateWindowSize() {
    if (window.innerWidth <= 1000) {
        window_size = Math.floor(window.innerWidth / 2.25);
    } else {
        window_size = 200;
    }
}