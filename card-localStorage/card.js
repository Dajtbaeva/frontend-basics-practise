const shoppingForm = document.querySelector(".shopping");
const list = document.querySelector(".list");
// const buttons = list.querySelectorAll('button');

// State
let items = [];

const LS_KEYS = {
  ITEMS: "items",
};

const bc = new BroadcastChannel("test_channel");

function displayItems() {
  const html = items
    .map(
      (item) => `
    <li>
        <input type="checkbox" id="${item.id}" ${
        item.isCompleted ? "checked" : ""
      }>
        <span>${item.name}</span>
        <button id="${item.id}">&times;</button>
    </li>
`
    )
    .join("");
  list.innerHTML = html;
}

function setDataToLocalStorage() {
  localStorage.setItem(LS_KEYS.ITEMS, JSON.stringify(items));
}

function restoreDataFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem(LS_KEYS.ITEMS));
  if (data?.length) {
    items.push(...data);
    list.dispatchEvent(new CustomEvent("itemsUpdated"));
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const name = event.target.item.value;

  if (!name) return;

  const item = {
    name: name,
    isCompleted: false,
    id: crypto.randomUUID(),
  };

  items.push(item);
  bc.postMessage(items);
  event.currentTarget.reset();
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

function deleteItem(id) {
  items = items.filter((item) => item.id !== id);
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

function markAsCompleted(id) {
  items = items.map((item) =>
    item.id === id
      ? {
          ...item,
          isCompleted: !item.isCompleted,
        }
      : item
  );
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

shoppingForm.addEventListener("submit", handleSubmit);
window.addEventListener("load", restoreDataFromLocalStorage);
list.addEventListener("itemsUpdated", displayItems);
list.addEventListener("itemsUpdated", setDataToLocalStorage);

// window.addEventListener('storage', e => {
//    items = JSON.parse(e.newValue);
//    list.dispatchEvent(new CustomEvent('itemsUpdated'));
// });

bc.onmessage = (e) => {
  items = e.data;
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
};

list.addEventListener("click", (e) => {
  const id = e.target.id;

  if (e.target.matches("button")) {
    deleteItem(id);
  }

  if (e.target.matches('input[type="checkbox"]')) {
    markAsCompleted(id);
  }
});
