function logout() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('-translate-x-full');
}

//navbar dashboard data-kosan active link
function showSection(sectionId) {
  const sections = document.querySelectorAll(
    '.dashboard-admin-content-section',
  );
  sections.forEach((section) => section.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
}

function showHover(sectionId) {
  const sections = document.querySelectorAll(
    '.navbar-dashboard-admin-menu-list',
  );
  sections.forEach((section) => section.classList.remove('hover'));
  document.getElementById(sectionId).classList.add('hover');
}
const btn_close_modal_kamar = document.getElementById('btn-close-modal-kamar');
btn_close_modal_kamar.addEventListener('click', (e) => {
  const fasilitas_form = document.getElementById('dashboard-tambah-kamar');
  const kamar_form = document.getElementById('form-tambah-kamar');
  fasilitas_form.classList.add('hidden');
  kamar_form.reset();
});
const btnFasilitaskamar = document.getElementById('btn-tambah-kamar');

btnFasilitaskamar.addEventListener('click', (e) => {
  e.preventDefault();
  const fasilitas_form = document.getElementById('dashboard-tambah-kamar');
  fasilitas_form.classList.remove('hidden');
});

const dashboard = document.getElementById('dashboard-admin');
if (dashboard) {
  loadDashboard();
}
async function loadDashboard() {
  const name_admin = document.querySelectorAll('.name-admin');
  const nama_kosan = document.getElementById('nama-kosan');
  const alamat_kosan = document.getElementById('alamat-kosan');
  const fasilitas_kosan = document.getElementById('fasilitas-kos-dashboard');
  const img_kosan = document.getElementById('img-kosan');
  const total_kamar = document.getElementById('total-kamar');
  const kamar_terisi = document.getElementById('kamar-terisi');
  const kamar_kosong = document.getElementById('kamar-kosong');

  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8080/dashboard/admin', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  const fasilitas = JSON.parse(data.fasilitas);
  kamar_terisi.textContent = data.kamar_terisi;
  kamar_kosong.textContent = data.kamar_kosong;
  total_kamar.textContent = data.jumlah_kamar;
  img_kosan.src = data.foto_kosan;
  name_admin.forEach((item) => {
    item.textContent = data.name;
  });
  nama_kosan.textContent = data.nama_kos;
  alamat_kosan.textContent = data.alamat_lengkap;
  fasilitas.forEach((item) => {
    const p = document.createElement('p');
    p.classList.add(
      'rounded-md',
      'bg-[#DAEAFF]',
      'px-3',
      'py-1',
      'text-[0.7rem]',
      'font-medium',
      'text-[#001CBA]',
    );
    p.textContent = item.replace(/-/g, ' ');
    fasilitas_kosan.appendChild(p);
  });
}

const data_penyewa = document.getElementById('hover-data-penyewa');
data_penyewa.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const thead = document.getElementById('thead-penyewa');
    const tabel_penyewa = document.getElementById('tabel-penyewa');
    tabel_penyewa.innerHTML = '';
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'index.html';
      return;
    }
    const response = await fetch(
      'http://localhost:8080/dashboard/admin/penyewa',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();

    thead.innerHTML = `
    <tr class="bg-[#A6BCFB]">
      <th class="px-1 py-1 text-[0.7rem] font-semibold md:text-[1rem]">
        Nama Penyewa
      </th>
      <th class="px-1 py-1 text-[0.7rem] font-semibold md:text-[1rem]">
        Kamar
      </th>
      <th class="px-1 py-1 text-[0.7rem] font-semibold md:text-[1rem]">
        Kontak
      </th>
      <th class="px-1 py-1 text-[0.7rem] font-semibold md:text-[1rem]">
        Keterangan Bayar
      </th>
      <th class="px-1 py-1 text-[0.7rem] font-semibold md:text-[1rem]">
        Status Penyewa
      </th>
      <th class="px-1 py-1 text-[0.7rem] font-semibold md:text-[1rem]">
        Aksi
      </th>
    </tr>
  `;

    data.forEach((item) => {
      const tr = document.createElement('tr');
      [
        item.nama_penyewa,
        item.nama_kamar,
        item.phone,
        item.status_sewa,
      ].forEach((value) => {
        const td = document.createElement('td');
        td.classList.add(
          'text-center',
          'text-[0.4rem]',
          'font-medium',
          'md:text-[1rem]',
        );
        td.textContent = value ?? '-';
        tr.appendChild(td);
      });

      const tdButton = document.createElement('td');
      tdButton.classList.add('flex', 'items-center', 'justify-center', 'gap-1');

      tdButton.innerHTML = `
          <button 
            data-id="${item.id_penyewa}"
            class="btn-detail cursor-pointer rounded-md bg-[#4D5CFF] px-1 py-1 text-[0.4rem] font-medium text-white md:px-2 md:text-[1rem]">
            Detail
          </button>
          <button 
            data-id="${item.id_penyewa}"
            class="btn-akhiri cursor-pointer rounded-md bg-[#BD0000] px-1 py-1 text-[0.4rem] font-medium text-white md:px-2 md:text-[1rem]">
            Akhiri
          </button>
        `;

      tr.appendChild(tdButton);
      tabel_penyewa.appendChild(tr);
    });
  } catch (err) {
    console.log(err);
  }
});

