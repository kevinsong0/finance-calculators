'use client'

import { useState } from 'react';

export default function PrivacyPolicyGenerator() {
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [dataTypes, setDataTypes] = useState<string[]>([]);
  const [output, setOutput] = useState('');

  const dataOptions = [
    'Name and email',
    'Billing address',
    'Payment information',
    'IP address',
    'Browser cookies',
    'Usage data',
    'Location data',
    'Device information',
  ];

  const toggleData = (item: string) => {
    if (dataTypes.includes(item)) {
      setDataTypes(dataTypes.filter(d => d !== item));
    } else {
      setDataTypes([...dataTypes, item]);
    }
  };

  const generatePolicy = () => {
    const policy = `
# Privacy Policy for ${company || 'Your Company'}

**Effective Date:** ${new Date().toLocaleDateString()}
**Contact:** ${email || 'privacy@example.com'}

## 1. Information We Collect

We collect the following types of information:
${dataTypes.map(d => `- ${d}`).join('\n')}

## 2. How We Use Your Information

We use collected information for:
- Providing our services
- Processing payments
- Communicating with you
- Improving our services
- Legal compliance

## 3. Data Storage and Security

We implement industry-standard security measures to protect your data. Data is stored on secure servers with encryption.

## 4. Cookies and Tracking

We use cookies for:
- Session management
- User preferences
- Analytics
You can disable cookies in your browser settings.

## 5. Third-Party Services

We may share data with:
- Payment processors
- Analytics providers
- Cloud hosting providers
All third parties adhere to privacy standards.

## 6. Your Rights

You have the right to:
- Access your data
- Correct inaccurate data
- Delete your data
- Opt-out of marketing
Contact us to exercise these rights.

## 7. Data Retention

We retain data as long as necessary for service provision or legal requirements.

## 8. Children's Privacy

Our services are not for children under 13. We do not collect data from children.

## 9. Policy Updates

We may update this policy. Changes will be posted on this page.

## 10. Contact

For privacy questions, contact: ${email || 'privacy@example.com'}
`;

    setOutput(policy);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Privacy Policy Generator</h1>
      <p className="text-zinc-600">Generate a basic privacy policy for your website. Customize company name, contact, and data types collected. Not legal advice - consult a lawyer for compliance.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Company Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-zinc-600">Company/Website Name</label>
            <input type="text" className="w-full p-2 border rounded" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="My Website" />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Privacy Contact Email</label>
            <input type="email" className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="privacy@example.com" />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Data Types Collected</h3>
        <div className="grid grid-cols-2 gap-2">
          {dataOptions.map((d) => (
            <button key={d} onClick={() => toggleData(d)} className={`p-2 rounded text-xs ${dataTypes.includes(d) ? 'bg-blue-100 border-blue-500 border' : 'bg-white border'}`}>
              {dataTypes.includes(d) ? '✓ ' : ''}{d}
            </button>
          ))}
        </div>
      </div>

      <button onClick={generatePolicy} className="btn-primary w-full">Generate Privacy Policy</button>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Generated Privacy Policy</h3>
        <textarea className="w-full h-60 p-3 border rounded font-mono text-sm bg-white" value={output} readOnly />
        <button onClick={copyOutput} className="btn-secondary mt-2">Copy Policy</button>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Important Notes</h3>
        <div className="text-xs text-zinc-600">
          This is a basic template. Consult a lawyer for GDPR, CCPA, HIPAA compliance. Update effective date. Customize sections for your business. Review regularly. Display prominently on website. Link from footer. Required for AdSense, app stores, many services.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compliance Requirements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2">GDPR: EU users - detailed consent</div>
          <div className="bg-white rounded p-2">CCPA: California - opt-out rights</div>
          <div className="bg-white rounded p-2">HIPAA: Health data - strict rules</div>
          <div className="bg-white rounded p-2">COPPA: Children - age verification</div>
        </div>
      </div>
    </main>
  );
}