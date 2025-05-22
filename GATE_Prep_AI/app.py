from flask import Flask, request, session, g, jsonify
import sqlite3

app = Flask(__name__)
app.secret_key = 'your-secret-key'  # Needed for session
DATABASE = 'gateprep.db'

# ---------------- Database Connection ---------------- #
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row  # Allows dict-like access to rows
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# ---------------- Submit Test Route ---------------- #
@app.route('/submit_test', methods=['POST'])
def submit_test():
    data = request.get_json()
    questions = data.get('questions', [])

    # Replace with real login later
    student_id = session.get('student_id', 1)

    db = get_db()
    cursor = db.cursor()

    for q in questions:
        subject = q.get('subject')
        question_id = q.get('id')
        selected = q.get('selected_option')
        correct = q.get('correct_option')
        time_taken = q.get('time_taken')

        is_correct = 1 if selected == correct else 0

        cursor.execute('''
            INSERT INTO test_results (student_id, subject, question_id, is_correct, time_taken)
            VALUES (?, ?, ?, ?, ?)
        ''', (student_id, subject, question_id, is_correct, time_taken))

    db.commit()

    return jsonify({"status": "success", "message": "Results saved!"})

@app.route('/analytics/<int:student_id>', methods=['GET'])
def get_analytics(student_id):
    db = get_db()
    cursor = db.cursor()

    # Total questions attempted
    cursor.execute('SELECT COUNT(*) FROM test_results WHERE student_id = ?', (student_id,))
    total = cursor.fetchone()[0]

    # Correct answers
    cursor.execute('SELECT COUNT(*) FROM test_results WHERE student_id = ? AND is_correct = 1', (student_id,))
    correct = cursor.fetchone()[0]

    # Average time
    cursor.execute('SELECT AVG(time_taken) FROM test_results WHERE student_id = ?', (student_id,))
    avg_time = cursor.fetchone()[0]

    # Subject-wise stats
    cursor.execute('''
        SELECT subject, COUNT(*) as total, SUM(is_correct) as correct
        FROM test_results
        WHERE student_id = ?
        GROUP BY subject
    ''', (student_id,))
    subject_stats = cursor.fetchall()

    subjects = []
    for row in subject_stats:
        subjects.append({
            'subject': row['subject'],
            'total': row['total'],
            'correct': row['correct'],
            'accuracy': round((row['correct'] / row['total']) * 100, 2)
        })

    # Overall accuracy
    accuracy = round((correct / total) * 100, 2) if total > 0 else 0

    return jsonify({
        'total_attempted': total,
        'correct_answers': correct,
        'accuracy': accuracy,
        'avg_time_per_question': round(avg_time, 2) if avg_time else 0,
        'subject_wise': subjects
    })

# ------------ Paste this below this comment ------------ #

from flask import render_template, redirect, url_for, flash

# ---------------- Signup Route ---------------- #
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email'].lower()
        password = request.form['password']
        confirm = request.form['confirmPassword']
        role = request.form['role']  # New line

        if password != confirm:
            flash('Passwords do not match!', 'error')
            return redirect('/signup')

        db = get_db()
        try:
            db.execute(
                "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
                (name, email, password, role)
            )
            db.commit()
            flash('Account created successfully! Please log in.', 'success')
            return redirect('/login')
        except sqlite3.IntegrityError:
            flash('Email already registered.', 'error')
            return redirect('/signup')

    return render_template('signup.html')


# ---------------- Login Route ---------------- #
from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('databases.db')  # Use your DB file name
    conn.row_factory = sqlite3.Row
    return conn

from flask import Flask, request, jsonify
from flask_cors import CORS
import traceback

app = Flask(__name__)
CORS(app)

def get_db_connection():
    import sqlite3
    conn = sqlite3.connect('your_database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.errorhandler(Exception)
def handle_exception(e):
    traceback.print_exc()
    return jsonify({'status': 'error', 'message': 'Internal server error'}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json(force=True)
        print("Received data:", data)

        if not data:
            return jsonify({'status': 'failure', 'message': 'Invalid JSON payload'}), 400

        email = data.get('email')
        password = data.get('password')
        role = data.get('role')

        if not email or not password or not role:
            return jsonify({'status': 'failure', 'message': 'Missing email, password, or role'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM users WHERE email = ? AND password = ? AND role = ?",
            (email, password, role)
        )
        user = cursor.fetchone()
        conn.close()

        if user:
            return jsonify({'status': 'success', 'redirect_url': '/home1.html'})
        else:
            return jsonify({'status': 'failure', 'message': 'Invalid credentials'}), 401

    except Exception:
        traceback.print_exc()
        return jsonify({'status': 'error', 'message': 'Internal server error'}), 500
  
# ---------------- Home1 Page ---------------- #
@app.route('/home1')
def home1():
    return render_template('home1.html')
# ---------------- Logout Route ---------------- #
@app.route('/logout')
def logout():
    session.clear()
    return redirect('/login')
@app.route('/')
def home():
    return "Flask server is running!"

# ---------------- Run the App ---------------- #
if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
