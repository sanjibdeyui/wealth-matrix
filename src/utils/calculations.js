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
        text = `<strong>Growth Strategy:</strong> Investing <span class="highlight">₹${formatNumber(val.investment)}</span> monthly for ${val.time} years could turn into <span class="highlight">₹${formatNumber(result.total)}</span>. You earn <span class="highlight">₹${formatNumber(result.gain)}</span> as pure profit from compounding.`;
    }
    else if (type.includes("Mutual Fund")) {
        text = `<strong>Lumpsum Power:</strong> Your one-time investment of ₹${formatNumber(val.investment)} grows to ₹${formatNumber(result.total)} at ${val.rate}% returns.`;
    }
    else if (type.includes("Fixed Deposit")) {
        text = `<strong>Safe Returns:</strong> Keep your money safe and earn ₹${formatNumber(result.gain)} in interest comfortably.`;
    }
    else if (type.includes("Retirement")) {
        text = `<strong>Future Planning:</strong> To maintain your lifestyle (₹${formatNumber(val.monthly_expense)}/mo today), you will need ₹${formatNumber(result.monthly_needed)}/mo when you retire. You should aim for a corpus of <span class="highlight">₹${formatNumber(result.total)}</span>. Start investing early!`;
    }
    else if (type.includes("Inflation")) {
        text = `<strong>Buying Power:</strong> What costs ₹${formatNumber(val.current_cost)} today will cost <span class="highlight">₹${formatNumber(result.total)}</span> in ${val.time} years due to ${val.inflation}% inflation.`;
    }
    else if (type.includes("Net Worth")) {
        text = result.total > 0
            ? `<strong>Good Standing:</strong> You have a positive net worth of ₹${formatNumber(result.total)}. Keep reducing liabilities!`
            : `<strong>Alert:</strong> Your liabilities exceed your assets by ₹${formatNumber(Math.abs(result.total))}. Focus on paying down debt.`;
    }
    else if (type.includes("Emergency")) {
        text = `<strong>Safety Net:</strong> You need <span class="highlight">₹${formatNumber(result.total)}</span> saved in a liquid account to survive ${val.months} months without income.`;
    }
    else {
        text = `<strong>Result:</strong> Your calculated value is ₹${formatNumber(result.total)}.`;
    }

    return text;
};
