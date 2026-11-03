<div align="center">

# 🌟 Saksham FLN
### AI-Assisted Diagnostic & Adaptive Remedial Learning System

**Problem ID:** PS000034 · **Sector:** Education Technology  
**Proposed Stakeholder:** Collector Office — Devbhumi Dwarka, Gujarat, India  
**Target Beneficiaries:** Primary School Students (Standards 1–8), Teachers, Headmasters & Education Administrators

<br/>

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-sakshamfln.vercel.app-0D9488?style=for-the-badge&logo=vercel&logoColor=white)](https://sakshamfln.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/Code-GitHub-17324D?style=for-the-badge&logo=github&logoColor=white)](https://github.com/shreyanshio/saksham-fln)

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-000000?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 🎯 The Problem

In rural primary and upper-primary government schools (such as in Devbhumi Dwarka), educators face deep structural challenges in achieving Foundational Literacy and Numeracy (FLN):

1. **Hidden Prerequisite Gaps**: Standard exams assign students a blunt "fail" or a raw score (e.g., 35%) without revealing *why* the student failed. A child failing two-digit addition often hasn't mastered place-value bundling—a prerequisite concept invisible in traditional marks.
2. **Teacher Workload & Limited Time**: Teachers manage multi-level classrooms of 30+ students and lack automated tools to plan tailored remedial interventions.
3. **Connectivity Fragility**: Many village schools suffer from intermittent or non-existent internet, rendering conventional cloud-heavy platforms unusable.
4. **Stigmatization & Public Ranking**: Comparative league tables and student rankings demotivate young learners rather than supporting incremental growth.
5. **Language & Script Barriers**: Most ed-tech tools are English-centric and fail to render vernacular Indic scripts (Gujarati/Hindi) accurately without clipping matras and conjuncts.

---

## 💡 The Solution

**Saksham FLN** is a lightweight, offline-resilient, teacher-first learning support system that turns quick classroom screenings into targeted, actionable 5-day remedial learning pathways:

- **Root-Cause Diagnosis Over Marks**: Traverses a curriculum prerequisite skill graph to isolate the exact missing conceptual building block.
- **Actionable 5-Day Micro-Pathways**: Automatically generates short (10–15 min/day) tactile classroom activities using everyday physical manipulatives (straws, pebble grids, number cards).
- **Zero-Stigma Pedagogy**: Replaces "Pass/Fail" with constructive descriptors (*Demonstrated*, *Developing*, *Needs Support*) and longitudinal milestone tracking.
- **Offline-First Resilience**: All assessments, student records, and teacher actions persist locally and sync automatically when internet is available.
- **Native Indic Typography**: Bundles 24 self-hosted WOFF2 fonts for authentic, instant Gujarati and Hindi rendering with zero layout shift (CLS = 0).

---

## ✨ Key Features

### 1. 🔍 Prerequisite-Level Diagnostic Assessments
- Child-friendly, distraction-free **one-question-per-screen** runner.
- **Audio prompt support** (text-to-speech) for emergent readers and non-literate learners.
- Differentiates between a confirmed misconception, an active practice gap, and insufficient evidence.

### 2. 📋 Adaptive 5-Day Remedial Learning Pathways
- Micro-intervention schedules designed for daily 10–15 minute classroom slots.
- Focuses on concrete, low-cost manipulatives (bundling sticks, 10s-frame grids, bead strings).
- One-click teacher review and sign-off that immediately updates the student's learning trajectory.

### 3. 📊 Teacher & Classroom Workspace
- **Class Roster & Directory**: Filter by Standard (1–8), Section, and language medium.
- **Longitudinal Milestone Tracker**: Celebrates student growth over time rather than penalizing early diagnostic attempts.
- **Daily Prioritized Action Queue**: Tells teachers exactly who needs support and what activity to run today.

### 4. 🌐 Native Multilingual Support (English · ગુજરાતી · हिन्दी)
- Instant one-click language switching across the entire platform.
- Bundled authentic **Noto Sans Gujarati**, **Noto Sans Devanagari**, and **Inter** fonts.
- Tested and calibrated for Indic diacritics (matras and conjuncts) without vertical clipping.

### 5. 📴 Offline-Aware Architecture & Synchronization
- Local-first architecture using indexed browser persistence (`saksham_fln_*`).
- Interactive offline simulation drawer allowing evaluators to disconnect the network with a single toggle.
- Background sync queue that stages and replays pending mutations upon reconnect.

### 6. 🏛️ Multi-Perspective Role Views
- **Teacher View**: Individual student diagnostic dossier and daily classroom plans.
- **Headmaster & Cluster (CRC/BRC) View**: Aggregate cohort FLN coverage without punitive school rankings.
- **Guardian / Parent Portal**: 5-minute home learning suggestions in Gujarati and Hindi requiring zero digital literacy.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16.4.3 (App Router, Standalone Output) |
| **Language** | TypeScript 5.7 |
| **Styling** | Tailwind CSS v4 with WCAG 2.1 AA accessible color tokens |
| **Typography** | 24 self-hosted static WOFF2 font assets (Inter, Noto Sans Gujarati, Noto Sans Devanagari) |
| **State & Storage** | Local-first modular persistence layer with offline mutation staging |
| **Icons & UI** | Lucide React |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/shreyanshio/saksham-fln.git
cd saksham-fln

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

This project is licensed under the MIT License. See [`LICENSE`](LICENSE) for details.
