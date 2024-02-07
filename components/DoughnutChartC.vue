<script setup lang="ts">
import { Chart } from 'chart.js/auto';

import { useTransactionsStore } from '../store/transactionsStore';

const transactionStore = useTransactionsStore();
const { transactions, expense, income, total } = storeToRefs(transactionStore);

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
            doughnutChart.data.datasets[0].data[1] =  Number(expense.value);
            doughnutChart.update();
        }
    })
}

watch([transactions, total, income, expense], () => {
    updatePercentualChart();
    console.log(`doughnutChart Value ->`, doughnutChart?.data.datasets[0].data);
    
    
})

onMounted(() => {
    createChart();
    console.log(`doughnutChart Value ->`, doughnutChart?.data.datasets[0].data);
})

</script>

<template>
    <div>

        <section class="doughnut-chart">
            <div class="chart">
                <canvas ref="myChart"></canvas>
                <span class="percentual-value">{{ Math.abs( parseInt(`${calculatePercentualValue}`) ) }}%</span>
                
            </div>
        </section>

    </div>
</template>

<style lang="scss" scoped>
/* .doughnut-chart */
.doughnut-chart {
    height: 17rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;

    /* .chart */
    .chart {
        height: 100%;
        width: 15%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        /* .percentual-value */
        .percentual-value {
            color: cornflowerblue;
            font-size: 2.5rem;
            position: absolute;
            top: 45%;
            font-family: 'Alice', serif;
            font-weight: 600;
        }
    }
}

</style>