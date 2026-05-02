# IndiaVotes | Election Insights & Education 🗳️

IndiaVotes is a production-ready web platform designed to educate Indian citizens about the democratic process, from national Lok Sabha elections to local municipal polls. It combines real-time data accessibility with deep educational insights.

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

### ✅ Voter's Final Checklist
- Interactive checklist with a progress tracker to ensure you're ready for election day.

## Tech Stack
- **Frontend**: Vanilla HTML5, CSS3 (Glassmorphism UI), and JavaScript.
- **Deployment**: Docker, Nginx, Google Cloud Run.
- **Security**: Hardened Nginx configuration with CSP and X-Frame-Options.

## How to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/rahulramavat1/Election-process-education.git
   ```
2. Serve using any static server (e.g., `npx http-server ./`).

## License
Distributed under the MIT License. See `LICENSE` for more information.
