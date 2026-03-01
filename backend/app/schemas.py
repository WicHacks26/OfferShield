from pydantic import BaseModel

class OfferInput(BaseModel):
    name: str
    role: str
    industry: str
    location: str
    base_salary: float
    bonus: float
    equity: float
    loan: float
    monthly_expenses: float
    savings: float
    emergency_months: int
    equity_gap: bool
    career_break_years: int
    generate_negotiation: bool
    voice_mode: bool