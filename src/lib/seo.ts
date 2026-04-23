export function generateCalculatorSchema(
  name: string,
  description: string,
  url: string,
  inputs: { name: string; description: string }[],
  outputs: { name: string; description: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#calculator`,
        "name": name,
        "description": description,
        "url": url,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web Browser",
        "browserRequirements": "Requires JavaScript",
        "input": inputs.map((i) => ({
          "@type": "PropertyValueSpecification",
          "valueName": i.name,
          "description": i.description,
        })),
        "output": outputs.map((o) => ({
          "@type": "PropertyValueSpecification",
          "valueName": o.name,
          "description": o.description,
        })),
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        "url": url,
        "name": name,
        "description": description,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://finance.128345827.xyz/#website",
          "name": "Finance Tools",
          "url": "https://finance.128345827.xyz",
        },
        "about": {
          "@type": "Thing",
          "name": "Financial Calculator",
          "description": "Online tool for financial calculations",
        },
      },
    ],
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

export const SITE_URL = "https://finance.128345827.xyz";

export function buildNetworkUrl(destination: 'repair' | 'ai', context: string) {
  const baseUrls = {
    repair: 'https://repair.128345827.xyz',
    ai: 'https://ai.128345827.xyz',
  };
  return `${baseUrls[destination]}?utm_source=network&utm_medium=referral&utm_campaign=tool-network&utm_source_site=finance&utm_destination_site=${destination}&utm_content=${context}`;
}