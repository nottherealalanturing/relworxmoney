const signinForm = document.querySelector(".form_signin");
const usernameSignin = document.getElementById("username_signin");
const passwordSignin = document.getElementById("password_signin");
const currentuser = JSON.parse(localStorage.getItem("userloggedin"));

signinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = usernameSignin.value;
  const password = passwordSignin.value;
  const users = JSON.parse(localStorage.getItem("userslist")) || [];

  if (email === "admin" && password === "admin") {
    localStorage.setItem(
      "userloggedin",
      JSON.stringify({
        email: "admin",
        password: "admin",
        balance: "infinite",
        fullname: "admin",
        account_number: "0",
        role: "admin",
        trades: [{}],
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
          email: user.email,
          password: user.password,
          balance: user.balance,
          fullname: user.fullname,
          account_number: user.account_number,
          role: "user",
          trades: [...user.trades],
        })
      );
      window.location.replace("/pages/userdashboard.html");
    }
  });
});

window.addEventListener("load", () => {
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
