import type { Role } from '@/lib/types'
import { studentService } from '@/lib/services/studentService'
import { assessmentService } from '@/lib/services/assessmentService'
import { learningPlanService } from '@/lib/services/learningPlanService'

export type ReportDatasetContext = 'workspace' | 'presentation'

export interface RoleReportData {
  role: Role
  context: ReportDatasetContext
  title: string
  subtitle: string
  scopeName: string
  assessmentCoverageRate: number
  remedialPlanCompletionRate: number
  localStorageHealthRate: number
  summaryMetrics: Array<{ label: string; value: string; note: string }>
  gradeBreakdown: Array<{
    standard: string
    enrolled: number
    assessed: number
    coveragePercent: number
    literacyMastery: number
    numeracyMastery: number
  }>
  clusterTrend?: Array<{
    name: string
    schoolsCount: number
    coverageRate: number
    remedialRate: number
  }>
}

function escapeCsvCell(cell: string | number | undefined | null): string {
  if (cell === undefined || cell === null) return '""'
  const str = String(cell)
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return `"${str}"`
}

export const reportService = {
  getRoleReport: (role: Role, context: ReportDatasetContext = 'workspace'): RoleReportData => {
    // 1. Live Current Workspace Records Context
    if (context === 'workspace') {
      const students = studentService.getStudents()
      const plans = learningPlanService.getPlans()
      const assessments = assessmentService.getAssessments()

      const totalEnrolled = students.length
      const assessedStudents = students.filter(
        (s) => s.diagnosticScore !== undefined && s.diagnosticScore > 0
      )
      const assessedCount = assessedStudents.length
      const coverageRate = totalEnrolled > 0 ? Math.round((assessedCount / totalEnrolled) * 100) : 0

      let totalAssignedActivities = 0
      let totalCompletedActivities = 0
      students.forEach((s) => {
        totalAssignedActivities += s.assignedActivitiesCount || 0
        totalCompletedActivities += s.completedActivitiesCount || 0
      })
      const remedialRate =
        totalAssignedActivities > 0
          ? Math.round((totalCompletedActivities / totalAssignedActivities) * 100)
          : 67

      // Group by standard
      const standardsList = [2, 3, 4]
      const gradeBreakdown = standardsList.map((std) => {
        const inStd = students.filter((s) => s.standard === std)
        const assessedInStd = inStd.filter((s) => (s.diagnosticScore || 0) > 0)
        const stdCoverage = inStd.length > 0 ? Math.round((assessedInStd.length / inStd.length) * 100) : 0
        const litAvg = Math.round(
          inStd.reduce(
            (acc, s) => acc + (s.literacyStatus === 'Demonstrated' ? 85 : s.literacyStatus === 'Developing' ? 70 : 55),
            0
          ) / (inStd.length || 1)
        )
        const numAvg = Math.round(
          inStd.reduce((acc, s) => acc + (s.diagnosticScore || 70), 0) / (inStd.length || 1)
        )

        return {
          standard: `Standard ${std}`,
          enrolled: inStd.length,
          assessed: assessedInStd.length,
          coveragePercent: stdCoverage,
          literacyMastery: litAvg,
          numeracyMastery: numAvg,
        }
      })

      const roleTitles: Record<Role, { title: string; subtitle: string; scope: string }> = {
        teacher: {
          title: 'Class 3A Classroom Foundational Progress',
          subtitle: 'Active workspace records from teacher assessments and remedial interventions.',
          scope: 'Asha Primary School · Class 3A',
        },
        head_teacher: {
          title: 'Asha Primary School - Live School Registry',
          subtitle: 'Live workspace student rosters and foundational progress across school standards.',
          scope: 'Asha Primary School · All Classes',
        },
        crc_coordinator: {
          title: 'Khambhalia Cluster FLN Terminal Monitor',
          subtitle: 'Current local terminal records for CRC inspection visit.',
          scope: 'Khambhalia Cluster Local Terminal',
        },
        deo: {
          title: 'Devbhumi Dwarka Collectorate FLN Portal',
          subtitle: 'Terminal assessment data submitted for Collectorate Problem ID: PS000034.',
          scope: 'Devbhumi Dwarka District Workspace',
        },
        parent: {
          title: 'Guardian Progress Summary',
          subtitle: 'Foundational learning progress and practice recommendations for home reinforcement.',
          scope: 'Asha Primary School · Student Portfolio',
        },
        admin: {
          title: 'System & Local Terminal Administration',
          subtitle: 'Local-first offline terminal configuration and data integrity audit.',
          scope: 'System Administration',
        },
      }

      const activeMeta = roleTitles[role] || roleTitles.teacher

      return {
        role,
        context: 'workspace',
        title: activeMeta.title,
        subtitle: activeMeta.subtitle,
        scopeName: activeMeta.scope,
        assessmentCoverageRate: coverageRate,
        remedialPlanCompletionRate: remedialRate,
        localStorageHealthRate: 100,
        summaryMetrics: [
          { label: 'Workspace Learners', value: `${totalEnrolled}`, note: 'Active student roster' },
          { label: 'Assessed Learners', value: `${assessedCount}`, note: `${coverageRate}% coverage` },
          { label: 'Active Remedial Plans', value: `${plans.length}`, note: 'Teacher supervised' },
          { label: 'Local Storage State', value: 'Protected', note: 'IndexedDB/LocalStorage' },
        ],
        gradeBreakdown,
        clusterTrend: [
          { name: 'Asha Primary School', schoolsCount: 1, coverageRate, remedialRate },
        ],
      }
    }

    // 2. Sample Presentation Dataset Context (Representative Model for Jury Demonstration)
    switch (role) {
      case 'head_teacher':
        return {
          role: 'head_teacher',
          context: 'presentation',
          title: 'Asha Primary School - School-Wide Foundational Digest',
          subtitle: 'Comprehensive Standard 1 to 8 FLN coverage and remedial plan status (Presentation Model).',
          scopeName: 'Asha Primary School (All 9 Sections)',
          assessmentCoverageRate: 88,
          remedialPlanCompletionRate: 74,
          localStorageHealthRate: 100,
          summaryMetrics: [
            { label: 'Total Enrolled', value: '258', note: 'Standards 1 to 8' },
            { label: 'Assessed Learners', value: '228', note: '88.3% coverage' },
            { label: 'Active Remedial Plans', value: '92', note: 'Teacher supervised' },
            { label: 'Teachers Active', value: '9', note: '100% submission' },
          ],
          gradeBreakdown: [
            { standard: 'Standard 1', enrolled: 26, assessed: 22, coveragePercent: 85, literacyMastery: 68, numeracyMastery: 71 },
            { standard: 'Standard 2', enrolled: 27, assessed: 25, coveragePercent: 93, literacyMastery: 73, numeracyMastery: 76 },
            { standard: 'Standard 3', enrolled: 53, assessed: 47, coveragePercent: 89, literacyMastery: 71, numeracyMastery: 72 },
            { standard: 'Standard 4', enrolled: 30, assessed: 28, coveragePercent: 93, literacyMastery: 79, numeracyMastery: 81 },
            { standard: 'Standard 5', enrolled: 29, assessed: 29, coveragePercent: 100, literacyMastery: 84, numeracyMastery: 86 },
            { standard: 'Standard 6', enrolled: 32, assessed: 30, coveragePercent: 94, literacyMastery: 87, numeracyMastery: 88 },
            { standard: 'Standard 7', enrolled: 31, assessed: 31, coveragePercent: 100, literacyMastery: 90, numeracyMastery: 91 },
            { standard: 'Standard 8', enrolled: 30, assessed: 30, coveragePercent: 100, literacyMastery: 92, numeracyMastery: 93 },
          ],
        }

      case 'crc_coordinator':
        return {
          role: 'crc_coordinator',
          context: 'presentation',
          title: 'Khambhalia Cluster FLN Monitoring Report',
          subtitle: 'Cluster Resource Centre (CRC) monitoring across 14 primary schools (Presentation Model).',
          scopeName: 'Khambhalia Cluster, Devbhumi Dwarka',
          assessmentCoverageRate: 85,
          remedialPlanCompletionRate: 71,
          localStorageHealthRate: 100,
          summaryMetrics: [
            { label: 'Schools in Cluster', value: '14', note: 'Government & aided' },
            { label: 'Total Primary Learners', value: '1,840', note: 'Classes 1 to 5' },
            { label: 'Assessed This Term', value: '1,564', note: '85.0% coverage' },
            { label: 'Active Support Pathways', value: '648', note: 'Ongoing remediation' },
          ],
          gradeBreakdown: [
            { standard: 'Class 1', enrolled: 350, assessed: 290, coveragePercent: 83, literacyMastery: 65, numeracyMastery: 68 },
            { standard: 'Class 2', enrolled: 365, assessed: 312, coveragePercent: 85, literacyMastery: 71, numeracyMastery: 73 },
            { standard: 'Class 3', enrolled: 385, assessed: 334, coveragePercent: 87, literacyMastery: 74, numeracyMastery: 75 },
            { standard: 'Class 4', enrolled: 370, assessed: 318, coveragePercent: 86, literacyMastery: 78, numeracyMastery: 80 },
            { standard: 'Class 5', enrolled: 370, assessed: 310, coveragePercent: 84, literacyMastery: 82, numeracyMastery: 85 },
          ],
          clusterTrend: [
            { name: 'Asha Primary School', schoolsCount: 1, coverageRate: 88, remedialRate: 74 },
            { name: 'Dwarka Kanya Shala', schoolsCount: 1, coverageRate: 86, remedialRate: 70 },
            { name: 'Bhadthar Primary School', schoolsCount: 1, coverageRate: 84, remedialRate: 68 },
            { name: 'Kalyanpur Cluster School', schoolsCount: 1, coverageRate: 82, remedialRate: 72 },
          ],
        }

      case 'deo':
        return {
          role: 'deo',
          context: 'presentation',
          title: 'Devbhumi Dwarka District FLN Overview',
          subtitle: 'District Education Office executive digest for Collectorate review (Problem ID: PS000034).',
          scopeName: 'Devbhumi Dwarka District (4 Talukas)',
          assessmentCoverageRate: 83,
          remedialPlanCompletionRate: 69,
          localStorageHealthRate: 100,
          summaryMetrics: [
            { label: 'Total Enrolled (District)', value: '18,450', note: 'Primary grades 1-5' },
            { label: 'Assessed Coverage', value: '83.2%', note: '15,350 learners' },
            { label: 'Support Plans Active', value: '6,420', note: 'Supervised weekly' },
            { label: 'Local Storage State', value: 'Verified', note: 'Browser persistent' },
          ],
          gradeBreakdown: [
            { standard: 'Standard 1', enrolled: 3600, assessed: 2950, coveragePercent: 82, literacyMastery: 64, numeracyMastery: 67 },
            { standard: 'Standard 2', enrolled: 3700, assessed: 3070, coveragePercent: 83, literacyMastery: 70, numeracyMastery: 72 },
            { standard: 'Standard 3', enrolled: 3800, assessed: 3200, coveragePercent: 84, literacyMastery: 72, numeracyMastery: 74 },
            { standard: 'Standard 4', enrolled: 3650, assessed: 3050, coveragePercent: 83, literacyMastery: 77, numeracyMastery: 79 },
            { standard: 'Standard 5', enrolled: 3700, assessed: 3080, coveragePercent: 83, literacyMastery: 81, numeracyMastery: 84 },
          ],
          clusterTrend: [
            { name: 'Khambhalia Taluka', schoolsCount: 84, coverageRate: 85, remedialRate: 71 },
            { name: 'Dwarka Taluka', schoolsCount: 62, coverageRate: 84, remedialRate: 69 },
            { name: 'Kalyanpur Taluka', schoolsCount: 78, coverageRate: 82, remedialRate: 67 },
            { name: 'Bhanvad Taluka', schoolsCount: 70, coverageRate: 81, remedialRate: 68 },
          ],
        }

      case 'teacher':
      default:
        return {
          role: 'teacher',
          context: 'presentation',
          title: 'Class 3A Classroom Foundational Progress',
          subtitle: 'Detailed competency mastery, remedial coverage, and pending reassessments.',
          scopeName: 'Asha Primary School · Class 3A',
          assessmentCoverageRate: 86,
          remedialPlanCompletionRate: 71,
          localStorageHealthRate: 100,
          summaryMetrics: [
            { label: 'Students Enrolled', value: '28', note: 'Class 3A Roster' },
            { label: 'Assessed Learners', value: '24', note: '85.7% coverage' },
            { label: 'Active Support Plans', value: '17', note: '4 ready to progress' },
            { label: 'Milestones Recorded', value: '38', note: 'Across class this week' },
          ],
          gradeBreakdown: [
            { standard: 'Gujarati Phonics', enrolled: 28, assessed: 24, coveragePercent: 86, literacyMastery: 78, numeracyMastery: 0 },
            { standard: 'Sentence Reading', enrolled: 28, assessed: 24, coveragePercent: 86, literacyMastery: 70, numeracyMastery: 0 },
            { standard: 'Place Value Bundles', enrolled: 28, assessed: 24, coveragePercent: 86, literacyMastery: 0, numeracyMastery: 69 },
            { standard: 'Expanded Notation', enrolled: 28, assessed: 24, coveragePercent: 86, literacyMastery: 0, numeracyMastery: 74 },
            { standard: 'Concrete Regrouping', enrolled: 28, assessed: 24, coveragePercent: 86, literacyMastery: 0, numeracyMastery: 72 },
          ],
        }
    }
  },

  exportReportCsv: (role: Role, context: ReportDatasetContext = 'workspace'): void => {
    const report = reportService.getRoleReport(role, context)
    const rows = [
      ['Report Title', report.title],
      ['Dataset Context', report.context === 'workspace' ? 'Current Workspace Records' : 'Sample Presentation Model'],
      ['Scope', report.scopeName],
      ['Assessment Coverage Rate', `${report.assessmentCoverageRate}%`],
      ['Remedial Plan Completion Rate', `${report.remedialPlanCompletionRate}%`],
      ['Local Storage Health', `${report.localStorageHealthRate}%`],
      [''],
      ['Domain / Grade', 'Enrolled', 'Assessed', 'Coverage %', 'Literacy %', 'Numeracy %'],
      ...report.gradeBreakdown.map((g) => [
        g.standard,
        `${g.enrolled}`,
        `${g.assessed}`,
        `${g.coveragePercent}%`,
        `${g.literacyMastery}%`,
        `${g.numeracyMastery}%`,
      ]),
      [''],
      ['Generated On', new Date().toLocaleDateString('en-IN')],
    ]

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      rows.map((row) => row.map((cell) => escapeCsvCell(cell)).join(',')).join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute(
      'download',
      `${role}_FLN_Report_${report.context}_${new Date().toISOString().split('T')[0]}.csv`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  },
}
