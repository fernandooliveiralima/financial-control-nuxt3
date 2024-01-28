import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { Transaction } from '~/types/transaction';

export const useTransactionsStore = defineStore('transactionsStore', ()=>{
    const total = ref(0);
    let filteredList: Array<Transaction> = reactive([]);
    
    let transactions: Array<Transaction> = reactive([
        {
            id: 1, 
            title: 'teste 1', 
            date: new Date(2023,1,12), 
            amount: 100, 
            transactionType: 'income'
        },
        {
            id: 2, 
            title: 'teste 2', 
            date: new Date(2024,0,20), 
            amount: -50, 
            transactionType: 'expense'
        }
    ]);

    const addTransactions = (transaction: Transaction)=>{
        transactions.unshift(transaction);
        totalTransactions();
    }

    const totalTransactions = (): number => {
        const totalValues = transactions.length > 0 
        ? transactions
        .map((amountTransaction) => amountTransaction.amount)
        .reduce((acc, amount) => Number(acc) + Number(amount), 0)
        : 0;

        total.value = Number(totalValues);
        return Number(totalValues);
    }

    /* income */
    const income = computed(()=>{
        return transactions
        .filter((amountTransaction) => Number(amountTransaction.amount) > 0)
        .map((incomeAmount)=> incomeAmount.amount)
        .reduce((acc, amount) => Number(acc) + Number(amount))
    })

    /* expense */
    const expense = computed(()=>{
        return transactions
        .filter((amountTransaction) => Number(amountTransaction.amount) < 0)
        .map((incomeAmount)=> incomeAmount.amount)
        .reduce((acc, amount) => Number(acc) + Number(amount))
    })

    return {
        total,
        transactions,
        income,
        expense,
        filteredList,
        addTransactions, 
        totalTransactions,
        
    }
})