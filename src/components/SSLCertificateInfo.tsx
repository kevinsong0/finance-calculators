'use client'

export default function SSLCertificateInfo() {
  const certTypes = [
    { type: 'DV', name: 'Domain Validation', desc: 'Basic, fast issuance', use: 'Blogs, small sites', time: 'Minutes', cost: '$0-50/year' },
    { type: 'OV', name: 'Organization Validation', desc: 'Business identity verified', use: 'Business sites', time: '1-3 days', cost: '$50-200/year' },
    { type: 'EV', name: 'Extended Validation', desc: 'Highest trust, green bar', use: 'Banks, ecommerce', time: '1-2 weeks', cost: '$150-500/year' },
  ];

  const providers = [
    { name: 'Let\'s Encrypt', desc: 'Free, automated, open', type: 'DV' },
    { name: 'Cloudflare', desc: 'Free SSL with CDN', type: 'DV/OV' },
    { name: 'DigiCert', desc: 'Enterprise, fast', type: 'OV/EV' },
    { name: 'Sectigo', desc: 'Budget-friendly', type: 'DV/OV' },
    { name: 'GlobalSign', desc: 'Enterprise solution', type: 'OV/EV' },
  ];

  const commonIssues = [
    { issue: 'Expired certificate', fix: 'Renew certificate, auto-renew' },
    { issue: 'Mixed content', fix: 'Load all resources over HTTPS' },
    { issue: 'Wrong hostname', fix: 'Add domain to certificate' },
    { issue: 'Untrusted root', fix: 'Use trusted CA' },
    { issue: 'Self-signed cert', fix: 'Use public CA or trust locally' },
    { issue: 'Weak cipher', fix: 'Enable modern ciphers only' },
  ];

  const bestPractices = [
    'Use TLS 1.2+ minimum',
    'Enable HSTS header',
    'Auto-renew certificates',
    'Use strong cipher suites',
    'Implement OCSP stapling',
    'Monitor expiration dates',
    'Use wildcard for subdomains',
    'Redirect HTTP to HTTPS',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">SSL Certificate Information</h1>
      <p className="text-zinc-600">SSL/TLS certificate guide. Certificate types, providers, common issues, best practices. Secure your website with HTTPS.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Certificate Types</h3>
        <div className="space-y-1 text-xs">
          {certTypes.map((c) => (
            <div key={c.type} className="bg-white rounded p-2">
              <strong className="font-mono">{c.type}</strong> - {c.name}: {c.desc}
              <div className="text-zinc-500 mt-1">Use: {c.use} | Time: {c.time} | Cost: {c.cost}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Certificate Providers</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {providers.map((p) => (
            <div key={p.name} className="bg-white rounded p-2">
              <strong>{p.name}</strong>: {p.desc} ({p.type})
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common SSL Issues & Fixes</h3>
        <div className="space-y-1 text-xs">
          {commonIssues.map((c) => (
            <div key={c.issue} className="bg-red-50 rounded p-2">
              <strong>{c.issue}</strong>: {c.fix}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">SSL Check Commands</h3>
        <div className="text-xs font-mono bg-white rounded p-2">
          openssl s_client -connect example.com:443<br/>
          curl -vI https://example.com<br/>
          nmap --script ssl-cert example.com
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Browser Warnings</h3>
        <div className="text-xs text-zinc-600">
          Chrome: Not secure in address bar. Firefox: Warning icon. Safari: Gray lock. Users avoid sites with warnings. SSL required for: AdSense, payment processing, app stores, SEO ranking. Google prioritizes HTTPS sites.
        </div>
      </div>
    </main>
  );
}