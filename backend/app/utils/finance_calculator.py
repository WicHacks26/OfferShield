def calculate_fica(base_salary: float):
    # 2026 SS Cap: $184,500. Rate: 6.2% SS + 1.45% Medicare
    ss_taxable = min(base_salary, 184500)
    return (ss_taxable * 0.062) + (base_salary * 0.0145)

def calculate_federal_tax(taxable_income: float):
    # 2026 Single Brackets (OBBBA Adjusted)
    brackets = [
        (12400, 0.10), (50400, 0.12), (105700, 0.22), 
        (201775, 0.24), (256225, 0.32), (640600, 0.35), (float('inf'), 0.37)
    ]
    tax, prev = 0, 0
    for limit, rate in brackets:
        if taxable_income > prev:
            taxable_in_bracket = min(taxable_income, limit) - prev
            tax += taxable_in_bracket * rate
            prev = limit
    return tax

def calculate_state_tax(location: str, income: float):
    loc = location.lower()
    if any(x in loc for x in ["miami", "fl", "texas", "wa"]): return 0.0
    if "boston" in loc or "ma" in loc: return income * 0.05
    return income * 0.05 # Default fallback

def calculate_risk_score(loan, income, savings, emergency_goal, equity_gap):
    score = 40
    if income > 0 and (loan / income) > 0.4: score += 20
    if savings < emergency_goal: score += 25
    if equity_gap: score += 15
    return min(score, 100)