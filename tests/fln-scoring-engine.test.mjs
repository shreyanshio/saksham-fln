import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  FLN_DIAGNOSTIC_QUESTIONS,
  evaluateFLNDiagnostic,
} from '../lib/fln-scoring-engine.ts'

describe('FLN Scoring Engine & Diagnostic Evaluation', () => {
  it('contains exactly 5 curriculum-aligned diagnostic questions with full Hindi and Gujarati localizations', () => {
    assert.equal(FLN_DIAGNOSTIC_QUESTIONS.length, 5)

    FLN_DIAGNOSTIC_QUESTIONS.forEach((q) => {
      assert.ok(q.id, 'Question must have id')
      assert.ok(q.skillId, 'Question must have skillId')
      assert.ok(q.questionGu, 'Question must have questionGu')
      assert.ok(q.questionEn, 'Question must have questionEn')
      assert.ok(q.questionHi, 'Question must have questionHi')
      assert.ok(q.audioTranscriptGu, 'Question must have audioTranscriptGu')
      assert.ok(q.audioTranscriptEn, 'Question must have audioTranscriptEn')
      assert.ok(q.audioTranscriptHi, 'Question must have audioTranscriptHi')
      assert.ok(q.visualStimulus.titleHi, 'Visual stimulus must have titleHi')

      assert.ok(q.options.length >= 3, 'Question must have at least 3 options')
      const correctOptions = q.options.filter((o) => o.isCorrect)
      assert.equal(correctOptions.length, 1, 'Question must have exactly 1 correct option')

      q.options.forEach((opt) => {
        assert.ok(opt.labelGu, 'Option must have labelGu')
        assert.ok(opt.labelEn, 'Option must have labelEn')
        assert.ok(opt.labelHi, 'Option must have labelHi')
        if (!opt.isCorrect) {
          assert.ok(opt.misconceptionDiagnosis, 'Distractor must specify misconception diagnosis')
        }
      })
    })
  })

  it('evaluates 100% correct answers with full mastery, zero probable gaps, and 100% evidence coverage', () => {
    const perfectAnswers = {
      q1: 'opt-1a',
      q2: 'opt-2a',
      q3: 'opt-3a',
      q4: 'opt-4a',
      q5: 'opt-5a',
    }

    const result = evaluateFLNDiagnostic(perfectAnswers, 'Student was highly confident and quick.')
    assert.equal(result.overallScore, 100)
    assert.equal(result.accuracyPercent, 100)
    assert.equal(result.evidenceCoveragePercent, 100)
    assert.equal(result.attemptedQuestionsCount, 5)
    assert.equal(result.correctAnswersCount, 5)
    assert.equal(result.probableGapsCount, 0)
    assert.equal(result.insufficientEvidenceCount, 0)

    result.skills.forEach((s) => {
      assert.equal(s.status, 'Mastered')
      assert.equal(s.isProbableGap, false)
      assert.equal(s.isInsufficientEvidence, false)
    })
  })

  it('correctly handles unattempted assessment: returns 0% coverage, flags Insufficient Evidence, and recommends 1-on-1 oral check', () => {
    const emptyAnswers = {}
    const result = evaluateFLNDiagnostic(emptyAnswers)

    assert.equal(result.overallScore, 0)
    assert.equal(result.evidenceCoveragePercent, 0)
    assert.equal(result.attemptedQuestionsCount, 0)
    assert.equal(result.correctAnswersCount, 0)
    assert.equal(result.probableGapsCount, 0)
    assert.equal(result.insufficientEvidenceCount, result.skills.length)

    result.skills.forEach((s) => {
      assert.equal(s.status, 'Insufficient Evidence')
      assert.equal(s.isInsufficientEvidence, true)
      assert.equal(s.isProbableGap, false)
    })

    assert.ok(
      result.pedagogicalSummary.includes('Insufficient diagnostic evidence'),
      'Must explain unattempted diagnostic status'
    )
    assert.ok(
      result.recommendedActivities[0].id.includes('oral'),
      'Must recommend oral screening check for unattempted baseline'
    )
  })

  it('correctly deduces positional reversal misconception in Question 3 (num-bundling)', () => {
    const testAnswers = {
      q1: 'opt-1a',
      q2: 'opt-2a',
      q3: 'opt-3b', // Positional reversal (wrote 43 instead of 34)
      q4: 'opt-4a',
      q5: 'opt-5a',
    }

    const result = evaluateFLNDiagnostic(testAnswers, 'Hesitated on place-value notation')
    assert.equal(result.attemptedQuestionsCount, 5)
    assert.equal(result.correctAnswersCount, 4)
    assert.equal(result.accuracyPercent, 80)
    assert.equal(result.evidenceCoveragePercent, 100)

    const bundlingSkill = result.skills.find((s) => s.skillId === 'num-bundling')
    assert.ok(bundlingSkill, 'Must find num-bundling skill')
    assert.equal(bundlingSkill.isProbableGap, true)
    assert.equal(bundlingSkill.status, 'Probable Gap')

    const q3Evidence = result.evidences.find((e) => e.questionId === 'q3')
    assert.ok(q3Evidence, 'Must find q3 evidence')
    assert.equal(q3Evidence.isCorrect, false)
    assert.ok(
      q3Evidence.misconceptionDiagnosis.includes('Positional Reversal'),
      'Must identify positional reversal misconception'
    )
  })
})
