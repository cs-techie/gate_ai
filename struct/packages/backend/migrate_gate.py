import sys, sqlite3
sys.path.insert(0, 'c:/Users/Administrator/my-app/Shankar/struct/packages/backend')
from app.config import settings

db_path = settings.database_url.replace('sqlite:///', '')
print(f"DB: {db_path}")
conn = sqlite3.connect(db_path)
cur = conn.cursor()

# ── questions table ─────────────────────────────────────────────
cur.execute('PRAGMA table_info(questions)')
existing_q = {row[1]: row[2] for row in cur.fetchall()}
print('Questions cols:', list(existing_q.keys()))

# Rebuild questions if answer is INTEGER
if existing_q.get('answer', '').upper() in ('INTEGER', 'SMALLINT', 'INT', ''):
    print('Rebuilding questions table (answer: INT -> TEXT + GATE cols)...')
    cur.execute('ALTER TABLE questions RENAME TO questions_old')
    cur.execute('''
        CREATE TABLE questions (
            id INTEGER PRIMARY KEY,
            test_id INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
            question TEXT NOT NULL,
            option1 TEXT,
            option2 TEXT,
            option3 TEXT,
            option4 TEXT,
            answer TEXT NOT NULL DEFAULT "",
            question_type TEXT NOT NULL DEFAULT "MCQ",
            marks INTEGER NOT NULL DEFAULT 1,
            section TEXT NOT NULL DEFAULT "Subject",
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    cur.execute('''
        INSERT INTO questions
        SELECT id, test_id, question, option1, option2, option3, option4,
               CAST(answer AS TEXT), "MCQ", 1, "Subject", created_at
        FROM questions_old
    ''')
    cur.execute('DROP TABLE questions_old')
    print('questions rebuilt OK')
else:
    # Just add missing cols
    for col, defn in [
        ('question_type', 'TEXT NOT NULL DEFAULT "MCQ"'),
        ('marks',         'INTEGER NOT NULL DEFAULT 1'),
        ('section',       'TEXT NOT NULL DEFAULT "Subject"'),
    ]:
        if col not in existing_q:
            cur.execute(f'ALTER TABLE questions ADD COLUMN {col} {defn}')
            print(f'Added questions.{col}')

conn.commit()

# ── results table ───────────────────────────────────────────────
cur.execute('PRAGMA table_info(results)')
existing_r = {row[1]: row[2] for row in cur.fetchall()}
print('Results cols:', list(existing_r.keys()))

if existing_r.get('score', '').upper() in ('INTEGER', 'INT'):
    print('Rebuilding results table (score: INT -> REAL + GATE cols)...')
    cur.execute('ALTER TABLE results RENAME TO results_old')
    cur.execute('''
        CREATE TABLE results (
            id INTEGER PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            test_id INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
            score REAL,
            total INTEGER,
            negative_marks REAL DEFAULT 0,
            correct_count INTEGER DEFAULT 0,
            wrong_count INTEGER DEFAULT 0,
            unattempted_count INTEGER DEFAULT 0,
            ga_score REAL DEFAULT 0,
            math_score REAL DEFAULT 0,
            subject_score REAL DEFAULT 0,
            time_taken INTEGER,
            taken_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    cur.execute('''
        INSERT INTO results
        SELECT id, user_id, test_id, CAST(score AS REAL), total,
               0, 0, 0, 0, 0, 0, 0, time_taken, taken_at
        FROM results_old
    ''')
    cur.execute('DROP TABLE results_old')
    print('results rebuilt OK')
else:
    for col, defn in [
        ('negative_marks',    'REAL DEFAULT 0'),
        ('correct_count',     'INTEGER DEFAULT 0'),
        ('wrong_count',       'INTEGER DEFAULT 0'),
        ('unattempted_count', 'INTEGER DEFAULT 0'),
        ('ga_score',          'REAL DEFAULT 0'),
        ('math_score',        'REAL DEFAULT 0'),
        ('subject_score',     'REAL DEFAULT 0'),
    ]:
        if col not in existing_r:
            cur.execute(f'ALTER TABLE results ADD COLUMN {col} {defn}')
            print(f'Added results.{col}')

conn.commit()
conn.close()
print('Migration complete!')
