# Saksham FLN — Jury Demonstration Runbook & Screen Recording Script

**Problem Statement ID:** PS000034  
**Project:** Saksham FLN (AI-Assisted Diagnostic & Adaptive Remedial Learning System)  
**Proposed Stakeholder:** Collector Office — Devbhumi Dwarka, Gujarat  
**Target Classrooms:** Standards 1 to 5 (FLN Foundational Stage)  
**Live Application URL:** [https://sakshamfln.vercel.app/](https://sakshamfln.vercel.app/)  
**Primary Demo Persona:** Teacher Asha Shah & Student Aarav Kumar (Standard 3 - Section A)  

---

## 1. Quick Technical Preparation

1. **Browser Recommended:** Google Chrome or Microsoft Edge at `1920 × 1080` resolution (100% zoom).
2. **Pristine State Guarantee:**
   - Before recording or presenting, click **"Reset Demo"** in the top green guide banner, or click the **Reset (↺)** button in the top navigation bar.
   - This purges local workspace mutations and restores the exact baseline data.
3. **Language Selection:** Default language is **English** for international juries; switch instantly to **ગુજરાતી (Gujarati)** or **हिन्दी (Hindi)** via the top language pill to demonstrate native Indic support.

---

## 2. 5-Minute Winning Pitch Narrative

| Timestamp | Screen | Narrative & Key Talking Points |
| :--- | :--- | :--- |
| **0:00 - 0:45** | Login & Overview | **The FLN Challenge:** In Devbhumi Dwarka, 1 in 3 primary students struggles with multi-digit operations not because of current syllabus difficulty, but due to unaddressed prerequisite gaps in early number sense. Saksham FLN is an offline-ready, explainable AI diagnostic tool that identifies root conceptual hurdles and provides 5-day tactile micro-pathways. |
| **0:45 - 1:30** | Teacher Dashboard | **Actionable Hierarchy:** Teachers see real-time cohort diagnostic coverage, students needing immediate support, and prioritized daily action queues—no complex data entry. |
| **1:30 - 2:30** | 1-on-1 Diagnostic | **Child-Friendly Screening:** Distraction-free assessment with single-question focus, localized audio reading (Gujarati/English), visual manipulatives, and reassuring encouraging prompts. |
| **2:30 - 3:30** | Explainable Diagnosis | **Pedagogical Explainability:** Clear distinction between *Accuracy* (60%) and *Evidence Coverage* (100%). Identifies specific misconception (bundling units into tens, GCERT LO-M304) with observational evidence. Not a black-box AI score. |
| **3:30 - 4:15** | 5-Day Remedial Pathway | **Teacher-in-the-Loop:** Adaptive schedule of concrete classroom manipulatives (drinking straws, base-10 mats). Teacher validates and signs off before activities begin. |
| **4:15 - 5:00** | Multi-Tier Governance | **District Alignment:** Instantly switch to District Education Officer (DEO) or Collectorate view to demonstrate taluka-level aggregation without teacher administrative burden. |

---

## 3. Step-by-Step Click-Through Demonstration

### Step 1: Role Preview Entry
- **URL:** `/login`
- **Actions:**
  1. Highlight the role selector card showing 6 pre-configured administrative profiles.
  2. Select **"Classroom Teacher (Class 3A)"** (Asha Shah).
  3. Click **"Explore Demo Workspace"** (or **Sign In**).
  4. Note that the application runs as a transparent, high-fidelity offline prototype without pretending to connect to fake authentication servers.

### Step 2: Teacher Dashboard
- **URL:** `/app/dashboard`
- **Visuals:** Notice the **"Calm Glass, Clear Learning"** glassmorphism card surfaces, frosted deep navy sidebar, and soft mint indicators.
- **Key Elements to Show:**
  1. **Demo Journey Guide Banner:** Shows Stage 2 of 8.
  2. **4 KPI Cards:** Enrolled Learners (28), Assessed (24), Active Pathways (17), and Milestones Signed Off (38).
  3. **Class FLN Milestone Completion Chart:** Weekly trend derived from actual student activities.
  4. **Learners Needing Immediate Support:** Highlights Aarav Kumar (Prerequisite: Bundling 10 units into 1 ten).
- **Action:** Click **"View profile"** on Aarav Kumar's card.

### Step 3: Student Dossier
- **Modal:** `StudentProfileModal` opens for Aarav Kumar.
- **Key Elements:**
  - Standard 3A, Roll #14, Asha Primary School.
  - Prerequisite Diagnosis: Confuses tens and ones when crossing decade boundaries.
  - Pedagogical observation notes from classroom circle time.
- **Action:** Click **"Start FLN Diagnostic"** (Primary CTA).

### Step 4: Child-Friendly Assessment Runner
- **Modal:** `AssessmentModal` opens in single-question mode.
- **Key Elements:**
  1. Top stepper with encouraging child prompts: *"Take your time and select your answer"*.
  2. **Language-Aware Audio:** Click **"સાંભળો / Listen"** to demonstrate text-to-speech reading the prompt aloud.
  3. **Clean Pre-fill:** Show that normal assessments start blank.
  4. **Jury Demo Shortcut:** Click **"⚡ Load Demo Scenario"** in the modal header.
     - Automatically pre-fills Aarav's characteristic responses:
       - Q1 (Matra Phonics): Correct (A)
       - Q2 (Sentence Decoding): Correct (A)
       - Q3 (Straw Bundling): Option B (Selected 6 straws instead of 24 — treated 10-bundle as single unit).
       - Q4 (Place Value Decomposition): Option B (Face value 4 instead of 40).
       - Q5 (Pebble Exchange): Correct (A).
- **Action:** Click **"Submit Screening (5/5)"** (or **Next** through questions).

### Step 5: Pedagogical Diagnostic Report
- **Modal:** `DiagnosticModal` opens with transparent mathematical and pedagogical proof.
- **Key Highlights for the Jury:**
  1. **Accuracy vs. Coverage:** Shows **60% Accuracy** on attempted items and **100% Evidence Coverage** (5/5 items). Unattempted items are never marked as failures.
  2. **Pedagogical Notice Banner:** Clearly educates that a *Probable Learning Gap* is a screening signal, whereas a *Validated Diagnosis* requires teacher confirmation.
  3. **Explainable Evidence:** Shows why Aarav chose Option B in Q3 (misconception: literal unit counting).
  4. **Interactive Validation:** Teacher can click the checkmark next to *Place Value Bundling* to validate the gap.
  5. **Direct Action Callout:** *"Start Day 1 Practice: Pencil & Straw Bundles (12 mins)"*.
- **Action:** Click **"Proceed to Remedial Plan"**.

### Step 6: 5-Day Remedial Pathway Approval
- **Modal:** `LearningPlanModal` displays the tailored 5-day GCERT-aligned sequence.
- **Schedule:**
  - Day 1 (Monday): Tactile Ten-Bundles (Straws and rubber bands).
  - Day 2 (Tuesday): Dual-Column Tens Mat (Base-10 tiles).
  - Day 3 (Wednesday): Decade Leap Partner Game (Pebble exchange).
  - Day 4 (Thursday): Expanded Form Cards (40 + 7 = 47).
  - Day 5 (Friday): Formative Mastery Check.
- **Action:** Enter teacher notes (e.g. *"Approved for morning foundational circle"*) and click **"Approve Learning Plan"**.

### Step 7: Guided Manipulative Activity Simulator
- **URL / Modal:** Opens `ActivityModal` for Day 1 Straw Bundles.
- **Interactive Simulation:**
  - Shows GCERT Class 3 LO-M304 curriculum mapping.
  - Teacher script in Gujarati and English: *"Ask Aarav: How many bundles of 10 do you need for 34? How many loose straws?"*
  - Formative teacher observation note is entered.
- **Action:** Click **"Mark Activity Complete"**.

### Step 8: Milestone Achievement & Dashboard Update
- **Celebration Banner:** Dashboard banner updates to Stage 8: *"Foundational Assessment & Remedial Cycle Complete"*.
- **Data Coherence:**
  - Milestones this week increases from 38 to 39.
  - Aarav's progress moves to 50%.
  - Status updates to *"Practising"*.
  - Activity is marked complete without duplicate counting.

---

## 4. Multi-Tier Governance & Role Switching

Showcase how district leadership benefits from this data without burdening classroom teachers:

1. **Open Header Role Switcher:**
   - Click the role dropdown in the header (currently showing *Teacher Asha Shah*).
2. **Switch to District Education Officer (DEO):**
   - Click **"DEO (Devbhumi Dwarka)"** or **"Collectorate Cell (Admin)"**.
   - The application seamlessly transitions to `/district/overview`.
   - Displays taluka-level aggregation across Khambhalia, Kalyanpur, Dwarka, and Bhanvad:
     - 412 primary schools.
     - 38,400 enrolled students.
     - 78% foundational literacy coverage, 71% foundational numeracy coverage.
     - Early warning alerts for schools needing resource deployment.
3. **Switch to Guardian Portal:**
   - In the role switcher, select **"Parent (Rameshbhai)"**.
   - Displays `/app/parent`:
     - Positive, non-stigmatizing progress view for Aarav.
     - 5-minute suggested home counting activity (spoons/counters) in Gujarati.

---

## 5. Technical Excellence Checklist for Evaluators

- [x] **Zero Remote CDNs:** 24 bundled WOFF2 font files in `public/fonts/` (Inter, Gujarati, Devanagari).
- [x] **Strict TypeScript:** Compiled without errors with `typescript.ignoreBuildErrors: false`.
- [x] **Next.js 16.4.3 App Router:** Fully optimized production standalone build.
- [x] **Offline Resilience:** Local sync queue for disconnected rural schools.
- [x] **Design Fidelity:** Custom glassmorphism system adhering to WCAG 2.1 AA accessibility contrast guidelines.
