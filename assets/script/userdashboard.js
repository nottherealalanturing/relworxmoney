const signoutbtn = document.getElementById("signoutbtn");

signoutbtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("userloggedin", JSON.stringify({}));
  window.location.replace("/pages/signin.html");
});
