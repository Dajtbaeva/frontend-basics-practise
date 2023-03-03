function getFormvalue() {
  const myForm = document.getElementById("form1");
  for (let i = 0; i < myForm.length; i++) {
    if (myForm[i].value != "Submit") console.log(myForm[i].value);
  }
}
