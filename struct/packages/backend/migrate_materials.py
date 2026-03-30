import sqlite3

conn = sqlite3.connect("gatexpress.db")
cursor = conn.cursor()

cursor.execute("PRAGMA table_info(materials)")
cols = [row[1] for row in cursor.fetchall()]
print("Current columns:", cols)

if "type" not in cols:
    cursor.execute("ALTER TABLE materials ADD COLUMN type VARCHAR(50) NOT NULL DEFAULT 'PDF'")
    print("Added: type")
else:
    print("Already exists: type")

if "description" not in cols:
    cursor.execute("ALTER TABLE materials ADD COLUMN description TEXT")
    print("Added: description")
else:
    print("Already exists: description")

conn.commit()
conn.close()
print("Migration complete.")
