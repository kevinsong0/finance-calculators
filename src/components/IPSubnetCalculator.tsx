'use client'

import { useState, useMemo } from 'react';

export default function IPSubnetCalculator() {
  const [ipAddress, setIpAddress] = useState('192.168.1.0');
  const [cidr, setCidr] = useState('24');
  const [subnetMask, setSubnetMask] = useState('255.255.255.0');

  const results = useMemo(() => {
    try {
      const octets = ipAddress.split('.').map(Number);
      if (octets.length !== 4 || octets.some(o => o < 0 || o > 255 || isNaN(o))) {
        return { error: 'Invalid IP address' };
      }

      const cidrNum = parseInt(cidr, 10);
      if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
        return { error: 'Invalid CIDR (must be 0-32)' };
      }

      const maskBinary = '1'.repeat(cidrNum) + '0'.repeat(32 - cidrNum);
      const maskOctets = [
        parseInt(maskBinary.slice(0, 8), 2),
        parseInt(maskBinary.slice(8, 16), 2),
        parseInt(maskBinary.slice(16, 24), 2),
        parseInt(maskBinary.slice(24, 32), 2),
      ];
      const maskDecimal = maskOctets.join('.');
      const wildcardOctets = maskOctets.map(o => 255 - o);
      const wildcard = wildcardOctets.join('.');
      const ipNumber = octets.reduce((acc, o) => (acc << 8) + o, 0);
      const networkNumber = (ipNumber & parseInt(maskBinary, 2));
      const broadcastNumber = networkNumber | parseInt('0'.repeat(cidrNum) + '1'.repeat(32 - cidrNum), 2);
      const networkOctets = [
        (networkNumber >>> 24) & 255,
        (networkNumber >>> 16) & 255,
        (networkNumber >>> 8) & 255,
        networkNumber & 255,
      ];
      const broadcastOctets = [
        (broadcastNumber >>> 24) & 255,
        (broadcastNumber >>> 16) & 255,
        (broadcastNumber >>> 8) & 255,
        broadcastNumber & 255,
      ];
      const firstHostOctets = [...networkOctets];
      firstHostOctets[3] = Math.max(firstHostOctets[3], 1);
      const lastHostOctets = [...broadcastOctets];
      lastHostOctets[3] = Math.min(lastHostOctets[3], 254);
      const totalAddresses = Math.pow(2, 32 - cidrNum);
      const usableAddresses = totalAddresses - 2;
      const isPrivate = (octets[0] === 10) ||
        (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
        (octets[0] === 192 && octets[1] === 168);
      const ipClass = cidrNum >= 24 ? 'C' : cidrNum >= 16 ? 'B' : cidrNum >= 8 ? 'A' : 'N/A';
      const ipType = isPrivate ? 'Private' : 'Public';

      return {
        valid: true,
        networkAddress: networkOctets.join('.'),
        broadcastAddress: broadcastOctets.join('.'),
        firstHost: firstHostOctets.join('.'),
        lastHost: lastHostOctets.join('.'),
        subnetMask: maskDecimal,
        wildcardMask: wildcard,
        cidrNotation: `/${cidrNum}`,
        totalAddresses,
        usableAddresses: usableAddresses > 0 ? usableAddresses : 0,
        ipClass,
        ipType,
        binaryIP: octets.map(o => o.toString(2).padStart(8, '0')).join('.'),
        binaryMask: maskOctets.map(o => o.toString(2).padStart(8, '0')).join('.'),
      };
    } catch {
      return { error: 'Invalid input' };
    }
  }, [ipAddress, cidr]);

  const cidrPresets = [
    { cidr: '8', desc: 'Class A / 16M hosts' },
    { cidr: '16', desc: 'Class B / 65K hosts' },
    { cidr: '24', desc: 'Class C / 256 hosts' },
    { cidr: '25', desc: '128 hosts' },
    { cidr: '26', desc: '64 hosts' },
    { cidr: '27', desc: '32 hosts' },
    { cidr: '28', desc: '16 hosts' },
    { cidr: '30', desc: '4 hosts (point-to-point)' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">IP Subnet Calculator</h1>
      <p className="text-zinc-600">Calculate IP subnet details: network address, broadcast, usable hosts range. CIDR notation and subnet masks. Essential for network planning and firewall configuration.</p>

      <div className="card space-y-4">
        {/* IP Address */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">IP Address</label>
          <input
            type="text"
            value={ipAddress}
            onChange={e => setIpAddress(e.target.value)}
            className="w-full"
            placeholder="192.168.1.0"
          />
        </div>

        {/* CIDR */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">CIDR / Subnet Bits</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={cidr}
              onChange={e => setCidr(e.target.value)}
              className="w-20"
              placeholder="24"
            />
            <div className="flex gap-1">
              {cidrPresets.map((preset) => (
                <button
                  key={preset.cidr}
                  onClick={() => setCidr(preset.cidr)}
                  className="px-2 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200"
                  title={preset.desc}
                >
                  /{preset.cidr}
                </button>
              ))}
            </div>
          </div>
          <div className="text-xs text-zinc-500 mt-1">
            CIDR range: /0 (entire internet) to /32 (single host)
          </div>
        </div>
      </div>

      {/* Results */}
      {results.error && (
        <div className="card bg-red-50 p-4">
          <div className="text-red-600">{results.error}</div>
        </div>
      )}

      {results.valid && (
        <div className="card bg-blue-50 p-4">
          <h3 className="font-medium mb-3">Subnet Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded p-3">
              <div className="text-xs text-zinc-500">Network Address</div>
              <div className="font-mono font-bold text-blue-600">{results.networkAddress}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-xs text-zinc-500">Broadcast Address</div>
              <div className="font-mono font-bold text-red-600">{results.broadcastAddress}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-xs text-zinc-500">First Usable Host</div>
              <div className="font-mono font-bold">{results.firstHost}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-xs text-zinc-500">Last Usable Host</div>
              <div className="font-mono font-bold">{results.lastHost}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-xs text-zinc-500">Subnet Mask</div>
              <div className="font-mono">{results.subnetMask}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-xs text-zinc-500">Wildcard Mask</div>
              <div className="font-mono">{results.wildcardMask}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-xs text-zinc-500">Total Addresses</div>
              <div className="font-bold">{results.totalAddresses.toLocaleString()}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-xs text-zinc-500">Usable Addresses</div>
              <div className="font-bold">{results.usableAddresses.toLocaleString()}</div>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <span className="bg-white px-3 py-1 rounded text-sm">
              <span className="text-zinc-500">CIDR:</span> {results.cidrNotation}
            </span>
            <span className="bg-white px-3 py-1 rounded text-sm">
              <span className="text-zinc-500">Class:</span> {results.ipClass}
            </span>
            <span className="bg-white px-3 py-1 rounded text-sm">
              <span className="text-zinc-500">Type:</span> {results.ipType}
            </span>
          </div>
        </div>
      )}

      {/* Binary View */}
      {results.valid && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">Binary Representation</h3>
          <div className="bg-white rounded p-3 font-mono text-xs overflow-x-auto">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-zinc-500 w-16">IP:</span>
              <span className="text-blue-600">{results.binaryIP}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 w-16">Mask:</span>
              <span className="text-green-600">{results.binaryMask}</span>
            </div>
          </div>
        </div>
      )}

      {/* Reference */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">CIDR Reference</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          {[
            { cidr: 8, mask: '255.0.0.0', hosts: '16,777,214' },
            { cidr: 12, mask: '255.240.0.0', hosts: '1,048,574' },
            { cidr: 16, mask: '255.255.0.0', hosts: '65,534' },
            { cidr: 20, mask: '255.255.240.0', hosts: '4,094' },
            { cidr: 24, mask: '255.255.255.0', hosts: '254' },
            { cidr: 25, mask: '255.255.255.128', hosts: '126' },
            { cidr: 26, mask: '255.255.255.192', hosts: '62' },
            { cidr: 27, mask: '255.255.255.224', hosts: '30' },
            { cidr: 28, mask: '255.255.255.240', hosts: '14' },
            { cidr: 29, mask: '255.255.255.248', hosts: '6' },
            { cidr: 30, mask: '255.255.255.252', hosts: '2' },
            { cidr: 32, mask: '255.255.255.255', hosts: '1' },
          ].map((row) => (
            <div key={row.cidr} className="bg-white rounded p-2">
              <div className="font-mono text-blue-600">/{row.cidr}</div>
              <div className="text-zinc-500">{row.mask}</div>
              <div className="text-green-600">{row.hosts} hosts</div>
            </div>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Network Use Cases</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">Firewalls:</span> Define network ranges
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">DHCP:</span> Configure address pools
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">VLANs:</span> Subnet segmentation
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">Routing:</span> ACLs and route tables
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-pink-600 font-medium">VPN:</span> Tunnel network ranges
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-teal-600 font-medium">DNS:</span> Reverse DNS zones
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-indigo-600 font-medium">Cloud:</span> VPC subnet planning
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-red-600 font-medium">Security:</span> IP whitelisting
          </div>
        </div>
      </div>
    </main>
  );
}