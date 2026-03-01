import json
import re
from google import genai
from app.config import GEMINI_API_KEY, MODEL_NAME


def generate_financial_analysis(data, annual_income, risk_score):

    try:
        client = genai.Client(api_key=GEMINI_API_KEY)

        prompt = f"""
You are a US financial advisor.

Return STRICT JSON ONLY.

User Details:
Name: {data.name}
Role: {data.role}
Industry: {data.industry}
Location: {data.location}
Base Salary: {data.base_salary}
Bonus: {data.bonus}
Equity: {data.equity}
Total Compensation: {annual_income}
Loan: {data.loan}
Monthly Expenses: {data.monthly_expenses}
Savings: {data.savings}
Risk Score: {risk_score}

Return format:
{{
 "federal_tax": 0,
 "state_tax": 0,
 "equity_analysis": "",
 "career_analysis": "",
 "advice": "",
 "negotiation_script": null,
 "voice_script": null
}}
"""

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )

        match = re.search(r"\{.*\}", response.text, re.DOTALL)

        if match:
            return match.group(0)

        raise Exception("Invalid Gemini response format")

    except Exception as e:
        print("Gemini Error:", e)

        return json.dumps({
            "federal_tax": 0,
            "state_tax": 0,
            "equity_analysis": "AI service error",
            "career_analysis": "AI service error",
            "advice": "AI service error",
            "negotiation_script": None,
            "voice_script": None
        })