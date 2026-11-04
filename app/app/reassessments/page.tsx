'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  Plus,
  Search,
  Sparkles,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  UserCheck,
  Check,
  X,
  History,
  FileCheck,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { studentService } from '@/lib/services/studentService'
import { auditService } from '@/lib/services/auditService'
import { StudentRecord } from '@/lib/types'

interface ReassessmentScheduleItem {
  id: string
  studentId: string
  studentName: string
  standard: number
  section: string
  targetSkill: string
  baselineScore: number
  reassessmentScore?: number
  scheduledDate: string
  status: 'Scheduled' | 'Overdue' | 'Completed'
  remedialDaysCompleted: number
  remedialDaysTotal: number
  growthGainPercent?: number
}

const INITIAL_SCHEDULES: ReassessmentScheduleItem[] = [
  {
    id: 'reass-01',
    studentId: 'STU-2025-3A-014',
    studentName: 'Aarav Kumar',
    standard: 3,
    section: 'A',
    targetSkill: 'Place Value Bundling & 2-Digit Decomposition',
    baselineScore: 33,
    reassessmentScore: 88,
    growthGainPercent: 55,
    scheduledDate: '2026-10-26',
    status: 'Completed',
    remedialDaysCompleted: 5,
    remedialDaysTotal: 5,
  },
  {
    id: 'reass-02',
    studentId: 'STU-2025-3A-008',
    studentName: 'Meera Patel',
    standard: 3,
    section: 'A',
    targetSkill: 'Gujarati Phonics & Consonant Blends',
    baselineScore: 40,
    scheduledDate: '2026-10-27',
    status: 'Scheduled',
    remedialDaysCompleted: 4,
    remedialDaysTotal: 5,
  },
  {
    id: 'reass-03',
    studentId: 'STU-2025-3A-022',
    studentName: 'Devanshi Joshi',
    standard: 3,
    section: 'A',
    targetSkill: 'Positional Place Value Notation',
    baselineScore: 50,
    scheduledDate: '2026-10-24',
    status: 'Overdue',
    remedialDaysCompleted: 5,
    remedialDaysTotal: 5,
  },
]

