<script setup lang="ts">
import { useTransactionsStore } from '../store/transactionsStore';

const transactionStore = useTransactionsStore();
let { transactions, total, expense, income } = storeToRefs(transactionStore);



onMounted(() => {
    transactionStore.totalTransactions();
})


</script>

<template>
    <div class="container-transactions-info">
        <section class="transactions-details">
            <div class="section-balance base-size">
                <span>Balance</span>
                <div>{{ transactionStore.formatAmounts(total) }}</div>
            </div>
            <div class="section-income base-size">
                <span>Income</span>
                <div>{{ transactionStore.formatAmounts(Number(income)) }}</div>
            </div>
            <div class="section-expense base-size">
                <span>Expense</span>
                <div>{{ transactionStore.formatAmounts(Number(expense)) }}</div>
            </div>

        </section>
    </div>
</template>

<style scoped>
/* .transactions-details */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
    /* .transactions-details */
.transactions-details {
  @apply flex items-center justify-between w-[130%] ml-4 mt-2;
}
/* .section-balance */
.transactions-details .section-balance {
  @apply text-[cornflowerblue] font-[bold] font-sans text-2xl flex flex-col justify-between bg-gradient-to-t from-[cornflowerblue] to-[#181423];
  
}
/* div */
.transactions-details .section-balance div {
  @apply text-[white] text-2xl;
  
}
.transactions-details .section-income {
  @apply text-[green] font-[bold] font-sans text-2xl flex flex-col justify-between bg-gradient-to-t from-[green] to-[#181423];
  
}
/* div */
.transactions-details .section-income div {
  @apply text-[white] text-2xl;
  
}
.transactions-details .section-expense {
  @apply text-[crimson] font-[bold] font-sans text-2xl flex flex-col justify-between bg-gradient-to-t from-[crimson] to-[#181423];
  
}
/* div */
.transactions-details .section-expense div {
  @apply text-[white] text-2xl font-sans;
  
}
/* .base-size */
.transactions-details .base-size {
  @apply bg-[#181423] h-60 w-60 mt-12 p-4 rounded-lg;
}
}
</style>