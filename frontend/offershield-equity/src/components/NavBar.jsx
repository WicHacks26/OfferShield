

// src/components/NavBar.jsx
// import React from "react";

// export default function NavBar({
//   active,
//   onGoForm,
//   onGoAbout,
//   highContrast,
//   largeText,
//   onToggleHighContrast,
//   onToggleLargeText,
// }) {
//   return (
//     <header className="navWrap">
//       <div className="navInner">
//         <div className="navBrand">
//           <div className="navLogo" aria-hidden="true">
//             🐾
//           </div>
//           <div>
//             <div className="navTitle">Offer Form</div>
//             <div className="navSub">WiCHacks-themed UI · purple glass</div>
//           </div>
//         </div>

//         <div className="navRight">
//           <div className="navPills">
//             <button
//               className={`pill ${active === "form" ? "pillActive" : ""}`}
//               onClick={onGoForm}
//               type="button"
//             >
//               Form
//             </button>
//             <button
//               className={`pill ${active === "about" ? "pillActive" : ""}`}
//               onClick={onGoAbout}
//               type="button"
//             >
//               About
//             </button>
//           </div>

//           <label className="navToggle">
//             <input
//               type="checkbox"
//               checked={highContrast}
//               onChange={(e) => onToggleHighContrast(e.target.checked)}
//             />
//             High contrast
//           </label>

//           <label className="navToggle">
//             <input
//               type="checkbox"
//               checked={largeText}
//               onChange={(e) => onToggleLargeText(e.target.checked)}
//             />
//             Large text
//           </label>
//         </div>
//       </div>
//     </header>
//   );
// }


import React from "react";

export default function NavBar({ active, onGoForm, onGoAbout, logoSrc }) {
  return (
    <header className="navWrap">
      <div className="navInner">
        <div className="navBrand">
          <div className="navLogoSlot" aria-hidden="true">
            {logoSrc ? (
              <img className="navLogoImg" src={logoSrc} alt="App logo" />
            ) : (
              <div className="navLogoPlaceholder">
                <div className="navLogoPlaceholderTitle">Logo</div>
                <div className="navLogoPlaceholderSub">upload later</div>
              </div>
            )}
          </div>

          <div className="navText">
            <div className="navTitle">Offer Form</div>
            <div className="navSub"></div>
          </div>
        </div>

        <div className="navRight">
          <div className="navPills">
            <button
              className={`pill ${active === "form" ? "pillActive" : ""}`}
              onClick={onGoForm}
              type="button"
            >
              Form
            </button>
            <button
              className={`pill ${active === "about" ? "pillActive" : ""}`}
              onClick={onGoAbout}
              type="button"
            >
              About
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}