export default function ReassessmentsPage() {
  const { t, locale } = useI18n()
  const [activeTab, setActiveTab] = useState<'upcoming' | 'overdue' | 'completed'>('upcoming')
  const [search, setSearch] = useState('')
  const [schedules, setSchedules] = useState<ReassessmentScheduleItem[]>(INITIAL_SCHEDULES)

  // Scheduling modal state
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [selectedStudentId, setSelectedStudentId] = useState('STU-2025-3A-008')
  const [targetSkill, setTargetSkill] = useState('Gujarati Phonics & Consonant Blends')
  const [scheduledDate, setScheduledDate] = useState('2026-10-28')

  const students = studentService.getStudents()

  function handleScheduleReassessment(e: React.FormEvent) {
    e.preventDefault()
    const student = studentService.getStudentById(selectedStudentId)
    if (!student) return

    const newItem: ReassessmentScheduleItem = {
      id: `reass-${Date.now().toString().slice(-4)}`,
      studentId: student.studentId,
      studentName: student.name,
      standard: student.standard,
      section: student.section,
      targetSkill,
      baselineScore: student.diagnosticScore || 45,
      scheduledDate,
      status: 'Scheduled',
      remedialDaysCompleted: student.completedActivitiesCount || 0,
      remedialDaysTotal: 5,
    }

    setSchedules([newItem, ...schedules])

    auditService.logEvent({
      actorId: 'usr-tea-01',
      actorName: 'Asha Shah',
      role: 'teacher',
      eventType: 'reassessment_scheduled',
      entityType: 'assessment',
      entityId: newItem.id,
      summary: `Scheduled post-remedial reassessment for ${student.name} on ${scheduledDate}`,
    })

    setScheduleModalOpen(false)
  }

  const upcomingList = schedules.filter((s) => s.status === 'Scheduled')
  const overdueList = schedules.filter((s) => s.status === 'Overdue')
  const completedList = schedules.filter((s) => s.status === 'Completed')

  const currentList =
    activeTab === 'upcoming'
      ? upcomingList
      : activeTab === 'overdue'
      ? overdueList
      : completedList

  const filtered = currentList.filter((s) => {
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        s.studentName.toLowerCase().includes(q) ||
        s.studentId.toLowerCase().includes(q) ||
        s.targetSkill.toLowerCase().includes(q)
      )
    }
    return true
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DFF4EF] px-2.5 py-0.5 text-xs font-semibold text-[#0D9488]">
              <TrendingUp size={13} />
              Growth Verification Loop
            </span>
            <span className="text-xs text-[#64748B]">Continuous FLN Tracking</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#17324D]">
            {locale === 'gu' ? 'પુનઃ મૂલ્યાંકન અને પ્રગતિ ચકાસણી' : 'Periodic Reassessments & Verification'}
          </h1>
          <p className="text-sm text-[#64748B]">
            {locale === 'gu'
              ? '૫-દિવસીય ઉપચારાત્મક કાર્ય પૂર્ણ કર્યા પછી વિદ્યાર્થીની સિદ્ધિનું પુનઃ મૂલ્યાંકન કરો.'
              : 'Verify student mastery after completion of 5-day adaptive remedial pathways.'}
          </p>
        </div>

        <button
          onClick={() => setScheduleModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#0D9488] px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#0b7c72]"
        >
          <Plus size={14} />
          <span>Schedule Reassessment</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="glass-panel rounded-2xl p-4 transition-all hover:translate-y-[-1px]">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Upcoming Scheduled</div>
          <div className="mt-1 text-2xl font-extrabold text-[#142B45]">{upcomingList.length}</div>
          <div className="mt-0.5 text-[11px] text-[#0D9488]">Next 7 days</div>
        </div>
        <div className="glass-panel rounded-2xl p-4 transition-all hover:translate-y-[-1px]">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#C85A52]">Overdue Rechecks</div>
          <div className="mt-1 text-2xl font-extrabold text-[#C85A52]">{overdueList.length}</div>
          <div className="mt-0.5 text-[11px] text-[#C85A52]">Action required</div>
        </div>
        <div className="glass-panel rounded-2xl p-4 transition-all hover:translate-y-[-1px]">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#16865D]">Completed & Verified</div>
          <div className="mt-1 text-2xl font-extrabold text-[#16865D]">{completedList.length}</div>
          <div className="mt-0.5 text-[11px] text-[#16865D]">Demonstrated mastery</div>
        </div>
        <div className="glass-panel rounded-2xl p-4 transition-all hover:translate-y-[-1px]">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Average Learning Gain</div>
          <div className="mt-1 text-2xl font-extrabold text-[#142B45]">+48% Gain</div>
          <div className="mt-0.5 text-[11px] text-[#64748B]">Post-remedial uplift</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#DCE7E5]">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'upcoming'
              ? 'border-[#0D9488] text-[#0D9488]'
              : 'border-transparent text-[#64748B] hover:text-[#142B45]'
          }`}
        >
          <Calendar size={14} />
          <span>Upcoming Scheduled ({upcomingList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('overdue')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'overdue'
              ? 'border-[#C85A52] text-[#C85A52]'
              : 'border-transparent text-[#64748B] hover:text-[#142B45]'
          }`}
        >
          <AlertCircle size={14} />
          <span>Overdue Rechecks ({overdueList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'completed'
              ? 'border-[#16865D] text-[#16865D]'
              : 'border-transparent text-[#64748B] hover:text-[#142B45]'
          }`}
        >
          <FileCheck size={14} />
          <span>Completed Verification ({completedList.length})</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="glass-panel rounded-2xl p-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={15} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student name, ID, or target competency..."
            className="glass-input h-9 w-full rounded-xl pl-9 pr-3 text-xs text-[#142B45] placeholder:text-[#94A3B8] focus:border-[#0D9488] focus:outline-none"
          />
        </div>
      </div>

      {/* List */}
      <div className="space-y-3.5">
        {filtered.length === 0 ? (
          <div className="glass-panel rounded-2xl py-12 text-center">
            <CheckCircle2 size={36} className="mx-auto text-[#94A3B8]" />
            <h3 className="mt-3 text-sm font-semibold text-[#142B45]">No reassessments in this view</h3>
            <p className="mt-1 text-xs text-[#64748B]">All students are up to date or no matches found.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="glass-panel glass-interactive flex flex-col justify-between gap-4 rounded-2xl p-4.5 sm:flex-row sm:items-center"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#142B45]">{item.studentName}</h3>
                  <span className="rounded-lg bg-white/70 border border-[#DCE7E5] px-2 py-0.5 text-[10px] font-semibold text-[#142B45]">
                    Class {item.standard}{item.section} • {item.studentId}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                      item.status === 'Completed'
                        ? 'bg-[#DFF5EF] text-[#16865D] border-[#16865D]/20'
                        : item.status === 'Overdue'
                        ? 'bg-[#FEE2E2] text-[#C85A52] border-[#C85A52]/20'
                        : 'bg-[#FFF5D9] text-[#C58A32] border-[#C58A32]/20'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="text-xs text-[#64748B]">
                  Target Gap Rechecked:{' '}
                  <span className="font-semibold text-[#142B45]">{item.targetSkill}</span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-[#64748B]">
                  <span>
                    Remedial Progress: <strong className="text-[#142B45]">{item.remedialDaysCompleted}/{item.remedialDaysTotal} days</strong> completed
                  </span>
                  <span>•</span>
                  <span>
                    Scheduled: <strong className="text-[#142B45]">{item.scheduledDate}</strong>
                  </span>
                </div>
              </div>

              {/* Score Comparison & CTA */}
              <div className="flex items-center gap-4 border-t border-[#DCE7E5]/50 pt-3 sm:border-t-0 sm:pt-0">
                <div className="flex items-center gap-3 text-center">
                  <div className="rounded-xl bg-white/70 p-2 border border-[#DCE7E5]">
                    <div className="text-[10px] text-[#64748B]">Baseline</div>
                    <div className="text-xs font-bold text-[#64748B]">{item.baselineScore}%</div>
                  </div>

                  {item.reassessmentScore !== undefined ? (
                    <>
                      <ArrowRight size={14} className="text-[#0D9488]" />
                      <div className="rounded-xl bg-[#DFF5EF]/60 p-2 border border-[#0D9488]/30">
                        <div className="text-[10px] text-[#0D9488] font-medium">Reassessed</div>
                        <div className="text-xs font-bold text-[#0D9488]">{item.reassessmentScore}%</div>
                      </div>
                      <div className="rounded-full bg-[#16865D] px-2.5 py-1 text-[11px] font-bold text-white shadow-xs">
                        +{item.growthGainPercent}%
                      </div>
                    </>
                  ) : (
                    <div className="text-[11px] text-[#94A3B8]">Pending check</div>
                  )}
                </div>

                {item.status !== 'Completed' ? (
                  <Link
                    href={`/app/assessments/new?studentId=${item.studentId}&mode=reassessment`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#0D9488] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#0b7c71] transition-all"
                  >
                    <span>Begin Check</span>
                    <ArrowRight size={13} />
                  </Link>
                ) : (
                  <Link
                    href={`/app/students/${item.studentId}`}
                    className="inline-flex items-center gap-1 rounded-xl border border-[#DCE7E5] bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-[#142B45] hover:bg-white transition-colors"
                  >
                    <UserCheck size={13} className="text-[#0D9488]" />
                    <span>View Portfolio</span>
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Schedule Reassessment Modal */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold text-[#17324D]">Schedule Student Reassessment</h2>
                <p className="text-xs text-[#64748B]">Set date for post-remedial foundational competency check.</p>
              </div>
              <button
                onClick={() => setScheduleModalOpen(false)}
                className="rounded-lg p-1 text-[#64748B] hover:bg-[#F1F5F9]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleScheduleReassessment} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#17324D]">Target Student</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] p-2 text-xs"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.studentId}>
                      {s.name} ({s.studentId}) — Class {s.standard}{s.section}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#17324D]">Target Competency to Verify</label>
                <input
                  type="text"
                  required
                  value={targetSkill}
                  onChange={(e) => setTargetSkill(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] p-2 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#17324D]">Scheduled Date</label>
                <input
                  type="date"
                  required
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] p-2 text-xs"
                />
              </div>

              <div className="rounded-lg bg-[#DFF4EF]/40 p-3 text-xs text-[#0D9488]">
                <strong>Pedagogical Best Practice:</strong> Schedule reassessment 24–48 hours after the 5th remedial activity is completed to verify retention rather than short-term recitation.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setScheduleModalOpen(false)}
                  className="rounded-lg border border-[#E2E8F0] px-3.5 py-1.5 text-xs font-semibold text-[#64748B] hover:bg-[#F1F5F9]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#0D9488] px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#0b7c72]"
                >
                  Confirm Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
