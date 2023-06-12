const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// Подключение к базе данных MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'personal_accounting'
});

// Проверка соединения с базой данных
db.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
  } else {
    console.log('Подключено к базе данных');
  }
});

// Middleware для обработки тела запроса в формате JSON
app.use(bodyParser.json());

// Middleware для отображения статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Маршруты сервера

// Маршрут для получения всех транзакций
app.get('/transactions', (req, res) => {
  const sql = 'SELECT * FROM transactions';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса:', err);
      res.status(500).json({ error: 'Ошибка выполнения запроса' });
    } else {
      res.json(result);
    }
  });
});

// Маршрут для создания новой транзакции
app.post('/add_transaction', (req, res) => {
  const { category, type, amount, currency } = req.body;
  const sql = 'INSERT INTO transactions (category, type, amount, currency) VALUES (?, ?, ?, ?)';
  db.query(sql, [category, type, amount, currency], (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса:', err);
      res.status(500).json({ error: 'Ошибка выполнения запроса' });
    } else {
      res.json({ message: 'Транзакция успешно добавлена' });
    }
  });
});

// Маршрут для получения всех целей
app.get('/goals', (req, res) => {
  const sql = 'SELECT * FROM goals';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса:', err);
      res.status(500).json({ error: 'Ошибка выполнения запроса' });
    } else {
      res.json(result);
    }
  });
});

// Маршрут для создания новой цели
app.post('/add_goal', (req, res) => {
  const { goal, amount, target_date } = req.body;
  const sql = 'INSERT INTO goals (name, amount, target_date) VALUES (?, ?, ?)';
  db.query(sql, [goal, amount, target_date], (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса:', err);
      res.status(500).json({ error: 'Ошибка выполнения запроса' });
    } else {
      res.json({ message: 'Цель успешно добавлена' });
    }
  });
});

// Маршрут для отображения главной страницы интерфейса
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
