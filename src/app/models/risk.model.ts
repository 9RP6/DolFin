export enum AgeRange {
    RETIREES = "60-80",
    YOUNG = "18-24",
    WORKING = "25-44",
    OLDIES = "45-59"
}

export enum FinancialGoal {
    HOUSE = "house",
    CAR = "car",
    WEDDING = "wedding",
    MEDICAL = "medical",
    OTHER = "other"
}

export enum RiskProfile {
    VERY_CONSERVATIVE = 0,
    CONSERVATIVE = 0.2,
    MODERATELY_CONSERVATIVE = 0.4,
    NEITHER = 0.5,
    MODERATELY_AGGRESSIVE = 0.6,
    AGGRESSIVE = 0.8,
    VERY_AGGRESSIVE = 1
}

export interface Risk {
    savings: number,
    ageRange: AgeRange,
    income: number,
    financialGoal: number,
    riskProfile?: RiskProfile
}