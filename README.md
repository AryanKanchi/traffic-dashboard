# 🚦 Traffic Signal Dashboard

A React dashboard for visualising ML predictions from the [Traffic Signal Intelligence API](https://github.com/AryanKanchi/traffic-signal-api) in real time.

---

## 📸 What it shows

- **Run Prediction** — submit traffic parameters and get clearance distance + incident risk
- **Prediction History** — every prediction logged in a live table
- **Trend Charts** — clearance distance line chart and incident risk bar chart
- **API Status** — live indicator showing if the backend is reachable

---

## 🚀 Getting Started

## 🌐 Live Demo
Live API:       https://traffic-signal-api.onrender.com/docs
Live Dashboard: https://traffic-dashboard-git-main-aryan-ka-projects.vercel.app

### 1. Start the backend first
```bash
# In your traffic-signal-api folder
uvicorn main:app --reload
```

### 2. Clone and run the dashboard
```bash
git clone https://github.com/AryanKanchi/traffic-dashboard.git
cd traffic-dashboard
npm install
npm run dev
```

Open `http://localhost:5173`

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 (Vite) |
| Charts | Recharts |
| API Calls | Fetch API |
| Styling | Plain CSS |

---

## 🔌 Related Projects

- 🚑 [Emergency Vehicle Routing System](https://github.com/AryanKanchi/Emergency_Vehicle_Routing_System) — ML simulation
- ⚙️ [Traffic Signal Intelligence API](https://github.com/AryanKanchi/traffic-signal-api) — FastAPI backend

---

*Built as part of a Minor Project — Computer Science Engineering*
