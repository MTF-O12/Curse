
Copy

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
 
const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
 
// ── ПОДКЛЮЧЕНИЕ К MONGODB ──
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB подключена'))
  .catch(err => console.error('❌ Ошибка подключения:', err));
 
// ── СХЕМА ВАКАНСИИ ──
const vacancySchema = new mongoose.Schema({
  company:   { type: String, required: true, trim: true },
  message:   { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
});
 
const Vacancy = mongoose.model('Vacancy', vacancySchema);
 
// ── МАРШРУТЫ ──
 
// Получить все вакансии
app.get('/api/vacancies', async (req, res) => {
  try {
    const vacancies = await Vacancy.find().sort({ createdAt: -1 });
    res.json(vacancies);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});
 
// Отправить вакансию
app.post('/api/vacancies', async (req, res) => {
  try {
    const { company, message } = req.body;
 
    if (!company || !message) {
      return res.status(400).json({ error: 'Заполните все поля' });
    }
 
    const vacancy = new Vacancy({ company, message });
    await vacancy.save();
 
    res.status(201).json({ success: true, vacancy });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});
 
// Удалить вакансию
app.delete('/api/vacancies/:id', async (req, res) => {
  try {
    await Vacancy.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});
 
// ── ЗАПУСК ──
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});