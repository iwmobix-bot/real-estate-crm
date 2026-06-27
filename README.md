# 🏠 Real Estate CRM

A modern Customer Relationship Management system for real estate agencies, built with React and TypeScript.

## ✨ Features

- **Dashboard** — Overview of key metrics and recent activity
- **Customers** — Manage buyers, sellers, tenants, and landlords
- **Properties** — Track properties with photos, details, and status
- **Contracts** — Manage sale and rent contracts with commission tracking
- **Reminders** — Schedule and track follow-up tasks
- **Reports** — Visual reports on properties, customers, and contracts
- **Bilingual** — Full Persian (FA) and English (EN) support
- **Data Persistence** — Data saved locally via localStorage

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Language | TypeScript |
| Build Tool | Vite 8 |
| Unit Testing | Vitest |
| E2E Testing | Playwright |
| Styling | Inline CSS |
| Storage | localStorage |

## 🚀 Getting Started

### Prerequisites
- Node.js v20.19+ or v22+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/iwmobix-bot/real-estate-crm.git

# Navigate to project directory
cd real-estate-crm

# Install dependencies
npm install --legacy-peer-deps

# Install Playwright browsers
npx playwright install chromium
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Default Login Credentials

| Username | Password | Role |
|----------|----------|------|
| admin | 1234 | Manager |
| agent | agent | Agent |

## 🧪 Testing

### Unit Tests (Vitest)

```bash
npm test
```

### E2E Tests (Playwright)

```bash
npm run test:e2e
```

### View E2E Test Report

```bash
npx playwright show-report
```

## 📁 Project Structure

```
real-estate-crm/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Entry point
│   └── setupTests.ts    # Test setup
├── tests/
│   ├── e2e/
│   │   ├── login.spec.ts
│   │   └── customer.spec.ts
│   ├── login.test.tsx
│   └── customer.test.tsx
├── playwright.config.ts
├── vite.config.ts
└── package.json
```

## 📸 Screenshots

> Login page, dashboard, and property management screens available in the app.

## 👨‍💻 Developer

Developed as a university term project.