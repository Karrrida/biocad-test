# Biocad Test Project

## Описание проекта

Full-stack приложение:
- **Backend**: Node.js + TypeScrypt + express + PostgreSQL + Prisma
- **Frontend**: React + TypeScrypt + Vite + MUI

## Технологии

![Node.js](https://img.shields.io/badge/Node.js-20.15.1-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![React](https://img.shields.io/badge/React-19-blue)

Полный стек:
- Backend: Node.js, TypeScrypt, express, Prisma ORM, JWT, bcrypt
- Frontend: React, Vite, Material-UI, TypeScrypt
- База данных: PostgreSQL
- Инфраструктура: Docker

# Требования

- Docker 20.10+
- Docker Compose 2.0+
- Node.js 20+ (только для разработки)

## Быстрый старт

### 1. Клонирование репозитория

```bash
git clone https://github.com/Karrrida/biocad-test.git
cd biocad-test
```

### 2. Настройка окружения

- Создайте файл .env в папке backend/ на основе примера .env.example
- Отредактируйте параметры(DATABASE_URL и JWT_SECRET)

### 3. Запуск в Docker

```bash
docker compose up --buld -d
```

Приложение будет доступно:
Frontend: http://localhost:8080
Backend: http://localhost:3000
PostgreSQL: порт:5432 