/* current signed in user */
const currentuser = JSON.parse(localStorage.getItem("userloggedin"));

const balance = document.querySelector(".balance-section");
const send = document.querySelector(".send-section");
const request = document.querySelector(".request-section");
const transaction = document.querySelector(".transaction-section");
const signoutbtn = document.getElementById("signoutbtn");

signoutbtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("userloggedin", JSON.stringify({}));
  window.location.replace("/pages/signin.html");
});

/* navigation */
const navigateSPA = (key) => {
  switch (key) {
    case "balance":
      balance.classList.remove("hide");
      send.classList.add("hide");
      request.classList.add("hide");
      transaction.classList.add("hide");
      break;
    case "send":
      balance.classList.add("hide");
      send.classList.remove("hide");
      request.classList.add("hide");
      transaction.classList.add("hide");
      break;
    case "request":
      balance.classList.add("hide");
      send.classList.add("hide");
      request.classList.remove("hide");
      transaction.classList.add("hide");
      break;
    case "transaction":
      balance.classList.add("hide");
      send.classList.add("hide");
      request.classList.add("hide");
      transaction.classList.remove("hide");
      break;
    default:
      break;
  }
};

const navItems = Array.from(document.querySelectorAll(".user-nav")[0].children);

navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    navigateSPA(e.target.parentElement.id);
  });
});
