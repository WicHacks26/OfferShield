// import React, { useMemo, useState } from "react";

// export default function AnalysisPanel({ form }) {
//   const [chartTab, setChartTab] = useState("runway"); // runway | comp | compare
//   const [isNegotiationOpen, setIsNegotiationOpen] = useState(true);

//   const metrics = useMemo(() => computeDummyMetrics(form), [form]);
//   const draft = useMemo(() => makeDraft(form, metrics), [form, metrics]);

//   async function copyDraft() {
//     try {
//       await navigator.clipboard.writeText(draft);
//     } catch {
//       // fallback: do nothing (UI-only)
//     }
//   }

//   return (
//     <section className="glassPanel">
//       <div className="panelHeaderRow">
//         <div>
//           <div className="panelTitle">Analysis (dummy)</div>
//           <div className="panelSubtle">This will be real later</div>
//         </div>

//         <div className="pillRow">
//           <span className="pill">
//             Risk tier: <b>{metrics.riskTier}</b>
//           </span>
//           <span className="pill">
//             Safety score: <b>{metrics.safetyScore}/100</b>
//           </span>
//         </div>
//       </div>

//       {/* Top stats */}
//       <div className="statGrid">
//         <StatCard label="Annual total" value={fmtMoney(metrics.annualTotal)} />
//         <StatCard label="Take-home / month" value={fmtMoney(metrics.takeHomeMonthly)} />
//         <StatCard label="Runway" value={`${metrics.runwayMonths} mo`} />
//         <StatCard label="Equity mode" value={form.equity_gap ? "ON" : "OFF"} />
//       </div>

//       {/* Charts (clean) */}
//       <div className="cardSection">
//         <div className="cardHeaderRow">
//           <div className="cardTitle">Charts</div>
//           <Segmented
//             value={chartTab}
//             onChange={setChartTab}
//             options={[
//               { value: "runway", label: "Runway" },
//               { value: "comp", label: "Comp" },
//               { value: "compare", label: "Compare" },
//             ]}
//           />
//         </div>

//         <div className="chartShell">
//           <div className="chartCaption">
//             {chartTab === "runway" && "Runway vs. monthly expenses (placeholder)"}
//             {chartTab === "comp" && "Comp breakdown (placeholder)"}
//             {chartTab === "compare" && "Compare two offers (placeholder)"}
//           </div>

//           <FakeChart tab={chartTab} metrics={metrics} />
//         </div>

//         <div className="smallHint">
//           Later: swap this with Recharts/Chart.js (or Highcharts if you really want enterprise-style charts).
//         </div>
//       </div>

//       {/* Negotiation (collapsible + copy) */}
//       <div className="cardSection">
//         <div className="cardHeaderRow">
//           <div className="cardTitle">Negotiation draft</div>
//           <div className="cardHeaderActions">
//             <button className="ghostBtn" onClick={() => setIsNegotiationOpen((v) => !v)}>
//               {isNegotiationOpen ? "Collapse" : "Expand"}
//             </button>
//             <button className="primaryBtn" onClick={copyDraft}>
//               Copy
//             </button>
//           </div>
//         </div>

//         <div className="smallHint">
//           Clean preview now; later generate this from Gemini/OpenAI using the form values.
//         </div>

//         {isNegotiationOpen ? (
//           <pre className="monoBox">{draft}</pre>
//         ) : (
//           <div className="collapsedPreview">
//             Hi [Recruiter Name] — I’m excited about the role. Based on scope + market, is there
//             flexibility on base or equity/bonus…
//           </div>
//         )}
//       </div>

//       {/* Voice coach (small + clean) */}
//       <div className="cardSection">
//         <div className="cardHeaderRow">
//           <div className="cardTitle">Voice coach</div>
//           <span className="pill mutedPill">UI-only</span>
//         </div>

//         <div className="voiceRow">
//           <button className="primaryBtn" type="button">
//             Play
//           </button>
//           <div className="progressTrack" aria-hidden="true">
//             <div className="progressFill" style={{ width: "38%" }} />
//           </div>
//           <div className="timeText">0:14</div>
//         </div>

