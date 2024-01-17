<script setup lang="ts">
import { Chart } from 'chart.js/auto';

const myChart = ref(null);
let lineChart: Chart<"line", number[], string> | null = null;

const createChart = () => {
    if (myChart.value && !lineChart) {

        const ctx = myChart.value;

        lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'Juny', 'July', 'August', 'September', 'Octuber', 'November', 'December',],
                datasets: [{
                    label: 'Behavior Transactions',
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    fill: true,
                    backgroundColor: '#272234',
                    borderColor: 'green',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,

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
    color: crimson;
}
</style>