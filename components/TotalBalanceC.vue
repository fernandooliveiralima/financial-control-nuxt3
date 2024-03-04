<script setup lang="ts">
import { useTransactionsStore } from '../store/transactionsStore';

const transactionStore = useTransactionsStore();
const { total } = storeToRefs(transactionStore)
const currentTotal = ref(transactionStore.totalTransactions())

onMounted(() => {
    currentTotal.value;
})
</script>

<template>
    <div class="container-totalBalance">

        <section class="totalBalance-details">
            <div class="totalBalance-elements">
                <span class="total-title">Total Balance</span>
                <div 
                :class="total > 0 ? 'total-balance income' : 
                'total-balance expense' ">
                {{ transactionStore.formatAmounts(total) }}
            </div>
            </div>

            <section class="line-chart-component">
                <LineChartC></LineChartC>
            </section>
        </section>

    </div>
</template>

<style scoped>
/* .container-totalBalance */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
    /* .container-totalBalance */
.container-totalBalance {
  @apply mb-[-20rem] w-[40rem] ml-[-45rem];
}

/* .totalBalance-details */
.totalBalance-details {
  @apply bg-[#181423] text-[white] h-[30rem] w-full flex flex-col items-center p-4 rounded-lg;
}
/* .totalBalance-elements */
.totalBalance-details .totalBalance-elements {
  @apply flex flex-col items-center justify-between h-[30%] w-full;
}
/* .total-title */
.totalBalance-details .totalBalance-elements .total-title {
  @apply text-5xl text-[cadetblue] font-sans;
  
}
/* .total-balance */
.totalBalance-details .totalBalance-elements .total-balance {
  @apply text-5xl font-sans;
  
}
.totalBalance-details .income {
  @apply text-[green];
}
.totalBalance-details .expense {
  @apply text-[crimson];
}
}
</style>