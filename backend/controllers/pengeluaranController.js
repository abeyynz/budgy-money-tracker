const pengeluaranModel = require('../models/pengeluaranModel');

// Mendapatkan daftar semua pengeluaran
const getPengeluaran = async (req, res) => {
  const userId = req.user.id; 
  try {
    const pengeluaran = await pengeluaranModel.getAllPengeluaran(userId);
    res.status(200).json({ success: true, data: pengeluaran });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Menambahkan pengeluaran baru
const addPengeluaran = async (req, res) => {
  const { nominal, kategoriId, tanggal } = req.body;
  const userId = req.user.id; 

  // Validasi input
  if (!nominal || !kategoriId || !tanggal) {
    return res.status(400).json({ success: false, message: 'Semua data harus diisi.' });
  }

  try {
    // Menambahkan pengeluaran
    const newPengeluaran = await pengeluaranModel.addPengeluaran(nominal, kategoriId, userId, tanggal);

    // Mengurangi nominal pengeluaran dari saldo pengguna
    const currentSaldo = await saldoModel.getSaldo(userId);
    const newSaldo = currentSaldo ? currentSaldo.nominal - nominal : 0;  

    // Update saldo dengan nominal baru
    await saldoModel.addSaldo(newSaldo, userId, tanggal); 

    res.status(201).json({ success: true, data: newPengeluaran });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mengupdate pengeluaran
const updatePengeluaran = async (req, res) => {
  const { id } = req.params;
  const { nominal, kategoriId, tanggal } = req.body;

  // Validasi input
  if (!nominal || !kategoriId || !tanggal) {
    return res.status(400).json({ success: false, message: 'Semua data harus diisi.' });
  }

  try {
    const updatedPengeluaran = await pengeluaranModel.updatePengeluaran(id, nominal, kategoriId, tanggal);
    if (!updatedPengeluaran) {
      return res.status(404).json({ success: false, message: 'Pengeluaran tidak ditemukan.' });
    }
    res.status(200).json({ success: true, data: updatedPengeluaran });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Menghapus pengeluaran
const deletePengeluaran = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPengeluaran = await pengeluaranModel.deletePengeluaran(id);
    if (!deletedPengeluaran) {
      return res.status(404).json({ success: false, message: 'Pengeluaran tidak ditemukan.' });
    }
    res.status(200).json({ success: true, message: 'Pengeluaran berhasil dihapus.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPengeluaran,
  addPengeluaran,
  updatePengeluaran,
  deletePengeluaran,
};
