export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://finance.128345827.xyz').replace(/\/$/, '');

export const NETWORK_SITES = {
  finance: {
    name: 'Finance Tools',
    url: 'https://finance.128345827.xyz',
  },
  repair: {
    name: 'Repair Cost Lab',
    url: 'https://repair.128345827.xyz',
  },
  ai: {
    name: 'AI Cost Tools',
    url: 'https://ai.128345827.xyz',
  },
} as const;

export type NetworkSiteKey = keyof typeof NETWORK_SITES;

export function buildNetworkUrl(
  destination: Exclude<NetworkSiteKey, 'finance'>,
  placement: string,
  path: string = '/',
) {
  const url = new URL(path, NETWORK_SITES[destination].url);
  url.searchParams.set('utm_source', 'network');
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', 'tool-network');
  url.searchParams.set('utm_source_site', 'finance');
  url.searchParams.set('utm_destination_site', destination);
  url.searchParams.set('utm_content', placement);
  return url.toString();
}
