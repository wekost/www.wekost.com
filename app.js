//server setup
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('./middleware/verifyToken.js');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');
const app = express();
const db = require('./config/config.js');
const path = require('path');
const { json } = require('body-parser');
const { message } = require('statuses');
const status = require('statuses');
const port = process.env.PORT || 3000;
const SECRET = process.env.SECRET;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const upload = multer({ dest: 'uploads/' });

cloudinary.api.ping((error, result) => {
  if (error) {
    console.error('Gagal koneksi ke Cloudinary:', error.message);
  } else {
    console.log('Koneksi ke Cloudinary berhasil!', result);
  }
});

//routing
app.post('/auth/user/register', (req, res) => {
  const { name, email, phone, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    return res.json({ message: 'maaf password tidak sesuai' });
  }
  try {
    const sqlCheck = 'SELECT * FROM users WHERE email = ?';
    db.query(sqlCheck, [email], (err, result) => {
      if (err) {
        return res.json({ message: 'gagal registrasi cek kembali form' });
      }
      if (result.length > 0) {
        return res.json({ message: 'maaf email sudah terdaftar' });
      }

      const sqlInsert =
        'INSERT INTO users (name, email, phone, password) VALUES (?,?,?,?)';
      db.query(sqlInsert, [name, email, phone, password], (err, result) => {
        if (err) {
          return res.json({ message: 'gagal registrasi cek kembali form' });
        }
        return res.json({ status: true });
      });
    });
  } catch (err) {
    return res.json({ message: 'terjadi error saat registrasi' });
  }
});

app.post('/auth/admin/register', (req, res) => {
  const { name, email, phone, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    return res.json({ message: 'maaf password tidak sesuai' });
  }
  try {
    const sqlCheck = 'SELECT * FROM users WHERE email = ?';
    db.query(sqlCheck, [email], (err, result) => {
      if (err) {
        return res.json({ message: 'gagal registrasi cek kembali form' });
      }
      if (result.length > 0) {
        return res.json({ message: 'maaf email sudah terdaftar' });
      }

      const sqlInsert =
        'INSERT INTO users (name, email, phone, password, role) VALUES (?,?,?,?,?)';
      db.query(
        sqlInsert,
        [name, email, phone, password, 'admin'],
        (err, result) => {
          if (err) {
            return res.json({ message: 'gagal registrasi cek kembali form' });
          }
          const payload = {
            id: result.insertId,
            email: email,
            role: 'admin',
          };
          const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
          return res.json({ status: true, token: token });
        },
      );
    });
  } catch (err) {
    return res.json({ message: 'terjadi error saat registrasi' });
  }
});

