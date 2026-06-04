import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const CHART_STYLE = {
  backgroundColor: "#0f1117",
  border: "1px solid #2a2d3a",
  borderRadius: "8px",
  fontSize: "0.8rem",
  color: "#e0e0e0",
};

export default function TrendChart({ predictions }) {
  const data = [...predictions].reverse().map((p, i) => ({
    name: `#${i + 1}`,
    clearance: parseFloat(p.clearance_km.toFixed(4)),
    incident:  parseFloat((p.incident_prob * 100).toFixed(1)),
    queue:     p.queue,
  }));

  return (
    <div className="charts-grid">

      {/* Clearance Distance Trend */}
      <div className="card">
        <h2>📈 Clearance Distance Trend</h2>
        <p className="chart-title">Predicted clearance distance (km) per prediction</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3a" />
            <XAxis dataKey="name" tick={{ fill: "#888", fontSize: 11 }} />
            <YAxis tick={{ fill: "#888", fontSize: 11 }} domain={["auto", "auto"]} />
            <Tooltip contentStyle={CHART_STYLE} />
            <Line
              type="monotone"
              dataKey="clearance"
              stroke="#00d4ff"
              strokeWidth={2}
              dot={{ fill: "#00d4ff", r: 4 }}
              name="Clearance (km)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Incident Risk Trend */}
      <div className="card">
        <h2>⚠️ Incident Risk Trend</h2>
        <p className="chart-title">Incident probability (%) per prediction</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3a" />
            <XAxis dataKey="name" tick={{ fill: "#888", fontSize: 11 }} />
            <YAxis tick={{ fill: "#888", fontSize: 11 }} domain={[0, 100]} />
            <Tooltip contentStyle={CHART_STYLE} />
            <Bar
              dataKey="incident"
              name="Incident Risk (%)"
              fill="#ff5252"
              radius={[4, 4, 0, 0]}
              opacity={0.8}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
