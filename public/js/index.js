//logic information scroll
const slider = document.getElementById('slider');
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
  const modal_sigin_user = document.getElementById('modal-sigin-user');
  const modalRole = document.getElementById('modal-role');
  const modal_login = document.getElementById('modal-login');
  const displayStatus = window.getComputedStyle(modalRole).display;
  if (displayStatus === 'none') {
    modalRole.style.display = 'flex';
    if (modal_sigin_user.style.display === 'flex') {
      modal_sigin_user.style.display = 'none';
    }
    if (modal_login.style.display === 'flex') {
      modal_login.style.display = 'none';
    }
  } else {
    modalRole.style.display = 'none';
  }
}

function showSiginuser() {
  const modal_sigin_user = document.getElementById('modal-sigin-user');
  const modalRole = document.getElementById('modal-role');
  const modal_login = document.getElementById('modal-login');
  const displayStatus = window.getComputedStyle(modal_sigin_user).display;
  if (displayStatus === 'none') {
    modal_sigin_user.style.display = 'flex';
    if (modalRole.style.display === 'flex') {
      modalRole.style.display = 'none';
    }
    if (modal_login.style.display === 'flex') {
      modal_login.style.display = 'none';
    }
  } else {
    modal_sigin_user.style.display = 'none';
  }
}

function showSiginadmin() {
  const modal_sigin_admin = document.getElementById('modal-sigin-admin');
  const modalRole = document.getElementById('modal-role');
  const modal_login = document.getElementById('modal-login');
  const displayStatus = window.getComputedStyle(modal_sigin_admin).display;
  if (displayStatus === 'none') {
    modal_sigin_admin.style.display = 'flex';
    if (modalRole.style.display === 'flex') {
      modalRole.style.display = 'none';
    }
    if (modal_login.style.display === 'flex') {
      modal_login.style.display = 'none';
    }
  } else {
    modal_sigin_admin.style.display = 'none';
  }
}

function showLogin() {
  const modal_sigin_admin = document.getElementById('modal-sigin-admin');
  const modal_sigin_user = document.getElementById('modal-sigin-user');
  const modal_login = document.getElementById('modal-login');
  const modalRole = document.getElementById('modal-role');
  const displayStatus = window.getComputedStyle(modal_login).display;
  if (displayStatus === 'none') {
    modal_login.style.display = 'flex';
    if (modalRole.style.display === 'flex') {
      modalRole.style.display = 'none';
    }
    if (modal_sigin_admin.style.display === 'flex') {
      modal_sigin_admin.style.display = 'none';
    }
    if (modalRole.style.display === 'flex') {
      modalRole.style.display = 'none';
    }
    if (modal_sigin_user.style.display === 'flex') {
      modal_sigin_user.style.display = 'none';
    }
  } else {
    modal_login.style.display = 'none';
  }
}

function closeRole() {
  document.getElementById('modal-role').style.display = 'none';
  document.getElementById('modal-sigin-user').style.display = 'none';
  document.getElementById('modal-sigin-admin').style.display = 'none';
  document.getElementById('modal-login').style.display = 'none';
}

//signin user insert
document
  .getElementById('form-signin-user')
  .addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name_user').value;
    const email = document.getElementById('email_user').value;
    const phone = document.getElementById('whatsapp_number_user').value;
    const password = document.getElementById('password_user').value;
    const confirm_password = document.getElementById(
      'confirm_password_user',
    ).value;
    const err_message = document.getElementById('error_msg_user');

    const dataUser = {
      name: name,
      email: email,
      phone: phone,
      password: password,
      confirm_password: confirm_password,
    };
    try {
      const response = await fetch(
        `https://ourkost-production.up.railway.app/auth/user/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataUser),
        },
      );
      const resJson = await response.json();
      if (resJson.status === true) {
        showLogin();
      }
      err_message.textContent = resJson.message;
    } catch (err) {
      console.log(err);
    }
  });

//signin admin insert
document
  .getElementById('form-signin-admin')
  .addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name_admin').value;
    const email = document.getElementById('email_admin').value;
    const phone = document.getElementById('whatsapp_number_admin').value;
    const password = document.getElementById('password_admin').value;
    const confirm_password = document.getElementById(
      'confirm_password_admin',
    ).value;
    const err_message = document.getElementById('error_msg_admin');

    const dataUser = {
      name: name,
      email: email,
      phone: phone,
      password: password,
      confirm_password: confirm_password,
    };
    try {
      const response = await fetch(
        `https://ourkost-production.up.railway.app/auth/admin/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataUser),
        },
      );
      const resJson = await response.json();
      localStorage.setItem('token', resJson.token);
      if (resJson.status === true) {
        window.location.href = '/data-kosan.html';
      }
      err_message.textContent = resJson.message;
    } catch (err) {
      console.log(err);
    }
  });

