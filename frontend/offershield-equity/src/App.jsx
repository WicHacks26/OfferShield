// src/App.jsx
import React, { useMemo, useRef, useState } from "react";
import NavBar from "./components/NavBar";
import OfferForm from "./components/OfferForm";
import AnalysisPanel from "./components/AnalysisPanel";
import About from "./components/About";
import "./App.css";

const DEFAULT_FORM = {
  name: "Alex",
  pronouns: "they/them",
  role: "Software Engineer",
  industry: "tech",
  location: "NY",
  base_salary: 90000,
  bonus: 5000,
  equity: 10000,
  monthly_expenses: 2500,
  savings: 8000,
  equity_gap: true,
  accessibility_high_contrast: false,
  accessibility_large_text: false,
};

export default function App() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [active, setActive] = useState("form");
  
  // NEW: State to store the response from your Python Backend
  const [result, setResult] = useState(null);
  // NEW: State to track if the AI is currently thinking
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);
  const aboutRef = useRef(null);

  const appClass = useMemo(() => {
    const cls = ["appRoot"];
    if (form.accessibility_high_contrast) cls.push("hc");
    if (form.accessibility_large_text) cls.push("lg");
    return cls.join(" ");
  }, [form.accessibility_high_contrast, form.accessibility_large_text]);

  // NEW: The function that sends data to your FastAPI
  async function handleRunAnalysis() {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/analyze-offer", {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          // Adding default values for fields the backend expects but aren't in the simple UI yet
          voice_mode: true,
          emergency_months: 6,
          career_break_years: 0,
          generate_negotiation: true
        }),
      });

      if (!response.ok) {
        throw new Error("Backend server error");
      }

      const data = await response.json();
      setResult(data); // This sends the Python results into the AnalysisPanel
    } catch (error) {
      console.error("Integration Error:", error);
      alert("Failed to connect to Backend. Ensure uvicorn is running on port 8000.");
    } finally {
      setLoading(false);
    }
  }

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function scrollToSection(which) {
    setActive(which);
    const el = which === "form" ? formRef.current : aboutRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className={appClass}>
      <NavBar
        active={active}
        onGoForm={() => scrollToSection("form")}
        onGoAbout={() => scrollToSection("about")}
        highContrast={form.accessibility_high_contrast}
        largeText={form.accessibility_large_text}
        onToggleHighContrast={(v) => updateField("accessibility_high_contrast", v)}
        onToggleLargeText={(v) => updateField("accessibility_large_text", v)}
      />

      {/* FORM SECTION */}
      <section ref={formRef} id="form" className="section sectionForm">
        <div className="container">
          <div className="grid">
            {/* Pass the new onRun function and loading state to the form */}
            <OfferForm 
              form={form} 
              updateField={updateField} 
              onRun={handleRunAnalysis} 
              loading={loading} 
            />
            {/* Pass the result from the backend to the AnalysisPanel */}
            <AnalysisPanel 
              form={form} 
              result={result} 
            />
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section ref={aboutRef} id="about" className="section sectionAbout">
        <div className="container">
          <About />
        </div>
      </section>

      <footer className="footerNote">
        OfferShield Equity ✦ Powered by FastAPI, Gemini, and ElevenLabs
      </footer>
    </div>
  );
}