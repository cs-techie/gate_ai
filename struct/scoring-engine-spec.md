# Scoring Engine Specification

This document specifies how tests are scored in GATEXpress AI, including tie-break rules and edge cases.

## 1. Scoring Rules (MVP)

- Each question is worth 1 mark by default.
- Correct answer: +1
- Incorrect answer: 0 (no negative marking in MVP)
- Unanswered: 0
- Total score = sum(correct answers)

## 2. Inputs and Outputs

Input:
- user_id
- test_id
- answers: [{ question_id, answer }]
- time_taken (seconds)

Output:
- score (int)
- total_questions (int)
- percent (float)

## 3. Edge Cases

- Duplicate answers for same question: take the latest submission for that question.
- Missing question IDs: ignore them and calculate score from provided answers; log warning.
- Partially answered payloads: accept but mark unanswered questions as 0.

## 4. Concurrency and Idempotency

- Submissions must be idempotent per user/test attempt id. If backend receives same payload twice, ensure duplicate records are not created.
- Use a unique attempt identifier or enforce database uniqueness (user_id, test_id, attempt_timestamp) to prevent duplicates.

## 5. Performance

- Scoring should be computed synchronously when result is posted for MVP; compute in-memory and persist.
- For large tests, compute streaming or background task (future).

## 6. Audit and Logging

- Log scoring events with user_id, test_id, score, and time_taken for analytics and debugging.

## 7. Future Extensions

- Negative marking per test configuration
- Weighted questions (different marks per question)
- Section-wise scoring and partial credit

---

Last updated: 2026-03-01
