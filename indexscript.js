var map;
var markers = [];

var loginForm = document.querySelector("form");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var usernameInput = loginForm.querySelector("input[name='rusername']");
  var passwordInput = loginForm.querySelector("input[name='rpassword']");
  var username = usernameInput.value;
  var password = passwordInput.value;

  setTimeout(function () {
    if (username === "spravne-uzivatelske-jmeno" && password === "spravne-heslo") {
      alert("Přihlášení úspěšné!");

      initializeMap();
    } else {
      alert("Neplatné přihlašovací údaje!");
    }
    usernameInput.value = "";
    passwordInput.value = "";
  }, 1000);
});