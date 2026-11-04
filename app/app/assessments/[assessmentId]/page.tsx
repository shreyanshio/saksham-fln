'use client'

import React, { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  ExternalLink,
  Eye,
  FileCheck2,
  FileText,
  GraduationCap,
  HelpCircle,
  Info,
  Layers,
  RotateCcw,
  Save,
  Sparkles,
  Target,
  User,
  Users,
  Volume2,
} from 'lucide-react'
import { assessmentService, AssessmentAttempt } from '@/lib/services/assessmentService'
import { studentService } from '@/lib/services/studentService'
import { learningPlanService } from '@/lib/services/learningPlanService'
import { teacherActionService } from '@/lib/services/teacherActionService'
import { auditService } from '@/lib/services/auditService'
import { AssessmentRecord, StudentRecord } from '@/lib/types'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import {
  FLN_DIAGNOSTIC_QUESTIONS,
  DiagnosticEvaluationResult,
  evaluateFLNDiagnostic,
} from '@/lib/fln-scoring-engine'

export default function AssessmentRunnerPage({
  params,
}: {
  params: Promise<{ assessmentId: string }>
}) {
  const { assessmentId } = use(params)
  const router = useRouter()
  const { t } = useI18n()

  const asmt = assessmentService.getAssessmentById(assessmentId)
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    asmt?.targetStudentIds[0] || 'aarav-k'
  )

  const activeStudent = studentService.getStudentById(selectedStudentId)

  // Assessment runner state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [teacherNotes, setTeacherNotes] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [evaluationResult, setEvaluationResult] = useState<DiagnosticEvaluationResult | null>(null)
  const [planApproved, setPlanApproved] = useState(false)
  const [resumedBanner, setResumedBanner] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  // Check and load saved attempt on mount or when student changes
  useEffect(() => {
    if (!asmt) return
    const saved = assessmentService.getAttempt(asmt.id, selectedStudentId)
    if (saved && saved.status === 'In Progress') {
      setAnswers(saved.answers || {})
      setCurrentQuestionIndex(saved.currentQuestionIndex || 0)
      setTeacherNotes(saved.teacherNotes || '')
      setResumedBanner(`Restored in-progress attempt (${saved.lastSavedAt}). You can continue or start fresh.`)
      setEvaluationResult(null)
    } else {
      setAnswers({})
      setCurrentQuestionIndex(0)
      setTeacherNotes('')
      setResumedBanner(null)
      setEvaluationResult(null)
    }
  }, [asmt?.id, selectedStudentId])

  if (!asmt) {
    return (
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-12 text-center">
        <ClipboardCheck size={32} className="mx-auto text-[#CBD5E1]" />
        <h2 className="mt-3 text-base font-bold text-[#17324D]">Assessment not found</h2>
        <p className="mt-1 text-xs text-[#64748B]">No assessment record matching ID &ldquo;{assessmentId}&rdquo;.</p>
        <Link
          href="/app/assessments"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#0D9488] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#087F75]"
        >
          <ArrowLeft size={13} /> Back to Assessments
        </Link>
      </div>
    )
  }

  const currentQ = FLN_DIAGNOSTIC_QUESTIONS[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === FLN_DIAGNOSTIC_QUESTIONS.length - 1
  const hasAnsweredCurrent = !!answers[currentQ?.id]

  // Read aloud question using Web Speech API
  function handleReadAloud() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()

    const textToSpeak = `${currentQ.questionGu}. ${currentQ.questionEn}`
    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.lang = 'gu-IN'
    utterance.rate = 0.9

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  function handleSelectOption(optionId: string) {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: optionId }))
  }

  function handleNext() {
    if (currentQuestionIndex < FLN_DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  function handlePrevious() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  function handleSaveDraft() {
    if (!asmt) return
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const attempt: AssessmentAttempt = {
      id: `attempt-${asmt.id}-${selectedStudentId}`,
      assessmentId: asmt.id,
      studentId: selectedStudentId,
      answers,
      currentQuestionIndex,
      teacherNotes,
      status: 'In Progress',
      lastSavedAt: `Today at ${now}`,
    }
    assessmentService.saveAttempt(attempt)
    auditService.logEvent({
      actorId: 'usr-teacher-01',
      actorName: 'Teacher Asha Shah',
      role: 'teacher',
      eventType: 'student_progress_updated',
      entityType: 'assessment',
      entityId: asmt.id,
      summary: `Saved draft attempt for ${activeStudent?.fullName || selectedStudentId} at Question ${currentQuestionIndex + 1}`,
    })
    showToast('Assessment progress saved! You can resume this attempt anytime.')
  }

  function handleResetAttempt() {
    if (!asmt) return
    assessmentService.clearAttempt(asmt.id, selectedStudentId)
    setAnswers({})
    setCurrentQuestionIndex(0)
    setTeacherNotes('')
    setResumedBanner(null)
    showToast('Attempt cleared. Ready for fresh evaluation.')
  }

  function handleSubmitAssessment() {
    const evalRes = evaluateFLNDiagnostic(answers, teacherNotes)
    setEvaluationResult(evalRes)

    // Mark attempt completed in assessmentService
    if (asmt) {
      assessmentService.saveAttempt({
        id: `attempt-${asmt.id}-${selectedStudentId}`,
        assessmentId: asmt.id,
        studentId: selectedStudentId,
        answers,
        currentQuestionIndex,
        teacherNotes,
        status: 'Completed',
        lastSavedAt: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      })
      assessmentService.updateAssessmentStatus(asmt.id, 'Completed')
    }

    // Update student record
    if (activeStudent) {
      const updated: StudentRecord = {
        ...activeStudent,
        diagnosticScore: evalRes.overallScore,
        prerequisiteGap: evalRes.pedagogicalSummary,
        pedagogicalInsight: teacherNotes || evalRes.pedagogicalSummary,
        planStatus: 'Pending approval',
        overallStatus: evalRes.overallScore < 70 ? 'Needs Support' : evalRes.overallScore < 85 ? 'Developing' : 'Demonstrated',
        lastAssessedDate: 'Just now',
      }
      studentService.updateStudent(updated)
    }

    // Automatically generate structured 5-day weekly remedial plan in learningPlanService
    if (activeStudent && asmt) {
      const planId = `plan-${activeStudent.id}`
      const dayNames: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday')[] = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ]
      const dayGuNames = ['સોમવાર', 'મંગળવાર', 'બુધવાર', 'ગુરુવાર', 'શુક્રવાર']
      const dayHiNames = ['सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार']

      const scheduleItems = evalRes.recommendedActivities.slice(0, 5).map((act, idx) => ({
        day: dayNames[idx] || 'Monday',
        dayGu: dayGuNames[idx] || `દિવસ ${idx + 1}`,
        dayHi: dayHiNames[idx] || `दिन ${idx + 1}`,
        activityTitle: act.title,
        targetSkill: act.focusSkill,
        durationMinutes: parseInt(act.duration) || 12,
        status: idx === 0 ? ('ready' as const) : ('scheduled' as const),
      }))

      const fullActivities = evalRes.recommendedActivities.map((act, idx) => ({
        id: `act-${activeStudent.id}-${idx + 1}`,
        title: act.title,
        titleGu: act.titleGu,
        titleHi: act.title,
        subject: asmt.subject,
        targetSkillId: evalRes.skills.find((s) => s.isProbableGap)?.skillId || 'fln-core',
        targetSkillName: act.focusSkill,
        prerequisiteSkillName: evalRes.skills.find((s) => s.isProbableGap)?.skillName || 'Foundational readiness',
        gradeRange: `Class ${asmt.standard}`,
        format: asmt.subject === 'numeracy' ? ('guided_math' as const) : ('phonics' as const),
        duration: act.duration,
        curriculumMapping: `GCERT Class ${asmt.standard} LO-${asmt.subject === 'numeracy' ? 'M' : 'L'}30${idx + 1}`,
        description: act.description,
        materialsNeeded: act.materialsNeeded,
        teacherScriptGu: act.teacherScript,
        teacherScriptEn: act.teacherScript,
        status: idx === 0 ? ('ready' as const) : ('locked' as const),
      }))

      learningPlanService.createOrUpdatePlan({
        id: planId,
        studentId: activeStudent.id,
        studentName: activeStudent.fullName,
        classId: asmt.classId,
        title: `${asmt.subject === 'numeracy' ? 'Numeracy' : 'Literacy'} Remedial Pathway: ${activeStudent.fullName}`,
        titleGu: `${asmt.subject === 'numeracy' ? 'ગણિત' : 'ભાષા'} ઉપચારાત્મક શિક્ષણ માર્ગ`,
        status: 'Pending approval',
        targetSkill: evalRes.skills.find((s) => s.isProbableGap)?.skillName || 'Foundational Competencies',
        prerequisiteGap: evalRes.pedagogicalSummary,
        teacherNotes: teacherNotes || 'Auto-generated from diagnostic attempt evidence.',
        startDate: new Date().toISOString().split('T')[0],
        targetCompletionDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        weeklySchedule: scheduleItems,
        activities: fullActivities,
      })

      // Create teacher action item
      teacherActionService.addAction({
        id: `action-${Date.now()}`,
        title: `Review and approve learning plan for ${activeStudent.fullName}`,
        titleGu: `${activeStudent.fullName} માટે ઉપચાર અધ્યયન યોજના મંજૂર કરો`,
        titleHi: `${activeStudent.fullName} के लिए उपचारात्मक योजना स्वीकृत करें`,
        description: `Diagnostic screening scored ${evalRes.overallScore}%. Review and approve 5-day remedial micro-activities.`,
        reason: evalRes.pedagogicalSummary,
        relatedSkill: evalRes.skills.find((s) => s.isProbableGap)?.skillName || 'FLN Remediation',
        relatedStudentId: activeStudent.id,
        relatedStudentName: activeStudent.fullName,
        relatedClassId: asmt.classId,
        className: `Standard ${asmt.standard}`,
        priority: evalRes.overallScore < 70 ? 'High' : 'Medium',
        dueDate: 'Today',
        status: 'Pending',
        recommendedNextStep: 'Validate 5-day schedule and begin Day 1 tactile activity.',
      })

      // Log tamper-evident audit event
      auditService.logEvent({
        actorId: 'usr-teacher-01',
        actorName: 'Teacher Asha Shah',
        role: 'teacher',
        eventType: 'diagnostic_submitted',
        entityType: 'assessment',
        entityId: asmt.id,
        summary: `Submitted diagnostic for ${activeStudent.fullName}: Score ${evalRes.overallScore}%, ${evalRes.probableGapsCount} probable gaps, ${evalRes.insufficientEvidenceCount} insufficient evidence.`,
      })
    }

    showToast('Diagnostic completed and analyzed! Structured remedial learning pathway created.')
  }

  function handleApprovePathway() {
    if (!activeStudent) return
    const planId = `plan-${activeStudent.id}`

    // Approve the learning plan in learningPlanService
    learningPlanService.approvePlan(planId, teacherNotes)

    // Update student record
    const updated: StudentRecord = {
      ...activeStudent,
      planStatus: 'Approved',
      progressPercent: 20,
      nextRecommendedAction: 'Conduct Day 1 Guided Micro-Activity',
    }
    studentService.updateStudent(updated)

    // Mark matching teacher action complete
    const actions = teacherActionService.getActions()
    const matchingAction = actions.find(
      (a) => a.relatedStudentId === activeStudent.id && a.title.includes('Review and approve')
    )
    if (matchingAction) {
      teacherActionService.updateActionStatus(matchingAction.id, 'Completed')
    }

    // Log tamper-evident audit trail
    auditService.logEvent({
      actorId: 'usr-teacher-01',
      actorName: 'Teacher Asha Shah',
      role: 'teacher',
      eventType: 'plan_approved',
      entityType: 'learning_plan',
      entityId: planId,
      summary: `Approved FLN remedial pathway for ${activeStudent.fullName}.`,
    })

    setPlanApproved(true)
    showToast('Remedial learning pathway approved for classroom implementation!')
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-xl border border-[#0D9488]/30 glass-panel-solid px-4 py-2.5 text-xs font-semibold text-[#0D9488] shadow-lg animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} className="text-[#0D9488]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#64748B]">
        <Link href="/app/assessments" className="hover:text-[#0D9488] hover:underline">
          Assessments Directory
        </Link>
        <ChevronRight size={13} className="text-[#94A3B8]" />
        <span className="font-semibold text-[#142B45]">{asmt.title}</span>
      </div>

      {/* Header Bar */}
      <div className="flex flex-col justify-between gap-3 rounded-2xl glass-panel p-4.5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-white/70 px-2.5 py-0.5 text-[10px] font-bold text-[#142B45] border border-white/80">
              Class {asmt.standard}
            </span>
            <span className="rounded-lg bg-[#DFF5EF]/80 px-2.5 py-0.5 text-[10px] font-bold text-[#0D9488] border border-[#0D9488]/20">
              {asmt.subject === 'numeracy' ? 'Foundational Numeracy' : 'Foundational Literacy'}
            </span>
          </div>
          <h1 className="mt-1.5 text-base font-bold text-[#142B45] sm:text-lg">{asmt.title}</h1>
        </div>

        {/* Student Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#64748B] font-medium">Active Learner:</span>
          <select
            value={selectedStudentId}
            onChange={(e) => {
              setSelectedStudentId(e.target.value)
              setCurrentQuestionIndex(0)
              setAnswers({})
              setEvaluationResult(null)
            }}
            className="glass-input h-9 rounded-xl px-3 text-xs font-semibold text-[#142B45] focus:border-[#0D9488] focus:outline-none cursor-pointer"
          >
            {asmt.targetStudentIds.map((sId) => {
              const s = studentService.getStudentById(sId)
              return (
                <option key={sId} value={sId}>
                  {s ? `${s.fullName} (#${s.rollNo})` : sId}
                </option>
              )
            })}
          </select>
        </div>
      </div>

      {/* Resume Banner */}
      {resumedBanner && !evaluationResult && (
        <div className="flex items-center justify-between rounded-xl border border-[#0D9488]/30 glass-panel-solid px-4 py-2.5 text-xs text-[#0D9488]">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="shrink-0 text-[#0D9488]" />
            <span>{resumedBanner}</span>
          </div>
          <button
            type="button"
            onClick={handleResetAttempt}
            className="text-[11px] font-bold text-[#64748B] hover:text-[#C85A52] underline transition-colors"
          >
            Start Fresh
          </button>
        </div>
      )}

      {!evaluationResult ? (
        /* Question Screen (Child-Friendly, One at a Time) */
        <div className="glass-panel-solid rounded-2xl p-6 shadow-sm">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span className="font-semibold text-[#0D9488]">
              પ્રશ્ન {currentQuestionIndex + 1} of {FLN_DIAGNOSTIC_QUESTIONS.length}
            </span>
            <span>Skill Domain: <strong className="text-[#142B45]">{currentQ.skillCategory}</strong></span>
          </div>

          <div className="mt-2.5 h-2 w-full rounded-full bg-[#DCE7E5]/70 overflow-hidden">
            <div
              className="h-2 rounded-full bg-[#0D9488] transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / FLN_DIAGNOSTIC_QUESTIONS.length) * 100}%`,
              }}
            />
          </div>

          {/* Question Prompt */}
          <div className="mt-6 rounded-2xl border border-white/90 bg-white/70 p-5 shadow-xs">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-bold text-[#142B45] leading-snug sm:text-xl">
                  {currentQ.questionGu}
                </p>
                <p className="mt-1 text-xs text-[#64748B]">{currentQ.questionEn}</p>
              </div>

              <button
                type="button"
                onClick={handleReadAloud}
                aria-label="Read prompt aloud"
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl border transition-all ${
                  isSpeaking
                    ? 'border-[#0D9488] bg-[#DFF5EF] text-[#0D9488] animate-pulse'
                    : 'border-[#DCE7E5] bg-white text-[#142B45] hover:bg-[#F5F8F7]'
                }`}
              >
                <Volume2 size={18} />
              </button>
            </div>
          </div>

          {/* Large Touch Answer Targets */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {currentQ.options.map((opt) => {
              const isSelected = answers[currentQ.id] === opt.id

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt.id)}
                  className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                    isSelected
                      ? 'border-[#0D9488] bg-[#DFF5EF]/60 ring-2 ring-[#0D9488] ring-offset-1'
                      : 'border-[#DCE7E5] bg-white/80 hover:border-[#0D9488]/60 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                        isSelected ? 'bg-[#0D9488] text-white' : 'bg-[#DCE7E5]/60 text-[#142B45]'
                      }`}
                    >
                      {opt.id}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#142B45]">{opt.labelGu}</p>
                      <p className="text-[11px] text-[#64748B]">{opt.labelEn}</p>
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 size={18} className="text-[#0D9488]" />}
                </button>
              )
            })}
          </div>

          {/* Teacher Quick Note for this Question */}
          <div className="mt-5 pt-4 border-t border-[#DCE7E5]/60">
            <label className="block text-xs font-medium text-[#64748B]">
              Teacher observation note (e.g., student verbal hesitation or counting method):
            </label>
            <input
              type="text"
              value={teacherNotes}
              onChange={(e) => setTeacherNotes(e.target.value)}
              placeholder="e.g., Aarav counted one-by-one with fingers instead of grouping 10s."
              className="mt-1.5 glass-input h-9 w-full rounded-xl px-3.5 text-xs text-[#142B45] focus:border-[#0D9488] focus:outline-none"
            />
          </div>

          {/* Navigation Controls & Save Progress */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-2.5 pt-4 border-t border-[#DCE7E5]/60">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={currentQuestionIndex === 0}
                onClick={handlePrevious}
                className="h-9 rounded-xl border-[#DCE7E5] bg-white/70 px-3.5 text-xs font-semibold text-[#142B45] hover:bg-white"
              >
                <ArrowLeft size={13} className="mr-1" /> Previous
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveDraft}
                className="h-9 rounded-xl border-[#0D9488]/30 bg-[#DFF5EF]/50 px-3.5 text-xs font-semibold text-[#0D9488] hover:bg-[#DFF5EF]"
              >
                <Save size={13} className="mr-1.5" /> Save Progress & Resume Later
              </Button>
            </div>

            {isLastQuestion ? (
              <Button
                type="button"
                disabled={!hasAnsweredCurrent}
                onClick={handleSubmitAssessment}
                className="h-9 rounded-xl bg-[#0D9488] px-4.5 text-xs font-semibold text-white shadow-xs hover:bg-[#0b7c71]"
              >
                <CheckCircle2 size={13} className="mr-1.5" /> Complete & Evaluate
              </Button>
            ) : (
              <Button
                type="button"
                disabled={!hasAnsweredCurrent}
                onClick={handleNext}
                className="h-9 rounded-xl bg-[#0D9488] px-4.5 text-xs font-semibold text-white shadow-xs hover:bg-[#0b7c71]"
              >
                Next Question <ArrowRight size={13} className="ml-1" />
              </Button>
            )}
          </div>
        </div>
      ) : (
        /* Post-Assessment Explainable Diagnostic Analysis Screen */
        <div className="space-y-6 glass-panel-solid rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-[#DFF5EF] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0D9488] border border-[#0D9488]/20">
                  Diagnostic Evaluation Generated
                </span>
                <span className="rounded-lg bg-white/80 px-2.5 py-0.5 text-[10px] font-semibold text-[#64748B] border border-[#DCE7E5]">
                  Attempt ID: attempt-{asmt.id}-{selectedStudentId}
                </span>
              </div>
              <h2 className="mt-2 text-lg font-bold text-[#142B45]">
                FLN Diagnostic Analysis: {activeStudent?.fullName}
              </h2>
            </div>

            <div className="text-right">
              <span className="text-xs text-[#64748B] block">Baseline FLN Mastery</span>
              <span className="text-2xl font-black text-[#0D9488]">
                {evaluationResult.overallScore}%
              </span>
            </div>
          </div>

          {/* Explainable Skill Breakdown (Separates Insufficient Evidence from Probable Gap) */}
          <div className="glass-panel rounded-2xl p-4.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Skill Domain Breakdown
              </h3>
              <span className="text-[11px] text-[#64748B]">
                Attempted: {evaluationResult.attemptedQuestionsCount} / {evaluationResult.totalQuestions} Questions
              </span>
            </div>

            <div className="mt-3.5 space-y-3">
              {evaluationResult.skills.map((s) => (
                <div key={s.skillId} className="rounded-xl border border-white/80 bg-white/70 p-3.5 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-[#142B45]">{s.skillName}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                        s.status === 'Mastered'
                          ? 'bg-[#DFF5EF] text-[#16865D] border-[#16865D]/20'
                          : s.status === 'Emerging'
                          ? 'bg-[#E0F2FE] text-[#0284C7] border-[#0284C7]/20'
                          : s.status === 'Insufficient Evidence'
                          ? 'bg-white/70 text-[#64748B] border-[#DCE7E5]'
                          : 'bg-[#FFF5D9] text-[#C58A32] border-[#C58A32]/20'
                      }`}
                    >
                      {s.statusBadge}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-center gap-3">
                    <div className="h-1.5 flex-1 rounded-full bg-[#DCE7E5]/70 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full ${
                          s.status === 'Mastered'
                            ? 'bg-[#16865D]'
                            : s.status === 'Emerging'
                            ? 'bg-[#0D9488]'
                            : s.status === 'Insufficient Evidence'
                            ? 'bg-[#94A3B8]'
                            : 'bg-[#C58A32]'
                        }`}
                        style={{ width: `${s.scorePercent}%` }}
                      />
                    </div>
                    <span className="font-semibold text-[#142B45] shrink-0">
                      {s.scorePercent}% ({s.correctCount}/{s.questionsCount})
                    </span>
                  </div>

                  <p className="mt-2 text-[11px] text-[#64748B] leading-relaxed">
                    <strong className="text-[#142B45]">Observation:</strong> {s.explanation}
                  </p>
                  <p className="mt-1 text-[11px] text-[#0D9488] font-medium leading-relaxed">
                    <strong>Recommended Next Step:</strong> {s.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Probable Learning Gap vs Validated Diagnosis Notice */}
          <div className="rounded-xl border border-[#C58A32]/30 bg-[#FFFBEB]/80 p-4 text-xs text-[#92400E]">
            <div className="flex items-start gap-2.5">
              <AlertTriangle size={18} className="mt-0.5 shrink-0 text-[#C58A32]" />
              <div>
                <strong className="block font-bold text-[#C58A32] text-sm">
                  Pedagogical Clarification: Probable Gap vs Validated Diagnosis
                </strong>
                <p className="mt-1 leading-relaxed">
                  This system identifies a <strong>Probable Learning Gap</strong> from screening response patterns. It does <em>not</em> issue a conclusive clinical diagnosis. In accordance with FLN policy guidelines, classroom teachers must conduct brief hands-on observations (e.g. straw bundling or phonetic flashcards) before formalizing permanent learning classifications.
                </p>
              </div>
            </div>
          </div>

          {/* Itemized Evidence Trail */}
          <div className="glass-panel rounded-2xl p-4.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Item-Level Evidence Trail & Diagnostic Deductions
            </h3>
            <div className="mt-3.5 space-y-2.5">
              {evaluationResult.evidences.map((ev, i) => (
                <div
                  key={ev.questionId}
                  className="rounded-xl border border-white/80 bg-white/70 p-3.5 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#142B45]">
                      Item {i + 1}: {ev.skillName}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                        ev.isCorrect
                          ? 'bg-[#DFF5EF] text-[#16865D] border-[#16865D]/20'
                          : !ev.isAttempted
                          ? 'bg-white/70 text-[#64748B] border-[#DCE7E5]'
                          : 'bg-[#FEE2E2] text-[#C85A52] border-[#C85A52]/20'
                      }`}
                    >
                      {ev.isCorrect ? 'Correct' : !ev.isAttempted ? 'Insufficient Evidence' : 'Demonstrated Error'}
                    </span>
                  </div>
                  <p className="text-[#142B45]">{ev.questionText}</p>
                  <div className="grid gap-1 pt-1 text-[11px] sm:grid-cols-2">
                    <div>
                      <span className="text-[#64748B]">Submitted Response:</span>{' '}
                      <span className="font-semibold text-[#142B45]">{ev.chosenOptionLabel}</span>
                    </div>
                    <div>
                      <span className="text-[#64748B]">Expected Benchmark:</span>{' '}
                      <span className="font-semibold text-[#0D9488]">{ev.targetOptionLabel}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#64748B] pt-1">
                    <strong className="text-[#142B45]">Diagnostic Deduction:</strong> {ev.misconceptionDiagnosis}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended 5-Day Remedial Sequence */}
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Recommended 5-Day Structured Remedial Sequence
              </h3>
              <span className="text-[11px] font-semibold text-[#0D9488]">
                Auto-aligned to GCERT Outcomes
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {evaluationResult.recommendedActivities.map((act, i: number) => (
                <div
                  key={act.id}
                  className="flex items-center justify-between rounded-xl border border-white/80 bg-white/70 p-3.5 text-xs shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#DFF5EF] text-xs font-bold text-[#0D9488]">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-bold text-[#142B45]">{act.title}</p>
                      <p className="text-[11px] text-[#64748B]">{act.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="rounded-lg bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-[#142B45] border border-[#DCE7E5]">
                      {act.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Review & Approval Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#DCE7E5]/60 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setEvaluationResult(null)
                setCurrentQuestionIndex(0)
                setAnswers({})
              }}
              className="h-9 rounded-xl border-[#DCE7E5] bg-white/70 text-xs font-semibold text-[#142B45] hover:bg-white"
            >
              <RotateCcw size={12} className="mr-1.5" /> Retake Diagnostic
            </Button>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/app/assessments"
                className="flex h-9 items-center rounded-xl border border-[#DCE7E5] bg-white/70 px-3.5 text-xs font-semibold text-[#142B45] hover:bg-white transition-colors"
              >
                Back to Assessments
              </Link>

              {planApproved && activeStudent && (
                <Link
                  href={`/app/learning-plans/plan-${activeStudent.id}`}
                  className="flex h-9 items-center gap-1.5 rounded-xl border border-[#0D9488]/30 bg-[#DFF5EF]/60 px-3.5 text-xs font-semibold text-[#0D9488] hover:bg-[#DFF5EF] transition-colors"
                >
                  <ExternalLink size={13} /> View Active Plan
                </Link>
              )}

              <Button
                onClick={handleApprovePathway}
                disabled={planApproved}
                className={`h-9 rounded-xl px-4 text-xs font-semibold text-white shadow-xs transition-all ${
                  planApproved
                    ? 'bg-[#16865D] hover:bg-[#16865D]'
                    : 'bg-[#0D9488] hover:bg-[#0b7c71]'
                }`}
              >
                <CheckCircle2 size={13} className="mr-1.5" />
                {planApproved ? 'Pathway Approved & Assigned' : 'Approve Remedial Pathway'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
