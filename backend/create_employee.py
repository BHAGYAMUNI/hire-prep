#!/usr/bin/env python3
"""
Script to create a default employee user
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal, engine
from models import Employee
from crud import get_password_hash

def create_default_employee():
    db = SessionLocal()
    
    try:
        # Check if employee already exists
        existing_employee = db.query(Employee).filter(Employee.username == "admin").first()
        if existing_employee:
            print("Employee 'admin' already exists!")
            return
        
        # Create default employee
        default_password = "admin123"
        hashed_password = get_password_hash(default_password)
        
        employee = Employee(
            username="admin",
            email="admin@hireprep.com",
            name="System Administrator",
            hashed_password=hashed_password
        )
        
        db.add(employee)
        db.commit()
        db.refresh(employee)
        
        print(f"✅ Default employee created successfully!")
        print(f"📋 Login Credentials:")
        print(f"   Username: admin")
        print(f"   Password: {default_password}")
        print(f"   Email: admin@hireprep.com")
        print(f"🔐 Please change the password after first login!")
        
    except Exception as e:
        print(f"❌ Error creating employee: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_default_employee()
