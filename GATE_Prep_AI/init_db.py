import sqlite3

conn = sqlite3.connect('gateprep.db')
c = conn.cursor()

# Drop old table (CAUTION: this deletes existing user data)
c.execute("DROP TABLE IF EXISTS users")

# Create new users table with role
c.execute("""
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
)
""")

conn.commit()
conn.close()
print("Database reset with role column.")
