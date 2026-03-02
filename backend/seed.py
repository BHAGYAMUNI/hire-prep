import models
from database import SessionLocal, engine
from datetime import date

models.Base.metadata.create_all(bind=engine)


def seed_db():
    db = SessionLocal()

    # Check if data exists
    if db.query(models.Problem).count() > 0:
        print("Database already has some data. Adding missing data...")

    # ==================== DSA PROBLEMS ====================
    dsa_problems = [
        {
            "title": "Two Sum",
            "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
            "difficulty": "Easy",
            "tags": ["Array", "Hash Table"],
            "companies": ["Amazon", "Google", "TCS"],
            "sample_test_cases": [
                {
                    "input": "nums = [2,7,11,15], target = 9",
                    "output": "[0,1]",
                    "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1].",
                }
            ],
            "hidden_test_cases": [
                {"input": "nums = [3,2,4], target = 6", "output": "[1,2]"}
            ],
        },
        {
            "title": "Reverse String",
            "description": "Write a function that reverses a string. The input string is given as an array of characters s.",
            "difficulty": "Easy",
            "tags": ["String", "Two Pointers"],
            "companies": ["Adobe", "Cisco"],
            "sample_test_cases": [
                {
                    "input": "s = ['h','e','l','l','o']",
                    "output": "['o','l','l','e','h']",
                    "explanation": "",
                }
            ],
            "hidden_test_cases": [
                {
                    "input": "s = ['H','a','n','n','a','h']",
                    "output": "['h','a','n','n','a','H']",
                }
            ],
        },
        {
            "title": "Binary Search",
            "description": "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.",
            "difficulty": "Easy",
            "tags": ["Array", "Binary Search"],
            "companies": ["Microsoft", "Amazon"],
            "sample_test_cases": [
                {
                    "input": "nums = [-1,0,3,5,9,12], target = 9",
                    "output": "4",
                    "explanation": "9 exists in nums and its index is 4",
                }
            ],
            "hidden_test_cases": [
                {"input": "nums = [-1,0,3,5,9,12], target = 2", "output": "-1"}
            ],
        },
    ]

    # Add DSA problems
    for p in dsa_problems:
        existing = db.query(models.Problem).filter(models.Problem.title == p["title"]).first()
        if not existing:
            db_problem = models.Problem(**p)
            db.add(db_problem)

    # ==================== SQL CHAPTERS ====================
    sql_chapters = [
        {
            "title": "Basic SQL Queries",
            "content": "Learn fundamental SQL operations like SELECT, WHERE, ORDER BY, and GROUP BY.",
            "order": 1,
        },
        {
            "title": "Joins and Relationships",
            "content": "Master different types of joins: INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN.",
            "order": 2,
        },
        {
            "title": "Advanced SQL Functions",
            "content": "Explore aggregate functions, window functions, and complex subqueries.",
            "order": 3,
        },
    ]

    # Add SQL chapters
    sql_chapter_objects = []
    for chapter in sql_chapters:
        existing = db.query(models.SQLChapter).filter(models.SQLChapter.title == chapter["title"]).first()
        if not existing:
            db_chapter = models.SQLChapter(**chapter)
            db.add(db_chapter)
            db.flush()
            sql_chapter_objects.append(db_chapter)
        else:
            sql_chapter_objects.append(existing)

    # ==================== SQL PROBLEMS ====================
    sql_problems = [
        {
            "title": "Select All Customers",
            "description": "Write a query to select all customers from the customers table.",
            "difficulty": "Easy",
            "setup_sql": "CREATE TABLE customers (id INT, name VARCHAR(100), email VARCHAR(100)); INSERT INTO customers VALUES (1, 'John Doe', 'john@example.com'), (2, 'Jane Smith', 'jane@example.com');",
            "solution_sql": "SELECT * FROM customers;",
            "chapter_id": sql_chapter_objects[0].id if len(sql_chapter_objects) > 0 else 1,
        },
        {
            "title": "Count Employees by Department",
            "description": "Write a query to count the number of employees in each department.",
            "difficulty": "Medium",
            "setup_sql": "CREATE TABLE employees (id INT, name VARCHAR(100), department VARCHAR(50)); INSERT INTO employees VALUES (1, 'Alice', 'HR'), (2, 'Bob', 'IT'), (3, 'Charlie', 'IT');",
            "solution_sql": "SELECT department, COUNT(*) as employee_count FROM employees GROUP BY department;",
            "chapter_id": sql_chapter_objects[0].id if len(sql_chapter_objects) > 0 else 1,
        },
        {
            "title": "Join Customers and Orders",
            "description": "Write a query to get all customers with their orders using INNER JOIN.",
            "difficulty": "Medium",
            "setup_sql": "CREATE TABLE customers (id INT, name VARCHAR(100)); CREATE TABLE orders (id INT, customer_id INT, amount DECIMAL(10,2)); INSERT INTO customers VALUES (1, 'John'), (2, 'Jane'); INSERT INTO orders VALUES (1, 1, 100.00), (2, 1, 150.00);",
            "solution_sql": "SELECT c.name, o.amount FROM customers c INNER JOIN orders o ON c.id = o.customer_id;",
            "chapter_id": sql_chapter_objects[1].id if len(sql_chapter_objects) > 1 else 1,
        },
    ]

    # Add SQL problems
    for problem in sql_problems:
        existing = db.query(models.SQLProblem).filter(models.SQLProblem.title == problem["title"]).first()
        if not existing:
            db_problem = models.SQLProblem(**problem)
            db.add(db_problem)

    # ==================== APTITUDE CHAPTERS ====================
    aptitude_chapters = [
        {
            "title": "Logical Reasoning",
            "content": "Develop your logical thinking and problem-solving skills with various reasoning exercises.",
            "order": 1,
        },
        {
            "title": "Quantitative Aptitude",
            "content": "Master mathematical concepts including percentages, ratios, and basic arithmetic.",
            "order": 2,
        },
        {
            "title": "Verbal Ability",
            "content": "Improve your language skills, vocabulary, and reading comprehension.",
            "order": 3,
        },
    ]

    # Add Aptitude chapters
    aptitude_chapter_objects = []
    for chapter in aptitude_chapters:
        existing = db.query(models.AptitudeChapter).filter(models.AptitudeChapter.title == chapter["title"]).first()
        if not existing:
            db_chapter = models.AptitudeChapter(**chapter)
            db.add(db_chapter)
            db.flush()
            aptitude_chapter_objects.append(db_chapter)
        else:
            aptitude_chapter_objects.append(existing)

    # ==================== APTITUDE PROBLEMS ====================
    aptitude_problems = [
        {
            "title": "Number Series Pattern",
            "description": "Find the next number in the series: 2, 4, 8, 16, ?",
            "question_type": "MCQ",
            "difficulty": "Easy",
            "options": ["24", "32", "64", "128"],
            "correct_answer": "32",
            "explanation": "Each number is double the previous number (2×2=4, 4×2=8, 8×2=16, 16×2=32).",
            "time_limit": 30,
            "chapter_id": aptitude_chapter_objects[0].id if len(aptitude_chapter_objects) > 0 else 1,
        },
        {
            "title": "Percentage Calculation",
            "description": "What is 25% of 200?",
            "question_type": "NUMERICAL",
            "difficulty": "Easy",
            "options": [],
            "correct_answer": "50",
            "explanation": "25% of 200 = (25/100) × 200 = 0.25 × 200 = 50.",
            "time_limit": 45,
            "chapter_id": aptitude_chapter_objects[1].id if len(aptitude_chapter_objects) > 1 else 1,
        },
        {
            "title": "Logical Sequence",
            "description": "Arrange the following words in logical order: Seed, Plant, Tree, Fruit",
            "question_type": "MCQ",
            "difficulty": "Medium",
            "options": ["Seed, Plant, Tree, Fruit", "Plant, Seed, Tree, Fruit", "Seed, Tree, Plant, Fruit", "Fruit, Seed, Plant, Tree"],
            "correct_answer": "Seed, Plant, Tree, Fruit",
            "explanation": "The natural growth cycle is: Seed → Plant → Tree → Fruit.",
            "time_limit": 60,
            "chapter_id": aptitude_chapter_objects[0].id if len(aptitude_chapter_objects) > 0 else 1,
        },
        {
            "title": "Ratio Problem",
            "description": "If the ratio of boys to girls in a class is 3:2 and there are 30 boys, how many girls are there?",
            "question_type": "MCQ",
            "difficulty": "Medium",
            "options": ["15", "20", "25", "30"],
            "correct_answer": "20",
            "explanation": "3:2 ratio means for every 3 boys, there are 2 girls. If 3 parts = 30 boys, then 1 part = 10, so 2 parts = 20 girls.",
            "time_limit": 60,
            "chapter_id": aptitude_chapter_objects[1].id if len(aptitude_chapter_objects) > 1 else 1,
        },
        {
            "title": "Word Analogy",
            "description": "Doctor is to Hospital as Teacher is to ?",
            "question_type": "MCQ",
            "difficulty": "Easy",
            "options": ["School", "Library", "Office", "Home"],
            "correct_answer": "School",
            "explanation": "A doctor works in a hospital, similarly a teacher works in a school.",
            "time_limit": 30,
            "chapter_id": aptitude_chapter_objects[2].id if len(aptitude_chapter_objects) > 2 else 1,
        },
    ]

    # Add Aptitude problems
    for problem in aptitude_problems:
        existing = db.query(models.AptitudeProblem).filter(models.AptitudeProblem.title == problem["title"]).first()
        if not existing:
            db_problem = models.AptitudeProblem(**problem)
            db.add(db_problem)

    db.commit()
    
    # Print summary
    dsa_count = db.query(models.Problem).count()
    sql_chapter_count = db.query(models.SQLChapter).count()
    sql_problem_count = db.query(models.SQLProblem).count()
    aptitude_chapter_count = db.query(models.AptitudeChapter).count()
    aptitude_problem_count = db.query(models.AptitudeProblem).count()
    
    print("✅ Database seeded successfully!")
    print(f"📊 Summary:")
    print(f"   DSA Problems: {dsa_count}")
    print(f"   SQL Chapters: {sql_chapter_count}")
    print(f"   SQL Problems: {sql_problem_count}")
    print(f"   Aptitude Chapters: {aptitude_chapter_count}")
    print(f"   Aptitude Problems: {aptitude_problem_count}")
    print(f"🎉 All data restored!")
    
    db.close()


if __name__ == "__main__":
    seed_db()
