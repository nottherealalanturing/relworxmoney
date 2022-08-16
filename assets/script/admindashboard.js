/* current signed in user */
const currentuser = JSON.parse(localStorage.getItem('userloggedin'));
let users = JSON.parse(localStorage.getItem('userslist')) || [];

const viewacc = document.querySelector('.viewaccount-section');
const topacc = document.querySelector('.topaccount-section');
const refreshbtn = document.querySelector('.refreshbtn');
const table = document.getElementById('customers');
const sendsectionadmin = document.querySelector('.send-form-admin');
const signoutbtn = document.getElementById('signoutbtn');

signoutbtn.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.setItem('userloggedin', JSON.stringify({}));
  window.location.replace('/pages/signin.html');
});

/* navigation */
const navigateSPA = (key) => {
  switch (key) {
    case 'viewaccount':
      viewacc.classList.remove('hide');
      topacc.classList.add('hide');
      break;
    case 'topaccount':
      viewacc.classList.add('hide');
      topacc.classList.remove('hide');
      break;
    default:
      break;
  }
};

const navItems = Array.from(
  document.querySelectorAll('.admin-nav')[0].children,
);

navItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    navigateSPA(e.target.parentElement.id);
  });
});

/* Get users list */
const getUsersData = () => {
  const users = JSON.parse(localStorage.getItem('userslist')) || [];
  let userstable = '';
  users.forEach((user, index) => {
    userstable += `<tr>
    <td>${index + 1}</td>
    <td>${user.account_number}</td>
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>$${user.balance}</td>
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

refreshbtn.addEventListener('click', () => getUsersData());

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

  if (!validateAccount(accnum)) {
    return 'invalid account number';
  }

  const receiverindex = getAccountIndex(tempUsers, accnum);

  const receiver = tempUsers.splice(receiverindex, 1)[0];
  if (receiver) {
    receiver.balance = parseFloat(receiver.balance) + amount;
  }

  receiver.trades = [
    ...receiver.trades,
    {
      sender: {
        name: 'ADMIN',
        amount,
        accountnumber: 'ADMIN',
      },
      receiver: {
        name: receiver.name,
        amount,
        accountnumber: receiver.account_number,
      },
    },
  ];

  tempUsers.push(receiver);
  users = tempUsers;

  localStorage.setItem('userslist', JSON.stringify(tempUsers));

  return tempUsers;
};

sendsectionadmin.addEventListener('submit', (e) => {
  e.preventDefault();
  SendMoney(parseFloat(e.target[0].value), parseFloat(e.target[1].value));
  e.target[0].value = '';
  e.target[1].value = '';
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
