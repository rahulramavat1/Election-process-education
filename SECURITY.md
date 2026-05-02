# Security Policy

## Proactive Security Strategy
IndiaVotes prioritizes voter privacy and platform integrity. The following measures are implemented:

1.  **Content Security Policy (CSP)**: Strict CSP in `index.html` and `nginx.conf` prevents XSS and unauthorized data injection.
2.  **Infrastructure Hardening**: Running on Google Cloud Run with minimal privileges and no persisted local state.
3.  **Encapsulation**: Voter interaction data is handled purely on the client side; no sensitive PII is transmitted unless explicitly consented (e.g., to Google Services).
4.  **Static Analysis**: Codebase is regularly audited for insecure links (no `target="_blank"` without `rel="noopener"`).
5.  **Firebase App Check**: (Simulated) Integration with App Check to ensure only authorized clients can access election APIs.

## Reporting a Vulnerability
If you find a security issue, please open a GitHub Issue or contact the maintainers directly.
