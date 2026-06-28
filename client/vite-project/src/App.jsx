//import { useState } from "react";
import "./App.css";
import Religion from "./Religion";

const App = () => {
  // const [formData, setFormData] = useState({
  //   from: "",
  //   to: "",
  //   amount: "",
  // });
  // const [result, setResult] = useState(null);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);

  // const currencies = [
  //   "USD",
  //   "EUR",
  //   "GBP",
  //   "JPY",
  //   "AUD",
  //   "CAD",
  //   "CHF",
  //   "CNY",
  //   "SEK",
  //   "NZD",
  //   "INR",
  //   "BRL",
  //   "ZAR",
  //   "RUB",
  //   "KRW",
  //   "SGD",
  //   "MXN",
  // ];

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   console.log(`Selected ${name}: ${value}`);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log("Form submitted:", formData);

  //   const payload = {
  //     ...formData,
  //     amount: Number(formData.amount),
  //   };

  //   setLoading(true);
  //   const apiUrl = import.meta.env.VITE_API_URL || "https://currency-converter-production-7d51.up.railway.app";
  //   try {
  //     const response = await fetch(`${apiUrl}/api/convert`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.details || `HTTP error! status: ${response.status}`);
  //     }

  //     console.log("Conversion result:", data);
  //     setResult(data);
  //     setError(null);
  //      // Clear any previous error on successful conversion
  //   } catch (error) {
  //     console.error("Error during conversion:", error);
  //     setError(error.message || "An error occurred during conversion.");
  //     setResult(null); // Clear previous result on error
  //   }
  //   setLoading(false);
  // };

  return (
    <div className="App">
      {/* <h1>Currency Converter</h1>
      <div className="converter-form">
       <label htmlFor="from" style={{ fontWeight: "bold", color: "#7a7c7d" }}>
          From:
        </label>
      <select
        name="from"
        value={formData.from}
        onChange={handleChange}
        className="currency-select"
      >
        <option value="" disabled>
          Select source currency
        </option>
        {currencies.map((currency) => (
          <option key={currency} value={currency} style={{ maxHeight: '100px', overflowY: 'auto' }}>
            {currency}
          </option>
        ))}
      </select>
      <label htmlFor="to" style={{ fontWeight: "bold", color: "#7a7c7d", marginTop: '10px' }}>
          To:
        </label>
      <select
        name="to"
        value={formData.to}
        onChange={handleChange}
        className="currency-select"
      >
        <option value="" disabled>
          Select target currency
        </option>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
       
      </select>
      </div>
      <label htmlFor="amount" style={{ fontWeight: "bold", color: "#7a7c7d" }}>
          Amount:
        </label>
       <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          step="0.01"
        />
        
        <button name="amount" onClick={handleSubmit} disabled={loading}>
          {loading ? "Converting..." : "Convert"}
        </button>
        {result  && (
          <div>
            <h2>Conversion Result</h2>
            <p className="result-text">
              Converted Amount - <strong>{result.convertedAmount} {result.target}</strong>
            </p >
            {result && result.rate && (
              <p style={{ fontWeight: "bold", color: "#7a7c7d" }}>{`Exchange Rate is ${result.rate}`}</p>
            )}
          </div>
        )}
        { error && (
          <div>
            <h2 style={{ color: "#ff6b6b" }}>Error!</h2>
            <p style={{ color: "#f55a5a" }}>{error}</p>
          </div>
        )} */}
        <Religion />
    </div>
  );
};

export default App;
