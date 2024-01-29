<script setup lang="ts">

import { useDateStore } from '../store/dateFilterStore';
import { useTransactionsStore } from '../store/transactionsStore';

import type { Transaction } from '~/types/transaction';

const dateStore = useDateStore();

const transactionsStore = ref(useTransactionsStore());

const {transactions} = storeToRefs(transactionsStore.value);

const contentFields = ref(/^\s*$/);
const contentAmount = ref(/^\d+$/);
const transactionType = ref('income');
const transactionTitle = ref('');
const transactionDate = ref(new Date());
const transactionAmount = ref< number | undefined >(undefined);

/* Functions() */
let count = ref(0);
const transactionId = computed(()=>{
    return count.value++;
})

const verificarInput = (input: string)=>{
    if (contentAmount.value.test(input)) {
    return parseFloat(input); 
  }
}

const saveTransaction = ()=>{

    if(verificarInput(`${transactionAmount.value}`) === undefined || 
    contentFields.value.test(transactionTitle.value)){
        alert('Preencha todos os campos!');
        return;
        
    }else if(transactionType.value === 'expense' && transactionAmount.value){
        parseFloat(`${transactionAmount.value*= -1}`)
    }
    
    
    const transaction = {
        id: transactionId.value,
        title: transactionTitle.value,
        amount: transactionAmount.value,
        date: new Date(transactionDate.value),
        transactionType: transactionType.value
    }
    
    transactionsStore.value.addTransactions(transaction);
    
    transactionTitle.value = '';
    transactionAmount.value = undefined;
    transactionType.value = 'income';
    
};


</script>

<template>
    <div class="container-form">
        <form @submit.prevent="saveTransaction" class="form-elements">
            <div class="header-form">
                <h3>Transactions</h3>
                <div class="section-transaction-type">
                    <section class="income-section">
                        <label for="income">Income</label>
                        <input type="radio" name="income" id="" value="income" v-model="transactionType"/>
                    </section>

                    <section class="expense-section">
                        <label for="expense">Expense</label>
                        <input type="radio" name="expense" id="" value="expense" v-model="transactionType"/>
                    </section>
                </div>
            </div>


            <div class="inputs-elements base-column">
                <div class="description-section">
                    <label for="description">Description</label>
                    <input type="text" v-model="transactionTitle" placeholder="Add Your Transaction"/>
                </div>

                <div class="amount-section base-column">
                    <label for="description">Amount</label>
                    <input min="0" step="0.01" type="number" v-model.number="transactionAmount" placeholder="0,00"/>
                </div>

                <div class="date-section base-column">
                    <label for="description">Date</label>
                    <input type="date" v-model="transactionDate"/>
                </div>
            </div>
            <div class="btn">
                <button @click="" type="submit">Add Transaction</button>
            </div>
        </form>
        
    </div>
</template>

<style scoped>
/* .container-form */
.container-form {
    background-color: #181423;
    border-radius: 0.5rem;
    margin-top: 4rem;
    padding: 1rem;
    width: 50%;
    margin-left: 1rem;

    /* .form-elements */
    .form-elements {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 10rem;

        /* .header-form */
        .header-form{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;

            /* h3 */
            h3 {
                color: cadetblue;
                font-family: Verdana, Geneva, Tahoma, sans-serif;
            }

            /* .section-transaction-type */
            .section-transaction-type{
                display: flex;

                /* .income-section, .expense-section */
                .income-section, .expense-section{
                    
                    margin-right: 1rem;
                    font-family: Verdana, Geneva, Tahoma, sans-serif;
                    font-size: 1.1rem;
                }

                /* .income-section */
                .income-section{
                    color: green;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 5.5rem;

                    /* input */
                    input{
                        accent-color: green;
                    }
                }

                /* .income-section */
                .expense-section{
                    color: crimson;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 6rem;

                    /* input */
                    input{
                        accent-color: crimson;
                    }
                }
            }
        }

        /* .base-column */
        .base-column {

            display: flex;
            align-items: center;
            justify-content: space-between;



            /* input */
            input {
                margin-left: 0.5rem;
                outline: none;
                padding: 0.3rem;
                border: 0;
                border-bottom: 0.1rem solid chocolate;
                background-color: transparent;
                color: chocolate;
            }

            /* label */
            label {
                color: chocolate;
                font-family: Verdana, Geneva, Tahoma, sans-serif;
            }
        }

        /* .btn */
        .btn {

            display: flex;
            align-items: center;
            justify-content: center;

            /* button */
            button {
                padding: 0.5rem;
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-weight: bold;
                font-size: 1rem;
                transition: all 0.3s;
                border: none;
                background-color: olive;
                border-radius: 0.3rem;
                color: black;
                cursor: pointer;
                width: 100%;
            }
        }
    }

}
</style>