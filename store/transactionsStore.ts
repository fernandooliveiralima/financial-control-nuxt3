import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { Transaction } from '~/types/transaction';

export const useTransactionsStore = defineStore('transactionsStore', () => {

    const total = ref(0);

    let filteredList: Ref<Array<Transaction>> = ref([]);
    let transactions: Array<Transaction> = reactive([]);

    const addTransactions = (transaction: Transaction) => {
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
    const income = computed(() => {
        return transactions
            .filter((amountTransaction) => Number(amountTransaction.amount) > 0)
            .map((incomeAmount) => incomeAmount.amount)
            .reduce((acc, incomeTransaction) => Number(acc) + Number(incomeTransaction), 0)
    })

    /* expense */
    const expense = computed(() => {
        return transactions
            .filter((amountTransaction) => Number(amountTransaction.amount) < 0)
            .map((incomeAmount) => incomeAmount.amount)
            .reduce((acc, expenseTransaction) => Number(acc) + Number(expenseTransaction), 0)
    })

    const removeTransaction = (id: number) => {
        transactions = transactions.filter((item) => item.id !== id);
        filteredList.value = filteredList.value.filter((item) => item.id !== id);
        totalTransactions();
    }

    const formatAmounts = (amount: number)=>{
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)
    }


    return {
        total,
        transactions,
        income,
        expense,
        filteredList,
        addTransactions,
        removeTransaction,
        formatAmounts,
        totalTransactions,
    }
})