//         <div className="transcriptBox">
//           <div className="transcriptLabel">Transcript</div>
//           <div className="transcriptText">
//             Your estimated runway is <b>{metrics.runwayMonths} months</b>. Safety score is{" "}
//             <b>{metrics.safetyScore}/100</b>. Next step: consider negotiating base or equity to
//             improve stability.
//           </div>
//         </div>

//         <div className="smallHint">
//           Later: plug ElevenLabs TTS here and stream audio, keep transcript short and scannable.
//         </div>
//       </div>
//     </section>
//   );
// }

// function StatCard({ label, value }) {
//   return (
//     <div className="statCard">
//       <div className="statLabel">{label}</div>
//       <div className="statValue">{value}</div>
//     </div>
//   );
// }

// function Segmented({ value, onChange, options }) {
//   return (
//     <div className="segmented">
//       {options.map((o) => (
//         <button
//           key={o.value}
//           type="button"
//           className={value === o.value ? "segBtn active" : "segBtn"}
//           onClick={() => onChange(o.value)}
//         >
//           {o.label}
//         </button>
//       ))}
//     </div>
//   );
// }

// function FakeChart({ tab, metrics }) {
//   // tiny “looks like a chart” placeholder, no library required
//   if (tab === "compare") {
//     return (
//       <div className="compareGrid">
//         <CompareTile title="Offer A" amount={fmtMoney(metrics.annualTotal)} sub={`Runway: ${metrics.runwayMonths} mo`} />
//         <CompareTile title="Offer B" amount={fmtMoney(Math.round(metrics.annualTotal * 1.06))} sub={`Runway: ${Math.max(1, metrics.runwayMonths + 1)} mo`} />
//       </div>
//     );
//   }

//   const bars =
//     tab === "runway"
//       ? [
//           { label: "Savings", value: clamp(metrics.savings / 1000, 2, 18) },
//           { label: "Expenses", value: clamp(metrics.monthlyExpenses / 200, 2, 18) },
//           { label: "Runway", value: clamp(metrics.runwayMonths * 2, 2, 18) },
//         ]
//       : [
//           { label: "Base", value: clamp(metrics.base / 7000, 2, 18) },
//           { label: "Bonus", value: clamp(metrics.bonus / 1000, 2, 18) },
//           { label: "Equity", value: clamp(metrics.equity / 900, 2, 18) },
//         ];

//   return (
//     <div className="fakeChart">
//       <div className="gridLines" aria-hidden="true" />
//       <div className="barRow">
//         {bars.map((b) => (
//           <div key={b.label} className="barCol">
//             <div className="bar" style={{ height: `${b.value * 6}px` }} />
//             <div className="barLabel">{b.label}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function CompareTile({ title, amount, sub }) {
//   return (
//     <div className="compareTile">
//       <div className="compareTitle">{title}</div>
//       <div className="compareAmount">{amount}</div>
//       <div className="compareSub">{sub}</div>
//     </div>
//   );
// }

// function computeDummyMetrics(form) {
//   const base = Number(form.base_salary || 0);
//   const bonus = Number(form.bonus || 0);
//   const equity = Number(form.equity || 0);
//   const savings = Number(form.savings || 0);
//   const monthlyExpenses = Math.max(0, Number(form.monthly_expenses || 0));

//   const annualTotal = base + bonus + equity;
//   const takeHomeMonthly = Math.round((base * 0.72 + bonus * 0.65 + equity * 0.55) / 12);

//   const runwayMonths = monthlyExpenses > 0 ? Math.max(0, Math.floor(savings / monthlyExpenses)) : 0;

//   const safetyScore = clamp(Math.round(runwayMonths * 9 + (savings > 0 ? 10 : 0)), 0, 100);
//   const riskTier = safetyScore >= 70 ? "Low" : safetyScore >= 40 ? "Medium" : "High";

//   return {
//     base,
//     bonus,
//     equity,
//     savings,
//     monthlyExpenses,
//     annualTotal,
//     takeHomeMonthly,
//     runwayMonths,
//     safetyScore,
//     riskTier,
//   };
// }

// function makeDraft(form, metrics) {
//   const name = form?.name || "Candidate";
//   const role = form?.role || "the role";
//   const target = Math.round((Number(form.base_salary || 0) || 0) * 1.08);

