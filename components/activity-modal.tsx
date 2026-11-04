'use client'

import { useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  HelpCircle,
  Lightbulb,
  Loader2,
  Sparkles,
  Target,
  X,
} from 'lucide-react'
import { PracticeActivity, Student } from '@/lib/demo-data'
import { Button } from './ui/button'

interface ActivityModalProps {
  student: Student
  activity: PracticeActivity
  onClose: () => void
  onCompleteActivity: (activityId: string, teacherNote: string) => void
}

export function ActivityModal({ student, activity, onClose, onCompleteActivity }: ActivityModalProps) {
  const [observation, setObservation] = useState(
    'Aarav successfully grouped 3 sets of 10 straws with rubber bands. Self-corrected on counting the loose units.'
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleComplete() {
    setIsSubmitting(true)
    setTimeout(() => {
      onCompleteActivity(activity.id, observation)
    }, 500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1E33]/50 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/90 glass-panel-elevated p-6 sm:p-7 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#DCE7E5]/70 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#DFF5EF] px-2.5 py-0.5 text-xs font-semibold text-[#0D9488] border border-[#14A89B]/30">
                Targeted Practice Activity
              </span>
              <span className="text-xs text-[#64748B]">{activity.duration} Session</span>
            </div>
            <h3 className="mt-1 text-xl font-bold text-[#142B45] tracking-tight">{activity.title}</h3>
            <p className="mt-0.5 text-xs text-[#64748B]">
              Student: {student.fullName} · {student.grade}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1.5 text-[#64748B] hover:bg-black/[0.05] hover:text-[#142B45] transition"
            aria-label="Close activity"
          >
            <X size={20} />
          </button>
        </div>

        {/* Activity Details Card */}
        <div className="mt-5 rounded-2xl border border-white/85 glass-panel-solid p-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0D9488]">
            <Target size={15} /> Prerequisite Focus
          </div>
          <p className="mt-1 text-sm font-semibold text-[#142B45]">{activity.focusPrerequisite}</p>
          <p className="mt-2 text-xs leading-relaxed text-[#526273]">{activity.description}</p>

          <div className="mt-4 rounded-xl border border-[#14A89B]/30 glass-panel-teal p-3.5 text-xs leading-relaxed text-[#0D9488]">
            <strong>Teacher Classroom Guide:</strong> Provide {student.name} with 35 drinking straws and 4 rubber bands.
            Prompt: &ldquo;Bundle ten straws into a bundle. How many bundles can you make? How many loose straws are
            left?&rdquo;
          </div>
        </div>

        {/* Teacher Observation Input */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <label htmlFor="teacher-obs" className="text-xs font-semibold uppercase tracking-wider text-[#142B45]">
              Teacher Formative Observation Note
            </label>
            <span className="text-[11px] font-semibold text-[#0D9488]">Records progress milestone</span>
          </div>
          <textarea
            id="teacher-obs"
            rows={3}
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            className="mt-1.5 w-full rounded-xl glass-input p-3 text-xs text-[#142B45] outline-none transition"
            placeholder={`Record ${student.name}'s engagement, independence, and conceptual grasp…`}
          />
        </div>

        {/* What happens next banner */}
        <div className="mt-4 rounded-2xl glass-panel-navy p-4 text-xs text-white shadow-lg">
          <div className="flex items-center gap-1.5 font-semibold text-[#14A89B]">
            <Sparkles size={14} /> Journey Milestone Progression
          </div>
          <p className="mt-1 text-white/80 leading-relaxed">
            Marking this activity complete will update Aarav’s progress to <strong>50%</strong>, record a class
            milestone (+1), and unlock the next activity: <em>Base-10 Tens Mat</em>.
          </p>
        </div>

        {/* Footer controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#DCE7E5]/70 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-10 rounded-xl px-4 text-xs font-semibold"
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={isSubmitting}
            onClick={handleComplete}
            className="h-10 rounded-xl bg-[#0D9488] px-5 text-xs font-bold text-white shadow-xs hover:bg-[#087F75] transition"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={14} className="mr-2 animate-spin" /> Recording Milestone…
              </>
            ) : (
              <>
                <CheckCircle2 size={15} className="mr-1.5" /> Mark Practice Activity Complete
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
