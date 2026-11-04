'use client'

import { CheckCircle2, ChevronRight, HelpCircle, RotateCcw, Sparkles } from 'lucide-react'
import { Button } from './ui/button'

interface DemoJourneyBannerProps {
  currentStage: number
  onReset: () => void
  onQuickJump?: (stage: number) => void
}

const STAGES = [
  { id: 1, label: 'Login', short: '1. Login' },
  { id: 2, label: 'Teacher Dashboard', short: '2. Dashboard' },
  { id: 3, label: 'Select Student', short: '3. Select' },
  { id: 4, label: 'Complete Assessment', short: '4. Assess' },
  { id: 5, label: 'Diagnostic Results', short: '5. Diagnose' },
  { id: 6, label: 'Approve Learning Plan', short: '6. Approve' },
  { id: 7, label: 'Mark Practice Complete', short: '7. Practise' },
  { id: 8, label: 'Review Progress', short: '8. Progress' },
]

export function DemoJourneyBanner({ currentStage, onReset, onQuickJump }: DemoJourneyBannerProps) {
  return (
    <div className="border-b border-[#14A89B]/30 glass-panel-teal px-4 py-2.5 text-xs text-[#142B45] shadow-xs">
      <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-5 items-center justify-center rounded-lg bg-gradient-to-br from-[#0D9488] to-[#14A89B] text-[10px] font-bold text-white shadow-xs">
            FLN
          </span>
          <span className="font-bold text-[#0D9488]">Demo Journey Guide:</span>
          <span className="hidden text-[#64748B] sm:inline">
            Step {currentStage} of 8 — <strong className="text-[#142B45] font-semibold">{STAGES[currentStage - 1]?.label}</strong>
          </span>
        </div>

        <div className="hidden items-center gap-1.5 md:flex">
          {STAGES.map((s, idx) => {
            const isCompleted = s.id < currentStage
            const isCurrent = s.id === currentStage

            return (
              <div key={s.id} className="flex items-center">
                <button
                  type="button"
                  onClick={() => onQuickJump && onQuickJump(s.id)}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-0.5 text-[11px] font-medium transition ${
                    isCurrent
                      ? 'bg-[#0D9488] font-bold text-white shadow-xs'
                      : isCompleted
                      ? 'bg-white/60 border border-[#14A89B]/30 text-[#0D9488] hover:bg-white'
                      : 'text-[#64748B] hover:text-[#142B45]'
                  }`}
                  title={`Step ${s.id}: ${s.label}`}
                >
                  {isCompleted && <CheckCircle2 size={11} className="text-[#0D9488]" />}
                  {isCurrent && <Sparkles size={11} className="text-white" />}
                  {s.short}
                </button>
                {idx < STAGES.length - 1 && <ChevronRight size={12} className="mx-0.5 text-[#94A3B8]" />}
              </div>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 rounded-xl border border-white/80 glass-panel-subtle glass-interactive px-2.5 py-1 text-[11px] font-semibold text-[#64748B] hover:border-[#C85A52]/40 hover:text-[#C85A52]"
            title="Reset demo data to initial state"
          >
            <RotateCcw size={12} />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>
    </div>
  )
}