const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('File harus berupa gambar');
    fileInput.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    preview.src = e.target.result;
    preview.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
});

const hargaKamar = document.getElementById('harga-kamar');

hargaKamar.addEventListener('input', function () {
  let value = this.value.replace(/\D/g, '');

  if (value === '') {
    this.value = '';
    return;
  }

  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  this.value = 'Rp ' + value;
});
const kamarLainnya = document.getElementById('kamar-lainnya');
const textarea = document.getElementById('input-kamar-lainnya');

kamarLainnya.addEventListener('change', () => {
  if (kamarLainnya.checked) {
    textarea.classList.remove('hidden');
  } else {
    textarea.classList.add('hidden');
  }
});
textarea.addEventListener('input', () => {
  kamarLainnya.value = textarea.value;
});

const openfasilitaskamar = document.getElementById('btn-fasilitas-kamar');
openfasilitaskamar.addEventListener('click', (e) => {
  e.preventDefault();
  const overlay = document.getElementById('overlay-fasilitas');
  const fasilitas = document.getElementById('fasilitas-kamar-form');
  fasilitas.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

const closeFasilitaskamar = document.querySelectorAll('.modal-fasilitas-kamar');
closeFasilitaskamar.forEach((btn) => {
  btn.addEventListener('click', () => {
    const overlay = document.getElementById('overlay-fasilitas');
    const fasilitas = document.getElementById('fasilitas-kamar-form');

    fasilitas.classList.add('hidden');
    overlay.classList.add('hidden');
  });
});

const form_fasilitas_kamar = document.getElementById('form-fasilitas-kamar');

form_fasilitas_kamar.addEventListener('submit', (e) => {
  e.preventDefault();

  const fasilitas = [];

  if (document.getElementById('kamar-ac').checked) fasilitas.push('AC');
  if (document.getElementById('kamar-kipas-angin').checked)
    fasilitas.push('Kipas Angin');
  if (document.getElementById('kamar-kasur').checked) fasilitas.push('Kasur');
  if (document.getElementById('kamar-bantal-dan-guling').checked)
    fasilitas.push('Bantal/Guling');
  if (document.getElementById('kamar-lemari').checked) fasilitas.push('Lemari');
  if (document.getElementById('kamar-meja').checked) fasilitas.push('Meja');
  if (document.getElementById('kamar-kursi').checked) fasilitas.push('Kursi');
  if (document.getElementById('kamar-mandi-dalam').checked)
    fasilitas.push('Kamar Mandi Dalam');
  if (document.getElementById('kamar-dapur-bersama').checked)
    fasilitas.push('Dapur Bersama');
  if (document.getElementById('kamar-air-panas').checked)
    fasilitas.push('Air Panas');

  const checkboxLainnya = document.getElementById('kamar-lainnya');
  const textareaLainnya = document.getElementById('input-kamar-lainnya');

  if (checkboxLainnya.checked && textareaLainnya.value.trim() !== '') {
    const lainnya = textareaLainnya.value.split(',').map((item) => item.trim());

    fasilitas.push(...lainnya);
  }
  const list_fasilitas = document.getElementById('list-fasilitas-kamar');
  list_fasilitas.innerHTML = '';
  fasilitas.forEach((item) => {
    const p = document.createElement('p');
    p.classList.add(
      'rounded-md',
      'bg-[#DAEAFF]',
      'px-2',
      'py-1',
      'text-[0.7rem]',
      'text-[#001CBA]',
    );
    p.textContent = item;
    list_fasilitas.appendChild(p);
  });

  list_fasilitas.classList.toggle('hidden', fasilitas.length === 0);

  const fasilitas_kamar = document.getElementById('fasilitas-kamar');
  fasilitas_kamar.value = JSON.stringify(fasilitas);

  const overlay = document.getElementById('overlay-fasilitas');
  const fasilitas_form = document.getElementById('fasilitas-kamar-form');

  fasilitas_form.classList.add('hidden');
  overlay.classList.add('hidden');
});

const form_tambah_kamar = document.getElementById('form-tambah-kamar');

form_tambah_kamar.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const foto_kamar = document.getElementById('fileInput').files[0];
    const nama_kamar = document.getElementById('nama-kamar').value;
    const deskripsi_kamar = document.getElementById('deskripsi-kamar').value;
    const harga_kamar_string = document.getElementById('harga-kamar').value;
    const fasilitas_kamar = document.getElementById('fasilitas-kamar').value;
    const err_kamar = document.getElementById('errMsgkamar');
    const loading = document.getElementById('loading');
    const overlay = document.getElementById('overlay-fasilitas');

    const harga_kamar = Number(harga_kamar_string.replace(/[^0-9]/g, ''));

    const formdata = new FormData();
    formdata.append('fotoKamar', foto_kamar);
    formdata.append('namaKamar', nama_kamar);
    formdata.append('deskripsiKamar', deskripsi_kamar);
    formdata.append('hargaKamar', harga_kamar);
    formdata.append('fasilitasKamar', fasilitas_kamar);

    const token = localStorage.getItem('token');

    overlay.classList.remove('hidden');
    loading.classList.remove('hidden');

    const response = await fetch(
      'http://localhost:8080/dashboard/admin/kamar',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formdata,
      },
    );
    const data = await response.json();
    if (data.cloudUrl) {
      loading.classList.add('hidden');
      overlay.classList.add('hidden');
    }

    if (data.status == true) {
      closeModalkamar();
    }
    await loadKamar();

    err_kamar.textContent = data.message;
  } catch (err) {
    console.log(err);
  }
});

