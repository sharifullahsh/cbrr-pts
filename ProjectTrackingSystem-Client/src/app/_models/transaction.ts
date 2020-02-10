export interface Transaction {
    id: number;
    transactionType: string;
    description: string;
    transactionDate: Date;
    currencyName: string;
    exchangeRate: number;
    wbsId: number;
    provinceId: number;
    provinceName: string;
    amount: number;
    wbsName: string;
    currencyId: number;
    transactionTypeId: number;
}