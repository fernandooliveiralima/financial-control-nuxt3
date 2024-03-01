<script setup lang="ts">

import { watch } from 'vue';

import { useTransactionsStore } from '../store/transactionsStore';
import { useDateStore } from '../store/dateFilterStore';

const transactionsStore = useTransactionsStore();
const { filteredList, transactions } = storeToRefs(transactionsStore)


const dateStore = ref(useDateStore());
const currentMonth = ref(dateStore.value.getCurrentMonth());

const handleMonthChange = (newMonth: string) => {
    return currentMonth.value = newMonth;
}

const prevMonth = () => {
    let [year, month] = currentMonth.value.split('-');
    let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    currentDate.setMonth(currentDate.getMonth() - 1);
    handleMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`);
}
const nextMonth = () => {
    let [year, month] = currentMonth.value.split('-');
    let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    currentDate.setMonth(currentDate.getMonth() + 1);
    handleMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`);
}

watch([transactions, currentMonth], () => {
    filteredList.value = dateStore.value.filterListByMonth(currentMonth.value, transactions.value);
})

</script>

<template>
    <div class="container-all-transactions">

        <div class="container-title-months">
            <h1>All Transactions</h1>
            <section class="container-months">
                <button @click="prevMonth()" class="Prev Month">Prev Month</button>
                <span>{{ dateStore.formatCurrentMonth(currentMonth) }}</span>
                <button @click="nextMonth()" class="Next Month">Next Month</button>
            </section>
        </div>


        <section class="transaction-body">
            <div class="transaction" v-for="transaction in filteredList" :key="transaction.id"> <!-- v-for() -->
                <!-- <div class="id-section base-column">
                    Id
                    <span>{{ transaction.id }}</span>
                </div> -->
                <div class="description-section base-column">
                    Description
                    <span>{{ transaction.title }}</span>
                </div>
                <div class="date-section base-column">
                    Date
                    <span>{{ dateStore.formatDate(transaction.date) }}</span>
                </div>
                <div class="amount-section base-column-amount">
                    Amount
                    <span :class="transaction.transactionType === 'income' ?
                        'bind-income' : 'bind-expense'">
                        {{ transactionsStore.formatAmounts(Number(transaction.amount)) }}
                    </span>
                </div>
                <div @click="transactionsStore.removeTransaction(transaction.id)" class="delete-section base-column">
                    Delete
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                        <path
                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                </div>
            </div>
        </section>

    </div>
</template>

<style scoped>
/* .container-all-transactions */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {



    .container-title-months {
        @apply flex items-center justify-between w-[60%] ml-[37%];
    }

    .container-title-months h1 {
        @apply text-[cadetblue] font-sans text-4xl text-center mt-4 tracking-[0.3rem];
    }

    .container-months {
        @apply w-[55%] flex items-center justify-between;
    }

    .container-title-months button {
        @apply bg-[olive] cursor-pointer text-[black] w-[35%] text-[1.2rem] p-[0.3rem] rounded-[0.3rem] border-[none] outline-none font-sans;
    }

    .container-title-months span {
        @apply text-[chocolate] text-[1.3rem] font-sans;
    }

    .transaction-body {
        @apply flex flex-col items-center justify-center h-[50rem] overflow-scroll;
    }

    .transaction {
        @apply bg-[#181423] h-28 w-[95%] flex items-center justify-between mt-[5%] rounded-lg;
    }

    .description-section,
    .date-section,
    .id-section,
    .amount-section,
    .delete-section {
        @apply font-sans;
    }

    .id-section span {
        @apply text-[1.3rem] font-sans;

    }

    .date-section span {
        @apply text-[1.3rem] font-sans;

    }

    .amount-section span {
        @apply text-[1.7rem] font-sans font-semibold;

    }

    /* .base-column */
    .base-column {
        @apply text-[white] flex flex-col text-[1.3rem] px-2 py-0;
    }

    /* span */
    .base-column span {
        @apply text-[chocolate] mt-2;
    }

    /* svg */
    .base-column svg {
        @apply cursor-pointer fill-[chocolate] h-6 w-6 mt-2;
    }

    .base-column-amount {
        @apply text-[white] flex flex-col text-[1.3rem] px-2 py-0;
    }

    .base-column-amount span {
        @apply mt-2;
    }

    .bind-income {
        @apply text-[green];
    }

    .bind-expense {
        @apply text-[crimson];
    }
}
</style>