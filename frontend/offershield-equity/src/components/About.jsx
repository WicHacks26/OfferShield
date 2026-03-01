

// src/components/About.jsx
import React from "react";

export default function About() {
  return (
    <section className="card glass">
      <h2 className="cardTitle" style={{ marginBottom: 10 }}>
        About
      </h2>

      <p className="aboutText">
        Offer Form is a WiCHacks-themed UI concept for an “offer safety + equity” experience.
        The goal is to help candidates understand stability (runway), compare offers, and feel confident negotiating.
      </p>

      <div className="aboutGrid">
        <div className="aboutCard">
          <div className="aboutTitle">Inclusive-first</div>
          <div className="aboutBody">
            Accessibility toggles + clear language. Equity lens is shown as a planning tool.
          </div>
        </div>

        <div className="aboutCard">
          <div className="aboutTitle">Hackathon demo-ready</div>
          <div className="aboutBody">
            Quick form → dummy output → later swap in real calculations and APIs.
          </div>
        </div>

        <div className="aboutCard">
          <div className="aboutTitle">Next</div>
          <div className="aboutBody">
            Charts, negotiation draft, voice coach, and “compare offers” view.
          </div>
        </div>
      </div>
    </section>
  );
}