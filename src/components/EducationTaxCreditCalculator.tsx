'use client'

import { useState } from 'react'

export default function EducationTaxCreditCalculator() {
  const [educationExpenses, setEducationExpenses] = useState('')
  const [tuitionFees, setTuitionFees] = useState('')
  const [numStudents, setNumStudents] = useState('')
  const [studentType, setStudentType] = useState('undergraduate')
  const [agi, setAgi] = useState('')
  const [filingStatus, setFilingStatus] = useState('married')
  const [taxYear, setTaxYear] = useState('2026')
  const [enrollmentStatus, setEnrollmentStatus] = useState('full_time')
  const [creditType, setCreditType] = useState('aotc')
  const [lifetimeLearningYears, setLifetimeLearningYears] = useState('')
  const [isThirdYear, setIsThirdYear] = useState(false)
  const [qualifiedExpenses, setQualifiedExpenses] = useState('')
  const [scholarships, setScholarships] = useState('')
  const [isDependent, setIsDependent] = useState(false)

  const calculate = () => {
    const expenses = parseFloat(educationExpenses) || 10000
    const tuition = parseFloat(tuitionFees) || expenses
    const students = parseInt(numStudents) || 1
    const type = studentType
    const totalAgi = parseFloat(agi) || 120000
    const status = filingStatus
    const year = parseInt(taxYear) || 2026
    const enrollment = enrollmentStatus
    const credit = creditType
    const llYears = parseInt(lifetimeLearningYears) || 1
    const thirdYear = isThirdYear
    const qualified = parseFloat(qualifiedExpenses) || tuition
    const scholarship = parseFloat(scholarships) || 0
    const dependent = isDependent

    // American Opportunity Tax Credit (AOTC)
    // Up to $2,500 per student per year for first 4 years of undergraduate
    // 100% of first $2,000 + 25% of next $2,000
    // Maximum: $2,500 per student
    // Up to $1,000 (40%) refundable
    // Income limits: MFJ $180,000 phase-out, Single $90,000
    const aotcMaxPerStudent = 2500
    const aotcRefundablePercent = 0.40
    const aotcRefundableMax = 1000
    const aotcNonRefundable = 1500

    // Lifetime Learning Credit (LLC)
    // Up to $2,000 per tax return (not per student)
    // 20% of up to $10,000 qualified expenses
    // Non-refundable only
    // No limit on years, includes graduate, professional, adult education
    const llcRate = 0.20
    const llcMaxExpenses = 10000
    const llcMaxCredit = 2000

    // Phase-out thresholds (2026 - indexed)
    const aotcPhaseOutThresholds: Record<string, { start: number; end: number }> = {
      'married': { start: 180000, end: 220000 },
      'single': { start: 90000, end: 110000 },
      'head_household': { start: 90000, end: 110000 },
      'married_separate': { start: 90000, end: 110000 }
    }

    const llcPhaseOutThresholds: Record<string, { start: number; end: number }> = {
      'married': { start: 160000, end: 200000 },
      'single': { start: 80000, end: 100000 },
      'head_household': { start: 80000, end: 100000 },
      'married_separate': { start: 80000, end: 100000 }
    }

    // Adjusted qualified expenses (subtract scholarships)
    const adjustedQualified = Math.max(0, qualified - scholarship)

    // AOTC Eligibility
    // First 4 years of post-secondary education
    // Student must be enrolled at least half-time
    // Must be pursuing degree or credential
    // No drug convictions on record
    const aotcYearsLimit = 4
    const aotcEligible = type === 'undergraduate' && enrollment !== 'less_half' && !thirdYear

    // Calculate AOTC
    let aotcCredit = 0
    let aotcRefundable = 0
    let aotcNonRefundablePortion = 0

    if (aotcEligible && credit === 'aotc') {
      // Per student calculation
      let perStudentCredit = 0
      for (let i = 0; i < students; i++) {
        // First $2,000 = 100%, next $2,000 = 25%
        const studentExpenses = Math.min(adjustedQualified / students, 4000)
        const first2000 = Math.min(studentExpenses, 2000) * 1.0
        const next2000 = Math.max(0, Math.min(studentExpenses - 2000, 2000)) * 0.25
        perStudentCredit += first2000 + next2000
      }
      aotcCredit = Math.min(perStudentCredit, students * aotcMaxPerStudent)

      // Refundable portion (40% of credit)
      aotcRefundable = Math.min(aotcCredit * aotcRefundablePercent, students * aotcRefundableMax)
      aotcNonRefundablePortion = aotcCredit - aotcRefundable

      // Phase-out
      const threshold = aotcPhaseOutThresholds[status as keyof typeof aotcPhaseOutThresholds] || aotcPhaseOutThresholds['single']
      if (totalAgi > threshold.start) {
        const phaseOutRange = threshold.end - threshold.start
        const excess = totalAgi - threshold.start
        const phaseOutPercent = excess / phaseOutRange
        aotcCredit = aotcCredit * (1 - phaseOutPercent)
        aotcRefundable = aotcRefundable * (1 - phaseOutPercent)
        aotcNonRefundablePortion = aotcNonRefundablePortion * (1 - phaseOutPercent)
      }
    }

    // Calculate LLC
    let llcCredit = 0

    if (credit === 'llc' || credit === 'compare') {
      // 20% of qualified expenses up to $10,000
      // Per return, not per student
      const effectiveExpenses = Math.min(adjustedQualified, llcMaxExpenses)
      llcCredit = effectiveExpenses * llcRate
      llcCredit = Math.min(llcCredit, llcMaxCredit)

      // Phase-out
      const threshold = llcPhaseOutThresholds[status as keyof typeof llcPhaseOutThresholds] || llcPhaseOutThresholds['single']
      if (totalAgi > threshold.start) {
        const phaseOutRange = threshold.end - threshold.start
        const excess = totalAgi - threshold.start
        const phaseOutPercent = Math.min(1, excess / phaseOutRange)
        llcCredit = llcCredit * (1 - phaseOutPercent)
      }
    }

    // Cannot claim both for same student same year
    // Must choose AOTC or LLC per student
    const recommendedCredit = aotcCredit > llcCredit ? 'aotc' : 'llc'

    // Qualified expenses breakdown
    const qualifiedExpenseTypes = [
      'Tuition and fees',
      'Books, supplies, equipment required for enrollment',
      'Computers if required by institution'
    ]

    const nonQualifiedExpenseTypes = [
      'Room and board',
      'Transportation',
      'Insurance',
      'Medical expenses',
      'Personal living expenses',
      'Sports/recreation unless required'
    ]

    // Comparison for decision
    const comparison = {
      aotc: {
        credit: aotcCredit.toFixed(2),
        refundable: aotcRefundable.toFixed(2),
        nonRefundable: aotcNonRefundablePortion.toFixed(2),
        eligible: aotcEligible,
        pros: ['Higher credit ($2,500 max)', '40% refundable ($1,000)', 'Per student limit'],
        cons: ['Only first 4 years', 'Undergraduate only', 'Degree-seeking required']
      },
      llc: {
        credit: llcCredit.toFixed(2),
        refundable: '0',
        nonRefundable: llcCredit.toFixed(2),
        eligible: true,
        pros: ['No year limit', 'Graduate/professional eligible', 'Adult education included'],
        cons: ['Lower credit ($2,000 max)', 'Non-refundable only', 'Per return limit']
      }
    }

    return {
      educationExpenses: expenses.toFixed(2),
      tuitionFees: tuition.toFixed(2),
      numStudents: students,
      studentType: type,
      agi: totalAgi.toFixed(2),
      filingStatus: status,
      taxYear: year,
      enrollmentStatus: enrollment,
      creditType: credit,
      qualifiedExpenses: adjustedQualified.toFixed(2),
      scholarships: scholarship.toFixed(2),
      isDependent: dependent,
      aotcEligible,
      aotcCredit: aotcCredit.toFixed(2),
      aotcRefundable: aotcRefundable.toFixed(2),
      aotcNonRefundable: aotcNonRefundablePortion.toFixed(2),
      llcCredit: llcCredit.toFixed(2),
      recommendedCredit,
      comparison,
      qualifiedExpenseTypes,
      nonQualifiedExpenseTypes,
      aotcMaxPerStudent: aotcMaxPerStudent.toFixed(0),
      llcMaxCredit: llcMaxCredit.toFixed(0)
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Education Tax Credit Calculator</h1>
      <p className="text-zinc-600">Calculate American Opportunity Tax Credit (AOTC) and Lifetime Learning Credit for education expenses.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Education Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Credit Type</label>
            <select
              value={creditType}
              onChange={(e) => setCreditType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="aotc">American Opportunity Tax Credit (AOTC)</option>
              <option value="llc">Lifetime Learning Credit (LLC)</option>
              <option value="compare">Compare Both Credits</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Student Type</label>
            <select
              value={studentType}
              onChange={(e) => setStudentType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="undergraduate">Undergraduate (AOTC eligible)</option>
              <option value="graduate">Graduate/Professional (LLC only)</option>
              <option value="adult">Adult Education/Certificate (LLC only)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Number of Students</label>
            <input
              type="number"
              value={numStudents}
              onChange={(e) => setNumStudents(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="AOTC: per student; LLC: per return"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Enrollment Status</label>
            <select
              value={enrollmentStatus}
              onChange={(e) => setEnrollmentStatus(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="full_time">Full-time</option>
              <option value="half_time">Half-time (AOTC eligible)</option>
              <option value="less_half">Less than half-time (LLC only)</option>
            </select>
          </div>
          {studentType === 'undergraduate' && (
            <div>
              <label className="block text-sm text-zinc-600 mb-2">Third or Fourth Year of AOTC?</label>
              <label className="flex items-center gap-2 bg-white rounded p-2">
                <input
                  type="checkbox"
                  checked={isThirdYear}
                  onChange={(e) => setIsThirdYear(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>Year 3 or 4 of AOTC (max 4 years per student)</span>
              </label>
            </div>
          )}
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Tax Year</label>
            <select
              value={taxYear}
              onChange={(e) => setTaxYear(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Qualified Expenses</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Total Education Expenses</label>
            <input
              type="number"
              value={educationExpenses}
              onChange={(e) => setEducationExpenses(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Tuition, fees, books, supplies"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Tuition & Required Fees</label>
            <input
              type="number"
              value={tuitionFees}
              onChange={(e) => setTuitionFees(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Qualified tuition and fees"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Scholarships/Grants Received</label>
            <input
              type="number"
              value={scholarships}
              onChange={(e) => setScholarships(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Tax-free scholarships reduce qualified expenses"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Tax-free scholarships/grants reduce qualified expenses. Taxable scholarships don't reduce.
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Income & Filing Status</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="married">Married Joint (AOTC: $180K-220K phase-out)</option>
              <option value="single">Single (AOTC: $90K-110K phase-out)</option>
              <option value="head_household">Head of Household ($90K-110K phase-out)</option>
              <option value="married_separate">Married Separate ($90K-110K phase-out)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Adjusted Gross Income (AGI)</label>
            <input
              type="number"
              value={agi}
              onChange={(e) => setAgi(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter AGI"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-2">Claimed as Dependent?</label>
            <label className="flex items-center gap-2 bg-white rounded p-2">
              <input
                type="checkbox"
                checked={isDependent}
                onChange={(e) => setIsDependent(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Student claimed as dependent on parent's return</span>
            </label>
            <div className="text-xs text-zinc-500 mt-1">
              If dependent, parent claims credit. If not, student claims credit.
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Qualified vs Non-qualified Expenses</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-green-50 rounded p-3">
            <strong className="text-green-700">Qualified Expenses</strong>
            <div className="text-zinc-500">
              {result.qualifiedExpenseTypes.map((exp, idx) => (
                <div key={idx}>- {exp}</div>
              ))}
            </div>
          </div>
          <div className="bg-red-50 rounded p-3">
            <strong className="text-red-700">Non-qualified Expenses</strong>
            <div className="text-zinc-500">
              {result.nonQualifiedExpenseTypes.map((exp, idx) => (
                <div key={idx}>- {exp}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {result.creditType === 'aotc' && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-4">American Opportunity Tax Credit (AOTC)</h3>
          <div className="space-y-2 text-xs">
            <div className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">Qualified Expenses (net)</span>
              <span className="font-bold">$${result.qualifiedExpenses}</span>
            </div>
            <div className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">Number of Students</span>
              <span className="font-bold">{result.numStudents}</span>
            </div>
            <div className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">Maximum Credit per Student</span>
              <span>$${result.aotcMaxPerStudent}</span>
            </div>
            {result.aotcEligible ? (
              <>
                <div className="bg-green-50 rounded p-3 flex justify-between">
                  <span className="text-zinc-600">Calculated AOTC</span>
                  <span className="font-bold text-green-600">$${result.aotcCredit}</span>
                </div>
                <div className="bg-blue-50 rounded p-3 flex justify-between">
                  <span className="text-zinc-600">Refundable Portion (40%)</span>
                  <span className="font-bold text-blue-600">$${result.aotcRefundable}</span>
                </div>
                <div className="bg-yellow-50 rounded p-3 flex justify-between">
                  <span className="text-zinc-600">Non-refundable Portion</span>
                  <span className="font-bold text-yellow-600">$${result.aotcNonRefundable}</span>
                </div>
              </>
            ) : (
              <div className="bg-red-50 rounded p-3">
                <span className="text-red-600">Not eligible for AOTC - exceeds 4-year limit or not undergraduate</span>
              </div>
            )}
          </div>
        </div>
      )}

      {result.creditType === 'llc' && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-4">Lifetime Learning Credit (LLC)</h3>
          <div className="space-y-2 text-xs">
            <div className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">Qualified Expenses</span>
              <span className="font-bold">$${result.qualifiedExpenses}</span>
            </div>
            <div className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">Credit Rate</span>
              <span>20% of up to $10,000</span>
            </div>
            <div className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">Maximum Credit</span>
              <span>$${result.llcMaxCredit} per return</span>
            </div>
            <div className="bg-green-50 rounded p-3 flex justify-between">
              <span className="font-medium">Lifetime Learning Credit</span>
              <span className="font-bold text-green-600">$${result.llcCredit}</span>
            </div>
            <div className="bg-yellow-50 rounded p-3">
              <span className="text-yellow-600">Non-refundable only - reduces tax liability</span>
            </div>
          </div>
        </div>
      )}

      {result.creditType === 'compare' && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-4">Credit Comparison</h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-white rounded p-4">
              <div className="font-medium mb-2 text-green-700">American Opportunity (AOTC)</div>
              <div className="flex justify-between mb-1">
                <span>Total Credit</span>
                <span className="font-bold">$${result.comparison.aotc.credit}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Refundable</span>
                <span className="text-blue-600">$${result.comparison.aotc.refundable}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Non-refundable</span>
                <span className="text-yellow-600">$${result.comparison.aotc.nonRefundable}</span>
              </div>
              <div className="mt-2 text-zinc-500">
                <div className="font-medium">Pros:</div>
                {result.comparison.aotc.pros.map((p, i) => <div key={i}>- {p}</div>)}
                <div className="font-medium mt-1">Cons:</div>
                {result.comparison.aotc.cons.map((c, i) => <div key={i}>- {c}</div>)}
              </div>
              {result.comparison.aotc.eligible ? (
                <div className="text-green-600 mt-2">Eligible</div>
              ) : (
                <div className="text-red-600 mt-2">Not Eligible</div>
              )}
            </div>
            <div className="bg-white rounded p-4">
              <div className="font-medium mb-2 text-blue-700">Lifetime Learning (LLC)</div>
              <div className="flex justify-between mb-1">
                <span>Total Credit</span>
                <span className="font-bold">$${result.comparison.llc.credit}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Refundable</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Non-refundable</span>
                <span className="text-yellow-600">$${result.comparison.llc.nonRefundable}</span>
              </div>
              <div className="mt-2 text-zinc-500">
                <div className="font-medium">Pros:</div>
                {result.comparison.llc.pros.map((p, i) => <div key={i}>- {p}</div>)}
                <div className="font-medium mt-1">Cons:</div>
                {result.comparison.llc.cons.map((c, i) => <div key={i}>- {c}</div>)}
              </div>
              <div className="text-green-600 mt-2">Eligible</div>
            </div>
          </div>
          <div className="bg-green-50 rounded p-3 mt-4">
            <span className="font-medium text-green-700">Recommended: {result.recommendedCredit === 'aotc' ? 'American Opportunity Credit (higher, refundable)' : 'Lifetime Learning Credit'}</span>
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">AOTC Eligibility Requirements</h3>
        <div className="text-xs text-zinc-600">
          <div className="mb-2"><strong>Education Level:</strong> First 4 years of post-secondary education</div>
          <div className="mb-2"><strong>Enrollment:</strong> At least half-time for at least one academic period</div>
          <div className="mb-2"><strong>Purpose:</strong> Pursuing degree or other recognized credential</div>
          <div className="mb-2"><strong>Student:</strong> You, spouse, or dependent claimed on your return</div>
          <div className="mb-2"><strong>Criminal:</strong> No federal or state felony drug conviction</div>
          <div><strong>Limit:</strong> Maximum 4 years per student (includes years claimed by others)</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">LLC Eligibility Requirements</h3>
        <div className="text-xs text-zinc-600">
          <div className="mb-2"><strong>Education Level:</strong> Any post-secondary education (undergraduate, graduate, professional)</div>
          <div className="mb-2"><strong>Enrollment:</strong> Any enrollment level (even one course)</div>
          <div className="mb-2"><strong>Purpose:</strong> Degree, credential, or job skill improvement</div>
          <div className="mb-2"><strong>Student:</strong> You, spouse, or dependent</div>
          <div><strong>Limit:</strong> No year limit, unlimited years of credit</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cannot Claim Both for Same Student</h3>
        <div className="text-xs text-zinc-600">
          Cannot claim AOTC and LLC for same student in same year. Choose the credit that gives you the largest benefit. AOTC generally higher for eligible undergraduate students. LLC better for graduate students, professional education, or after 4 years. Claim different credits for different students in same family.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Points</h3>
        <div className="text-xs text-zinc-600">
          AOTC: $2,500 max (40% refundable), first 4 years, undergraduate. LLC: $2,000 max (non-refundable), no year limit, all levels. Phase-out at higher incomes. Must have Form 1098-T from institution. Cannot claim for same student as another taxpayer. Reduced by tax-free scholarships. File Form 8863 to claim. Tuition required; room/board excluded.
        </div>
      </div>
    </main>
  )
}