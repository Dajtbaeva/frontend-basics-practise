const btnElement = document.querySelector(".btn");
const result = document.querySelector(".result");
const username = document.querySelector(".name");
const lastname = document.querySelector(".lastname");

btnElement.addEventListener("click", function () {
  result.textContent = ` Здравствуйте, ${username.value} ${lastname.value}!`;
});
