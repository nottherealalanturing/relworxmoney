/* current signed in user */
let currentuser = JSON.parse(localStorage.getItem("userloggedin"));
let users = JSON.parse(localStorage.getItem("userslist")) || [];

const viewacc = document.querySelector(".viewaccount-section");
const topacc = document.querySelector(".topaccount-section");
const refreshbtn = document.querySelector(".refreshbtn");
const table = document.getElementById("customers");
const sendsectionadmin = document.querySelector(".send-form-admin");

signoutbtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("userloggedin", JSON.stringify({}));
  window.location.replace("/pages/signin.html");
});

/* navigation */
const navigateSPA = (key) => {
  switch (key) {
    case "viewaccount":
      viewacc.classList.remove("hide");
      topacc.classList.add("hide");
      break;
    case "topaccount":
      viewacc.classList.add("hide");
      topacc.classList.remove("hide");
      break;
    default:
      break;
  }
};

const navItems = Array.from(
  document.querySelectorAll(".admin-nav")[0].children
);

navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    navigateSPA(e.target.parentElement.id);
  });
});

/* Get users list */
const getUsersData = () => {
  let users = JSON.parse(localStorage.getItem("userslist")) || [];
  let userstable = "";
  users.forEach((user, index) => {
    userstable += `<tr>
    <td>${index + 1}</td>
    <td>${user.account_number}</td>
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>\$${user.balance}</td>
    <td>${user.password}</td>
  </tr>`;
  });

  table.innerHTML = `<tr>
  <th>id</th>
  <th>Account Number</th>
  <th>Fullname</th>
  <th>Username</th>
  <th>Balance</th>
  <th>Password</th>
</tr> ${userstable}`;
};

refreshbtn.addEventListener("click", () => getUsersData());

/* user functions */

const validateAccount = (acc) => {
  let valid = false;
  users.forEach((user) => {
    if (user.account_number === acc) {
      valid = true;
    }
  });
  return valid;
};

/* Send Money */
const SendMoney = (accnum, amount) => {
  if (!validateAccount(accnum)) {
    console.log("invalid account number");
    return;
  }

  let temp = [];
  users.forEach((user) => {
    if (user.account_number === accnum) {
      temp.push({ ...user, balance: parseFloat(user.balance) + amount });
      return;
    }
    temp.push(user);
  });

  users = temp;
  localStorage.setItem("userslist", JSON.stringify(users));
};

sendsectionadmin.addEventListener("submit", (e) => {
  e.preventDefault();
  SendMoney(parseFloat(e.target[0].value), parseFloat(e.target[1].value));
  e.target[0].value = "";
  e.target[1].value = "";
});
