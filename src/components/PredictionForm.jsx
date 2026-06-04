import { useState } from "react";
import { predictClearance, predictIncident } from "../api";

const DEFAULTS = {
  queue_length_m: 120,
  estimated_flow_speed_kmph: 20,
  car_count: 140,
  bike_count: 90,
  bus_count: 4,
  truck_count: 10,
  weighted_traffic_index: 540,
  ev_distance_from_signal_km: 1.5,
  cycle_position_sec: 30,
  model_name: "XGBoost",
};

export default function PredictionForm({ onPredict, loading, setLoading, setError }) {
  const [form, setForm] = useState(DEFAULTS);
  const [latest, setLatest] = useState(null);

  const handle = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: parseFloat(value) || value }));
  };

  const submit = async () => {
    setLoading(true);
    setError("");
    setLatest(null);

    try {
      const [clearance, incident] = await Promise.all([
        predictClearance(form),
        predictIncident(form),
      ]);

      const result = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        model: clearance.model_used,
        clearance_km: clearance.clearance_distance_km,
        signal_action: clearance.signal_action,
        incident_prob: incident.incident_probability,
        incident_detected: incident.incident_detected,
        reason: incident.reason,
        queue: form.queue_length_m,
        speed: form.estimated_flow_speed_kmph,
      };

      setLatest(result);
      onPredict(result);
    } catch (e) {
      setError("Cannot reach API. Make sure it is running:\nuvicorn main:app --reload");
    } finally {
      setLoading(false);
    }
  };

  const field = (label, name, step) => (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="number"
        name={name}
        value={form[name]}
        onChange={handle}
        step={step || 1}
      />
    </div>
  );

  const incidentColor = latest
    ? latest.incident_prob > 0.5
      ? "red"
      : latest.incident_prob > 0.25
      ? "yellow"
      : "green"
    : "";

  const isGreen = latest && latest.signal_action.includes("GREEN now");

  return (
    <div className="card">
      <h2>🚑 Run Prediction</h2>

      <div className="form-grid">
        {field("Queue Length (m)", "queue_length_m")}
        {field("Flow Speed (kmph)", "estimated_flow_speed_kmph")}
        {field("Car Count", "car_count")}
        {field("Bike Count", "bike_count")}
        {field("Bus Count", "bus_count")}
        {field("Truck Count", "truck_count")}
        {field("Traffic Index", "weighted_traffic_index")}
        {field("EV Distance (km)", "ev_distance_from_signal_km", 0.1)}
        {field("Cycle Position (sec)", "cycle_position_sec")}

        <div className="form-group">
          <label>Model</label>
          <select name="model_name" value={form.model_name} onChange={handle}>
            <option value="XGBoost">XGBoost</option>
            <option value="Tuned XGBoost">Tuned XGBoost</option>
            <option value="Random Forest">Random Forest</option>
          </select>
        </div>
      </div>

      <button className="submit-btn" onClick={submit} disabled={loading}>
        {loading ? "Predicting..." : "Run Prediction"}
      </button>

      {latest && (
        <div className="latest-result">
          <div className="result-row">
            <span className="rl">Clearance Distance</span>
            <span className="rv">{latest.clearance_km.toFixed(4)} km</span>
          </div>
          <div className="result-row">
            <span className="rl">Signal Action</span>
            <span className={`rv ${isGreen ? "green" : "red"}`}>
              {isGreen ? "🟢 Turn GREEN" : "🔴 Hold RED"}
            </span>
          </div>
          <div className="result-row">
            <span className="rl">Incident Risk</span>
            <span className={`rv ${incidentColor}`}>
              {(latest.incident_prob * 100).toFixed(1)}%
            </span>
          </div>
          <div className="result-row">
            <span className="rl">Model</span>
            <span className="rv">{latest.model}</span>
          </div>
        </div>
      )}
    </div>
  );
}
