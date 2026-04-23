import type { Metadata } from 'next';
import { Suspense } from 'react';
import StopwatchCalculator from '@/components/StopwatchCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I use a stopwatch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Click Start to begin timing. Click Lap to record split times without stopping. Click Stop to pause. Click Reset to clear. The stopwatch tracks hours, minutes, seconds, and centiseconds. Useful for sports, workouts, and productivity tracking."
      }
    },
    {
      "@type": "Question",
      "name": "How do I set a countdown timer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enter minutes and seconds, or click preset buttons (1, 3, 5, 10, 15, 30 min). Click Start to begin countdown. Timer shows remaining time and progress bar. When it reaches zero, you'll see 'Time's Up!' message. Pause or Reset anytime."
      }
    },
    {
      "@type": "Question",
      "name": "What are lap times used for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lap times record split times during stopwatch tracking. Useful for running, swimming, racing - track each lap's time without stopping the overall timer. Shows lap time, total time, fastest lap (★ Best), and slowest lap for performance analysis."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate is this stopwatch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This stopwatch measures to centisecond precision (1/100 second). JavaScript timers are accurate enough for most purposes but may have slight drift over long periods. For professional timing, use dedicated hardware timing devices."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Pomodoro technique?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pomodoro technique uses 25-minute work intervals with 5-minute breaks. Set timer to 25 min for focused work, then 5 min for rest. After 4 pomodoros, take a longer 15-30 min break. Use this countdown timer for Pomodoro productivity."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Stopwatch & Timer - Free Online Stopwatch with Lap Timer and Countdown',
  description: 'Free online stopwatch with lap recording and countdown timer. Track sports, workouts, cooking, and productivity. Centisecond precision timing.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <StopwatchCalculator />
    </Suspense>
  );
}