function toggleNav() {
    const sidenav = document.getElementById('sideNav');
    const navbtn = document.getElementById('toggleBtn');
    const main = document.getElementById('main');
    sidenav.classList.toggle('open');
    navbtn.classList.toggle('open');
    main.classList.toggle('navopen');
}

function togglerecdrop(){
  const navdrop = document.getElementById('recordOpts');
  navdrop.classList.toggle('open');
}

function toggleOptions() {
  const opts = document.getElementById('headerDropdown');
  opts.classList.toggle('active');
}
  
// Attach the function to the button's click event
document.getElementById('toggleBtn').addEventListener('click', toggleNav);

if (document.getElementById('drpdwn-toggle')) {
  document.getElementById('drpdwn-toggle').addEventListener('click', togglerecdrop)
}

document.getElementById('headerBtn').addEventListener('click', toggleOptions);

const logoutBtn = document.getElementById("logoutBtn");
const logoutConfirm = document.getElementById("logoutConfirm");
logoutBtn.addEventListener("click", () => logoutConfirm.showModal());