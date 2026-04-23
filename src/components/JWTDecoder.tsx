'use client'

import { useState, useMemo } from 'react';

export default function JWTDecoder() {
  const [jwt, setJwt] = useState('');

  const decoded = useMemo(() => {
    if (!jwt || jwt.trim() === '') return null;

    try {
      const parts = jwt.split('.');
      if (parts.length !== 3) {
        return { error: 'Invalid JWT format (must have 3 parts separated by dots)' };
      }

      const decodeBase64 = (str: string) => {
        let normalized = str.replace(/-/g, '+').replace(/_/g, '/');
        while (normalized.length % 4 !== 0) {
          normalized += '=';
        }
        return atob(normalized);
      };

      const header = JSON.parse(decodeBase64(parts[0]));
      const payload = JSON.parse(decodeBase64(parts[1]));
      const signature = parts[2];

      return {
        valid: true,
        header,
        payload,
        signature,
        headerRaw: decodeBase64(parts[0]),
        payloadRaw: decodeBase64(parts[1]),
        alg: header.alg || 'none',
        typ: header.typ || 'JWT',
        issuedAt: payload.iat ? new Date(payload.iat * 1000).toLocaleString() : null,
        expiresAt: payload.exp ? new Date(payload.exp * 1000).toLocaleString() : null,
        notBefore: payload.nbf ? new Date(payload.nbf * 1000).toLocaleString() : null,
        isExpired: payload.exp ? new Date(payload.exp * 1000) < new Date() : false,
      };
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'Failed to decode JWT' };
    }
  }, [jwt]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const examples = [
    {
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      desc: 'Standard JWT example',
    },
    {
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkxMjJ9.4Adcj3UFYzP5g30g1e4m8n7t9p6r2s5k8h1j2m3n4o5p6q7',
      desc: 'JWT with expiration',
    },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">JWT Decoder</h1>
      <p className="text-zinc-600">Decode JSON Web Tokens (JWT) to inspect header, payload, and signature. View claims like expiration, issuer, subject. Essential for debugging authentication and API tokens.</p>

      <div className="card space-y-4">
        {/* JWT Input */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">JWT Token</label>
          <textarea
            value={jwt}
            onChange={e => setJwt(e.target.value)}
            className="w-full h-20 p-3 border rounded-lg font-mono text-sm resize-none"
            placeholder="Paste JWT token here (header.payload.signature)"
          />
        </div>

        {/* Quick Examples */}
        <div className="flex gap-2">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => setJwt(ex.jwt)}
              className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200"
            >
              {ex.desc}
            </button>
          ))}
          <button
            onClick={() => setJwt('')}
            className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Error */}
      {decoded?.error && (
        <div className="card bg-red-50 p-4">
          <div className="text-red-600 font-medium">Error</div>
          <div className="text-sm text-red-500">{decoded.error}</div>
        </div>
      )}

      {/* Decoded Results */}
      {decoded?.valid && (
        <div className="space-y-4">
          {/* Header */}
          <div className="card bg-blue-50 p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Header (JOSE)</h3>
              <button
                onClick={() => copyToClipboard(JSON.stringify(decoded.header, null, 2))}
                className="px-2 py-1 text-xs bg-white rounded hover:bg-zinc-100"
              >
                Copy JSON
              </button>
            </div>
            <div className="bg-white rounded p-3 font-mono text-sm overflow-auto">
              <pre>{JSON.stringify(decoded.header, null, 2)}</pre>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="bg-white px-2 py-1 rounded text-xs">
                <span className="text-zinc-500">Algorithm:</span> {decoded.alg}
              </span>
              <span className="bg-white px-2 py-1 rounded text-xs">
                <span className="text-zinc-500">Type:</span> {decoded.typ}
              </span>
            </div>
          </div>

          {/* Payload */}
          <div className="card bg-green-50 p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Payload (Claims)</h3>
              <button
                onClick={() => copyToClipboard(JSON.stringify(decoded.payload, null, 2))}
                className="px-2 py-1 text-xs bg-white rounded hover:bg-zinc-100"
              >
                Copy JSON
              </button>
            </div>
            <div className="bg-white rounded p-3 font-mono text-sm overflow-auto max-h-48">
              <pre>{JSON.stringify(decoded.payload, null, 2)}</pre>
            </div>

            {/* Timestamp Claims */}
            <div className="mt-3 flex gap-2">
              {decoded.issuedAt && (
                <span className={`bg-white px-2 py-1 rounded text-xs ${decoded.isExpired ? 'text-red-600' : 'text-green-600'}`}>
                  <span className="text-zinc-500">Issued:</span> {decoded.issuedAt}
                </span>
              )}
              {decoded.expiresAt && (
                <span className={`bg-white px-2 py-1 rounded text-xs ${decoded.isExpired ? 'text-red-600' : 'text-green-600'}`}>
                  <span className="text-zinc-500">Expires:</span> {decoded.expiresAt}
                  {decoded.isExpired && <span className="ml-1">(EXPIRED)</span>}
                </span>
              )}
              {decoded.notBefore && (
                <span className="bg-white px-2 py-1 rounded text-xs">
                  <span className="text-zinc-500">Not Before:</span> {decoded.notBefore}
                </span>
              )}
            </div>
          </div>

          {/* Signature */}
          <div className="card bg-purple-50 p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Signature</h3>
              <button
                onClick={() => copyToClipboard(decoded.signature)}
                className="px-2 py-1 text-xs bg-white rounded hover:bg-zinc-100"
              >
                Copy
              </button>
            </div>
            <div className="bg-white rounded p-3 font-mono text-sm break-all">
              {decoded.signature}
            </div>
            <div className="text-xs text-zinc-500 mt-2">
              Signature is base64url encoded hash of header + payload using the algorithm specified in header. Cannot be verified without the secret key.
            </div>
          </div>
        </div>
      )}

      {/* Reference */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">JWT Structure Reference</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">Header Claims</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-blue-600">alg</span> Algorithm (HS256, RS256)</div>
              <div><span className="text-blue-600">typ</span> Token type (JWT)</div>
              <div><span className="text-blue-600">kid</span> Key ID for key rotation</div>
              <div><span className="text-blue-600">cty</span> Content type</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Payload Claims</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-green-600">sub</span> Subject (user ID)</div>
              <div><span className="text-green-600">iss</span> Issuer</div>
              <div><span className="text-green-600">aud</span> Audience</div>
              <div><span className="text-green-600">exp</span> Expiration time</div>
              <div><span className="text-green-600">iat</span> Issued at time</div>
              <div><span className="text-green-600">nbf</span> Not valid before</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Algorithms</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-purple-600">HS256</span> HMAC SHA-256</div>
              <div><span className="text-purple-600">HS512</span> HMAC SHA-512</div>
              <div><span className="text-purple-600">RS256</span> RSA SHA-256</div>
              <div><span className="text-purple-600">RS512</span> RSA SHA-512</div>
              <div><span className="text-purple-600">none</span> Unsecured</div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Developer Use Cases</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">Auth Debug:</span> Inspect login tokens
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">API Testing:</span> Verify token claims
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">OAuth:</span> Decode access tokens
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">SSO:</span> Inspect SAML/OIDC tokens
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-pink-600 font-medium">Expiration:</span> Check if token expired
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-teal-600 font-medium">Claims:</span> Verify user permissions
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-indigo-600 font-medium">Security:</span> Audit token contents
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-red-600 font-medium">Dev:</span> Quick token inspection
          </div>
        </div>
      </div>

      {/* Security Note */}
      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium text-yellow-700 mb-2">⚠ Security Notes</h3>
        <div className="text-xs space-y-1">
          <div>• This tool ONLY decodes JWT - it does NOT verify the signature</div>
          <div>• Decoding reveals payload contents without needing the secret key</div>
          <div>• Always verify signatures in production using the proper secret/public key</div>
          <div>• Never trust decoded claims without signature verification</div>
          <div>• This runs entirely in browser - no tokens sent to servers</div>
        </div>
      </div>
    </main>
  );
}