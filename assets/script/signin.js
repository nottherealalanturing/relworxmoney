const signinForm = document.querySelector(".form_signin");
const username_signin = document.getElementById("username_signin");
const password_signin = document.getElementById("password_signin");
let currentuser = JSON.parse(localStorage.getItem("userloggedin"));

signinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  email = username_signin.value;
  password = password_signin.value;
  users = JSON.parse(localStorage.getItem("userslist")) || [];

  if (email === "admin" && password === "admin") {
    localStorage.setItem(
      "userloggedin",
      JSON.stringify({
        username: "admin",
        password: "admin",
        balance: "infinite",
        fullname: "admin",
        account_number: "0",
        role: "admin",
      })
    );
    window.location.replace("/pages/admindashboard.html");
    return;
  }

  users.forEach((user) => {
    if (user.email === email && user.password === password) {
      localStorage.setItem(
        "userloggedin",
        JSON.stringify({
          username: user.email,
          password: user.password,
          balance: user.balance,
          fullname: user.fullname,
          account_number: user.account_number,
          role: "user",
        })
      );
      window.location.replace("/pages/userdashboard.html");
    }
  });
});

window.addEventListener("load", function () {
  const userNav = document.querySelector(".user-nav");
  const adminNav = document.querySelector(".admin-nav");
  const noneUser = document.querySelector(".nu-nav");

  if (currentuser.role === "user") {
    userNav.classList.remove("hide");
    adminNav.classList.add("hide");
    noneUser.classList.add("hide");
  } else if (currentuser.role === "admin") {
    userNav.classList.add("hide");
    adminNav.classList.remove("hide");
    noneUser.classList.add("hide");
  } else {
    userNav.classList.add("hide");
    adminNav.classList.add("hide");
    noneUser.classList.remove("hide");
  }
});
