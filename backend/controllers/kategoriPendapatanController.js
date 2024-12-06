const kategoriPendapatanModel = require('../models/kategoriPendapatanModel');

// Mendapatkan daftar semua kategori pendapatan
const getCategories = async (req, res) => {
  try {
    const categories = await kategoriPendapatanModel.getAllCategories();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Menambahkan kategori pendapatan baru
const addCategory = async (req, res) => {
  const { nama } = req.body;

  // Validasi input
  if (!nama) {
    return res.status(400).json({ success: false, message: 'Nama kategori harus diisi.' });
  }

  try {
    const newCategory = await kategoriPendapatanModel.addCategory(nama);
    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCategories,
  addCategory,
};
