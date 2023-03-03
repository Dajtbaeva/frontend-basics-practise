btnElement = document.querySelector(".btn"); //получаем элемент с классом btn
resultElement = document.querySelector(".result"); //получаем элемент с классом result
radioButtons = document.querySelectorAll('[name="contact"]'); //получаем список всех radio элементов

btnElement.addEventListener("click", function(){  //по нажатию на кнопку Отправить
    let selectedContactValue = "";                 //переменная для выбранного значения
    for (const radioButton of radioButtons){      //для каждой радио-кнопки из списка радио-кнопок
        if(radioButton.checked){                  //если радио-кнопка выбрана
            selectedContactValue = radioButton.value;   //записываем в переменную значение этой
            break;                                     //выйти из цикла принудительно
        }
    }
    if (selectedContactValue != "") { //если значение в переменной не пустое
        resultElement.textContent = selectedContactValue; //записываем значение в result
    } else {
        resultElement.textContent = "ничего не выбрано." //иначе записываем в result, что ничего не выбрано
    }
});