//   return `Hi [Recruiter Name],

// Thank you again — I’m excited about the ${role} opportunity.

// Based on the scope of the role and market benchmarks, is there flexibility to bring the base closer to ${fmtMoney(
//     target
//   )}, or adjust the equity/bonus to better align with the market?

// I’m confident I can make a strong impact quickly. Happy to discuss what options are available.

// Best,
// ${name}

// (Notes: current runway estimate is ${metrics.runwayMonths} months; aim to improve stability with comp mix.)`;
// }

// function fmtMoney(n) {
//   if (n === null || n === undefined || Number.isNaN(Number(n))) return "—";
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     maximumFractionDigits: 0,
//   }).format(n);
// }

// function clamp(n, min, max) {
//   return Math.min(Math.max(n, min), max);
// }


import React, { useEffect, useMemo, useState } from "react";

export default function AnalysisPanel({ form }) {
  const [page, setPage] = useState(0); // 0=Charts, 1=Negotiation, 2=Voice

  const pages = useMemo(
    () => [
      { key: "charts", label: "Charts" },
      { key: "negotiation", label: "Negotiation" },
      { key: "voice", label: "Voice" },
    ],
    []
  );

  const annualTotal =
    Number(form?.base_salary || 0) +
    Number(form?.bonus || 0) +
    Number(form?.equity || 0);

  // Dummy math — UI only
  const takeHomeMonthly = Math.max(0, Math.round((annualTotal * 0.7) / 12));
  const runwayMonths = form?.monthly_expenses
    ? Math.max(
        0,
        Math.floor(
          (Number(form?.savings || 0) / Number(form.monthly_expenses)) || 0
        )
      )
    : 0;

  const safetyScore = Math.max(
    0,
    Math.min(100, 60 - runwayMonths * 6 + (form?.equity_gap ? 10 : 0))
  );
  const riskTier = safetyScore >= 70 ? "Low" : safetyScore >= 45 ? "Medium" : "High";

  function goTo(i) {
    setPage(() => {
      if (i < 0) return 0;
      if (i > pages.length - 1) return pages.length - 1;
      return i;
    });
  }

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "ArrowLeft") goTo(page - 1);
      if (e.key === "ArrowRight") goTo(page + 1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [page]);

  return (
    <section className="glassPanel">
      <div className="analysisHeader">
        <div>
          <div className="panelTitle">
            Analysis <span className="muted">(dummy)</span>
          </div>
          <div className="mutedSmall">This will be real later</div>
        </div>

        <div className="analysisChips">
          <span className="chip">
            Risk tier: <b>{riskTier}</b>
          </span>
          <span className="chip">
            Safety score: <b>{safetyScore}/100</b>
          </span>
        </div>
      </div>

      <div className="kpiGrid">
        <Kpi label="Annual total" value={`$${formatMoney(annualTotal)}`} />
        <Kpi label="Take-home / month" value={`$${formatMoney(takeHomeMonthly)}`} />
        <Kpi label="Runway" value={`${runwayMonths} mo`} />
        <Kpi label="Equity mode" value={form?.equity_gap ? "ON" : "OFF"} />
      </div>

      {/* Slider */}
      <div className="sliderShell">
        <div className="sliderTopRow">
          <div className="sliderTitle">Tools</div>

          <div className="tabs">
            {pages.map((p, idx) => (
              <button
                key={p.key}
                type="button"
                className={`tabBtn ${idx === page ? "active" : ""}`}
                onClick={() => goTo(idx)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="sliderViewport">
          <div
            className="sliderTrack"
            style={{
              width: `${pages.length * 100}%`,
              transform: `translateX(-${page * (100 / pages.length)}%)`,
            }}
          >
            <div className="slide">
              <ChartsSlide
                savings={Number(form?.savings || 0)}
                expenses={Number(form?.monthly_expenses || 0)}
                runwayMonths={runwayMonths}
              />
            </div>

            <div className="slide">
              <NegotiationSlide name={form?.name || "Alex"} />
            </div>

            <div className="slide">
              <VoiceSlide
                safetyScore={safetyScore}
                runwayMonths={runwayMonths}
                equityOn={!!form?.equity_gap}
              />
            </div>
          </div>
        </div>

        <div className="sliderBottomRow">
          <button
            type="button"
            className="ghostBtn"
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
          >
            ← Prev
          </button>

          <div className="dots" aria-label="slider dots">
            {pages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`dot ${idx === page ? "active" : ""}`}
                onClick={() => goTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="primaryBtn"
            onClick={() => goTo(page + 1)}
            disabled={page === pages.length - 1}
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}

function Kpi({ label, value }) {
  return (
    <div className="kpiCard">
      <div className="kpiLabel">{label}</div>
      <div className="kpiValue">{value}</div>
    </div>
  );
}

function ChartsSlide({ savings, expenses, runwayMonths }) {
  const a = clamp01(savings / 20000);
  const b = clamp01(expenses / 6000);
  const c = clamp01(runwayMonths / 12);

  return (
    <div>
      <div className="slideHeading">
        Charts <span className="muted">(placeholder)</span>
      </div>
      <div className="mutedSmall" style={{ marginTop: 6 }}>
        Runway vs. monthly expenses (UI only)
      </div>

      <div className="chartPlaceholder">
        <div className="chartGrid" />
        <div className="barsRow">
          <Bar label="Savings" heightPct={20 + a * 70} />
          <Bar label="Expenses" heightPct={20 + b * 70} />
          <Bar label="Runway" heightPct={20 + c * 70} />
        </div>
      </div>

      <div className="mutedSmall" style={{ marginTop: 10 }}>
        Later: swap with Recharts/Chart.js (or Highcharts if you really want enterprise-style charts).
      </div>
    </div>
  );
}

function Bar({ label, heightPct }) {
  return (
    <div className="barCol">
      <div className="barTrack">
        <div className="barFill" style={{ height: `${heightPct}%` }} />
      </div>
      <div className="barLabel">{label}</div>
    </div>
  );
}

function NegotiationSlide({ name }) {
  const draft =
    `Hi [Recruiter Name],\n\n` +
    `Thank you again — I’m excited about the role. Based on the scope and market, ` +
    `is there flexibility to adjust base closer to $[target] or rebalance equity/bonus?\n\n` +
    `Happy to discuss options.\n\nBest,\n${name}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      alert("Copied ✅");
    } catch {
      alert("Copy failed — try selecting text manually.");
    }
  }

  return (
    <div>
      <div className="slideHeading">
        Negotiation draft <span className="muted">(UI-only)</span>
      </div>
      <div className="mutedSmall" style={{ marginTop: 6 }}>
        Later: generate this from Gemini/OpenAI using the form values.
      </div>

      <div className="draftBox">
        <pre className="draftText">{draft}</pre>
      </div>

      <div className="draftActions">
        <button type="button" className="primaryBtn" onClick={copy}>
          Copy
        </button>
      </div>
    </div>
  );
}

function VoiceSlide({ safetyScore, runwayMonths, equityOn }) {
  const transcript =
    `Quick summary: your estimated runway is ${runwayMonths} months. ` +
    `Safety score is ${safetyScore}/100. ` +
    `Equity mode is ${equityOn ? "on" : "off"}. ` +
    `Next step: consider negotiating base or equity to improve stability.`;

  return (
    <div>
      <div className="slideHeading">
        Voice coach <span className="muted">(placeholder)</span>
      </div>
      <div className="mutedSmall" style={{ marginTop: 6 }}>
        Keep this lightweight: play + short transcript.
      </div>

      <div className="voiceRow">
        <button className="primaryBtn" type="button">
          Play
        </button>
        <div className="voiceScrub">
          <div className="voiceScrubFill" />
        </div>
        <div className="mutedSmall">0:14</div>
      </div>

      <div className="transcriptBox">
        <div className="transcriptTitle">Transcript</div>
        <div className="transcriptText">{transcript}</div>
      </div>

      <div className="mutedSmall" style={{ marginTop: 10 }}>
        Later: plug ElevenLabs TTS and stream audio here.
      </div>
    </div>
  );
}

function formatMoney(n) {
  const x = Number(n || 0);
  return x.toLocaleString("en-US");
}

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}