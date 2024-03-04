<template>
    <div class="homePage-container">

        <section class="home-components">

            <HeaderC></HeaderC>

            <div class="">

                <div class="flex items-center justify-between">

                    <div class="flex flex-col">
                        <TransactionsInfoC></TransactionsInfoC>
                        <FormTransactionsC></FormTransactionsC>
                    </div>

                    <div class="">
                        <TotalBalanceC></TotalBalanceC>
                    </div>

                </div>
                <DoughnutChartC></DoughnutChartC>
                

            </div>



        </section>

    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
/* .homePage-ccontainer */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
    .homePage-container {
        @apply bg-[#272234] h-screen w-full;
    }

    /* .transactions-data */
    .homePage-container .transactions-data {
        @apply flex items-center justify-between w-full;
    }

    .homePage-container .teste {
        @apply text-[white] bg-[#181423] flex items-center justify-center h-60 w-full mt-10;
    }
}
</style>