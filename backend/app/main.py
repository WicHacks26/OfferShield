from fastapi import FastAPI
from app.schemas import OfferInput
from app.utils.finance_calculator import (
    calculate_fica, calculate_federal_tax, 
    calculate_state_tax, calculate_risk_score
)
from app.services.gemini_service import generate_financial_analysis

app = FastAPI()

@app.post("/analyze-offer")
async def analyze_offer(data: OfferInput):
    # 1. Math
    total_comp = data.base_salary + data.bonus + data.equity
    emergency_goal = data.monthly_expenses * data.emergency_months
    
    # 2. 2026 Taxes (Standard Deduction $16,100)
    fed_tax = calculate_federal_tax(max(0, total_comp - 16100))
    state_tax = calculate_state_tax(data.location, total_comp)
    fica_tax = calculate_fica(data.base_salary)
    
    # 3. Risk Calculation
    risk_score = calculate_risk_score(
        data.loan, total_comp, data.savings, emergency_goal, data.equity_gap
    )

    # 4. AI Insight (Pass the risk_score VARIABLE, not from data object)
    gemini_data = generate_financial_analysis(
        data, total_comp, fed_tax, state_tax, fica_tax, risk_score
    )

    return {
        "summary": {"total_comp": total_comp, "risk_score": risk_score},
        "taxes": {"federal": fed_tax, "state": state_tax, "fica": fica_tax},
        "ai_insights": gemini_data
    }