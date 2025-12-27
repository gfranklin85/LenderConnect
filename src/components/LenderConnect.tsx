import { useState } from 'react';

export default function LenderConnect() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    loanPurpose: '',
    timeline: '',
    firstTimeBuyer: null as boolean | null,
    propertyState: '',
    propertyCity: '',
    propertyType: '',
    estimatedPrice: '',
    occupancyType: '',
    creditBand: '',
    incomeRange: '',
    employmentType: '',
    downPayment: '',
    fullName: '',
    email: '',
    phone: '',
    preferredContact: '',
    consentShare: false,
    allowMultiple: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string | boolean | null) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const canContinue = () => {
    if (step === 0) return data.loanPurpose;
    if (step === 1) return data.timeline && data.firstTimeBuyer !== null;
    if (step === 2) return data.propertyState && data.propertyType;
    if (step === 3) return data.creditBand && data.incomeRange;
    if (step === 4) return data.fullName && data.email && data.consentShare;
    return true;
  };

  // Landing / Start Screen
  if (step === 0 && !data.loanPurpose) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
        {/* Header */}
        <header className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-gray-900">LenderConnect</span>
          </div>
          <a href="tel:5591234567" className="text-sm text-gray-600 hover:text-emerald-600">
            Need help? (559) 123-4567
          </a>
        </header>

        {/* Hero */}
        <main className="max-w-2xl mx-auto px-6 pt-12 pb-20">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">👋</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Hi, I'm here to help!
            </h1>
            <p className="text-xl text-gray-600">
              What can I help you with today?
            </p>
          </div>

          {/* Goal Selection */}
          <div className="space-y-4 mb-12">
            {[
              { value: 'purchase', label: 'Buy a home', icon: '🏠', desc: 'Get matched with lenders for your purchase' },
              { value: 'refinance', label: 'Refinance my mortgage', icon: '🔄', desc: 'Lower your rate or change your terms' },
              { value: 'cash_out', label: 'Get cash from my home', icon: '💰', desc: 'Access your home equity' },
            ].map(option => (
              <button
                key={option.value}
                onClick={() => {
                  update('loanPurpose', option.value);
                  setStep(1);
                }}
                className="w-full p-5 bg-white rounded-2xl border-2 border-gray-100 hover:border-emerald-500 hover:shadow-lg transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{option.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 group-hover:text-emerald-600 text-lg">
                      {option.label}
                    </div>
                    <div className="text-sm text-gray-500">{option.desc}</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">3 min</div>
              <div className="text-xs text-gray-500">Quick & easy</div>
            </div>
            <div className="text-center border-x border-gray-200">
              <div className="text-2xl font-bold text-emerald-600">No credit check</div>
              <div className="text-xs text-gray-500">Safe to explore</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">50+</div>
              <div className="text-xs text-gray-500">Partner lenders</div>
            </div>
          </div>

          {/* What You'll Unlock */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <p className="text-sm font-medium text-gray-900 mb-4">After a few questions, you'll unlock:</p>
            <div className="space-y-3">
              {[
                'Personalized lender matches',
                'Estimated rate ranges',
                'Your readiness snapshot',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 py-4 border-t bg-white">
          <p className="text-xs text-gray-400 text-center max-w-xl mx-auto">
            LenderConnect is not a lender or mortgage broker. We connect you with participating lenders.
            No credit check is performed. Equal Housing Opportunity.
          </p>
        </footer>
      </div>
    );
  }

  // Success Screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">You're all set, {data.fullName?.split(' ')[0]}!</h2>
            <p className="text-gray-600">Lenders are reviewing your profile now.</p>
          </div>

          <div className="bg-white rounded-2xl border p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
            <div className="space-y-4">
              {[
                { num: '1', title: 'Review', desc: 'Lenders review your profile (usually within 24 hours)' },
                { num: '2', title: 'Connect', desc: `They'll reach out via ${data.preferredContact?.toLowerCase() || 'your preferred method'}` },
                { num: '3', title: 'Decide', desc: 'You choose if and how to proceed - no obligation' },
              ].map(step => (
                <div key={step.num} className="flex gap-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-semibold text-sm shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{step.title}</div>
                    <div className="text-sm text-gray-500">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-4 text-center">
            <p className="text-sm text-emerald-800">
              <strong>Remember:</strong> No credit check was performed. You're under no obligation to proceed with any lender.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Multi-step Form
  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-semibold text-gray-900">LenderConnect</span>
        </div>
        <button
          onClick={() => step > 0 ? setStep(0) : null}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </header>

      {/* Progress */}
      <div className="h-1 bg-gray-100">
        <div
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Form Content */}
      <main className="flex-1 max-w-lg mx-auto w-full px-6 py-8">

        {/* Step 1: Timeline */}
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">When are you looking to {data.loanPurpose === 'purchase' ? 'buy' : 'refinance'}?</h2>
              <p className="text-gray-500">This helps us match you with the right lenders.</p>
            </div>

            <div className="space-y-3">
              {[
                { v: 'now', l: 'As soon as possible', sub: "I'm ready to move" },
                { v: '3_6', l: 'In the next 3-6 months', sub: 'Actively looking' },
                { v: '6_12', l: 'In the next 6-12 months', sub: 'Planning ahead' },
                { v: 'exploring', l: 'Just exploring', sub: 'Researching my options' },
              ].map(o => (
                <button
                  key={o.v}
                  onClick={() => update('timeline', o.v)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    data.timeline === o.v
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{o.l}</div>
                  <div className="text-sm text-gray-500">{o.sub}</div>
                </button>
              ))}
            </div>

            {data.loanPurpose === 'purchase' && (
              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-gray-700 mb-3">Is this your first home purchase?</p>
                <div className="flex gap-3">
                  {[
                    { v: true, l: 'Yes, first time!' },
                    { v: false, l: "No, I've bought before" },
                  ].map(o => (
                    <button
                      key={String(o.v)}
                      onClick={() => update('firstTimeBuyer', o.v)}
                      className={`flex-1 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        data.firstTimeBuyer === o.v
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 hover:border-emerald-300 text-gray-700'
                      }`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Property */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell me about the property</h2>
              <p className="text-gray-500">Where are you looking?</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <select
                    value={data.propertyState}
                    onChange={e => update('propertyState', e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-0 outline-none"
                  >
                    <option value="">Select</option>
                    <option value="CA">California</option>
                    <option value="TX">Texas</option>
                    <option value="FL">Florida</option>
                    <option value="NY">New York</option>
                    <option value="AZ">Arizona</option>
                    <option value="NV">Nevada</option>
                    <option value="WA">Washington</option>
                    <option value="CO">Colorado</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={data.propertyCity}
                    onChange={e => update('propertyCity', e.target.value)}
                    placeholder="Enter city"
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-0 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What type of property?</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { v: 'single', l: '🏠 Single Family' },
                    { v: 'condo', l: '🏢 Condo' },
                    { v: 'townhouse', l: '🏘️ Townhouse' },
                    { v: 'multi', l: '🏗️ Multi-Family' },
                  ].map(o => (
                    <button
                      key={o.v}
                      onClick={() => update('propertyType', o.v)}
                      className={`p-3 rounded-xl border-2 text-sm transition-all ${
                        data.propertyType === o.v
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estimated price</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                  <input
                    type="text"
                    value={data.estimatedPrice}
                    onChange={e => update('estimatedPrice', e.target.value)}
                    placeholder="400,000"
                    className="w-full p-3 pl-8 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-0 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">How will you use it?</label>
                <div className="flex gap-2">
                  {[
                    { v: 'primary', l: 'Primary Home' },
                    { v: 'secondary', l: 'Second Home' },
                    { v: 'investment', l: 'Investment' },
                  ].map(o => (
                    <button
                      key={o.v}
                      onClick={() => update('occupancyType', o.v)}
                      className={`flex-1 p-3 rounded-xl border-2 text-sm transition-all ${
                        data.occupancyType === o.v
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Financial */}
        {step === 3 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick financial snapshot</h2>
              <p className="text-gray-500">Your best estimates - no credit check performed.</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <span className="text-xl">🔒</span>
              <div className="text-sm text-amber-800">
                <strong>Safe to answer:</strong> This is self-reported. Lenders verify later only if you choose to proceed.
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Estimated credit score</label>
                <div className="space-y-2">
                  {[
                    { v: '750+', l: 'Excellent (750+)' },
                    { v: '700-749', l: 'Good (700-749)' },
                    { v: '650-699', l: 'Fair (650-699)' },
                    { v: '<650', l: 'Below 650' },
                    { v: 'unsure', l: "I'm not sure" },
                  ].map(o => (
                    <button
                      key={o.v}
                      onClick={() => update('creditBand', o.v)}
                      className={`w-full p-3 rounded-xl border-2 text-left text-sm transition-all ${
                        data.creditBand === o.v
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Household income</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { v: '<50k', l: 'Under $50k' },
                    { v: '50-100k', l: '$50k - $100k' },
                    { v: '100-150k', l: '$100k - $150k' },
                    { v: '150k+', l: '$150k+' },
                  ].map(o => (
                    <button
                      key={o.v}
                      onClick={() => update('incomeRange', o.v)}
                      className={`p-3 rounded-xl border-2 text-sm transition-all ${
                        data.incomeRange === o.v
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Employment type</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { v: 'w2', l: 'W-2 Employee' },
                    { v: 'self', l: 'Self-Employed' },
                    { v: '1099', l: '1099 Contractor' },
                    { v: 'retired', l: 'Retired' },
                  ].map(o => (
                    <button
                      key={o.v}
                      onClick={() => update('employmentType', o.v)}
                      className={`p-3 rounded-xl border-2 text-sm transition-all ${
                        data.employmentType === o.v
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Down payment estimate</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                  <input
                    type="text"
                    value={data.downPayment}
                    onChange={e => update('downPayment', e.target.value)}
                    placeholder="80,000"
                    className="w-full p-3 pl-8 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-0 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Contact */}
        {step === 4 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Almost there! How can lenders reach you?</h2>
              <p className="text-gray-500">We'll only share with lenders you're matched with.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full name</label>
                <input
                  type="text"
                  value={data.fullName}
                  onChange={e => update('fullName', e.target.value)}
                  placeholder="John Smith"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-0 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={e => update('email', e.target.value)}
                  placeholder="you@email.com"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-0 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={e => update('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-0 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Preferred contact method</label>
              <div className="flex gap-3">
                {['Email', 'Phone', 'Text'].map(m => (
                  <button
                    key={m}
                    onClick={() => update('preferredContact', m)}
                    className={`flex-1 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      data.preferredContact === m
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-emerald-300 text-gray-600'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.allowMultiple}
                  onChange={e => update('allowMultiple', e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-600">Allow multiple lenders to contact me for competitive quotes</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.consentShare}
                  onChange={e => update('consentShare', e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-600">
                  <strong>I agree</strong> to share my information with participating lenders. I understand this is not a loan application and no credit check will be performed.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & submit</h2>
              <p className="text-gray-500">Make sure everything looks right.</p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Your Goal</div>
                <div className="text-gray-900">
                  {data.loanPurpose === 'purchase' ? '🏠 Buy a home' : data.loanPurpose === 'refinance' ? '🔄 Refinance' : '💰 Cash-out'}
                  <span className="text-gray-500"> • </span>
                  {data.timeline === 'now' ? 'Ready now' : data.timeline === '3_6' ? '3-6 months' : data.timeline === '6_12' ? '6-12 months' : 'Exploring'}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Property</div>
                <div className="text-gray-900">
                  {data.propertyType} in {data.propertyCity || 'TBD'}, {data.propertyState}
                  {data.estimatedPrice && <span className="text-gray-500"> • ${data.estimatedPrice}</span>}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Financial</div>
                <div className="text-gray-900">
                  Credit: {data.creditBand} • Income: {data.incomeRange}
                  {data.downPayment && <span className="text-gray-500"> • Down: ${data.downPayment}</span>}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Contact</div>
                <div className="text-gray-900">{data.fullName}</div>
                <div className="text-sm text-gray-500">{data.email} • {data.phone}</div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div className="text-sm text-emerald-800">
                  <strong>No credit check performed.</strong> You're under no obligation to proceed with any lender.
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Nav */}
      <footer className="border-t bg-white px-6 py-4 sticky bottom-0">
        <div className="max-w-lg mx-auto flex justify-between items-center">
          <button
            onClick={() => setStep(s => Math.max(1, s - 1))}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            ← Back
          </button>
          <button
            onClick={() => {
              if (step === 5) {
                setSubmitted(true);
              } else {
                setStep(s => s + 1);
              }
            }}
            disabled={!canContinue()}
            className={`px-8 py-3 rounded-full font-semibold transition-all ${
              canContinue()
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {step === 5 ? 'Submit' : 'Continue'}
          </button>
        </div>
      </footer>
    </div>
  );
}
