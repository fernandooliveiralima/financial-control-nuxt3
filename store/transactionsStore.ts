import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { Transaction } from '~/types/transaction';

export const useTransactionsStore = defineStore('transactionsStore', ()=>{
    
    const transactions: Array<Transaction> = reactive([
        {
            id: 1, 
            title: 'teste 1', 
            date: new Date(2023,0,12), 
            amount: 120, 
            transactionType: 'income'
        },
        {
            id: 2, 
            title: 'teste 2', 
            date: new Date(2024,1,20), 
            amount: -23, 
            transactionType: 'expense'
        },
        {
            id: 3, 
            title: 'teste 3', 
            date: new Date(2025,2,7), 
            amount: 47, 
            transactionType: 'income'
        },
    ]);

    

    return {transactions}
})