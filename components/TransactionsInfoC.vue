<script setup lang="ts">
    import { useTransactionsStore } from '../store/transactionsStore';

    const transactionStore = useTransactionsStore();
    const {total} = storeToRefs(transactionStore)
    
    onMounted(()=>{
        console.log(`totalStore ->`, total.value);
    })
</script>

<template>
    <div class="container-transactions-info">
        <section class="transactions-details">
            <div class="section-balance base-size">
                <span>Balance</span>
                <div>R$ {{ total }}</div>
            </div>
            <div class="section-income base-size">
                <span>Income</span>
                <div>R$ 0,00</div>
            </div>
            <div class="section-expense base-size">
                <span>Expense</span>
                <div>R$ 0,00</div>
            </div>
            
        </section>
    </div>
</template>

<style lang="scss" scoped>

    /* .transactions-details */
    .transactions-details{
        margin-top: 0.5rem;
        margin-left: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 130%;

        /* .section-balance */
        .section-balance{
            background: linear-gradient(0deg, cornflowerblue, #181423 90%);
            color: cornflowerblue;
            font-weight: bold;
            font-size: 1.5rem;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            /* div */
            div{
                color: white;
                font-family: 'Alice', serif;
                font-size: 2rem;
                
            }
        }
        .section-income{
            background: linear-gradient(0deg, green, #181423 90%);
            color: green;
            font-weight: bold;
            font-size: 1.5rem;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            /* div */
            div{
                color: white;
                font-family: 'Alice', serif;
                font-size: 2rem;
            }
        }
        .section-expense{
            background: linear-gradient(0deg, crimson, #181423 90%);
            color: crimson;
            font-weight: bold;
            font-size: 1.5rem;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            /* div */
            div{
                color: white;
                font-family: 'Alice', serif;
                font-size: 2rem;
            }
        }
        
        /* .base-size */
        .base-size{
            background-color: #181423;
            border-radius: 0.5rem;
            height: 15rem;
            width: 15rem;
            margin-top: 3rem;
            padding: 1rem;
        }
    }

</style>