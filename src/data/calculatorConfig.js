// Maps calculator types to their config and logic keys
export const calculators = {
    sip: {
        title: "SIP Calculator",
        icon: "ChartLine",
        description: "Calculate returns on your monthly Systematic Investment Plans.",
        inputs: [
            { id: "investment", label: "Monthly Investment", type: "number", min: 500, max: 1000000, step: 500, default: 5000, unit: "₹" },
            { id: "rate", label: "Expected Return Rate (p.a)", type: "number", min: 1, max: 30, step: 0.1, default: 12, unit: "%" },
            { id: "time", label: "Time Period", type: "number", min: 1, max: 40, step: 1, default: 10, unit: "Yr" }
        ],
        logicKey: "sip"
    },
    fd: {
        title: "Fixed Deposit Calculator",
        icon: "PiggyBank",
        description: "Check interest earnings on your Fixed Deposits.",
        inputs: [
            { id: "investment", label: "Total Investment", type: "number", min: 5000, max: 10000000, step: 1000, default: 100000, unit: "₹" },
            { id: "rate", label: "Interest Rate (p.a)", type: "number", min: 3, max: 15, step: 0.1, default: 6.5, unit: "%" },
            { id: "time", label: "Time Period", type: "number", min: 1, max: 10, step: 1, default: 5, unit: "Yr" }
        ],
        logicKey: "fd"
    },
    mf: {
        title: "Mutual Fund Returns",
        icon: "Coins",
        description: "Estimate returns on your Lumpsum mutual fund investments.",
        inputs: [
            { id: "investment", label: "Total Investment", type: "number", min: 5000, max: 10000000, step: 1000, default: 25000, unit: "₹" },
            { id: "rate", label: "Expected Return Rate (p.a)", type: "number", min: 1, max: 30, step: 0.1, default: 12, unit: "%" },
            { id: "time", label: "Time Period", type: "number", min: 1, max: 40, step: 1, default: 5, unit: "Yr" }
        ],
        logicKey: "mf"
    },
    retirement: {
        title: "Retirement Planner",
        icon: "Umbrella",
        description: "Plan your carefree retirement with AI projections.",
        inputs: [
            { id: "current_age", label: "Current Age", type: "number", min: 18, max: 60, step: 1, default: 25, unit: "Yr" },
            { id: "retirement_age", label: "Retirement Age", type: "number", min: 40, max: 80, step: 1, default: 60, unit: "Yr" },
            { id: "monthly_expense", label: "Current Monthly Expense", type: "number", min: 5000, max: 500000, step: 1000, default: 30000, unit: "₹" },
            { id: "inflation", label: "Inflation Rate", type: "number", min: 1, max: 15, step: 0.1, default: 6, unit: "%" }
        ],
        logicKey: "retirement"
    },
    inflation: {
        title: "Inflation Calculator",
        icon: "TrendingUp",
        description: "See what your money will be worth in the future.",
        inputs: [
            { id: "current_cost", label: "Current Cost", type: "number", min: 1000, max: 10000000, step: 500, default: 100000, unit: "₹" },
            { id: "inflation", label: "Inflation Rate", type: "number", min: 1, max: 15, step: 0.1, default: 6, unit: "%" },
            { id: "time", label: "Time Period", type: "number", min: 1, max: 50, step: 1, default: 10, unit: "Yr" }
        ],
        logicKey: "inflation"
    },
    compound: {
        title: "Compound Interest",
        icon: "Atom",
        description: "The power of compounding explained simply.",
        inputs: [
            { id: "principal", label: "Principal Amount", type: "number", min: 1000, max: 10000000, step: 1000, default: 10000, unit: "₹" },
            { id: "rate", label: "Interest Rate", type: "number", min: 1, max: 20, step: 0.1, default: 8, unit: "%" },
            { id: "time", label: "Time Period", type: "number", min: 1, max: 50, step: 1, default: 10, unit: "Yr" }
        ],
        logicKey: "compound"
    },
    networth: {
        title: "Net Worth",
        icon: "Wallet",
        description: "Track your assets vs liabilities.",
        inputs: [
            { id: "assets", label: "Total Assets", type: "number", min: 0, max: 100000000, step: 10000, default: 500000, unit: "₹" },
            { id: "liabilities", label: "Total Liabilities", type: "number", min: 0, max: 100000000, step: 10000, default: 100000, unit: "₹" }
        ],
        logicKey: "networth"
    },
    emergency: {
        title: "Emergency Fund",
        icon: "ShieldAlert", // Replaced kit-medical with ShieldAlert or similar if not found, but Lucide has Shield
        description: "Calculate the safety net you need.",
        inputs: [
            { id: "monthly_expense", label: "Monthly Expense", type: "number", min: 5000, max: 500000, step: 1000, default: 25000, unit: "₹" },
            { id: "months", label: "Months of Cover Needed", type: "number", min: 1, max: 24, step: 1, default: 6, unit: "Mo" }
        ],
        logicKey: "emergency"
    }
};
