// NUMERO RANDOM
function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

// NUMERO PARI O DISPARI
function isEven(num){
    if(num % 2 === 0){
        return true;
    }else {
        return false;
    }
}

//ADDIZIONE
function sumNumbers(num1, num2){
    return num1 + num2;
}

//SOTTRAZIONE
function subtractNumbers(num1, num2){
    return num1 - num2;
}

//+=
function plusEqual(somma, num){
    return somma += num;
}

//+= STRINGA
function plusEqualString(text1, text2, tag){
    return text1 += `<${tag}> ${text2} </${tag}>`;
}

// ALERT
function notificationError(msgError){
    const alerta = document.createElement('div');
    alerta.className='alert alert-danger';
    alerta.innerHTML = msgError;
    return alerta;
}

// RIMUOVI IL PRIMO ALERT DELLA PAGINA
function removeFirstNotification(){
    const alertToRemove = document.querySelector('.alert');
    console.log(alertToRemove);
   if(alertToRemove) alertToRemove.remove();
}