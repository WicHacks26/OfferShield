// src/components/About.jsx
import React from "react";

export default function About() {
  return (
    <section className="card glass aboutWrap">

      <h2 className="cardTitle heroTitle">
        Welcome to <span className="brandHighlight">Herizon</span>
      </h2>

      <p className="leadText">
        Your financial confidence companion. Analyze offers, plan your future,
        and negotiate with clarity — all in one place.
      </p>

      {/* Feature Grid */}
      <div className="aboutGrid3">

        {/* Offer Intelligence */}
        <div className="aboutCard">
          <div className="imageContainer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Offer analysis"
              className="aboutImage"
            />
          </div>

          <h3>💼 Offer Intelligence</h3>
          <p>
            Break down salary, bonuses, and equity into meaningful insights.
            Understand stability before you sign.
          </p>
        </div>

        {/* Smart Planning */}
        <div className="aboutCard">
          <div className="imageContainer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1589/1589592.png"
              alt="Financial planning"
              className="aboutImage"
            />
          </div>

          <h3>📊 Smart Planning</h3>
          <p>
            Visualize loan repayment, affordability, and savings runway with
            interactive planning tools.
          </p>
        </div>

        {/* Negotiation Coach */}
        <div className="aboutCard">
          <div className="imageContainer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
              alt="Confident negotiation"
              className="aboutImage"
            />
          </div>

          <h3>🎙 Confident Negotiation</h3>
          <p>
            Use AI-powered negotiation drafts and voice summarization to
            advocate for your worth confidently.
          </p>
        </div>

      </div>

      {/* Mission Section */}
      <div className="panel missionCard">

        <div className="missionTop">
          <div className="missionKicker">Our mission</div>

          <div className="missionTitle">
            Clarity that protects your horizon.
          </div>

          <div className="missionSubtitle">
            Herizon helps you evaluate offers with confidence—especially when
            your path includes a gap year, career transition, or other life
            changes. Not every career path is linear. Many talented people step
            away for caregiving, health, education, relocation, or life
            transitions — and too often, those gaps are treated like a weakness.

            <br /><br />

            We built Herizon to make compensation decisions clearer and fairer.
            With transparent breakdowns (salary, bonus, equity), stability
            insights, and negotiation support, you can advocate for your worth
            using data — not guesswork.
          </div>
        </div>

        <div className="missionNote">
          Built for women and underrepresented talent — designed to help
          everyone.
        </div>

      </div>

    </section>
  );
}