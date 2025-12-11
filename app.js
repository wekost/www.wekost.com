//server setup
const express = require("express");
const app = express();
const db = require("./config/config.js")
const path = require("path");
const port = 8080;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/auth/user/register", (req, res)=>{
  const {name, email, phone, password, confirm_password} = req.body;
  if(password !== confirm_password){
    return res.json({message: "maaf password tidak sesuai"})
  }
  try{
    const sqlCheck = "SELECT * FROM users WHERE email = ?"
    db.query(sqlCheck, [email], (err, result)=>{
      if(err){
        return res.json({message: "gagal registrasi cek kembali form"})
      }
      if(result.length > 0){
        return res.json({ message: "maaf email sudah terdaftar" });
      }

      const sqlInsert = "INSERT INTO users (name, email, phone, password) VALUES (?,?,?,?)"
      db.query(sqlInsert, [name, email, phone, password], (err, result)=>{
      if(err){
        return res.json({message: "gagal registrasi cek kembali form"})
      }
        return res.json({status: true})
    })
    })
  }catch(err){
    return res.json({message: "terjadi error saat registrasi"})
  }
})

app.post("/auth/admin/register", (req, res)=>{
  const {name, email, phone, password, confirm_password} = req.body;
  if(password !== confirm_password){
    return res.json({message: "maaf password tidak sesuai"})
  }
  try{
    const sqlCheck = "SELECT * FROM users WHERE email = ?"
    db.query(sqlCheck, [email], (err, result)=>{
      if(err){
        return res.json({message: "gagal registrasi cek kembali form"})
      }
      if(result.length > 0){
        return res.json({ message: "maaf email sudah terdaftar" });
      }

      const sqlInsert = "INSERT INTO users (name, email, phone, password, role) VALUES (?,?,?,?,?)"
      db.query(sqlInsert, [name, email, phone, password, "admin"], (err, result)=>{
      if(err){
        return res.json({message: "gagal registrasi cek kembali form"})
      }
        return res.json({status: true})
    })
    })
  }catch(err){
    return res.json({message: "terjadi error saat registrasi"})
  }
})

app.post("/auth/login", (req,res)=>{
  const {email, password} = req.body;
  const sqlCheck = "SELECT * FROM users WHERE email = ?"
  db.query(sqlCheck, [email], (err, result)=>{
    if(err){
      return res.json({message: "gagal login cek kembali form"})
    }
    if(result.length == 0){
      return res.json({message: "akun anda belum terdaftar"})
    }
    if (password !== result[0].password) {
      return res.json({ message: "maaf password salah" });
    }
    
    if (result[0].role === "user") {
      return res.json({ status: true, message: "berhasil login sebagai user" });
    }

    if (result[0].role === "admin") {
      return res.json({ status: false, message: "berhasil login sebagai admin" });
    }
  })
})

app.listen(port, () => {
  console.log(`server ini sedang berjalan di port ${port}`);
});
