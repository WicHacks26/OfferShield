# backend/app/schemas.py
from pydantic import BaseModel
from typing import Optional

class OfferInput(BaseModel):
    # Fields coming from React
    name: str
    role: str
    industry: str
    location: str
    base_salary: float
    bonus: float
    equity: float
    monthly_expenses: float
    savings: float
    equity_gap: bool
    
    # Fields that might be missing from the frontend 
    # We give them default values so the backend doesn't crash
    loan: float = 0.0  
    pronouns: str = "they/them"
    emergency_months: int = 6
    career_break_years: int = 0
    generate_negotiation: bool = True
    voice_mode: bool = True