<script setup lang="ts">
import { Chart } from 'chart.js/auto';

import { useTransactionsStore } from '../store/transactionsStore';
import { useDateStore } from '../store/dateFilterStore';

const transactionsStore = useTransactionsStore();
const { filteredList, transactions, total, income, expense } = storeToRefs(transactionsStore);
const dateStore = useDateStore();

const myChart = ref(null);
let lineChart: Chart<"line", number[], string> | null = null;


const createLineChart = () => {
    if (myChart.value) {
        let allTransactions = [...transactions.value];
        allTransactions.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));

        let totalAmount = ref(0);
        let datesTransactions = reactive<Array<string>>([]);
        let amountsTransactions = reactive<Array<number>>([]);
        let transactionTypes = ref('');

        allTransactions.forEach(transaction => {
            datesTransactions.push(dateStore.formatDate(transaction.date));
            totalAmount.value += Number(transaction.amount);
            amountsTransactions.push(totalAmount.value);
            transactionTypes.value = transaction.transactionType
        });

        let borderColorGraph = computed(() => total.value > 0 ? 'green' : 'crimson');

        const ctx = myChart.value;

        if (lineChart) {
            lineChart.data.labels = datesTransactions
            lineChart.data.datasets[0].data = amountsTransactions;
            lineChart.data.datasets[0].borderColor = borderColorGraph.value
            lineChart.update();
        } else {
            lineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: datesTransactions,
                    datasets: [{
                        label: 'Behavior Transactions',
                        data: amountsTransactions,
                        fill: false,
                        backgroundColor: '#181423',
                        tension: 0.1,
                        borderColor: borderColorGraph.value
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            ticks: { display: false },
                            grid: { color: '#272234' }
                        },
                        x: { grid: { color: '#272234' } }
                    }
                }
            });
        }


    }

}



watch(total, () => {
    createLineChart();

})

onMounted(() => {
    createLineChart();

})


</script>

<template>
    <div>

        <section class="line-chart">
            <div class="chart">
                <canvas ref="myChart"></canvas>
            </div>
        </section>

    </div>
</template>

<style  scoped>
/* .line-chart */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {

    /* .line-chart */
    .line-chart {
        @apply h-[17rem] w-full flex items-center justify-center mt-4;
    }

    /* .chart */
    .line-chart .chart {
        @apply h-full w-[35rem] flex items-center justify-center;
    }

    .income {
        @apply text-[green];
    }

    .expense {
        @apply text-[#dc143c];
    }
}</style>