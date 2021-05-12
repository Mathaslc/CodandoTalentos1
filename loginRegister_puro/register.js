function responsiveRegister(){
    if(window.outerWidth<750){
        let registerContainer = document.querySelector(".register-container");
        registerContainer.style.width = '75%';
    }
    else{
        let registerContainer = document.querySelector(".register-container");
        registerContainer.style.width = '50%';

    }
}