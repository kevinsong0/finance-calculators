'use client';

import { useState, useMemo } from 'react';

export default function WeddingBudgetCalculator() {
  const [totalBudget, setTotalBudget] = useState<string>('30000');
  const [numGuests, setNumGuests] = useState<string>('150');
  const [venueCost, setVenueCost] = useState<string>('8000');
  const [cateringPerGuest, setCateringPerGuest] = useState<string>('75');
  const [photographyCost, setPhotographyCost] = useState<string>('2500');
  const [videographyCost, setVideographyCost] = useState<string>('1500');
  const [floristCost, setFloristCost] = useState<string>('1500');
  const [musicCost, setMusicCost] = useState<string>('1000');
  const [dressCost, setDressCost] = useState<string>('2000');
  const [suitCost, setSuitCost] = useState<string>('500');
  const [invitationsCost, setInvitationsCost] = useState<string>('400');
  const [decorationsCost, setDecorationsCost] = useState<string>('1000');
  const [officiantCost, setOfficiantCost] = useState<string>('300');
  const [miscCost, setMiscCost] = useState<string>('1000');
  const [contributionsFamily, setContributionsFamily] = useState<string>('5000');
  const [contributionsCouple, setContributionsCouple] = useState<string>('10000');

  const result = useMemo(() => {
    const budget = parseFloat(totalBudget) || 0;
    const guests = parseFloat(numGuests) || 0;
    const venue = parseFloat(venueCost) || 0;
    const catering = parseFloat(cateringPerGuest) || 0;
    const photography = parseFloat(photographyCost) || 0;
    const videography = parseFloat(videographyCost) || 0;
    const florist = parseFloat(floristCost) || 0;
    const music = parseFloat(musicCost) || 0;
    const dress = parseFloat(dressCost) || 0;
    const suit = parseFloat(suitCost) || 0;
    const invitations = parseFloat(invitationsCost) || 0;
    const decor = parseFloat(decorationsCost) || 0;
    const officiant = parseFloat(officiantCost) || 0;
    const misc = parseFloat(miscCost) || 0;
    const familyContrib = parseFloat(contributionsFamily) || 0;
    const coupleContrib = parseFloat(contributionsCouple) || 0;

    // Calculate totals
    const cateringTotal = catering * guests;
    const totalCost = venue + cateringTotal + photography + videography + florist + music + dress + suit + invitations + decor + officiant + misc;
    const totalContributions = familyContrib + coupleContrib;
    const shortfall = totalCost - totalContributions;
    const budgetVariance = budget - totalCost;

    // Per guest cost
    const perGuestCost = guests > 0 ? totalCost / guests : 0;

    // Cost categories
    const categories = [
      { name: 'Venue', amount: venue, typicalPercent: 25 },
      { name: 'Catering', amount: cateringTotal, typicalPercent: 30 },
      { name: 'Photography', amount: photography, typicalPercent: 10 },
      { name: 'Videography', amount: videography, typicalPercent: 5 },
      { name: 'Florist', amount: florist, typicalPercent: 5 },
      { name: 'Music/Entertainment', amount: music, typicalPercent: 5 },
      { name: 'Wedding Dress', amount: dress, typicalPercent: 5 },
      { name: 'Suit/Tux', amount: suit, typicalPercent: 2 },
      { name: 'Invitations', amount: invitations, typicalPercent: 2 },
      { name: 'Decorations', amount: decor, typicalPercent: 4 },
      { name: 'Officiant', amount: officiant, typicalPercent: 1 },
      { name: 'Miscellaneous', amount: misc, typicalPercent: 6 }
    ].filter(c => c.amount > 0).sort((a, b) => b.amount - a.amount);

    // Percentage breakdown
    const categoriesWithPercent = categories.map(c => ({
      ...c,
      percent: (c.amount / totalCost) * 100,
      vsTypical: ((c.amount / totalCost) * 100) - c.typicalPercent
    }));

    // Overspending check
    const overBudget = budgetVariance < 0;
    const overBudgetAmount = Math.abs(budgetVariance);

    // Contribution breakdown
    const familyPercent = (familyContrib / totalCost) * 100;
    const couplePercent = (coupleContrib / totalCost) * 100;
    const remainingPercent = Math.max(0, (shortfall / totalCost) * 100);

    // Recommendations
    const recommendations: string[] = [];

    if (overBudget) {
      recommendations.push('Total cost exceeds budget by $${overBudgetAmount.toFixed(0)} - reduce expenses or increase budget');
    }

    if (cateringTotal > totalCost * 0.35) {
      recommendations.push('Catering exceeds 35% - consider reducing guest count or per-guest catering cost');
    }

    if (venue > totalCost * 0.30) {
      recommendations.push('Venue exceeds 30% - explore alternative venues or negotiate package deals');
    }

    if (photography + videography > totalCost * 0.15) {
      recommendations.push('Photo/video over 15% - consider combining services or reducing coverage');
    }

    if (guests > 200) {
      recommendations.push('Large guest count - consider intimate ceremony to reduce costs');
    }

    if (shortfall > 0) {
      recommendations.push('$${shortfall.toFixed(0)} unfunded - increase contributions or reduce expenses');
    }

    const highExpenseCategories = categoriesWithPercent.filter(c => c.vsTypical > 5);
    if (highExpenseCategories.length > 0) {
      recommendations.push('{highExpenseCategories[0].name} spending above typical - review alternatives');
    }

    return {
      totalCost,
      perGuestCost,
      budgetVariance,
      overBudget,
      overBudgetAmount,
      categoriesWithPercent,
      cateringTotal,
      totalContributions,
      familyPercent,
      couplePercent,
      remainingPercent,
      shortfall,
      recommendations,
      budget,
      guests
    };
  }, [totalBudget, numGuests, venueCost, cateringPerGuest, photographyCost, videographyCost, floristCost, musicCost, dressCost, suitCost, invitationsCost, decorationsCost, officiantCost, miscCost, contributionsFamily, contributionsCouple]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Wedding Budget Calculator</h1>
      <p className="text-gray-600 mb-6">Plan your wedding budget with detailed expense breakdown and contribution tracking</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Budget &amp; Guests</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Wedding Budget ($)</label>
            <input
              type="number"
              value={totalBudget}
              onChange={(e) => setTotalBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="30000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
            <input
              type="number"
              value={numGuests}
              onChange={(e) => setNumGuests(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="150"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Venue Cost ($)</label>
            <input
              type="number"
              value={venueCost}
              onChange={(e) => setVenueCost(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="8000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catering (per guest) ($)</label>
            <input
              type="number"
              value={cateringPerGuest}
              onChange={(e) => setCateringPerGuest(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="75"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photography ($)</label>
            <input
              type="number"
              value={photographyCost}
              onChange={(e) => setPhotographyCost(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="2500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Videography ($)</label>
            <input
              type="number"
              value={videographyCost}
              onChange={(e) => setVideographyCost(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="1500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Additional Expenses</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm text-gray-700">Florist ($)</label>
              <input
                type="number"
                value={floristCost}
                onChange={(e) => setFloristCost(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Music ($)</label>
              <input
                type="number"
                value={musicCost}
                onChange={(e) => setMusicCost(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Dress ($)</label>
              <input
                type="number"
                value={dressCost}
                onChange={(e) => setDressCost(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Suit ($)</label>
              <input
                type="number"
                value={suitCost}
                onChange={(e) => setSuitCost(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Invitations ($)</label>
              <input
                type="number"
                value={invitationsCost}
                onChange={(e) => setInvitationsCost(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Decorations ($)</label>
              <input
                type="number"
                value={decorationsCost}
                onChange={(e) => setDecorationsCost(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Officiant ($)</label>
              <input
                type="number"
                value={officiantCost}
                onChange={(e) => setOfficiantCost(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Misc ($)</label>
              <input
                type="number"
                value={miscCost}
                onChange={(e) => setMiscCost(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Contributions</h4>
            <div className="space-y-2">
              <div>
                <label className="block text-sm text-gray-700">Family Contributions ($)</label>
                <input
                  type="number"
                  value={contributionsFamily}
                  onChange={(e) => setContributionsFamily(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Couple Contributions ($)</label>
                <input
                  type="number"
                  value={contributionsCouple}
                  onChange={(e) => setContributionsCouple(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-pink-50 border border-pink-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Wedding Budget Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Total Wedding Cost</h4>
              <p className="text-xl font-bold text-pink-700">$${result.totalCost.toFixed(0)}</p>
              <p className="text-xs text-gray-500">$${result.perGuestCost.toFixed(0)} per guest</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Budget Status</h4>
              <p className={`text-xl font-bold ${result.overBudget ? 'text-red-700' : 'text-green-700'}`}>
                {result.overBudget ? '-' : '+'}$${Math.abs(result.budgetVariance).toFixed(0)}
              </p>
              <p className="text-xs text-gray-500">{result.overBudget ? 'Over budget' : 'Under budget'}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Funding Gap</h4>
              <p className={`text-xl font-bold ${result.shortfall > 0 ? 'text-orange-700' : 'text-green-700'}`}>
                $${result.shortfall.toFixed(0)}
              </p>
              <p className="text-xs text-gray-500">Unfunded amount</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Expense Breakdown (vs Typical)</h4>
            <div className="space-y-2 mt-2">
              {result.categoriesWithPercent.map((cat, i) => (
                <div key={i} className="flex justify-between items-center text-sm p-1">
                  <span className="text-gray-600">{cat.name}</span>
                  <div className="text-right">
                    <span className="font-bold text-pink-600">$${cat.amount.toFixed(0)}</span>
                    <span className="text-xs text-gray-500 ml-1">({cat.percent.toFixed(1)}%)</span>
                    {cat.vsTypical !== 0 && (
                      <span className={`text-xs ml-1 ${cat.vsTypical > 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {cat.vsTypical > 0 ? '+' : ''}{cat.vsTypical.toFixed(1)}%
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Funding Sources</h4>
            <div className="grid md:grid-cols-3 gap-2 mt-2">
              <div className="p-2 bg-blue-50 rounded text-center">
                <p className="text-sm text-gray-600">Family</p>
                <p className="font-bold text-blue-600">{result.familyPercent.toFixed(1)}%</p>
              </div>
              <div className="p-2 bg-green-50 rounded text-center">
                <p className="text-sm text-gray-600">Couple</p>
                <p className="font-bold text-green-600">{result.couplePercent.toFixed(1)}%</p>
              </div>
              <div className="p-2 bg-orange-50 rounded text-center">
                <p className="text-sm text-gray-600">Remaining</p>
                <p className="font-bold text-orange-600">{result.remainingPercent.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Budget Recommendations</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-pink-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Typical wedding budget allocation: Venue 25%, Catering 30%, Photo 10%, Video 5%, Flowers 5%, Music 5%, Attire 7%, Other 13%. Guest count significantly impacts catering costs. Negotiate vendor packages. Consider weekday/off-season for discounts.</p>
      </div>
    </div>
  );
}