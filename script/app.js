const $root = $("#root");
const $contextMenu = $("#context-menu");
const $optionNew = $("#new");
const $headerHeight = $("#header").outerHeight();
const uuids = [];
const blocks = {}

// const c = $("#canvas");
// const ctx = c[0].getContext("2d");
// ctx.canvas.width = $root.offset().width;
// ctx.canvas.height = $root.offset().height;
// ctx.strokeStyle = "#fff";
// ctx.lineWidth = 2;

// let matrix = null;
let selected = null;
let selectedX = 0;
let selectedY = 0;


class Block {

    constructor(id) {

        this.id = id;

    }

}

function generateUuid() {

    let uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));

    for (key in uuids) {

        if (uuid === key) return generateUuid();

    }

    if (!uuids.includes(uuid)) uuids.push(uuid);

    return uuid;

}

$(window).contextmenu(function(event) {

    event.preventDefault();
    $contextMenu.css("display", "flex");
    $contextMenu.css({
        left: `${event.clientX}px`,
        top: `${event.clientY - $headerHeight}px`
    });

});

$(window).click(function(event) {

    const target = $(event.target).closest("#context-menu");

    if (target.length <= 0) {
        if ($contextMenu.css("display") === "flex") {
            $contextMenu.css("display", "none");
        }
    }

});

$(window).mousedown(function(event) {

    selected = $(event.target).closest("#main__card");

    if (selected.hasClass("block")) {

        const $offset = $(selected).offset();
        selectedX = event.pageX - $offset.left;
        selectedY = event.pageY - $offset.top;
    }

})

$(window).mouseup(function() {

    selected = null;

});

$(window).mousemove(function(event) {

    if (selected) {
        let x = (event.clientX - selectedX - (event.clientX % 20)) + (selectedX % 20);
        let y = (event.clientY - selectedY - $headerHeight - (event.clientY % 20)) + (selectedY % 20);
        $(selected).css({
            transform: `translate(${x}px, ${y}px)`
        });
    }

});

$optionNew.click(function(event) {

    $contextMenu.css("display", "none");

    let uuid = generateUuid();
    let element = (event.target.nodeName === "DIV" ? event.target.lastElementChild.cloneNode(true) : event.target.nextElementSibling.cloneNode(true));
    element.classList.add(uuid);

    const tdTheme = new todoTheme(element);

    tdTheme.getToggleContentButton.addEventListener("click", () => {
        tdTheme.toggleContentClick();
    });

    tdTheme.getAddPeopleButton.addEventListener("click", () => {
        tdTheme.invitePeopleClick();
    });

    tdTheme.getDeleteButton.addEventListener("click", () => {
        tdTheme.deleteClick();
    });

    tdTheme.getEditButton.addEventListener("click", () => {
        tdTheme.editClick();
    });

    tdTheme.getValidateButton.addEventListener("click", () => {
        tdTheme.validateClick();
    });

    tdTheme.getContentNewTaskButton.addEventListener("click", () => {
        tdTheme.newTaskClick();
    });

    let x = event.clientX - (event.clientX % 20);
    let y = event.clientY - (event.clientY % 20) - $headerHeight;

    $(element).css("transform", `translate(${x}px, ${y}px)`);
    $root.append(element);
    blocks[uuid] = new Block(uuid);
});