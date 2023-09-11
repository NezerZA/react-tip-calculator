import { useState } from "react";

import "./styles.css";

export default function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState(null);
  const [percentage1, setPercentage1] = useState(null);
  const [percentage2, setPercentage2] = useState(null);

  const tip = bill * ((percentage1 + percentage2) / 2 / 100);

  function handleReset() {
    setPercentage1(0);
    setPercentage2(0);
    setBill("");
  }

  return (
    <>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectPercentage
        percentage={percentage1}
        onSetPercentage={setPercentage1}
      >
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage
        percentage={percentage2}
        onSetPercentage={setPercentage2}
      >
        How did your friend like the service?
      </SelectPercentage>
      {bill > 0 && (
        <>
          <Output tip={tip} bill={bill} />
          <Reset onReset={handleReset} />
        </>
      )}
    </>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <>
      <label>How much was the bill?</label>
      <input
        type="number"
        placeholder="Bill Amount"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      ></input>
    </>
  );
}

function SelectPercentage({ children, percentage, onSetPercentage }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSetPercentage(Number(e.target.value))}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <h3>
      You pay ${bill + tip} (${bill} + ${tip} tip)
    </h3>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
