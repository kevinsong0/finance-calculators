'use client'

import { useState, useEffect, useRef } from 'react';

export default function StopwatchCalculator() {
  const [mode, setMode] = useState('stopwatch');
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [targetMinutes, setTargetMinutes] = useState(5);
  const [targetSeconds, setTargetSeconds] = useState(0);
  const [countdownTime, setCountdownTime] = useState(300);
  const [countdownRunning, setCountdownRunning] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    if (countdownRunning && countdownTime > 0) {
      intervalRef.current = setInterval(() => {
        setCountdownTime((prev) => Math.max(prev - 10, 0));
      }, 10);
    } else if (countdownTime === 0) {
      setCountdownRunning(false);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [countdownRunning, countdownTime]);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const addLap = () => {
    setLaps([...laps, time]);
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const startCountdown = () => {
    const totalMs = targetMinutes * 60000 + targetSeconds * 1000;
    setCountdownTime(totalMs);
    setCountdownRunning(true);
  };

  const resetCountdown = () => {
    setCountdownRunning(false);
    const totalMs = targetMinutes * 60000 + targetSeconds * 1000;
    setCountdownTime(totalMs);
  };

  const presetTimers = [
    { label: '1 min', minutes: 1, seconds: 0 },
    { label: '3 min', minutes: 3, seconds: 0 },
    { label: '5 min', minutes: 5, seconds: 0 },
    { label: '10 min', minutes: 10, seconds: 0 },
    { label: '15 min', minutes: 15, seconds: 0 },
    { label: '30 min', minutes: 30, seconds: 0 },
  ];

  const lapTimes = laps.map((lap, index) => {
    const previousLap = index > 0 ? laps[index - 1] : 0;
    return {
      lapNumber: index + 1,
      lapTime: lap - previousLap,
      totalTime: lap,
    };
  });

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Stopwatch & Timer</h1>
      <p className="text-zinc-600">Track time with precision stopwatch or countdown timer. Record laps and set custom durations.</p>

      {/* Mode Selection */}
      <div className="card">
        <div className="flex gap-2">
          <button
            onClick={() => setMode('stopwatch')}
            className={`px-6 py-3 rounded-lg ${mode === 'stopwatch' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
          >
            Stopwatch
          </button>
          <button
            onClick={() => setMode('timer')}
            className={`px-6 py-3 rounded-lg ${mode === 'timer' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
          >
            Countdown Timer
          </button>
        </div>
      </div>

      {/* Stopwatch Mode */}
      {mode === 'stopwatch' && (
        <>
          <div className="card bg-zinc-900 text-white text-center p-8">
            <div className="text-5xl font-bold font-mono">{formatTime(time)}</div>
            <div className="text-sm text-zinc-400 mt-2">
              {Math.floor(time / 3600000)} hours, {Math.floor((time % 3600000) / 60000)} minutes
            </div>
          </div>

          <div className="card flex justify-center gap-4">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-8 py-3 rounded-lg font-medium ${isRunning ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
            >
              {isRunning ? 'Stop' : 'Start'}
            </button>
            {isRunning && (
              <button onClick={addLap} className="px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium">
                Lap
              </button>
            )}
            <button onClick={resetStopwatch} className="px-8 py-3 rounded-lg bg-zinc-500 hover:bg-zinc-600 text-white font-medium">
              Reset
            </button>
          </div>

          {/* Lap Times */}
          {lapTimes.length > 0 && (
            <div className="card">
              <h3 className="font-medium mb-3">Lap Times</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Lap</th>
                      <th className="text-right py-2">Lap Time</th>
                      <th className="text-right py-2">Total Time</th>
                      <th className="text-right py-2">Diff</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lapTimes.map((lap, index) => {
                      const bestLap = Math.min(...lapTimes.map((l) => l.lapTime));
                      const worstLap = Math.max(...lapTimes.map((l) => l.lapTime));
                      const isBest = lap.lapTime === bestLap && lapTimes.length > 1;
                      const isWorst = lap.lapTime === worstLap && lapTimes.length > 1;
                      return (
                        <tr key={index} className={`border-b border-zinc-100 ${isBest ? 'bg-green-50' : isWorst ? 'bg-red-50' : ''}`}>
                          <td className="py-2">
                            #{lap.lapNumber}
                            {isBest && <span className="text-green-600 ml-2">★ Best</span>}
                            {isWorst && <span className="text-red-600 ml-2">Slow</span>}
                          </td>
                          <td className="text-right font-mono">{formatTime(lap.lapTime)}</td>
                          <td className="text-right font-mono">{formatTime(lap.totalTime)}</td>
                          <td className="text-right text-zinc-600">
                            {index > 0 ? `+${formatTime(lap.lapTime - lapTimes[index - 1].lapTime)}` : '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 text-sm">
                <div className="bg-zinc-50 rounded p-2 text-center">
                  <div className="text-zinc-500">Best Lap</div>
                  <div className="font-bold">{formatTime(Math.min(...lapTimes.map((l) => l.lapTime)))}</div>
                </div>
                <div className="bg-zinc-50 rounded p-2 text-center">
                  <div className="text-zinc-500">Average</div>
                  <div className="font-bold">{formatTime(laps[laps.length - 1] / laps.length)}</div>
                </div>
                <div className="bg-zinc-50 rounded p-2 text-center">
                  <div className="text-zinc-500">Total Laps</div>
                  <div className="font-bold">{laps.length}</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Timer Mode */}
      {mode === 'timer' && (
        <>
          <div className="card">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Minutes</label>
                <input
                  type="number"
                  value={targetMinutes}
                  onChange={(e) => setTargetMinutes(Number(e.target.value))}
                  className="w-full"
                  min="0"
                  max="120"
                  disabled={countdownRunning}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Seconds</label>
                <input
                  type="number"
                  value={targetSeconds}
                  onChange={(e) => setTargetSeconds(Number(e.target.value))}
                  className="w-full"
                  min="0"
                  max="59"
                  disabled={countdownRunning}
                />
              </div>
            </div>
            <div className="flex gap-2">
              {presetTimers.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setTargetMinutes(preset.minutes);
                    setTargetSeconds(preset.seconds);
                    setCountdownTime(preset.minutes * 60000 + preset.seconds * 1000);
                  }}
                  className="px-3 py-2 text-sm bg-zinc-100 rounded hover:bg-zinc-200"
                  disabled={countdownRunning}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className={`card text-center p-8 ${countdownTime === 0 ? 'bg-red-100' : countdownRunning ? 'bg-blue-50' : 'bg-zinc-50'}`}>
            <div className={`text-5xl font-bold font-mono ${countdownTime === 0 ? 'text-red-600' : countdownRunning ? 'text-blue-600' : 'text-zinc-800'}`}>
              {formatTime(countdownTime)}
            </div>
            <div className="text-sm text-zinc-600 mt-2">
              {countdownTime === 0 ? 'Timer Complete!' : countdownRunning ? 'Running...' : 'Ready to start'}
            </div>
            {countdownRunning && (
              <div className="mt-4">
                <div className="h-4 bg-zinc-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${((targetMinutes * 60000 + targetSeconds * 1000 - countdownTime) / (targetMinutes * 60000 + targetSeconds * 1000)) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="card flex justify-center gap-4">
            {!countdownRunning && countdownTime > 0 && (
              <button onClick={() => setCountdownRunning(true)} className="px-8 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium">
                Start
              </button>
            )}
            {countdownRunning && (
              <button onClick={() => setCountdownRunning(false)} className="px-8 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium">
                Pause
              </button>
            )}
            <button onClick={resetCountdown} className="px-8 py-3 rounded-lg bg-zinc-500 hover:bg-zinc-600 text-white font-medium">
              Reset
            </button>
          </div>

          {countdownTime === 0 && (
            <div className="card bg-red-50 text-center">
              <div className="text-2xl font-bold text-red-600">Time&apos;s Up!</div>
              <div className="text-sm text-zinc-600 mt-2">Your countdown timer has finished.</div>
            </div>
          )}
        </>
      )}

      {/* Use Cases */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Uses</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">Sports:</span> Track lap times, sprint intervals
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">Work:</span> Pomodoro timer, meeting reminders
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">Cooking:</span> Recipe timing, baking timer
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">Exercise:</span> HIIT intervals, rest periods
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-pink-600 font-medium">Study:</span> Focus sessions, break timer
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-teal-600 font-medium">Games:</span> Turn timer, speed rounds
          </div>
        </div>
      </div>
    </main>
  );
}