/* eslint-disable @typescript-eslint/no-unused-vars */
function destroyPopup(popup) {
  popup.remove();
}
// ask({title: "fhgj"}).then(console.log);

function ask({ title, cancel = false }) {
  return new Promise((resolve) => {
    const popup = document.createElement("form");

    popup.classList.add("popup");
    popup.classList.add("open");

    popup.insertAdjacentHTML(
      "afterbegin",
      `<fieldset>
        <label>${title}</label>
        <input name="input" />
        <button type="submit">Submit</button>
      </fieldset>`
    );

    if (cancel) {
      const cancelBtn = document.createElement("button");
      cancelBtn.type = "button";
      cancelBtn.textContent = "Cancel";

      popup.appendChild(cancelBtn);

      cancelBtn.addEventListener("click", () => {
        resolve(null);
        destroyPopup(popup);
      });
    }

    popup.addEventListener(
      "submit",
      (e) => {
        e.preventDefault(); // для того чтобы после нажатия сабмит значения не сохранялись в адресную строку
        const inputValue = e.target.input.value;
        resolve(inputValue); // делаем ресолв, так как он уже ответил на наш вопрос
        destroyPopup(popup);
      },
      { once: true }
    ); // только один раз слушать событие сабмит (конфигурация)
    document.body.appendChild(popup);
  });
}
const questions = [
  {
    title: "Title 1",
  },
  {
    title: "Title 2",
    cancel: true,
  },
  {
    title: "Title 3",
    cancel: true,
  },
];
async function askAll() {
  for (const question of questions) {
    const answer = await ask(question);
    console.log(answer);
  }
}
askAll();
// Promise.all(questions.map(question => ask(question))).then(); // выполнит все запросы сразу

// questions.forEach(async(question) => { // forEach тоже не подходит, потому что нам нужно чтобы он ждал промисы
//   await ask(question);
// })
