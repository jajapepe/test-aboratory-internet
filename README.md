# Developer Portfolio Landing Page

Полнофункциональный лендинг-портфолио разработчика **Георгий Солодовников** с контактной формой и backend API для обработки заявок.

## 🚀 Особенности

- ✅ **Современный frontend** с адаптивным дизайном
- ✅ **Express.js backend** с REST API
- ✅ **Обработка форм** с валидацией
- ✅ **Отправка email** через SMTP (nodemailer)
- ✅ **Безопасность** (helmet, rate limiting, CORS)
- ✅ **Валидация данных** на frontend и backend
- ✅ **PDF резюме** для скачивания
- ✅ **Прямые контакты** (Email, Телефон, Telegram)

## 📋 Содержание

1. [О проекте](#о-проекте)
2. [О владельце](#о-владельце)
3. [Технологический стек](#технологический-стек)
4. [Структура проекта](#структура-проекта)
5. [Как запустить](#как-запустить)
6. [Конфигурация](#конфигурация)
7. [API Документация](#api-документация)
8. [Реализация формы](#реализация-формы)

## 📌 О Проекте

Лендинг-страница для демонстрации навыков Fullstack-разработчика, включающая:

- **Информация о себе**: опыт работы, подходы к разработке
- **Навыки**: список технологий (Golang, Node.js, React, Next.js, React Native)
- **Опыт работы**: 3 компании (Neurosell, Инвейжн, Sokrat)
- **Контакты**: форма обратной связи с валидацией + прямые контакты
- **Скачивание резюме**: PDF версия резюме

## 👤 О Владельце

**Георгий Солодовников**

- 📍 **Локация**: Пермь, Россия
- 💼 **Должность**: Fullstack-разработчик
- 📅 **Опыт**: 3.5 года коммерческой разработки
- 💰 **Зарплатные ожидания**: 150 000 ₽ на руки
- 🌐 **Готовность**: Удалённая работа
- 📧 **Email**: georgy-solodovnikov1@yandex.ru
- 📱 **Телефон**: +7 (909) 116-31-29
- ✈️ **Telegram**: @iewher

**Специализация**:
- Highload backend-сервисы (Golang, Node.js/Express.js)
- Современные frontend-приложения (React, Next.js, React Native)
- Архитектура с нуля: от выбора стека до CI/CD и production деплоя

**Опыт**:
- Разработка для образовательных платформ, интернет-магазинов, мобильных приложений
- Интеграция платёжных систем (ЮKassa)
- OAuth2 провайдеры (Google, VK, Telegram, Apple)

## 🛠 Технологический Стек

### Frontend
- **HTML5** - семантическая верстка
- **SCSS** - препроцессор CSS
- **JavaScript (ES6+)** - ванильный JS без фреймворков
- **Vite** - сборщик и dev-сервер

### Backend
- **Node.js** - runtime среда
- **Express.js** - веб-фреймворк
- **nodemailer** - отправка email
- **express-validator** - валидация данных
- **helmet** - безопасность HTTP заголовков
- **cors** - настройка CORS
- **express-rate-limit** - защита от brute-force

### Технологии владельца (из резюме)
- **Backend**: Golang, Node.js, Express.js, Gin, GraphQL, gRPC, PostgreSQL, Redis, Sequelize, SQLC
- **Frontend**: React, Next.js, TypeScript, JavaScript, HTML5, CSS3, SCSS
- **Mobile**: React Native, Expo
- **DevOps**: Docker, Docker Compose, CI/CD, Linux, Git, Jest

## 📁 Структура Проекта

```
├── server/
│   ├── index.js              # Точка входа backend
│   ├── controllers/
│   │   └── contactController.js  # Логика обработки формы
│   ├── services/
│   │   └── emailService.js   # Сервис отправки email
│   └── routes/
│       └── contact.js        # Маршрут формы
├── src/
│   ├── styles/
│   │   └── main.scss         # Основные стили
│   └── main.js               # Frontend логика
├── index.html                # Главная страница
├── resume.pdf                # Резюме (PDF)
├── vite.config.js            # Конфигурация Vite
├── package.json
├── .env.example              # Пример переменных окружения
└── README_NEW.md            # Эта документация
```

## 🏃 Как Запустить

### Предварительные требования
- Node.js >= 18
- npm или yarn

### Установка

1. **Клонируйте репозиторий**
```bash
git clone <your-repo-url>
cd developer-landing
```

2. **Установите зависимости**
```bash
npm install
```

3. **Настройте переменные окружения**
```bash
cp .env.example .env
```

Откройте `.env` и настройте SMTP параметры:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
```

4. **Запустите проект в режиме разработки**
```bash
npm run dev
```

Это запустит:
- Backend на `http://localhost:3000`
- Frontend на `http://localhost:5173`

5. **Для продакшн сборки**
```bash
npm run build
npm start
```

## ⚙️ Конфигурация

### Переменные окружения

| Переменная | Описание | По умолчанию |
|------------|----------|--------------|
| `NODE_ENV` | Окружение | development |
| `PORT` | Порт backend сервера | 3000 |
| `FRONTEND_URL` | URL frontend для CORS | http://localhost:5173 |
| `EMAIL_HOST` | SMTP хост | smtp.gmail.com |
| `EMAIL_PORT` | SMTP порт | 587 |
| `EMAIL_SECURE` | Использовать TLS | false |
| `EMAIL_USER` | Email отправителя | - |
| `EMAIL_PASS` | Пароль приложения | - |
| `EMAIL_FROM` | Email From заголовка | EMAIL_USER |

### Настройка Gmail SMTP

Для использования Gmail:

1. Включите 2FA в аккаунте Google
2. Создайте [пароль приложения](https://myaccount.google.com/apppasswords)
3. Используйте этот пароль в `EMAIL_PASS`

## 📡 API Документация

### Отправить контактную форму

**POST** `/api/contact`

**Body:**
```json
{
  "name": "Иван Иванов",
  "email": "ivan@example.com",
  "phone": "+7 (999) 123-45-67",
  "comment": "Хочу обсудить проект..."
}
```

**Валидация:**
- `name`: 2-100 символов
- `email`: валидный email формат
- `phone`: 10-20 символов, цифры и спецсимволы
- `comment`: 10-1000 символов

**Успешный ответ (200):**
```json
{
  "success": true,
  "message": "Заявка успешно отправлена!"
}
```

**Ошибка валидации (400):**
```json
{
  "errors": [
    {
      "field": "email",
      "message": "Некорректный email"
    }
  ]
}
```

**Ошибка сервера (500):**
```json
{
  "success": false,
  "message": "Ошибка при отправке формы"
}
```

### Проверка здоровья

**GET** `/api/health`

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 📝 Реализация Формы

### Frontend

1. **HTML структура** - семантические поля формы
2. **Клиентская валидация**:
   - Required поля
   - Формат email
   - Длина текста
   - Мгновенная обратная связь

3. **Состояния формы**:
   - `loading` - показ индикатора отправки
   - `success` - сообщение об успехе
   - `error` - отображение ошибок

4. **AJAX отправка** - fetch API без перезагрузки

### Backend

1. **Валидация** - express-validator middleware
2. **Защита** - rate limiting (100 запросов/15 мин)
3. **Обработка** - контроллер с try/catch
4. **Email рассылка**:
   - Письмо владельцу сайта
   - Копия пользователю

### Безопасность

- Helmet - защита HTTP заголовков
- CORS - ограничение источников
- Rate limiting - защита от DDoS
- Валидация - санитизация входных данных

## 🎨 Дизайн

- **Адаптивность**: mobile-first подход
- **Цветовая схема**: градиенты с фиолетовыми тонами
- **Анимации**: плавные переходы и hover эффекты
- **Шрифты**: Inter из Google Fonts

## 📱 Поддерживаемые устройства

- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥 Large (1280px+)

## 🤝 Вклад

Приветствуются pull requests! Для крупных изменений откройте issue сначала.

## 📄 License

MIT License - свободное использование
