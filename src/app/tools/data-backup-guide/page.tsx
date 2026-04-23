import type { Metadata } from 'next';
import { Suspense } from 'react';
import DataBackupGuide from '@/components/DataBackupGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the 3-2-1 backup rule?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "3-2-1 backup rule explained: 3 copies: Maintain at least three copies of your data (original plus two backups), protects against hardware failure, corruption, deletion. 2 media types: Store backups on at least two different media types (disk, tape, cloud), protects against media-specific failures. 1 offsite: Keep at least one backup copy offsite (different location, cloud), protects against local disasters (fire, flood, theft). Example: Original data on server, backup on local NAS, backup in cloud storage. Implementation: Choose reliable storage, automate backups, verify integrity, encrypt offsite copies. 3-2-1 = comprehensive protection. Three copies. Two media types. One offsite. Protect against various failure scenarios. Verify backups work."
      }
    },
    {
      "@type": "Question",
      "name": "What backup types exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Backup types comparison: Full backup: Complete copy of all data, most thorough, longest time, largest storage, easiest restore, typically weekly/monthly. Incremental backup: Copy of changes since last backup (any type), fastest backup, smallest storage, slower restore (needs chain), typically daily. Differential backup: Copy of changes since last full backup, medium backup time, medium storage, faster restore than incremental, typically daily. Mirror backup: Real-time copy of changes, continuous protection, larger storage, fastest recovery, high resource usage. Choice factors: Data volume, backup window, restore speed needs, storage costs, complexity tolerance. Types = match to needs. Full for thorough. Incremental for efficiency. Differential for balance. Mirror for real-time. Consider restore time."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I backup data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Backup frequency guidelines: Critical data: Continuous or daily backup, minimal data loss acceptable, real-time or near real-time replication, business-critical systems. Important data: Daily backup, hours of data loss acceptable, most business data falls here, automated daily schedule. Less critical: Weekly backup, days of data loss acceptable, archived data, reference materials. Factors: RPO (Recovery Point Objective) - how much data loss acceptable, change rate - how much changes daily, business impact - cost of data loss, technical capability - what&apos;s feasible. Schedule: Full backup weekly/monthly, incremental/differential daily, critical systems continuous. Frequency = based on RPO and impact. Critical = daily/continuous. Important = daily. Less critical = weekly. Automate schedule. Monitor success."
      }
    },
    {
      "@type": "Question",
      "name": "How do I verify backups work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Backup verification practices: Restore testing: Periodically restore from backup, test full restore process, verify all data recoverable, measure restore time. Data integrity: Check backup files not corrupted, verify checksums if available, test file accessibility, compare to source. Completeness: Verify all expected data backed up, check backup logs for errors, confirm no missing files, validate against checklist. Timing: Test restore regularly (monthly minimum), after backup system changes, before major system changes, after any backup errors. Documentation: Record test results, document restore time, note any issues found, update procedures based on findings. Verification = test restore actually works. Don&apos;t assume backup means recovery. Test full process. Document results. Update procedures. Regular testing essential."
      }
    },
    {
      "@type": "Question",
      "name": "What should I backup?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Data backup priorities: Business-critical: Customer databases, transaction records, financial data, intellectual property, active project files - highest priority. User data: Documents, emails, work files, user-generated content, application data - high priority. System data: Configuration files, application settings, system state, server configurations - medium priority. Development: Source code, build artifacts, development environments, documentation - high priority if active. Historical: Archived data, old records, reference materials - lower priority. Exceptions: Temporary files, cache data, logs (unless needed), easily recreated data - lower priority. What to backup = prioritize by value. Critical first. User data essential. Systems needed for recovery. Code must backup. Archive selectively. Don&apos;t backup unnecessary data."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Data Backup Guide - Types, Strategies & Verification',
  description: 'Backup types, 3-2-1 rule, frequency, verification, and planning.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DataBackupGuide />
    </Suspense>
  );
}