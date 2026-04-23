'use client'

import { useState } from 'react';

export default function QRCodeGenerator() {
  const [inputType, setInputType] = useState('text');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [phone, setPhone] = useState('');
  const [wifiName, setWifiName] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiSecurity, setWifiSecurity] = useState('WPA');
  const [size, setSize] = useState(256);
  const [qrData, setQrData] = useState('');

  const generateQR = () => {
    let data = '';

    switch (inputType) {
      case 'text':
        data = text;
        break;
      case 'url':
        data = url.startsWith('http') ? url : `https://${url}`;
        break;
      case 'email':
        data = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}`;
        break;
      case 'phone':
        data = `tel:${phone}`;
        break;
      case 'wifi':
        data = `WIFI:T:${wifiSecurity};S:${wifiName};P:${wifiPassword};;`;
        break;
      case 'sms':
        data = `sms:${phone}`;
        break;
      case 'geo':
        // Placeholder for location
        data = text;
        break;
    }

    if (data) {
      // Use a QR code API for generation
      const encodedData = encodeURIComponent(data);
      setQrData(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedData}`);
    }
  };

  const downloadQR = () => {
    if (qrData) {
      const link = document.createElement('a');
      link.href = qrData;
      link.download = `qrcode-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const presets = [
    { type: 'url', label: 'Website', value: 'https://example.com' },
    { type: 'email', label: 'Email', value: 'hello@example.com' },
    { type: 'phone', label: 'Phone', value: '+1234567890' },
    { type: 'wifi', label: 'WiFi', name: 'MyNetwork', password: 'password123' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">QR Code Generator</h1>
      <p className="text-zinc-600">Generate QR codes for text, URLs, emails, phone numbers, and WiFi. Download as PNG image.</p>

      <div className="card space-y-4">
        {/* Type Selection */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">QR Code Type</label>
          <div className="flex gap-2">
            {[
              { id: 'text', name: 'Text', icon: '📝' },
              { id: 'url', name: 'URL', icon: '🔗' },
              { id: 'email', name: 'Email', icon: '📧' },
              { id: 'phone', name: 'Phone', icon: '📞' },
              { id: 'wifi', name: 'WiFi', icon: '📶' },
              { id: 'sms', name: 'SMS', icon: '💬' },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setInputType(type.id)}
                className={`px-3 py-2 rounded ${inputType === type.id ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
              >
                {type.icon} {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Text Input */}
        {inputType === 'text' && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Text Content</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-24 p-3 border rounded-lg"
              placeholder="Enter any text to encode..."
            />
          </div>
        )}

        {/* URL Input */}
        {inputType === 'url' && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Website URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full"
              placeholder="https://example.com"
            />
            <div className="text-xs text-zinc-500 mt-1">Enter full URL or just the domain</div>
          </div>
        )}

        {/* Email Input */}
        {inputType === 'email' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                placeholder="hello@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Subject (Optional)</label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="w-full"
                placeholder="Hello!"
              />
            </div>
          </div>
        )}

        {/* Phone Input */}
        {(inputType === 'phone' || inputType === 'sms') && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full"
              placeholder="+1234567890"
            />
            <div className="text-xs text-zinc-500 mt-1">Include country code (e.g., +1 for US)</div>
          </div>
        )}

        {/* WiFi Input */}
        {inputType === 'wifi' && (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Network Name (SSID)</label>
              <input
                type="text"
                value={wifiName}
                onChange={(e) => setWifiName(e.target.value)}
                className="w-full"
                placeholder="MyWiFi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Password</label>
              <input
                type="text"
                value={wifiPassword}
                onChange={(e) => setWifiPassword(e.target.value)}
                className="w-full"
                placeholder="password123"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Security Type</label>
              <select value={wifiSecurity} onChange={(e) => setWifiSecurity(e.target.value)} className="w-full">
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Password</option>
              </select>
            </div>
          </div>
        )}

        {/* Size Selection */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">QR Code Size</label>
          <div className="flex gap-2">
            {[128, 256, 512, 1024].map((s) => (
              <button key={s} onClick={() => setSize(s)} className={`px-3 py-1 text-sm rounded ${size === s ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {s}x{s}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button onClick={generateQR} className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 font-medium">
          Generate QR Code
        </button>
      </div>

      {/* QR Code Display */}
      {qrData && (
        <div className="card bg-white p-6 text-center">
          <img src={qrData} alt="QR Code" className="mx-auto" />
          <div className="mt-4 flex gap-2 justify-center">
            <button onClick={downloadQR} className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Download PNG
            </button>
            <button onClick={() => navigator.clipboard.writeText(qrData)} className="px-6 py-2 bg-zinc-100 rounded hover:bg-zinc-200">
              Copy Image URL
            </button>
          </div>
        </div>
      )}

      {/* Quick Presets */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Quick Examples</h3>
        <div className="flex gap-2">
          {presets.map((preset, i) => (
            <button
              key={i}
              onClick={() => {
                setInputType(preset.type);
                if (preset.type === 'wifi') {
                  setWifiName(preset.name || '');
                  setWifiPassword(preset.password || '');
                } else {
                  setText(preset.value || '');
                  setUrl(preset.value || '');
                  setEmail(preset.value || '');
                  setPhone(preset.value || '');
                }
              }}
              className="px-3 py-1 text-xs bg-white rounded hover:bg-zinc-100"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* QR Code Info */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">QR Code Uses</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">Marketing:</span> Print on flyers, business cards, posters
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">WiFi Sharing:</span> Guests scan to connect instantly
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">Business:</span> Contact info, website, social links
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">Events:</span> Tickets, check-in, schedules
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-pink-600 font-medium">Products:</span> Manuals, warranty info, support
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-teal-600 font-medium">Payments:</span> Crypto addresses, payment links
          </div>
        </div>
      </div>

      {/* Format Info */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Supported Formats</h3>
        <div className="grid grid-cols-6 gap-2 text-xs">
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">Plain Text</div>
            <div className="text-zinc-600">Any content</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">URL</div>
            <div className="text-zinc-600">Web links</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">Email</div>
            <div className="text-zinc-600">mailto:</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">Phone</div>
            <div className="text-zinc-600">tel:</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">WiFi</div>
            <div className="text-zinc-600">Network</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">SMS</div>
            <div className="text-zinc-600">sms:</div>
          </div>
        </div>
      </div>
    </main>
  );
}