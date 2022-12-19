function toggleVisibilityNicknameEdit(){
    element = document.getElementById("nicknameedit");

    if (element.classList.contains("hide")){
        element.classList.remove("hide");
        element.classList.add("show");
    } else {
        element.classList.remove("show");
        element.classList.add("hide");
    }
    
}

function toggleVisibilityPasswordEdit(){
    element = document.getElementById("passwordedit");

    if (element.classList.contains("hide")){
        element.classList.remove("hide");
        element.classList.add("show");
    } else {
        element.classList.remove("show");
        element.classList.add("hide");
    }
    
}

function toggleVisibilityEmailEdit() {
    element = document.getElementById("emailedit");

    if (element.classList.contains("hide")){
        element.classList.remove("hide");
        element.classList.add("show");
    } else {
        element.classList.remove("show");
        element.classList.add("hide");
    }
}
