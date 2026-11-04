'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Download,
  Filter,
  GraduationCap,
  Plus,
  Search,
  Users,
} from 'lucide-react'
import { classService } from '@/lib/services/classService'
import { auditService } from '@/lib/services/auditService'
import { ClassRoom } from '@/lib/types'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'

export default function ClassesPage() {
  const { t } = useI18n()
  const [classesList, setClassesList] = useState<ClassRoom[]>(() => classService.getClasses())
  const [selectedStandard, setSelectedStandard] = useState<string>('All')
  const [selectedMedium, setSelectedMedium] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Add Class Modal state
  const [addClassOpen, setAddClassOpen] = useState(false)
  const [newStd, setNewStd] = useState<number>(3)
  const [newSec, setNewSec] = useState<string>('A')
  const [newMedium, setNewMedium] = useState<'Gujarati' | 'English' | 'Hindi'>('Gujarati')
  const [newTeacher, setNewTeacher] = useState<string>('Asha Shah')

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  function handleCreateClass(e: React.FormEvent) {
    e.preventDefault()
    if (!newTeacher.trim()) return

    const classId = `class-std-${newStd}${newSec.toLowerCase()}`
    const className = `Standard ${newStd} - ${newSec.toUpperCase()}`

    const newClass: ClassRoom = {
      id: classId,
      name: className,
      standard: newStd,
      section: newSec.toUpperCase(),
      academicYear: '2025-2026',
      medium: newMedium,
      classTeacherName: newTeacher.trim(),
      enrolledStudentsCount: 0,
      studentsAssessedCount: 0,
      activeSupportPlansCount: 0,
      pendingAssessmentsCount: 0,
      pendingTeacherActionsCount: 0,
      lastActivityDate: 'Just now',
      flnLiteracyPercentage: 0,
      flnNumeracyPercentage: 0,
    }

    classService.addClass(newClass)
    setClassesList(classService.getClasses())

    auditService.logEvent({
      actorId: 'usr-admin-01',
      actorName: 'Administrator',
      role: 'admin',
      eventType: 'class_reassigned',
      entityType: 'classroom',
      entityId: newClass.id,
      summary: `Created new classroom: ${newClass.name} with Class Teacher ${newClass.classTeacherName}`,
    })

    setAddClassOpen(false)
    showToast(`Classroom ${className} created successfully!`)
  }

  const filtered = classesList.filter((c) => {
    if (selectedStandard !== 'All' && `${c.standard}` !== selectedStandard) return false
    if (selectedMedium !== 'All' && c.medium !== selectedMedium) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const matchName = c.name.toLowerCase().includes(q)
      const matchTeacher = c.classTeacherName.toLowerCase().includes(q)
      if (!matchName && !matchTeacher) return false
    }
    return true
  })

  return (
    <div className="space-y-5">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-lg border border-[#BFE2DA] bg-[#DFF4EF] px-3.5 py-2 text-xs font-semibold text-[#087F75] shadow-md animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0D9488]">
            <GraduationCap size={15} />
            <span>{t.classes.title}</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#17324D]">{t.classes.classRoster}</h1>
          <p className="mt-0.5 text-xs text-[#64748B]">{t.classes.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => classService.exportClassCsv('class-std-3a')}
            className="h-9 rounded-lg border-[#CBD5E1] px-3 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
          >
            <Download size={13} className="mr-1.5" />
            <span>{t.common.exportCsv}</span>
          </Button>

          <Button
            type="button"
            onClick={() => setAddClassOpen(true)}
            className="h-9 rounded-lg bg-[#0D9488] px-3.5 text-xs font-bold text-white shadow-xs hover:bg-[#087F75]"
          >
            <Plus size={14} className="mr-1" />
            <span>{t.classes.addClass}</span>
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/85 glass-panel p-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-2.5 min-w-0 flex-1">
          {/* Search Box */}
          <div className="relative min-w-[180px] sm:min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by class or teacher..."
              className="h-9 w-full rounded-xl glass-input pl-9 pr-3 text-xs text-[#142B45] outline-none"
            />
          </div>

          {/* Standard Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#64748B]">Standard:</span>
            <select
              value={selectedStandard}
              onChange={(e) => setSelectedStandard(e.target.value)}
              aria-label="Filter by standard"
              className="h-9 rounded-xl glass-input px-3 text-xs font-semibold text-[#142B45] outline-none"
            >
              <option value="All">All Standards</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((std) => (
                <option key={std} value={`${std}`}>
                  Standard {std}
                </option>
              ))}
            </select>
          </div>

          {/* Medium Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#64748B]">Medium:</span>
            <select
              value={selectedMedium}
              onChange={(e) => setSelectedMedium(e.target.value)}
              aria-label="Filter by medium"
              className="h-9 rounded-xl glass-input px-3 text-xs font-semibold text-[#142B45] outline-none"
            >
              <option value="All">All Mediums</option>
              <option value="Gujarati">Gujarati</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center rounded-xl border border-white/80 glass-panel-subtle p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`rounded-lg px-2.5 py-1 font-semibold transition ${
              viewMode === 'grid' ? 'bg-[#0D9488] text-white shadow-2xs' : 'text-[#64748B] hover:text-[#142B45]'
            }`}
          >
            Grid
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`rounded-lg px-2.5 py-1 font-semibold transition ${
              viewMode === 'table' ? 'bg-[#0D9488] text-white shadow-2xs' : 'text-[#64748B] hover:text-[#142B45]'
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* View: Grid */}
      {viewMode === 'grid' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="flex flex-col justify-between rounded-3xl border border-white/85 glass-panel glass-interactive p-5 shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-xl bg-[#DFF5EF] border border-[#14A89B]/30 px-2.5 py-0.5 text-xs font-bold text-[#0D9488]">
                      Std {c.standard}-{c.section}
                    </span>
                    <span className="text-xs text-[#64748B] font-medium">{c.medium} Medium</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#94A3B8]">AY {c.academicYear}</span>
                </div>

                <h3 className="mt-2.5 text-base font-bold text-[#142B45] tracking-tight">{c.name}</h3>
                <p className="text-xs text-[#64748B]">
                  Class Teacher: <strong className="text-[#142B45] font-semibold">{c.classTeacherName}</strong>
                </p>

                {/* Progress Indicators */}
                <div className="mt-4 space-y-2 border-t border-[#DCE7E5]/70 pt-3 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-[#64748B]">
                      <span>{t.classes.literacyCoverage}</span>
                      <span className="font-bold text-[#142B45]">{c.flnLiteracyPercentage}%</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-black/[0.05]">
                      <div
                        className="h-full rounded-full bg-[#0D9488]"
                        style={{ width: `${c.flnLiteracyPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-[#64748B]">
                      <span>{t.classes.numeracyCoverage}</span>
                      <span className="font-bold text-[#142B45]">{c.flnNumeracyPercentage}%</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-black/[0.05]">
                      <div
                        className="h-full rounded-full bg-[#0D9488]"
                        style={{ width: `${c.flnNumeracyPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Micro Counters */}
                <div className="mt-3.5 grid grid-cols-3 gap-1.5 rounded-2xl border border-white/80 glass-panel-subtle p-2.5 text-center text-[10px]">
                  <div>
                    <span className="block font-bold text-[#142B45] text-xs">{c.enrolledStudentsCount}</span>
                    <span className="text-[#64748B]">Enrolled</span>
                  </div>
                  <div>
                    <span className="block font-bold text-[#0D9488] text-xs">{c.studentsAssessedCount}</span>
                    <span className="text-[#64748B]">Assessed</span>
                  </div>
                  <div>
                    <span className="block font-bold text-[#C58A32] text-xs">{c.activeSupportPlansCount}</span>
                    <span className="text-[#64748B]">Active Plans</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-[#DCE7E5]/70 pt-3">
                <Button asChild className="h-9 w-full rounded-xl bg-[#142B45] text-xs font-bold text-white hover:bg-[#0D1E33] shadow-xs">
                  <Link href={`/app/classes/${c.id}`} className="flex items-center justify-center gap-1.5">
                    <span>Open Class Workspace</span>
                    <ChevronRight size={13} />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* View: Table */
        <div className="overflow-hidden rounded-3xl border border-white/85 glass-panel-solid shadow-xs">
          <table className="w-full text-left text-xs text-[#172B3A]">
            <thead className="border-b border-[#DCE7E5] bg-black/[0.02] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <tr>
                <th className="px-4 py-3.5">{t.classes.classRoster}</th>
                <th className="px-4 py-3.5">{t.classes.classTeacher}</th>
                <th className="px-4 py-3.5">Medium</th>
                <th className="px-4 py-3.5 text-center">Enrolled</th>
                <th className="px-4 py-3.5 text-center">Assessed</th>
                <th className="px-4 py-3.5 text-center">Active Plans</th>
                <th className="px-4 py-3.5">FLN Literacy</th>
                <th className="px-4 py-3.5">FLN Numeracy</th>
                <th className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE7E5]/70">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-white/90 transition-colors">
                  <td className="px-4 py-3.5 font-bold text-[#142B45]">
                    <Link href={`/app/classes/${c.id}`} className="hover:text-[#0D9488] hover:underline">
                      {c.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3.5 text-[#526273]">{c.classTeacherName}</td>
                  <td className="px-4 py-3.5">{c.medium}</td>
                  <td className="px-4 py-3.5 text-center font-semibold text-[#142B45]">{c.enrolledStudentsCount}</td>
                  <td className="px-4 py-3.5 text-center font-semibold text-[#0D9488]">{c.studentsAssessedCount}</td>
                  <td className="px-4 py-3.5 text-center font-semibold text-[#C58A32]">{c.activeSupportPlansCount}</td>
                  <td className="px-4 py-3.5 font-semibold text-[#142B45]">{c.flnLiteracyPercentage}%</td>
                  <td className="px-4 py-3.5 font-semibold text-[#142B45]">{c.flnNumeracyPercentage}%</td>
                  <td className="px-4 py-3.5 text-right">
                    <Button asChild variant="outline" className="h-7 rounded-xl px-2.5 text-xs font-semibold text-[#0D9488]">
                      <Link href={`/app/classes/${c.id}`}>Open</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal: Provision New Class */}
      {addClassOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1E33]/45 p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-white/90 glass-panel-elevated p-6 sm:p-7 shadow-2xl">
            <h2 className="text-base font-bold text-[#142B45]">Provision New Classroom</h2>
            <p className="text-xs text-[#64748B]">Set up a classroom cohort and assign a class teacher.</p>

            <form onSubmit={handleCreateClass} className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#17324D]">Standard (Grade) *</label>
                  <select
                    value={newStd}
                    onChange={(e) => setNewStd(Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2 text-xs"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>
                        Standard {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#17324D]">Section *</label>
                  <select
                    value={newSec}
                    onChange={(e) => setNewSec(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2 text-xs"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#17324D]">Instruction Medium</label>
                  <select
                    value={newMedium}
                    onChange={(e) => setNewMedium(e.target.value as any)}
                    className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2 text-xs"
                  >
                    <option value="Gujarati">Gujarati Medium</option>
                    <option value="English">English Medium</option>
                    <option value="Hindi">Hindi Medium</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#17324D]">Academic Year</label>
                  <input
                    type="text"
                    disabled
                    value="2025-2026 (Active)"
                    className="mt-1 w-full rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] p-2 text-xs text-[#64748B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#17324D]">Assigned Class Teacher *</label>
                <input
                  type="text"
                  required
                  value={newTeacher}
                  onChange={(e) => setNewTeacher(e.target.value)}
                  placeholder="e.g. Asha Shah, Dharmesh Dave..."
                  className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddClassOpen(false)}
                  className="rounded-lg border border-[#CBD5E1] px-3.5 py-1.5 text-xs font-semibold text-[#64748B] hover:bg-[#F1F5F9]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#0D9488] px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#087F75]"
                >
                  Create Classroom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
