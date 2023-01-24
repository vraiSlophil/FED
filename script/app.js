const root = document.querySelector("#root");
const contextMenu = document.querySelector("#context-menu");
const optionNew = document.querySelector("#new");

let selected = null;
let selectedX = 0;
let selectedY = 0;

window.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    contextMenu.style.display = "flex";
    contextMenu.style.left = `${event.clientX}px`;
    contextMenu.style.top = `${event.clientY}px`;
});

window.addEventListener("click", (event) => {
    if (event.target.closest(".context-menu") == null) {
        if (contextMenu.style.display === "flex") {
            contextMenu.style.display = "none";
        }
    }
});

window.addEventListener("mousedown", (event) => {
    if (event.target.nodeName === "INPUT") {
        return;
    }
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

window.addEventListener("mouseup", () => {
    if (selected != null) {
        selected.style.filter = "unset";
        selected = null;
    }
});

window.addEventListener("mousemove", (event) => {
    if (selected === null) {
        return;
    }
    event.stopPropagation();
    const x = (event.clientX - selectedX);
    const y = (event.clientY - selectedY);
    selected.style.transform = `translate(${x}px, ${y}px)`;

});

optionNew.addEventListener("click", (event) => {
    contextMenu.style.display = "none";
    const element = (event.target.nodeName === "DIV" ? event.target.lastElementChild.cloneNode(true) : event.target.nextElementSibling.cloneNode(true));
    const tdTheme = new todoTheme(element, null);
    const x = event.clientX;
    const y = event.clientY;
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
