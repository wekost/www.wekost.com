function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('-translate-x-full');
}

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

function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(angka);
}
function formatTanggal(dateString) {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  });
}

const dashboard_users = document.getElementById('dashboard-user');
if (dashboard_users) {
  getDashboardUser();
}
async function getDashboardUser() {
  try {
    const nama_user = document.getElementById('nama-user');
    const nama_kamar = document.querySelectorAll('.nama-kamar');
    const status_pembayaran = document.getElementById('status-pembayaran');
    const sisa_sewa = document.getElementById('sisa-sewa');
    const keluhan_aktif = document.getElementById('keluhan-aktif');
    const harga_kamar = document.getElementById('harga-kamar');
    const tanggal_masuk = document.getElementById('tanggal-masuk');
    const sewa_berakhir = document.getElementById('sewa-berakhir');
    const fasilitas_kamar = document.getElementById('fasilitas-kamar');

    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'index.html';
      return;
    }
    const response = await fetch('http://localhost:8080/dashboard/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const data_fasilitas = JSON.parse(data.fasilitas_kamar);
    nama_user.textContent = data.name;
    nama_kamar.forEach((item) => {
      item.textContent = data.nama_kamar;
    });
    sisa_sewa.textContent =
      data.sisa_sewa <= 0 ? 'Habis' : `${data.sisa_sewa} hari`;
    harga_kamar.textContent = formatRupiah(data.harga_kamar);
    tanggal_masuk.textContent = formatTanggal(data.tanggal_masuk);
    sewa_berakhir.textContent = formatTanggal(data.sewa_berakhir);
    data_fasilitas.forEach((item) => {
      const p = document.createElement('p');
      p.classList.add(
        'flex',
        'h-10',
        'items-center',
        'justify-center',
        'rounded-[0.8rem]',
        'bg-[#DAEAFF]',
        'text-center',
        'text-[0.7rem]',
        'font-medium',
        'text-[#0077FF]',
      );
      p.textContent = item;

      fasilitas_kamar.appendChild(p);
    });
  } catch (err) {
    console.log(err);
  }
}
