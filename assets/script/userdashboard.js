/* current signed in user */
const currentuser = JSON.parse(localStorage.getItem('userloggedin'));

/* DOM ELEMENTS */
let users = JSON.parse(localStorage.getItem('userslist')) || [];
const balance = document.querySelector('.balance-section');
const send = document.querySelector('.send-section');
const transaction = document.querySelector('.transaction-section');
const signoutbtn = document.getElementById('signoutbtn');
const sendsection = document.querySelector('.send-form');
const userbalancerefresh = document.querySelector('.userbalancerefresh');
const balancetext = document.querySelector('.balance-text');
const transactions = document.getElementById('transactions');
const transactionsbtn = document.querySelector('.transactionsbtn');

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

/* navigation */
const navigateSPA = (key) => {
  switch (key) {
    case 'balance':
      balance.classList.remove('hide');
      send.classList.add('hide');
      transaction.classList.add('hide');
      break;
    case 'send':
      balance.classList.add('hide');
      send.classList.remove('hide');
      transaction.classList.add('hide');
      break;
    case 'transaction':
      balance.classList.add('hide');
      send.classList.add('hide');
      transaction.classList.remove('hide');
      break;
    default:
      break;
  }
};

const navItems = Array.from(document.querySelectorAll('.user-nav')[0].children);

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

const getAccountIndex = (arr, accnum) => {
  let accountindex;
  arr.forEach((item, index) => {
    if (item.account_number === accnum) {
      accountindex = index;
    }
  });
  return accountindex;
};

/* Send Money */
const SendMoney = (accnum, amount) => {
  const tempUsers = JSON.parse(localStorage.getItem('userslist')) || [];
  if (currentuser.balance < amount) {
    return 'insufficient funds';
  }

  if (!validateAccount(accnum)) {
    return 'invalid account number';
  }

  const senderindex = getAccountIndex(tempUsers, currentuser.account_number);

  const sender = tempUsers.splice(senderindex, 1)[0];
  if (sender) {
    sender.balance = parseFloat(sender.balance) - amount;
  }

  const receiverindex = getAccountIndex(tempUsers, accnum);

  const receiver = tempUsers.splice(receiverindex, 1)[0];
  if (receiver) {
    receiver.balance = parseFloat(receiver.balance) + amount;
  }

  sender.trades = [
    ...sender.trades,
    {
      sender: {
        name: sender.name,
        amount,
        accountnumber: sender.account_number,
      },
      receiver: {
        name: receiver.name,
        amount,
        accountnumber: receiver.account_number,
      },
    },
  ];
  receiver.trades = [
    ...receiver.trades,
    {
      sender: {
        name: sender.name,
        amount,
        accountnumber: sender.account_number,
      },
      receiver: {
        name: receiver.name,
        amount,
        accountnumber: receiver.account_number,
      },
    },
  ];

  tempUsers.push(sender);
  tempUsers.push(receiver);
  users = tempUsers;

  localStorage.setItem('userslist', JSON.stringify(tempUsers));
  localStorage.setItem('userloggedin', JSON.stringify(sender));
  return tempUsers;
};

sendsection.innerHTML = `<label for='accountno'>Enter user account number: <input type="number" id="accountno"
          /></label>
          <label for="amount"
            >Enter amount to send: <input type="number" id="amount"
          /></label>
          <button type="submit" id="sendbtn">Send</button>`;

sendsection.addEventListener('submit', (e) => {
  e.preventDefault();
  SendMoney(parseFloat(e.target[0].value), parseFloat(e.target[1].value));
  e.target[0].value = '';
  e.target[1].value = '';
});

/* Balance */

userbalancerefresh.addEventListener('click', () => {
  balancetext.innerHTML = `<h1>
  Hello ${currentuser.email.toUpperCase()}, <br />
  Your account with account number ${currentuser.account_number}, <br />
  currently contains is ${formatter.format(currentuser.balance)}.
  </h1>`;
});

/* Get transactions */
const getTransactions = () => {
  const usertransactions = currentuser.trades;
  let userstable = '';
  usertransactions.forEach((transaction, index) => {
    userstable += `<tr>
    <td>${index + 1}</td>
    <td>${transaction.sender.name}</td>
    <td>${transaction.sender.accountnumber}</td>
    <td>${formatter.format(transaction.sender.amount)}</td>
    <td>${transaction.receiver.name}</td>
    <td>${transaction.receiver.accountnumber}</td>
    <td>${formatter.format(transaction.receiver.amount)}</td>
  </tr>`;
  });

  transactions.innerHTML = `<tr>
  <th>id</th>
  <th>Sender's Name</th>
  <th>Sender's Account Number</th>
  <th>Amount Sent</th>
  <th>Receiver's Name</th>
  <th>Receiver's Account Number</th>
  <th>Amount Sent</th>
</tr> ${userstable}`;
};

transactionsbtn.addEventListener('click', () => getTransactions());

navItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    navigateSPA(e.target.parentElement.id);
  });
});

signoutbtn.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.setItem('userloggedin', JSON.stringify({}));
  window.location.replace('/pages/signin.html');
});

window.addEventListener('load', () => {
  const userNav = document.querySelector('.user-nav');
  const adminNav = document.querySelector('.admin-nav');
  const noneUser = document.querySelector('.nu-nav');

  if (currentuser.role === 'user') {
    userNav.classList.remove('hide');
    adminNav.classList.add('hide');
    noneUser.classList.add('hide');
  } else if (currentuser.role === 'admin') {
    userNav.classList.add('hide');
    adminNav.classList.remove('hide');
    noneUser.classList.add('hide');
  } else {
    userNav.classList.add('hide');
    adminNav.classList.add('hide');
    noneUser.classList.remove('hide');
  }

  if (currentuser === {}) {
    window.location.replace('/pages/signin.html');
  }
});
