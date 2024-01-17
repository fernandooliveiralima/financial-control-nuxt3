<script setup lang="ts">
    import { Chart } from 'chart.js/auto';
    
    const myChart = ref(null);
    let doughnutChart: Chart<"doughnut", number[], string> | null = null;

    const createChart = ()=>{
        if(myChart.value && !doughnutChart){

            const ctx = myChart.value;

            doughnutChart = new Chart(ctx, {
                type: 'doughnut',
                data:{
                    labels:['Expense', 'Income'],
                    datasets:[{
                        data:[1,2],
                        borderWidth: 0,
                        hoverOffset: 5,
                        backgroundColor: ['crimson', 'green'],
                        
                    }]
                },
                options:{
                    responsive: true,
                    cutout: 90
                }
            })

        }
    }

    onMounted(()=>{
        createChart();
    })
</script>

<template>
    <div>

        <section class="doughnut-chart">
            <div class="chart">
                <canvas ref="myChart"></canvas>
                <span class="percentual-value income">100%</span>
            </div>
        </section>

    </div>
</template>

<style lang="scss" scoped>
    /* .doughnut-chart */
    .doughnut-chart{
        height: 17rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1rem;

        /* .chart */
        .chart{
            height: 100%;
            width: 15%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            /* .percentual-value */
            .percentual-value{
                font-size: 2.5rem;
                position: absolute;
                top: 45%;
                font-family: 'Alice', serif;
                font-weight: 600;
            }
        }
    }

    .income{
        color: green;
    }
    .expense{
        color: crimson;
    }

</style>