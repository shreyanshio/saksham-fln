'use client'

import { useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Edit3,
  ListOrdered,
  Loader2,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from 'lucide-react'
import { PracticeActivity, Student } from '@/lib/demo-data'
import { Button } from './ui/button'

interface LearningPlanModalProps {
  student: Student
  onClose: () => void
  onApprovePlan: (student: Student, teacherAdjustments: string) => void
}

export function LearningPlanModal({ student, onClose, onApprovePlan }: LearningPlanModalProps) {
  const [teacherNotes, setTeacherNotes] = useState(
    'Approved for small-group intervention. Scheduled during morning foundational FLN circle with Group B.'
  )
  const [isApproving, setIsApproving] = useState(false)

  // Derive activities and sequence dynamically from diagnosticResult if present
  const dynamicActivities = student.diagnosticResult?.recommendedActivities
  const learningSequence = student.diagnosticResult?.learningSequence || [
    'Step 1: Concrete Bundling with Straws & Rubber Bands (દસની ભારી બનાવવી)',
    'Step 2: Dual-Column Tens Mat: Number Construction',
    'Step 3: Decade Leap Partner Game (દસકો કૂદકો રમત)',
  ]

  const activitiesToDisplay =
    dynamicActivities && dynamicActivities.length > 0
      ? dynamicActivities.map((act) => ({
          id: act.id,
          title: act.title,
          description: act.description,
          duration: act.duration,
          status: act.status === 'completed' ? ('completed' as const) : ('in_progress' as const),
          focusPrerequisite: act.focusSkill,
          teacherNote: '',
        }))
      : student.activities

  function handleApprove() {
    setIsApproving(true)
    setTimeout(() => {
      // Create student with updated activities from dynamicActivities if present
      const updatedStudent: Student = {
        ...student,
        activities: activitiesToDisplay.map((a, i) => ({
          id: a.id,
          title: a.title,
          description: a.description,
          duration: a.duration,
          status: i === 0 ? ('in_progress' as const) : ('locked' as const),
          focusPrerequisite: a.focusPrerequisite,
        })),
      }
      onApprovePlan(updatedStudent, teacherNotes)
    }, 500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1E33]/50 p-3 sm:p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/90 glass-panel-elevated p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#DCE7E5]/70 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#DFF5EF] px-2.5 py-0.5 text-xs font-semibold text-[#0D9488] border border-[#14A89B]/30">
                અધ્યયન યોજના મંજૂરી · Learning Plan Approval
              </span>
              <span className="text-xs text-[#64748B]">Adaptive 5-Day Remedial Plan</span>
            </div>
            <h3 className="mt-1 text-xl font-bold text-[#142B45] tracking-tight">
              Learning Plan for {student.fullName} ({student.grade})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-xl text-[#64748B] transition hover:bg-black/[0.05] hover:text-[#142B45]"
            aria-label="Close learning plan modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Plan Overview Card */}
        <div className="mt-5 rounded-2xl border border-[#14A89B]/30 glass-panel-teal p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0D9488]">Targeted Pathway</span>
            <span className="text-xs text-[#64748B]">Estimated: 5 Days · 10-15 mins/day</span>
          </div>
          <h4 className="mt-1 text-base font-bold text-[#142B45]">
            {student.planTitle || 'Concrete Bundling & Place Value Pathway (સ્થાન કિંમત અને જૂથ ગણતરી)'}
          </h4>
          <p className="mt-1 text-xs text-[#526273] leading-relaxed">
            Target Focus: Addressing prerequisite misconception in grouping 10 units into 1 ten before progressing to abstract two-digit addition.
          </p>
        </div>

        {/* Recommended Sequence Section */}
        <div className="mt-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            <ListOrdered size={15} className="text-[#0D9488]" />
            <span>Recommended Prerequisite Learning Sequence</span>
          </div>

          <div className="mt-3 space-y-2">
            {learningSequence.map((step, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-xl border border-white/80 glass-panel-subtle px-3.5 py-2.5 text-xs font-medium text-[#142B45]"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-[#142B45] text-[11px] font-bold text-white shadow-2xs">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Short Daily Practice Activities */}
        <div className="mt-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Short Daily Practice Activities (10-15 Min Classroom Micro-Interventions)
          </h4>

          <div className="mt-3 space-y-3">
            {activitiesToDisplay.map((act, idx) => (
              <div
                key={act.id}
                className="flex items-start gap-3.5 rounded-2xl border border-white/85 glass-panel-solid p-4 shadow-xs"
              >
                <div className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-[#0D9488] text-xs font-bold text-white shadow-2xs">
                  {idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h5 className="font-bold text-[#142B45] text-sm">{act.title}</h5>
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-[#94A3B8]">
                      <Clock size={12} /> {act.duration}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#64748B] leading-relaxed">{act.description}</p>
                  <span className="mt-2 inline-block rounded-lg bg-black/[0.04] border border-[#DCE7E5] px-2.5 py-0.5 text-[10px] font-semibold text-[#0D9488]">
                    Prerequisite Focus: {act.focusPrerequisite}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teacher Customization & Review Notes */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <label htmlFor="adjust-notes" className="text-xs font-semibold uppercase tracking-wider text-[#142B45]">
              Teacher Review & Adjustments (શિક્ષકની સમીક્ષા નોંધ)
            </label>
            <span className="text-[11px] text-[#94A3B8]">Editable for classroom context</span>
          </div>
          <textarea
            id="adjust-notes"
            rows={2}
            value={teacherNotes}
            onChange={(e) => setTeacherNotes(e.target.value)}
            className="mt-1.5 w-full rounded-xl glass-input p-3 text-xs text-[#142B45] outline-none transition"
            placeholder="Add specific instructions for pairing, morning circle timings, or physical counters…"
          />
        </div>

        {/* Teacher Professional Sign-off Box */}
        <div className="mt-5 rounded-2xl border border-white/80 glass-panel-subtle p-4 text-xs text-[#526273]">
          <div className="flex items-center gap-2 font-bold text-[#142B45]">
            <ShieldCheck size={16} className="text-[#0D9488]" />
            Teacher Professional Sign-off
          </div>
          <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
            By approving this plan, Teacher Asha Shah validates that these activities match Aarav&apos;s observed readiness and adhere to Class 3 foundational numeracy guidelines.
          </p>
        </div>

        {/* Footer controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#DCE7E5]/70 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-11 rounded-xl px-4 text-xs font-semibold"
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={isApproving}
            onClick={handleApprove}
            className="h-11 rounded-xl bg-[#0D9488] px-6 text-xs font-bold text-white shadow-xs hover:bg-[#087F75] transition"
          >
            {isApproving ? (
              <>
                <Loader2 size={15} className="mr-2 animate-spin" /> Recording Approval…
              </>
            ) : (
              <>
                <CheckCircle2 size={16} className="mr-1.5" /> Approve Recommended Learning Plan
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