app.post('/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const sqlCheck = 'SELECT * FROM users WHERE email = ?';
    db.query(sqlCheck, [email], (err, result) => {
      if (err) {
        return res.json({ message: 'gagal login cek kembali form' });
      }
      if (result.length == 0) {
        return res.json({ message: 'akun anda belum terdaftar' });
      }
      if (password !== result[0].password) {
        return res.json({ message: 'maaf password salah' });
      }

      if (result[0].role === 'user') {
        const payload = {
          id: result[0].id_users,
          email: result[0].email,
          role: 'user',
        };
        const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

        sqlSelect = 'SELECT id_users FROM penyewa WHERE id_users = ?';
        db.query(sqlSelect, [result[0].id_users], (err, result) => {
          if (err) {
            return res.json({ message: 'maaf anda belum terdaftar' });
          }
          if (result.length == 0) {
            return res.json({
              status_user: true,
              token: token,
            });
          }
          return res.json({
            status_user: false,
            token: token,
          });
        });
      }

      if (result[0].role === 'admin') {
        const payload = {
          id: result[0].id_users,
          email: result[0].email,
          role: 'admin',
        };
        const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

        return res.json({
          status: true,
          token: token,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.post(
  '/admin/kamar',
  verifyToken,
  upload.single('fotoKosan'),
  async (req, res) => {
    try {
      const { namaKosan, alamatKosan, jenisKosan, hargaKosan, fasilitasKosan } =
        req.body;

      if (
        !namaKosan ||
        !alamatKosan ||
        !jenisKosan ||
        !hargaKosan ||
        !fasilitasKosan
      ) {
        return res.json({ message: 'maaf form belum lengkap' });
      }
      if (!req.file) {
        return res.status(400).json({
          message: 'Foto kamar wajib diupload',
        });
      }

      const resultCloud = await cloudinary.uploader.upload(req.file.path, {
        folder: 'widyatama-kampus-kos/img/kamar',
        format: 'webp',
        quality: 'auto',
      });
      const filePath = path.resolve(req.file.path);

      fs.unlinkSync(filePath);

      const sqlInsert =
        'INSERT INTO kos (id_users, nama_kos, tipe, alamat_lengkap, foto_kosan, fasilitas, harga) VALUES (?,?,?,?,?,?,?)';
      db.query(
        sqlInsert,
        [
          req.user.id,
          namaKosan,
          jenisKosan,
          alamatKosan,
          resultCloud.secure_url,
          fasilitasKosan,
          hargaKosan,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
            return console.log(err);
          }
          return res.json({ status: true, cloudUrl: resultCloud.secure_url });
        },
      );
    } catch (err) {
      console.log(err);
    }
  },
);

app.post(
  '/dashboard/admin/kamar',
  verifyToken,
  upload.single('fotoKamar'),
  async (req, res) => {
    try {
      const { namaKamar, deskripsiKamar, hargaKamar, fasilitasKamar } =
        req.body;

      if (!namaKamar || !deskripsiKamar || !hargaKamar) {
        return res.json({ message: 'maaf form belum lengkap' });
      }
      if (!req.file) {
        return res.status(400).json({
          message: 'Foto kamar wajib diupload',
        });
      }

      const resultCloud = await cloudinary.uploader.upload(req.file.path, {
        folder: 'widyatama-kampus-kos/img/kamar',
        format: 'webp',
        quality: 'auto',
      });
      const filePath = path.resolve(req.file.path);

      fs.unlinkSync(filePath);

      const sqlSelect = 'SELECT * FROM kos WHERE id_users = ?';
      db.query(sqlSelect, [req.user.id], (err, result) => {
        if (err) {
          console.log(err);
          return res.json({ message: 'form gagal silahkan cek lagi' });
        }

        const sqlResult = result[0];
        const sqlInsert =
          'INSERT INTO kamar (id_kos, nama_kamar, deskripsi_kamar, harga_kamar, fasilitas_kamar, foto_kamar) VALUES (?,?,?,?,?,?)';
        db.query(
          sqlInsert,
          [
            sqlResult.id_kos,
            namaKamar,
            deskripsiKamar,
            hargaKamar,
            fasilitasKamar,
            resultCloud.secure_url,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              return res.json({ message: 'form gagal silahkan cek lagi' });
            }
            return res.json({ status: true, cloudUrl: resultCloud.secure_url });
          },
        );
      });
    } catch (err) {
      console.log(err);
    }
  },
);

app.get('/dashboard/user', verifyToken, (req, res) => {
  try {
    const sql =
      'SELECT u.name, k.nama_kamar, DATEDIFF(sewa_berakhir, CURDATE()) AS sisa_sewa, k.harga_kamar, p.tanggal_masuk, p.sewa_berakhir, k.fasilitas_kamar FROM penyewa p JOIN users u ON p.id_users = u.id_users JOIN kamar k on p.id_kamar = k.id_kamar WHERE p.id_users = ?';
    db.query(sql, [req.user.id], (err, result) => {
      if (err) {
        return console.log(err);
      }
      const data = result[0];
      return res.json(data);
    });
  } catch (err) {
    return console.log(err);
  }
});

app.get('/dashboard/admin', verifyToken, (req, res) => {
  const sqlGet =
    "SELECT u.name, k.*,COUNT(ka.nama_kamar) AS jumlah_kamar,SUM(CASE WHEN ka.status_kamar = 'Kosong' THEN 1 ELSE 0 END) AS kamar_kosong, SUM(CASE WHEN ka.status_kamar = 'Terisi' THEN 1 ELSE 0 END) AS kamar_terisi FROM users u JOIN kos k ON u.id_users = k.id_users LEFT JOIN kamar ka ON k.id_kos = ka.id_kos WHERE k.id_users = ? GROUP BY k.id_users";
  db.query(sqlGet, [req.user.id], (err, resultUser) => {
    if (err) {
      return console.log(err);
    }
    const data = resultUser[0];

    return res.json(data);
  });
});

app.get('/dashboard/admin/penyewa', verifyToken, (req, res) => {
  const sql =
    'SELECT penyewa_user.name AS nama_penyewa, penyewa_user.phone AS phone, ka.nama_kamar, pe.status_sewa, pe.id_penyewa FROM penyewa pe JOIN users penyewa_user ON penyewa_user.id_users = pe.id_users JOIN kamar ka ON pe.id_kamar = ka.id_kamar JOIN kos k ON k.id_kos = ka.id_kos WHERE k.id_users = ?';
  db.query(sql, [req.user.id], (err, result) => {
    if (err) {
      return console.log(err);
    }
    return res.json(result);
  });
});

app.get('/dashboard/admin/kamar', verifyToken, (req, res) => {
  try {
    const sqlSelect = 'SELECT id_kos FROM kos WHERE id_users = ?';
    db.query(sqlSelect, [req.user.id], (err, kosResult) => {
      if (err) {
        return console.log(err);
      }
      if (kosResult.length === 0) {
        return console.log('data kos tidak ditemukan');
      }
      const resultKosan = kosResult[0];
      const sqlSelectkamar = 'SELECT * FROM kamar WHERE id_kos = ?';
      db.query(sqlSelectkamar, [resultKosan.id_kos], (err, kamarResult) => {
        if (err) {
          return console.log(err);
        }
        if (kamarResult.length === 0) {
          return console.log('data kamar tidak ditemukan');
        }
        console.log(kamarResult);
        return res.json(kamarResult, { nama_penyewa: '-', sewa_hingga: '-' });
      });
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/homepage/semua/kosan', (req, res) => {
  try {
    const sqlSelect =
      'SELECT id_kos, foto_kosan, nama_kos, harga, tipe, fasilitas FROM kos LIMIT 12';
    db.query(sqlSelect, (err, kosResult) => {
      if (err) {
        return console.log(err);
      }
      if (kosResult.length === 0) {
        return res.status(404).json({
          message: 'Data kos tidak ditemukan',
        });
      }
      console.log(kosResult);
      return res.json(kosResult);
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/kosan/:id', (req, res) => {
  try {
    const id = req.params.id;
    const sqlSelect =
      "SELECT k.id_kos, k.nama_kos, k.foto_kosan, k.harga, SUM(CASE WHEN ka.status_kamar = 'Kosong' THEN 1 ELSE 0 END) AS ketersediaan_kamar, COUNT(ka.id_kamar) AS jumlah_kamar, k.fasilitas, ka.harga_kamar, ka.status_kamar, ka.id_kamar FROM kos k JOIN kamar ka ON k.id_kos = ka.id_kos WHERE k.id_kos = ? GROUP BY k.id_kos, k.nama_kos, k.foto_kosan, k.harga;";
    db.query(sqlSelect, [id], (err, resultKosan) => {
      if (err) {
        return console.log(err);
      }
      return res.json(resultKosan);
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/kamar/:id_kamar', (req, res) => {
  try {
    const id = req.params.id_kamar;
    const sqlSelect =
      'SELECT nama_kamar, deskripsi_kamar, harga_per_bulan AS harga_kamar, fasilitas_kamar, foto_kamar FROM kamar WHERE id_kamar = ?';
    db.query(sqlSelect, [id], (err, resultKamar) => {
      if (err) {
        return console.log(err);
      }
      res.json(resultKamar);
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/homepage/semua/kosan/putra', (req, res) => {
  try {
    const sqlSelect =
      'SELECT id_kos, foto_kosan, nama_kos, harga, tipe, fasilitas FROM kos WHERE tipe = "Putra" LIMIT 12';
    db.query(sqlSelect, (err, kosResult) => {
      if (err) {
        return console.log(err);
      }
      if (kosResult.length === 0) {
        return res.status(404).json({
          message: 'Data kos tidak ditemukan',
        });
      }
      console.log(kosResult);
      return res.json(kosResult);
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/homepage/semua/kosan/putri', (req, res) => {
  try {
    const sqlSelect =
      'SELECT id_kos, foto_kosan, nama_kos, harga, tipe, fasilitas FROM kos WHERE tipe = "Putri" LIMIT 12';
    db.query(sqlSelect, (err, kosResult) => {
      if (err) {
        return console.log(err);
      }
      if (kosResult.length === 0) {
        return res.status(404).json({
          message: 'Data kos tidak ditemukan',
        });
      }
      console.log(kosResult);
      return res.json(kosResult);
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/homepage/semua/kosan/campuran', (req, res) => {
  try {
    const sqlSelect =
      'SELECT id_kos, foto_kosan, nama_kos, harga, tipe, fasilitas FROM kos WHERE tipe = "Campuran" LIMIT 12';
    db.query(sqlSelect, (err, kosResult) => {
      if (err) {
        return console.log(err);
      }
      if (kosResult.length === 0) {
        return res.status(404).json({
          message: 'Data kos tidak ditemukan',
        });
      }
      console.log(kosResult);
      return res.json(kosResult);
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/dashboard/admin/notifikasi', verifyToken, (req, res) => {
  try {
    return res.json({ status: true });
  } catch (err) {
    console.log(err);
    return res.json({ status: false });
  }
});

app.get('/generate/kamar/admin', verifyToken, (req, res) => {
  try {
    const sql =
      'SELECT ka.nama_kamar, ka.id_kamar FROM users u JOIN kos k ON u.id_users = k.id_users JOIN kamar ka ON ka.id_kos = k.id_kos WHERE u.id_users = ? && ka.status_kamar = "Kosong" GROUP BY ka.id_kamar';
    db.query(sql, [req.user.id], (err, result) => {
      if (err) {
        return console.log(err);
      }
      return res.json(result);
    });
  } catch (err) {
    console.log(err);
  }
});

app.post('/generate/kamar/admin', verifyToken, (req, res) => {
  try {
    const { id_kamar, tanggal_masuk, kode } = req.body;
    if (!id_kamar || !tanggal_masuk || !kode) {
      return res.json({ message: 'maaf form belum lengkap' });
    }
    const sql =
      'INSERT INTO kode_kamar (kode, id_kamar, tanggal_masuk) VALUES (?,?,?)';
    db.query(sql, [kode, id_kamar, tanggal_masuk], (err, result) => {
      if (err) {
        return console.log(err);
      }
      return res.json({ kode: kode });
    });
  } catch (err) {
    console.log(err);
  }
});

app.post('/homepage/user/kode', verifyToken, (req, res) => {
  try {
    const { kode } = req.body;
    console.log(kode);
    const sqlSelect = 'SELECT * FROM kode_kamar WHERE kode = ?';
    db.query(sqlSelect, [kode], (err, result) => {
      if (err) {
        return console.log(result);
      }

      const id_kamar = result[0].id_kamar;
      const tanggal_masuk = result[0].tanggal_masuk;
      const sewa_berakhir = new Date(tanggal_masuk);
      sewa_berakhir.setMonth(sewa_berakhir.getMonth() + 1);

      const sqlInsert =
        'INSERT INTO penyewa (id_users, id_kamar, tanggal_masuk, sewa_berakhir, status_sewa) VALUES (?,?,?,?,?)';
      db.query(
        sqlInsert,
        [req.user.id, id_kamar, tanggal_masuk, sewa_berakhir, 'Aktif'],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          return res.json({ status: true });
        },
      );
    });
  } catch (err) {
    console.log(err);
  }
});

//server reading
app.listen(port, () => {
  console.log(`server ini sedang berjalan di port ${port}`);
});
