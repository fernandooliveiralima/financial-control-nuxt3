export type Transaction = {
    id: number;
    title: string;
    amount: number | undefined;
    date: Date;
    transactionType: string;
}