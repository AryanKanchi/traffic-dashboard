import { useState, useEffect } from "react";
import { checkHealth } from "./api";
import PredictionForm from "./components/PredictionForm";
import HistoryTable from "./components/HistoryTable";
import TrendChart from "./components/TrendChart";
import "./App.css";

export default function App() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [apiStatus, setApiStatus]     = useState("checking");

  // Check API health on mount
  useEffect(() => {
    checkHealth()
      .then((ok) => setApiStatus(ok ? "online" : "offline"))
      .catch(()  => setApiStatus("offline"));
  }, []);

  const addPrediction = (p) => setPredictions((prev) => [p, ...prev]);

  const statusLabel = {
    online:   "API Online",
    offline:  "API Offline",
    checking: "Checking...",
  }[apiStatus];

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div className="header-left">
          <h1>🚦 Traffic Signal Dashboard</h1>
          <p>ML-powered signal preemption for emergency vehicles</p>
        </div>
        <div className="status-badge">
          <div className={`status-dot ${apiStatus}`} />
          {statusLabel}
        </div>
      </header>

      <main className="main">

        {/* Form + History */}
        <div className="top-grid">
          <PredictionForm
            onPredict={addPrediction}
            loading={loading}
            setLoading={setLoading}
            setError={setError}
          />
          <HistoryTable predictions={predictions} />
        </div>

        {/* Error */}
        {error && (
          <div className="error-box" style={{ marginBottom: 24 }}>
            {error.split("\n").map((line, i) => (
              <div key={i}>{i === 1 ? <code>{line}</code> : line}</div>
            ))}
          </div>
        )}

        {/* Charts — only show when we have data */}
        {predictions.length > 0 && (
          <TrendChart predictions={predictions} />
        )}

      </main>
    </div>
  );
}
