<script setup lang="ts">
import { Chart } from 'chart.js/auto';

import { useTransactionsStore } from '../store/transactionsStore';
import { useDateStore } from '../store/dateFilterStore';

const transactionStore = useTransactionsStore();
const { filteredList, transactions, total } = storeToRefs(transactionStore);
const dateStore = useDateStore();

const myChart = ref(null);
let lineChart: Chart<"line", number[], string> | null = null;

const createLineChart = () => {
    if (myChart.value && !lineChart) {

        let allTransactions = reactive([...transactions.value]);
        allTransactions.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));

        let totalTransactions = ref(0);
        let datesTransactions: Array<any> = reactive([]);
        let amountsTransactions: Array<number> = reactive([]);

        allTransactions.forEach((transaction) => {
            const formatDate = ref(dateStore.formatDate(transaction.date))
            datesTransactions.push(formatDate)

            totalTransactions.value += Number(transaction.amount);
            amountsTransactions.push(Number(totalTransactions.value));

            if (lineChart && Number(transaction.amount) > 0 && transaction.transactionType === 'income') {
                lineChart.data.datasets[0].data = amountsTransactions;
                lineChart.update();

            } else if (lineChart && Number(transaction.amount) < 0 && transaction.transactionType === 'expense') {
                lineChart.data.datasets[0].data = amountsTransactions;
                lineChart.update();
            }
            

        })
        const colorGraph = computed(() => totalTransactions.value > 0 ? 'green' : 'crimson');

        const ctx = myChart.value;

        lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'Juny', 'July', 'August', 'September', 'Octuber', 'November', 'December',],
                datasets: [{
                    label: 'Behavior Transactions',
                    data: amountsTransactions,
                    fill: false,
                    backgroundColor: '#181423',
                    tension: 0.1,
                    borderColor: colorGraph.value
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