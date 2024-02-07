<script setup lang="ts">
import { Chart } from 'chart.js/auto';

import { useTransactionsStore } from '../store/transactionsStore';
import { useDateStore } from '../store/dateFilterStore';

const transactionStore = useTransactionsStore();
const { transactions } = storeToRefs(transactionStore);
const dateStore = useDateStore();

const myChart = ref(null);
let lineChart: Chart<"line", number[], string> | null = null;

const createLineChart = () => {
    if (myChart.value) {
        let allTransactions = [...transactions.value];
        allTransactions.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));

        let totalAmount = ref(0);
        let datesTransactions = reactive< Array<string> >([]);
        let amountsTransactions = reactive< Array<number> >([]);
        
        allTransactions.forEach(transaction => {
            datesTransactions.push(dateStore.formatDate(transaction.date));
            totalAmount.value += Number(transaction.amount);
            amountsTransactions.push(totalAmount.value);
        });
        let borderColorGraph = computed(()=> totalAmount.value > 0 ? 'green' : 'crimson');

        const ctx = myChart.value;

        if (lineChart) {
            lineChart.data.labels = datesTransactions;
            lineChart.data.datasets[0].data = amountsTransactions;
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
        console.log(`totalAmount ->`,totalAmount.value);
        
    }
    
}

watch(transactions, ()=>{
    createLineChart();
    console.log(`lineChart Value ->`, lineChart?.data.datasets[0].data);
    
    
})

onMounted(() => {
    createLineChart();
    console.log(`lineChart Value ->`, lineChart?.data.datasets[0].data);
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