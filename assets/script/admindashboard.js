/* current signed in user */
let currentuser = JSON.parse(localStorage.getItem("userloggedin"));
let users = JSON.parse(localStorage.getItem("userslist")) || [];

const viewacc = document.querySelector(".viewaccount-section");
const topacc = document.querySelector(".topaccount-section");
const refreshbtn = document.querySelector(".refreshbtn");
const table = document.getElementById("customers");

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
});

/* Balance */
balancesection.innerHTML = `<h1>
Hello ${currentuser.username.toUpperCase()}, <br />
Your current account balance is \$${currentuser.balance}.
</h1>`;
