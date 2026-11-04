'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  GraduationCap,
  Sparkles,
  Users,
} from 'lucide-react'
import { assessmentService } from '@/lib/services/assessmentService'
import { classService } from '@/lib/services/classService'
import { studentService } from '@/lib/services/studentService'
import { AssessmentRecord } from '@/lib/types'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'

export default function NewAssessmentPage() {
  const router = useRouter()
  const { t } = useI18n()

  const classes = classService.getClasses()
  const [selectedClassId, setSelectedClassId] = useState<string>('class-std-3a')
  const [subject, setSubject] = useState<'numeracy' | 'literacy'>('numeracy')
  const [title, setTitle] = useState('Class 3 Diagnostic Check: Place Value & 2-Digit Regrouping')
  const [language, setLanguage] = useState<'gu' | 'en' | 'hi'>('gu')
  const [scheduledDate, setScheduledDate] = useState('2026-10-28')
  const [duration, setDuration] = useState('12')
  const [objective, setObjective] = useState(
    'Identify student understanding of base-10 decade transitions and concrete place-value representations.'
  )
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>(['aarav-k', 'meera-p'])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const classStudents = studentService.getStudents({ classId: selectedClassId })

  function toggleStudent(id: string) {
    if (selectedStudentIds.includes(id)) {
      setSelectedStudentIds(selectedStudentIds.filter((s) => s !== id))
    } else {
      setSelectedStudentIds([...selectedStudentIds, id])
    }
  }

  function handleSelectAll() {
    if (selectedStudentIds.length === classStudents.length) {
      setSelectedStudentIds([])
    } else {
      setSelectedStudentIds(classStudents.map((s) => s.id))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    const selectedClass = classes.find((c) => c.id === selectedClassId)
    const newAsmt: AssessmentRecord = {
      id: `asmt-${Date.now()}`,
      title,
      titleGu: title,
      classId: selectedClassId,
      standard: selectedClass ? selectedClass.standard : 3,
      subject,
      language,
      status: 'Scheduled',
      targetStudentIds: selectedStudentIds.length > 0 ? selectedStudentIds : ['aarav-k'],
      completedCount: 0,
      totalCount: selectedStudentIds.length > 0 ? selectedStudentIds.length : 1,
      estimatedMinutes: parseInt(duration) || 12,
      scheduledDate,
      rubricTemplateId: `fln-${subject}-custom`,
    }

    assessmentService.createAssessment(newAsmt)

    setTimeout(() => {
      router.push('/app/assessments')
    }, 600)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#64748B]">
        <Link href="/app/assessments" className="hover:text-[#0D9488] hover:underline">
          Assessments Directory
        </Link>
        <ChevronRight size={13} className="text-[#94A3B8]" />
        <span className="font-semibold text-[#17324D]">Schedule New Assessment</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#17324D]">
            Schedule Diagnostic Assessment
          </h1>
          <p className="mt-0.5 text-xs text-[#64748B]">
            Configure child-friendly foundational screening for class cohorts or individual learners.
          </p>
        </div>
        <Link
          href="/app/assessments"
          className="flex h-8 items-center gap-1.5 rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
        >
          <ArrowLeft size={13} /> Cancel
        </Link>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="space-y-6 glass-panel-solid rounded-2xl p-6 shadow-sm">
        {/* Class and Subject */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold text-[#142B45]">Target Class</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="mt-1.5 glass-input h-9.5 w-full rounded-xl px-3 text-xs font-medium text-[#142B45] focus:border-[#0D9488] focus:outline-none cursor-pointer"
            >
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.medium} Medium, {c.enrolledStudentsCount} Students)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#142B45]">Subject Domain</label>
            <select
              value={subject}
              onChange={(e) => {
                const sub = e.target.value as 'numeracy' | 'literacy'
                setSubject(sub)
                if (sub === 'numeracy') {
                  setTitle('Class 3 Diagnostic Check: Place Value & 2-Digit Regrouping')
                } else {
                  setTitle('Class 3 Diagnostic Check: Consonant Blends & Story Comprehension')
                }
              }}
              className="mt-1.5 glass-input h-9.5 w-full rounded-xl px-3 text-xs font-medium text-[#142B45] focus:border-[#0D9488] focus:outline-none cursor-pointer"
            >
              <option value="numeracy">Foundational Numeracy (ગણિત જ્ઞાન)</option>
              <option value="literacy">Foundational Literacy (ભાષા અને વાચન)</option>
            </select>
          </div>
        </div>

        {/* Assessment Title */}
        <div>
          <label className="block text-xs font-bold text-[#142B45]">Assessment Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1.5 glass-input h-9.5 w-full rounded-xl px-3.5 text-xs text-[#142B45] focus:border-[#0D9488] focus:outline-none"
          />
        </div>

        {/* Language, Date, Duration */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-bold text-[#142B45]">Medium / Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'gu' | 'en' | 'hi')}
              className="mt-1.5 glass-input h-9.5 w-full rounded-xl px-3 text-xs font-medium text-[#142B45] focus:border-[#0D9488] focus:outline-none cursor-pointer"
            >
              <option value="gu">Gujarati (ગુજરાતી)</option>
              <option value="en">English</option>
              <option value="hi">Hindi (हिन्दी)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#142B45]">Scheduled Date</label>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="mt-1.5 glass-input h-9.5 w-full rounded-xl px-3 text-xs text-[#142B45] focus:border-[#0D9488] focus:outline-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#142B45]">Est. Minutes per Student</label>
            <input
              type="number"
              min="5"
              max="30"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-1.5 glass-input h-9.5 w-full rounded-xl px-3 text-xs text-[#142B45] focus:border-[#0D9488] focus:outline-none"
            />
          </div>
        </div>

        {/* Pedagogical Objective */}
        <div>
          <label className="block text-xs font-bold text-[#142B45]">Pedagogical Learning Objective</label>
          <textarea
            rows={2}
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="mt-1.5 glass-input w-full rounded-xl p-3 text-xs text-[#142B45] focus:border-[#0D9488] focus:outline-none leading-relaxed"
          />
        </div>

        {/* Target Students Checklist */}
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-[#142B45]">
              Target Learners ({selectedStudentIds.length} selected)
            </label>
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-xs font-semibold text-[#0D9488] hover:underline"
            >
              {selectedStudentIds.length === classStudents.length ? 'Deselect All' : 'Select All in Class'}
            </button>
          </div>

          <div className="mt-2.5 grid max-h-52 overflow-y-auto gap-2 rounded-xl border border-[#DCE7E5] bg-white/60 p-2.5 sm:grid-cols-2">
            {classStudents.map((s) => {
              const isChecked = selectedStudentIds.includes(s.id)
              return (
                <label
                  key={s.id}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-xl border p-2.5 text-xs transition-all ${
                    isChecked ? 'border-[#0D9488] bg-[#DFF5EF]/60 shadow-xs' : 'border-[#DCE7E5]/70 bg-white/70 hover:bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleStudent(s.id)}
                    className="size-4 rounded accent-[#0D9488]"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[#142B45] truncate">{s.fullName}</p>
                    <p className="text-[10px] text-[#64748B]">
                      Roll #{s.rollNo} · {s.overallStatus}
                    </p>
                  </div>
                </label>
              )
            })}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#DCE7E5]/60">
          <Link
            href="/app/assessments"
            className="flex h-9 items-center rounded-xl border border-[#DCE7E5] bg-white/70 px-4 text-xs font-semibold text-[#142B45] hover:bg-white transition-colors"
          >
            Cancel
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-9 rounded-xl bg-[#0D9488] px-4 text-xs font-semibold text-white shadow-xs hover:bg-[#0b7c71] transition-all"
          >
            <CheckCircle2 size={13} className="mr-1.5" />
            {isSubmitting ? 'Scheduling...' : 'Save & Schedule Assessment'}
          </Button>
        </div>
      </form>
    </div>
  )
}
