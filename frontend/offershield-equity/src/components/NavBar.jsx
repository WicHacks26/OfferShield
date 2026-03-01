import React from "react";

export default function NavBar({
  active,
  onGoForm,
  onGoAbout,
  onGoLoan,
}) {
  return (
    <header className="navWrap">
      <div className="navInner">
        <div className="navBrand">
          <div className="navLogoSlot" aria-hidden="true">
            <img
              className="navLogoImg"
              src="/Logo.jpeg"
              alt="Herizon logo"
            />
          </div>

          <div className="navText">
            <div className="navTitle">Herizon</div>
            <div className="navSub">Her + Horizon</div>
          </div>
        </div>

        <div className="navRight">
          <div className="navPills">


            <button
              className={`pill ${active === "about" ? "pillActive" : ""}`}
              onClick={onGoAbout}
              type="button"
            >
              About
            </button>

            
            <button
              className={`pill ${active === "form" ? "pillActive" : ""}`}
              onClick={onGoForm}
              type="button"
            >
              Form
            </button>

            <button
              className={`pill ${active === "loan" ? "pillActive" : ""}`}
              onClick={onGoLoan}
              type="button"
            >
              Loan
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}