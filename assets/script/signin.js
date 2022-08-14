const signinForm = document.querySelector(".form_signin");
const username_signin = document.getElementById("username_signin");
const password_signin = document.getElementById("password_signin");

signinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  (email = username_signin.value),
    (password = password_signin.value),
    (users = JSON.parse(localStorage.getItem("userslist")) || []);
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
        })
      );
      window.location.replace("/pages/userdashboard.html");
    }
  });
});
