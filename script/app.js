const $root = $("#root");
const $contextMenu = $("#context-menu");
const $optionNew = $("#new");
const uuids = [];
const blocks = {}

let selected = null;
let selectedX = 0;
let selectedY = 0;

$(window).contextmenu(function(event) {
    event.preventDefault();
    $contextMenu.css("display", "flex");
    $contextMenu.css({
        left: `${event.clientX}px`,
        top: `${event.clientY}px`
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
        $(selected).css("filter", "drop-shadow(0.3em 0.3em 0.3em #00000030)");
    }
})

$(window).mouseup(function() {
    $(selected).css("filter", "unset");
    selected = null;
});

$(window).mousemove(function(event) {
    if (selected) {
        let x = (event.clientX - selectedX - (event.clientX % 20)) + (selectedX % 20);
        let y = (event.clientY - selectedY - (event.clientY % 20)) + (selectedY % 20);
        $(selected).css({
            transform: `translate(${x}px, ${y}px)`
        });
    }
});

$optionNew.click(function(event) {
    $contextMenu.css("display", "none");
    const element = (event.target.nodeName === "DIV" ? event.target.lastElementChild.cloneNode(true) : event.target.nextElementSibling.cloneNode(true));
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
    const x = event.clientX - (event.clientX % 20);
    const y = event.clientY - (event.clientY % 20);
    $(element).css("transform", `translate(${x}px, ${y}px)`);
    $root.append(element);
});