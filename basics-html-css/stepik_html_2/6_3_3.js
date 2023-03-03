const userSurname = document.querySelector("[name='surname']"); //получаю элемент input с фамилией
const userName = document.querySelector("[name='name']"); //получаю элемент input с именем
const items = document.querySelectorAll(".item"); //получаю элементы
const btn = document.querySelector(".btn"); //получаю элемент button
const result = document.querySelector(".sum"); //получаю элемент span для итоговой суммы

function totalSum() {
  let total = 0;
  for (const product of items) {
    let selectedItem = product.querySelector("input[type='checkbox']");
    let quantityOfItems = product.querySelector("input[type='number']");
    if (selectedItem.checked) {
      if (quantityOfItems.value <= 0 || quantityOfItems.value > 100)
        quantityOfItems.value = 1;
      total +=
        parseInt(selectedItem.dataset.price) * parseInt(quantityOfItems.value);
    } else quantityOfItems.value = 0;
  }
  result.textContent = total;
}

btn.addEventListener("click", function () {
  orders = [];
  for (const product of items) {
    let selectedItem = product.querySelector("input[type='checkbox']");
    let quantityOfItems = product.querySelector("input[type='number']");
    if (selectedItem.checked) {
      let sumi =
        parseInt(selectedItem.dataset.price) * parseInt(quantityOfItems.value);
      let info = `${selectedItem.dataset.goods} ${quantityOfItems.value}шт. = ${sumi}р.`;
      orders.push(info);
    }
  }

  if (orders.length === 0) alert("Вы ничего не выбрали!");
  else
    alert(
      `Заказчик: ${userSurname.value} ${
        userName.value
      }\nВаш заказ:\n${orders.join("\n")}\n\nИтого к оплате:\n${
        result.textContent
      }р.`
    );
});
