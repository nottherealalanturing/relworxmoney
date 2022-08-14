const signupForm = document.querySelector(".signup-form");
const signinForm = document.querySelector(".form_signin");
const fullname_signup = document.getElementById("fullname_signup");
const username_signup = document.getElementById("username_signup");
const password_signup = document.getElementById("password_signup");
const username_signin = document.getElementById("username_signin");
const password_signin = document.getElementById("password_signin");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  users = JSON.parse(localStorage.getItem("userslist")) || [];

  const formdata = {
    name: fullname_signup.value,
    email: username_signup.value,
    password: password_signup.value,
    balance: 0,
    account_number: users.length + 1,
  };

  if (users.length === 0) {
    users.push(formdata);
    localStorage.setItem("userslist", JSON.stringify(users));
    window.location.replace("/pages/signin.html");
  }

  users.forEach((user) => {
    if (user.email !== formdata.email) {
      users.push(formdata);
      localStorage.setItem("userslist", JSON.stringify(users));
      window.location.replace("/pages/signin.html");
    }
  });
});
