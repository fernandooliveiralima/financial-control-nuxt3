export type Transaction = {
    id: number;
    title: string;
    amount: number | undefined;
    date: Date | string;
    transactionType: string;
}