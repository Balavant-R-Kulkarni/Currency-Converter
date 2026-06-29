import { useState, useEffect  } from "react";
import axios from "axios";
import { MdSwapVerticalCircle } from "react-icons/md";
import Select from "react-select";
import {Tooltip} from "react-tooltip";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    amount: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [currencies, setCurrencies] = useState([]);

  const currencyOptions = currencies.map((currency) => ({ value: currency, label: currency }));

  const selectStyles = {
    container: (provided) => ({
      ...provided,
      width: '220px',
      margin: '10px 10px',
    }),
    control: (provided, state) => ({
      ...provided,
      minHeight: '44px',
      borderRadius: '8px',
      borderColor: state.isFocused ? '#7c3aed' : '#ccc',
      boxShadow: state.isFocused ? '0 0 0 1px #7c3aed' : 'none',
      backgroundColor: '#ffffff',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#111827',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#6b7280',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      backgroundColor: '#ffffff',
      color: '#111827',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#eef2ff' : '#ffffff',
      color: '#111827',
      cursor: 'pointer',
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  const handleSelectChange = (selectedOption, name) => {
    const value = selectedOption?.value ?? "";
    console.log(`Selected ${name}: ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);

    const payload = {
      ...formData,
      amount: Number(formData.amount),
      from: formData.from.split(" - ")[0], // Extract the currency code
      to: formData.to.split(" - ")[0], // Extract the currency code
    };

    setLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080"; // Fallback to localhost for development
    try {
      const response = await fetch(`${apiUrl}/api/convert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || `HTTP error! status: ${response.status}`);
      }

      console.log("Conversion result:", data);
      setResult(data);
      setError(null);
       // Clear any previous error on successful conversion
    } catch (error) {
      console.error("Error during conversion:", error);
      setError(error.message || "An error occurred during conversion.");
      setResult(null); // Clear previous result on error
    }
    setLoading(false);
  };

  const handleSwapOptions = () => {
    setFormData((prevData) => ({
      ...prevData,
      from: prevData.to,
      to: prevData.from,
    }));
  }

  useEffect(() => {
    const fetchHomeMessage = async () => {
      //const codeswithCuurr = axios.get("https://currency-converter-production-7d51.up.railway.app/api/codes");
      const codeswithCuurr = await axios.get("http://localhost:8080/api/codes");
      const { data } = await codeswithCuurr;
      const supportedCurrenciesWithNames = data.map((code) => `${code[0]} - ${code[1]}`);
      setCurrencies(supportedCurrenciesWithNames);
    };
    fetchHomeMessage()

  },[])

  return (
    <div className="App">
      <h1 >Currency Converter</h1>
      <div className="converter-form">
       <label htmlFor="from" style={{ fontWeight: "bold", color: "#3c4042", marginLeft: "10px" }}>
          From:
        </label>
      <Select
        name="from"
        value={formData.from ? { value: formData.from, label: formData.from } : null}
        onChange={(selectedOption) => handleSelectChange(selectedOption, 'from')}
        options={currencyOptions}
        styles={selectStyles}
        placeholder="Select source currency"
        menuPortalTarget={document.body}
      />
      <span data-tooltip-id="swap-tooltip" data-tooltip-content="Swap source and target currencies">
        <MdSwapVerticalCircle
          onClick={handleSwapOptions}
          size={28}
          fontWeight="bold"
          style={{ cursor: "pointer", border: "1px solid #998f8f", color: "#5a5858", borderRadius: "50%" }}
        />
      </span>
      <Tooltip
        id="swap-tooltip"
        place="right"
        style={{
          backgroundColor: '#535456',
          color: '#d7cbcb',
          border: '1px solid #ffffff',
          padding: '6px 10px',
          borderRadius: '6px',
        }}
      />
      <label htmlFor="to" style={{ fontWeight: "bold", color: "#3c4042", marginTop: '10px' }}>
          To:
        </label>
      <Select
        name="to"
        value={formData.to ? { value: formData.to, label: formData.to } : null}
        onChange={(selectedOption) => handleSelectChange(selectedOption, 'to')}
        options={currencyOptions}
        styles={selectStyles}
        placeholder="Select target currency"
        menuPortalTarget={document.body}
      />
      <label htmlFor="amount" style={{ fontWeight: "bold", color: "#3c4042" }}>
          Amount:
        </label>
       <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          placeholder="Amount"
          step="0.01"
        />
        
        <button name="amount" onClick={handleSubmit} disabled={loading}>
          {loading ? "Converting..." : "Convert"}
        </button>
        
      </div>
      
        {result  && (
          <div>
            <h2>Conversion Result</h2>
            <p className="result-text">
              Converted Amount - <strong>{result.convertedAmount} {result.target}</strong>
            </p >
            {result && result.rate && (
              <p style={{ fontWeight: "bold", color: "#3c4042" }}>{`Exchange Rate is ${result.rate}`}</p>
            )}
          </div>
        )}
        { error && (
          <div>
            <h2 style={{ color: "#ff6b6b" }}>Error!</h2>
            <p style={{ color: "#f50909" }}>{error}</p>
          </div>
        )}
    </div>
  );
};

export default App;
