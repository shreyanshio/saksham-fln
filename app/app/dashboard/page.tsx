'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  GraduationCap,
  Info,
  RotateCcw,
  Sparkles,
  Users,
  Wifi,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DemoState,
  getInitialDemoState,
  resetDemoState,
  saveDemoState,
  Student,
} from '@/lib/demo-data'
import { evaluateFLNDiagnostic } from '@/lib/fln-scoring-engine'
import { DemoJourneyBanner } from '@/components/demo-journey-banner'
import { StudentProfileModal } from '@/components/student-profile-modal'
import { AssessmentModal } from '@/components/assessment-modal'
import { DiagnosticModal } from '@/components/diagnostic-modal'
import { LearningPlanModal } from '@/components/learning-plan-modal'
import { ActivityModal } from '@/components/activity-modal'
import { useI18n } from '@/lib/i18n/context'
import { studentService } from '@/lib/services/studentService'
import { classService } from '@/lib/services/classService'
import { learningPlanService } from '@/lib/services/learningPlanService'
import { teacherActionService } from '@/lib/services/teacherActionService'
import { assessmentService } from '@/lib/services/assessmentService'
import { auditService } from '@/lib/services/auditService'
import { syncService } from '@/lib/services/syncService'
import { localStore } from '@/lib/storage'

