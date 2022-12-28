function toggleVisibilityNicknameEdit(){
    const element = document.getElementById("nicknameedit");

    if (element.classList.contains("hide")){
        element.classList.remove("hide");
        element.classList.add("show");
    } else {
        element.classList.remove("show");
        element.classList.add("hide");
    }

}
function toggleVisibilityPasswordEdit(){
    const element = document.getElementById("passwordedit");

    if (element.classList.contains("hide")){
        element.classList.remove("hide");
        element.classList.add("show");
    } else {
        element.classList.remove("show");
        element.classList.add("hide");
    }

}

function toggleVisibilityEmailEdit() {
    const element = document.getElementById("emailedit");

    if (element.classList.contains("hide")){
        element.classList.remove("hide");
        element.classList.add("show");
    } else {
        element.classList.remove("show");
        element.classList.add("hide");
    }
}
