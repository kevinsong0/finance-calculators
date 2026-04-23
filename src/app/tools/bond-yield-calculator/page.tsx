import type { Metadata } from 'next';
import { Suspense } from 'react';
import BondYieldCalculator from '@/components/BondYieldCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is yield to maturity (YTM)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yield to Maturity (YTM) is the total return expected if a bond is held until it matures. YTM includes all coupon payments plus any capital gain or loss. It's expressed as an annual percentage rate. YTM accounts for the bond's current market price, face value, coupon rate, and time to maturity."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between current yield and YTM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Current yield is simply the annual coupon payment divided by the current bond price. YTM is more comprehensive, considering both coupon payments and the capital gain/loss from buying at a discount or premium. For discount bonds, YTM exceeds current yield; for premium bonds, current yield exceeds YTM."
      }
    },
    {
      "@type": "Question",
      "name": "Why do bond prices change?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bond prices change primarily due to interest rate movements. When market interest rates rise, existing bonds with lower coupon rates become less attractive, causing prices to fall. When rates fall, existing bonds with higher coupons become more valuable, pushing prices up. This inverse relationship is fundamental to bond investing."
      }
    },
    {
      "@type": "Question",
      "name": "What is a zero-coupon bond?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A zero-coupon bond pays no regular interest payments. Instead, it's sold at a discount to its face value and matures at full face value. The investor's return comes entirely from the difference between purchase price and face value. Treasury bills and STRIPS are common zero-coupon bonds."
      }
    },
    {
      "@type": "Question",
      "name": "What are the risks of bond investing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key bond risks include: interest rate risk (prices fall when rates rise), credit risk (issuer may default), inflation risk (fixed payments lose purchasing power), liquidity risk (difficulty selling), and call risk (issuer may redeem early before maturity). Understanding these risks helps in building a diversified bond portfolio."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Bond Yield Calculator - Calculate Current Yield, YTM, and Bond Returns',
  description: 'Calculate bond yields including current yield, yield to maturity, and total return. Analyze coupon bonds and zero-coupon bonds for investment decisions.',
  keywords: ['bond yield calculator', 'yield to maturity', 'YTM calculator', 'current yield', 'bond investment', 'coupon bond', 'zero coupon bond', 'bond returns', 'fixed income'],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BondYieldCalculator />
    </Suspense>
  );
}