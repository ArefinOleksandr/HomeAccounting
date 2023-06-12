-- Создание базы данных
CREATE DATABASE personal_accounting;

-- Использование базы данных
USE personal_accounting;

-- Создание таблицы transactions для хранения транзакций
CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(255) NOT NULL,
  type VARCHAR(10) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы goals для хранения целей
CREATE TABLE goals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  target_date DATE NOT NULL
);

-- Создание таблицы exchange_rates для хранения курсов валют
CREATE TABLE exchange_rates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  currency VARCHAR(10) NOT NULL,
  rate DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка начальных данных для таблицы exchange_rates
INSERT INTO exchange_rates (currency, rate) VALUES
('доллар', 0.014),
('евро', 0.012),
('гривна', 0.40);
