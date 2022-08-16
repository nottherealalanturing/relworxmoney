const currentuser = JSON.parse(localStorage.getItem('userloggedin'));

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
