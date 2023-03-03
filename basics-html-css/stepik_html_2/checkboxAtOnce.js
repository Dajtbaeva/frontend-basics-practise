resultElement = document.querySelector(".result"); //получаем элемент с классом result
radioButtons = document.querySelectorAll('[name="contact"]'); //получаем список всех checkbox элементов
let selectedContactValues = []; //массив для хранения выбранных checkbox

radioButtons.forEach((element) => {
  //для каждого элемента из списка элементов checkbox
  element.addEventListener("change", function () {
    //при изменении элемента
    if (element.checked) {
      //если checkbox-кнопка выбрана
      selectedContactValues.push(element.value); //добавляем значение в массив выбранных
    } else {
      //иначе удаляем из массива выбранных
      selectedContactValues.splice(
        selectedContactValues.indexOf(element.value),
        1
      );
    }

    if (selectedContactValues.length != 0) {
      //если массив не пустой (т.е. длина массива  не равна 0)
      resultElement.textContent = selectedContactValues.join(", "); //записываем значения в resultElement
    } else {
      resultElement.textContent = "ничего не выбрано."; //иначе записываем в resultElement, что ничего не выбрано
    }
  });
});
