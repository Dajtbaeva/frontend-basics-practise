btnElement = document.querySelector(".btn"); //получаем элемент с классом btn
resultElement = document.querySelector(".result"); //получаем элемент с классом result
radioButtons = document.querySelectorAll('[name="contact"]'); //получаем список всех checkbox элементов

btnElement.addEventListener("click", function () {
  //по нажатию на кнопку Отправить
  let selectedContactValues = []; //список для выбранных значений
  for (const radioButton of radioButtons) {
    //для каждой checkbox-кнопки из списка checkbox-кнопок
    if (radioButton.checked) {
      //если checkbox-кнопка выбрана
      selectedContactValues.push(radioButton.value); //добавляем значение в список выбранных
    }
  }
  if (selectedContactValues.length != 0) {
    //если список не пустой (т.е. длина списка  не равна 0)
    resultElement.textContent = selectedContactValues.join(", "); //записываем значения в result
  } else {
    resultElement.textContent = "ничего не выбрано."; //иначе записываем в result, что ничего не выбрано
  }
});
