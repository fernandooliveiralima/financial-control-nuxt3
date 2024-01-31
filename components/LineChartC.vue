<script setup lang="ts">
import { Chart } from 'chart.js/auto';

import { useTransactionsStore } from '../store/transactionsStore';
import { useDateStore } from '../store/dateFilterStore';

const transactionStore = useTransactionsStore();
const { transactions } = storeToRefs(transactionStore);
const dateStore = useDateStore();

const myChart = ref(null);
let lineChart: Chart<"line", number[], string> | null = null;

const createChart = () => {
    if (myChart.value && !lineChart) {

        /* let allTransactions = [...transactions.value];
        allTransactions
            .sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)))

        let totalTransactions = ref(0);
        let datesTransactions: Array<string> = reactive([]);
        let amountsTransactions: Array<number> = reactive([]);

        allTransactions.forEach((transaction) => {
            const formatDate = ref(dateStore.formatDate(transaction.date))
            datesTransactions.push(`${formatDate}`)
            totalTransactions.value += Number(transaction.amount);
            amountsTransactions.push(Number(totalTransactions));
        })

        const colorGraph = computed(()=> totalTransactions.value > 0 ? '#008000' : '#dc143c'); */

        const ctx = myChart.value;

        lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'Juny', 'July', 'August', 'September', 'Octuber', 'November', 'December',],
                datasets: [{
                    label: 'Behavior Transactions',
                    data: [1,2,3,4,5,6,7,8,9,10,11,12],
                    fill: true,
                    backgroundColor: '#181423',
                    tension: 0.1,
                    borderColor: `crimson`
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        ticks: {
                            display: false
                        },
                        grid: {
                            color: '#272234'
                        }
                    },
                    x: {
                        grid: {
                            color: '#272234'
                        }
                    }
                }
            }
        })
        
    }
}

onMounted(() => {
    createChart();
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

<style lang="scss" scoped>
/* .line-chart */
.line-chart {

    height: 17rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;

    /* .chart */
    .chart {

        height: 100%;
        width: 35rem;
        display: flex;
        align-items: center;
        justify-content: center;



    }
}

.income {
    color: green;
}

.expense {
    color: #dc143c;
}
</style>