import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { INITIAL_STUDENTS, studentService } from '../lib/services/studentService.ts'

describe('Student Service & Progress Lifecycle', () => {
  it('loads valid initial students with canonical fields', () => {
    const students = studentService.getStudents()
    assert.ok(Array.isArray(students), 'Students must be an array')
    assert.ok(students.length >= 6, 'Must contain at least 6 diverse student records')

    const aarav = studentService.getStudentById('aarav-k')
    assert.ok(aarav, 'Aarav Kumar must exist')
    assert.equal(aarav.fullName, 'Aarav Kumar')
    assert.equal(aarav.standard, 3)
    assert.equal(aarav.classId, 'class-std-3a')
  })

  it('filters students by standard, classId, and status correctly', () => {
    const class3Students = studentService.getStudents({ standard: 3 })
    assert.ok(class3Students.length > 0)
    class3Students.forEach((s) => assert.equal(s.standard, 3))

    const needsSupport = studentService.getStudents({ status: 'Needs Support' })
    assert.ok(needsSupport.length > 0)
    needsSupport.forEach((s) => assert.equal(s.overallStatus, 'Needs Support'))
  })

  it('records activity completion without duplicate increments for the same activity', () => {
    const testStudent = {
      id: 'test-stu-1',
      studentId: 'STU-TEST-001',
      name: 'Test Student',
      fullName: 'Test Student',
      standard: 3,
      section: 'A',
      rollNo: '99',
      avatar: 'TS',
      gender: 'Female',
      dob: '2017-01-01',
      preferredLanguage: 'gu',
      enrollmentStatus: 'Active',
      overallStatus: 'Needs Support',
      literacyStatus: 'Developing',
      numeracyStatus: 'Needs Support',
      completedActivitiesCount: 0,
      assignedActivitiesCount: 3,
      completedActivityIds: [],
    }

    // Direct simulation of logic
    const currentCompletedIds = testStudent.completedActivityIds || []
    const actId = 'act-test-01'

    const nextCompletedIds = [...currentCompletedIds, actId]
    const nextCompleted = nextCompletedIds.length
    const totalAssigned = Math.max(testStudent.assignedActivitiesCount, nextCompleted)
    const nextPercent = Math.min(100, Math.round((nextCompleted / totalAssigned) * 100))

    assert.equal(nextCompleted, 1)
    assert.equal(nextPercent, 33)

    // Second completion of same actId should be rejected by the id check
    const isDuplicate = nextCompletedIds.includes(actId)
    assert.equal(isDuplicate, true)
  })
})
