function showSection(sectionId) {
  const notifikasi = document.querySelectorAll('.notifikasi');
  notifikasi.forEach((item) => {
    item.classList.add('hidden');
  });
  document.getElementById(sectionId).classList.remove('hidden');
}
function showHovernotifikasi(hoverId) {
  const hover = document.querySelectorAll('.hover-menu');
  hover.forEach((item) => {
    item.classList.remove('hover-active');
  });
  document.getElementById(hoverId).classList.add('hover-active');
}

const btn_generate_code = document.getElementById('btn-generate-kode');
btn_generate_code.addEventListener('click', async (e) => {
  e.preventDefault();
  const generate_kode_card = document.getElementById('generate-kode-card');
  generate_kode_card.classList.remove('hidden');
  const list_kamar = document.getElementById('pilih-kamar-kosong');
  const token = localStorage.getItem('token');
  const response = await fetch(`${apiUrl}/generate/kamar/admin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  data.forEach((item) => {
    const option = document.createElement('option');
    option.classList.add('card-kamar', 'font-medium');
    option.value = item.id_kamar;
    option.textContent = item.nama_kamar;
    option.dataset.id = item.id_kamar;
    list_kamar.appendChild(option);
  });
});

function generateKodeKos() {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 6;

  const randomValues = crypto.getRandomValues(new Uint8Array(length));
  let kode = 'KOS-';

  randomValues.forEach((val) => {
    kode += charset[val % charset.length];
  });

  return kode;
}

const btn_close_generate_code = document.getElementById(
  'btn-close-generate-kode',
);
btn_close_generate_code.addEventListener('click', () => {
  const generate_kode_card = document.getElementById('generate-kode-card');
  generate_kode_card.classList.add('hidden');
  generate_code_form.reset();
});

const generate_code_form = document.getElementById('generate-code-form');

generate_code_form.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'index.html';
    }
    const pilih_kamar_kosong = document.getElementById('pilih-kamar-kosong');
    const tanggal_masuk = document.getElementById('tanggal-masuk').value;
    const err_msg = document.getElementById('err_msg_generate');
    const kode_kamar = document.getElementById('kode-kamar');
    const id_kamar = pilih_kamar_kosong.value;
    const kode = generateKodeKos();

    const data_kode = {
      id_kamar: id_kamar,
      tanggal_masuk: tanggal_masuk,
      kode: kode,
    };
    console.log(data_kode);
    const response = await fetch(
      `https://ourkost-production.up.railway.app/generate/kamar/admin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data_kode),
      },
    );
    err_msg.innerHTML = '';
    const data = await response.json();
    if (data.message) {
      err_msg.classList.remove('hidden');
      err_msg.textContent = data.message;
    }
    kode_kamar.innerHTML = '';
    if (data.kode) {
      const span = document.createElement('span');
      kode_kamar.classList.remove('hidden');
      span.classList.add('kode');
      span.textContent = data.kode;
      kode_kamar.innerHTML = `<svg
              id="btn-copy"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="cursor-pointer rounded-md p-0.5 hover:bg-[#7C8494]"
            >
              <path
                d="M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3ZM12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289C12.8946 3.48043 13 3.73478 13 4C13 4.26522 12.8946 4.51957 12.7071 4.70711C12.5196 4.89464 12.2652 5 12 5C11.7348 5 11.4804 4.89464 11.2929 4.70711C11.1054 4.51957 11 4.26522 11 4C11 3.73478 11.1054 3.48043 11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3ZM7 7H17V5H19V19H5V5H7V7Z"
                fill="black"
              />
            </svg>`;
      kode_kamar.appendChild(span);
      const btnCopy = document.getElementById('btn-copy');

      btnCopy.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(span.textContent);
          btnCopy.classList.add('bg-green-200');
          setTimeout(() => btnCopy.classList.remove('bg-green-200'), 800);
          err_msg.classList.remove('hidden');
          err_msg.textContent = 'teks berhasil disalin';
        } catch (err) {
          console.error(err);
          alert('Gagal menyalin kode');
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});
