# Saksham FLN — Known Technical Limitations & Future Roadmap

**Problem Statement:** PS000034  
**Project:** Saksham FLN Prototype  
**Scope:** Collector Office — Devbhumi Dwarka, Gujarat

This document provides transparent, honest technical disclosure regarding the current implementation boundary, assumptions, and future production roadmap.

---

## 1. Local-First Standalone Architecture vs. Central Cloud Endpoint

- **Current Implementation:**  
  Saksham FLN operates as a standalone local-first web application. All data mutations (student assessments, remedial plans, teacher actions, audit history) are durably stored in the client browser (`localStorage` and `IndexedDB`).
- **Honest Status:**  
  Currently, 0 remote cloud sync endpoints are configured. When evaluators open the *Device Synchronization & Offline State* drawer, the application honestly discloses:  
  `Storage Status: Device Storage Protected (IndexedDB)`  
  `Remote Cloud Endpoint: Not Configured (Standalone Prototype)`  
  No fake upload progress bars or simulated server syncs are used.
- **Production Roadmap:**  
  Integration with the Gujarat State Education Department's Command and Control Centre (Vidya Samiksha Kendra / VSK) using encrypted REST/GraphQL endpoints with exponential backoff offline replay.

---

## 2. Browser Web Speech Synthesis Dependency

- **Current Implementation:**  
  Read-aloud questions and teacher scripts utilize the browser's native Web Speech API (`window.speechSynthesis`).
- **Hardware/Browser Variance:**  
  The availability and naturalness of Indic voices (`gu-IN` for Gujarati, `hi-IN` for Hindi) depend on the client operating system and browser:
  - On Chromium on Android and modern Windows 11, high-quality Gujarati and Hindi neural voices are available.
  - On platforms where native Indic TTS voices are not installed, the application automatically detects the missing voice and reveals the **Visual Audio Transcript Drawer**, ensuring learners are never blocked.
- **Production Roadmap:**  
  Bundle lightweight on-device pre-recorded audio MP3s for all diagnostic items, eliminating reliance on OS-level TTS engines.

---

## 3. Initial Micro-Competency Question Bank Scope

- **Current Implementation:**  
  The interactive screening runner currently includes 5 core foundational micro-competencies:
  1. Gujarati Matra & Phonics (`guj-matra`)
  2. Gujarati Sentence Comprehension (`guj-comprehension`)
  3. Tens Bundling & Concrete Units (`num-bundling`)
  4. Number Decomposition & Expanded Form (`num-decomposition`)
  5. Regrouping Intuition & Decade Exchange (`num-regrouping`)
- **Limitation:**  
  While the curriculum skill graph models Standards 1 to 8, the automated question runner focuses on the primary Class 2–4 foundational transition zone, which represents the highest failure concentration in Devbhumi Dwarka district screening.
- **Production Roadmap:**  
  Expand the question bank to cover all 42 micro-competencies defined in the GCERT Foundational Learning Outcomes framework.

---

## 4. Multi-Tenant School Authentication

- **Current Implementation:**  
  Authentication uses client-side simulated role contexts (Teacher, Head Teacher, CRC Coordinator, DEO, Parent) to enable instant, frictionless evaluation without requiring credential sign-ups during hackathon judging.
- **Production Roadmap:**  
  Integration with Gujarat SSA (Samagra Shiksha Abhiyan) Aadhaar-based teacher single sign-on (SSO) and role-based access control (RBAC).
