'use client'

import { useEffect, useState } from 'react'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Loader2,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  Zap,
} from 'lucide-react'
import { Student } from '@/lib/demo-data'
import {
  FLN_DIAGNOSTIC_QUESTIONS,
  FLNQuestion,
} from '@/lib/fln-scoring-engine'
import { Button } from './ui/button'
import { useI18n } from '@/lib/i18n/context'

interface AssessmentModalProps {
  student: Student
  onClose: () => void
  onSubmitAssessment: (answers: Record<string, string>, notes: string) => void
}

const REASSURING_MESSAGES = [
  'શાંતિથી પ્રશ્ન જુઓ અને જવાબ પસંદ કરો · Take your time and select your answer.',
  'સરસ! તમે ખૂબ સારો પ્રયાસ કરી રહ્યા છો · Wonderful effort! Keep going.',
  'શાબાશ! આગળ વધો, બહુ સરસ ચાલે છે · Great job! Keep moving forward calmly.',
  'લગભગ પૂરું થવા આવ્યું છે, તમે બહુ સારું કર્યું · Almost there! You are doing very well.',
  'છેલ્લો પ્રશ્ન! ખૂબ જ ઉત્તમ · Final question! Excellent work.',
]

export function AssessmentModal({ student, onClose, onSubmitAssessment }: AssessmentModalProps) {
  const { locale } = useI18n()
  const [currentStep, setCurrentStep] = useState(0)
  
  // Normal assessments start blank without pre-baked contamination
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [teacherNotes, setTeacherNotes] = useState('')
  const [showNotes, setShowNotes] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [demoLoadedToast, setDemoLoadedToast] = useState(false)

  // Explicit demo sample scenario loader for jury presentation
  function handleLoadDemoScenario() {
    setAnswers({
      q1: 'opt-1a',
      q2: 'opt-2a',
      q3: 'opt-3b',
      q4: 'opt-4b',
      q5: 'opt-5a',
    })
    setTeacherNotes(
      'Aarav was calm and confident during phonics decoding, but hesitated on place-value bundling when abstract numerals were presented.'
    )
    setShowNotes(true)
    setErrorMsg('')
    setDemoLoadedToast(true)
    setTimeout(() => setDemoLoadedToast(false), 3000)
  }
  const [isSubmitting, setIsSubmitting] = useState(false)

  const activeQuestion: FLNQuestion = FLN_DIAGNOSTIC_QUESTIONS[currentStep]
  const totalQuestions = FLN_DIAGNOSTIC_QUESTIONS.length
  const progressPercent = Math.round(((currentStep + 1) / totalQuestions) * 100)
  const attemptedCount = Object.keys(answers).length

  // Handle Text-to-Speech audio control
  function toggleAudio() {
    if (typeof window === 'undefined') return

    if (isPlayingAudio) {
      window.speechSynthesis?.cancel()
      setIsPlayingAudio(false)
      return
    }

    if (!('speechSynthesis' in window)) {
      setShowTranscript(true)
      return
    }

    window.speechSynthesis.cancel()

    // Speak single appropriate text matching current locale (no audio collision)
    const textToSpeak =
      locale === 'gu'
        ? activeQuestion.questionGu
        : locale === 'hi'
        ? activeQuestion.questionGu
        : activeQuestion.questionEn

    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.rate = 0.85 // Calm, slower child-friendly pace

    // Try finding Gujarati or Hindi/Indian English voice
    const voices = window.speechSynthesis.getVoices()
    const targetLang = locale === 'gu' ? 'gu' : locale === 'hi' ? 'hi' : 'en'
    const guVoice = voices.find((v) => v.lang.toLowerCase().includes(targetLang))
    if (guVoice) {
      utterance.voice = guVoice
    } else if (locale !== 'en') {
      // If voice is missing, cleanly reveal visual transcript drawer
      setShowTranscript(true)
    }

    utterance.onend = () => setIsPlayingAudio(false)
    utterance.onerror = () => setIsPlayingAudio(false)

    setIsPlayingAudio(true)
    window.speechSynthesis.speak(utterance)
  }

  // Stop audio on question change or unmount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis?.cancel()
    }
    setIsPlayingAudio(false)
    setShowTranscript(false)
  }, [currentStep])

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        window.speechSynthesis?.cancel()
      }
    }
  }, [])

  function handleSelectOption(optionId: string) {
    setAnswers((prev) => ({ ...prev, [activeQuestion.id]: optionId }))
    if (errorMsg) setErrorMsg('')
  }

  function handleNext() {
    setErrorMsg('')
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  function handlePrev() {
    setErrorMsg('')
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  function handleSubmit() {
    setIsSubmitting(true)
    setErrorMsg('')

    if (typeof window !== 'undefined') {
      window.speechSynthesis?.cancel()
    }

    setTimeout(() => {
      onSubmitAssessment(answers, teacherNotes)
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4 backdrop-blur-xs">
      <div className="relative max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#d8e2df] bg-white p-5 shadow-2xl sm:p-8">
        {/* Child-Friendly Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e8efed] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-[#dff4ef] text-base font-bold text-[#087f75]">
              {student.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#dff4ef] px-2.5 py-0.5 text-[11px] font-semibold text-[#087f75]">
                  FLN નિદાન ચકાસણી · Diagnostic Check
                </span>
                <span className="rounded-full bg-[#f1f5f3] px-2 py-0.5 text-[10px] font-medium text-[#64748b]">
                  {student.grade} · Roll #{student.rollNo}
                </span>
              </div>
              <h3 className="mt-0.5 text-base font-bold text-[#17324d] sm:text-lg">
                વિદ્યાર્થી: {student.fullName}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadDemoScenario}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#bfe2da] bg-[#eef7f4] px-3 py-1.5 text-xs font-semibold text-[#087f75] transition hover:bg-[#dff4ef]"
              title="Preload sample responses for Aarav K. presentation scenario"
            >
              <Zap size={13} className="text-[#0d9488]" />
              <span>Load Demo Scenario</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex size-9 items-center justify-center rounded-xl text-[#64748b] transition hover:bg-[#f1f5f3]"
              aria-label="Close assessment"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {demoLoadedToast && (
          <div className="mt-3 rounded-xl border border-[#bfe2da] bg-[#dff4ef] p-2.5 text-xs font-semibold text-[#087f75] animate-in fade-in">
            ⚡ Sample responses loaded for presentation evaluation (5 questions ready for review).
          </div>
        )}

        {/* Readable Child Progress Stepper */}
        <div className="mt-4 rounded-2xl border border-[#e2e8e5] bg-[#fbfdfc] p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0d9488]">
              {activeQuestion.stageLabel}
            </span>
            <span className="text-xs font-semibold text-[#64748b]">{progressPercent}% Completed</span>
          </div>

          {/* Progress bar */}
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#edf2f0]">
            <div
              className="h-full rounded-full bg-[#0d9488] transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Step dots for child clarity */}
          <div className="mt-3 flex items-center justify-between">
            {FLN_DIAGNOSTIC_QUESTIONS.map((q, idx) => {
              const isFilled = Boolean(answers[q.id])
              const isCurrent = idx === currentStep
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    setErrorMsg('')
                    setCurrentStep(idx)
                  }}
                  className={`flex size-8 items-center justify-center rounded-xl text-xs font-bold transition ${
                    isCurrent
                      ? 'bg-[#0d9488] text-white shadow-xs scale-105'
                      : isFilled
                      ? 'border border-[#bfe2da] bg-[#dff4ef] text-[#087f75]'
                      : 'border border-[#e2e8e5] bg-white text-[#94a3b8]'
                  }`}
                  title={`Question ${idx + 1}`}
                >
                  {isFilled && !isCurrent ? '✓' : idx + 1}
                </button>
              )
            })}
          </div>

          {/* Reassuring Feedback Banner */}
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#eef7f4] px-3.5 py-2 text-xs font-medium text-[#087f75]">
            <Sparkles size={14} className="shrink-0 text-[#0d9488]" />
            <span>{REASSURING_MESSAGES[currentStep]}</span>
          </div>
        </div>

        {/* Single Question per Screen Card */}
        <div className="mt-5 rounded-3xl border border-[#d8e2df] bg-white p-5 shadow-xs sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full bg-[#fff5d9] px-3 py-1 text-xs font-semibold text-[#8a6200]">
              {activeQuestion.skillName}
            </span>

            {/* Optional Audio Control Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleAudio}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                  isPlayingAudio
                    ? 'border-[#0d9488] bg-[#0d9488] text-white animate-pulse'
                    : 'border-[#cbd9d5] bg-white text-[#17324d] hover:border-[#0d9488] hover:bg-[#f0f9f6]'
                }`}
                title="Listen to question spoken aloud"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX size={15} />
                    <span>રોકો / Stop</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={15} className="text-[#0d9488]" />
                    <span>સાંભળો / Listen</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowTranscript(!showTranscript)}
                className="text-[11px] text-[#64748b] hover:text-[#0d9488] hover:underline"
              >
                {showTranscript ? 'Hide text' : 'Transcript'}
              </button>
            </div>
          </div>

          {/* Audio Transcript Drawer */}
          {showTranscript && (
            <div className="mt-3 rounded-2xl border border-[#bfe2da] bg-[#dff4ef]/50 p-3.5 text-xs text-[#087f75]">
              <p className="font-semibold">શ્રાવ્ય સંવાદ (Audio Transcript):</p>
              <p className="mt-1 leading-5">{activeQuestion.audioTranscriptGu}</p>
              <p className="mt-1 text-[#526273]">{activeQuestion.audioTranscriptEn}</p>
            </div>
          )}

          {/* Visual Stimulus Box */}
          <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border border-[#d8e7e2] bg-[#f7fbf9] p-5 text-center">
            <div className="text-3xl tracking-widest">{activeQuestion.visualStimulus.badge}</div>
            <p className="mt-2 text-base font-bold text-[#17324d] sm:text-lg">
              {activeQuestion.visualStimulus.titleGu}
            </p>
            <p className="mt-0.5 text-xs text-[#64748b]">{activeQuestion.visualStimulus.titleEn}</p>
            <span className="mt-2 inline-block rounded-md bg-[#e3efe9] px-2.5 py-0.5 text-[10px] font-semibold text-[#087f75]">
              {activeQuestion.visualStimulus.detail}
            </span>
          </div>

          {/* Question Text in Gujarati & English */}
          <div className="mt-6">
            <h4 className="text-lg font-bold leading-relaxed text-[#17324d] sm:text-xl">
              {activeQuestion.questionGu}
            </h4>
            <p className="mt-1 text-xs text-[#64748b] leading-5">{activeQuestion.questionEn}</p>
          </div>

          {/* Large Child-Friendly Answer Targets */}
          <div className="mt-6 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
              નીચેમાંથી સાચો જવાબ પસંદ કરો · Select your answer:
            </p>

            {activeQuestion.options.map((opt, oIdx) => {
              const isSelected = answers[activeQuestion.id] === opt.id

              return (
                <label
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`flex min-h-[68px] cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all duration-150 ${
                    isSelected
                      ? 'border-[#0d9488] bg-[#dff4ef] text-[#17324d] shadow-sm ring-2 ring-[#0d9488]/30'
                      : 'border-[#cbd9d5] bg-white text-[#263238] hover:border-[#0d9488]/60 hover:bg-[#f7fbf9]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition ${
                        isSelected
                          ? 'bg-[#0d9488] text-white'
                          : 'border border-[#cbd9d5] bg-[#f7f9f6] text-[#64748b]'
                      }`}
                    >
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#17324d] sm:text-base">{opt.labelGu}</p>
                      <p className="mt-0.5 text-xs text-[#64748b] truncate">{opt.labelEn}</p>
                    </div>
                  </div>

                  <div className="shrink-0 pl-3">
                    <span
                      className={`flex size-6 items-center justify-center rounded-full border ${
                        isSelected
                          ? 'border-[#0d9488] bg-[#0d9488] text-white'
                          : 'border-[#cbd9d5] bg-white'
                      }`}
                    >
                      {isSelected && '✓'}
                    </span>
                  </div>
                </label>
              )
            })}
          </div>

          {/* Selection indicator feedback */}
          {answers[activeQuestion.id] && (
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#087f75]">
              <CheckCircle2 size={15} />
              <span>જવાબ નોંધાયો છે · Answer recorded!</span>
            </div>
          )}
        </div>

        {/* Collapsible Teacher Observation Notes */}
        <div className="mt-4 rounded-2xl border border-[#e2e8e5] bg-[#fbfdfc] p-4">
          <button
            type="button"
            onClick={() => setShowNotes(!showNotes)}
            className="flex w-full items-center justify-between text-xs font-semibold text-[#17324d]"
          >
            <span>શિક્ષક અવલોકન નોંધ · Teacher Formative Observation Notes</span>
            {showNotes ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showNotes && (
            <div className="mt-3">
              <textarea
                rows={2}
                value={teacherNotes}
                onChange={(e) => setTeacherNotes(e.target.value)}
                className="w-full rounded-xl border border-[#cbd9d5] bg-white p-3 text-xs text-[#17324d] outline-none transition focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/20"
                placeholder="લખો: બાળકની વિશેષ નોંધ, ગણતરી રીત અથવા મુશ્કેલી…"
              />
              <span className="mt-1 block text-[10px] text-[#94a3b8]">
                These observation notes are saved directly into the student&apos;s learning profile.
              </span>
            </div>
          )}
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#f0c2bb] bg-[#fdedeb] p-3 text-xs font-medium text-[#b42318]">
            <AlertCircle size={15} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#e8efed] pt-4">
          <Button
            type="button"
            variant="outline"
            disabled={currentStep === 0 || isSubmitting}
            onClick={handlePrev}
            className="h-11 rounded-xl border-[#b9cbc7] px-4 text-xs font-semibold text-[#17324d] hover:bg-[#edf4f2]"
          >
            <ArrowLeft size={15} className="mr-1.5" /> પાછળ / Previous
          </Button>

          <div className="flex items-center gap-2">
            {currentStep < totalQuestions - 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="text-xs font-semibold text-[#64748b] hover:text-[#17324d] px-3 py-2"
              >
                Skip / છોડો
              </button>
            )}

            {currentStep < totalQuestions - 1 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="h-11 rounded-xl bg-[#0d9488] px-6 text-xs font-semibold text-white shadow-sm hover:bg-[#087f75]"
              >
                આગળ વધો / Next Question <ArrowRight size={15} className="ml-1.5" />
              </Button>
            ) : null}

            <Button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className={`h-11 rounded-xl px-6 text-xs font-semibold text-white shadow-sm ${
                currentStep === totalQuestions - 1
                  ? 'bg-[#0d9488] hover:bg-[#087f75]'
                  : 'bg-[#17324d] hover:bg-[#102438]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={15} className="mr-2 animate-spin" /> પરિણામ વિશ્લેષણ… Evaluating…
                </>
              ) : (
                <>
                  <Sparkles size={15} className="mr-1.5" />{' '}
                  {currentStep === totalQuestions - 1
                    ? 'તપાસણી પૂર્ણ કરો / Submit & Diagnose'
                    : `Submit Screening (${attemptedCount}/${totalQuestions})`}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
