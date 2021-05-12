function darkFont(){
    loginInputs = document.querySelectorAll(".form-input input");
    for(let loginInput of loginInputs){
        loginInput.addEventListener('keyup', () =>{
            if(loginInput.value.length > 0){
                loginInput.style.color = "#000";
            }
            else{
                loginInput.style.color = "#a6acaf";
            }
        });
    }
}

