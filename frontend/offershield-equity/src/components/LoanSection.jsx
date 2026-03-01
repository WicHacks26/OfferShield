import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

// ---------- Helpers ----------
function clampNumber(n, min, max) {
  const x = Number(n);
  if (Number.isNaN(x)) return min;
  return Math.max(min, Math.min(max, x));
}

function formatMoney(n) {
  return Number(n).toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });
}

// Simple amortization schedule
function buildSchedule({ principal, apr, months, monthlyPayment }) {
  const r = apr / 12 / 100;
  let balance = principal;

  const rows = [];

  for (let m = 1; m <= months; m++) {
    const interest = balance * r;
    const principalPaid = Math.max(0, monthlyPayment - interest);

    balance = Math.max(0, balance - principalPaid);

    rows.push({
      month: m,
      balance: Math.round(balance),
      interestPaid: Math.round(interest),
      principalPaid: Math.round(principalPaid),
    });

    if (balance <= 0) break;
  }

  return rows;
}

// ---------- Component ----------
export default function LoanSection({ defaultSalary = 100000 }) {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [years, setYears] = useState(3);
  const [salary, setSalary] = useState(defaultSalary);
  const [apr, setApr] = useState(7);

  // Payment rule: 20% of take-home estimate
  const monthlyPayment = useMemo(() => {
    const monthlyGross = Number(salary) / 12;
    const takeHome = monthlyGross * 0.7;
    return Math.round(takeHome * 0.2);
  }, [salary]);

  const months = clampNumber(Number(years) * 12, 1, 600);

  const data = useMemo(() => {
    const principal = clampNumber(loanAmount, 0, 10_000_000);

    const schedule = buildSchedule({
      principal,
      apr: clampNumber(apr, 0, 50),
      months,
      monthlyPayment: clampNumber(monthlyPayment, 1, 1_000_000),
    });

    return [
      { month: 0, balance: principal, interestPaid: 0, principalPaid: 0 },
      ...schedule,
    ];
  }, [loanAmount, apr, months, monthlyPayment]);

  const principal = clampNumber(loanAmount, 0, 10_000_000);
  const last = data[data.length - 1] || { balance: principal };

  const payoffMonth = data.findIndex((d) => d.balance === 0);

  const payoffText =
    payoffMonth > 0
      ? `Estimated payoff: month ${payoffMonth} (~${Math.ceil(
          payoffMonth / 12
        )} yr)`
      : "Not paid off within timeframe";

  return (
    <div style={{ padding: 20 }}>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>Loan planner</div>
          <div style={{ opacity: 0.8, marginTop: 4 }}>
            Enter loan details and see a month-by-month timeline of your
            remaining balance.
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            Monthly payment (auto)
          </div>

          <div style={{ fontSize: 22, fontWeight: 800 }}>
            ${formatMoney(monthlyPayment)}
          </div>

          <div style={{ fontSize: 12, opacity: 0.8 }}>{payoffText}</div>
        </div>
      </div>

      {/* Inputs */}
      <div
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(180px, 1fr))",
          gap: 12,
        }}
      >
        <label>
          <div style={{ fontSize: 13, marginBottom: 4 }}>Loan amount ($)</div>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </label>

        <label>
          <div style={{ fontSize: 13, marginBottom: 4 }}>
            Time period (years)
          </div>
          <input
            type="number"
            value={years}
            min={1}
            max={50}
            onChange={(e) => setYears(e.target.value)}
          />
        </label>

        <label>
          <div style={{ fontSize: 13, marginBottom: 4 }}>Salary ($/yr)</div>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </label>

        <label>
          <div style={{ fontSize: 13, marginBottom: 4 }}>APR (%)</div>
          <input
            type="number"
            step="0.1"
            value={apr}
            onChange={(e) => setApr(e.target.value)}
          />
        </label>
      </div>

      {/* Chart */}
      <div style={{ marginTop: 25 }}>
        <div
          style={{
            height: 280,
            padding: 10,
            borderRadius: 16,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.25} />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${formatMoney(v)}`}
              />

              <Tooltip
                labelFormatter={(m) => `Month ${m}`}
                formatter={(value, name) => {
                  const label =
                    name === "balance"
                      ? "Balance"
                      : name === "interestPaid"
                      ? "Interest (mo)"
                      : "Principal (mo)";

                  return [`$${formatMoney(Number(value))}`, label];
                }}
              />

              <Legend />

              <Line
                type="monotone"
                dataKey="balance"
                dot={false}
                strokeWidth={2}
              />

              <Line
                type="monotone"
                dataKey="principalPaid"
                dot={false}
                strokeWidth={1}
              />

              <Line
                type="monotone"
                dataKey="interestPaid"
                dot={false}
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ marginTop: 10, fontSize: 12, opacity: 0.85 }}>
          Tip: This is an estimate. Actual payoff depends on lender compounding,
          fees, and real payment schedules.
        </div>
      </div>
    </div>
  );
}