//login select
document.getElementById('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email_login').value;
  const password = document.getElementById('password_login').value;
  const err_message = document.getElementById('error_msg_login');
  const dataUser = {
    email: email,
    password: password,
  };
  try {
    const response = await fetch(
      `https://ourkost-production.up.railway.app/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataUser),
      },
    );
    const data = await response.json();
    localStorage.setItem('token', data.token);
    err_message.textContent = data.message;
    console.log(data);
    if (data.status === true) {
      window.location.href = 'dashboard-admin.html';
    }
    if (data.status_user === true) {
      window.location.href = 'homepage.html';
    } else if (data.status_user === false) {
      window.location.href = 'dashboard-user.html';
    }
  } catch (err) {
    console.log(err);
  }
});

function showKosan(sectionId) {
  const sections = document.querySelectorAll('.kosan-content');
  sections.forEach((section) => section.classList.add('hidden'));
  document.getElementById(sectionId).classList.remove('hidden');
}
function showHover(sectionId) {
  const sections = document.querySelectorAll('.kosanHover');
  sections.forEach((section) =>
    section.classList.remove('from-[#000379]', 'to-[#8A38F5]'),
  );
  sections.forEach((section) => section.classList.remove('text-white'));
  document
    .getElementById(sectionId)
    .classList.add('from-[#000379]', 'to-[#8A38F5]', 'text-white');
}

const semuaKosan = document.getElementById('semuaKosanhomepage');
if (semuaKosan) {
  showSemuakosanhomepage();
}
async function showSemuakosanhomepage() {
  try {
    const response = await fetch(
      `https://ourkost-production.up.railway.app/homepage/semua/kosan`,
    );
    const data = await response.json();
    console.log(data);
    data.forEach((item) => {
      const fasilitas = JSON.parse(item.fasilitas);
      const div = document.createElement('div');
      div.classList.add(
        'flex',
        'w-full',
        'max-w-[22rem]',
        'flex-col',
        'gap-5',
        'bg-white',
        'px-5',
        'rounded-[0.5rem]',
        'py-3',
        'shadow-md',
        'shadow-black/35',
      );
      div.innerHTML = `<img class="h-[160px] w-full rounded-md object-cover" src="${item.foto_kosan}" alt="" />
              <h3 class="font-bold text-black">${item.nama_kos}</h3>
              <div class="flex flex-col">
                <div class="flex flex-row justify-between">
                  <p class="text-[0.7rem] font-normal">Mulai dari:</p>
                  <p
                    class="status rounded-[1rem] bg-[#578FFF] px-4 py-1 text-[0.7rem] font-bold text-white"
                  >
                    ${item.tipe}
                  </p>
                </div>
                <p class="text-[1.2rem] font-bold text-[#0077FF]">
                  Rp ${item.harga.toLocaleString('id-ID')}/bulan
                </p>
              </div>
              <div class="flex flex-col gap-[1rem]">
                <div class="fasilitasKamar flex flex-row items-center justify-center gap-1.5">
                </div>
                <button
                  onclick="showrole()"
                  class="w-full cursor-pointer rounded-[1rem] bg-linear-to-r from-[#516BFF] to-[#8A38F5] py-2 font-bold text-white hover:from-[#4055ce] hover:to-[#6428b1]">
                  Lihat Detail
                </button>
              </div>`;
      semuaKosan.appendChild(div);

      const status = div.querySelector('.status');
      if (item.tipe === 'putri') {
        status.classList.remove('bg-[#578FFF]', 'bg-[#23AF3D]');
        status.classList.add('bg-[#FB7EE0]');
      }
      if (item.tipe === 'campuran') {
        status.classList.remove('bg-[#578FFF]', 'bg-[#FB7EE0]');
        status.classList.add('bg-[#23AF3D]');
      }
      const fasilitasContainer = div.querySelector('.fasilitasKamar');
      fasilitas.slice(0, 4).forEach((f) => {
        const p = document.createElement('p');
        p.classList.add(
          'rounded-[0.5rem]',
          'bg-[#F3F4F6]',
          'px-3',
          'py-1',
          'text-[0.6rem]',
          'text-[#535353]',
        );
        p.textContent = f.replace('-', ' ');
        fasilitasContainer.appendChild(p);
      });
    });
  } catch (err) {
    console.log(err);
  }
}

