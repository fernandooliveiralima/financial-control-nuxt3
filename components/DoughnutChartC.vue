<script setup lang="ts">
import { Chart } from 'chart.js/auto';

import { useTransactionsStore } from '../store/transactionsStore';

const transactionStore = useTransactionsStore();
const {filteredList, transactions, expense, income, total } = storeToRefs(transactionStore);

const myChart = ref(null);
let doughnutChart: Chart<"doughnut", number[], string> | null = null;
const basePercentualValue = ref(100);

/* methods */

//const allTransactions = reactive([...transactions.value]);
const calculatePercentualValue = computed(()=>{
    const calculatePercentual = ( Number( income.value) - Math.abs(Number(expense.value) ) ) / Number(income.value) * basePercentualValue.value;
    
    if(calculatePercentual === -Infinity){
        console.log(`-> CALCULATE PERCENTUAL INFINITA`);
        return 0;

    }else if(calculatePercentual < 0){
        console.log(`-> CALCULATE PERCENTUAL MENOR QUE 0`);
        return calculatePercentual;

    }else if(calculatePercentual > 0){
        console.log(`-> CALCULATE PERCENTUAL MAIOR QUE 0`);
        return calculatePercentual

    }else if(isNaN(calculatePercentual)){
        console.log(`is Nan`);
        return 0;
    }

    return calculatePercentual;
})
//return ( Number( income.value) - Math.abs(Number(expense.value) ) ) / Number(income.value) * basePercentualValue.value;

const createChart = () => {
    if (myChart.value && !doughnutChart) {

        const ctx = myChart.value;

        doughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['', 'Income', 'Expense'],
                datasets: [{
                    data: [1, Number(income.value), Number(expense.value)],
                    borderWidth: 0,
                    hoverOffset: 5,
                    backgroundColor: ['cornflowerblue', 'green', 'crimson'],
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
    transactions.value.forEach((transaction) => {
        if (doughnutChart && transaction.transactionType === 'income' && Number(transaction.amount) > 0) {
            doughnutChart.data.datasets[0].data[0] = 0
            doughnutChart.data.datasets[0].data[1] = Number(income.value);
            doughnutChart.update();
        } else if (doughnutChart && transaction.transactionType === 'expense' && Number(transaction.amount) < 0) {
            doughnutChart.data.datasets[0].data[0] = 1
            doughnutChart.data.datasets[0].data[2] = Number(expense.value);
            doughnutChart.update();
        }
    })
}

watch([transactions, total, income, expense], () => {
    
    updatePercentualChart();
    
    console.log(`total ->`,total.value);
    console.log(`income ->`,income.value);
    console.log(`expense ->`,expense.value);
    console.log(`transactions ->`,transactions.value);
    console.log(`filteredList ->`,filteredList.value.length);
    console.log(`transactionsLength ->`,transactions.value.length);
    console.log(`calculatePercentualValue ->`,calculatePercentualValue.value);
})

onMounted(() => {
    createChart();
    console.log(`total ->`,total.value);
    console.log(`income ->`,income.value);
    console.log(`expense ->`,expense.value);
    console.log(`transactions ->`,transactions.value);
    console.log(`filteredList ->`,filteredList.value.length);
    console.log(`transactionsLength ->`,transactions.value.length);
    console.log(`calculatePercentualValue ->`,calculatePercentualValue.value);
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

.income {
    color: green;
}

.expense {
    color: crimson;
}
</style>