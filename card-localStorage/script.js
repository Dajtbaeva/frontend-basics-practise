const shoppingForm = document.querySelector(".shopping");
const list = document.querySelector(".list");
const buttons = list.querySelectorAll("button");

// We need an array to hold our state
let items = [];

function displayItems() {
  const html = items
    .map(
      (item) => `<li class="shopping-item">
      <input type="checkbox" value="${item.id}" ${
        item.complete ? "checked" : ""
      }>
      <span class="itemName">${item.name}</span>
      <button aria-label="Remove ${item.name}" value="${
        item.id
      }">&times;</button>
      </li>`
    )
    .join("");
  list.innerHTML = html;
}

function handleSubmit(e) {
  e.preventDefault();
  // const name = e.currentTarget.value;
  const name = e.currentTarget.item.value;

  // if it's empty, then don't submit it.
  if (!name) return;

  const item = {
    name: name,
    id: crypto.randomUUID(),
    complete: false,
  };
  items.push(item);
  e.target.reset();

  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

function restoreFromLocalStorage() {
  const lsItems = JSON.parse(localStorage.getItem("items"));
  if (lsItems?.length) {
    items.push(...lsItems);
    list.dispatchEvent(new CustomEvent("itemsUpdated"));
  }
}

function mirrorToLocalStorage() {
  localStorage.setItem("items", JSON.stringify(items));
}

function deleteItem(id) {
  items = items.filter((item) => item.id !== id);
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

function markAsComplete(id) {
  // console.log("Marking as complete!", id);
  // const itemRef = items.find((item) => item.id === id);
  // console.log(itemRef);
  // itemRef.complete = !itemRef.complete;
  const newItems = items.map((item) =>
    item.id === id
      ? {
          ...item,
          complete: !item.complete,
        }
      : item
  );
  items = newItems;
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

shoppingForm.addEventListener("submit", handleSubmit);
list.addEventListener("itemsUpdated", displayItems);
list.addEventListener("itemsUpdated", mirrorToLocalStorage);
window.addEventListener("load", restoreFromLocalStorage);

window.addEventListener("storage", (e) => {
  items = JSON.parse(e.newValue);
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
});

list.addEventListener("click", function (e) {
  if (e.target.matches("button")) {
    deleteItem(e.target.value);
  }

  if (e.target.matches('input[type="checkbox"]')) {
    markAsComplete(e.target.value);
  }
});
