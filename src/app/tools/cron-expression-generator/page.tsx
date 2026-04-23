import type { Metadata } from 'next';
import { Suspense } from 'react';
import CronExpressionGenerator from '@/components/CronExpressionGenerator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a cron expression?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cron expression is a string that defines when a scheduled job runs. Format: 5 fields separated by spaces - minute hour day-of-month month day-of-week. Each field specifies allowed values (0-59 for minutes, 0-23 for hours, etc.). Special characters like * (any), / (step), - (range) provide flexibility."
      }
    },
    {
      "@type": "Question",
      "name": "How do I schedule a cron job to run every hour?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cron expression for every hour: 0 * * * * (at minute 0 of every hour). Or use shorthand: @hourly. For every 6 hours: 0 */6 * * *. For specific hours like 9am and 5pm: 0 9,17 * * *. The first field (minute) determines when within the hour; 0 = start of hour."
      }
    },
    {
      "@type": "Question",
      "name": "How do I schedule a cron job for weekdays only?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Weekdays cron (Monday through Friday): * * * * 1-5. Common pattern for business hours: 0 9-17 * * 1-5 (every hour from 9am-5pm on weekdays). Day of week: 0=Sunday, 1=Monday, ..., 5=Friday, 6=Saturday, 7=Sunday (alternative). Use 1-5 for weekdays, 0,6 for weekends."
      }
    },
    {
      "@type": "Question",
      "name": "What does */5 mean in cron?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "*/5 means 'every 5 units' in that field. */5 * * * * = every 5 minutes (at 0, 5, 10, 15...). */10 in hour field = every 10 hours. */15 in minute field = every 15 minutes. The / character defines step values - execute at regular intervals starting from the first value in range."
      }
    },
    {
      "@type": "Question",
      "name": "Where are cron jobs used?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cron jobs used in: Linux/Unix (crontab), Kubernetes (CronJob), AWS (EventBridge Rules), GCP (Cloud Scheduler), Azure (Time-based triggers), Jenkins (build schedules), CI/CD pipelines, backup systems, log rotation, email newsletters, database cleanup, report generation, monitoring checks."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Cron Expression Generator - Visual Cron Job Builder',
  description: 'Free cron expression generator for scheduling jobs. Visual builder for Linux crontab, Kubernetes CronJob, AWS EventBridge, GCP Cloud Scheduler. DevOps scheduling tool.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CronExpressionGenerator />
    </Suspense>
  );
}