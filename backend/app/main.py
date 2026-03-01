from fastapi import FastAPI
from app.schemas import OfferInput
from app.utils.finance_calculator import (
    calculate_fica,
    calculate_total_comp,
    calculate_emergency_needed,
    calculate_risk_score
)
from app.services.gemini_service import generate_financial_analysis
import json

app = FastAPI()


@app.post("/analyze-offer")
def analyze_offer(data: OfferInput):

    total_comp = calculate_total_comp(
        data.base_salary,
        data.bonus,
        data.equity
    )

    fica = calculate_fica(data.base_salary)

    emergency_needed = calculate_emergency_needed(data.monthly_expenses)

    risk_score = calculate_risk_score(
        data.loan,
        total_comp,
        data.savings,
        emergency_needed,
        data.equity_gap,
        data.career_break_years
    )

    gemini_raw = generate_financial_analysis(
        data,
        total_comp,
        risk_score
    )

    gemini_data = json.loads(gemini_raw)

    total_tax = (
        gemini_data["federal_tax"]
        + gemini_data["state_tax"]
        + fica
    )

    annual_net = total_comp - total_tax
    monthly_net = annual_net / 12

    risk_level = (
        "Low" if risk_score < 40
        else "Medium" if risk_score < 70
        else "High"
    )

    return {
        "financial_summary": {
            "total_compensation": total_comp,
            "annual_net_estimate": annual_net,
            "monthly_net_estimate": monthly_net,
            "fica": fica,
            "total_tax": total_tax,
            "risk_score": risk_score,
            "risk_level": risk_level
        },
        "equity_analysis": gemini_data["equity_analysis"],
        "career_analysis": gemini_data["career_analysis"],
        "advice": gemini_data["advice"],
        "negotiation_script": gemini_data["negotiation_script"],
        "voice_script": gemini_data["voice_script"]
    }