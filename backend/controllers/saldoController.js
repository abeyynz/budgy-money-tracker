const saldoModel = require('../models/saldoModel');

// Mendapatkan saldo terakhir pengguna
const getSaldo = async (req, res) => {
  const userId = req.user.id;  
  try {
    const saldo = await saldoModel.getSaldo(userId);
    if (!saldo) {
      return res.status(404).json({ success: false, message: 'Saldo tidak ditemukan.' });
    }
    res.status(200).json({ success: true, data: saldo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Menambahkan saldo baru (hanya digunakan ketika transaksi pendapatan)
// const addSaldo = async (req, res) => {
//   const { nominal, tanggal } = req.body;
//   const userId = req.user.id;  

//   // Validasi input
//   if (!nominal || !tanggal) {
//     return res.status(400).json({ success: false, message: 'Semua data harus diisi.' });
//   }

//   try {
//     const newSaldo = await saldoModel.addSaldo(nominal, userId, tanggal);
//     res.status(201).json({ success: true, data: newSaldo });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

module.exports = {
  getSaldo,
  // addSaldo,
};
