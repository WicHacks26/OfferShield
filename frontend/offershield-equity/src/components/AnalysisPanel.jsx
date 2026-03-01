import React, { useEffect, useMemo, useState, useRef } from "react";

export default function AnalysisPanel({ form, result }) {
  const [page, setPage] = useState(0); 

  const pages = useMemo(
    () => [
      { key: "charts", label: "Charts" },
      { key: "negotiation", label: "Negotiation" },
      { key: "voice", label: "Voice" },
    ],
    []
  );

  // --- DATA LOGIC ---
  const annualTotal = result 
    ? result.summary.total_comp 
    : (Number(form?.base_salary || 0) + Number(form?.bonus || 0) + Number(form?.equity || 0));

  const takeHomeMonthly = result 
    ? result.ai_insights.tax_profile.take_home_monthly 
    : Math.max(0, Math.round((annualTotal * 0.7) / 12));

  const runwayMonths = form?.monthly_expenses
    ? Math.max(
        0,
        Math.floor(
          (Number(form?.savings || 0) / Number(form.monthly_expenses)) || 0
        )
      )
    : 0;

  const safetyScore = result 
    ? result.summary.risk_score 
    : Math.max(0, Math.min(100, 60 - runwayMonths * 6 + (form?.equity_gap ? 10 : 0)));

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
            Analysis {result ? "✅" : <span className="muted">(Preview)</span>}
          </div>
          <div className="mutedSmall">
            {result ? "AI-Powered Insights" : "Run analysis to see real data"}
          </div>
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
              <NegotiationSlide 
                emailText={result?.ai_insights?.negotiation_suite?.formal_counter_email} 
              />
            </div>

            <div className="slide">
              <VoiceSlide
                audioBase64={result?.audio_base64}
                transcript={result?.ai_insights?.voice_scripts?.the_bottom_line}
              />
            </div>
          </div>
        </div>

        <div className="sliderBottomRow">
          <button type="button" className="ghostBtn" onClick={() => goTo(page - 1)} disabled={page === 0}>
            ← Prev
          </button>
          <div className="dots">
            {pages.map((_, idx) => (
              <button key={idx} type="button" className={`dot ${idx === page ? "active" : ""}`} onClick={() => goTo(idx)} />
            ))}
          </div>
          <button type="button" className="primaryBtn" onClick={() => goTo(page + 1)} disabled={page === pages.length - 1}>
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
      <div className="slideHeading">Financial Visualization</div>
      <div className="chartPlaceholder">
        <div className="chartGrid" />
        <div className="barsRow">
          <Bar label="Savings" heightPct={20 + a * 70} />
          <Bar label="Expenses" heightPct={20 + b * 70} />
          <Bar label="Runway" heightPct={20 + c * 70} />
        </div>
      </div>
    </div>
  );
}

function Bar({ label, heightPct }) {
  return (
    <div className="barCol">
      <div className="barTrack"><div className="barFill" style={{ height: `${heightPct}%` }} /></div>
      <div className="barLabel">{label}</div>
    </div>
  );
}

function NegotiationSlide({ emailText }) {
  const displayDraft = emailText || "Run analysis to generate a custom negotiation email.";
  async function copy() {
    if (!emailText) return;
    try {
      await navigator.clipboard.writeText(displayDraft);
      alert("Copied ✅");
    } catch { alert("Copy failed"); }
  }
  return (
    <div>
      <div className="slideHeading">AI Negotiation Draft</div>
      <div className="draftBox"><pre className="draftText">{displayDraft}</pre></div>
      <div className="draftActions">
        <button type="button" className="primaryBtn" onClick={copy} disabled={!emailText}>
          {emailText ? "Copy Email" : "Waiting..."}
        </button>
      </div>
    </div>
  );
}

// --- UPDATED VOICE SLIDE WITH PLAY/PAUSE LOGIC ---
function VoiceSlide({ audioBase64, transcript }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // If the component receives new audio data, stop the old one
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
    }
  }, [audioBase64]);

  const toggleAudio = () => {
    if (!audioBase64) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio(`data:audio/mp3;base64,${audioBase64}`);
        audioRef.current.onended = () => setIsPlaying(false);
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div>
      <div className="slideHeading">AI Voice Coach</div>
      <div className="voiceRow">
        <button 
            className="primaryBtn" 
            type="button" 
            onClick={toggleAudio}
            disabled={!audioBase64}
        >
          {isPlaying ? "⏸ Pause Advice" : "▶ Play Advice"}
        </button>
        <div className="voiceScrub">
          <div className="voiceScrubFill" style={{ width: isPlaying ? '100%' : '0%', transition: 'width 20s linear' }} />
        </div>
      </div>
      <div className="transcriptBox">
        <div className="transcriptTitle">Transcript Summary</div>
        <div className="transcriptText">{transcript || "Waiting for analysis..."}</div>
      </div>
    </div>
  );
}

function formatMoney(n) {
  return Number(n || 0).toLocaleString("en-US");
}

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}