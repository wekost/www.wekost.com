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

//signin user insert 
const signinBtnUser = document.getElementById("form-signin-user");
signinBtnUser.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name_user").value;
  const email = document.getElementById("email_user").value;
  const phone = document.getElementById("whatsapp_number_user").value;
  const password = document.getElementById("password_user").value;
  const confirm_password = document.getElementById("confirm_password_user").value;
  const err_message = document.getElementById("error_msg_user")

  const dataUser = {
    name: name,
    email: email,
    phone: phone,
    password: password,
    confirm_password: confirm_password,
  }
  try{
    const response = await fetch("http://localhost:8080/auth/user/register", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(dataUser)
    })
    const resJson = await response.json()
    if(resJson.status === true){
      showLogin();
    }
    err_message.textContent = resJson.message
  }catch(err){
    console.log(err);
  }
});

//signin admin insert 
const signinBtnAdmin = document.getElementById("form-signin-admin");
signinBtnAdmin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name_admin").value;
  const email = document.getElementById("email_admin").value;
  const phone = document.getElementById("whatsapp_number_admin").value;
  const password = document.getElementById("password_admin").value;
  const confirm_password = document.getElementById("confirm_password_admin").value;
  const err_message = document.getElementById("error_msg_admin")

  const dataUser = {
    name: name,
    email: email,
    phone: phone,
    password: password,
    confirm_password: confirm_password,
  }
  try{
    const response = await fetch("http://localhost:8080/auth/admin/register", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(dataUser)
    })
    const resJson = await response.json()
    if(resJson.status === true){
      window.location.href = "/data-kosan.html"
    }
    err_message.textContent = resJson.message
  }catch(err){
    console.log(err);
  }
});

//login select
const loginBtn = document.getElementById("form-login");
loginBtn.addEventListener("submit", async (e)=>{
  e.preventDefault();
  const email = document.getElementById("email_login").value;
  const password = document.getElementById("password_login").value;
  const err_message = document.getElementById("error_msg_login")
  const dataUser = {
    email: email,
    password: password,
  }
  try{
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(dataUser)
    })
    const resJson = await response.json()
    err_message.textContent = resJson.message
    if(resJson.status === true){
      window.location.href = "/homepage.html"
    }else if(resJson.status === false){
      window.location.href = "/dashboard-admin.html"
    }
  }catch(err){
    console.log(err)
  }
})

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
