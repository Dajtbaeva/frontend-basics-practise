btnElement = document.querySelector(".btn");
resultElement = document.querySelector(".sum");
const products = document.querySelectorAll(".item");
inputSurname = document.querySelector('[name="surname"]');
inputName = document.querySelector('[name="name"]');

function totalSumm() {
  sum = 0;
  for (const product of products) {
    let checkboxElement = product.querySelector('input[type="checkbox"]');
    let amountElement = product.querySelector('input[type="number"]');
    if (checkboxElement.checked) {
      if (amountElement.value <= 0 || amountElement.value > 100) {
        amountElement.value = 1;
      }
    sum +=
        parseInt(checkboxElement.dataset.price) * parseInt(amountElement.value);
    } else {
      amountElement.value = 0;
    }
    resultElement.textContent = sum;
  }
}

btnElement.addEventListener("click", function () {
  orderList = [];
  for (const product of products) {
    let choiceElement = product.querySelector('[name="goods"]');
    let amount = product.querySelector('[name="quantity"]');
    if (choiceElement.checked) {
      firstSum = parseInt(choiceElement.dataset.price) * parseInt(amount.value);
      foodName = choiceElement.dataset.goods;
      position = `${foodName} - ${amount.value} шт. = ${firstSum} р.`;
      orderList.push(position);
    }
  }
  if (orderList == "") {
    alert("Товар не выбран!");
  } else {
    alert(
      `Заказчик: ${inputSurname.value} ${
        inputName.value
      }\n\nВаш заказ:\n${orderList.join("\n")}\n\nИтого: ${
        resultElement.textContent
      } руб.`
    );
  }
});
