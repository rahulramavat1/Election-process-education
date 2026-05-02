# IndiaVotes | Election Insights & Education 🗳️

IndiaVotes is a production-ready web platform designed to educate Indian citizens about the democratic process, from national Lok Sabha elections to local municipal polls. It combines real-time data accessibility with deep educational insights.

## 🎯 Challenge Details (#BuildWithAI)

### Chosen Vertical
**Civic Education & Voter Empowerment**
This project addresses the critical need to simplify the complex Indian electoral process for first-time and confused voters. By providing interactive, state-specific information and an AI-driven guide, the platform bridges the gap between civic duty and accessible technology.

### Approach and Logic
The solution is built around a **Context-Aware Voter Journey State Machine**. Instead of a simple Q&A bot, the integrated "Voter Mitra AI" tracks the user's progress through defined stages:
1. **Onboarding**: Determining intent.
2. **Eligibility Checking**: Validating age and citizenship.
3. **Registration**: Guiding through the Electoral Roll and EPIC card requirements.
4. **Verification**: Locating the polling booth.
This logical decision-making tree ensures that the assistant provides highly relevant, actionable advice tailored to the user's specific context.

### How the Solution Works
1. **Interactive Educational UI**: Users can explore the electoral timeline, understand the technology behind voting (EVM/VVPAT), and check requirements for their specific state assembly or the national Lok Sabha using the glassmorphism-styled dashboard.
2. **Voter Mitra AI**: A dynamic chat assistant (accessible via the floating action button) that uses the predefined state logic to converse with users and guide them toward voter readiness.
3. **Google Services Integration**: The application uses Firebase Analytics and App Check to securely track engagement telemetry without compromising user privacy.
4. **Lightweight Deployment**: Packaged in an ultra-slim multi-stage Docker build (`nginx:alpine-slim`), the repository remains well under the 10MB challenge limit and deploys instantly on Google Cloud Run.

### Assumptions Made
- **Real-Time Results Handoff**: We assume that displaying actual live polling data requires direct sourcing from the Election Commission of India (ECI) to prevent misinformation. Thus, the app uses official handoff links for live results.
- **AI Processing**: In a production environment, the frontend AI logic would be handled by a secure backend calling the Google Gemini API. For the scope of this static challenge submission, the AI decision-making logic is safely simulated client-side to demonstrate the persona and journey architecture without requiring backend billing setup.
- **Firebase Keys**: The Firebase configuration is included in the source for evaluation purposes only, assuming standard environment variable injection in a fully scaled production pipeline.

## Live Demo
🚀 **Deployed on Cloud Run**: [https://indiavotes-22955952304.us-central1.run.app](https://indiavotes-22955952304.us-central1.run.app)

## Key Features

### 🗺️ Comprehensive Election Data
- **State & National Insights**: Searchable dropdown covering all 28 States and 8 Union Territories.
- **Magic Numbers**: Know exactly how many seats are needed to form a government in each region.
- **Next Election Tracker**: Stay informed about upcoming electoral cycles.

### 🏛️ Official ECI Integration
- **Direct Live Links**: Instant handoff to the official [Election Commission of India Results Portal](https://results.eci.gov.in) for verified, real-time data.

### 🚶‍♂️ Polling Booth Experience
- A visual, step-by-step guide to what happens inside the polling station:
  1. Identity Verification.
  2. Indelible Ink.
  3. Register Signing.
  4. Casting the Secret Vote.

### 📟 EVM & VVPAT Guide
- Technical breakdown of the 3-unit voting system:
  - **Balloting Unit (BU)**: The input interface.
  - **VVPAT**: The paper-trail verification (7-second slip check).
  - **Control Unit (CU)**: The central recording brain.
- **Voter Mitra AI (Gemini Power)**: A context-aware assistant that guides users through their personalized "Voter Journey" using state-machine logic.
- **Interactive Tech Guide**: Deep dive into EVM (BU/CU) and VVPAT technical units.
- **Security First**: Implemented strict CSP, Secure Nginx headers, and proactive security policies.
- **Google Cloud Ecosystem**: Deployed on Cloud Run, integrated with Firebase Analytics for insight tracking.
- **Automated Testing**: Comprehensive E2E and Unit test suites ensuring platform reliability.

### ✅ Voter's Final Checklist
- Interactive checklist with a progress tracker to ensure you're ready for election day.

## 🛠️ Tech Stack
- **Frontend**: HTML5, Vanilla CSS3 (Glassmorphism), JavaScript (ES6+)
- **AI Intelligence**: Simulated Gemini Pro API Logic with Journey Tracking
- **Cloud Hosting**: Google Cloud Run
- **Monitoring**: Firebase Analytics
- **Security**: Nginx Hardening, CSP

## 🛡️ Security & Privacy
We implement a **Proactive Security Strategy**:
- **CSP**: `default-src 'self'` prevents unauthorized script execution.
- **Privacy**: No PII is stored; voter data is handled client-side.
- See [SECURITY.md](./SECURITY.md) for full details.

## 🧪 Testing Suite
To ensure a high-quality experience, we use automated tests:
- `tests/test_ai_logic.py`: Validates the state-machine and knowledge base.
- `tests/vibe_check.py`: E2E verification of UI components.
- Run via: `python tests/test_ai_logic.py`

## How to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/rahulramavat1/Election-process-education.git
   ```
2. Serve using any static server (e.g., `npx http-server ./`).

## License
Distributed under the MIT License. See `LICENSE` for more information.
