# Database Schema

This document outlines the primary database tables and basic SQL for GATEXpress AI.

## 1. Tables

1. users
2. tests
3. questions
4. results
5. materials

## 2. Example SQL (PostgreSQL)

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'student',
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE tests (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subject VARCHAR(100),
  duration_minutes INT NOT NULL DEFAULT 60,
  created_by INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  test_id INT REFERENCES tests(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  option1 TEXT,
  option2 TEXT,
  option3 TEXT,
  option4 TEXT,
  answer SMALLINT NOT NULL, -- 1..4
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE results (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  test_id INT REFERENCES tests(id) ON DELETE CASCADE,
  score INT,
  total INT,
  taken_at TIMESTAMP DEFAULT now()
);

CREATE TABLE materials (
  id SERIAL PRIMARY KEY,
  subject VARCHAR(100),
  title VARCHAR(255),
  file_path VARCHAR(1024) NOT NULL,
  uploaded_by INT REFERENCES users(id),
  uploaded_at TIMESTAMP DEFAULT now()
);

## 3. Indexes and Performance

- Index on users(email)
- Index on tests(subject)
- Index on results(user_id, taken_at)

## 4. Migration Notes

- Use alembic or a migration framework to manage schema changes.
- Keep destructive migrations behind feature flags and backups.

---

Last updated: 2026-03-01
