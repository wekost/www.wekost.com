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
      div.dataset.id = item.id_kos;
      div.classList.add(
        'card-kosan',
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
                  class="btn-detail w-full cursor-pointer rounded-[1rem] bg-linear-to-r from-[#516BFF] to-[#8A38F5] py-2 font-bold text-white hover:from-[#4055ce] hover:to-[#6428b1]">
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

semuaKosan.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-detail')) {
    const card = e.target.closest('.card-kosan');
    openDetail(card.dataset.id);
  }
});

document.addEventListener('click', (e) => {
  const card = e.target.closest('.card-kamar');
  if (!card) return;
  const id_kamar = card.dataset.id;
  openDetailkamar(id_kamar);
});

async function openDetailkamar(id_kamar) {
  try {
    openModalKamar();
    const nama_kamar = document.getElementById('nama-kamar-modal');
    const gambar_kamar = document.getElementById('img-kamar-modal');
    const deskripsi_kamar = document.getElementById('deskripsi-kamar-modal');
    const harga_kamar = document.getElementById('harga-kamar-modal');
    const response = await fetch(
      `https://ourkost-production.up.railway.app/kamar/${id_kamar}`,
    );
    const data = await response.json();
    const kamar = Array.isArray(data) ? data[0] : data;
    nama_kamar.textContent = kamar.nama_kamar;
    gambar_kamar.src = kamar.foto_kamar;
    deskripsi_kamar.textContent = kamar.deskripsi_kamar;
    harga_kamar.textContent = 'RP ' + kamar.harga_kamar.toLocaleString('id-ID');
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
      div.dataset.id = item.id_kos;
      div.classList.add(
        'card-kosan',
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
                  class="btn-detail w-full cursor-pointer rounded-[1rem] bg-linear-to-r from-[#516BFF] to-[#8A38F5] py-2 font-bold text-white hover:from-[#4055ce] hover:to-[#6428b1]">
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

semuaKosanputra.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-detail')) {
    const card = e.target.closest('.card-kosan');
    openDetail(card.dataset.id);
  }
});

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
      div.dataset.id = item.id_kos;
      div.classList.add(
        'card-kosan',
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
                  class="btn-detail w-full cursor-pointer rounded-[1rem] bg-linear-to-r from-[#516BFF] to-[#8A38F5] py-2 font-bold text-white hover:from-[#4055ce] hover:to-[#6428b1]">
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
semuaKosanputri.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-detail')) {
    const card = e.target.closest('.card-kosan');
    openDetail(card.dataset.id);
  }
});

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
      div.dataset.id = item.id_kos;
      div.classList.add(
        'card-kosan',
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
                    class="rounded-[1rem] bg-[#23AF3D] px-4 py-1 text-[0.7rem] font-bold text-white"
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
                  class="btn-detail w-full cursor-pointer rounded-[1rem] bg-linear-to-r from-[#516BFF] to-[#8A38F5] py-2 font-bold text-white hover:from-[#4055ce] hover:to-[#6428b1]">
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
semuaKosancampuran.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-detail')) {
    const card = e.target.closest('.card-kosan');
    openDetail(card.dataset.id);
  }
});

