export interface Investment {
    name: string,
    buyingPrice: number,
    quantity: number,
}

export interface Savings {
    totalAmount: number
}

export interface Transaction {
    id: string,
    name: string,
    costPrice: number,
    sellPrice: number,
    time: Date
}

export interface Wallet {
    userId: string,
    investments: Investment[],
    savings: Savings,
    transactions: Transaction[]
}