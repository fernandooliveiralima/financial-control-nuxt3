import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { Transaction } from '~/types/transaction';

export const useTransactionsStore = defineStore('transactionsStore', ()=>{
    
    const total = ref(0);

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
        }
    ]);

    

    return {total, transactions}
})