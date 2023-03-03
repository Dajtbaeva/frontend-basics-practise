/*
    It is not actually just the HTML that you have written, it takes that, converts it to the Document Object Model, and it allows us to interface with the DOM via JavaScript.

    We can do things like listen for clicks and scrolls.
    We can add, move, remove elements from that page or things like text, images, etc.
    We can add and remove CSS classes from elements which can trigger animations.
    We can fetch new data.
    We can play music and video.
    We can add any type of interaction to the page and that is done by writing JavaScript that interfaces with the DOM (the things that are on the page, the elements on the page).

    Querying
    1. getElementById ans so on
 */

const mainTitle = document.querySelector("#main-title");
const listItems = document.querySelectorAll(".list-item");
const heading = document.getElementById("main-title");

document.querySelector("input").addEventListener("input", (e) => {
  console.log(e);
  console.log(e.target.value);
});

// mainTitle.setAttribute('data-my-attr', 'Test');

// mainTitle.classList.add('some-class');
// mainTitle.style.margin = 0;

const toggle = () => mainTitle.classList.toggle("toggle");

mainTitle.onclick = () => toggle();
// mainTitle.classList.remove('some-class');

// function name() {
// }
//
// const name = () => {};
