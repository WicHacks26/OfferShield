from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import OfferInput
from utils.finance_calculator import (
    calculate_fica, calculate_federal_tax, 
    calculate_state_tax, calculate_risk_score
)
from services.gemini_service import generate_financial_analysis
from services.voice_service import generate_voiceover # Import new service

app = FastAPI()

# Enable CORS so the React app can reach the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
        0.0,  #data.loan, # loan not in her current form, defaulting to 0
        total_comp, data.savings, emergency_goal, data.equity_gap
    )

    # 4. AI Insight (Pass the risk_score VARIABLE, not from data object)
    gemini_data = generate_financial_analysis(
        data, total_comp, fed_tax, state_tax, fica_tax, risk_score
    )

    # 5. Voice Generation (New!)
    audio_data = None
    if data.voice_mode and "error" not in gemini_data:
        # We use the "bottom_line" script from Gemini for the voiceover
        voice_text = gemini_data.get("voice_scripts", {}).get("the_bottom_line", "")
        if voice_text:
            audio_data = generate_voiceover(voice_text)

    return {
        "summary": {"total_comp": total_comp, "risk_score": risk_score},
        "taxes": {"federal": fed_tax, "state": state_tax, "fica": fica_tax},
        "ai_insights": gemini_data,
        "audio_base64": audio_data
    }