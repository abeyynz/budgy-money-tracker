const pendapatanModel = require('../models/pendapatanModel');

// Mendapatkan daftar semua pendapatan
const getPendapatan = async (req, res) => {
  console.log(req.user);
  const userId = req.user.id;  
  try {
    const pendapatan = await pendapatanModel.getAllPendapatan(userId);
    res.status(200).json({ success: true, data: pendapatan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Menambahkan pendapatan baru
const addPendapatan = async (req, res) => {
  const { nominal, kategoriId, tanggal } = req.body;
  const userId = req.user.id;  

  // Validasi input
  if (!nominal || !kategoriId || !tanggal) {
    return res.status(400).json({ success: false, message: 'Semua data harus diisi.' });
  }

  try {
    // Menambahkan pendapatan
    const newPendapatan = await pendapatanModel.addPendapatan(nominal, kategoriId, userId, tanggal);

    res.status(201).json({ success: true, data: newPendapatan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mengupdate pendapatan
const updatePendapatan = async (req, res) => {
  const { id } = req.params;
  const { nominal, kategoriId, tanggal } = req.body;

  // Validasi input
  if (!nominal || !kategoriId || !tanggal) {
    return res.status(400).json({ success: false, message: 'Semua data harus diisi.' });
  }

  try {
    const updatedPendapatan = await pendapatanModel.updatePendapatan(id, nominal, kategoriId, tanggal);
    if (!updatedPendapatan) {
      return res.status(404).json({ success: false, message: 'Pendapatan tidak ditemukan.' });
    }
    res.status(200).json({ success: true, data: updatedPendapatan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Menghapus pendapatan
const deletePendapatan = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPendapatan = await pendapatanModel.deletePendapatan(id);
    if (!deletedPendapatan) {
      return res.status(404).json({ success: false, message: 'Pendapatan tidak ditemukan.' });
    }
    res.status(200).json({ success: true, message: 'Pendapatan berhasil dihapus.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPendapatan,
  addPendapatan,
  updatePendapatan,
  deletePendapatan,
};