const semuaKosanputra = document.getElementById('kosanPutrahomepage');
if (semuaKosanputra) {
  showSemuakosanputrahomepage();
}
async function showSemuakosanputrahomepage() {
  try {
    const response = await fetch(
      `https://ourkost-production.up.railway.app/homepage/semua/kosan/putra`,
    );
    const data = await response.json();
    console.log(data);
    data.forEach((item) => {
      const fasilitas = JSON.parse(item.fasilitas);
      const div = document.createElement('div');
      div.classList.add(
        'flex',
        'w-full',
        'max-w-[22rem]',
        'flex-col',
        'gap-5',
        'bg-white',
        'px-5',
        'py-3',
        'rounded-[0.5rem]',
        'shadow-md',
        'shadow-black/35',
      );
      div.innerHTML = `<img class="h-[160px] w-full rounded-md object-cover" src="${item.foto_kosan}" alt="" />
              <h3 class="font-bold text-black">${item.nama_kos}</h3>
              <div class="flex flex-col">
                <div class="flex flex-row justify-between">
                  <p class="text-[0.7rem] font-normal">Mulai dari:</p>
                  <p
                    class="rounded-[1rem] bg-[#578FFF] px-4 py-1 text-[0.7rem] font-bold text-white"
                  >
                    ${item.tipe}
                  </p>
                </div>
                <p class="text-[1.2rem] font-bold text-[#0077FF]">
                  Rp ${item.harga.toLocaleString('id-ID')}/bulan
                </p>
              </div>
              <div class="flex flex-col gap-[1rem]">
                <div class="fasilitasKamar flex flex-row items-center justify-center gap-1.5">
                </div>
                <button
                  onclick="showrole()"
                  class="w-full cursor-pointer rounded-[1rem] bg-linear-to-r from-[#516BFF] to-[#8A38F5] py-2 font-bold text-white hover:from-[#4055ce] hover:to-[#6428b1]">
                  Lihat Detail
                </button>
              </div>`;
      semuaKosanputra.appendChild(div);

      const fasilitasContainer = div.querySelector('.fasilitasKamar');
      fasilitas.slice(0, 4).forEach((f) => {
        const p = document.createElement('p');
        p.classList.add(
          'rounded-[0.5rem]',
          'bg-[#F3F4F6]',
          'px-3',
          'py-1',
          'text-[0.6rem]',
          'text-[#535353]',
        );
        p.textContent = f.replace('-', ' ');
        fasilitasContainer.appendChild(p);
      });
    });
  } catch (err) {
    console.log(err);
  }
}

