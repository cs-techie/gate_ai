import sqlite3

conn = sqlite3.connect('gateprep.db')  # This creates the DB file in your project folder
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS test_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    subject TEXT,
    question_id INTEGER,
    is_correct INTEGER,
    time_taken REAL,
    date_taken TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
''')

conn.commit()
conn.close()

print("Table created successfully!")
