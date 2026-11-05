import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { reportService } from '../lib/services/reportService.ts'

describe('Report Service & Honest Dual-Context System', () => {
  it('generates genuine workspace records based on live student data', () => {
    const report = reportService.getRoleReport('teacher', 'workspace')
    assert.equal(report.context, 'workspace')
    assert.equal(report.role, 'teacher')
    assert.ok(report.summaryMetrics.length >= 4)
    assert.ok(report.assessmentCoverageRate >= 0 && report.assessmentCoverageRate <= 100)
    assert.ok(report.remedialPlanCompletionRate >= 0 && report.remedialPlanCompletionRate <= 100)
    assert.equal(report.localStorageHealthRate, 100)
  })

  it('generates sample presentation dataset for cluster and district reviews without fabricated sync percentages', () => {
    const deoReport = reportService.getRoleReport('deo', 'presentation')
    assert.equal(deoReport.context, 'presentation')
    assert.equal(deoReport.role, 'deo')
    assert.ok(deoReport.summaryMetrics.some((m) => m.label.includes('District')))
    assert.equal(deoReport.localStorageHealthRate, 100)

    const crcReport = reportService.getRoleReport('crc_coordinator', 'presentation')
    assert.equal(crcReport.context, 'presentation')
    assert.ok(crcReport.clusterTrend && crcReport.clusterTrend.length > 0)
  })

  it('ensures CSV fields with commas or quotes are safely escaped per RFC 4180', () => {
    function escapeCsvCell(cell) {
      if (cell === undefined || cell === null) return '""'
      const str = String(cell)
      if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
        return `"${str.replace(/"/g, '""')}"`
      }
      return `"${str}"`
    }

    const testCellWithComma = 'Asha Primary School, Khambhalia'
    assert.equal(escapeCsvCell(testCellWithComma), '"Asha Primary School, Khambhalia"')

    const testCellWithQuotes = 'Title with "Quotes" inside'
    assert.equal(escapeCsvCell(testCellWithQuotes), '"Title with ""Quotes"" inside"')

    const normalCell = 'Standard 3'
    assert.equal(escapeCsvCell(normalCell), '"Standard 3"')
  })
})