export default function DashboardPage() {
  const { t } = useI18n()
  const [state, setState] = useState<DemoState>(getInitialDemoState)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [activeActivityId, setActiveActivityId] = useState<string | null>(null)
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null)

  // Journey modals
  const [modalMode, setModalMode] = useState<
    'none' | 'profile' | 'assessment' | 'diagnostic' | 'plan' | 'activity'
  >('none')

  // Save state on changes
  useEffect(() => {
    saveDemoState(state)
  }, [state])

  function updateStudent(updated: Student) {
    setState((prev) => ({
      ...prev,
      students: prev.students.map((s) => (s.id === updated.id ? updated : s)),
    }))
    setSelectedStudent(updated)
  }

  function handleReset() {
    localStore.resetWorkspace()
    const fresh = resetDemoState()
    setState(fresh)
    setSelectedStudent(null)
    setModalMode('none')
    setFeedbackToast('Demo and canonical workspace reset to initial baseline.')
    setTimeout(() => setFeedbackToast(null), 3000)
  }

  // Journey Step 3: Select Student
  function handleSelectStudent(student: Student) {
    setSelectedStudent(student)
    setModalMode('profile')
    if (state.currentStage === 2 && student.id === 'aarav-k') {
      setState((prev) => ({ ...prev, currentStage: 3, selectedStudentId: student.id }))
    }
  }

  // Journey Step 4: Start Assessment
  function handleStartAssessment(student: Student) {
    setSelectedStudent(student)
    setModalMode('assessment')
    if (state.currentStage <= 3) {
      setState((prev) => ({ ...prev, currentStage: 4 }))
    }
  }

  // Journey Step 4 -> Step 5: Diagnostic Results
  function handleCompleteAssessment(answers: Record<string, string>, notes: string) {
    if (!selectedStudent) return

    const evaluation = evaluateFLNDiagnostic(answers, notes)

    const updated: Student = {
      ...selectedStudent,
      diagnosticStatus: 'Completed',
      diagnosticScore: evaluation.overallScore,
      diagnosticResult: evaluation,
      prerequisiteGap: evaluation.pedagogicalSummary,
      pedagogicalInsight: notes || evaluation.pedagogicalSummary,
      planStatus: 'Pending approval',
      activities: evaluation.recommendedActivities.map((act, i) => ({
        id: act.id,
        title: act.title,
        description: act.description,
        duration: act.duration,
        status: i === 0 ? ('in_progress' as const) : ('locked' as const),
        focusPrerequisite: act.focusSkill,
      })),
    }

    // Synchronize canonical storage layers
    assessmentService.saveAttempt({
      id: `att-${Date.now()}`,
      assessmentId: 'asmt-3a-num-01',
      studentId: selectedStudent.id,
      answers,
      currentQuestionIndex: evaluation.totalQuestions,
      teacherNotes: notes,
      status: 'Completed',
      lastSavedAt: 'Just now',
    })

    const canonicalStudent = studentService.getStudentById(selectedStudent.id)
    if (canonicalStudent) {
      studentService.updateStudent({
        ...canonicalStudent,
        diagnosticScore: evaluation.overallScore,
        overallStatus:
          evaluation.overallScore < 70
            ? 'Needs Support'
            : evaluation.overallScore < 85
            ? 'Developing'
            : 'Demonstrated',
        lastAssessedDate: 'Today',
        planStatus: 'Pending approval',
        prerequisiteGap:
          evaluation.probableGapsCount > 0
            ? evaluation.pedagogicalSummary
            : canonicalStudent.prerequisiteGap,
      })
    }

    teacherActionService.addAction({
      id: `act-asmt-${Date.now()}`,
      title: `Approve remedial plan for ${selectedStudent.fullName}`,
      titleGu: `${selectedStudent.fullName} માટે ઉપચાર અધ્યયન યોજના મંજૂર કરો`,
      titleHi: `${selectedStudent.fullName} के लिए उपचारात्मक शिक्षण योजना स्वीकृत करें`,
      description: `Diagnostic screening scored ${evaluation.overallScore}%. Review 5-day pathway for ${evaluation.probableGapsCount} identified gap(s).`,
      reason: 'Diagnostic check identified prerequisite gap requiring structured intervention.',
      relatedSkill: 'Place Value Bundling',
      relatedStudentId: selectedStudent.id,
      relatedStudentName: selectedStudent.fullName,
      relatedClassId: 'class-std-3a',
      className: 'Standard 3 - A',
      priority: evaluation.overallScore < 70 ? 'High' : 'Medium',
      dueDate: 'Today',
      status: 'Pending',
      recommendedNextStep: 'Sign off on daily micro-intervention plan.',
    })

    auditService.logEvent({
      actorId: 'usr-tea-01',
      actorName: 'Asha Shah',
      role: 'teacher',
      eventType: 'assessment_completed',
      entityType: 'assessment',
      entityId: 'asmt-3a-num-01',
      summary: `Completed FLN diagnostic for ${selectedStudent.fullName}: Score ${evaluation.overallScore}%, ${evaluation.probableGapsCount} gaps identified.`,
    })

    updateStudent(updated)
    setState((prev) => ({
      ...prev,
      currentStage: 5,
      studentsAssessedCount: Math.min(prev.totalStudentsCount, prev.studentsAssessedCount + 1),
    }))
    setModalMode('diagnostic')
  }

  // Journey Step 5 -> Step 6: Review Plan
  function handleProceedToPlan(student: Student) {
    setSelectedStudent(student)
    setModalMode('plan')
    setState((prev) => ({ ...prev, currentStage: 6 }))
  }

  // Journey Step 6: Approve Plan
  function handleApprovePlan(student: Student, notes: string) {
    const updated: Student = {
      ...student,
      planStatus: 'Approved',
      approvedAt: 'Just now',
      approvedBy: 'Teacher Asha Shah',
      pedagogicalInsight: notes
        ? `${student.pedagogicalInsight || ''} (Teacher: ${notes})`
        : student.pedagogicalInsight,
    }

    learningPlanService.approvePlan('plan-' + student.id, notes)

    updateStudent(updated)
    setState((prev) => ({
      ...prev,
      currentStage: 7,
      activePlansCount: prev.activePlansCount + 1,
    }))
    setModalMode('profile')
    setFeedbackToast(`Learning Plan approved for ${student.fullName}. Day 1 activity is now active.`)
    setTimeout(() => setFeedbackToast(null), 4000)
  }

  // Journey Step 7: Start Activity
  function handleStartActivity(student: Student, activityId: string) {
    setSelectedStudent(student)
    setActiveActivityId(activityId)
    setModalMode('activity')
  }

  // Journey Step 7 -> Step 8: Complete Activity
  function handleCompleteActivity(activityId: string, teacherNote: string) {
    if (!selectedStudent) return

    const actIndex = selectedStudent.activities.findIndex((a) => a.id === activityId)
    const updatedActivities = selectedStudent.activities.map((act, idx) => {
      if (act.id === activityId) {
        return {
          ...act,
          status: 'completed' as const,
          completedAt: 'Just now',
          teacherNote,
        }
      }
      if (idx === actIndex + 1) {
        return {
          ...act,
          status: 'in_progress' as const,
        }
      }
      return act
    })

    const updated: Student = {
      ...selectedStudent,
      status: 'Practising',
      progressPercent: 50,
      activities: updatedActivities,
    }

    learningPlanService.completeActivity('plan-' + selectedStudent.id, activityId, teacherNote)
    studentService.recordActivityCompletion(selectedStudent.id, activityId)

    updateStudent(updated)
    setState((prev) => ({
      ...prev,
      currentStage: 8,
      milestonesThisWeek: prev.milestonesThisWeek + 1,
    }))
    setModalMode('profile')
    setFeedbackToast(`Milestone recorded! Activity 1 marked complete for ${selectedStudent.fullName}.`)
    setTimeout(() => setFeedbackToast(null), 5000)
  }

  function toggleAction(actionId: string) {
    setState((prev) => ({
      ...prev,
      actions: prev.actions.map((a) => (a.id === actionId ? { ...a, completed: !a.completed } : a)),
    }))
  }

  // Chart data based on timeFilter
  const chartTrends: Record<DemoState['timeFilter'], number[]> = {
    '6w': [35, 42, 48, 55, 62, state.currentStage === 8 ? 72 : 70],
    '4w': [48, 55, 62, state.currentStage === 8 ? 72 : 70],
    term1: [20, 28, 35, 42, 48, 55],
  }
  const activeChart = chartTrends[state.timeFilter]

  return (
    <div className="space-y-6">
      {/* Top Banner Guide for Demo Journey */}
      <DemoJourneyBanner
        currentStage={state.currentStage}
        onReset={handleReset}
        onQuickJump={(stage) => {
          if (stage === 1) {
            window.location.href = '/login'
          } else if (stage === 3) {
            const aarav = state.students.find((s) => s.id === 'aarav-k')
            if (aarav) handleSelectStudent(aarav)
          } else if (stage === 4) {
            const aarav = state.students.find((s) => s.id === 'aarav-k')
            if (aarav) handleStartAssessment(aarav)
          } else if (stage === 5) {
            const aarav = state.students.find((s) => s.id === 'aarav-k')
            if (aarav) {
              setSelectedStudent(aarav)
              setModalMode('diagnostic')
            }
          } else if (stage === 6) {
            const aarav = state.students.find((s) => s.id === 'aarav-k')
            if (aarav) {
              setSelectedStudent(aarav)
              setModalMode('plan')
            }
          }
        }}
      />

      {/* Floating feedback toast */}
      {feedbackToast && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-2xl border border-[#14A89B]/40 glass-panel-teal px-4 py-2.5 text-xs font-semibold text-[#0D9488] shadow-lg animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Journey Completion Celebration Banner (Stage 8) */}
      {state.currentStage === 8 && (
        <div className="rounded-3xl border border-[#14A89B]/35 glass-panel-teal p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#0D9488] text-white shadow-xs">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#142B45] sm:text-base tracking-tight">
                  Foundational Assessment & Remedial Cycle Complete
                </h2>
                <p className="mt-0.5 text-xs text-[#0D9488] leading-relaxed">
                  You successfully assessed Aarav Kumar, identified the prerequisite bundling gap, approved the 5-day pathway, and recorded Activity 1 completion.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Button
                onClick={() => {
                  const aarav = state.students.find((s) => s.id === 'aarav-k')
                  if (aarav) handleSelectStudent(aarav)
                }}
                className="h-9 rounded-xl bg-[#0D9488] px-4 text-xs font-semibold text-white hover:bg-[#087F75] shadow-xs"
              >
                View Aarav’s Profile
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="h-9 rounded-xl border-[#14A89B]/30 glass-panel-subtle px-3 text-xs font-medium text-[#0D9488]"
              >
                <RotateCcw size={12} className="mr-1" /> Reset
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Greeting Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/85 shadow-xs">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF5D9] border border-[#C58A32]/30 px-3 py-0.5 text-[11px] font-semibold text-[#C58A32]">
              <span className="size-1.5 rounded-full bg-[#C58A32]" />
              Asha Primary School · Devbhumi Dwarka
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#142B45]">
              {t.dashboard.welcomeGreeting}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#64748B]">
              {t.dashboard.subtitle}
            </p>
          </div>

          {/* Quick Route Shortcuts */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/app/classes"
              className="flex h-9 items-center gap-1.5 rounded-xl border border-white/80 glass-panel-subtle glass-interactive px-3 text-xs font-semibold text-[#142B45] hover:text-[#0D9488]"
            >
              <GraduationCap size={15} className="text-[#0D9488]" />
              <span>{t.nav.classes}</span>
            </Link>
            <Link
              href="/app/students"
              className="flex h-9 items-center gap-1.5 rounded-xl border border-white/80 glass-panel-subtle glass-interactive px-3 text-xs font-semibold text-[#142B45] hover:text-[#0D9488]"
            >
              <Users size={15} className="text-[#0D9488]" />
              <span>{t.nav.students}</span>
            </Link>
            <Link
              href="/app/assessments"
              className="flex h-9 items-center gap-1.5 rounded-xl border border-white/80 glass-panel-subtle glass-interactive px-3 text-xs font-semibold text-[#142B45] hover:text-[#0D9488]"
            >
              <ClipboardCheck size={15} className="text-[#0D9488]" />
              <span>{t.nav.assessments}</span>
            </Link>
            <Link
              href="/app/reports"
              className="flex h-9 items-center gap-1.5 rounded-xl border border-white/80 glass-panel-subtle glass-interactive px-3 text-xs font-semibold text-[#142B45] hover:text-[#0D9488]"
            >
              <BarChart3 size={15} className="text-[#0D9488]" />
              <span>{t.nav.reports}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Primary Metric Cards with Calm Glassmorphism */}
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl glass-panel glass-interactive p-5 border border-white/85 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B]">{t.dashboard.metrics.studentsAssessed}</span>
            <div className="flex size-9 items-center justify-center rounded-2xl bg-[#DFF5EF] text-[#0D9488] shadow-2xs">
              <Users size={17} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-[#142B45]">
              {Math.max(studentService.getStudents().filter((s) => s.diagnosticScore !== undefined || s.lastAssessedDate).length, state.studentsAssessedCount)}
            </span>
            <span className="text-xs font-medium text-[#64748B]">
              / {Math.max(studentService.getStudents().length, state.totalStudentsCount)} ({Math.round((Math.max(studentService.getStudents().filter((s) => s.diagnosticScore !== undefined || s.lastAssessedDate).length, state.studentsAssessedCount) / Math.max(studentService.getStudents().length, state.totalStudentsCount)) * 100)}%)
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[#64748B]">Class 3A Enrolled Cohort</p>
        </div>

        <div className="rounded-3xl glass-panel glass-interactive p-5 border border-white/85 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B]">{t.dashboard.metrics.activeSupportPlans}</span>
            <div className="flex size-9 items-center justify-center rounded-2xl bg-[#DFF5EF] text-[#0D9488] shadow-2xs">
              <BookOpen size={17} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-[#142B45]">
              {Math.max(learningPlanService.getPlans().filter((p) => p.status !== 'Completed').length, state.activePlansCount)}
            </span>
            <span className="text-xs font-semibold text-[#16865D]">Active Pathways</span>
          </div>
          <p className="mt-1 text-[11px] text-[#64748B]">Targeted 5-day micro-pathways</p>
        </div>

        <div className="rounded-3xl glass-panel glass-interactive p-5 border border-white/85 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B]">{t.dashboard.metrics.milestonesThisWeek}</span>
            <div className="flex size-9 items-center justify-center rounded-2xl bg-[#DFF5EF] text-[#0D9488] shadow-2xs">
              <CheckCircle2 size={17} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-[#142B45]">
              {state.milestonesThisWeek}
            </span>
            <span className="text-xs font-semibold text-[#16865D]">+2 this week</span>
          </div>
          <p className="mt-1 text-[11px] text-[#64748B]">Hands-on activities signed off</p>
        </div>

        <div className="rounded-3xl glass-panel glass-interactive p-5 border border-white/85 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B]">{t.dashboard.metrics.awaitingSync}</span>
            <div className="flex size-9 items-center justify-center rounded-2xl bg-[#DFF5EF] text-[#0D9488] shadow-2xs">
              <Wifi size={17} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-[#142B45]">
              {state.awaitingSyncCount < 10 ? `0${state.awaitingSyncCount}` : state.awaitingSyncCount}
            </span>
            <span className="text-xs font-medium text-[#64748B]">Records</span>
          </div>
          <p className="mt-1 text-[11px] text-[#64748B]">
            {state.awaitingSyncCount === 0 ? 'All local records synchronized' : 'Stored locally in device queue'}
          </p>
        </div>
      </div>

      {/* Progress Chart & Skill-Gap Distribution Grid */}
      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Class Milestone Trend Chart */}
        <div className="rounded-3xl glass-panel p-6 border border-white/85 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-[#142B45] tracking-tight">Class FLN Milestone Completion</h2>
              <p className="text-xs text-[#64748B]">Weekly percentage of prescribed foundational activities completed</p>
            </div>
            <select
              value={state.timeFilter}
              onChange={(e) => setState((prev) => ({ ...prev, timeFilter: e.target.value as DemoState['timeFilter'] }))}
              aria-label="Filter timeframe"
              className="rounded-xl glass-input px-3 py-1.5 text-xs font-semibold text-[#142B45] outline-none"
            >
              <option value="6w">Last 6 weeks</option>
              <option value="4w">Last 4 weeks</option>
              <option value="term1">Term 1 Baseline</option>
            </select>
          </div>

          <div className="mt-6 flex h-44 items-end gap-3 border-b border-l border-[#DCE7E5] px-3 pb-0 pt-2 sm:gap-6">
            {activeChart.map((height, i) => (
              <div key={i} className="group relative flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <div
                  className="w-full max-w-10 rounded-t-xl bg-gradient-to-t from-[#0D9488]/80 to-[#14A89B] transition-all duration-300 group-hover:from-[#0D9488] group-hover:to-[#14A89B] shadow-2xs"
                  style={{ height: `${height}%` }}
                />
                <span className="text-[10px] font-semibold text-[#64748B]">W{i + 1}</span>
                <div className="pointer-events-none absolute -top-7 rounded-lg glass-panel-navy px-2 py-0.5 text-[10px] font-bold text-white opacity-0 transition-opacity group-hover:opacity-100 shadow-md">
                  {height}%
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-[#64748B]">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#0D9488]" />
              Cohort avg: {Math.round(activeChart.reduce((a, b) => a + b, 0) / activeChart.length)}%
            </span>
            <span className="text-[11px] font-medium text-[#94A3B8]">Class 3A (28 Students)</span>
          </div>
        </div>

        {/* Skill-Gap Distribution */}
        <div className="rounded-3xl glass-panel p-6 border border-white/85 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#142B45] tracking-tight">Prerequisite Gap Distribution</h2>
              <p className="text-xs text-[#64748B]">Identified by diagnostic screening</p>
            </div>
            <span className="rounded-xl border border-[#14A89B]/30 bg-[#DFF5EF] px-2.5 py-0.5 text-[10px] font-bold text-[#0D9488]">
              100% Total
            </span>
          </div>

          <div className="mt-5 space-y-3.5">
            {[
              ['Reading & Word Decoding', 28, 'bg-[#0D9488]'],
              ['Reading Comprehension', 19, 'bg-[#14A89B]'],
              ['Number Sense & Place Value', 24, 'bg-[#C58A32]'],
              ['Arithmetic with Regrouping', 15, 'bg-[#4387B8]'],
              ['Phonics & Consonant Blends', 14, 'bg-[#7E57C2]'],
            ].map(([label, value, color]) => (
              <div key={label as string}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-semibold text-[#142B45] truncate">{label}</span>
                  <span className="font-bold text-[#142B45]">{value}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-black/[0.05]">
                  <div
                    className={`h-2 rounded-full ${color as string} transition-all duration-500`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learners Needing Follow-up & Today's Teacher Actions Grid */}
      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Learners Needing Follow-up */}
        <div className="rounded-3xl glass-panel p-6 border border-white/85 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#142B45] tracking-tight">Learners Needing Immediate Support</h2>
              <p className="text-xs text-[#64748B]">Pedagogical follow-ups based on recent observations</p>
            </div>
            <Link
              href="/app/students"
              className="text-xs font-semibold text-[#0D9488] hover:underline"
            >
              All {state.students.length} students <ChevronRight className="inline" size={13} />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-[#DCE7E5]/60">
            {state.students.slice(0, 3).map((st) => (
              <div
                key={st.id}
                className="flex flex-col justify-between gap-3 py-3 rounded-2xl hover:bg-white/60 transition-all sm:flex-row sm:items-center px-1"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#DFF5EF] text-xs font-bold text-[#0D9488] shadow-2xs">
                    {st.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#142B45]">{st.fullName}</span>
                      <span className="rounded-lg bg-black/[0.04] border border-[#DCE7E5] px-1.5 py-0.2 text-[10px] text-[#64748B]">
                        Roll #{st.rollNo}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B]">
                      Prerequisite: <strong className="font-semibold text-[#142B45]">{st.focusSkill}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:justify-end">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                      st.status === 'Needs support'
                        ? 'border border-[#C58A32]/30 bg-[#FFF5D9] text-[#C58A32]'
                        : st.status === 'Practising'
                        ? 'border border-[#14A89B]/30 bg-[#DFF5EF] text-[#16865D]'
                        : 'border border-[#DCE7E5] bg-black/[0.04] text-[#64748B]'
                    }`}
                  >
                    {st.status}
                  </span>

                  <Button
                    onClick={() => handleSelectStudent(st)}
                    variant="outline"
                    className="h-8 rounded-xl px-3 text-xs font-semibold text-[#0D9488]"
                  >
                    View profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Teacher Actions Checklist */}
        <div className="rounded-3xl glass-panel p-6 border border-white/85 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#142B45] tracking-tight">{t.dashboard.todaysActions}</h2>
              <p className="text-xs text-[#64748B]">
                {state.actions.filter((a) => a.completed).length} of {state.actions.length} completed
              </p>
            </div>
            <Link
              href="/app/actions"
              className="text-xs font-semibold text-[#0D9488] hover:underline"
            >
              Workspace <ChevronRight className="inline" size={13} />
            </Link>
          </div>

          <div className="mt-4 space-y-2.5">
            {state.actions.map((act) => (
              <label
                key={act.id}
                onClick={() => toggleAction(act.id)}
                className={`flex cursor-pointer items-start gap-2.5 rounded-2xl border p-3 text-xs transition-all ${
                  act.completed
                    ? 'border-[#DCE7E5]/60 bg-black/[0.02] text-[#94A3B8]'
                    : 'border-white/80 glass-panel-solid text-[#172B3A] hover:border-[#0D9488]/40 shadow-2xs'
                }`}
              >
                <input
                  type="checkbox"
                  checked={act.completed}
                  onChange={() => {}}
                  className="mt-0.5 size-4 rounded-md accent-[#0D9488]"
                />
                <div className="min-w-0 flex-1">
                  <span className={act.completed ? 'line-through text-[#94A3B8]' : 'font-semibold text-[#142B45]'}>
                    {act.text}
                  </span>
                  <span className="mt-0.5 block text-[10px] text-[#64748B]">{act.dueText}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Global Interactive Journey Modals */}
      {modalMode === 'profile' && selectedStudent && (
        <StudentProfileModal
          student={selectedStudent}
          onClose={() => setModalMode('none')}
          onStartAssessment={handleStartAssessment}
          onViewDiagnostic={(st) => {
            setSelectedStudent(st)
            setModalMode('diagnostic')
          }}
          onReviewPlan={(st) => {
            setSelectedStudent(st)
            setModalMode('plan')
          }}
          onStartActivity={handleStartActivity}
        />
      )}

      {modalMode === 'assessment' && selectedStudent && (
        <AssessmentModal
          student={selectedStudent}
          onClose={() => setModalMode('none')}
          onSubmitAssessment={handleCompleteAssessment}
        />
      )}

      {modalMode === 'diagnostic' && selectedStudent && (
        <DiagnosticModal
          student={selectedStudent}
          onClose={() => setModalMode('none')}
          onProceedToPlan={handleProceedToPlan}
          onStartDirectActivity={(st, actId) => handleStartActivity(st, actId)}
        />
      )}

      {modalMode === 'plan' && selectedStudent && (
        <LearningPlanModal
          student={selectedStudent}
          onClose={() => setModalMode('none')}
          onApprovePlan={handleApprovePlan}
        />
      )}

      {modalMode === 'activity' && selectedStudent && activeActivityId && (
        <ActivityModal
          student={selectedStudent}
          activity={selectedStudent.activities.find((a) => a.id === activeActivityId)!}
          onClose={() => setModalMode('none')}
          onCompleteActivity={handleCompleteActivity}
        />
      )}
    </div>
  )
}
