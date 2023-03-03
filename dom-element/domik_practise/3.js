function set_background() {
  const myBody = document.getElementsByTagName("body")[0]; //Get all the p elements that are descendants of the body
  const texts = myBody.getElementsByTagName("p");
  for (let i = 0; i < texts.length; i++) {
    texts[i].style.background = "rgb(255, 0, 0)";
  }
}
