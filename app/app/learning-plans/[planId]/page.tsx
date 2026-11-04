'use client'

import React, { use, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  User,
  AlertCircle,
  FileCheck,
  ChevronRight,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { learningPlanService } from '@/lib/services/learningPlanService'
import { studentService } from '@/lib/services/studentService'
import { teacherActionService } from '@/lib/services/teacherActionService'
import { auditService } from '@/lib/services/auditService'
import { ActivityModal } from '@/components/activity-modal'
import { LearningActivityItem } from '@/lib/types'

interface PageProps {
  params: Promise<{ planId: string }>
}

export default function SingleLearningPlanPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const planId = resolvedParams.planId
  const { t, locale } = useI18n()
  const router = useRouter()

  const [plan, setPlan] = useState(() => learningPlanService.getPlanById(planId))
  const [selectedActivity, setSelectedActivity] = useState<LearningActivityItem | null>(null)
  const [approvalNotes, setApprovalNotes] = useState('')
  const [isApproving, setIsApproving] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  if (!plan) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-[#E2E8F0] bg-white py-16 text-center shadow-xs">
        <AlertCircle size={36} className="text-[#B42318]" />
        <h2 className="mt-3 text-base font-bold text-[#17324D]">Learning Plan Not Found</h2>
        <p className="mt-1 text-xs text-[#64748B]">Plan ID: {planId} does not exist in local repository.</p>
        <Link
          href="/app/pathways"
          className="mt-4 rounded-lg bg-[#0D9488] px-4 py-2 text-xs font-semibold text-white shadow-xs"
        >
          Return to Learning Pathways
        </Link>
      </div>
    )
  }

  function handleApprove() {
    setIsApproving(true)
    const updated = learningPlanService.approvePlan(plan!.id, approvalNotes)
    if (updated) {
      setPlan({ ...updated })
      const stu = studentService.getStudentById(plan!.studentId)
      if (stu) {
        studentService.updateStudent({
          ...stu,
          planStatus: 'Approved',
          progressPercent: Math.max(stu.progressPercent, 20),
        })
      }
      const actions = teacherActionService.getActions()
      const matching = actions.find(
        (a) => a.relatedStudentId === plan!.studentId && a.title.includes('Review and approve')
      )
      if (matching) {
        teacherActionService.updateActionStatus(matching.id, 'Completed')
      }
      auditService.logEvent({
        actorId: 'usr-tea-01',
        actorName: 'Asha Shah',
        role: 'teacher',
        eventType: 'plan_approved',
        entityType: 'learning_plan',
        entityId: plan!.id,
        summary: `Teacher approved remedial pathway "${plan!.title}" for ${plan!.studentName}`,
      })
      setToastMessage('Plan approved successfully! Student record and teacher actions synchronized.')
      setTimeout(() => setToastMessage(null), 3000)
    }
    setIsApproving(false)
  }

  function handleCompleteActivity(activityId: string, observation: string) {
    const updated = learningPlanService.completeActivity(plan!.id, activityId, observation)
    if (updated) {
      setPlan({ ...updated })
      setSelectedActivity(null)
      studentService.recordActivityCompletion(plan!.studentId, observation)
      const actions = teacherActionService.getActions()
      const matching = actions.find(
        (a) => a.relatedStudentId === plan!.studentId && a.status !== 'Completed'
      )
      if (matching) {
        teacherActionService.updateActionStatus(matching.id, 'Completed')
      }
      auditService.logEvent({
        actorId: 'usr-tea-01',
        actorName: 'Asha Shah',
        role: 'teacher',
        eventType: 'activity_completed',
        entityType: 'activity',
        entityId: activityId,
        summary: `Marked day activity completed for ${plan!.studentName}: ${observation}`,
      })
      setToastMessage('Activity marked completed! Progress updated across student, class, and teacher actions.')
      setTimeout(() => setToastMessage(null), 3500)
    }
  }

  const completedCount = plan.activities.filter((a) => a.status === 'completed').length
  const progressPercent = Math.round((completedCount / (plan.activities.length || 1)) * 100)

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/app/pathways"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D9488] hover:underline"
        >
          <ArrowLeft size={13} />
          Back to All Pathways
        </Link>
      </div>

      {toastMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-[#0D9488]/30 glass-panel-solid p-3.5 text-xs font-semibold text-[#0D9488] shadow-md">
          <CheckCircle2 size={16} className="text-[#0D9488]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Plan Header Card */}
      <div className="glass-panel-solid rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold border ${
                  plan.status === 'Approved'
                    ? 'bg-[#DFF5EF] text-[#16865D] border-[#16865D]/20'
                    : plan.status === 'In progress'
                    ? 'bg-[#E0F2FE] text-[#0284C7] border-[#0284C7]/20'
                    : 'bg-[#FFF5D9] text-[#C58A32] border-[#C58A32]/20'
                }`}
              >
                {plan.status}
              </span>
              <span className="text-xs text-[#64748B]">5-Day Remedial Sequence</span>
            </div>
            <h1 className="text-xl font-bold text-[#142B45]">{plan.title}</h1>
            <p className="text-sm font-medium text-[#0D9488]">{plan.titleGu}</p>
            <div className="flex items-center gap-2 pt-1 text-xs text-[#64748B]">
              <User size={13} className="text-[#0D9488]" />
              <span className="font-semibold text-[#142B45]">{plan.studentName}</span>
              <span>•</span>
              <span>Class ID: {plan.classId}</span>
            </div>
          </div>

          {plan.status === 'Pending approval' && (
            <div className="flex flex-col gap-2 rounded-xl border border-white/80 bg-white/70 p-3.5 shadow-xs sm:w-72">
              <span className="text-[11px] font-bold text-[#142B45]">Teacher Approval Required</span>
              <input
                type="text"
                placeholder="Optional teacher observation notes..."
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
                className="glass-input w-full rounded-xl p-2 text-xs text-[#142B45]"
              />
              <button
                onClick={handleApprove}
                disabled={isApproving}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0D9488] py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#0b7c71] transition-all"
              >
                <CheckCircle2 size={13} />
                <span>Approve Learning Plan</span>
              </button>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 border-t border-[#DCE7E5]/60 pt-4">
          <div className="flex justify-between text-xs font-semibold text-[#142B45]">
            <span>Remedial Completion Progress</span>
            <span className="text-[#0D9488]">
              {completedCount} of {plan.activities.length} Activities Completed ({progressPercent}%)
            </span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-[#DCE7E5]/70 overflow-hidden">
            <div
              className="h-full bg-[#0D9488] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 5-Day Weekly Schedule & Activities */}
      <div className="glass-panel-solid rounded-2xl p-6 shadow-sm">
        <h2 className="text-sm font-bold text-[#142B45]">5-Day Remedial Activity Schedule</h2>
        <p className="text-xs text-[#64748B]">
          Daily 10–15 minute concrete interventions focused on resolving prerequisite gaps.
        </p>

        <div className="mt-4 space-y-3">
          {plan.activities.map((activity, index) => {
            const isCompleted = activity.status === 'completed'

            return (
              <div
                key={activity.id}
                className={`flex flex-col justify-between gap-3 rounded-2xl border p-4 transition-all sm:flex-row sm:items-center ${
                  isCompleted
                    ? 'border-[#0D9488]/30 bg-[#DFF5EF]/50'
                    : 'glass-panel glass-interactive'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                      isCompleted ? 'bg-[#0D9488] text-white' : 'bg-white/80 border border-[#DCE7E5] text-[#142B45]'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 size={16} /> : `D${index + 1}`}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-[#142B45]">{activity.title}</h3>
                      <span className="rounded-md bg-white/70 border border-[#DCE7E5] px-1.5 py-0.5 text-[10px] font-medium text-[#64748B]">
                        {activity.duration}
                      </span>
                    </div>
                    <div className="text-[11px] font-medium text-[#0D9488]">{activity.titleGu}</div>
                    <p className="mt-1 text-xs text-[#64748B]">{activity.description}</p>
                    {activity.teacherObservation && (
                      <div className="mt-1 text-[11px] italic text-[#16865D]">
                        Teacher note: "{activity.teacherObservation}"
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-[#DCE7E5]/50 pt-2 sm:border-t-0 sm:pt-0">
                  <button
                    onClick={() => setSelectedActivity(activity)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCE7E5] bg-white/70 px-3 py-1.5 text-xs font-semibold text-[#142B45] hover:bg-white transition-colors"
                  >
                    <span>View Activity Details</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Activity Details Modal */}
      {selectedActivity && plan && (
        <ActivityModal
          student={{
            id: plan.studentId,
            name: plan.studentName,
            fullName: plan.studentName,
            grade: `Class 3A`,
            rollNo: '14',
            avatar: plan.studentName.slice(0, 2).toUpperCase(),
            focusSkill: plan.targetSkill,
            status: 'Practising',
            diagnosticStatus: 'Completed',
            planStatus: 'Approved',
            prerequisiteGap: plan.prerequisiteGap,
            progressPercent: progressPercent,
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
          onClose={() => setSelectedActivity(null)}
          onCompleteActivity={(activityId: string, observation: string) =>
            handleCompleteActivity(activityId, observation)
          }
        />
      )}
    </div>
  )
}