const semuaKosanputri = document.getElementById('kosanPutrihomepage');
if (semuaKosanputri) {
  showSemuakosanputrihomepage();
}
async function showSemuakosanputrihomepage() {
  try {
    const response = await fetch(
      `https://ourkost-production.up.railway.app/homepage/semua/kosan/putri`,
    );
    const data = await response.json();
    console.log(data);
    data.forEach((item) => {
      const fasilitas = JSON.parse(item.fasilitas);
      const div = document.createElement('div');
      div.classList.add(
        'flex',
        'w-full',
        'max-w-[22rem]',
        'flex-col',
        'gap-5',
        'bg-white',
        'px-5',
        'py-3',
        'rounded-[0.5rem]',
        'shadow-md',
        'shadow-black/35',
      );
      div.innerHTML = `<img class="h-[160px] w-full rounded-md object-cover" src="${item.foto_kosan}" alt="" />
              <h3 class="font-bold text-black">${item.nama_kos}</h3>
              <div class="flex flex-col">
                <div class="flex flex-row justify-between">
                  <p class="text-[0.7rem] font-normal">Mulai dari:</p>
                  <p
                    class="rounded-[1rem] bg-[#FB7EE0] px-4 py-1 text-[0.7rem] font-bold text-white"
                  >
                    ${item.tipe}
                  </p>
                </div>
                <p class="text-[1.2rem] font-bold text-[#0077FF]">
                  Rp ${item.harga.toLocaleString('id-ID')}/bulan
                </p>
              </div>
              <div class="flex flex-col gap-[1rem]">
                <div class="fasilitasKamar flex flex-row items-center justify-center gap-1.5">
                </div>
                <button
                  onclick="showrole()"
                  class="w-full cursor-pointer rounded-[1rem] bg-linear-to-r from-[#516BFF] to-[#8A38F5] py-2 font-bold text-white hover:from-[#4055ce] hover:to-[#6428b1]">
                  Lihat Detail
                </button>
              </div>`;
      semuaKosanputri.appendChild(div);

      const fasilitasContainer = div.querySelector('.fasilitasKamar');
      fasilitas.slice(0, 4).forEach((f) => {
        const p = document.createElement('p');
        p.classList.add(
          'rounded-[0.5rem]',
          'bg-[#F3F4F6]',
          'px-3',
          'py-1',
          'text-[0.6rem]',
          'text-[#535353]',
        );
        p.textContent = f.replace('-', ' ');
        fasilitasContainer.appendChild(p);
      });
    });
  } catch (err) {
    console.log(err);
  }
}

const semuaKosancampuran = document.getElementById('kosanCampuranhomepage');
if (semuaKosancampuran) {
  showSemuakosancampuranhomepage();
}
async function showSemuakosancampuranhomepage() {
  try {
    const response = await fetch(
      `https://ourkost-production.up.railway.app/homepage/semua/kosan/campuran`,
    );
    const data = await response.json();
    console.log(data);
    data.forEach((item) => {
      const fasilitas = JSON.parse(item.fasilitas);
      const div = document.createElement('div');
      div.classList.add(
        'flex',
        'w-full',
        'max-w-[22rem]',
        'flex-col',
        'gap-5',
        'bg-white',
        'px-5',
        'py-3',
        'rounded-[0.5rem]',
        'shadow-md',
        'shadow-black/35',
      );
      div.innerHTML = `<img class="h-[160px] w-full rounded-md object-cover" src="${item.foto_kosan}" alt="" />
              <h3 class="font-bold text-black">${item.nama_kos}</h3>
              <div class="flex flex-col">
                <div class="flex flex-row justify-between">
                  <p class="text-[0.7rem] font-normal">Mulai dari:</p>
                  <p
                    class="rounded-[1rem] bg-[#05C41B] px-4 py-1 text-[0.7rem] font-bold text-white"
                  >
                    ${item.tipe}
                  </p>
                </div>
                <p class="text-[1.2rem] font-bold text-[#0077FF]">
                  Rp ${item.harga.toLocaleString('id-ID')}/bulan
                </p>
              </div>
              <div class="flex flex-col gap-[1rem]">
                <div class="fasilitasKamar flex flex-row items-center justify-center gap-1.5">
                </div>
                <button
                  onclick="showrole()"
                  class="w-full cursor-pointer rounded-[1rem] bg-linear-to-r from-[#516BFF] to-[#8A38F5] py-2 font-bold text-white hover:from-[#4055ce] hover:to-[#6428b1]">
                  Lihat Detail
                </button>
              </div>`;
      semuaKosancampuran.appendChild(div);

      const fasilitasContainer = div.querySelector('.fasilitasKamar');
      fasilitas.slice(0, 4).forEach((f) => {
        const p = document.createElement('p');
        p.classList.add(
          'rounded-[0.5rem]',
          'bg-[#F3F4F6]',
          'px-3',
          'py-1',
          'text-[0.6rem]',
          'text-[#535353]',
        );
        p.textContent = f.replace('-', ' ');
        fasilitasContainer.appendChild(p);
      });
    });
  } catch (err) {
    console.log(err);
  }
}
