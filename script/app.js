const root = document.querySelector("#root");
const contextMenu = document.querySelector("#context-menu");
const optionNew = document.querySelector("#new");
const uuids = [];
const blocks = {}

let selected = null;
let selectedX = 0;
let selectedY = 0;

window.addEventListener("contextmenu", function(event) {
    event.preventDefault();
    contextMenu.style.display = "flex";
    contextMenu.style.left = `${event.clientX}px`;
    contextMenu.style.top = `${event.clientY}px`;
});

window.addEventListener("click", function(event) {
    if (event.target.closest(".context-menu") == null) {
        if (contextMenu.style.display === "flex") {
            contextMenu.style.display = "none";
        }
    }
});

window.addEventListener("mousedown", function(event) {
    selected = event.target.closest(".main__card");
    if (selected == null) {
        return;
    }
    if (selected.classList.contains("block")) {
        const off = offset(selected);
        selectedX = event.pageX - off.left;
        selectedY = event.pageY - off.top;
        selected.style.filter = "drop-shadow(0.3em 0.3em 0.3em #00000030)";
    }
})

window.addEventListener("mouseup", function() {
    if (selected != null) {
        selected.style.filter = "unset";
        selected = null;
    }
});

window.addEventListener("mousemove", function(event) {
    if (selected) {
        const x = (event.clientX - selectedX) - ((event.clientX + selectedX) % 20);
        const y = (event.clientY - selectedY) - ((event.clientY + selectedY) % 20);
        selected.style.transform = `translate(${x}px, ${y}px)`;
    }
});

optionNew.addEventListener("click", function(event) {
    contextMenu.style.display = "none";
    const element = (event.target.nodeName === "DIV" ? event.target.lastElementChild.cloneNode(true) : event.target.nextElementSibling.cloneNode(true));
    const tdTheme = new todoTheme(element, null);
    const x = event.clientX - (event.clientX % 20);
    const y = event.clientY - (event.clientY % 20);
    element.style.transform = `translate(${x}px, ${y}px)`;
    root.append(element);
});

function offset(el) {
    const box = el.getBoundingClientRect();
    return {
        left: box.left + window.pageXOffset - document.documentElement.clientLeft,
        top: box.top + window.pageYOffset - document.documentElement.clientTop
    };
}
