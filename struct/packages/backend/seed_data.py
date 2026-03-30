"""
Seed script to populate the database with sample data.
Run this after starting the backend to have test data available.

Usage:
    python seed_data.py
"""

import os
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models import User, Test, Question, Material
from app.utils.auth import get_password_hash


def seed_database():
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Check if already seeded
        if db.query(User).first():
            print("Database already has data. Skipping seed.")
            return
        
        # Create admin user
        admin = User(
            name="Admin User",
            email="admin@gatexpress.com",
            password_hash=get_password_hash("admin123"),
            role="admin"
        )
        db.add(admin)
        
        # Create student user
        student = User(
            name="Test Student",
            email="student@gatexpress.com",
            password_hash=get_password_hash("student123"),
            role="student"
        )
        db.add(student)
        db.commit()
        
        print(f"Created admin user: admin@gatexpress.com / admin123")
        print(f"Created student user: student@gatexpress.com / student123")
        
        # Create sample tests
        test1 = Test(
            title="GATE CS - Data Structures",
            subject="Computer Science",
            duration_minutes=30,
            created_by=admin.id
        )
        db.add(test1)
        
        test2 = Test(
            title="GATE CS - Algorithms",
            subject="Computer Science",
            duration_minutes=45,
            created_by=admin.id
        )
        db.add(test2)
        
        test3 = Test(
            title="General Aptitude Practice",
            subject="General Aptitude",
            duration_minutes=20,
            created_by=admin.id
        )
        db.add(test3)
        db.commit()
        
        print(f"Created {3} sample tests")
        
        # Add questions to test1
        questions_data = [
            {
                "question": "What is the time complexity of binary search?",
                "option1": "O(n)",
                "option2": "O(log n)",
                "option3": "O(n^2)",
                "option4": "O(1)",
                "answer": 2
            },
            {
                "question": "Which data structure uses LIFO principle?",
                "option1": "Queue",
                "option2": "Array",
                "option3": "Stack",
                "option4": "Linked List",
                "answer": 3
            },
            {
                "question": "The worst case time complexity of quicksort is:",
                "option1": "O(n log n)",
                "option2": "O(n)",
                "option3": "O(n^2)",
                "option4": "O(log n)",
                "answer": 3
            },
            {
                "question": "Which traversal of BST gives sorted output?",
                "option1": "Preorder",
                "option2": "Postorder",
                "option3": "Inorder",
                "option4": "Level order",
                "answer": 3
            },
            {
                "question": "The height of a complete binary tree with n nodes is:",
                "option1": "O(n)",
                "option2": "O(log n)",
                "option3": "O(n^2)",
                "option4": "O(1)",
                "answer": 2
            }
        ]
        
        for q_data in questions_data:
            q = Question(test_id=test1.id, **q_data)
            db.add(q)
        
        # Add questions to test2
        algo_questions = [
            {
                "question": "Which algorithm is used to find shortest path in weighted graph?",
                "option1": "BFS",
                "option2": "DFS",
                "option3": "Dijkstra",
                "option4": "Binary Search",
                "answer": 3
            },
            {
                "question": "What is the time complexity of merge sort?",
                "option1": "O(n)",
                "option2": "O(n log n)",
                "option3": "O(n^2)",
                "option4": "O(log n)",
                "answer": 2
            },
            {
                "question": "Dynamic programming is based on:",
                "option1": "Divide and conquer",
                "option2": "Greedy approach",
                "option3": "Optimal substructure",
                "option4": "Brute force",
                "answer": 3
            }
        ]
        
        for q_data in algo_questions:
            q = Question(test_id=test2.id, **q_data)
            db.add(q)
        
        # Add questions to test3
        aptitude_questions = [
            {
                "question": "If 2x + 3 = 9, what is x?",
                "option1": "2",
                "option2": "3",
                "option3": "4",
                "option4": "5",
                "answer": 2
            },
            {
                "question": "Which word is the antonym of 'abundant'?",
                "option1": "Plentiful",
                "option2": "Scarce",
                "option3": "Ample",
                "option4": "Sufficient",
                "answer": 2
            }
        ]
        
        for q_data in aptitude_questions:
            q = Question(test_id=test3.id, **q_data)
            db.add(q)
        
        db.commit()
        print(f"Added questions to all tests")
        
        print("\n✅ Database seeded successfully!")
        print("\nYou can now login with:")
        print("  Admin: admin@gatexpress.com / admin123")
        print("  Student: student@gatexpress.com / student123")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
