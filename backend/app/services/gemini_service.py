import json
from google import genai
from config import GEMINI_API_KEY, MODEL_NAME

def generate_financial_analysis(data, total_comp, fed_tax, state_tax, fica_tax, risk_score):
    client = genai.Client(api_key=GEMINI_API_KEY)
    
    # We pass the calculated variables directly into the prompt
    prompt = f"""
    ROLE: Executive Financial Advisor (March 2026 Edition).
    
    CANDIDATE PROFILE:
    - Name: {data.name} | Role: {data.role}
    - Location: {data.location}
    - Gross Salary: ${data.base_salary:,.2f} | Bonus: ${data.bonus:,.2f} | Equity: ${data.equity:,.2f}
    - Debt: ${data.loan:,.2f} | Savings: ${data.savings:,.2f}
    - Monthly Expenses (User's Current): ${data.monthly_expenses:,.2f}

    ANALYSIS REQUIREMENTS:
    1. 2026 STATE TAX: Calculate the exact 2026 state income tax for {data.location}. 
       (e.g., Florida/Texas: 0%, Massachusetts: 5% + 4% surtax over $1.1M, California: up to 13.3%).
    2. LOCAL COST OF LIVING (COL): Research March 2026 costs for {data.location} regarding:
       - Housing: High-end 1-BR apartment in a professional area.
       - Food/Grocery: Professional-grade monthly grocery and dining budget.
       - Travel: Local transit passes, gas prices, and toll estimates.
    3. PROFITABILITY: Will they save more or less money than their current ${data.savings:,.2f} baseline?

    JSON FORMAT:
    {{
      "tax_profile": {{
        "state_tax_rate": "string",
        "estimated_annual_state_tax": "number",
        "take_home_monthly": "number"
      }},
      "future_lifestyle_costs": {{
        "housing": "string",
        "groceries_and_dining": "string",
        "transportation": "string",
        "total_estimated_monthly_spend": "number"
      }},
      "wealth_projection": {{
        "monthly_net_savings": "Monthly take-home minus debt and all lifestyle costs.",
        "one_year_savings_growth": "Total expected savings after 12 months.",
        "profitability_verdict": "Formal Yes/No"
      }},
      "negotiation_suite": {{
        "negotiation_required": "true",
        "reasoning": "Brief formal explanation of why a counter-offer is necessary based on 2026 COL data.",
        "formal_counter_email": "A high-level professional email requesting a 'Cost of Living Adjustment' or 'Equity Refresh' if negotiation_required is true.",
        "verbal_talking_points": ["Point 1", "Point 2", "Point 3"]
      }},
      "voice_scripts": {{
        "tax_and_cost_logic": "45-second script explaining why {data.location} is or isn't tax-efficient.",
        "the_bottom_line": "60-second script on if they will be richer or poorer after moving."
      }}
    }}
    """

    for attempt in range(3): # Try up to 3 times
        try:
            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=prompt,
                config={'response_mime_type': 'application/json'}
            )
            return json.loads(response.text)
            
        except Exception as e:
            if "RESOURCE_EXHAUSTED" in str(e):
                print(f"Quota hit. Retrying in 20 seconds... (Attempt {attempt + 1})")
                time.sleep(20) # Wait for the window to reset
            else:
                print(f"Permanent Error: {e}")
                break
                
    return {"error": "AI Quota exceeded. Please try again in a minute."}