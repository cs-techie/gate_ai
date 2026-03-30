import sqlite3

conn = sqlite3.connect('gateprep.db')  # Make sure this matches your DB name
c = conn.cursor()

for row in c.execute("SELECT * FROM users"):
    print(row)

conn.close()
