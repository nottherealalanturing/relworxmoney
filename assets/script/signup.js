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
  users.push(formdata);
  localStorage.setItem("userslist", JSON.stringify(users));
});

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
    }
  });
});
