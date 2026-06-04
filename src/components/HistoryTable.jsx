export default function HistoryTable({ predictions }) {
  if (predictions.length === 0) {
    return (
      <div className="card">
        <h2>📋 Prediction History</h2>
        <div className="empty-state">
          No predictions yet. Run one to see results here.
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>📋 Prediction History ({predictions.length})</h2>
      <div className="table-wrap">
        <table className="history-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Queue (m)</th>
              <th>Speed (kmph)</th>
              <th>Clearance (km)</th>
              <th>Signal</th>
              <th>Incident Risk</th>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((p) => {
              const isGreen = p.signal_action.includes("GREEN now");
              const riskLevel =
                p.incident_prob > 0.5
                  ? "badge-red"
                  : p.incident_prob > 0.25
                  ? "badge-yellow"
                  : "badge-green";
              const riskLabel =
                p.incident_prob > 0.5
                  ? "High"
                  : p.incident_prob > 0.25
                  ? "Medium"
                  : "Low";

              return (
                <tr key={p.id}>
                  <td style={{ color: "#888" }}>{p.timestamp}</td>
                  <td>{p.queue}</td>
                  <td>{p.speed}</td>
                  <td style={{ color: "#00d4ff", fontWeight: 600 }}>
                    {p.clearance_km.toFixed(4)}
                  </td>
                  <td>
                    <span className={`badge ${isGreen ? "badge-green" : "badge-red"}`}>
                      {isGreen ? "Green" : "Hold Red"}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${riskLevel}`}>
                      {riskLabel} ({(p.incident_prob * 100).toFixed(0)}%)
                    </span>
                  </td>
                  <td style={{ color: "#888", fontSize: "0.78rem" }}>
                    {p.model.split(" (")[0]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
