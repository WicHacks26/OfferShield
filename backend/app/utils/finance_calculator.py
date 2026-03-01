def calculate_fica(base_salary: float):
    return base_salary * 0.0765


def calculate_total_comp(base_salary, bonus, equity):
    return base_salary + bonus + equity


def calculate_emergency_needed(monthly_expenses):
    return monthly_expenses * 6


def calculate_risk_score(
    loan,
    annual_income,
    savings,
    emergency_needed,
    equity_gap,
    career_break_years
):
    score = 50  # base score

    loan_ratio = loan / annual_income if annual_income else 0

    if loan_ratio > 0.5:
        score += 15
    elif loan_ratio > 0.3:
        score += 8

    if savings < emergency_needed:
        score += 15

    if equity_gap:
        score += 5

    if career_break_years > 0:
        score += 5

    return min(score, 100)