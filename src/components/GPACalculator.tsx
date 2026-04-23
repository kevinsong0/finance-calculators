'use client'

import { useState, useMemo } from 'react';

interface Course {
  id: number;
  name: string;
  credits: number;
  grade: string;
}

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: 'Course 1', credits: 3, grade: 'A' },
    { id: 2, name: 'Course 2', credits: 3, grade: 'B' },
  ]);
  const [scale, setScale] = useState('4.0');
  const [includeWeighted, setIncludeWeighted] = useState(false);

  const gradePoints: Record<string, Record<string, number>> = {
    '4.0': { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0 },
    '5.0': { 'A+': 5.0, 'A': 5.0, 'A-': 4.7, 'B+': 4.3, 'B': 4.0, 'B-': 3.7, 'C+': 3.3, 'C': 3.0, 'C-': 2.7, 'D+': 2.3, 'D': 2.0, 'F': 0 },
    'weighted': { 'A+': 5.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0 },
  };

  const addCourse = () => {
    setCourses([...courses, { id: courses.length + 1, name: `Course ${courses.length + 1}`, credits: 3, grade: 'A' }]);
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (id: number, field: keyof Course, value: string | number) => {
    setCourses(courses.map((c) => c.id === id ? { ...c, [field]: value } : c));
  };

  const calculation = useMemo(() => {
    const points = gradePoints[scale] || gradePoints['4.0'];
    let totalCredits = 0;
    let totalPoints = 0;
    const courseDetails = courses.map((course) => {
      const gradePoint = points[course.grade] || 0;
      const weightedCredits = includeWeighted && course.credits > 3 ? course.credits * 1.5 : course.credits;
      const contribution = gradePoint * weightedCredits;
      totalCredits += weightedCredits;
      totalPoints += contribution;
      return {
        ...course,
        gradePoint,
        contribution,
      };
    });

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

    return {
      gpa,
      totalCredits,
      totalPoints,
      courseDetails,
      letterGrade: getLetterGrade(gpa, scale),
      classification: getClassification(gpa),
    };
  }, [courses, scale, includeWeighted]);

  function getLetterGrade(gpa: number, scale: string): string {
    const max = scale === '5.0' ? 5 : 4;
    if (gpa >= max) return 'A+';
    if (gpa >= max - 0.3) return 'A';
    if (gpa >= max - 0.7) return 'A-';
    if (gpa >= max - 1.0) return 'B+';
    if (gpa >= max - 1.3) return 'B';
    if (gpa >= max - 1.7) return 'B-';
    if (gpa >= max - 2.0) return 'C+';
    if (gpa >= max - 2.3) return 'C';
    if (gpa >= max - 2.7) return 'C-';
    if (gpa >= max - 3.0) return 'D+';
    if (gpa >= max - 3.3) return 'D';
    return 'F';
  }

  function getClassification(gpa: number): string {
    if (gpa >= 3.9) return 'Summa Cum Laude';
    if (gpa >= 3.7) return 'Magna Cum Laude';
    if (gpa >= 3.5) return 'Cum Laude';
    if (gpa >= 3.0) return 'Good Standing';
    if (gpa >= 2.0) return 'Satisfactory';
    return 'Probation';
  }

  const gradeOptions = Object.keys(gradePoints['4.0']);

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">GPA Calculator</h1>
      <p className="text-zinc-600">Calculate your Grade Point Average. Track academic performance and estimate graduation honors.</p>

      <div className="card space-y-4">
        {/* Scale Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">GPA Scale</label>
            <select value={scale} onChange={(e) => setScale(e.target.value)} className="w-full">
              <option value="4.0">4.0 Scale (Standard)</option>
              <option value="5.0">5.0 Scale (Weighted/AP)</option>
              <option value="weighted">Weighted (AP/IB get +1)</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeWeighted}
                onChange={(e) => setIncludeWeighted(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Weight credits (Honors/AP × 1.5)</span>
            </label>
          </div>
        </div>

        {/* Course List */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Courses</label>
          <div className="space-y-2">
            {courses.map((course) => (
              <div key={course.id} className="grid grid-cols-12 gap-2 items-center bg-zinc-50 rounded p-2">
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                  className="col-span-4 text-sm"
                  placeholder="Course name"
                />
                <select
                  value={course.credits}
                  onChange={(e) => updateCourse(course.id, 'credits', Number(e.target.value))}
                  className="col-span-2"
                >
                  {[1, 2, 3, 4, 5, 6].map((c) => (
                    <option key={c} value={c}>{c} cr</option>
                  ))}
                </select>
                <select
                  value={course.grade}
                  onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                  className="col-span-3"
                >
                  {gradeOptions.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                <div className="col-span-2 text-sm text-zinc-600 text-right">
                  {gradePoints[scale]?.[course.grade] || 0} pts
                </div>
                <button
                  onClick={() => removeCourse(course.id)}
                  className="col-span-1 text-red-500 hover:text-red-700 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button onClick={addCourse} className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            + Add Course
          </button>
        </div>
      </div>

      {/* GPA Result */}
      <div className="card bg-blue-50 text-center p-6">
        <div className="text-sm text-zinc-500 mb-2">Your GPA</div>
        <div className="text-4xl font-bold text-blue-600">{calculation.gpa.toFixed(2)}</div>
        <div className="text-sm text-zinc-600 mt-2">
          {calculation.letterGrade} • {calculation.classification}
        </div>
      </div>

      {/* Summary */}
      <div className="card">
        <h3 className="font-medium mb-3">Summary</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="bg-zinc-50 rounded p-4 text-center">
            <div className="text-zinc-500">Total Credits</div>
            <div className="font-bold">{calculation.totalCredits}</div>
          </div>
          <div className="bg-zinc-50 rounded p-4 text-center">
            <div className="text-zinc-500">Total Points</div>
            <div className="font-bold">{calculation.totalPoints.toFixed(2)}</div>
          </div>
          <div className="bg-zinc-50 rounded p-4 text-center">
            <div className="text-zinc-500">Courses</div>
            <div className="font-bold">{courses.length}</div>
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="card">
        <h3 className="font-medium mb-3">Course Contribution</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Course</th>
                <th className="text-center py-2">Credits</th>
                <th className="text-center py-2">Grade</th>
                <th className="text-center py-2">Points</th>
                <th className="text-right py-2">Contribution</th>
              </tr>
            </thead>
            <tbody>
              {calculation.courseDetails.map((course) => (
                <tr key={course.id} className="border-b border-zinc-100">
                  <td className="py-2">{course.name}</td>
                  <td className="text-center py-2">{course.credits}</td>
                  <td className="text-center py-2">{course.grade}</td>
                  <td className="text-center py-2">{course.gradePoint}</td>
                  <td className="text-right py-2">{course.contribution.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* GPA Scale Reference */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">GPA Scale Reference</h3>
        <div className="grid grid-cols-6 gap-2 text-xs">
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">A/A+</div>
            <div className="text-zinc-600">4.0 (5.0 weighted)</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">A-</div>
            <div className="text-zinc-600">3.7</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">B+</div>
            <div className="text-zinc-600">3.3</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">B</div>
            <div className="text-zinc-600">3.0</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">C</div>
            <div className="text-zinc-600">2.0</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">F</div>
            <div className="text-zinc-600">0.0</div>
          </div>
        </div>
      </div>

      {/* Honors Requirements */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Graduation Honors Requirements</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-yellow-50 rounded p-2 text-center">
            <div className="font-medium text-yellow-600">Summa Cum Laude</div>
            <div className="text-zinc-600">≥ 3.9 GPA</div>
          </div>
          <div className="bg-silver rounded p-2 text-center">
            <div className="font-medium text-gray-600">Magna Cum Laude</div>
            <div className="text-zinc-600">≥ 3.7 GPA</div>
          </div>
          <div className="bg-bronze rounded p-2 text-center">
            <div className="font-medium text-orange-600">Cum Laude</div>
            <div className="text-zinc-600">≥ 3.5 GPA</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium text-green-600">Good Standing</div>
            <div className="text-zinc-600">≥ 3.0 GPA</div>
          </div>
        </div>
      </div>
    </main>
  );
}