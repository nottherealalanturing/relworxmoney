/* current signed in user */
let currentuser = JSON.parse(localStorage.getItem("userloggedin"));
let users = JSON.parse(localStorage.getItem("userslist")) || [];

const balance = document.querySelector(".balance-section");
const send = document.querySelector(".send-section");
const request = document.querySelector(".request-section");
const transaction = document.querySelector(".transaction-section");
const signoutbtn = document.getElementById("signoutbtn");
const sendsection = document.querySelector(".send-form");
const userbalancerefresh = document.querySelector(".userbalancerefresh");
const balancetext = document.querySelector(".balance-text");

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
  if (currentuser.balance < amount) {
    console.log("insufficient funds");
    return;
  }

  if (!validateAccount(accnum)) {
    console.log("invalid account number");
    return;
  }

  let temp = [];
  users.forEach((user) => {
    if (user.account_number === currentuser.account_number) {
      tempuser = { ...user, balance: parseFloat(user.balance) - amount };
      temp.push(tempuser);
      currentuser = tempuser;
      return;
    }
    if (user.account_number === accnum) {
      temp.push({ ...user, balance: parseFloat(user.balance) + amount });
      return;
    }
    temp.push(user);
  });

  users = temp;
  localStorage.setItem("userslist", JSON.stringify(users));
  localStorage.setItem("userloggedin", JSON.stringify(currentuser));
};

sendsection.innerHTML = `<label for="accountno">Enter user account number: <input type="number" id="accountno"
          /></label>
          <label for="amount"
            >Enter amount to send: <input type="number" id="amount"
          /></label>
          <button type="submit" id="sendbtn">Send</button>`;

sendsection.addEventListener("submit", (e) => {
  e.preventDefault();
  SendMoney(parseFloat(e.target[0].value), parseFloat(e.target[1].value));
  e.target[0].value = "";
  e.target[1].value = "";
});

/* Balance */

userbalancerefresh.addEventListener("click", () => {
  balancetext.innerHTML = `<h1>
  Hello ${currentuser.email.toUpperCase()}, <br />
  Your current account balance is \$${currentuser.balance}.
  </h1>`;
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

  if (currentuser === {}) {
    window.location.replace("/pages/signin.html");
  }
});
