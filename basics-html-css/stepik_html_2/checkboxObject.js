const contactChecked = { // объект
    email: false, // ключ "email" - значение false
    phone: false, // ключ "phone" - значение false
    mail: false,  // ключ "mail" - значение false
};
const btn = document.querySelector("#btn");  //элемент btn
const checkboxElements = document.querySelectorAll('[name="contact"]'); //элементы checkbox


btn.addEventListener("click", function(){ //по клику на кнопку
    checkboxElements.forEach(element => {    //для каждого елемента checkbox
        contactChecked[element.value] = element.checked;  
//в объект contactChecked по ключу element.value записываем значение checked
    })
    console.log(contactChecked);                    //выведем в консоль объект
});