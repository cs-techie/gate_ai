from typing import List
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models import Result, Question, Test
from app.schemas import ResultCreate


# ------------------------------------------------------------------
# GATE 2026 Marking Engine
# ------------------------------------------------------------------

def _parse_nat_answer(s: str) -> float | None:
    try:
        return float(s.strip())
    except Exception:
        return None


def _score_question(q: Question, submitted: str) -> tuple[float, float, str]:
    """
    Returns (marks_earned, negative_applied, verdict)
    verdict: 'correct' | 'wrong' | 'unattempted'
    """
    if not submitted or submitted.strip() == "":
        return 0.0, 0.0, "unattempted"

    qtype = (q.question_type or "MCQ").upper()
    marks = q.marks or 1
    correct_ans = (q.answer or "").strip()

    if qtype == "MCQ":
        if submitted.strip() == correct_ans:
            return float(marks), 0.0, "correct"
        else:
            neg = round(marks / 3, 4)
            return -neg, neg, "wrong"

    elif qtype == "MSQ":
        # Exact match only — order-independent
        submitted_set = set(s.strip() for s in submitted.split(",") if s.strip())
        correct_set = set(s.strip() for s in correct_ans.split(",") if s.strip())
        if submitted_set == correct_set:
            return float(marks), 0.0, "correct"
        else:
            return 0.0, 0.0, "wrong"

    elif qtype == "NAT":
        sub_val = _parse_nat_answer(submitted)
        cor_val = _parse_nat_answer(correct_ans)
        if sub_val is not None and cor_val is not None and abs(sub_val - cor_val) < 1e-6:
            return float(marks), 0.0, "correct"
        else:
            return 0.0, 0.0, "wrong"

    # Fallback: treat as MCQ
    if submitted.strip() == correct_ans:
        return float(marks), 0.0, "correct"
    neg = round(marks / 3, 4)
    return -neg, neg, "wrong"


def calculate_gate_score(db: Session, test_id: int, answers: List) -> dict:
    """Full GATE scoring — returns detailed breakdown dict"""
    questions = db.query(Question).filter(Question.test_id == test_id).all()
    if not questions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No questions found for this test"
        )

    answer_map = {a.question_id: a.answer for a in answers}

    total_score = 0.0
    total_negative = 0.0
    correct_count = 0
    wrong_count = 0
    unattempted_count = 0

    section_scores = {"GA": 0.0, "Mathematics": 0.0, "Subject": 0.0}
    total_marks = sum(q.marks for q in questions)

    for q in questions:
        submitted = answer_map.get(q.id, "")
        earned, neg, verdict = _score_question(q, submitted)

        total_score += earned
        total_negative += neg

        section = q.section or "Subject"
        # normalise key
        if section.upper() == "GA":
            section_scores["GA"] += earned
        elif "MATH" in section.upper():
            section_scores["Mathematics"] += earned
        else:
            section_scores["Subject"] += earned

        if verdict == "correct":
            correct_count += 1
        elif verdict == "wrong":
            wrong_count += 1
        else:
            unattempted_count += 1

    return {
        "score": round(total_score, 2),
        "total": total_marks,
        "negative_marks": round(total_negative, 2),
        "correct_count": correct_count,
        "wrong_count": wrong_count,
        "unattempted_count": unattempted_count,
        "ga_score": round(section_scores["GA"], 2),
        "math_score": round(section_scores["Mathematics"], 2),
        "subject_score": round(section_scores["Subject"], 2),
    }


def submit_test(db: Session, user_id: int, result_data: ResultCreate) -> Result:
    """Submit test answers and persist GATE result"""
    test = db.query(Test).filter(Test.id == result_data.test_id).first()
    if not test:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Test not found")

    breakdown = calculate_gate_score(db, result_data.test_id, result_data.answers)

    result = Result(
        user_id=user_id,
        test_id=result_data.test_id,
        score=breakdown["score"],
        total=breakdown["total"],
        negative_marks=breakdown["negative_marks"],
        correct_count=breakdown["correct_count"],
        wrong_count=breakdown["wrong_count"],
        unattempted_count=breakdown["unattempted_count"],
        ga_score=breakdown["ga_score"],
        math_score=breakdown["math_score"],
        subject_score=breakdown["subject_score"],
        time_taken=result_data.time_taken,
    )
    db.add(result)
    db.commit()
    db.refresh(result)
    return result


def get_user_results(db: Session, user_id: int) -> List[Result]:
    return db.query(Result).filter(Result.user_id == user_id).order_by(Result.taken_at.desc()).all()


def get_result_by_id(db: Session, result_id: int) -> Result:
    result = db.query(Result).filter(Result.id == result_id).first()
    if not result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Result not found")
    return result


def get_all_results(db: Session, skip: int = 0, limit: int = 100) -> List[Result]:
    return db.query(Result).order_by(Result.taken_at.desc()).offset(skip).limit(limit).all()
