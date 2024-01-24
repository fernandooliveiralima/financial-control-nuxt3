<script setup lang="ts">
import { useTransactionsStore } from '../store/transactionsStore';


const transactionsStore = useTransactionsStore();
const {transactions} = storeToRefs(transactionsStore);;
onMounted(() => {
    console.log(`list ->`, transactions.value);

})
</script>

<template>
    <div class="container-all-transactions">

        <div class="container-title-months">
            <h1>All Transactions</h1>
            <section class="container-months">
                <button class="Prev Month">Prev Month</button>
                <span>January</span>
                <button class="Next Month">Next Month</button>
            </section>
        </div>


        <section class="transaction-body">
            <div class="transaction" v-for="transaction in transactions" :key="transaction.id"> <!-- v-for() -->
                <div class="id-section base-column">
                    Id
                    <span>{{ transaction.id }}</span>
                </div>
                <div class="description-section base-column">
                    Description
                    <span>{{ transaction.title }}</span>
                </div>
                <div class="date-section base-column">
                    Date
                    <span>{{ transaction.date }}</span>
                </div>
                <div class="amount-section base-column-amount">
                    Amount
                    <span :class="transaction.transactionType === 'income' ?
                            'bind-income' : 'bind-expense'">
                        R$ {{ transaction.amount }}
                    </span>
                </div>
                <div class="delete-section base-column">
                    Delete
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                        <path
                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                </div>
            </div>
        </section>

    </div>
</template>

<style lang="scss" scoped>
/* .container-all-transactions */
.container-all-transactions {


    /* .container-title-months */
    .container-title-months {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 60%;
        margin-left: 37%;

        /* .container-months */

    }

    /* h1 */
    h1 {
        color: cadetblue;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 2.5rem;
        text-align: center;
        margin-top: 1rem;
        letter-spacing: 0.3rem;
    }

    /* .container-months */
    .container-months {
        width: 45%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        /* button */
        button {
            background-color: olive;
            border: none;
            border-radius: 0.3rem;
            cursor: pointer;
            color: black;
            padding: 0.3rem;
            width: 35%;
            font-size: 1.2rem;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            outline: none;
        }

        /* span */
        span {
            color: chocolate;
            font-size: 1.5rem;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
        }
    }

    /* .transaction-body */
    .transaction-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        /* .transaction */
        .transaction {
            background-color: #181423;
            border-radius: 0.5rem;
            height: 7rem;
            width: 95%;
            margin-top: 5%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            /* .description-section */
            .description-section,
            .date-section,
            .id-section,
            .amount-section,
            .delete-section {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
            }

            /* values numbers */
            .id-section span {
                font-family: 'Alice', serif;
                font-size: 1.3rem;
            }

            .date-section span {
                font-family: 'Alice', serif;
                font-size: 1.3rem;
            }

            .amount-section span {
                font-family: 'Alice', serif;
                font-size: 1.7rem;
                font-weight: 600;
            }

            /* .base-column */
            .base-column {
                color: white;
                display: flex;
                flex-direction: column;
                font-size: 1.3rem;
                padding: 0rem 0.5rem;

                /* span */
                span {
                    color: chocolate;
                    margin-top: 0.5rem;
                }

                /* svg */
                svg {
                    cursor: pointer;
                    fill: chocolate;
                    height: 1.5rem;
                    width: 1.5rem;
                    margin-top: 0.5rem;
                }
            }

            /* .base-column-amount */
            .base-column-amount {
                color: white;
                display: flex;
                flex-direction: column;
                font-size: 1.3rem;
                padding: 0rem 0.5rem;

                /* span */
                span {

                    margin-top: 0.5rem;
                }


            }

            /* class bindind amount */
            .bind-income {
                color: green;
            }

            .bind-expense {
                color: crimson;
            }
        }
    }
}
</style>