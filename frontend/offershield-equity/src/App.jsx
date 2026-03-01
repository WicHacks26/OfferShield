
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

  const formRef = useRef(null);
  const aboutRef = useRef(null);

  const appClass = useMemo(() => {
    const cls = ["appRoot"];
    if (form.accessibility_high_contrast) cls.push("hc");
    if (form.accessibility_large_text) cls.push("lg");
    return cls.join(" ");
  }, [form.accessibility_high_contrast, form.accessibility_large_text]);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function scrollToSection(which) {
    setActive(which);
    const el = which === "form" ? formRef.current : aboutRef.current;
    if (!el) return;

    // Important: we rely on CSS scroll-margin-top to avoid navbar overlap
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

      {/* FORM SECTION (background A) */}
      <section ref={formRef} id="form" className="section sectionForm">
        <div className="container">
          <div className="grid">
            <OfferForm form={form} updateField={updateField} />
            <AnalysisPanel form={form} />
          </div>
        </div>
      </section>

      {/* ABOUT SECTION (background B) */}
      <section ref={aboutRef} id="about" className="section sectionAbout">
        <div className="container">
          <About />
        </div>
      </section>

      <footer className="footerNote">
        UI-only build ✦ Next: animations + real analysis + charts + voice coach
      </footer>
    </div>
  );
}