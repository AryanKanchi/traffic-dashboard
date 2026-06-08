const API_BASE = "https://traffic-signal-api.onrender.com";

export async function predictClearance(inputs) {
  const res = await fetch(`${API_BASE}/predict/clearance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputs),
  });
  if (!res.ok) throw new Error("API returned an error");
  return res.json();
}

export async function predictIncident(inputs) {
  const res = await fetch(`${API_BASE}/predict/incident`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputs),
  });
  if (!res.ok) throw new Error("API returned an error");
  return res.json();
}

export async function checkHealth() {
  const res = await fetch(`${API_BASE}/`);
  return res.ok;
}
