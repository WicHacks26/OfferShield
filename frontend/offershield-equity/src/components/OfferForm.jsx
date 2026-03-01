// // src/components/OfferForm.jsx
// import React from "react";

// export default function OfferForm({ form, updateField }) {
//   return (
//     <div>
//       <div className="panelHeader">
//         <h2 className="panelTitle">Profile</h2>
//         <div className="panelHint">Enter offer basics (UI only for now)</div>
//       </div>

//       <div className="row2">
//         <Field label="Chosen name" value={form.name} onChange={(v) => updateField("name", v)} />
//         <Field label="Pronouns" value={form.pronouns} onChange={(v) => updateField("pronouns", v)} />
//       </div>

//       <div className="row2">
//         <Field label="Role" value={form.role} onChange={(v) => updateField("role", v)} />
//         <Select
//           label="Industry"
//           value={form.industry}
//           onChange={(v) => updateField("industry", v)}
//           options={[
//             { value: "tech", label: "Tech" },
//             { value: "fintech", label: "Fintech" },
//             { value: "healthcare", label: "Healthcare" },
//             { value: "education", label: "Education" },
//             { value: "government", label: "Government" },
//             { value: "startup", label: "Startup" },
//           ]}
//         />
//       </div>

//       <div className="row2">
//         <Select
//           label="Location"
//           value={form.location}
//           onChange={(v) => updateField("location", v)}
//           options={[
//             { value: "NY", label: "New York, NY" },
//             { value: "SF", label: "San Francisco, CA" },
//             { value: "SEA", label: "Seattle, WA" },
//             { value: "AUS", label: "Austin, TX" },
//             { value: "ROC", label: "Rochester, NY" },
//             { value: "REMOTE", label: "Remote" },
//           ]}
//         />
//         <NumberField
//           label="Monthly expenses ($)"
//           value={form.monthly_expenses}
//           onChange={(v) => updateField("monthly_expenses", v)}
//         />
//       </div>

//       <Divider />

//       <h3 className="subTitle">Compensation</h3>
//       <div className="row3">
//         <NumberField label="Base ($)" value={form.base_salary} onChange={(v) => updateField("base_salary", v)} />
//         <NumberField label="Bonus ($)" value={form.bonus} onChange={(v) => updateField("bonus", v)} />
//         <NumberField label="Equity ($/yr)" value={form.equity} onChange={(v) => updateField("equity", v)} />
//       </div>

//       <Divider />

//       <h3 className="subTitle">Safety Net</h3>
//       <div className="row2">
//         <NumberField label="Savings ($)" value={form.savings} onChange={(v) => updateField("savings", v)} />

//         <label className="checkCard">
//           <input
//             type="checkbox"
//             checked={form.equity_gap}
//             onChange={(e) => updateField("equity_gap", e.target.checked)}
//           />
//           <div>
//             <div className="checkTitle">Equity Gap Simulation</div>
//             <div className="checkDesc">UI only for now</div>
//           </div>
//         </label>
//       </div>

//       <button className="primaryBtn" type="button" onClick={() => alert("UI renders ✅")}>
//         Run (UI only)
//       </button>
//     </div>
//   );
// }

// function Field({ label, value, onChange }) {
//   return (
//     <label className="field">
//       <span className="label">{label}</span>
//       <input className="inputWhite" value={value} onChange={(e) => onChange(e.target.value)} />
//     </label>
//   );
// }

// function NumberField({ label, value, onChange }) {
//   return (
//     <label className="field">
//       <span className="label">{label}</span>
//       <input
//         className="inputWhite"
//         type="number"
//         value={value}
//         onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
//       />
//     </label>
//   );
// }

// function Select({ label, value, onChange, options }) {
//   return (
//     <label className="field">
//       <span className="label">{label}</span>
//       <select className="inputWhite" value={value} onChange={(e) => onChange(e.target.value)}>
//         {options.map((o) => (
//           <option key={o.value} value={o.value}>
//             {o.label}
//           </option>
//         ))}
//       </select>
//     </label>
//   );
// }

// function Divider() {
//   return <div className="divider" />;
// }


// src/components/OfferForm.jsx
import React from "react";

export default function OfferForm({ form, updateField }) {
  return (
    <section className="card glass">
      <div className="cardHeader">
        <h2 className="cardTitle">Profile</h2>
        <div className="cardHint">Enter offer basics (UI only for now)</div>
      </div>

      <div className="row2">
        <Field label="Chosen name" value={form.name} onChange={(v) => updateField("name", v)} />
        <Field label="Pronouns" value={form.pronouns} onChange={(v) => updateField("pronouns", v)} />
      </div>

      <div className="row2">
        <Field label="Role" value={form.role} onChange={(v) => updateField("role", v)} />
        <Select
          label="Industry"
          value={form.industry}
          onChange={(v) => updateField("industry", v)}
          options={[
            { value: "tech", label: "Tech" },
            { value: "fintech", label: "Fintech" },
            { value: "healthcare", label: "Healthcare" },
            { value: "education", label: "Education" },
            { value: "government", label: "Government" },
            { value: "startup", label: "Startup" },
          ]}
        />
      </div>

      <div className="row2">
        <Select
          label="Location"
          value={form.location}
          onChange={(v) => updateField("location", v)}
          options={[
            { value: "NY", label: "New York, NY" },
            { value: "SF", label: "San Francisco, CA" },
            { value: "SEA", label: "Seattle, WA" },
            { value: "AUS", label: "Austin, TX" },
            { value: "ROC", label: "Rochester, NY" },
            { value: "REMOTE", label: "Remote" },
          ]}
        />
        <NumberField
          label="Monthly expenses ($)"
          value={form.monthly_expenses}
          onChange={(v) => updateField("monthly_expenses", v)}
        />
      </div>

      <Divider />

      <h3 className="sectionTitle">Compensation</h3>
      <div className="row3">
        <NumberField label="Base ($)" value={form.base_salary} onChange={(v) => updateField("base_salary", v)} />
        <NumberField label="Bonus ($)" value={form.bonus} onChange={(v) => updateField("bonus", v)} />
        <NumberField label="Equity ($/yr)" value={form.equity} onChange={(v) => updateField("equity", v)} />
      </div>

      <Divider />

      <h3 className="sectionTitle">Safety Net</h3>
      <div className="row2">
        <NumberField label="Savings ($)" value={form.savings} onChange={(v) => updateField("savings", v)} />

        <label className="toggleBlock">
          <input
            type="checkbox"
            checked={form.equity_gap}
            onChange={(e) => updateField("equity_gap", e.target.checked)}
          />
          <div>
            <div className="toggleTitle">Equity Gap Simulation</div>
            <div className="toggleDesc">UI only for now</div>
          </div>
        </label>
      </div>

      <button className="runBtn" type="button" onClick={() => alert("UI renders ✅")}>
        Run (UI only)
      </button>
    </section>
  );
}

function Divider() {
  return <div className="divider" />;
}

function Field({ label, value, onChange }) {
  return (
    <label className="field">
      <span className="label">{label}</span>
      <input className="inputWhite" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function NumberField({ label, value, onChange }) {
  return (
    <label className="field">
      <span className="label">{label}</span>
      <input
        className="inputWhite"
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
      />
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="field">
      <span className="label">{label}</span>
      <select className="inputWhite" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}