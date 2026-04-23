import type { Metadata } from 'next';
import { Suspense } from 'react';
import LinuxCheatSheet from '@/components/LinuxCheatSheet';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I list files in Linux?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "List files: ls. List with details: ls -l. List including hidden files: ls -la. List by size: ls -lS. List by time: ls -lt. Human-readable sizes: ls -lh. Combine flags: ls -lah. List specific directory: ls /path/to/dir. Linux ls command shows permissions, owner, size, modification time."
      }
    },
    {
      "@type": "Question",
      "name": "How do I search for text in files in Linux?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Search in file: grep 'pattern' filename. Search recursively: grep -r 'pattern' directory. Case insensitive: grep -i 'pattern'. Show line numbers: grep -n 'pattern'. Count matches: grep -c 'pattern'. Match whole word: grep -w 'pattern'. Use regex: grep -E 'regex'. Find files and search: find . -name '*.txt' -exec grep 'pattern' {} +."
      }
    },
    {
      "@type": "Question",
      "name": "How do I manage processes in Linux?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "List processes: ps. List all processes: ps aux. Find process by name: ps aux | grep 'name'. Show running processes interactively: top or htop. Kill process: kill PID. Force kill: kill -9 PID. Kill by name: pkill processname. Background process: command &. Foreground: fg. List background jobs: jobs."
      }
    },
    {
      "@type": "Question",
      "name": "How do Linux file permissions work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Linux permissions: read (r=4), write (w=2), execute (x=1). Three groups: owner, group, others. Example: chmod 755 file (owner rwx, group rx, others rx). Change permissions: chmod 755 file. Change ownership: chown user:group file. Recursive: chmod -R 755 directory. View permissions: ls -l shows rwxrwxrwx format."
      }
    },
    {
      "@type": "Question",
      "name": "How do I connect to a remote server in Linux?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SSH connection: ssh user@hostname or ssh user@ip-address. Specify port: ssh -p 2222 user@host. Copy file to remote: scp file user@host:/path. Copy from remote: scp user@host:/path/file local/. Copy directory: scp -r directory user@host:/path. SSH key authentication: ssh-keygen, ssh-copy-id user@host. SSH config file: ~/.ssh/config for shortcuts."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Linux Command Cheat Sheet - Essential Linux Commands Reference',
  description: 'Complete Linux command reference. File operations, search, process management, system info, networking, permissions, and archiving. Essential commands for Linux administration.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LinuxCheatSheet />
    </Suspense>
  );
}