'use client'

import { useState } from 'react'
import { ArrowRight, Search, User, X } from 'lucide-react'
import { Student } from '@/lib/demo-data'

interface SearchModalProps {
  students: Student[]
  onClose: () => void
  onSelectStudent: (student: Student) => void
}

export function SearchModal({ students, onClose, onSelectStudent }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = students.filter((s) => {
    const term = searchTerm.toLowerCase().trim()
    if (!term) return true
    return (
      s.fullName.toLowerCase().includes(term) ||
      s.name.toLowerCase().includes(term) ||
      s.focusSkill.toLowerCase().includes(term) ||
      s.prerequisiteGap.toLowerCase().includes(term) ||
      s.rollNo.includes(term)
    )
  })

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-[#0D1E33]/45 p-4 pt-16 sm:pt-20 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-xl rounded-3xl border border-white/90 glass-panel-elevated p-5 sm:p-6 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-[#DCE7E5]/70 pb-4">
          <div className="flex size-8 items-center justify-center rounded-xl bg-[#0D9488]/15 text-[#0D9488]">
            <Search size={18} />
          </div>
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search students by name, roll no, or prerequisite skill…"
            className="flex-1 text-sm text-[#142B45] font-medium outline-none placeholder:text-[#94A3B8] bg-transparent"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1 text-[#64748B] hover:bg-black/[0.05] hover:text-[#142B45] transition"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-3 max-h-80 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm font-semibold text-[#142B45]">No students found</p>
              <p className="mt-1 text-xs text-[#64748B]">
                No match for &ldquo;{searchTerm}&rdquo;. Try searching for &ldquo;Aarav&rdquo;, &ldquo;Meera&rdquo;, or
                &ldquo;Place value&rdquo;.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    onSelectStudent(s)
                    onClose()
                  }}
                  className="flex w-full items-center justify-between p-3 rounded-2xl text-left transition-all hover:bg-white/80 hover:shadow-2xs group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-[#DFF5EF] text-xs font-bold text-[#0D9488] shadow-2xs">
                      {s.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#142B45]">
                        {s.fullName} <span className="text-xs font-normal text-[#94A3B8]">({s.grade})</span>
                      </p>
                      <p className="text-xs text-[#64748B]">Focus: {s.focusSkill}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-black/[0.04] border border-[#DCE7E5] px-2.5 py-0.5 text-[11px] font-medium text-[#172B3A]">
                      {s.status}
                    </span>
                    <ArrowRight size={14} className="text-[#0D9488] transition-transform group-hover:translate-x-0.5" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-[#DCE7E5]/70 pt-3 text-[11px] font-medium text-[#94A3B8]">
          <span>Synthetic demo data · Asha Primary School</span>
          <span>{filtered.length} student record(s)</span>
        </div>
      </div>
    </div>
  )
}
