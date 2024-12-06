const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authModel = require('../models/authModel');

// Fungsi untuk registrasi
const register = async (req, res) => {
  const { nama, password } = req.body;

  // Validasi input
  if (!nama || !password) {
    return res.status(400).json({ message: 'Nama dan password wajib diisi.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password harus memiliki panjang minimal 6 karakter.' });
  }

  try {
    // Cek apakah nama sudah terdaftar
    const existingUser = await authModel.getUserByName(nama);
    if (existingUser) {
      return res.status(400).json({ message: 'Nama sudah digunakan.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user ke database
    const newUser = await authModel.createUser(nama, hashedPassword);

    res.status(201).json({ message: 'Registrasi berhasil.', user: newUser });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

// Fungsi untuk login
const login = async (req, res) => {
  const { nama, password } = req.body;

  // Validasi input
  if (!nama || !password) {
    return res.status(400).json({ message: 'Nama dan password wajib diisi.' });
  }

  try {
    // Cek apakah user ada
    const user = await authModel.getUserByName(nama);
    if (!user) {
      return res.status(400).json({ message: 'Nama atau password salah.' });
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Nama atau password salah.' });
    }

    // Buat JWT token
    const token = jwt.sign({ id: user.id, nama: user.nama }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ message: 'Login berhasil.', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

module.exports = {
  register,
  login,
};
