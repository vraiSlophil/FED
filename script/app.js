const root = document.getElementById("root");
const contextMenu = document.getElementById("context-menu");
const optionNew = document.getElementById("new");
const uuids = new Array();
const blocks = {}

const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
ctx.canvas.width = root.offsetWidth;
ctx.canvas.height = root.offsetHeight;
ctx.strokeStyle = "#fff";
ctx.lineWidth = 2;

let selected = null;
let selectedPine = null;

class Block {

    constructor(id) {

        this.id = id;

    }

}

function generateUuid() {

    let uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));

    for (key in uuids) {

        if (uuid == key) return generateUuid();

    }

    if (!uuids.includes(uuid)) uuids.push(uuid);

    return uuid;

}

window.addEventListener("contextmenu", (event) => {

    event.preventDefault();
    contextMenu.style.display = "flex";
    contextMenu.style.left = `${event.clientX}px`;
    contextMenu.style.top = `${event.clientY}px`;

});

window.addEventListener("click", (event) => {

    event.preventDefault();
    if (event.target != contextMenu && !Array.from(contextMenu.querySelectorAll("*")).includes(event.target)) {
        if (contextMenu.style.display == "flex") {
            contextMenu.style.display = "none";
        }
    }

});

window.addEventListener("mousedown", (event) => {

    event.preventDefault();
    if (event.target.classList.contains("block")) {

        selected = event.target;
        let matrix = window.getComputedStyle(selected).transform.match(/matrix.*\((.+)\)/)[1].split(', ');
        selectedX = event.clientX - matrix[4];
        selectedY = event.clientY - matrix[5];

    }
})

window.addEventListener("mouseup", (event) => {
    event.preventDefault();
    selected = null;
});

window.addEventListener("mousemove", (event) => {

    if (selected) {

        let matrix = window.getComputedStyle(selected).transform.match(/matrix.*\((.+)\)/)[1].split(', ');
        let x = (event.clientX - selectedX) - ((event.clientX - selectedX) % 20);
        let y = (event.clientY - selectedY) - ((event.clientY - selectedY) % 20);
        if (matrix[4] != x || matrix[5] != y) {

            selected.style.transform = `translate(${x}px, ${y}px)`;
        }

    }
});

optionNew.addEventListener("click", (event) => {

    event.preventDefault();
    contextMenu.style.display = "none";

    let uuid = generateUuid();
    let element = (event.target.nodeName == "DIV" ? event.target.lastElementChild.cloneNode(true) : event.target.nextElementSibling.cloneNode(true));
    element.setAttribute("id", uuid);

    let x = event.clientX - (event.clientX % 20);
    let y = event.clientY - (event.clientY % 20);

    element.style.transform = `translate(${x}px, ${y}px)`;
    element.style.width = `220px`;
    element.style.height = `160px`;
    root.appendChild(element);
    blocks[uuid] = new Block(uuid);
});