function closeModalkamar() {
  const form_tambah_kamar = document.getElementById('form-tambah-kamar');
  form_tambah_kamar.reset();
  const tambah_kamar = document.getElementById('dashboard-tambah-kamar');
  tambah_kamar.classList.add('hidden');
}
const list_kamar = document.getElementById('list-kamar');
if (list_kamar) {
  loadKamar();
}

async function loadKamar() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      'http://localhost:8080/dashboard/admin/kamar',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();
    data.forEach((item) => {
      let hargaKamar = item.harga_kamar.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
      });
      const div = document.createElement('div');
      div.classList.add(
        'flex',
        'flex-col',
        'gap-4',
        'rounded-md',
        'bg-white',
        'px-3',
        'py-3',
        'shadow-md',
        'shadow-black/20',
        'md:flex-row',
        'md:items-start',
        'md:justify-between',
        'md:px-8',
        'md:py-5',
      );
      div.innerHTML = `<div class="flex items-center justify-between">
                  <h2 class="text-[1.5rem] font-semibold">${item.nama_kamar}</h2>
                  <p

                    class="status-kamar rounded-md bg-[#DCFCE7] px-1.5 py-1 text-[0.8rem] font-semibold text-[#08CD4C] md:hidden"
                  >
                    ${item.status_kamar}
                  </p>
                </div>
                <p
                  class="status-kamar hidden items-center justify-center rounded-md bg-[#DCFCE7] px-1.5 py-1 text-[0.8rem] font-semibold text-[#08CD4C] md:flex"
                >
                  ${item.status_kamar}
                </p>
                <div class="flex flex-col gap-3">
                  <div class="flex items-center gap-3">
                    <svg
                      width="19"
                      height="13"
                      viewBox="0 0 19 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.7054 0.978028C18.6142 0.919641 18.5101 0.886022 18.4027 0.880338C18.2953 0.874654 18.1884 0.89709 18.0918 0.945536C14.6926 2.65136 12.2649 1.85206 9.69873 1.0089C7.00662 0.124305 4.21553 -0.789527 0.359476 1.14211C0.251736 1.19513 0.160812 1.27833 0.0972037 1.38211C0.0335951 1.48588 -0.000103231 1.606 2.37554e-07 1.72859V11.4704C-1.48988e-05 11.5807 0.027316 11.6892 0.0794208 11.7856C0.131526 11.882 0.206691 11.9633 0.297843 12.0217C0.388995 12.0801 0.493135 12.1138 0.600464 12.1195C0.707794 12.1252 0.814781 12.1029 0.911359 12.0545C4.31055 10.3487 6.7382 11.148 9.30837 11.9911C10.8318 12.4907 12.3837 13 14.1383 13C15.4915 13 16.9674 12.6978 18.6445 11.8579C18.751 11.8046 18.8408 11.7216 18.9036 11.6185C18.9665 11.5154 18.9998 11.3963 19 11.2747V1.53283C19.0009 1.42228 18.9744 1.31332 18.9228 1.21624C18.8713 1.11915 18.7965 1.03717 18.7054 0.978028ZM17.7363 10.8612C14.5216 12.3372 12.1739 11.5671 9.69477 10.754C8.17135 10.2544 6.61943 9.74513 4.8648 9.74513C3.63206 9.75128 2.41185 9.99943 1.27004 10.4762V2.14205C4.48474 0.666106 6.83242 1.43616 9.31154 2.24927C11.7907 3.06238 14.3426 3.90229 17.7363 2.5287V10.8612ZM9.50157 3.90229C9.00044 3.90229 8.51057 4.05474 8.09389 4.34036C7.67722 4.62598 7.35246 5.03194 7.16069 5.50691C6.96891 5.98188 6.91874 6.50452 7.0165 7.00874C7.11427 7.51297 7.35559 7.97613 7.70994 8.33965C8.06429 8.70318 8.51576 8.95074 9.00726 9.05104C9.49876 9.15133 10.0082 9.09986 10.4712 8.90312C10.9342 8.70638 11.3299 8.37322 11.6083 7.94576C11.8867 7.5183 12.0353 7.01574 12.0353 6.50164C12.0353 5.81225 11.7684 5.15109 11.2932 4.66362C10.818 4.17615 10.1736 3.90229 9.50157 3.90229ZM9.50157 7.80131C9.25101 7.80131 9.00607 7.72509 8.79773 7.58228C8.5894 7.43947 8.42702 7.23648 8.33113 6.999C8.23524 6.76152 8.21015 6.5002 8.25904 6.24808C8.30792 5.99597 8.42858 5.76439 8.60575 5.58263C8.78293 5.40087 9.00867 5.27709 9.25442 5.22694C9.50017 5.17679 9.75489 5.20253 9.98638 5.3009C10.2179 5.39927 10.4157 5.56585 10.5549 5.77958C10.6941 5.99331 10.7684 6.24459 10.7684 6.50164C10.7684 6.84633 10.635 7.17691 10.3974 7.42064C10.1598 7.66438 9.83757 7.80131 9.50157 7.80131ZM3.80063 3.90229V7.80131C3.80063 7.97366 3.73389 8.13895 3.6151 8.26081C3.49631 8.38268 3.33519 8.45115 3.16719 8.45115C2.99919 8.45115 2.83808 8.38268 2.71928 8.26081C2.60049 8.13895 2.53375 7.97366 2.53375 7.80131V3.90229C2.53375 3.72994 2.60049 3.56466 2.71928 3.44279C2.83808 3.32092 2.99919 3.25246 3.16719 3.25246C3.33519 3.25246 3.49631 3.32092 3.6151 3.44279C3.73389 3.56466 3.80063 3.72994 3.80063 3.90229ZM15.2025 9.10098V5.20196C15.2025 5.02962 15.2692 4.86433 15.388 4.74246C15.5068 4.62059 15.668 4.55213 15.836 4.55213C16.004 4.55213 16.1651 4.62059 16.2839 4.74246C16.4027 4.86433 16.4694 5.02962 16.4694 5.20196V9.10098C16.4694 9.27333 16.4027 9.43862 16.2839 9.56049C16.1651 9.68235 16.004 9.75082 15.836 9.75082C15.668 9.75082 15.5068 9.68235 15.388 9.56049C15.2692 9.43862 15.2025 9.27333 15.2025 9.10098Z"
                        fill="black"
                      />
                    </svg>
                    <p class="font-semibold text-[#535353]">
                      ${hargaKamar}
                    </p>
                  </div>
                  <div class="flex items-center gap-3">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5 0C10.7598 0 11.968 0.500445 12.8588 1.39124C13.7496 2.28204 14.25 3.49022 14.25 4.75C14.25 6.00978 13.7496 7.21796 12.8588 8.10876C11.968 8.99955 10.7598 9.5 9.5 9.5C8.24022 9.5 7.03204 8.99955 6.14124 8.10876C5.25044 7.21796 4.75 6.00978 4.75 4.75C4.75 3.49022 5.25044 2.28204 6.14124 1.39124C7.03204 0.500445 8.24022 0 9.5 0ZM9.5 19C9.5 19 19 19 19 16.625C19 13.775 14.3688 10.6875 9.5 10.6875C4.63125 10.6875 0 13.775 0 16.625C0 19 9.5 19 9.5 19Z"
                        fill="black"
                      />
                    </svg>

                    <p class="font-semibold text-[#535353]">-</p>
                  </div>
                  <div class="flex items-center gap-3">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.6071 4.02813e-08C16.4685 -0.000132615 17.2978 0.327387 17.9266 0.916125C18.5554 1.50486 18.9367 2.31074 18.9932 3.17029L19 3.39286V15.6071C19.0001 16.4685 18.6726 17.2978 18.0839 17.9266C17.4951 18.5554 16.6893 18.9367 15.8297 18.9932L15.6071 19H3.39286C2.53145 19.0001 1.70225 18.6726 1.07344 18.0839C0.444628 17.4951 0.0632939 16.6893 0.00678591 15.8297L4.02813e-08 15.6071V3.39286C-0.000132615 2.53145 0.327387 1.70225 0.916125 1.07344C1.50486 0.444628 2.31074 0.0632939 3.17029 0.00678591L3.39286 4.02813e-08H15.6071ZM17.6429 5.42857H1.35714V15.6071C1.35717 16.1132 1.54568 16.6011 1.88591 16.9757C2.22615 17.3503 2.69371 17.5848 3.19743 17.6334L3.39286 17.6429H15.6071C16.113 17.6429 16.6007 17.4545 16.9753 17.1146C17.3499 16.7746 17.5845 16.3074 17.6334 15.8039L17.6429 15.6071V5.42857ZM11.5574 7.10329C12.2812 7.10329 12.8558 7.296 13.281 7.68143C13.7053 8.06686 13.9175 8.588 13.9175 9.24486C13.9175 9.62395 13.8202 9.96098 13.6257 10.2559C13.4265 10.554 13.1522 10.7941 12.8304 10.9521C13.233 11.1394 13.5429 11.3959 13.7601 11.7216C13.9772 12.0474 14.0858 12.4147 14.0858 12.8236C14.0858 13.5022 13.8564 14.0405 13.3977 14.4386C12.9372 14.8367 12.3256 15.0358 11.5629 15.0358C10.7965 15.0358 10.1826 14.8358 9.72121 14.4359C9.25979 14.036 9.02907 13.4986 9.02907 12.8236C9.02907 12.4102 9.13855 12.0392 9.3575 11.7108C9.57645 11.3824 9.88407 11.1295 10.2804 10.9521C9.96157 10.793 9.69014 10.5529 9.49321 10.2559C9.29864 9.95506 9.19801 9.6031 9.20414 9.24486C9.20414 8.588 9.41631 8.06686 9.84064 7.68143C10.265 7.296 10.8372 7.10329 11.5574 7.10329ZM7.45886 7.18336V14.9286H6.17636V8.73186L4.28314 9.37786V8.29214L7.29464 7.18336H7.45886ZM11.552 11.4828C11.1783 11.4828 10.8789 11.5995 10.6536 11.8329C10.4292 12.0664 10.317 12.3753 10.317 12.7599C10.317 13.139 10.4278 13.4411 10.6495 13.6664C10.8703 13.8926 11.1747 14.0057 11.5629 14.0057C11.951 14.0057 12.2541 13.8962 12.4721 13.6773C12.6902 13.4583 12.7988 13.1525 12.7979 12.7599C12.7979 12.3799 12.6839 12.0718 12.4559 11.8356C12.2279 11.6004 11.9266 11.4828 11.552 11.4828ZM11.5574 8.13743C11.229 8.13743 10.9693 8.24102 10.7784 8.44821C10.5884 8.6545 10.4934 8.93633 10.4934 9.29371C10.4934 9.64657 10.5893 9.92705 10.7811 10.1351C10.9739 10.3441 11.2344 10.4486 11.5629 10.4486C11.8922 10.4486 12.1532 10.3446 12.3459 10.1365C12.5386 9.9284 12.6345 9.64748 12.6336 9.29371C12.6461 8.98998 12.5422 8.69295 12.3432 8.46314C12.2441 8.35466 12.1223 8.26926 11.9865 8.21298C11.8507 8.1567 11.7043 8.13091 11.5574 8.13743ZM15.6071 1.35714H3.39286C2.8868 1.35717 2.3989 1.54568 2.02429 1.88591C1.64968 2.22615 1.41522 2.69371 1.36664 3.19743L1.35714 3.39286V4.07143H17.6429V3.39286C17.6429 2.88701 17.4545 2.39929 17.1146 2.02471C16.7746 1.65013 16.3074 1.41554 15.8039 1.36664L15.6071 1.35714Z"
                        fill="black"
                      />
                    </svg>

                    <p class="font-semibold text-[#535353]">
                      -
                    </p>
                  </div>
                </div>
                <div class="flex items-center justify-between gap-2 md:w-50">
                  <button
                    class="flex-1 rounded-md bg-[#4D5CFF] py-2.5 text-[1rem] font-semibold text-white hover:bg-[#003A98] cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    class="flex-1 rounded-md bg-[#8F9AB1] py-2.5 text-[1rem] font-semibold text-white hover:bg-[#4C4C4C] cursor-pointer"
                  >
                    Hapus
                  </button>
                </div>`;
      list_kamar.appendChild(div);
    });
  } catch (err) {
    console.log(err);
  }
}
const btn_notifikasi = document.getElementById('btn-notfikasi');

btn_notifikasi.addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'index.html';
    return;
  }
  const response = await fetch(
    'http://localhost:8080/dashboard/admin/notifikasi',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();
  if (data.status == true) {
    window.location.href = 'notifikasi.html';
  } else if (data.status == false) {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  }
});
