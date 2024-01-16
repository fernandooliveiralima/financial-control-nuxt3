<script setup lang="ts">

</script>

<template>
    <div class="container-totalBalance">
        
        <section class="totalBalance-details">
            <div class="totalBalance-elements">
                <span class="total-title">Total Balance</span>
                <div class="total-balance">1.200,00</div>
            </div>

            <div class="line-chart">Behavior Line Graph Chartjs</div>
        </section>

    </div>
</template>

<style lang="scss" scoped>
    

    /* .container-totalBalance */
    .container-totalBalance{
        margin-bottom: -20rem;
        margin-right: 1rem;
        width: 40%;
        
    }

    /* .totalBalance-details */
    .totalBalance-details{
        background-color: #181423;
        border-radius: 0.5rem;
        color: white;
        height: 30rem;
        width: 100%;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        /* .totalBalance-elements */
        .totalBalance-elements{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            height: 30%;
            width: 100%;

            /* .total-title */
            .total-title{
                font-size: 3rem;
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                color: cadetblue;
            }

            /* .total-balance */
            .total-balance{
                font-family: 'Alice', serif;
                font-size: 3rem;
            }
        }

        /* .line chart */
        .line-chart{
            margin-top: 20%;
        }
    }
</style>