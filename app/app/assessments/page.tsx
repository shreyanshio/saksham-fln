'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  AlertCircle,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Filter,
  GraduationCap,
  Play,
  Plus,
  Search,
  Sparkles,
  Users,
} from 'lucide-react'
import { assessmentService } from '@/lib/services/assessmentService'
import { studentService } from '@/lib/services/studentService'
import { AssessmentRecord } from '@/lib/types'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { AssessmentModal } from '@/components/assessment-modal'
import { DiagnosticModal } from '@/components/diagnostic-modal'
import { evaluateFLNDiagnostic } from '@/lib/fln-scoring-engine'
import { Student } from '@/lib/demo-data'

export default function AssessmentsPage() {
  const { t, locale } = useI18n()
  const [assessments, setAssessments] = useState<AssessmentRecord[]>(() =>
    assessmentService.getAssessments()
  )
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [subjectFilter, setSubjectFilter] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Quick modal support for demo
  const [activeModal, setActiveModal] = useState<'none' | 'assessment' | 'diagnostic'>('none')
  const [demoStudent, setDemoStudent] = useState<Student | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const filtered = assessments.filter((a) => {
    if (statusFilter !== 'All' && a.status !== statusFilter) return false
    if (subjectFilter !== 'All' && a.subject !== subjectFilter) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      const titleMatch = a.title.toLowerCase().includes(q) || (a.titleGu && a.titleGu.toLowerCase().includes(q))
      const classMatch = `class ${a.standard}`.includes(q)
      if (!titleMatch && !classMatch) return false
    }
    return true
  })

  function handleQuickRun(asmt: AssessmentRecord) {
    const student = studentService.getStudentById(asmt.targetStudentIds[0] || 'aarav-k')
    if (student) {
      const legacy: Student = {
        id: student.id,
        name: student.name,
        fullName: student.fullName,
        grade: `Class ${student.standard}${student.section}`,
        rollNo: student.rollNo,
        avatar: student.avatar,
        focusSkill: student.prerequisiteGap,
        status: (student.overallStatus === 'Needs Support'
          ? 'Needs support'
          : student.overallStatus === 'Developing'
          ? 'Practising'
          : 'Ready to progress') as Student['status'],
        diagnosticStatus: (student.diagnosticScore ? 'Completed' : 'Pending assessment') as Student['diagnosticStatus'],
        diagnosticScore: student.diagnosticScore,
        prerequisiteGap: student.prerequisiteGap,
        pedagogicalInsight: student.pedagogicalInsight,
        planStatus: (student.planStatus === 'Approved' ? 'Approved' : 'Pending approval') as Student['planStatus'],
        progressPercent: student.progressPercent,
        activities: [],
      }
      setDemoStudent(legacy)
      setActiveModal('assessment')
    }
  }

  function handleCompleteAssessment(answers: Record<string, string>, notes: string) {
    if (!demoStudent) return
    const evaluation = evaluateFLNDiagnostic(answers, notes)
    const updated: Student = {
      ...demoStudent,
      diagnosticStatus: 'Completed',
      diagnosticScore: evaluation.overallScore,
      diagnosticResult: evaluation,
      prerequisiteGap: evaluation.pedagogicalSummary,
      pedagogicalInsight: notes || evaluation.pedagogicalSummary,
    }
    setDemoStudent(updated)
    assessmentService.updateAssessmentStatus('asmt-3a-num-01', 'Completed')
    setAssessments(assessmentService.getAssessments())
    setActiveModal('diagnostic')
    showToast(`Assessment submitted: ${evaluation.overallScore}% score. Diagnostic report generated.`)
  }

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-xl border border-[#0D9488]/30 glass-panel-solid px-4 py-2.5 text-xs font-semibold text-[#0D9488] shadow-lg animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} className="text-[#0D9488]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0D9488]">
            <ClipboardCheck size={15} />
            <span>{t.assessments.title}</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#142B45]">
            Diagnostic Assessment Directory
          </h1>
          <p className="mt-0.5 text-xs text-[#64748B]">{t.assessments.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/app/assessments/new"
            className="flex h-9 items-center gap-1.5 rounded-xl bg-[#0D9488] px-3.5 text-xs font-semibold text-white shadow-xs hover:bg-[#0b7c71] transition-all"
          >
            <Plus size={14} />
            <span>{t.assessments.newAssessment}</span>
          </Link>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="glass-panel rounded-2xl p-4 transition-all hover:translate-y-[-1px]">
          <span className="text-[11px] font-semibold tracking-wider text-[#64748B] uppercase">Total Assessments</span>
          <p className="mt-1 text-2xl font-extrabold text-[#142B45]">{assessments.length}</p>
          <p className="text-[11px] text-[#64748B] mt-0.5">Covering Class 1–8</p>
        </div>
        <div className="glass-panel rounded-2xl p-4 transition-all hover:translate-y-[-1px]">
          <span className="text-[11px] font-semibold tracking-wider text-[#0D9488] uppercase">In Progress</span>
          <p className="mt-1 text-2xl font-extrabold text-[#0D9488]">
            {assessments.filter((a) => a.status === 'In Progress').length}
          </p>
          <p className="text-[11px] text-[#64748B] mt-0.5">Active classroom checks</p>
        </div>
        <div className="glass-panel rounded-2xl p-4 transition-all hover:translate-y-[-1px]">
          <span className="text-[11px] font-semibold tracking-wider text-[#C58A32] uppercase">Requires Review</span>
          <p className="mt-1 text-2xl font-extrabold text-[#C58A32]">
            {assessments.filter((a) => a.status === 'Requires Review').length}
          </p>
          <p className="text-[11px] text-[#64748B] mt-0.5">Pending teacher sign-off</p>
        </div>
        <div className="glass-panel rounded-2xl p-4 transition-all hover:translate-y-[-1px]">
          <span className="text-[11px] font-semibold tracking-wider text-[#16865D] uppercase">Completed</span>
          <p className="mt-1 text-2xl font-extrabold text-[#16865D]">
            {assessments.filter((a) => a.status === 'Completed').length}
          </p>
          <p className="text-[11px] text-[#64748B] mt-0.5">Diagnostic baseline recorded</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-3 glass-panel rounded-2xl p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assessments by title, standard, or subject..."
            className="glass-input h-9 w-full rounded-xl pl-9 pr-3 text-xs text-[#142B45] placeholder:text-[#94A3B8] focus:border-[#0D9488] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
            className="glass-input h-9 rounded-xl px-3 text-xs font-medium text-[#142B45] focus:border-[#0D9488] focus:outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Requires Review">Requires Review</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Subject filter */}
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            aria-label="Filter by subject"
            className="glass-input h-9 rounded-xl px-3 text-xs font-medium text-[#142B45] focus:border-[#0D9488] focus:outline-none cursor-pointer"
          >
            <option value="All">All Subjects</option>
            <option value="numeracy">Numeracy (ગણિત)</option>
            <option value="literacy">Literacy (ભાષા)</option>
          </select>
        </div>
      </div>

      {/* Assessments Grid */}
      {filtered.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center">
          <ClipboardCheck size={32} className="mx-auto text-[#94A3B8]" />
          <p className="mt-3 text-sm font-semibold text-[#142B45]">{t.common.noRecordsFound}</p>
          <p className="mt-1 text-xs text-[#64748B]">Try clearing your search query or status filter.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((a) => {
            const completionPercent = Math.round((a.completedCount / a.totalCount) * 100)
            const isGujarati = locale === 'gu' && a.titleGu

            return (
              <div
                key={a.id}
                className="glass-panel glass-interactive flex flex-col justify-between rounded-2xl p-5"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="rounded-lg bg-white/70 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#142B45] border border-white/80">
                        Class {a.standard}
                      </span>
                      <span
                        className={`rounded-lg px-2.5 py-0.5 text-[10px] font-semibold border ${
                          a.subject === 'numeracy'
                            ? 'bg-[#DFF5EF]/80 text-[#0D9488] border-[#0D9488]/20'
                            : 'bg-[#FFF5D9]/80 text-[#C58A32] border-[#C58A32]/20'
                        }`}
                      >
                        {a.subject === 'numeracy' ? 'Numeracy' : 'Literacy'}
                      </span>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${
                        a.status === 'Completed'
                          ? 'bg-[#DFF5EF] text-[#16865D] border-[#16865D]/20'
                          : a.status === 'In Progress'
                          ? 'bg-[#E0F2FE] text-[#0284C7] border-[#0284C7]/20'
                          : a.status === 'Requires Review'
                          ? 'bg-[#FFF5D9] text-[#C58A32] border-[#C58A32]/20'
                          : 'bg-white/60 text-[#64748B] border-[#DCE7E5]'
                      }`}
                    >
                      {a.status}
                    </span>
                  </div>

                  <h2 className="mt-3 text-base font-bold text-[#142B45] leading-snug">
                    {isGujarati ? a.titleGu : a.title}
                  </h2>

                  <div className="mt-3 flex flex-wrap items-center gap-3.5 text-xs text-[#64748B]">
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-[#0D9488]" /> {a.estimatedMinutes} mins
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-[#0D9488]" /> {a.scheduledDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} className="text-[#0D9488]" /> {a.completedCount} of {a.totalCount} learners
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3.5">
                    <div className="flex justify-between text-[11px] text-[#64748B] mb-1">
                      <span>Completion rate</span>
                      <span className="font-bold text-[#142B45]">{completionPercent}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#DCE7E5]/60 overflow-hidden">
                      <div
                        className="h-1.5 rounded-full bg-[#0D9488] transition-all duration-300"
                        style={{ width: `${completionPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-4 flex items-center justify-between border-t border-[#DCE7E5]/50 pt-3">
                  <Link
                    href={`/app/assessments/${a.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0D9488] hover:text-[#0b7c71] transition-colors"
                  >
                    Open Assessment Screen <ChevronRight size={13} />
                  </Link>

                  <Button
                    onClick={() => handleQuickRun(a)}
                    className="h-7.5 rounded-xl bg-[#0D9488] px-3 text-xs font-semibold text-white shadow-xs hover:bg-[#0b7c71] transition-all"
                  >
                    <Play size={11} className="mr-1 fill-white" /> Run Check
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Interactive Modals */}
      {activeModal === 'assessment' && demoStudent && (
        <AssessmentModal
          student={demoStudent}
          onClose={() => setActiveModal('none')}
          onSubmitAssessment={handleCompleteAssessment}
        />
      )}

      {activeModal === 'diagnostic' && demoStudent && (
        <DiagnosticModal
          student={demoStudent}
          onClose={() => setActiveModal('none')}
          onProceedToPlan={() => setActiveModal('none')}
          onStartDirectActivity={() => setActiveModal('none')}
        />
      )}
    </div>
  )
}
