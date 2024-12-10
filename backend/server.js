require('dotenv').config();
const express = require('express');
const { swaggerUi, swaggerDocs } = require('./swaggerConfig');
const authRoutes = require('./routes/authRoutes');
const kategoriPendapatanRoutes = require('./routes/kategoriPendapatanRoutes');
const kategoriPengeluaranRoutes = require('./routes/kategoriPengeluaranRoutes');
const pendapatanRoutes = require('./routes/pendapatanRoutes');
const pengeluaranRoutes = require('./routes/pengeluaranRoutes');
const rekomendasiRoutes = require('./routes/rekomendasiRoutes');
const targetRoutes = require('./routes/targetRoutes');
// const saldoRoutes = require('./routes/saldoRoutes');

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Definisi rute
app.use('/api/auth', authRoutes); // login & register
app.use('/api/kategori-pendapatan', kategoriPendapatanRoutes);
app.use('/api/kategori-pengeluaran', kategoriPengeluaranRoutes);
app.use('/api/pendapatan', pendapatanRoutes);
app.use('/api/pengeluaran', pengeluaranRoutes);
app.use('/api/rekomendasi', rekomendasiRoutes);
app.use('/api/target', targetRoutes);
// app.use('/api/saldo', saldoRoutes);

// Mengarahkan root ke dokumentasi Swagger
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Middleware untuk route not found
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Middleware untuk internal server error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server berjalan di ${PORT}`);
  console.log(`Dokumentasi Swagger tersedia di http://localhost:${PORT}/api-docs`);
});
