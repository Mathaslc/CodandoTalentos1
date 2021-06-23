window.onload = function(){
    checkType(); //chamada de função com onload do window, essa função é para omitir/mostrar o conteúdo a ser manipulado na página
}

//função para mudar as interfaces de comparação/manipulação de strings
function checkType(){
       //selecionando collection de html nodes
       var textActionInputs = document.querySelectorAll("[name=textAction]");
       //percorrendo a collection e adicionando eventos a cada nó obtido no querySelectorAll
       for(let textAction of textActionInputs){
           //Adicionando evento de clique, passando o evento(objetoHtmlDom clicado) como parâmetro.
           textAction.addEventListener("click", function(e){
               if(e.target.value == "checkLength"){
                   document.querySelector('#checkLengthAction').removeAttribute("hidden");
                   document.querySelector('#compareTextAction').setAttribute("hidden", true);
               }
               else if(e.target.value == "compareText"){
                   document.querySelector('#compareTextAction').removeAttribute("hidden");
                   document.querySelector('#checkLengthAction').setAttribute("hidden", true);
                  
               }
               else{
                   document.querySelector('#compareTextAction').setAttribute("hidden", true);
                   document.querySelector('#checkLengthAction').setAttribute("hidden", true);
               }
           });
       }
}


//função para verificar se habilitamos o case sensitive ou não
//retorna 1 para verdadeiro e 0 para falso
function caseSense(){
    var compareOps = document.querySelectorAll("[name=compareOp1]");
    for(let compareOp of compareOps){
        if(compareOp.checked == true){
            if(compareOp.value == "caseYes"){
                return true;
            }
            else if(compareOp.value == "caseNo"){
                return false;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
}

//função para checagem dos textarea
function checkStr(){
    var textOne = document.querySelector("#textCompareOne");
    var textTwo = document.querySelector("#textCompareTwo");
    var caseSesitive = caseSense();
    var textCompareStatus = document.querySelector("#statusCompareText");
    if(caseSesitive == true){
        console.log("Case sensitive is on");
        if(textTwo.value === textOne.value){ //comparação com "===", comparação de tipo e valor(onde "A" é diferente de "a")
            textCompareStatus.innerText = "Equals"
            textCompareStatus.classList.remove("font-red");
            textCompareStatus.classList.add("font-green");
        }
        else{
            textCompareStatus.innerText = "Different"
            textCompareStatus.classList.remove("font-green");
            textCompareStatus.classList.add("font-red");
        }
    }
    else{
        console.log("Case sensitive is off");
        //retorna 0 se a string é igual, uso da negação para entrar no if
        if(!(textOne.value.localeCompare(textTwo.value, undefined, { sensitivity: 'base' }))){ //uso do localeCompare ignorando case sensitive
            textCompareStatus.innerText = "Equals"
            textCompareStatus.classList.remove("font-red");
            textCompareStatus.classList.add("font-green");
        }
        else{
            textCompareStatus.innerText = "Different"
            textCompareStatus.classList.remove("font-green");
            textCompareStatus.classList.add("font-red");
        }
    }    
}

//função para deletar conteúdos de inputs com base nos ids dos inputs
function deleteText(){
    if(arguments.length>0){
        for (let i = 0; i < arguments.length; i++) {
            var textInput = document.querySelector("#"+arguments[i]);
            textInput.value = "";
        }
        console.log("Delete success!");
    }
    else{
        console.log("Html input not found!");
    }
}


//função para atualizar status de acordo com input de tamanho máximo permitidp
function checkInput(){
    var inputOne = document.querySelector("#textCheckInput");
    var maxSize = document.querySelector("#maxSize");
    var inputStatus = document.querySelector("#inputStatus");
    if(maxSize.value == "" || maxSize.value<0){
        inputStatus.innerText = "Invalid size"
        inputStatus.classList.remove("font-green");
        inputStatus.classList.add("font-red");
    }
    else if(inputOne.value.length > maxSize.value){
        inputStatus.innerText = "Out of bounds"
        inputStatus.classList.remove("font-green");
        inputStatus.classList.add("font-red");
    }
    else if(inputOne.value.length <= maxSize.value){
        inputStatus.innerText = "Size allowed"
        inputStatus.classList.remove("font-red");
        inputStatus.classList.add("font-green");
    }
    else{
        inputStatus.innerText = "Unknown error"
        inputStatus.classList.remove("font-green");
        inputStatus.classList.add("font-red");
    }

    //checagem se temos output, e se sim a cada "keyup" event atualizamos o output
    var outputOpYes = document.querySelector("#transformYes");
    if(outputOpYes.checked){
        makeOutput();
    }
}


//função para atualizar as informações do input, como tamanho e tamanho sem espaço
function updateInfos(){
    var statusOne = document.querySelector("#statusOne");
    var statusTwo = document.querySelector("#statusTwo");
    var inputOne = document.querySelector("#textCheckInput");
    statusOne.innerText = inputOne.value.length;
    statusTwo.innerText = (inputOne.value.replace(/\s/g,'')).length;
}

//função para exibir ou esconder a div de "outputs"
function allowOutput(){
    var textTransformOutputs = document.querySelectorAll("[name=output1]");
    for(let textTransformOutput of textTransformOutputs){
        if(textTransformOutput.checked == true){
            if(textTransformOutput.value == "caseYes"){
                document.querySelector('#outputYesAction').removeAttribute("hidden");
            }
            else if(textTransformOutput.value == "caseNo"){
                document.querySelector('#outputYesAction').setAttribute("hidden", true);
            }
            else{
                document.querySelector('#outputYesAction').setAttribute("hidden", true);
            }
        }
    }
}

//função para verificar qual tipo de output desejado e transformar o texto inserido
function makeOutput(){
    var outputOps = document.querySelectorAll("[name=outpuOp1]");
    var outputOne = document.querySelector("#textCheckOutput");
    var inputOne = document.querySelector("#textCheckInput");
    for(let outputOp of outputOps){
        if(outputOp.checked == true){
            let opValue = outputOp.value;
            switch (opValue) {
                case "outputNone":
                    outputOne.value = inputOne.value;
                    break;
                case "outputUppercase":
                    outputOne.value = inputOne.value.toUpperCase()
                    break;
                case "outputLowercase":
                    outputOne.value = inputOne.value.toLowerCase()
                    break;
                case "ouputCaptalize":
                    outputOne.value = capitalizeStr(inputOne.value);
                    break;
                case "ouputReverse":
                    let strArray = inputOne.value.split("");
                    let reverseArray = strArray.reverse();
                    let joinArray = reverseArray.join("");
                    outputOne.value = joinArray;
                break;
                default:
                    outputOne.value = inputOne.value;
                    break;
            }
        }
    }
}



//função para captalize cada palavra
function capitalizeStr($strings){
    var eachWord = $strings.toLowerCase().split(" ");
    for(let i=0;i<eachWord.length;i++){
        eachWord[i] = eachWord[i].charAt(0).toUpperCase() + eachWord[i].substring(1);
    }
    return eachWord.join(" ");
}