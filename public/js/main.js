//logic information scroll
const slider = document.getElementById("slider");
const speed = 0.5;

slider.innerHTML += slider.innerHTML;

let pos = 0;
function animate() {
  pos -= speed;
  if (pos <= -slider.scrollWidth / 2) {
    pos = 0;
  }
  slider.style.transform = `translateX(${pos}px)`;
  requestAnimationFrame(animate);
}
animate();

//sigin modal
function showrole() {
  const modal_sigin_user = document.getElementById("modal-sigin-user");
  const modalRole = document.getElementById("modal-role");
  const modal_login = document.getElementById("modal-login");
  const displayStatus = window.getComputedStyle(modalRole).display;
  if (displayStatus === "none") {
    modalRole.style.display = "flex";
    if (modal_sigin_user.style.display === "flex") {
      modal_sigin_user.style.display = "none";
    }
    if (modal_login.style.display === "flex") {
      modal_login.style.display = "none";
    }
  } else {
    modalRole.style.display = "none";
  }
}

function showSiginuser() {
  const modal_sigin_user = document.getElementById("modal-sigin-user");
  const modalRole = document.getElementById("modal-role");
  const modal_login = document.getElementById("modal-login");
  const displayStatus = window.getComputedStyle(modal_sigin_user).display;
  if (displayStatus === "none") {
    modal_sigin_user.style.display = "flex";
    if (modalRole.style.display === "flex") {
      modalRole.style.display = "none";
    }
    if (modal_login.style.display === "flex") {
      modal_login.style.display = "none";
    }
  } else {
    modal_sigin_user.style.display = "none";
  }
}

function showSiginadmin() {
  const modal_sigin_admin = document.getElementById("modal-sigin-admin");
  const modalRole = document.getElementById("modal-role");
  const modal_login = document.getElementById("modal-login");
  const displayStatus = window.getComputedStyle(modal_sigin_admin).display;
  if (displayStatus === "none") {
    modal_sigin_admin.style.display = "flex";
    if (modalRole.style.display === "flex") {
      modalRole.style.display = "none";
    }
    if (modal_login.style.display === "flex") {
      modal_login.style.display = "none";
    }
  } else {
    modal_sigin_admin.style.display = "none";
  }
}

function showLogin() {
  const modal_sigin_admin = document.getElementById("modal-sigin-admin");
  const modal_sigin_user = document.getElementById("modal-sigin-user");
  const modal_login = document.getElementById("modal-login");
  const modalRole = document.getElementById("modal-role");
  const displayStatus = window.getComputedStyle(modal_login).display;
  if (displayStatus === "none") {
    modal_login.style.display = "flex";
    if (modalRole.style.display === "flex") {
      modalRole.style.display = "none";
    }
    if (modal_sigin_admin.style.display === "flex") {
      modal_sigin_admin.style.display = "none";
    }
    if (modalRole.style.display === "flex") {
      modalRole.style.display = "none";
    }
    if (modal_sigin_user.style.display === "flex") {
      modal_sigin_user.style.display = "none";
    }
  } else {
    modal_login.style.display = "none";
  }
}

function closeRole() {
  document.getElementById("modal-role").style.display = "none";
  document.getElementById("modal-sigin-user").style.display = "none";
  document.getElementById("modal-sigin-admin").style.display = "none";
  document.getElementById("modal-login").style.display = "none";
}

//

const signinBtn = document.getElementById("form-signin-admin");
signinBtn.addEventListener("submit", async (e) => {});

//navbar dashboard admin active link

function showSection(sectionId) {
  const sections = document.querySelectorAll(
    ".dashboard-admin-content-section"
  );
  sections.forEach((section) => section.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
}

function showSectionData(sectionId) {
  const sections = document.querySelectorAll(
    ".navbar-dashboard-content-container"
  );
  sections.forEach((section) => section.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
}

function showIkonData(ikonId) {
  document.getElementById(ikonId).classList.add("icon-active");
}
function removeIkonData(ikonId) {
  document.getElementById(ikonId).classList.remove("icon-active");
}
