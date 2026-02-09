export const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
};

export const calculateSIP = (val) => {
    const P = val.investment;
    const n = val.time * 12;
    const i = (val.rate / 100) / 12;

    const totalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const investedAmount = P * n;
    const wealthGain = totalValue - investedAmount;

    return {
        total: Math.round(totalValue),
        invested: Math.round(investedAmount),
        gain: Math.round(wealthGain),
        breakdown: [
            { label: "Invested", value: Math.round(investedAmount) },
            { label: "Wealth Gain", value: Math.round(wealthGain) }
        ]
    };
};

export const calculateLumpsum = (val) => {
    const P = val.investment;
    const n = val.time;
    const r = val.rate / 100;

    const totalValue = P * Math.pow(1 + r, n);
    const wealthGain = totalValue - P;

    return {
        total: Math.round(totalValue),
        invested: Math.round(P),
        gain: Math.round(wealthGain),
        breakdown: [
            { label: "Invested", value: Math.round(P) },
            { label: "Wealth Gain", value: Math.round(wealthGain) }
        ]
    };
};

export const calculateFD = (val) => {
    const P = val.investment;
    const r = val.rate / 100;
    const t = val.time;
    const n = 4; // Quarterly compounding

    const totalValue = P * Math.pow((1 + r / n), (n * t));
    const wealthGain = totalValue - P;

    return {
        total: Math.round(totalValue),
        gain: Math.round(wealthGain),
        breakdown: [
            { label: "Principal", value: Math.round(P) },
            { label: "Interest Earned", value: Math.round(wealthGain) }
        ]
    };
};

export const calculateRetirement = (val) => {
    const yearsToRetire = val.retirement_age - val.current_age;
    const annualExpense = val.monthly_expense * 12;
    const fvExpense = annualExpense * Math.pow(1 + (val.inflation / 100), yearsToRetire);

    // Simple rule: 25x annual expense rule (4% withdrawal rate)
    const corpusNeeded = fvExpense * 25;

    return {
        total: Math.round(corpusNeeded),
        monthly_needed: Math.round(fvExpense / 12),
        years: yearsToRetire,
        breakdown: [
            { label: "Monthly Expense @ Retir.", value: Math.round(fvExpense / 12) },
            { label: "Years to Retire", value: yearsToRetire } // Note: Render as text/value
        ]
    };
};

export const calculateInflation = (val) => {
    const P = val.current_cost;
    const r = val.inflation / 100;
    const n = val.time;

    const futureValue = P * Math.pow(1 + r, n);

    return {
        total: Math.round(futureValue),
        breakdown: [
            { label: "Current Cost", value: Math.round(P) },
            { label: "Future Cost", value: Math.round(futureValue) }
        ]
    };
};

export const calculateCompound = (val) => {
    const P = val.principal;
    const r = val.rate / 100;
    const n = 1;
    const t = val.time;

    const amount = P * Math.pow((1 + r / n), (n * t));
    const cit = amount - P;

    return {
        total: Math.round(amount),
        breakdown: [
            { label: "Principal", value: Math.round(P) },
            { label: "Interest", value: Math.round(cit) }
        ]
    };
};

export const calculateNetWorth = (val) => {
    const netWorth = val.assets - val.liabilities;
    return {
        total: Math.round(netWorth),
        breakdown: [
            { label: "Total Assets", value: val.assets },
            { label: "Total Liabilities", value: val.liabilities }
        ]
    };
};

export const calculateEmergency = (val) => {
    const fund = val.monthly_expense * val.months;
    return {
        total: Math.round(fund),
        breakdown: [
            { label: "Monthly Expense", value: val.monthly_expense },
            { label: "Months Covered", value: val.months }
        ]
    };
};

