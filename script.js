let dropdownBtn = document.getElementById("drop-text");
let list = document.getElementById("list");
let icon = document.getElementById("icon");
let span = document.getElementById("span");
let listItems = document.querySelectorAll(".dropdown-list-item");

dropdownBtn.onclick = function () {
    if (list.classList.contains("show")) {
        icon.style.rotate = "0deg";
    } else {
        
        icon.style.rotate = "-180deg";
    } 
    list.classList.toggle("show");
};

window.onclick = function (e) {
    if (
        e.target.id !== "drop-text" &&
        e.target.id !== "icon" &&
        e.target.id !== "span"
    ) {
        list.classList.remove("show");
        icon.style.rotate = "0deg";
    }
};

for (item of listItems) {
    item.onclick = function (e) {
        span.innerHTML = e.target.innerHTML;
    }; 
}