function closeModalSemuaKamar() {
  const modal = document.getElementById('semua-kamar');
  modal.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
}
function openModalSemuaKamar() {
  const modal = document.getElementById('semua-kamar');
  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

function closeModalKamar() {
  const modal = document.getElementById('modal-kamar');
  modal.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
}
function openModalKamar() {
  const modal = document.getElementById('modal-kamar');
  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

async function openDetail(id) {
  try {
    openModalSemuaKamar();
    const loading = document.getElementById('modal-loading');
    const nama_kosan = document.getElementById('nama-kosan-modal');
    const gambar_kosan = document.getElementById('gambar-kosan-modal');
    const harga_kosan = document.getElementById('harga-kosan-modal');
    const ketersediaan_kamar = document.getElementById(
      'ketersediaan-modal-kamar',
    );
    const total_kamar = document.getElementById('total-kamar-modal');
    const fasilitas_kamar = document.getElementById('fasilitas-kamar-modal');
    const harga_kamar_satu = document.getElementById(
      'kamar-kurang-dari-delapan-ratus-lima-puluh',
    );
    const list_harga_kamar_satu = document.getElementById(
      'list-kamar-delapan-ratus-lima-puluh',
    );
    const harga_kamar_dua = document.getElementById(
      'kamar-kurang-dari-satu-juta-dua-ratus',
    );
    const list_harga_kamar_dua = document.getElementById(
      'list-kamar-satu-juta-dua-ratus',
    );
    const harga_kamar_tiga = document.getElementById(
      'kamar-lebih-dari-satu-juta-dua-ratus',
    );
    const list_harga_kamar_tiga = document.getElementById(
      'list-kamar-lebih-dari-satu-juta-dua-ratus',
    );
    loading.classList.remove('hidden');
    loading.classList.add('flex');
    const response = await fetch(
      `https://ourkost-production.up.railway.app/kosan/${id}`,
    );
    const data = await response.json();
    if (data) {
      loading.classList.remove('flex');
      loading.classList.add('hidden');
    }
    const kos = Array.isArray(data.kos) ? data.kos[0] : data.kos;
    nama_kosan.textContent = kos.nama_kos;
    gambar_kosan.src = kos.foto_kosan;
    harga_kosan.textContent = 'RP ' + kos.harga.toLocaleString('id-ID');
    ketersediaan_kamar.textContent = kos.ketersediaan_kamar + ' Kamar Tersedia';
    total_kamar.textContent = kos.jumlah_kamar + ' Kamar';
    fasilitas_kamar.innerHTML = '';
    data.kos.forEach((item) => {
      const fasilitas = JSON.parse(item.fasilitas);

      fasilitas.forEach((itemFasilitas) => {
        const dataFasilitas = itemFasilitas.replace('-', ' ');
        const div = document.createElement('div');

        div.classList.add('flex', 'flex-row', 'items-center', 'gap-2');
        div.innerHTML = `
      <p class="text-[0.8rem] font-bold text-[#0900FF]">
        ${dataFasilitas}
      </p>`;
        fasilitas_kamar.appendChild(div);
      });
    });
    list_harga_kamar_satu.innerHTML = '';
    list_harga_kamar_dua.innerHTML = '';
    list_harga_kamar_tiga.innerHTML = '';
    [data.kos].forEach((item) => {
      const harga = Number(item.harga_kamar);
      const status = String(item.status_kamar).toLowerCase().trim();
      if (harga <= 850000) {
        harga_kamar_satu.classList.remove('hidden');
        harga_kamar_dua.classList.add('hidden');
        harga_kamar_tiga.classList.add('hidden');
        const div = document.createElement('div');
        if (status === 'Terisi') {
          div.classList.add(
            'card-kamar',
            'flex',
            'h-[3rem]',
            'w-[3rem]',
            'cursor-pointer',
            'items-center',
            'justify-center',
            'rounded-md',
            'bg-[#E9FEE2]',
          );
          div.innerHTML = `
                <div class="flex flex-col items-center">
                  <p class="text-[0.7rem] font-bold text-[#00730D]">1</p>
                  <p class="text-[0.7rem] font-bold text-[#00730D]">${item.status_kamar}</p>
                </div>
              `;
          div.dataset.id = item.id_kamar;
          list_harga_kamar_satu.appendChild(div);
        } else if (status == 'Kosong') {
          div.classList.add(
            'card-kamar',
            'flex',
            'h-[3rem]',
            'w-[3rem]',
            'cursor-pointer',
            'items-center',
            'justify-center',
            'rounded-md',
            'bg-[#FEE2E2]',
          );
          div.innerHTML = `
                <div class="flex flex-col items-center">
                  <p class="text-[0.7rem] font-bold text-[#B80000]">1</p>
                  <p class="text-[0.7rem] font-bold text-[#B80000]">${item.status_kamar}</p>
                </div>
              `;
          div.dataset.id = item.id_kamar;
          list_harga_kamar_satu.appendChild(div);
        }
      } else if (harga <= 1200000) {
        harga_kamar_satu.classList.add('hidden');
        harga_kamar_dua.classList.remove('hidden');
        harga_kamar_tiga.classList.add('hidden');
        const div = document.createElement('div');
        if (status == 'Terisi') {
          div.classList.add(
            'card-kamar',
            'flex',
            'h-[3rem]',
            'w-[3rem]',
            'cursor-pointer',
            'items-center',
            'justify-center',
            'rounded-md',
            'bg-[#E9FEE2]',
          );
          div.innerHTML = `
                <div class="flex flex-col items-center">
                  <p class="text-[0.7rem] font-bold text-[#00730D]">1</p>
                  <p class="text-[0.7rem] font-bold text-[#00730D]">${item.status_kamar}</p>
                </div>
              `;
          div.dataset.id = item.id_kamar;
          list_harga_kamar_dua.appendChild(div);
        } else if (status == 'Kosong') {
          div.classList.add(
            'card-kamar',
            'flex',
            'h-[3rem]',
            'w-[3rem]',
            'cursor-pointer',
            'items-center',
            'justify-center',
            'rounded-md',
            'bg-[#FEE2E2]',
          );
          div.innerHTML = `
                <div class="flex flex-col items-center">
                  <p class="text-[0.7rem] font-bold text-[#B80000]">1</p>
                  <p class="text-[0.7rem] font-bold text-[#B80000]">${item.status_kamar}</p>
                </div>
              `;
          div.dataset.id = item.id_kamar;
          list_harga_kamar_dua.appendChild(div);
        }
      } else if (harga > 1200000) {
        harga_kamar_satu.classList.add('hidden');
        harga_kamar_dua.classList.add('hidden');
        harga_kamar_tiga.classList.remove('hidden');
        const div = document.createElement('div');
        if (status == 'Terisi') {
          div.classList.add(
            'card-kamar',
            'flex',
            'h-[3rem]',
            'w-[3rem]',
            'cursor-pointer',
            'items-center',
            'justify-center',
            'rounded-md',
            'bg-[#E9FEE2]',
          );
          div.innerHTML = `
                <div class="flex flex-col items-center">
                  <p class="text-[0.7rem] font-bold text-[#00730D]">1</p>
                  <p class="text-[0.7rem] font-bold text-[#00730D]">${item.status_kamar}</p>
                </div>
              `;
          div.dataset.id = item.id_kamar;
          list_harga_kamar_tiga.appendChild(div);
        } else if (status == 'Kosong') {
          div.classList.add(
            'card-kamar',
            'flex',
            'h-[3rem]',
            'w-[3rem]',
            'cursor-pointer',
            'items-center',
            'justify-center',
            'rounded-md',
            'bg-[#FEE2E2]',
          );
          div.innerHTML = `
                <div class="flex flex-col items-center">
                  <p class="text-[0.7rem] font-bold text-[#B80000]">1</p>
                  <p class="text-[0.7rem] font-bold text-[#B80000]">${item.status_kamar}</p>
                </div>
              `;
          div.dataset.id = item.id_kamar;
          list_harga_kamar_tiga.appendChild(div);
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
}
function showKodepenyewa() {
  const kode_penyewa = document.getElementById('kode-penyewa');
  kode_penyewa.classList.remove('hidden');
}
const btn_close_penyewa = document.getElementById('btn-close-penyewa');
btn_close_penyewa.addEventListener('click', (e) => {
  e.preventDefault();
  const kode_penyewa = document.getElementById('kode-penyewa');
  kode_penyewa.classList.add('hidden');
});
function logout() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}
const form_kode_penyewa = document.getElementById('form-kode-penyewa');
form_kode_penyewa.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const kode_penyewa = document.getElementById('kode_penyewa').value;
    const data_kode = {
      kode: kode_penyewa,
    };
    const token = localStorage.getItem('token');
    const response = await fetch(
      `https://ourkost-production.up.railway.app/homepage/user/kode`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data_kode),
      },
    );
    const data = await response.json();
    if (data.status == true) {
      window.location.href = 'dashboard-user.html';
    }
  } catch (err) {
    console.log(err);
  }
});
