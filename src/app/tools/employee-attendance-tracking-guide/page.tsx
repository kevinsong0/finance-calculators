import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeAttendanceTrackingGuide from '@/components/EmployeeAttendanceTrackingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What methods are used for attendance tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tracking methods include time clocks (physical recording, reliable data), mobile apps (GPS-enabled, remote tracking), badge systems (swipe cards, secure access), biometric systems (fingerprint or face, fraud prevention), web-based systems (online login, flexible entry), and manual logs (paper records, backup option)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the attendance tracking process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The process involves setting attendance policy, choosing tracking method, configuring the system, training employees, collecting time data, reviewing records, addressing discrepancies, calculating hours, generating reports, and integrating with payroll."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics should be tracked for attendance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key metrics include attendance rate, absence frequency, tardiness incidents, early departures, overtime hours, leave utilization, pattern analysis, and cost impact calculations."
      }
    },
    {
      "@type": "Question",
      "name": "What common issues arise in attendance tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common issues include clocking errors (system glitches requiring regular maintenance), forgot to clock (employee oversight requiring reminder alerts), buddy punching (fraud attempts requiring biometric systems), and data gaps (system downtime requiring backup procedures)."
      }
    },
    {
      "@type": "Question",
      "name": "How often should attendance records be reviewed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Attendance records should be reviewed daily for immediate discrepancies, weekly for pattern analysis, monthly for trend reporting, and quarterly for policy adjustments. Regular review ensures accurate payroll and identifies attendance issues early."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Attendance Tracking Guide - Methods, Process & Metrics',
  description: 'Tracking methods, process, key metrics, and common issues.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <EmployeeAttendanceTrackingGuide />
    </Suspense>
  );
}