'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Menu,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  X,
  Volume2,
  Play,
  Layers,
  Cpu,
  Users,
  WifiOff,
  FileText,
  BarChart3,
  Compass,
  HeartHandshake,
  Award,
  School,
  Globe,
  Languages,
  Activity,
  Check,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n/context'
import { LanguageSelector } from '@/components/language-selector'

/**
 * Editorial Content Dictionary for the Saksham FLN Elite Pre-Login Homepage.
 * Supports trilingual rendering (en, gu, hi) matching NIPUN Bharat & GCERT terminology.
 */
const HOME_CONTENT = {
  en: {
    banner: 'Problem ID: PS000034 · Collector Office, Devbhumi Dwarka · AI-Powered Diagnostic & Adaptive FLN Remediation',
    nav: {
      theProblem: 'The Problem',
      ourApproach: 'Our Approach',
      features: 'Features',
      workflow: 'Workflow',
      multilingual: 'Multilingual',
      impact: 'Impact',
      signIn: 'Sign In',
      openWorkspace: 'Open Workspace',
    },
    hero: {
      eyebrow: 'PS000034 / EDUCATION TECHNOLOGY · Collector Office · Devbhumi Dwarka',
      headlineStart: 'Every learner is different. Their',
      headlineHighlight: 'learning path',
      headlineEnd: 'should be too.',
      description:
        'Saksham FLN gives educators, school leaders, and district mentors an AI-powered diagnostic and adaptive remedial platform — eliminating guesswork, isolating foundational prerequisite deficits, and turning classroom insights into immediate action.',
      primaryCta: 'Explore Saksham FLN',
      secondaryCta: 'Open Teacher Workspace',
      seeHowItWorks: 'See How It Works',
      trustBadges: [
        'Voice-Assisted Diagnostics (Gujarati · Hindi · English)',
        'Teacher-Guided Tactile Remediation',
        '100% Offline-First Local Storage',
      ],
    },
    mockup: {
      windowTitle: 'Devbhumi Dwarka · Class 3A Diagnostic Overview',
      sampleTag: 'ILLUSTRATIVE SAMPLE',
      metrics: [
        { label: 'Total Students', value: '1,248', change: '+3.2%', note: 'across 4 schools' },
        { label: 'Attendance Rate', value: '94.2%', change: '+1.8%', note: 'regular engagement' },
        { label: 'FLN On-Track', value: '78%', change: '+5.4%', note: 'mastered baseline' },
        { label: 'Remediation Queue', value: '156', change: '-8%', note: 'active MTSS Tier 2' },
      ],
      progressTitle: 'Student Progress Trends',
      progressRange: 'Last 6 weeks',
      needsAttentionTitle: 'Students Needing Attention',
      students: [
        {
          initials: 'AK',
          name: 'Aarav K.',
          grade: '3rd Grade',
          deficit: 'Place Value & 2-Digit Regrouping Deficit',
          status: 'Remedial Active',
          color: 'amber',
        },
        {
          initials: 'PM',
          name: 'Pooja M.',
          grade: '4th Grade',
          deficit: 'Phonemic Blending & Matra Discrimination',
          status: 'Phonics Support',
          color: 'teal',
        },
        {
          initials: 'KS',
          name: 'Kabir S.',
          grade: '3rd Grade',
          deficit: '2-Digit Subtraction with Borrowing',
          status: 'MTSS Tier 2',
          color: 'indigo',
        },
      ],
      floatingSignal: {
        title: 'Early Signal',
        stat: '23',
        description: 'students flagged for prerequisite review this week',
      },
      floatingPathway: {
        tag: 'MTSS Tier 2',
        title: '12-Min Daily Pathway',
        description: 'Bundle & Build tactile counters assigned',
      },
    },
    problems: {
      eyebrow: '02 · THE CLASSROOM REALITY',
      title: 'Problems & Solutions',
      subtitle: 'A classroom may have one teacher, but every child has a different learning need.',
      items: [
        {
          stat: '68%',
          description:
            'Students struggle with higher-grade arithmetic and reading because foundational prerequisite gaps (like phonemic blending and place value) remain unaddressed.',
          source: 'From ASER & NAS Findings',
        },
        {
          stat: '40:1',
          description:
            'High pupil-teacher ratios prevent educators from diagnosing individual learning deficits during standard 40-minute classroom periods.',
          source: 'From Gujarat Classroom Field Studies',
        },
        {
          stat: '57%',
          description:
            'Struggling learners disengage silently and face conventional grading stigma without targeted early-warning intervention and personalized support.',
          source: 'From Teacher & CRC Consultations',
        },
      ],
      solutions: [
        {
          title: 'Root-Prerequisite Diagnostic Engine',
          description:
            'Isolates underlying conceptual deficits (e.g. diagnosing place-value failure before re-testing subtraction) rather than repeating failed grade-level tests.',
          icon: Target,
        },
        {
          title: 'Automated 12-Minute Remedial Plans',
          description:
            'Generates ready-to-teach tactile flashcards, printable worksheets, and phonics tasks tailored to each child without extra teacher preparation.',
          icon: Sparkles,
        },
        {
          title: 'Non-Stigmatizing Milestone Growth Tracking',
          description:
            'Replaces public ranking with private mastery levels, visual progress badges, and automated multilingual alerts for parents and mentors.',
          icon: HeartHandshake,
        },
      ],
    },
    approach: {
      eyebrow: 'INTRODUCING SAKSHAM FLN',
      title: 'From identifying a learning gap to taking the right next step.',
      subtitle:
        'A continuous, dignified six-stage pedagogical cycle designed to uplift slow learners without disrupting regular classroom instruction.',
      stages: [
        {
          number: '01',
          name: 'Identify',
          title: 'Universal Non-Intrusive Screening',
          description: 'Observe baseline participation and oral fluency without creating testing pressure or anxiety.',
        },
        {
          number: '02',
          name: 'Assess',
          title: '5-Minute Multimodal Diagnostic',
          description: 'Interactive voice, touch, and visual micro-tasks in Gujarati, Hindi, or English.',
        },
        {
          number: '03',
          name: 'Understand',
          title: 'Root-Skill Prerequisite Graph',
          description: 'The AI maps errors against foundational concept trees to isolate the root prerequisite gap.',
        },
        {
          number: '04',
          name: 'Personalize',
          title: '12-Minute Daily Action Plan',
          description: 'Automated micro-lessons, gamified practice, and targeted exercises aligned with GCERT standards.',
        },
        {
          number: '05',
          name: 'Support',
          title: 'Teacher-Led Tactile Remediation',
          description: 'Classroom kits with concrete manipulatives, bundle sticks, and printable 1-page worksheets.',
        },
        {
          number: '06',
          name: 'Monitor',
          title: 'Multi-Tier Cluster & District Sync',
          description: 'Longitudinal growth tracking connecting the classroom teacher, Head Teacher, CRC, and DEO.',
        },
      ],
    },
    features: {
      eyebrow: 'CORE CAPABILITIES',
      title: 'Engineered specifically for rural and semi-urban classrooms.',
      subtitle: 'Modern software architecture tuned for the actual working conditions of primary teachers.',
      list: [
        {
          title: 'Diagnostic Micro-Assessments',
          subtitle: 'No test anxiety. Real diagnostic signal.',
          description:
            'Non-intrusive 5-minute evaluations assess oral fluency, phonemic awareness, place value, and basic operations with instant formative scoring.',
          icon: Target,
          tag: 'Non-Intrusive',
        },
        {
          title: 'Root-Skill Prerequisite Graph',
          subtitle: 'Tracing backwards to the true learning bottleneck.',
          description:
            'When a child fails two-digit subtraction with regrouping, Saksham does not repeat subtraction drills — it evaluates place-value bundling first.',
          icon: Cpu,
          tag: 'Explainable AI',
        },
        {
          title: 'Adaptive Weekly Action Plans',
          subtitle: '12 minutes a day. Zero teacher paperwork.',
          description:
            'Generates sequenced micro-pathways with 3 actionable steps per week, tailored to whether remediation is teacher-led, peer-assisted, or self-paced.',
          icon: Layers,
          tag: 'Classroom Ready',
        },
        {
          title: 'Multimodal Learning Lab & Worksheets',
          subtitle: 'Interactive audio, visual cards & printable PDF materials.',
          description:
            'Includes voice-guided phonics, animated letter-tracing, tactile bundle-counters, and one-click printable worksheets for low-tech environments.',
          icon: FileText,
          tag: 'Multimodal',
        },
        {
          title: 'Voice-Assisted Indic Multilingual',
          subtitle: 'Authentic Gujarati, Hindi & English audio.',
          description:
            'Native speech synthesis and phoneme pronunciation models ensure children are tested on conceptual understanding, not language barriers.',
          icon: Volume2,
          tag: 'Trilingual',
        },
        {
          title: 'Multi-Tier Governance Portal',
          subtitle: 'From classroom to District Collectorate.',
          description:
            'Granular data flow connecting Teachers, Head Teachers, Cluster Resource Centre (CRC) Coordinators, BRCs, and District Education Officers.',
          icon: BarChart3,
          tag: 'School-to-District',
        },
        {
          title: '100% Offline-First Architecture',
          subtitle: 'Runs completely without internet connectivity.',
          description:
            'Built on IndexedDB local-first storage. Assessments, remedial plans, and logs work offline and synchronize smoothly when network is restored.',
          icon: WifiOff,
          tag: 'Offline Resilience',
        },
      ],
    },
    workflow: {
      eyebrow: 'HOW IT WORKS',
      title: 'One connected journey. From gap identification to learning recovery.',
      subtitle: 'A transparent 5-step loop connecting student practice, teacher guidance, and district visibility.',
      steps: [
        {
          step: '01',
          title: 'Initiate 5-Min Diagnostic',
          detail: 'Teacher or child starts a voice-assisted micro-assessment during regular classroom or remedial hour.',
        },
        {
          step: '02',
          title: 'Graph Isolates Prerequisite Gap',
          detail: 'The engine traces errors to determine if the deficit is phonemic, positional place value, or operation-based.',
        },
        {
          step: '03',
          title: 'Automated 12-Min Plan Formulated',
          detail: 'An adaptive weekly remedial pathway is assembled with tactile instructions and printable worksheets.',
        },
        {
          step: '04',
          title: 'Classroom Teacher Delivers Remediation',
          detail: 'Teacher executes structured 10-to-12 minute tactile activities with concrete manipulatives and peers.',
        },
        {
          step: '05',
          title: 'Mastery Validated & Synced Locally',
          detail: 'Formative reassessment confirms prerequisite mastery; local storage updates and syncs to cluster portal.',
        },
      ],
    },
    multilingual: {
      eyebrow: 'INCLUSIVE PEDAGOGY',
      title: 'Learning should speak the child’s native language.',
      subtitle: 'Native Indic font rendering and speech synthesis designed specifically for Gujarat schools.',
      languages: [
        {
          code: 'gu',
          name: 'ગુજરાતી (Gujarati)',
          script: 'Noto Sans Gujarati',
          sample: 'સ્થાનકિંમત અને દશકના જૂથ બનાવવાની પ્રવૃત્તિ',
          subtext: 'GCERT પ્રાથમિક અભ્યાસક્રમ મુજબ સંપૂર્ણ સ્થાનિકીકરણ અને અવાજ સહાય.',
          audioText: 'સ્થાનકિંમત અને દશકના જૂથ બનાવવાની પ્રવૃત્તિ',
        },
        {
          code: 'hi',
          name: 'हिन्दी (Hindi)',
          script: 'Noto Sans Devanagari',
          sample: 'ध्वनि संज्ञान और अक्षरों को मिलाकर शब्द पढ़ना',
          subtext: 'निपुण भारत FLN दिशानिर्देशों के अनुरूप भाषा और गणितीय बुनियादी कार्य।',
          audioText: 'ध्वनि संज्ञान और अक्षरों को मिलाकर शब्द पढ़ना',
        },
        {
          code: 'en',
          name: 'English (General)',
          script: 'Inter Sans',
          sample: 'Foundational phonics, number sense and story comprehension',
          subtext: 'Standardized foundational literacy and numeracy diagnostics for primary learners.',
          audioText: 'Foundational phonics, number sense and story comprehension',
        },
      ],
    },
    ecosystem: {
      eyebrow: 'WHO IT SERVES',
      title: 'Empowering every stakeholder across the educational ecosystem.',
      subtitle: 'Tailored interfaces and relevant insights designed for each role.',
      roles: [
        {
          title: 'Students (Grades 1–8)',
          description: 'Experience joyful, gamified micro-tasks without anxiety, fear of failure, or public ranking.',
          icon: Sparkles,
        },
        {
          title: 'Classroom Teachers',
          description: 'Save 4+ hours per week with automated diagnostics, ready lesson plans, and printable kits.',
          icon: GraduationCap,
        },
        {
          title: 'Head Teachers',
          description: 'Gain real-time class-by-class FLN health heatmaps and track teacher remedial support efforts.',
          icon: School,
        },
        {
          title: 'CRC & BRC Coordinators',
          description: 'Conduct evidence-based school visits with cluster-level aggregated skill deficit dashboards.',
          icon: Compass,
        },
        {
          title: 'Parents & Guardians',
          description: 'Receive simplified, transparent progress summaries in Gujarati or Hindi without confusing scores.',
          icon: Users,
        },
        {
          title: 'District Administration (DEO)',
          description: 'Direct remedial grants, specialist mentors, and learning materials where evidence shows greatest need.',
          icon: Award,
        },
      ],
    },
    impact: {
      eyebrow: 'EVIDENCE & OUTCOMES',
      title: 'Measure learning progress. Not a child’s worth.',
      subtitle: 'Projected pedagogical and administrative outcomes based on FLN remediation field models.',
      stats: [
        {
          value: '64%',
          label: 'Diagnostic Overhead Reduction',
          note: 'Replaces manual paperwork with 5-minute automated micro-screenings.',
        },
        {
          value: '42%',
          label: 'Faster Prerequisite Recovery',
          note: 'Targeting root sub-skills accelerates return to grade-level competence.',
        },
        {
          value: '100%',
          label: 'Offline Availability',
          note: 'Full local data persistence ensures uninterrupted operation in rural areas.',
        },
        {
          value: '3',
          label: 'Native Indic Languages',
          note: 'Complete Gujarati, Hindi, and English support across all modules.',
        },
      ],
    },
    cta: {
      title: 'Let’s make the next learning step clearer for every child.',
      subtitle:
        'Built for the schools of Devbhumi Dwarka under Hackathon Problem Statement PS000034. Explore the live interactive workspace now.',
      buttonPrimary: 'Open Teacher Workspace',
      buttonSecondary: 'Explore Diagnostic Demo',
    },
    footer: {
      problemStatement: 'Problem ID: PS000034 · AI-Powered Diagnostic & Adaptive Remedial Learning System for Slow Learners and Struggling Students',
      stakeholder: 'Collector Office — Devbhumi Dwarka, Gujarat · Education Technology Sector',
      compliance: 'Aligned with GCERT primary curriculum guidelines and NIPUN Bharat Foundational Literacy and Numeracy goals.',
      openSource: 'Open-source prototype built for SFIC Hackathon 2026. MIT License.',
      links: [
        { label: 'The Problem', href: '#problems-solutions' },
        { label: 'Approach', href: '#approach' },
        { label: 'Features', href: '#features' },
        { label: 'Workflow', href: '#workflow' },
        { label: 'Multilingual', href: '#multilingual' },
        { label: 'Impact', href: '#impact' },
      ],
    },
  },
  gu: {
    banner: 'સમસ્યા ક્રમાંક: PS000034 · કલેક્ટર કચેરી, દેવભૂમિ દ્વારકા · AI-આધારિત પાયાના શિક્ષણ નિદાન અને સુધારાત્મક ઉપચાર',
    nav: {
      theProblem: 'સમસ્યા',
      ourApproach: 'અમારો અભિગમ',
      features: 'વિશેષતાઓ',
      workflow: 'કાર્યપદ્ધતિ',
      multilingual: 'બહુભાષી',
      impact: 'અસરકારકતા',
      signIn: 'પ્રવેશ કરો',
      openWorkspace: 'વર્કસ્પેસ ખોલો',
    },
    hero: {
      eyebrow: 'PS000034 / શિક્ષણ ટેકનોલોજી · કલેક્ટર કચેરી · દેવભૂમિ દ્વારકા',
      headlineStart: 'દરેક વિદ્યાર્થી અલગ છે. તેમની',
      headlineHighlight: 'શીખવાની યાત્રા',
      headlineEnd: 'પણ વિશેષ હોવી જોઈએ.',
      description:
        'સક્ષમ FLN શિક્ષકો, શાળા સંચાલકો અને માર્ગદર્શકોને AI-આધારિત નિદાન અને સુધારાત્મક શિક્ષણ પ્લેટફોર્મ પૂરું પાડે છે — પાયાના ખ્યાલોની ખામીઓ ઓળખે છે અને વર્ગખંડના શિક્ષણને પરિણામોન્મુખ બનાવે છે.',
      primaryCta: 'સક્ષમ FLN અન્વેષણ કરો',
      secondaryCta: 'શિક્ષક વર્કસ્પેસ ખોલો',
      seeHowItWorks: 'કેવી રીતે કાર્ય કરે છે',
      trustBadges: [
        'અવાજ-સહાયિત નિદાન (ગુજરાતી · હિન્દી · અંગ્રેજી)',
        'શિક્ષક-માર્ગદર્શિત વ્યવહારુ ઉપચાર',
        '૧૦૦% ઑફલાઇન સ્થાનિક સ્ટોરેજ',
      ],
    },
    mockup: {
      windowTitle: 'દેવભૂમિ દ્વારકા · ધોરણ ૩A નિદાન વિહંગાવલોકન',
      sampleTag: 'પ્રાયોગિક નમૂનો',
      metrics: [
        { label: 'કુલ વિદ્યાર્થીઓ', value: '૧,૨૪૮', change: '+૩.૨%', note: '૪ શાળાઓમાં' },
        { label: 'હાજરી દર', value: '૯૪.૨%', change: '+૧.૮%', note: 'નિયમિત સક્રિયતા' },
        { label: 'FLN લક્ષ્ય સિદ્ધિ', value: '૭૮%', change: '+૫.૪%', note: 'પાયાનું સ્તર સફળ' },
        { label: 'સુધારાત્મક કતાર', value: '૧૫૬', change: '-૮%', note: 'MTSS સ્તર ૨' },
      ],
      progressTitle: 'વિદ્યાર્થી પ્રગતિ વલણ',
      progressRange: 'છેલ્લા ૬ અઠવાડિયા',
      needsAttentionTitle: 'વિશેષ ધ્યાનની જરૂર ધરાવતા બાળકો',
      students: [
        {
          initials: 'આકે',
          name: 'આરવ કે.',
          grade: 'ધોરણ ૩',
          deficit: 'સ્થાનકિંમત અને દશકના જૂથની ખામી',
          status: 'ઉપચાર સક્રિય',
          color: 'amber',
        },
        {
          initials: 'પીએમ',
          name: 'પૂજા એમ.',
          grade: 'ધોરણ ૪',
          deficit: 'ધ્વનિ સંયોજન અને માત્રા ઓળખ',
          status: 'ફોનિક્સ સહાય',
          color: 'teal',
        },
        {
          initials: 'કેએસ',
          name: 'કબીર એસ.',
          grade: 'ધોરણ ૩',
          deficit: 'વદ્દીવાળી બે-અંકની બાદબાકી',
          status: 'સ્તર ૨ સહાય',
          color: 'indigo',
        },
      ],
      floatingSignal: {
        title: 'પ્રારંભિક સંકેત',
        stat: '૨૩',
        description: 'વિદ્યાર્થીઓને આ અઠવાડિયે પાયાની સમીક્ષા માટે ચિહ્નિત કરાયા',
      },
      floatingPathway: {
        tag: 'MTSS સ્તર ૨',
        title: '૧૨-મિનિટ દૈનિક માર્ગ',
        description: 'મૂર્ત ગણતરી સામગ્રી સોંપવામાં આવી',
      },
    },
    problems: {
      eyebrow: '૦૨ · વર્ગખંડની વાસ્તવિકતા',
      title: 'સમસ્યાઓ અને સમાધાન',
      subtitle: 'વર્ગખંડમાં શિક્ષક એક હોય છે, પરંતુ દરેક બાળકની શીખવાની જરૂરિયાત અલગ હોય છે.',
      items: [
        {
          stat: '૬૮%',
          description:
            'ઉચ્ચ ધોરણના ગણિત અને વાંચનમાં બાળકો અટકે છે કારણ કે પાયાના ખ્યાલો (જેમ કે સ્થાનકિંમત અથવા અક્ષરધ્વનિ) વણઉકેલાયેલા રહી જાય છે.',
          source: 'ASER અને NAS અહેવાલ મુજબ',
        },
        {
          stat: '૪૦:૧',
          description:
            'મોટા વર્ગખંડમાં ૪૦ મિનિટના તાસમાં શિક્ષક માટે દરેક બાળકનું વ્યક્તિગત નિદાન કરવું અત્યંત મુશ્કેલ બને છે.',
          source: 'ગુજરાત વર્ગખંડ અભ્યાસ મુજબ',
        },
        {
          stat: '૫૭%',
          description:
            'નબળા વિદ્યાર્થીઓ પરંપરાગત પરીક્ષાના ડરથી ચૂપચાપ પાછળ રહી જાય છે, જ્યાં સુધી સમયસર સંકેત ન મળે.',
          source: 'શિક્ષક અને સીઆરસી પરામર્શ મુજબ',
        },
      ],
      solutions: [
        {
          title: 'મૂળ ખ્યાલ નિદાન એન્જિન',
          description:
            'બાળક બાદબાકીમાં ભૂલ કરે ત્યારે માત્ર બાદબાકીનું પુનરાવર્તન કરાવવાને બદલે સ્થાનકિંમતની મૂળ ખામી શોધી કાઢે છે.',
          icon: Target,
        },
        {
          title: 'સ્વચાલિત ૧૨-મિનિટ ઉપચાર યોજના',
          description:
            'શિક્ષક પર વધારાનો ભાર મૂક્યા વિના તૈયાર ફ્લેશકાર્ડ, વર્કશીટ અને ધ્વનિ પ્રવૃત્તિઓ પૂરી પાડે છે.',
          icon: Sparkles,
        },
        {
          title: 'તણાવમુક્ત પ્રગતિ ટ્રેકિંગ',
          description:
            'ક્રમાંક કે સરખામણીને બદલે વ્યક્તિગત ક્ષમતા સ્તર અને માતાપિતા માટે સરળ પ્રગતિ વિગતો પ્રદર્શિત કરે છે.',
          icon: HeartHandshake,
        },
      ],
    },
    approach: {
      eyebrow: 'સક્ષમ FLN પરિચય',
      title: 'પાયાની ખામી ઓળખવાથી લઈને યોગ્ય પગલું ભરવા સુધી.',
      subtitle: 'વર્ગખંડના દૈનિક કાર્યમાં ખલેલ પહોંચાડ્યા વિના ધીમા શીખનારા બાળકોને આગળ લાવવા માટે ૬ તબક્કાની પ્રક્રિયા.',
      stages: [
        {
          number: '૦૧',
          name: 'ઓળખ',
          title: 'સહજ વર્ગખંડ સ્ક્રિનિંગ',
          description: 'કોઈપણ પરીક્ષાના દબાણ વગર બાળકની ભાગીદારી અને મૌખિક પ્રવાહિતાનું નિરીક્ષણ.',
        },
        {
          number: '૦૨',
          name: 'મૂલ્યાંકન',
          title: '૫-મિનિટ મલ્ટીમોડલ નિદાન',
          description: 'ગુજરાતી, હિન્દી કે અંગ્રેજીમાં અવાજ અને સ્પર્શ આધારિત સરળ માઇક્રો-ટાસ્ક.',
        },
        {
          number: '૦૩',
          name: 'સમજ',
          title: 'મૂળ-કૌશલ્ય પૂર્વશરત ગ્રાફ',
          description: 'AI ભૂલોનું વિશ્લેષણ કરી કયો પાયાનો ખ્યાલ ખૂટે છે તે ચોક્કસ રીતે દર્શાવે છે.',
        },
        {
          number: '૦૪',
          name: 'વૈયક્તિકરણ',
          title: '૧૨-મિનિટ દૈનિક યોજના',
          description: 'GCERT અભ્યાસક્રમ સાથે સુસંગત નાના પાઠ અને રમત-આધારિત પ્રવૃત્તિઓનું આયોજન.',
        },
        {
          number: '૦૫',
          name: 'સહાય',
          title: 'મૂર્ત વસ્તુઓ સાથે પ્રત્યક્ષ શિક્ષણ',
          description: 'મણકા, સળીઓ અને છાપી શકાય તેવી સરળ ૧-પાનાની વર્કશીટ સાથે શિક્ષણ.',
        },
        {
          number: '૦૬',
          name: 'દેખરેખ',
          title: 'શાળાથી જિલ્લા સ્તર સુધી સંકલન',
          description: 'શિક્ષક, મુખ્ય શિક્ષક, CRC અને DEO માટે પારદર્શક પ્રગતિ પત્રક.',
        },
      ],
    },
    features: {
      eyebrow: 'મુખ્ય ક્ષમતાઓ',
      title: 'ગ્રામીણ અને અર્ધ-શહેરી શાળાઓ માટે વિશેષ રચાયેલ.',
      subtitle: 'પ્રાથમિક શિક્ષકોની વાસ્તવિક પરિસ્થિતિઓને ધ્યાનમાં રાખીને બનાવેલ આધુનિક સોફ્ટવેર.',
      list: [
        {
          title: 'નિદાનલક્ષી માઇક્રો-મૂલ્યાંકન',
          subtitle: 'પરીક્ષાનો ડર નહીં. સાચું શૈક્ષણિક નિદાન.',
          description: '૫ મિનિટમાં મૌખિક પ્રવાહિતા, ધ્વનિ ઓળખ, સ્થાનકિંમત અને પાયાની ગણતરીનું તાત્કાલિક પરિણામ.',
          icon: Target,
          tag: 'તણાવમુક્ત',
        },
        {
          title: 'મૂળ પૂર્વશરત કૌશલ્ય ગ્રાફ',
          subtitle: 'ભૂલના મૂળ સુધી પહોંચતી તપાસ.',
          description: 'જો બાળક વદ્દીવાળી બાદબાકી ન કરી શકે, તો સક્ષમ પહેલા તેની સ્થાનકિંમતની ક્ષમતા ચકાસે છે.',
          icon: Cpu,
          tag: 'સમજૂતીસભર AI',
        },
        {
          title: 'અનુકૂલનશીલ સાપ્તાહિક યોજના',
          subtitle: 'રોજના ૧૨ મિનિટ. કાગળકામથી મુક્તિ.',
          description: 'શિક્ષક-માર્ગદર્શિત કે જૂથ કાર્ય માટે દર અઠવાડિયે ૩ સ્પષ્ટ પગલાં સૂચવે છે.',
          icon: Layers,
          tag: 'વર્ગખંડ ઉપયોગી',
        },
        {
          title: 'મલ્ટીમોડલ લર્નિંગ લેબ અને વર્કશીટ',
          subtitle: 'ઓડિયો, વિઝ્યુઅલ કાર્ડ અને છાપવા યોગ્ય પીડીએફ.',
          description: 'અવાજ માર્ગદર્શન, અક્ષર લેખન, ગણતરી મણકા અને એક-ક્લિક પ્રિન્ટ યોગ્ય સામગ્રી.',
          icon: FileText,
          tag: 'બહુલક્ષી માધ્યમ',
        },
        {
          title: 'અવાજ-સહાયિત ગુજરાતી અને હિન્દી',
          subtitle: 'શુદ્ધ ઉચ્ચાર અને સ્થાનિક ભાષા સપોર્ટ.',
          description: 'બાળક ભાષાના અવરોધ વગર વિષયના મૂળ ખ્યાલ સમજી શકે તે માટે મૂળ અવાજ સિન્થેસિસ.',
          icon: Volume2,
          tag: 'ત્રિભાષી',
        },
        {
          title: 'બહુ-સ્તરીય વહીવટી પોર્ટલ',
          subtitle: 'વર્ગખંડથી કલેક્ટર કચેરી સુધી.',
          description: 'શિક્ષક, આચાર્ય, CRC કો-ઓર્ડિનેટર, BRC અને જિલ્લા શિક્ષણાધિકારી માટે સંકલિત ડેશબોર્ડ.',
          icon: BarChart3,
          tag: 'જિલ્લા વ્યાપી',
        },
        {
          title: '૧૦૦% ઑફલાઇન કાર્યક્ષમતા',
          subtitle: 'ઇન્ટરનેટ વિના પણ સંપૂર્ણ કાર્યરત.',
          description: 'IndexedDB સ્થાનિક સંગ્રહ પર આધારિત. નેટવર્ક ન હોય ત્યારે પણ બધો ડેટા સુરક્ષિત રહે છે.',
          icon: WifiOff,
          tag: 'ઑફલાઇન સક્ષમ',
        },
      ],
    },
    workflow: {
      eyebrow: 'કાર્યપ્રણાલી',
      title: 'એક અવિરત યાત્રા. ખામી શોધવાથી સફળતા પ્રાપ્ત કરવા સુધી.',
      subtitle: 'વિદ્યાર્થીનો અભ્યાસ, શિક્ષકનું માર્ગદર્શન અને જિલ્લા કક્ષાની દેખરેખ જોડતી ૫-પગલાંની કડી.',
      steps: [
        {
          step: '૦૧',
          title: '૫-મિનિટ નિદાન શરૂ કરો',
          detail: 'શિક્ષક અથવા બાળક વર્ગખંડમાં ટેબ્લેટ કે ફોન પર અવાજ સહાય સાથે પ્રશ્નોત્તરી પૂર્ણ કરે છે.',
        },
        {
          step: '૦૨',
          title: 'ગ્રાફ મૂળ ખામી ઓળખે છે',
          detail: 'એન્જિન તપાસે છે કે સમસ્યા ગણતરીની છે, સ્થાનકિંમતની છે કે ધ્વનિ સંયોજનની છે.',
        },
        {
          step: '૦૩',
          title: '૧૨-મિનિટ ઉપચાર યોજના તૈયાર',
          detail: 'પ્રત્યક્ષ પ્રવૃત્તિઓ અને વર્કશીટ સાથે બાળકના સ્તર મુજબનો માર્ગ આપોઆપ રચાય છે.',
        },
        {
          step: '૦૪',
          title: 'શિક્ષક વર્ગમાં માર્ગદર્શન આપે છે',
          detail: 'શિક્ષક મૂર્ત સાધનો અને જૂથ પ્રવૃત્તિ દ્વારા ૧૦-૧૨ મિનિટનું ચોક્કસ શિક્ષણ કાર્ય કરાવે છે.',
        },
        {
          step: '૦૫',
          title: 'સિદ્ધિ પ્રમાણિત અને સિંક',
          detail: 'પુનઃચકાસણી દ્વારા ક્ષમતા સાબિત થાય છે અને સ્થાનિક સ્ટોરેજ ક્લસ્ટર પોર્ટલ સાથે સિંક થાય છે.',
        },
      ],
    },
    multilingual: {
      eyebrow: 'સમાવેશી શિક્ષણ',
      title: 'શિક્ષણ બાળકની માતૃભાષામાં જ હોવું જોઈએ.',
      subtitle: 'ગુજરાતની શાળાઓ માટે ખાસ તૈયાર કરાયેલ અક્ષર ફોન્ટ અને શુદ્ધ વાણી ઉચ્ચારણ.',
      languages: [
        {
          code: 'gu',
          name: 'ગુજરાતી (Gujarati)',
          script: 'Noto Sans Gujarati',
          sample: 'સ્થાનકિંમત અને દશકના જૂથ બનાવવાની પ્રવૃત્તિ',
          subtext: 'GCERT પ્રાથમિક અભ્યાસક્રમ મુજબ સંપૂર્ણ સ્થાનિકીકરણ અને અવાજ સહાય.',
          audioText: 'સ્થાનકિંમત અને દશકના જૂથ બનાવવાની પ્રવૃત્તિ',
        },
        {
          code: 'hi',
          name: 'हिन्दी (Hindi)',
          script: 'Noto Sans Devanagari',
          sample: 'ध्वनि संज्ञान और अक्षरों को मिलाकर शब्द पढ़ना',
          subtext: 'निपुण भारत FLN दिशानिर्देशों के अनुरूप भाषा और गणितीय बुनियादी कार्य।',
          audioText: 'ध्वनि संज्ञान और अक्षरों को मिलाकर शब्द पढ़ना',
        },
        {
          code: 'en',
          name: 'English (General)',
          script: 'Inter Sans',
          sample: 'Foundational phonics, number sense and story comprehension',
          subtext: 'પ્રાથમિક વિદ્યાર્થીઓ માટે આંતરરાષ્ટ્રીય સ્તરનું FLN માળખું.',
          audioText: 'Foundational phonics, number sense and story comprehension',
        },
      ],
    },
    ecosystem: {
      eyebrow: 'કોના માટે છે',
      title: 'શૈક્ષણિક તંત્રના દરેક ઘટકને સક્ષમ બનાવવું.',
      subtitle: 'દરેક ભૂમિકા માટે યોગ્ય ડેશબોર્ડ અને વ્યવહારુ માહિતી.',
      roles: [
        {
          title: 'વિદ્યાર્થીઓ (ધોરણ ૧–૮)',
          description: 'કોઈપણ જાતના ભય કે જાહેર સરખામણી વિના રમત-રમતમાં શીખવાનો આનંદ માણે છે.',
          icon: Sparkles,
        },
        {
          title: 'વર્ગખંડ શિક્ષકો',
          description: 'સ્વચાલિત નિદાન અને તૈયાર ઉપચાર પાઠ દ્વારા અઠવાડિયે ૪+ કલાકનો સમય બચાવે છે.',
          icon: GraduationCap,
        },
        {
          title: 'મુખ્ય શિક્ષક / આચાર્ય',
          description: 'વર્ગવાર FLN પ્રગતિનો પારદર્શક ચિત્ર મેળવે છે અને શિક્ષકોને જરૂરી ટેકો પૂરો પાડે છે.',
          icon: School,
        },
        {
          title: 'CRC અને BRC કો-ઓર્ડિનેટર',
          description: 'ડેટા આધારિત શાળા મુલાકાતો ગોઠવે છે અને ક્લસ્ટર સ્તરે યોગ્ય માર્ગદર્શન આપે છે.',
          icon: Compass,
        },
        {
          title: 'વાલીઓ / માતાપિતા',
          description: 'ગૂંચવણભર્યા માર્ક્સને બદલે માતૃભાષામાં બાળકની સાચી પ્રગતિ અને સિદ્ધિ સમજે છે.',
          icon: Users,
        },
        {
          title: 'જિલ્લા શિક્ષણ અધિકારી (DEO)',
          description: 'જ્યાં સૌથી વધુ જરૂર હોય ત્યાં પુરાવા આધારિત શૈક્ષણિક સાધનો અને શિક્ષકો ફાળવે છે.',
          icon: Award,
        },
      ],
    },
    impact: {
      eyebrow: 'પરિણામ અને અસર',
      title: 'વિદ્યાર્થીની ક્ષમતા માપો. તેના આત્મવિશ્વાસને નહીં.',
      subtitle: 'FLN ઉપચાર ક્ષેત્રના મોડેલ પર આધારિત અપેક્ષિત શૈક્ષણિક અને વહીવટી પરિણામો.',
      stats: [
        {
          value: '૬૪%',
          label: 'કાગળકામ અને સમયમાં ઘટાડો',
          note: 'લાંબી પરીક્ષાઓની જગ્યાએ ૫-મિનિટના સ્માર્ટ નિદાનનો ઉપયોગ.',
        },
        {
          value: '૪૨%',
          label: 'ઝડપી પાયાની પુનઃપ્રાપ્તિ',
          note: 'મૂળ ખામી પર સીધું ધ્યાન કેન્દ્રિત કરવાથી ક્ષમતા ઝડપથી વધે છે.',
        },
        {
          value: '૧૦૦%',
          label: 'ઑફલાઇન ઉપલબ્ધતા',
          note: 'દૂરના ગ્રામીણ વિસ્તારોમાં પણ ઇન્ટરનેટ વિના અવિરત કાર્ય.',
        },
        {
          value: '૩',
          label: 'સ્થાનિક ભાષાઓ',
          note: 'ગુજરાતી, હિન્દી અને અંગ્રેજીમાં સંપૂર્ણ ઓડિયો અને ટેક્સ્ટ સપોર્ટ.',
        },
      ],
    },
    cta: {
      title: 'ચાલો દરેક બાળકના શીખવાના માર્ગને વધુ સ્પષ્ટ બનાવીએ.',
      subtitle:
        'હેકાથોન સમસ્યા ક્રમાંક PS000034 હેઠળ દેવભૂમિ દ્વારકાની શાળાઓ માટે નિર્મિત. અત્યારે જ લાઈવ વર્કસ્પેસ જુઓ.',
      buttonPrimary: 'શિક્ષક વર્કસ્પેસ ખોલો',
      buttonSecondary: 'નિદાન ડેમો જુઓ',
    },
    footer: {
      problemStatement: 'સમસ્યા ક્રમાંક: PS000034 · ધીમા શીખનારાઓ માટે AI-આધારિત નિદાન અને અનુકૂલનશીલ ઉપચાર શિક્ષણ પ્રણાલી',
      stakeholder: 'કલેક્ટર કચેરી — દેવભૂમિ દ્વારકા, ગુજરાત · શિક્ષણ ટેકનોલોજી ક્ષેત્ર',
      compliance: 'GCERT પ્રાથમિક અભ્યાસક્રમ અને નિપુણ ભારત FLN લક્ષ્યાંકો સાથે સુસંગત.',
      openSource: 'SFIC હેકાથોન ૨૦૨૬ માટે નિર્મિત ઓપન-સોર્સ પ્રોટોટાઇપ. MIT લાઇસન્સ.',
      links: [
        { label: 'સમસ્યા', href: '#problems-solutions' },
        { label: 'અભિગમ', href: '#approach' },
        { label: 'વિશેષતાઓ', href: '#features' },
        { label: 'કાર્યપદ્ધતિ', href: '#workflow' },
        { label: 'બહુભાષી', href: '#multilingual' },
        { label: 'અસરકારકતા', href: '#impact' },
      ],
    },
  },
  hi: {
    banner: 'समस्या कोड: PS000034 · कलेक्टर कार्यालय, देवभूमि द्वारका · AI-आधारित मूलभूत शिक्षण निदान एवं उपचारात्मक प्रणाली',
    nav: {
      theProblem: 'समस्या',
      ourApproach: 'हमारा दृष्टिकोण',
      features: 'विशेषताएँ',
      workflow: 'कार्यप्रणाली',
      multilingual: 'बहुभाषी',
      impact: 'प्रभाव',
      signIn: 'लॉग इन करें',
      openWorkspace: 'वर्कस्पेस खोलें',
    },
    hero: {
      eyebrow: 'PS000034 / शिक्षा प्रौद्योगिकी · कलेक्टर कार्यालय · देवभूमि द्वारका',
      headlineStart: 'हर विद्यार्थी अलग है। उनकी',
      headlineHighlight: 'सीखने की यात्रा',
      headlineEnd: 'भी विशेष होनी चाहिए।',
      description:
        'सक्षम FLN शिक्षकों, विद्यालय नेतृत्व और मेंटर्स को AI-संचालित नैदानिक और उपचारात्मक शिक्षण प्रणाली प्रदान करता है — मूलभूत कमियों की पहचान कर कक्षा शिक्षण को परिणामोन्मुख बनाता है।',
      primaryCta: 'सक्षम FLN एक्सप्लोर करें',
      secondaryCta: 'शिक्षक वर्कस्पेस खोलें',
      seeHowItWorks: 'यह कैसे कार्य करता है',
      trustBadges: [
        'ध्वनि-सहायित निदान (गुजराती · हिन्दी · अंग्रेज़ी)',
        'शिक्षक-निर्देशित मूर्त उपचारात्मक शिक्षण',
        '100% ऑफ़लाइन स्थानीय डेटा स्टोरेज',
      ],
    },
    mockup: {
      windowTitle: 'देवभूमि द्वारका · कक्षा 3A प्रगति विहंगावलोकन',
      sampleTag: 'प्रायोगिक नमूना',
      metrics: [
        { label: 'कुल विद्यार्थी', value: '1,248', change: '+3.2%', note: '4 विद्यालयों में' },
        { label: 'उपस्थिति दर', value: '94.2%', change: '+1.8%', note: 'नियमित भागीदारी' },
        { label: 'FLN लक्ष्य सिद्धि', value: '78%', change: '+5.4%', note: 'मूलभूत स्तर उत्तीर्ण' },
        { label: 'उपचारात्मक कतार', value: '156', change: '-8%', note: 'MTSS स्तर 2' },
      ],
      progressTitle: 'विद्यार्थी प्रगति रुझान',
      progressRange: 'अंतिम 6 सप्ताह',
      needsAttentionTitle: 'विशेष ध्यान योग्य विद्यार्थी',
      students: [
        {
          initials: 'आके',
          name: 'आरव के.',
          grade: 'कक्षा 3',
          deficit: 'स्थानीय मान एवं पुनर्समूहन में कमी',
          status: 'उपचार सक्रिय',
          color: 'amber',
        },
        {
          initials: 'पीएम',
          name: 'पूजा एम.',
          grade: 'कक्षा 4',
          deficit: 'ध्वनि संज्ञान एवं मात्रा विभेदीकरण',
          status: 'फ़ोनिक्स सहयोग',
          color: 'teal',
        },
        {
          initials: 'केएस',
          name: 'कबीर एस.',
          grade: 'कक्षा 3',
          deficit: 'हासिल वाला दो-अंकीय घटाव',
          status: 'स्तर 2 सहायता',
          color: 'indigo',
        },
      ],
      floatingSignal: {
        title: 'आरंभिक संकेत',
        stat: '23',
        description: 'विद्यार्थियों को इस सप्ताह पुनरावलोकन हेतु चिह्नित किया गया',
      },
      floatingPathway: {
        tag: 'MTSS स्तर 2',
        title: '12-मिनट दैनिक मार्ग',
        description: 'मूर्त गणना सामग्री आवंटित की गई',
      },
    },
    problems: {
      eyebrow: '02 · कक्षा की वास्तविकता',
      title: 'समस्याएँ एवं समाधान',
      subtitle: 'कक्षा में शिक्षक एक होता है, परंतु प्रत्येक बच्चे की सीखने की आवश्यकता अलग होती है।',
      items: [
        {
          stat: '68%',
          description:
            'उच्च कक्षाओं के गणित और पठन में विद्यार्थी इसलिए पिछड़ते हैं क्योंकि उनके बुनियादी आधार (जैसे स्थानीय मान या ध्वनि संज्ञान) स्पष्ट नहीं होते।',
          source: 'ASER एवं NAS रिपोर्ट के अनुसार',
        },
        {
          stat: '40:1',
          description:
            'बड़े छात्र-शिक्षक अनुपात के कारण 40 मिनट की कक्षा में प्रत्येक छात्र का व्यक्तिगत निदान करना संभव नहीं हो पाता।',
          source: 'गुजरात कक्षा क्षेत्रीय अध्ययन से',
        },
        {
          stat: '57%',
          description:
            'सीखने में कठिनाई का सामना कर रहे बच्चे पारंपरिक अंकों के डर से चुपचाप पिछड़ जाते हैं, जब तक कि समय पर चेतावनी न मिले।',
          source: 'शिक्षक एवं सीआरसी परामर्श के अनुसार',
        },
      ],
      solutions: [
        {
          title: 'मूल अवधारणा नैदानिक इंजन',
          description:
            'घटाव में गलती होने पर केवल बार-बार घटाव का अभ्यास कराने के बजाय यह स्थानीय मान की मूल कमी की पहचान करता है।',
          icon: Target,
        },
        {
          title: 'स्वचालित 12-मिनट उपचारात्मक योजना',
          description:
            'शिक्षक पर बिना अतिरिक्त कागज़ी बोझ डाले तैयार फ्लैशकार्ड, वर्कशीट और ध्वनि गतिविधियाँ उपलब्ध कराता है।',
          icon: Sparkles,
        },
        {
          title: 'तनावमुक्त प्रगति ट्रैकिंग',
          description:
            'रैंक या तुलना के स्थान पर व्यक्तिगत दक्षता स्तर और अभिभावकों के लिए सरल भाषा में प्रगति रिपोर्ट प्रस्तुत करता है।',
          icon: HeartHandshake,
        },
      ],
    },
    approach: {
      eyebrow: 'सक्षम FLN का परिचय',
      title: 'कमी पहचानने से लेकर सही अगला कदम उठाने तक।',
      subtitle: 'नियमित कक्षा शिक्षण को बाधित किए बिना सीखने में संघर्ष कर रहे बच्चों को आगे लाने के लिए 6-चरणीय चक्र।',
      stages: [
        {
          number: '01',
          name: 'पहचान',
          title: 'सहज कक्षा स्क्रीनिंग',
          description: 'बिना किसी परीक्षा तनाव के बच्चे की सहभागिता और मौखिक प्रवाह का अवलोकन।',
        },
        {
          number: '02',
          name: 'मूल्यांकन',
          title: '5-मिनट मल्टीमॉडल निदान',
          description: 'गुजराती, हिन्दी या अंग्रेज़ी में ध्वनि एवं स्पर्श आधारित सरल माइक्रो-टास्क।',
        },
        {
          number: '03',
          name: 'समझ',
          title: 'मूल-कौशल आवश्यकता ग्राफ़',
          description: 'AI त्रुटियों का विश्लेषण करके ठीक वही बुनियादी कमी बताता है जहाँ सहायता की आवश्यकता है।',
        },
        {
          number: '04',
          name: 'वैयक्तिकरण',
          title: '12-मिनट दैनिक योजना',
          description: 'GCERT पाठ्यक्रम के अनुरूप छोटे पाठ और खेल-आधारित अभ्यास।',
        },
        {
          number: '05',
          name: 'सहयोग',
          title: 'मूर्त सामग्री से प्रत्यक्ष शिक्षण',
          description: 'कक्षा किट, टोकन, तीलियाँ और 1-पेज की प्रिंटेबल वर्कशीट के साथ शिक्षण।',
        },
        {
          number: '06',
          name: 'निगरानी',
          title: 'विद्यालय से ज़िला स्तर समन्वय',
          description: 'शिक्षक, प्रधानाध्यापक, CRC और DEO के लिए एकीकृत प्रगति ट्रैकिंग।',
        },
      ],
    },
    features: {
      eyebrow: 'प्रमुख क्षमताएँ',
      title: 'ग्रामीण एवं अर्ध-शहरी विद्यालयों के लिए विशेष रूप से निर्मित।',
      subtitle: 'प्राथमिक शिक्षकों की वास्तविक कार्य-स्थितियों के अनुसार डिज़ाइन किया गया आधुनिक सॉफ्टवेयर।',
      list: [
        {
          title: 'नैदानिक माइक्रो-मूल्यांकन',
          subtitle: 'परीक्षा का डर नहीं। वास्तविक शैक्षणिक निदान।',
          description: '5 मिनट में मौखिक प्रवाह, ध्वनि पहचान, स्थानीय मान और मूलभूत संक्रियाओं का तात्कालिक परिणाम।',
          icon: Target,
          tag: 'तनावमुक्त',
        },
        {
          title: 'मूल पूर्वापेक्षित कौशल ग्राफ़',
          subtitle: 'कमी की जड़ तक पहुँचने वाली जाँच।',
          description: 'यदि बच्चा हासिल वाला घटाव नहीं कर पाता, तो सक्षम पहले उसके स्थानीय मान की जाँच करता है।',
          icon: Cpu,
          tag: 'स्पष्ट AI',
        },
        {
          title: 'अनुकूलनशील साप्ताहिक योजना',
          subtitle: 'प्रतिदिन 12 मिनट। कागज़ी काम से मुक्ति।',
          description: 'शिक्षक-निर्देशित या सहपाठी समूह के लिए प्रति सप्ताह 3 सुस्पष्ट कदम सुझाता है।',
          icon: Layers,
          tag: 'कक्षा-तैयार',
        },
        {
          title: 'मल्टीमॉडल लर्निंग लैब एवं वर्कशीट',
          subtitle: 'ऑडियो, विज़ुअल कार्ड और प्रिंटेबल पीडीएफ सामग्री।',
          description: 'ध्वनि मार्गदर्शन, अक्षर अनुरेखण, गिनती टोकन और एक-क्लिक प्रिंटेबल वर्कशीट।',
          icon: FileText,
          tag: 'बहु-माध्यमीय',
        },
        {
          title: 'ध्वनि-सहायित हिन्दी एवं गुजराती',
          subtitle: 'सटीक उच्चारण और स्थानीय भाषा समर्थन।',
          description: 'बच्चा भाषा की बाधा के बिना विषय को समझ सके, इसके लिए प्रामाणिक वॉयस सिंथेसिस।',
          icon: Volume2,
          tag: 'त्रिभाषी',
        },
        {
          title: 'बहु-स्तरीय प्रशासनिक पोर्टल',
          subtitle: 'कक्षा से लेकर ज़िला कलेक्टर कार्यालय तक।',
          description: 'शिक्षक, प्रधानाध्यापक, संकुल समन्वयक (CRC), BRC और ज़िला शिक्षा अधिकारी हेतु एकीकृत डैशबोर्ड।',
          icon: BarChart3,
          tag: 'ज़िला-स्तरीय',
        },
        {
          title: '100% ऑफ़लाइन कार्यक्षमता',
          subtitle: 'इंटरनेट के बिना भी निर्बाध संचालन।',
          description: 'IndexedDB स्थानीय स्टोरेज पर आधारित। नेटवर्क न होने पर भी सभी रिकॉर्ड सुरक्षित रहते हैं।',
          icon: WifiOff,
          tag: 'ऑफ़लाइन सक्षम',
        },
      ],
    },
    workflow: {
      eyebrow: 'कार्यप्रणाली',
      title: 'एक सतत यात्रा। कमी पहचानने से लेकर दक्षता हासिल करने तक।',
      subtitle: 'विद्यार्थी अभ्यास, शिक्षक मार्गदर्शन और ज़िला स्तरीय निगरानी को जोड़ने वाली 5-चरणीय शृंखला।',
      steps: [
        {
          step: '01',
          title: '5-मिनट निदान आरंभ करें',
          detail: 'शिक्षक या विद्यार्थी कक्षा में टैबलेट अथवा फ़ोन पर ध्वनि सहायता से प्रश्नोत्तरी पूर्ण करते हैं।',
        },
        {
          step: '02',
          title: 'ग्राफ़ मूल कमी की पहचान करता है',
          detail: 'इंजन जाँचता है कि समस्या गणितीय संक्रिया की है, स्थानीय मान की है अथवा ध्वनि संयोजन की।',
        },
        {
          step: '03',
          title: '12-मिनट उपचारात्मक योजना तैयार',
          detail: 'मूर्त गतिविधियों और वर्कशीट के साथ छात्र के स्तरानुसार मार्ग स्वतः निर्मित होता है।',
        },
        {
          step: '04',
          title: 'शिक्षक कक्षा में उपचार कराते हैं',
          detail: 'शिक्षक मूर्त साधनों और समूह गतिविधियों द्वारा 10-12 मिनट का लक्षित शिक्षण कराते हैं।',
        },
        {
          step: '05',
          title: 'दक्षता प्रमाणीकरण एवं सिंक',
          detail: 'पुनःजाँच द्वारा दक्षता सिद्ध होती है तथा स्थानीय डेटा संकुल पोर्टल से सिंक हो जाता है।',
        },
      ],
    },
    multilingual: {
      eyebrow: 'समावेशी शिक्षा',
      title: 'शिक्षा बच्चे की अपनी मातृभाषा में ही होनी चाहिए।',
      subtitle: 'गुजरात के विद्यालयों के लिए विशेष रूप से तैयार किए गए भारतीय लिपि फॉन्ट और स्पष्ट उच्चारण।',
      languages: [
        {
          code: 'gu',
          name: 'ગુજરાતી (Gujarati)',
          script: 'Noto Sans Gujarati',
          sample: 'સ્થાનકિંમત અને દશકના જૂથ બનાવવાની પ્રવૃત્તિ',
          subtext: 'GCERT પ્રાથમિક અભ્યાસક્રમ મુજબ સંપૂર્ણ સ્થાનિકીકરણ અને અવાજ સહાય.',
          audioText: 'સ્થાનકિંમત અને દશકના જૂથ બનાવવાની પ્રવૃત્તિ',
        },
        {
          code: 'hi',
          name: 'हिन्दी (Hindi)',
          script: 'Noto Sans Devanagari',
          sample: 'ध्वनि संज्ञान और अक्षरों को मिलाकर शब्द पढ़ना',
          subtext: 'निपुण भारत FLN दिशानिर्देशों के अनुरूप भाषा और गणितीय बुनियादी कार्य।',
          audioText: 'ध्वनि संज्ञान और अक्षरों को मिलाकर शब्द पढ़ना',
        },
        {
          code: 'en',
          name: 'English (General)',
          script: 'Inter Sans',
          sample: 'Foundational phonics, number sense and story comprehension',
          subtext: 'प्राथमिक स्तर के विद्यार्थियों हेतु मानकीकृत FLN ढाँचा।',
          audioText: 'Foundational phonics, number sense and story comprehension',
        },
      ],
    },
    ecosystem: {
      eyebrow: 'यह किसके लिए है',
      title: 'शैक्षणिक परिवेश के प्रत्येक भागीदार को सशक्त बनाना।',
      subtitle: 'प्रत्येक भूमिका के लिए उपयुक्त डैशबोर्ड और व्यावहारिक जानकारी।',
      roles: [
        {
          title: 'विद्यार्थी (कक्षा 1–8)',
          description: 'बिना किसी भय, हीनभावना या सार्वजनिक तुलना के खेल-खेल में सीखने का आनंद लेते हैं।',
          icon: Sparkles,
        },
        {
          title: 'कक्षा शिक्षक',
          description: 'स्वचालित निदान और तैयार उपचारात्मक पाठों के माध्यम से प्रति सप्ताह 4+ घंटे की बचत करते हैं।',
          icon: GraduationCap,
        },
        {
          title: 'प्रधानाध्यापक',
          description: 'कक्षा-वार FLN प्रगति का पारदर्शी दृश्य प्राप्त करते हैं और शिक्षकों को आवश्यक सहयोग देते हैं।',
          icon: School,
        },
        {
          title: 'CRC एवं BRC समन्वयक',
          description: 'डेटा-आधारित विद्यालय भ्रमण आयोजित करते हैं और संकुल स्तर पर सटीक मार्गदर्शन देते हैं।',
          icon: Compass,
        },
        {
          title: 'अभिभावक / माता-पिता',
          description: 'जटिल अंकों के स्थान पर सरल भाषा में बच्चे की वास्तविक प्रगति और सीखने की स्थिति समझते हैं।',
          icon: Users,
        },
        {
          title: 'ज़िला शिक्षा अधिकारी (DEO)',
          description: 'जहाँ सर्वाधिक आवश्यकता हो, वहाँ साक्ष्य के आधार पर शैक्षणिक संसाधन और शिक्षक उपलब्ध कराते हैं।',
          icon: Award,
        },
      ],
    },
    impact: {
      eyebrow: 'परिणाम एवं प्रभाव',
      title: 'विद्यार्थी की सीखने की प्रगति मापें। उनका आत्मसम्मान नहीं।',
      subtitle: 'FLN उपचारात्मक क्षेत्र के मॉडलों पर आधारित प्रत्याशित शैक्षणिक एवं प्रशासनिक परिणाम।',
      stats: [
        {
          value: '64%',
          label: 'कागज़ी कार्य एवं समय में कमी',
          note: 'लंबी परीक्षाओं के स्थान पर 5-मिनट के त्वरित माइक्रो-स्क्रीनिंग का प्रयोग।',
        },
        {
          value: '42%',
          label: 'तीव्र बुनियादी सुधार',
          note: 'मूल कारण पर सीधा ध्यान देने से दक्षता तेज़ी से पुनः प्राप्त होती है।',
        },
        {
          value: '100%',
          label: 'ऑफ़लाइन उपलब्धता',
          note: 'दूरदराज के ग्रामीण क्षेत्रों में भी बिना इंटरनेट के निरंतर कार्य।',
        },
        {
          value: '3',
          label: 'स्थानीय भाषाएँ',
          note: 'गुजराती, हिन्दी और अंग्रेज़ी में पूर्ण ऑडियो एवं टेक्स्ट समर्थन।',
        },
      ],
    },
    cta: {
      title: 'आइए प्रत्येक बच्चे के सीखने के मार्ग को और अधिक सुस्पष्ट बनाएँ।',
      subtitle:
        'हैकथॉन समस्या कोड PS000034 के अंतर्गत देवभूमि द्वारका के विद्यालयों हेतु निर्मित। अभी लाइव वर्कस्पेस देखें।',
      buttonPrimary: 'शिक्षक वर्कस्पेस खोलें',
      buttonSecondary: 'निदान डेमो देखें',
    },
    footer: {
      problemStatement: 'समस्या कोड: PS000034 · सीखने में धीमे और संघर्षरत विद्यार्थियों हेतु AI-संचालित नैदानिक एवं उपचारात्मक प्रणाली',
      stakeholder: 'कलेक्टर कार्यालय — देवभूमि द्वारका, गुजरात · शिक्षा प्रौद्योगिकी क्षेत्र',
      compliance: 'GCERT प्राथमिक पाठ्यक्रम एवं निपुण भारत FLN लक्ष्यों के अनुरूप।',
      openSource: 'SFIC हैकथॉन 2026 हेतु निर्मित ओपन-सोर्स प्रोटोटाइप। MIT लाइसेंस।',
      links: [
        { label: 'समस्या', href: '#problems-solutions' },
        { label: 'दृष्टिकोण', href: '#approach' },
        { label: 'विशेषताएँ', href: '#features' },
        { label: 'कार्यप्रणाली', href: '#workflow' },
        { label: 'बहुभाषी', href: '#multilingual' },
        { label: 'प्रभाव', href: '#impact' },
      ],
    },
  },
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [playingAudioLang, setPlayingAudioLang] = useState<string | null>(null)
  const { locale } = useI18n()

  const content = HOME_CONTENT[locale] || HOME_CONTENT.en

  // Interactive audio playback handler with Web Speech API & fallback feedback
  const playAudioSample = (langCode: string, textToSpeak: string) => {
    if (playingAudioLang === langCode) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      setPlayingAudioLang(null)
      return
    }

    setPlayingAudioLang(langCode)

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(textToSpeak)
      utterance.rate = 0.9

      if (langCode === 'gu') {
        utterance.lang = 'gu-IN'
      } else if (langCode === 'hi') {
        utterance.lang = 'hi-IN'
      } else {
        utterance.lang = 'en-IN'
      }

      utterance.onend = () => {
        setPlayingAudioLang(null)
      }
      utterance.onerror = () => {
        setPlayingAudioLang(null)
      }

      window.speechSynthesis.speak(utterance)
    } else {
      // Audio simulation timer
      setTimeout(() => {
        setPlayingAudioLang(null)
      }, 2500)
    }
  }

  return (
    <main className="min-h-screen text-[#172B3A] selection:bg-[#0D9488]/20">
      {/* Top Institutional Banner */}
      <div className="border-b border-[#DCE7E5] bg-[#142B45] px-4 py-2 text-center text-[11px] font-medium tracking-wide text-white/90 sm:text-xs">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[#14A89B] animate-pulse" />
          {content.banner}
        </span>
      </div>

      {/* Sticky Glass Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-[#DCE7E5]/80 bg-white/80 backdrop-blur-xl shadow-xs transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Saksham FLN Home">
            <BrandMark />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-[#142B45] group-hover:text-[#0D9488] transition-colors">
                  Saksham FLN
                </span>
                <span className="hidden sm:inline-block rounded-md bg-[#DFF5EF] px-2 py-0.5 text-[10px] font-semibold text-[#0D9488]">
                  GCERT
                </span>
              </div>
              <p className="text-[10px] font-medium tracking-wider text-[#64748B] uppercase">
                Foundational Learning · Gujarat
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-7 text-sm font-medium text-[#475569] lg:flex">
            <a href="#problems-solutions" className="transition hover:text-[#0D9488]">
              {content.nav.theProblem}
            </a>
            <a href="#approach" className="transition hover:text-[#0D9488]">
              {content.nav.ourApproach}
            </a>
            <a href="#features" className="transition hover:text-[#0D9488]">
              {content.nav.features}
            </a>
            <a href="#workflow" className="transition hover:text-[#0D9488]">
              {content.nav.workflow}
            </a>
            <a href="#multilingual" className="transition hover:text-[#0D9488]">
              {content.nav.multilingual}
            </a>
            <a href="#impact" className="transition hover:text-[#0D9488]">
              {content.nav.impact}
            </a>
          </nav>

          {/* Right Header Controls */}
          <div className="hidden items-center gap-4 md:flex">
            <LanguageSelector variant="pill" />
            <Link
              href="/login"
              className="text-sm font-semibold text-[#142B45] hover:text-[#0D9488] transition-colors px-2 py-1"
            >
              {content.nav.signIn}
            </Link>
            <Button
              asChild
              className="h-10 rounded-xl bg-[#0D9488] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#0B7A70] transition-all"
            >
              <Link href="/login">
                {content.nav.openWorkspace} <ArrowRight size={15} className="ml-1.5" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSelector variant="minimal" />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex size-10 items-center justify-center rounded-xl border border-[#DCE7E5] text-[#142B45] hover:bg-[#F5F8F7]"
              aria-label={menuOpen ? 'Close Navigation' : 'Open Navigation'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div className="border-t border-[#DCE7E5] bg-white/95 px-5 py-5 backdrop-blur-xl md:hidden animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-4 text-sm font-medium text-[#475569]">
              <a
                href="#problems-solutions"
                onClick={() => setMenuOpen(false)}
                className="py-1 hover:text-[#0D9488]"
              >
                {content.nav.theProblem}
              </a>
              <a
                href="#approach"
                onClick={() => setMenuOpen(false)}
                className="py-1 hover:text-[#0D9488]"
              >
                {content.nav.ourApproach}
              </a>
              <a
                href="#features"
                onClick={() => setMenuOpen(false)}
                className="py-1 hover:text-[#0D9488]"
              >
                {content.nav.features}
              </a>
              <a
                href="#workflow"
                onClick={() => setMenuOpen(false)}
                className="py-1 hover:text-[#0D9488]"
              >
                {content.nav.workflow}
              </a>
              <a
                href="#multilingual"
                onClick={() => setMenuOpen(false)}
                className="py-1 hover:text-[#0D9488]"
              >
                {content.nav.multilingual}
              </a>
              <a
                href="#impact"
                onClick={() => setMenuOpen(false)}
                className="py-1 hover:text-[#0D9488]"
              >
                {content.nav.impact}
              </a>
              <div className="border-t border-[#DCE7E5] pt-4 flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-11 items-center justify-center rounded-xl bg-[#0D9488] font-semibold text-white"
                >
                  {content.nav.openWorkspace} <ArrowRight className="ml-1.5 inline" size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (ClearPath K12 Inspiration — Two-Column with Floating UI) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-18 lg:pb-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            {/* Left Hero Column */}
            <div>
              {/* Eyebrow Institutional Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0D9488]/30 bg-[#DFF5EF]/90 px-3.5 py-1.5 text-xs font-semibold text-[#0B7A70] shadow-xs">
                <Sparkles size={13} className="text-[#0D9488]" />
                <span>{content.hero.eyebrow}</span>
              </div>

              {/* High-Impact Headline */}
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-[#142B45] sm:text-5xl lg:text-6xl lg:leading-[1.12]">
                {content.hero.headlineStart}{' '}
                <span className="text-[#0D9488] underline decoration-[#0D9488]/30 underline-offset-8">
                  {content.hero.headlineHighlight}
                </span>{' '}
                {content.hero.headlineEnd}
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-base leading-relaxed text-[#475569] sm:text-lg sm:leading-8 max-w-xl">
                {content.hero.description}
              </p>

              {/* Call-to-Action Buttons */}
              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <Button
                  asChild
                  className="h-12 rounded-xl bg-[#0D9488] px-7 text-base font-semibold text-white shadow-md hover:bg-[#0B7A70] hover:shadow-lg transition-all"
                >
                  <a href="#problems-solutions">
                    {content.hero.primaryCta} <ArrowRight size={18} className="ml-2" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-xl border-[#B9CBC7] bg-white/80 px-6 text-base font-semibold text-[#142B45] hover:bg-[#EDF5F2] hover:text-[#0D9488] transition-all shadow-xs"
                >
                  <Link href="/login">
                    <GraduationCap size={18} className="mr-2 text-[#0D9488]" />
                    {content.hero.secondaryCta}
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators / Evidence Badges */}
              <div className="mt-9 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3 text-xs sm:text-sm font-medium text-[#475569]">
                {content.hero.trustBadges.map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#15803D] shrink-0" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Hero Column: Layered Browser Mockup (Matches Reference Image 1) */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              {/* Soft Ambient Radial Backdrop */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#DFF5EF] via-[#E0E7FF] to-[#F1F5F9] opacity-70 blur-xl" />

              {/* Floating Browser Mockup Card */}
              <div className="relative rounded-3xl border border-[#DCE7E5] bg-white/95 p-5 shadow-[0_20px_60px_-15px_rgba(20,43,69,0.12)] backdrop-blur-md sm:p-6">
                {/* Browser Top Window Bar */}
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-[#EF4444]" />
                    <div className="size-3 rounded-full bg-[#F59E0B]" />
                    <div className="size-3 rounded-full bg-[#10B981]" />
                    <span className="ml-2 text-xs font-semibold text-[#475569] hidden sm:inline">
                      {content.mockup.windowTitle}
                    </span>
                  </div>
                  <span className="rounded-full bg-[#FEF3C7] px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-[#92400E]">
                    {content.mockup.sampleTag}
                  </span>
                </div>

                {/* 4 Mini Metrics Cards Grid */}
                <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {content.mockup.metrics.map((m, i) => (
                    <div key={i} className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]/80 p-2.5">
                      <p className="text-[10px] font-medium text-[#64748B] truncate">{m.label}</p>
                      <p className="mt-1 text-base font-bold text-[#142B45]">{m.value}</p>
                      <p className="text-[9px] font-semibold text-[#0D9488]">{m.change}</p>
                    </div>
                  ))}
                </div>

                {/* Progress Trends Bar Section */}
                <div className="mt-4 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Activity size={14} className="text-[#0D9488]" />
                      <span className="text-xs font-bold text-[#142B45]">
                        {content.mockup.progressTitle}
                      </span>
                    </div>
                    <span className="text-[10px] font-medium text-[#64748B]">
                      {content.mockup.progressRange}
                    </span>
                  </div>

                  {/* Stylized Weekly Progress Bar Chart */}
                  <div className="mt-4 flex h-24 items-end gap-2.5 px-2">
                    {[
                      { week: 'W1', onTrack: 35, support: 65 },
                      { week: 'W2', onTrack: 44, support: 56 },
                      { week: 'W3', onTrack: 52, support: 48 },
                      { week: 'W4', onTrack: 61, support: 39 },
                      { week: 'W5', onTrack: 70, support: 30 },
                      { week: 'W6', onTrack: 78, support: 22 },
                    ].map((bar, idx) => (
                      <div key={idx} className="flex flex-1 flex-col items-center gap-1.5 h-full justify-end">
                        <div className="w-full flex flex-col justify-end rounded-t-md overflow-hidden bg-[#F1F5F9] h-full">
                          <div
                            className="w-full bg-[#DFF5EF] transition-all"
                            style={{ height: `${bar.support}%` }}
                          />
                          <div
                            className="w-full bg-[#0D9488] transition-all"
                            style={{ height: `${bar.onTrack}%` }}
                          />
                        </div>
                        <span className="text-[9px] font-medium text-[#94A3B8]">{bar.week}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Students Needing Attention Mini Roster */}
                <div className="mt-4">
                  <p className="text-xs font-bold text-[#142B45] mb-2">
                    {content.mockup.needsAttentionTitle}
                  </p>
                  <div className="flex flex-col gap-2">
                    {content.mockup.students.map((student, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-white p-2.5 transition hover:border-[#0D9488]/40 hover:bg-[#F8FAFC]"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#142B45] text-[11px] font-bold text-white">
                            {student.initials}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-[#142B45] truncate">
                              {student.name}{' '}
                              <span className="text-[10px] font-normal text-[#64748B]">
                                ({student.grade})
                              </span>
                            </p>
                            <p className="text-[10px] text-[#64748B] truncate">{student.deficit}</p>
                          </div>
                        </div>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[9px] font-bold shrink-0 ${
                            student.color === 'amber'
                              ? 'bg-[#FEF3C7] text-[#92400E]'
                              : student.color === 'teal'
                              ? 'bg-[#DFF5EF] text-[#0B7A70]'
                              : 'bg-[#EEF2FF] text-[#3730A3]'
                          }`}
                        >
                          {student.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Overlapping Floating Chip 1: Early Signal (Top Right) */}
                <div className="absolute -top-5 -right-5 hidden sm:flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-xl backdrop-blur-md max-w-[200px]">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]">
                    <TrendingUp size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">
                      {content.mockup.floatingSignal.title}
                    </span>
                    <p className="text-sm font-extrabold text-[#142B45]">
                      {content.mockup.floatingSignal.stat}{' '}
                      <span className="text-[10px] font-normal text-[#475569]">flagged</span>
                    </p>
                  </div>
                </div>

                {/* Overlapping Floating Chip 2: Active Pathway (Bottom Left) */}
                <div className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-xl backdrop-blur-md max-w-[220px]">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#DFF5EF] text-[#0D9488]">
                    <Target size={18} />
                  </div>
                  <div>
                    <span className="rounded bg-[#0D9488]/15 px-1.5 py-0.5 text-[9px] font-bold text-[#0D9488]">
                      {content.mockup.floatingPathway.tag}
                    </span>
                    <p className="mt-0.5 text-xs font-bold text-[#142B45]">
                      {content.mockup.floatingPathway.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PROBLEMS & SOLUTIONS SECTION (Reference Image 2 Inspiration)            */}
      {/* ========================================================================= */}
      <section
        id="problems-solutions"
        className="relative border-y border-[#DCE7E5] bg-white py-20 lg:py-28 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {/* Section Header */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0D9488]">
              <span className="size-2 rounded-full bg-[#0D9488]" />
              {content.problems.eyebrow}
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#142B45] sm:text-4xl lg:text-5xl">
              {content.problems.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#64748B] sm:text-lg">
              {content.problems.subtitle}
            </p>
          </div>

          {/* Connected Grid: Left (Problems) · Center (Glowing Orb) · Right (Solutions) */}
          <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
            {/* Left Column: Problems & Field Findings */}
            <div className="flex flex-col gap-10">
              {content.problems.items.map((item, idx) => (
                <div key={idx} className="group relative">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-extrabold tracking-tight text-[#142B45] lg:text-5xl">
                      {item.stat}
                    </span>
                    <span className="rounded-full bg-[#F1F5F9] px-3 py-1 text-[11px] font-semibold text-[#475569]">
                      {item.source}
                    </span>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#475569] sm:text-base">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Center Column: Iridescent Glowing Orb with Connected Node Lines */}
            <div className="relative mx-auto hidden lg:flex flex-col items-center justify-center py-6">
              {/* Iridescent Radiant Sphere */}
              <div className="relative size-60 rounded-full bg-gradient-to-tr from-[#6366F1] via-[#0D9488] to-[#38BDF8] p-1 shadow-[0_0_70px_rgba(13,148,136,0.30)] flex items-center justify-center">
                {/* Frosted Glass Overlay Disc */}
                <div className="size-52 rounded-full bg-white/20 backdrop-blur-2xl border border-white/40 flex flex-col items-center justify-center text-center p-4 text-white shadow-inner">
                  <Cpu size={28} className="text-white drop-shadow-md" />
                  <span className="mt-2 text-xs font-bold uppercase tracking-wider text-white">
                    FLN Engine
                  </span>
                  <span className="text-[10px] text-white/80 mt-0.5">Automated Bridge</span>
                </div>
              </div>

              {/* Connected Dashed Connector Lines */}
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-around">
                <div className="w-full border-t border-dashed border-[#0D9488]/40" />
                <div className="w-full border-t border-dashed border-[#0D9488]/40" />
                <div className="w-full border-t border-dashed border-[#0D9488]/40" />
              </div>
            </div>

            {/* Right Column: Clean White Rounded Solution Cards with Circular Dark Icons */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 mb-2 lg:hidden">
                <span className="rounded-full bg-[#DFF5EF] px-3 py-1 text-xs font-bold text-[#0D9488]">
                  Solutions
                </span>
              </div>
              {content.problems.solutions.map((sol, idx) => {
                const IconComponent = sol.icon
                return (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-5 rounded-3xl border border-[#DCE7E5] bg-white p-6 shadow-xs transition hover:border-[#0D9488]/40 hover:shadow-md"
                  >
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-[#142B45]">{sol.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                        {sol.description}
                      </p>
                    </div>
                    {/* Dark Navy Circular Icon Badge (Matches Reference Image 2) */}
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#142B45] text-white shadow-sm">
                      <IconComponent size={18} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SEQUENTIAL APPROACH SECTION (6-Stage Pipeline)                         */}
      {/* ========================================================================= */}
      <section id="approach" className="bg-[#F5F8F7] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D9488]">
              {content.approach.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#142B45] sm:text-4xl">
              {content.approach.title}
            </h2>
            <p className="mt-4 text-base text-[#64748B] sm:text-lg">
              {content.approach.subtitle}
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.approach.stages.map((stage) => (
              <div
                key={stage.number}
                className="relative flex flex-col justify-between rounded-3xl border border-[#DCE7E5] bg-white p-7 shadow-xs transition hover:border-[#0D9488]/50 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-[#0D9488]">{stage.number}</span>
                    <span className="rounded-full bg-[#DFF5EF] px-2.5 py-0.5 text-[10px] font-bold text-[#0B7A70] uppercase">
                      {stage.name}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#142B45]">{stage.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#64748B]">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CORE CAPABILITIES (7 Features Alternating Grid)                        */}
      {/* ========================================================================= */}
      <section id="features" className="border-t border-[#DCE7E5] bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D9488]">
              {content.features.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#142B45] sm:text-4xl">
              {content.features.title}
            </h2>
            <p className="mt-4 text-base text-[#64748B] sm:text-lg">
              {content.features.subtitle}
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.features.list.map((feature, idx) => {
              const IconComp = feature.icon
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-[#DCE7E5] bg-[#F8FAFC] p-7 transition hover:border-[#0D9488] hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-[#142B45] text-white">
                      <IconComp size={20} />
                    </div>
                    <span className="rounded-md bg-[#DFF5EF] px-2 py-0.5 text-[10px] font-bold text-[#0B7A70]">
                      {feature.tag}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-[#142B45]">{feature.title}</h3>
                  <p className="mt-1 text-xs font-semibold text-[#0D9488]">{feature.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#64748B]">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE WORKFLOW (One Connected Journey)                           */}
      {/* ========================================================================= */}
      <section id="workflow" className="border-t border-[#DCE7E5] bg-[#F5F8F7] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D9488]">
              {content.workflow.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#142B45] sm:text-4xl">
              {content.workflow.title}
            </h2>
            <p className="mt-4 text-base text-[#64748B] sm:text-lg">
              {content.workflow.subtitle}
            </p>
          </div>

          {/* Stepper Pipeline */}
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {content.workflow.steps.map((st, i) => (
              <div
                key={i}
                className="relative rounded-3xl border border-[#DCE7E5] bg-white p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#0D9488] tracking-widest">
                      STEP {st.step}
                    </span>
                    {i < 4 && (
                      <ArrowRight size={14} className="text-[#94A3B8] hidden lg:block" />
                    )}
                  </div>
                  <h3 className="mt-4 text-base font-bold text-[#142B45]">{st.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#64748B]">{st.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. AUTHENTIC MULTILINGUAL & INDIC SHOWCASE                                */}
      {/* ========================================================================= */}
      <section id="multilingual" className="border-t border-[#DCE7E5] bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D9488]">
              {content.multilingual.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#142B45] sm:text-4xl">
              {content.multilingual.title}
            </h2>
            <p className="mt-4 text-base text-[#64748B] sm:text-lg">
              {content.multilingual.subtitle}
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {content.multilingual.languages.map((lang) => {
              const isPlaying = playingAudioLang === lang.code
              return (
                <div
                  key={lang.code}
                  className="rounded-3xl border border-[#DCE7E5] bg-[#F8FAFC] p-7 transition hover:border-[#0D9488] hover:bg-white hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#142B45]">{lang.name}</span>
                      <span className="rounded-md bg-[#E2E8F0] px-2 py-0.5 text-[10px] font-semibold text-[#475569]">
                        {lang.script}
                      </span>
                    </div>

                    <div className="mt-5 rounded-2xl border border-[#E2E8F0] bg-white p-4">
                      <p
                        className={`text-base font-semibold text-[#142B45] ${
                          lang.code === 'gu'
                            ? 'font-gujarati'
                            : lang.code === 'hi'
                            ? 'font-hindi'
                            : 'font-sans'
                        }`}
                      >
                        &ldquo;{lang.sample}&rdquo;
                      </p>
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-[#64748B]">{lang.subtext}</p>
                  </div>

                  <button
                    onClick={() => playAudioSample(lang.code, lang.audioText)}
                    className={`mt-6 flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition ${
                      isPlaying
                        ? 'border-[#0D9488] bg-[#DFF5EF] text-[#0D9488] animate-pulse'
                        : 'border-[#DCE7E5] bg-white text-[#142B45] hover:border-[#0D9488] hover:text-[#0D9488]'
                    }`}
                  >
                    <Volume2 size={16} />
                    <span>{isPlaying ? 'Playing Native Audio...' : 'Listen Audio Sample'}</span>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. USER ECOSYSTEM & STAKEHOLDER MATRIX                                    */}
      {/* ========================================================================= */}
      <section className="border-t border-[#DCE7E5] bg-[#F5F8F7] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D9488]">
              {content.ecosystem.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#142B45] sm:text-4xl">
              {content.ecosystem.title}
            </h2>
            <p className="mt-4 text-base text-[#64748B] sm:text-lg">
              {content.ecosystem.subtitle}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.ecosystem.roles.map((role, idx) => {
              const RoleIcon = role.icon
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-[#DCE7E5] bg-white p-7 shadow-xs transition hover:border-[#0D9488]/40 hover:shadow-md"
                >
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-[#DFF5EF] text-[#0D9488]">
                    <RoleIcon size={20} />
                  </div>
                  <h3 className="mt-5 text-base font-bold text-[#142B45]">{role.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{role.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. EVIDENCE-BASED IMPACT SECTION                                          */}
      {/* ========================================================================= */}
      <section id="impact" className="border-t border-[#DCE7E5] bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D9488]">
              {content.impact.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#142B45] sm:text-4xl">
              {content.impact.title}
            </h2>
            <p className="mt-4 text-base text-[#64748B] sm:text-lg">
              {content.impact.subtitle}
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.impact.stats.map((st, i) => (
              <div
                key={i}
                className="rounded-3xl border border-[#DCE7E5] bg-[#F8FAFC] p-7 transition hover:border-[#0D9488]"
              >
                <p className="text-4xl font-extrabold text-[#0D9488] lg:text-5xl">{st.value}</p>
                <p className="mt-3 text-base font-bold text-[#142B45]">{st.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-[#64748B]">{st.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FINAL CALL-TO-ACTION (Deep Midnight Navy Container)                     */}
      {/* ========================================================================= */}
      <section className="bg-[#142B45] py-20 text-white lg:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#8ACFC4] backdrop-blur-md">
            <Sparkles size={14} /> Problem ID: PS000034 · Collector Office, Devbhumi Dwarka
          </div>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {content.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {content.cta.subtitle}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3.5 sm:flex-row">
            <Button
              asChild
              className="h-12 rounded-xl bg-[#0D9488] px-8 text-base font-semibold text-white shadow-lg hover:bg-[#0B7A70]"
            >
              <Link href="/login">
                {content.cta.buttonPrimary} <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-xl border-white/20 bg-white/10 px-7 text-base font-semibold text-white hover:bg-white/20"
            >
              <Link href="/login">{content.cta.buttonSecondary}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. INSTITUTIONAL FOOTER                                                  */}
      {/* ========================================================================= */}
      <footer className="border-t border-[#DCE7E5] bg-white py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <BrandMark />
                <span className="text-xl font-bold text-[#142B45]">Saksham FLN</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#64748B] max-w-md">
                {content.footer.problemStatement}
              </p>
              <p className="mt-2 text-xs font-medium text-[#475569]">
                {content.footer.stakeholder}
              </p>
              <p className="mt-1 text-[11px] text-[#94A3B8]">
                {content.footer.compliance}
              </p>
            </div>

            <div className="flex flex-col justify-between gap-6 lg:items-end">
              <div className="flex flex-wrap gap-6 text-xs font-semibold text-[#475569]">
                {content.footer.links.map((link, idx) => (
                  <a key={idx} href={link.href} className="hover:text-[#0D9488] transition">
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs text-[#64748B]">
                <a
                  href="https://github.com/shreyanshio/saksham-fln"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[#0D9488] transition"
                >
                  GitHub Repository <ExternalLink size={12} />
                </a>
                <span>·</span>
                <Link href="/login" className="hover:text-[#0D9488] transition">
                  Teacher Login
                </Link>
                <span>·</span>
                <span>{content.footer.openSource}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

/**
 * Geometric Brand Mark Icon with Mortarboard and Open Book Geometry.
 */
function BrandMark() {
  return (
    <div className="flex size-10 items-center justify-center rounded-xl bg-[#142B45] text-white shadow-xs">
      <svg viewBox="0 0 32 32" className="size-5" fill="none" aria-hidden="true">
        <path
          d="M5 9.5 16 14l11-4.5v13L16 27 5 22.5v-13Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M16 14v13M9 11l7 3 7-3" stroke="#8ACFC4" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M21 7c1.8-2 4.2-2.4 6-2.2-.2 2.1-1.2 4.2-3.2 5.1"
          stroke="#F4B544"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
