<template>
    <div class="homePage-container">
        <section class="home-components">
            <HeaderC></HeaderC>

            <div class="transactions-data">
                <TransactionsInfoC></TransactionsInfoC>
                <TotalBalanceC></TotalBalanceC>
                
            </div>
            
            <FormTransactionsC></FormTransactionsC>
            <DoughnutChartC></DoughnutChartC>
            
        </section>

    </div>
</template>

<script setup lang="ts">
    
</script>

<style scoped>
/* .homePage-ccontainer */
.homePage-container {
    background-color: #272234;
    height: 100vh;
    width: 100%;

    /* .transactions-data */
    .transactions-data {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
    .teste{
        color: white;
        background-color: #181423;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 15rem;
        width: 100%;
        margin-top: 2.5rem;
        
    }
}
</style>