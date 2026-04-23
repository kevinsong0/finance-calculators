'use client'

import { useState, useMemo } from 'react';

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const analysis = useMemo(() => {
    if (!password) return null;

    const length = password.length;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/~]/.test(password);
    const hasSequential = /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(password);
    const hasRepeated = /(.)\1{2,}/.test(password);
    const entropy = Math.log2(Math.pow(26, hasLower ? 1 : 0) + Math.pow(26, hasUpper ? 1 : 0) + Math.pow(10, hasNumber ? 1 : 0) + Math.pow(33, hasSpecial ? 1 : 0)) * length;

    let score = 0;
    const checks = [];

    if (length >= 8) { score += 1; checks.push({ pass: true, text: 'At least 8 characters' }); }
    else { checks.push({ pass: false, text: 'Minimum 8 characters required' }); }

    if (length >= 12) { score += 1; checks.push({ pass: true, text: '12+ characters (stronger)' }); }
    else if (length >= 8) { checks.push({ pass: false, text: 'Add 4 more characters for strength' }); }

    if (hasLower) { score += 1; checks.push({ pass: true, text: 'Lowercase letters' }); }
    else { checks.push({ pass: false, text: 'Add lowercase letters' }); }

    if (hasUpper) { score += 1; checks.push({ pass: true, text: 'Uppercase letters' }); }
    else { checks.push({ pass: false, text: 'Add uppercase letters' }); }

    if (hasNumber) { score += 1; checks.push({ pass: true, text: 'Numbers' }); }
    else { checks.push({ pass: false, text: 'Add numbers' }); }

    if (hasSpecial) { score += 1; checks.push({ pass: true, text: 'Special characters' }); }
    else { checks.push({ pass: false, text: 'Add special characters (!@#$%)' }); }

    if (!hasSequential && !hasRepeated) { score += 1; checks.push({ pass: true, text: 'No obvious patterns' }); }
    else { checks.push({ pass: false, text: 'Avoid patterns like "abc" or "111"' }); }

    const strength = score <= 2 ? 'Very Weak' : score <= 4 ? 'Weak' : score <= 5 ? 'Fair' : score <= 6 ? 'Good' : 'Strong';
    const crackTime = score <= 2 ? 'Instant' : score <= 4 ? 'Minutes' : score <= 5 ? 'Hours' : score <= 6 ? 'Days' : 'Years';
    const color = score <= 2 ? 'red' : score <= 4 ? 'orange' : score <= 5 ? 'yellow' : score <= 6 ? 'green' : 'blue';

    return {
      length,
      hasLower,
      hasUpper,
      hasNumber,
      hasSpecial,
      score,
      strength,
      crackTime,
      color,
      checks,
      entropy,
    };
  }, [password]);

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Password Strength Checker</h1>
      <p className="text-zinc-600">Check password strength and get improvement suggestions. Analyze length, character types, patterns, and estimate crack time.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Password</label>
          <div className="flex gap-2">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="flex-1"
              placeholder="Enter password to check..."
            />
            <button onClick={() => setShowPassword(!showPassword)} className="px-4 py-2 bg-zinc-100 rounded hover:bg-zinc-200">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
      </div>

      {analysis && (
        <div className="card bg-blue-50 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Strength Analysis</h3>
            <div className={`px-3 py-1 rounded text-sm font-medium ${
              analysis.color === 'red' ? 'bg-red-100 text-red-700' :
              analysis.color === 'orange' ? 'bg-orange-100 text-orange-700' :
              analysis.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
              analysis.color === 'green' ? 'bg-green-100 text-green-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {analysis.strength}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-full h-4 mb-4">
            <div
              className={`h-4 rounded-full transition-all ${
                analysis.color === 'red' ? 'bg-red-500' :
                analysis.color === 'orange' ? 'bg-orange-500' :
                analysis.color === 'yellow' ? 'bg-yellow-500' :
                analysis.color === 'green' ? 'bg-green-500' :
                'bg-blue-500'
              }`}
              style={{ width: `${(analysis.score / 8) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded p-3">
              <div className="text-zinc-500">Length</div>
              <div className="font-bold">{analysis.length} characters</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-zinc-500">Estimated Crack Time</div>
              <div className="font-bold">{analysis.crackTime}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-zinc-500">Entropy</div>
              <div className="font-bold">{analysis.entropy.toFixed(1)} bits</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-zinc-500">Score</div>
              <div className="font-bold">{analysis.score}/8</div>
            </div>
          </div>
        </div>
      )}

      {analysis && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">Security Checks</h3>
          <div className="space-y-1">
            {analysis.checks.map((check, i) => (
              <div key={i} className={`flex items-center gap-2 p-2 rounded ${check.pass ? 'bg-green-50' : 'bg-red-50'}`}>
                <span className={check.pass ? 'text-green-600' : 'text-red-600'}>
                  {check.pass ? '✓' : '✗'}
                </span>
                <span className="text-sm">{check.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Password Best Practices</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">Length Rules</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-blue-600">8+</span> Minimum acceptable</div>
              <div><span className="text-green-600">12+</span> Good security</div>
              <div><span className="text-purple-600">16+</span> Strong security</div>
              <div><span className="text-orange-600">20+</span> Very strong</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Character Types</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-blue-600">a-z</span> Lowercase letters</div>
              <div><span className="text-blue-600">A-Z</span> Uppercase letters</div>
              <div><span className="text-blue-600">0-9</span> Numbers</div>
              <div><span className="text-blue-600">!@#$</span> Special chars</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Avoid These</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-red-600">123, abc</span> Sequences</div>
              <div><span className="text-red-600">aaa, 111</span> Repeats</div>
              <div><span className="text-red-600">password</span> Common words</div>
              <div><span className="text-red-600">birthday</span> Personal info</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Security Tips</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">Use:</span> Password manager</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">Enable:</span> Two-factor auth</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">Never:</span> Share passwords</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">Unique:</span> Per account</div>
          <div className="bg-white rounded p-2"><span className="text-pink-600 font-medium">Change:</span> If compromised</div>
          <div className="bg-white rounded p-2"><span className="text-teal-600 font-medium">Check:</span> HaveIBeenPwned</div>
          <div className="bg-white rounded p-2"><span className="text-indigo-600 font-medium">Avoid:</span> Public WiFi login</div>
          <div className="bg-white rounded p-2"><span className="text-red-600 font-medium">Monitor:</span> Account activity</div>
        </div>
      </div>
    </main>
  );
}