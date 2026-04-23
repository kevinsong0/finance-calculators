'use client'

import { useState } from 'react'

export default function RiskToleranceCalculator() {
  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
  })

  const handleAnswer = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  const calculateRisk = () => {
    const scores = {
      q1: { 'A': 1, 'B': 3, 'C': 5 },
      q2: { 'A': 1, 'B': 3, 'C': 5 },
      q3: { 'A': 1, 'B': 3, 'C': 5 },
      q4: { 'A': 1, 'B': 3, 'C': 5 },
      q5: { 'A': 1, 'B': 3, 'C': 5 },
    }
    
    let total = 0
    Object.entries(answers).forEach(([key, value]) => {
      if (value && scores[key as keyof typeof scores]) {
        total += scores[key as keyof typeof scores][value as keyof typeof scores.q1] || 0
      }
    })
    
    const maxScore = 25
    const percentage = (total / maxScore) * 100
    
    let profile = ''
    let allocation = ''
    if (total <= 10) {
      profile = 'Conservative'
      allocation = '30% Stocks, 50% Bonds, 20% Cash'
    } else if (total <= 15) {
      profile = 'Moderate'
      allocation = '50% Stocks, 40% Bonds, 10% Cash'
    } else if (total <= 20) {
      profile = 'Moderately Aggressive'
      allocation = '70% Stocks, 25% Bonds, 5% Cash'
    } else {
      profile = 'Aggressive'
      allocation = '85% Stocks, 10% Bonds, 5% Cash'
    }
    
    return { total, percentage, profile, allocation }
  }

  const result = calculateRisk()

  const questions = [
    { key: 'q1', text: 'How would you react to a 20% drop in your portfolio?', options: ['A: Sell everything', 'B: Sell some', 'C: Buy more'] },
    { key: 'q2', text: 'What is your investment timeline?', options: ['A: Less than 5 years', 'B: 5-10 years', 'C: More than 10 years'] },
    { key: 'q3', text: 'How important is preserving capital vs growth?', options: ['A: Preserve capital', 'B: Balance both', 'C: Maximize growth'] },
    { key: 'q4', text: 'What is your income stability?', options: ['A: Variable/unstable', 'B: Stable', 'C: Growing'] },
    { key: 'q5', text: 'How experienced are you with investing?', options: ['A: Beginner', 'B: Intermediate', 'C: Expert'] },
  ]

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Risk Tolerance Calculator</h1>
      <p className="text-zinc-600">Assess your investment risk tolerance based on your situation.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Risk Assessment Questions</h3>
        <div className="space-y-4">
          {questions.map(q => (
            <div key={q.key} className="bg-white rounded p-3">
              <div className="text-sm font-medium mb-2">{q.text}</div>
              <div className="flex gap-2">
                {q.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(q.key, opt.charAt(0))}
                    className={`px-3 py-1 rounded text-xs border ${
                      answers[q.key as keyof typeof answers] === opt.charAt(0)
                        ? 'bg-blue-100 border-blue-500'
                        : 'bg-zinc-50 border-zinc-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Your Risk Profile</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Risk Score</div>
            <div className="text-2xl font-bold text-blue-600">{result.total}/25</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Risk Level</div>
            <div className="text-2xl font-bold text-purple-600">{result.percentage.toFixed(0)}%</div>
          </div>
          <div className="bg-white p-3 rounded col-span-2">
            <div className="text-zinc-500">Profile</div>
            <div className="text-xl font-bold text-green-600">{result.profile}</div>
            <div className="text-xs text-zinc-600 mt-2">{result.allocation}</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Risk Profile Tips</h3>
        <div className="text-xs text-zinc-600">
          Conservative: Focus on capital preservation. Moderate: Balance growth and safety. Aggressive: Maximize long-term growth. Risk tolerance may change with life events. Review annually. Match investments to risk profile.
        </div>
      </div>
    </main>
  )
}
