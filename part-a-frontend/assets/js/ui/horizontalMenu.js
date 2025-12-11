window.onload = function () {
    horizontal = document.getElementById("horizontalMenuContainer");
    horizontal.addEventListener("wheel", (e) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        horizontal.scrollLeft += e.deltaY / 4;
    }, { passive: false });
};