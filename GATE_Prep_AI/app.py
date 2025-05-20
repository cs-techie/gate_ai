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

# ---------------- Run the App ---------------- #
if __name__ == '__main__':
    app.run(debug=True)