// AI Insight Generator
export const generateAIInsight = (result, val, type) => {
    let text = "";

    if (type.includes("SIP")) {
        text = `
            <div class="space-y-4">
                <p><strong>🚀 Wealth Creation Strategy:</strong> By consistently investing <span class="highlight">₹${formatNumber(val.investment)}</span> every month for <strong>${val.time} years</strong>, you perform a disciplined financial act known as Dollar-Cost Averaging (in your case, Rupee-Cost Averaging).</p>
                <ul class="list-disc pl-5 space-y-2 text-slate-700">
                    <li>Your <strong>Principal Investment</strong> over this period is only ₹${formatNumber(result.invested)}.</li>
                    <li>However, the power of <strong>Compounding</strong> works in your favor, generating a massive <strong>Wealth Gain</strong> of <span class="highlight">₹${formatNumber(result.gain)}</span>.</li>
                    <li>This means your money worked harder than you did! The interest earned is <span class="highlight">${Math.round((result.gain / result.invested) * 100)}%</span> of your invested capital.</li>
                </ul>
                <p class="mt-2"><strong>💡 Pro Tip:</strong> If you increase your monthly investment by just 10% each year (Step-up SIP), your final corpus could potentially double. Consistency is key!</p>
            </div>
        `;
    }
    else if (type.includes("Mutual Fund") || type.includes("Lumpsum")) {
        text = `
            <div class="space-y-4">
                <p><strong>💰 Lumpsum Growth Potential:</strong> You decided to deploy a one-time capital of <span class="highlight">₹${formatNumber(val.investment)}</span>. At an expected return of <strong>${val.rate}%</strong>, here is how your money grows:</p>
                <ul class="list-disc pl-5 space-y-2 text-slate-700">
                    <li>After <strong>${val.time} years</strong>, your investment swells to <span class="highlight">₹${formatNumber(result.total)}</span>.</li>
                    <li>Your total profit (Wealth Gain) is <span class="highlight">₹${formatNumber(result.gain)}</span>.</li>
                </ul>
                <p class="mt-2"><strong>📈 Analysis:</strong> Lumpsum investments work best when you have idle cash and the market valuations are reasonable. You locked in your money for ${val.time} years, allowing compounding to effectively multiply your capital by <span class="highlight">${(result.total / val.investment).toFixed(1)}x</span>.</p>
            </div>
        `;
    }
    else if (type.includes("Fixed Deposit")) {
        text = `
            <div class="space-y-4">
                <p><strong>🛡️ Capital Protection Strategy:</strong> Fixed Deposits are the bedrock of safe investing. You invested <span class="highlight">₹${formatNumber(val.investment)}</span>.</p>
                <ul class="list-disc pl-5 space-y-2 text-slate-700">
                    <li><strong>Guaranteed Returns:</strong> At <strong>${val.rate}%</strong> interest, you earned a risk-free income of <span class="highlight">₹${formatNumber(result.gain)}</span>.</li>
                    <li><strong>Final Maturity Value:</strong> You will receive <span class="highlight">₹${formatNumber(result.total)}</span> after ${val.time} years.</li>
                </ul>
                <p class="mt-2"><strong>💡 Inflation Alert:</strong> While safe, ensure your FD return rate (${val.rate}%) beats the current inflation rate. If inflation is higher, your real purchasing power might actually decrease.</p>
            </div>
        `;
    }
    else if (type.includes("Retirement")) {
        text = `
             <div class="space-y-4">
                <p><strong>freedom Planning Analysis:</strong> Retirement planning is all about inflation management. You currently value your lifestyle at <strong>₹${formatNumber(val.monthly_expense)}/month</strong>.</p>
                <ul class="list-disc pl-5 space-y-2 text-slate-700">
                    <li><strong>Inflation Impact:</strong> Assuming ${val.inflation}% inflation, in ${result.years} years, you will need <span class="highlight">₹${formatNumber(result.monthly_needed)}/month</span> to buy the *exact same* things you buy today.</li>
                    <li><strong>Corpus Goal:</strong> To sustain this lifestyle without working, you need a nest egg of <span class="highlight">₹${formatNumber(result.total)}</span>.</li>
                </ul>
                <p class="mt-2"><strong>🚀 Action Plan:</strong> Start expecting this reality. If you rely solely on savings, you might fall short. allocating equity in your portfolio is crucial to beat inflation over the long term.</p>
            </div>
        `;
    }
    else if (type.includes("Inflation")) {
        text = `
            <div class="space-y-4">
                <p><strong>💸 The Silent Tax:</strong> Inflation erodes the value of money over time. You are analyzing the future cost of an item currently priced at <span class="highlight">₹${formatNumber(val.current_cost)}</span>.</p>
                <p>At an inflation rate of <strong>${val.inflation}%</strong> for <strong>${val.time} years</strong>:</p>
                <ul class="list-disc pl-5 space-y-2 text-slate-700">
                    <li><strong>Future Price Shock:</strong> This same item/service will cost <span class="highlight">₹${formatNumber(result.total)}</span>.</li>
                    <li>The price has increased by <span class="highlight">${((result.total - val.current_cost) / val.current_cost * 100).toFixed(0)}%</span>.</li>
                </ul>
                <p class="mt-2"><strong>💡 Investment Implication:</strong> Any investment you make MUST generate returns higher than ${val.inflation}% (post-tax), otherwise, you are technically losing money.</p>
            </div>
        `;
    }
    else if (type.includes("Net Worth")) {
        const isPositive = result.total >= 0;
        text = `
             <div class="space-y-4">
                <p><strong>📊 Financial Health Check:</strong> Your Net Worth is the ultimate scorecard of your financial life.</p>
                <ul class="list-disc pl-5 space-y-2 text-slate-700">
                    <li><strong>Total Assets (What you own):</strong> ₹${formatNumber(val.assets)}</li>
                    <li><strong>Total Liabilities (What you owe):</strong> ₹${formatNumber(val.liabilities)}</li>
                </ul>
                <div class="p-3 ${isPositive ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'} rounded-lg border mt-2">
                    <strong> Verdict:</strong> ${isPositive
                ? `You have a <span class="highlight">Positive Net Worth of ₹${formatNumber(result.total)}</span>. You are solvent and building wealth. Focus on accumulating distinct income-generating assets.`
                : `You have a <span class="highlight">Negative Net Worth of -₹${formatNumber(Math.abs(result.total))}</span>. Your debts exceed your assets. Prioritize clearing high-interest debt immediately.`}
                </div>
            </div>
        `;
    }
    else if (type.includes("Emergency")) {
        text = `
             <div class="space-y-4">
                <p><strong>🚨 Crisis Management:</strong> An emergency fund is not an investment; it's insurance for your peace of mind.</p>
                <ul class="list-disc pl-5 space-y-2 text-slate-700">
                    <li>To survive for <strong>${val.months} months</strong> without any income, based on your monthly expenses of ₹${formatNumber(val.monthly_expense)}, you need:</li>
                    <li><span class="highlight text-xl">₹${formatNumber(result.total)}</span> in a liquid account.</li>
                </ul>
                <p class="mt-2"><strong>💡 Where to park this?</strong> Do not lock this in long-term assets. Keep it in a Savings Account or a Liquid Mutual Fund where you can access it instantly.</p>
            </div>
        `;
    }
    else {
        text = `<strong>Result:</strong> Your calculated value is ₹${formatNumber(result.total)}.`;
    }

    return text;
};
