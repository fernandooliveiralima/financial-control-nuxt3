<script setup lang="ts">
import { Chart } from 'chart.js/auto';

import { useTransactionsStore } from '../store/transactionsStore';

const transactionsStore = useTransactionsStore();
const { transactions, expense, total, income } = storeToRefs(transactionsStore);

const myChart = ref(null);
let doughnutChart: Chart<"doughnut", number[], string> | null = null;
const basePercentualValue = ref(100);

/* methods */

const calculatePercentualValue = computed(()=>{
    const calculatePercentual = ( Number( income.value) - Math.abs(Number(expense.value) ) ) / Number(income.value) * basePercentualValue.value;
    
    if(calculatePercentual === -Infinity){return 0;}
    else if(calculatePercentual < 0){return calculatePercentual}
    else if(calculatePercentual > 0){return calculatePercentual}
    else if(isNaN(calculatePercentual)){return 0;}

    return calculatePercentual;
})

const createChart = () => {
    if (myChart.value && !doughnutChart) {

        const ctx = myChart.value;

        doughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [ 'Income', 'Expense'],
                datasets: [{
                    data: [ Number(income.value), Number(expense.value)],
                    borderWidth: 0,
                    hoverOffset: 5,
                    backgroundColor: [ 'green', 'crimson'],
                }]
            },
            options: {
                responsive: true,
                cutout: 90
            }
        })

    }
}

const updatePercentualChart = ()=>{
    let allTransactions = [...transactions.value];

    allTransactions.forEach((transaction) => {
        if (doughnutChart && transaction.transactionType === 'income' && Number(transaction.amount) > 0) {
            doughnutChart.data.datasets[0].data[0] = Number(income.value);
            
            doughnutChart.update();

        } else if (doughnutChart && transaction.transactionType === 'expense' && Number(transaction.amount) < 0) {
            doughnutChart.data.datasets[0].data[1] = Number(expense.value); 
            
            doughnutChart.update();
        }
    })
}

const absPercentualValue = computed(()=> Math.abs(calculatePercentualValue.value) )

watch([transactions, total, expense], () => {
    updatePercentualChart();
    
})

onMounted(() => {
    createChart();
    
})

</script>

<template>
    <div>

        <section class="doughnut-chart">
            <div class="chart">
                <canvas ref="myChart"></canvas>
                <span 
                :class=" total > 0 ? 'percentual-value income' 
                : 
                'percentual-value expense' ">{{ parseInt(`${absPercentualValue}`) }}%</span>
                
            </div>
        </section>

    </div>
</template>

<style  scoped>
/* .doughnut-chart */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
    .doughnut-chart {
      @apply h-[17rem] w-full flex items-center justify-center mt-4;
    }
    
    .chart {
      @apply h-full w-[15%] flex items-center justify-center relative;
    }
    
    .percentual-value {
      @apply text-[2.5rem] absolute font-semibold top-[45%] font-sans;
      
    }
    .income {
      @apply text-[green];
    }
    .expense {
      @apply text-[crimson];
    }

}

</style>