const API_BASE = "http://127.0.0.1:8000";

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
