-- Run this once to set up your books table
CREATE TABLE IF NOT EXISTS books (
  id             SERIAL PRIMARY KEY,
  title          VARCHAR(255) NOT NULL,
  author         VARCHAR(255) NOT NULL,
  genre          VARCHAR(100),
  published_year INTEGER,
  created_at     TIMESTAMP DEFAULT NOW(),
  updated_at     TIMESTAMP DEFAULT NOW()
);

-- Optional: seed data
INSERT INTO books (title, author, genre, published_year) VALUES
  ('The Pragmatic Programmer', 'Andy Hunt',       'Technology', 1999),
  ('Clean Code',               'Robert C. Martin','Technology', 2008),
  ('Sapiens',                  'Yuval Noah Harari','History',   2011);
