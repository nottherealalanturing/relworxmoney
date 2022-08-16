const signupForm = document.querySelector('.signup-form');
const fullnameSignup = document.getElementById('fullname_signup');
const usernameSignup = document.getElementById('username_signup');
const passwordSignup = document.getElementById('password_signup');
const currentuser = JSON.parse(localStorage.getItem('userloggedin'));

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const users = JSON.parse(localStorage.getItem('userslist')) || [];

  const formdata = {
    name: fullnameSignup.value,
    email: usernameSignup.value,
    password: passwordSignup.value,
    balance: 0,
    account_number: users.length + 1,
    role: 'user',
  };

  if (users.length === 0) {
    users.push(formdata);
    localStorage.setItem('userslist', JSON.stringify(users));
    window.location.replace('/pages/signin.html');
  }

  users.forEach((user) => {
    if (user.email !== formdata.email) {
      users.push(formdata);
      localStorage.setItem('userslist', JSON.stringify(users));
      window.location.replace('/pages/signin.html');
    }
  });
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
});
