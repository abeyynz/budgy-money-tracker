const rekomendasiModel = require('../models/rekomendasiModel');

// Mengambil rekomendasi terbaru untuk pengguna tertentu
const getLatestRekomendasi = async (req, res) => {
  console.log(req.user);
  const userId = req.user.id;
  try {
    const latestRekomendasi = await rekomendasiModel.getLatestRekomendasiByUser(userId);

    if (!latestRekomendasi) {
      return res.status(404).json({
        success: false,
        message: 'Rekomendasi tidak ditemukan untuk pengguna ini.',
      });
    }

    res.status(200).json({
      success: true,
      data: latestRekomendasi,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getLatestRekomendasi,
};
