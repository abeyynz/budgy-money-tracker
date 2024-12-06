const kategoriPengeluaranModel = require('../models/kategoriPengeluaranModel');

// Mendapatkan daftar semua kategori Pengeluaran
const getCategories = async (req, res) => {
  try {
    const categories = await kategoriPengeluaranModel.getAllCategories();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(400).json({ message: 'Bad Request', error: error.message });
  }
};

// Menambahkan kategori Pengeluaran baru
const addCategory = async (req, res) => {
  const { nama } = req.body;

  // Validasi input
  if (!nama) {
    return res.status(400).json({ success: false, message: 'Nama kategori harus diisi.' });
  }

  try {
    const newCategory = await kategoriPengeluaranModel.addCategory(nama);
    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCategories,
  addCategory,
};
