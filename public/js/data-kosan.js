const token = localStorage.getItem('token');
if (!token) {
  window.location.href = '/index.html';
}

const btnFasilitaskamar = document.getElementById('btn-fasilitas-kamar');

btnFasilitaskamar.addEventListener('click', (e) => {
  e.preventDefault();
  const overlay = document.getElementById('overlay-fasilitas');
  const fasilitas_form = document.getElementById('fasilitas-kamar-form');
  fasilitas_form.classList.remove('hidden');
  overlay.classList.remove('hidden');
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
const closeFasilitaskamar = document.querySelectorAll('.modal-fasilitas-kamar');
closeFasilitaskamar.forEach((btn) => {
  btn.addEventListener('click', () => {
    const overlay = document.getElementById('overlay-fasilitas');
    const fasilitas_form = document.getElementById('fasilitas-kamar-form');
    fasilitas_form.classList.add('hidden');
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
  const list_fasilitas = document.getElementById('list-fasilitas-kosan');
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

  const fasilitas_kamar = document.getElementById('fasilitas-kosan');
  fasilitas_kamar.value = JSON.stringify(fasilitas);

  const overlay = document.getElementById('overlay-fasilitas');
  const fasilitas_form = document.getElementById('fasilitas-kamar-form');
  fasilitas_form.classList.add('hidden');
  overlay.classList.add('hidden');
});

const hargaSewa = document.getElementById('harga-sewa');

hargaSewa.addEventListener('input', function () {
  let value = this.value.replace(/\D/g, '');

  if (value === '') {
    this.value = '';
    return;
  }

  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  this.value = 'Rp ' + value;
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

const form_tambah_kosan = document.getElementById('form-data-kosan');

form_tambah_kosan.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const foto_kosan = document.getElementById('fileInput').files[0];
    const nama_kosan = document.getElementById('nama-kosan').value;
    const alamat_kosan = document.getElementById('alamat-kosan').value;
    const jenis_kosan = document.querySelector(
      'input[name="jenis-kosan"]:checked',
    ).value;
    const harga_sewa = document.getElementById('harga-sewa').value;
    const fasilitas_kosan = document.getElementById('fasilitas-kosan').value;
    const err_kosan = document.getElementById('errMsgkosan');
    const loading = document.getElementById('loading');
    const overlay = document.getElementById('overlay-fasilitas');

    const harga_kosan = Number(harga_sewa.replace(/[^0-9]/g, ''));

    const formdata = new FormData();
    formdata.append('fotoKosan', foto_kosan);
    formdata.append('namaKosan', nama_kosan);
    formdata.append('alamatKosan', alamat_kosan);
    formdata.append('jenisKosan', jenis_kosan);
    formdata.append('hargaKosan', harga_kosan);
    formdata.append('fasilitasKosan', fasilitas_kosan);

    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/index.html';
    }

    overlay.classList.remove('hidden');
    loading.classList.remove('hidden');

    const response = await fetch('http://localhost:8080/admin/kamar', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    });
    const data = await response.json();

    if (data.cloudUrl) {
      loading.classList.add('hidden');
      overlay.classList.add('hidden');
    }

    if (data.message) {
      err_kosan.classList.remove('hidden');
      err_kosan.textContent = data.message;
    }
    if (data.status == true) {
      window.location.href = 'dashboard-admin.html';
    }
  } catch (err) {
    console.log(err);
  }
});
