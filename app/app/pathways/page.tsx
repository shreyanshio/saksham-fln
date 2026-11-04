'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Filter,
  GraduationCap,
  Play,
  RotateCcw,
  Sparkles,
  User,
  Users,
} from 'lucide-react'
import { learningPlanService } from '@/lib/services/learningPlanService'
import { studentService } from '@/lib/services/studentService'
import { LearningActivityItem, LearningPlanRecord } from '@/lib/types'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { LearningPlanModal } from '@/components/learning-plan-modal'
import { ActivityModal } from '@/components/activity-modal'
import { Student } from '@/lib/demo-data'

export default function PathwaysPage() {
  const { t, locale } = useI18n()
  const [plans, setPlans] = useState<LearningPlanRecord[]>(() => learningPlanService.getPlans())
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Modals state
  const [activePlan, setActivePlan] = useState<LearningPlanRecord | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<LearningActivityItem | null>(null)
  const [modalMode, setModalMode] = useState<'none' | 'plan' | 'activity'>('none')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const filtered = plans.filter((p) => {
    if (statusFilter !== 'All' && p.status !== statusFilter) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      const matchTitle = p.title.toLowerCase().includes(q) || (p.titleGu && p.titleGu.toLowerCase().includes(q))
      const matchName = p.studentName.toLowerCase().includes(q)
      const matchSkill = p.targetSkill.toLowerCase().includes(q)
      if (!matchTitle && !matchName && !matchSkill) return false
    }
    return true
  })

  function handleReviewPlan(plan: LearningPlanRecord) {
    setActivePlan(plan)
    setModalMode('plan')
  }

  function handleApprove(student: Student, notes: string) {
    if (!activePlan) return
    learningPlanService.approvePlan(activePlan.id, notes)
    setPlans(learningPlanService.getPlans())

    // Also update student record
    const s = studentService.getStudentById(activePlan.studentId)
    if (s) {
      studentService.updateStudent({
        ...s,
        planStatus: 'Approved',
        progressPercent: 25,
      })
    }

    setModalMode('none')
    showToast(`Remedial pathway approved for ${activePlan.studentName}.`)
  }

  function handleStartActivity(plan: LearningPlanRecord, act: LearningActivityItem) {
    setActivePlan(plan)
    setSelectedActivity(act)
    setModalMode('activity')
  }

  function handleCompleteActivity(activityId: string, teacherNote: string) {
    if (!activePlan) return
    learningPlanService.completeActivity(activePlan.id, activityId, teacherNote)
    setPlans(learningPlanService.getPlans())

    // Also update student record progress
    const s = studentService.getStudentById(activePlan.studentId)
    if (s) {
      studentService.updateStudent({
        ...s,
        progressPercent: Math.min(100, s.progressPercent + 25),
        completedActivitiesCount: s.completedActivitiesCount + 1,
      })
    }

    setModalMode('none')
    showToast('Activity completed and milestone recorded.')
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
            <BookOpen size={15} />
            <span>{t.nav.learningPathways}</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#142B45]">
            Adaptive Remedial Pathways
          </h1>
          <p className="mt-0.5 text-xs text-[#64748B]">
            Targeted 5-day classroom micro-activities approved by teachers for foundational mastery.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/app/assessments"
            className="flex h-9 items-center gap-1.5 rounded-xl border border-[#DCE7E5] bg-white/70 px-3.5 text-xs font-semibold text-[#142B45] hover:bg-white transition-colors"
          >
            <span>Assessments</span>
            <ChevronRight size={13} />
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="glass-panel rounded-2xl p-4 transition-all hover:translate-y-[-1px]">
          <span className="text-[11px] font-semibold tracking-wider text-[#64748B] uppercase">Active Pathways</span>
          <p className="mt-1 text-2xl font-extrabold text-[#142B45]">{plans.length}</p>
          <p className="text-[11px] text-[#64748B] mt-0.5">Individualized 5-day plans</p>
        </div>
        <div className="glass-panel rounded-2xl p-4 transition-all hover:translate-y-[-1px]">
          <span className="text-[11px] font-semibold tracking-wider text-[#C58A32] uppercase">Pending Approval</span>
          <p className="mt-1 text-2xl font-extrabold text-[#C58A32]">
            {plans.filter((p) => p.status === 'Pending approval').length}
          </p>
          <p className="text-[11px] text-[#64748B] mt-0.5">Requires teacher review</p>
        </div>
        <div className="glass-panel rounded-2xl p-4 transition-all hover:translate-y-[-1px]">
          <span className="text-[11px] font-semibold tracking-wider text-[#0D9488] uppercase">In Progress</span>
          <p className="mt-1 text-2xl font-extrabold text-[#0D9488]">
            {plans.filter((p) => p.status === 'Approved' || p.status === 'In progress').length}
          </p>
          <p className="text-[11px] text-[#64748B] mt-0.5">Active classroom practice</p>
        </div>
        <div className="glass-panel rounded-2xl p-4 transition-all hover:translate-y-[-1px]">
          <span className="text-[11px] font-semibold tracking-wider text-[#16865D] uppercase">Completed</span>
          <p className="mt-1 text-2xl font-extrabold text-[#16865D]">
            {plans.filter((p) => p.status === 'Completed').length}
          </p>
          <p className="text-[11px] text-[#64748B] mt-0.5">Milestones verified</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 glass-panel rounded-2xl p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pathways by student, title, or target skill..."
            className="glass-input h-9 w-full rounded-xl px-3.5 text-xs text-[#142B45] placeholder:text-[#94A3B8] focus:border-[#0D9488] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by pathway status"
            className="glass-input h-9 rounded-xl px-3 text-xs font-medium text-[#142B45] focus:border-[#0D9488] focus:outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Pending approval">Pending Approval</option>
            <option value="Approved">Approved</option>
            <option value="In progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Active Learning Pathways Cards */}
      {filtered.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center">
          <BookOpen size={32} className="mx-auto text-[#94A3B8]" />
          <p className="mt-3 text-sm font-semibold text-[#142B45]">{t.common.noRecordsFound}</p>
          <p className="mt-1 text-xs text-[#64748B]">No learning pathways match your filter criteria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((plan) => {
            const completedCount = plan.activities.filter((a) => a.status === 'completed').length
            const totalCount = plan.activities.length
            const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
            const isGujarati = locale === 'gu' && plan.titleGu

            return (
              <div
                key={plan.id}
                className="glass-panel glass-interactive rounded-2xl p-6"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-bold text-[#142B45]">
                        {isGujarati ? plan.titleGu : plan.title}
                      </h2>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${
                          plan.status === 'Approved'
                            ? 'bg-[#DFF5EF] text-[#16865D] border-[#16865D]/20'
                            : plan.status === 'Pending approval'
                            ? 'bg-[#FFF5D9] text-[#C58A32] border-[#C58A32]/20'
                            : plan.status === 'Completed'
                            ? 'bg-[#E0F2FE] text-[#0284C7] border-[#0284C7]/20'
                            : 'bg-white/60 text-[#64748B] border-[#DCE7E5]'
                        }`}
                      >
                        {plan.status}
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs text-[#64748B]">
                      Learner:{' '}
                      <Link
                        href={`/app/students/${plan.studentId}`}
                        className="font-bold text-[#142B45] hover:text-[#0D9488] hover:underline"
                      >
                        {plan.studentName}
                      </Link>{' '}
                      · Target Skill: <strong className="text-[#142B45]">{plan.targetSkill}</strong>
                    </p>
                    <p className="mt-0.5 text-xs text-[#64748B]">
                      Prerequisite addressed: <span className="text-[#475569]">{plan.prerequisiteGap}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {plan.status === 'Pending approval' ? (
                      <Button
                        onClick={() => handleReviewPlan(plan)}
                        className="h-8.5 rounded-xl bg-[#0D9488] px-3.5 text-xs font-semibold text-white shadow-xs hover:bg-[#0b7c71]"
                      >
                        Review & Approve
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => handleReviewPlan(plan)}
                        className="h-8.5 rounded-xl border-[#DCE7E5] bg-white/70 px-3.5 text-xs font-semibold text-[#142B45] hover:bg-white"
                      >
                        Adjust Pathway
                      </Button>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-[#64748B] mb-1">
                    <span>Pathway Completion</span>
                    <span className="font-bold text-[#0D9488]">{percent}% ({completedCount}/{totalCount} activities)</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#DCE7E5]/70 overflow-hidden">
                    <div
                      className="h-1.5 rounded-full bg-[#0D9488] transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* 5-Day Weekly Schedule Grid */}
                <div className="mt-4 grid gap-2 sm:grid-cols-5">
                  {plan.weeklySchedule.map((day) => (
                    <div
                      key={day.day}
                      className={`rounded-xl border p-2.5 text-xs transition-all ${
                        day.status === 'completed'
                          ? 'border-[#0D9488]/30 bg-[#DFF5EF]/60'
                          : day.status === 'scheduled'
                          ? 'border-white/80 bg-white/50'
                          : 'border-[#DCE7E5] bg-white/80'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#142B45]">{day.day}</span>
                        {day.status === 'completed' && (
                          <CheckCircle2 size={13} className="text-[#16865D]" />
                        )}
                      </div>
                      <p className="mt-1 text-[11px] text-[#64748B] line-clamp-2" title={day.activityTitle}>
                        {day.activityTitle}
                      </p>
                      <span className="mt-1 block text-[10px] text-[#94A3B8]">
                        {day.durationMinutes} mins
                      </span>
                    </div>
                  ))}
                </div>

                {/* Activities Row with Action Buttons */}
                <div className="mt-4 divide-y divide-[#DCE7E5]/50 pt-2 border-t border-[#DCE7E5]/50">
                  {plan.activities.map((act, i) => (
                    <div
                      key={act.id}
                      className="flex flex-col justify-between gap-2 py-3 sm:flex-row sm:items-center"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="flex size-5.5 shrink-0 items-center justify-center rounded-full bg-white/80 border border-[#DCE7E5] text-[10px] font-bold text-[#142B45]">
                          {i + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-bold text-[#142B45]">{act.title}</p>
                            <span className="rounded-md bg-white/70 px-1.5 py-0.5 text-[9px] text-[#64748B] border border-[#DCE7E5]">
                              {act.format}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#64748B] mt-0.5">{act.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:justify-end">
                        <span className="text-[11px] text-[#64748B]">{act.duration}</span>

                        {act.status === 'completed' ? (
                          <span className="flex items-center gap-1 rounded-full border border-[#16865D]/20 bg-[#DFF5EF] px-2.5 py-0.5 text-[10px] font-bold text-[#16865D]">
                            <CheckCircle2 size={11} /> Done
                          </span>
                        ) : act.status === 'ready' || act.status === 'in_progress' ? (
                          <Button
                            onClick={() => handleStartActivity(plan, act)}
                            className="h-7 rounded-xl bg-[#0D9488] px-2.5 text-[10px] font-semibold text-white shadow-xs hover:bg-[#0b7c71]"
                          >
                            <Play size={10} className="mr-1 fill-white" /> Launch Activity
                          </Button>
                        ) : (
                          <span className="text-[10px] text-[#94A3B8]">Locked (prerequisite)</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Learning Plan Approval Modal */}
      {modalMode === 'plan' && activePlan && (
        <LearningPlanModal
          student={{
            id: activePlan.studentId,
            name: activePlan.studentName,
            fullName: activePlan.studentName,
            grade: 'Class 3A',
            rollNo: '14',
            avatar: 'AK',
            focusSkill: activePlan.targetSkill,
            status: 'Needs support',
            diagnosticStatus: 'Completed',
            diagnosticScore: 67,
            prerequisiteGap: activePlan.prerequisiteGap,
            planStatus: activePlan.status as Student['planStatus'],
            planTitle: activePlan.title,
            progressPercent: 25,
            activities: activePlan.activities.map((a) => ({
              id: a.id,
              title: a.title,
              description: a.description,
              duration: a.duration,
              status: a.status === 'ready' ? 'in_progress' : a.status === 'completed' ? 'completed' : 'locked',
              focusPrerequisite: a.prerequisiteSkillName,
            })),
          }}
          onClose={() => setModalMode('none')}
          onApprovePlan={handleApprove}
        />
      )}

      {/* Practice Activity Execution Modal */}
      {modalMode === 'activity' && activePlan && selectedActivity && (
        <ActivityModal
          student={{
            id: activePlan.studentId,
            name: activePlan.studentName,
            fullName: activePlan.studentName,
            grade: 'Class 3A',
            rollNo: '14',
            avatar: 'AK',
            focusSkill: activePlan.targetSkill,
            status: 'Practising',
            diagnosticStatus: 'Completed',
            planStatus: 'Approved',
            prerequisiteGap: activePlan.prerequisiteGap,
            progressPercent: 25,
            activities: [],
          }}
          activity={{
            id: selectedActivity.id,
            title: selectedActivity.title,
            description: selectedActivity.description,
            duration: selectedActivity.duration,
            status: 'in_progress',
            focusPrerequisite: selectedActivity.prerequisiteSkillName,
          }}
          onClose={() => setModalMode('none')}
          onCompleteActivity={handleCompleteActivity}
        />
      )}
    </div>
  )
}
