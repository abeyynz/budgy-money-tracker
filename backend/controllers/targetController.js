const targetModel = require('../models/targetModel');

// Mengambil nilai target untuk pengguna tertentu
const getTarget = async (req, res) => {
  const userId = req.user.id; 
  try {
    const target = await targetModel.getTargetByUser(userId);

    if (!target) {
      return res.status(404).json({
        success: false,
        message: 'Target tidak ditemukan untuk pengguna ini.',
      });
    }

    res.status(200).json({
      success: true,
      data: target,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Menambahkan target untuk pengguna tertentu
const addTarget = async (req, res) => {
  const userId = req.user.id; 
  const { nominal, tanggal } = req.body;

  if (!nominal || isNaN(nominal)) {
    return res.status(400).json({
      success: false,
      message: 'Nominal harus berupa angka dan tidak boleh kosong.',
    });
  }

  try {
    const newTarget = await targetModel.addTarget(userId, nominal, tanggal);

    res.status(201).json({
      success: true,
      message: 'Target berhasil ditambahkan.',
      data: newTarget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mengupdate nilai target untuk pengguna tertentu
const updateTarget = async (req, res) => {
  const userId = req.user.id; 
  const { nominal, tanggal } = req.body;

  if (!nominal || isNaN(nominal)) {
    return res.status(400).json({
      success: false,
      message: 'Nominal harus berupa angka dan tidak boleh kosong.',
    });
  }

  try {
    const updatedTarget = await targetModel.updateTargetByUser(userId, nominal, tanggal);

    if (!updatedTarget) {
      return res.status(404).json({
        success: false,
        message: 'Target tidak ditemukan untuk pengguna ini.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Target berhasil diperbarui.',
      data: updatedTarget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getTarget,
  addTarget,
  updateTarget,
};
