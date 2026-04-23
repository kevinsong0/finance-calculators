'use client'

import { useState } from 'react'

export default function CostOfLivingCalculator() {
  const [currentCity, setCurrentCity] = useState('')
  const [currentSalary, setCurrentSalary] = useState('')
  const [newCity, setNewCity] = useState('')
  
  const cityIndices = {
    'New York': 187.2,
    'San Francisco': 179.6,
    'Los Angeles': 166.4,
    'Chicago': 107.3,
    'Boston': 142.2,
    'Seattle': 148.3,
    'Austin': 102.5,
    'Denver': 105.7,
    'Miami': 123.4,
    'Phoenix': 98.2,
    'Houston': 96.5,
    'Atlanta': 101.6,
    'Dallas': 102.4,
    'Portland': 130.4,
    'San Diego': 160.1,
  }

  const calculate = () => {
    const salary = parseFloat(currentSalary) || 0
    const currentIndex = cityIndices[currentCity as keyof typeof cityIndices] || 100
    const newIndex = cityIndices[newCity as keyof typeof cityIndices] || 100
    
    const equivalentSalary = salary * newIndex / currentIndex
    const difference = equivalentSalary - salary
    const percentChange = ((newIndex - currentIndex) / currentIndex) * 100

    return { equivalentSalary, difference, percentChange, currentIndex, newIndex }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Cost of Living Calculator</h1>
      <p className="text-zinc-600">Calculate salary needed to maintain lifestyle in a different city.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">City Comparison</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current City</label>
            <select
              value={currentCity}
              onChange={(e) => setCurrentCity(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select current city</option>
              {Object.keys(cityIndices).map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Salary ($)</label>
            <input
              type="number"
              value={currentSalary}
              onChange={(e) => setCurrentSalary(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Your current salary"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">New City</label>
            <select
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select new city</option>
              {Object.keys(cityIndices).map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Comparison Results</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Current City Index</div>
            <div className="text-xl font-bold text-blue-600">{result.currentIndex.toFixed(1)}</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">New City Index</div>
            <div className="text-xl font-bold text-purple-600">{result.newIndex.toFixed(1)}</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Equivalent Salary</div>
            <div className="text-2xl font-bold text-green-600">${result.equivalentSalary.toFixed(0)}</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Change</div>
            <div className={`text-xl font-bold ${result.percentChange >= 0 ? 'text-red-600' : 'text-green-600'}`}>
              {result.percentChange >= 0 ? '+' : ''}{result.percentChange.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cost of Living Factors</h3>
        <div className="text-xs text-zinc-600">
          Index includes: housing (30-40%), groceries, transportation, healthcare, utilities. National average = 100. Cities above 100 cost more than average. Housing dominates cost differences. Consider salary vs expenses ratio when relocating. Remote work enables living in lower-cost areas.
        </div>
      </div>
    </main>
  )
}
