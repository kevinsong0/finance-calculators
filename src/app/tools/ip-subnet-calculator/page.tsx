import type { Metadata } from 'next';
import { Suspense } from 'react';
import IPSubnetCalculator from '@/components/IPSubnetCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is CIDR notation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CIDR (Classless Inter-Domain Routing) notation represents IP networks compactly: IP/prefix-length. /24 means first 24 bits are network, remaining 8 bits are host addresses. /24 = 256 addresses, /25 = 128, /26 = 64. CIDR replaced class-based addressing (A, B, C) for flexible allocation."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate subnet mask from CIDR?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Convert CIDR number to binary: 24 binary ones followed by zeros = 11111111.11111111.11111111.00000000 = 255.255.255.0. Formula: mask = (2^32 - 2^(32-CIDR)). /24 gives 255.255.255.0, /16 gives 255.255.0.0, /8 gives 255.0.0.0. Use calculator for fractional CIDR like /18."
      }
    },
    {
      "@type": "Question",
      "name": "What is network address vs broadcast address?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Network address: first address in subnet, identifies the network itself (all host bits zero). Broadcast address: last address, used to send to all hosts (all host bits ones). Usable host addresses are between network and broadcast. For /24: network is .0, broadcast is .255, hosts are .1 through .254."
      }
    },
    {
      "@type": "Question",
      "name": "How many hosts can fit in a /24 subnet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "/24 subnet has 8 host bits: 2^8 = 256 total addresses. Subtract network (.0) and broadcast (.255) = 254 usable hosts. Formula: usable = 2^(32-CIDR) - 2. /25 = 126 hosts, /26 = 62, /27 = 30, /28 = 14, /29 = 6, /30 = 2 (point-to-point), /31 = 0 (special), /32 = 1 (single host)."
      }
    },
    {
      "@type": "Question",
      "name": "What are private IP ranges?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "RFC 1918 private ranges: 10.0.0.0/8 (10.x.x.x - 10.255.255.255), 172.16.0.0/12 (172.16.x.x - 172.31.255.255), 192.168.0.0/16 (192.168.x.x). Not routable on public internet, used internally. NAT translates private to public for internet access. Private IPs free, public IPs require allocation."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'IP Subnet Calculator - CIDR, Network Address, Host Range',
  description: 'Free IP subnet calculator. Calculate network address, broadcast, usable hosts from CIDR notation. Subnet mask conversion. Network planning tool for IT admins and DevOps.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <IPSubnetCalculator />
    </Suspense>
  );
}