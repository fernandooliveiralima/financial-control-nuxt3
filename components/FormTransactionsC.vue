<script setup lang="ts">

import { useDateStore } from '../store/dateFilterStore';
import { useTransactionsStore } from '../store/transactionsStore';

import type { Transaction } from '~/types/transaction';

const dateStore = useDateStore();
const transactionsStore = useTransactionsStore();

const { filteredList, transactions, total, expense, income } = storeToRefs(transactionsStore);

const contentFields = ref(/^\s*$/);
const contentAmount = ref(/^\d+$/);
const transactionType = ref('income');
const transactionTitle = ref('');
const transactionDate = ref(new Date());
const transactionAmount = ref<number | undefined>(undefined);
let count = ref(0);



/* Functions() */
const formatedDate = (date: Date) => {
    new Date().toLocaleDateString('pt-BR', { timeZone: 'UTC' })
}


const verificarInput = (input: string) => {
    if (contentAmount.value.test(input)) {
        return parseFloat(input);
    }
}

const saveTransaction = () => {

    if (verificarInput(`${transactionAmount.value}`) === undefined ||
        contentFields.value.test(transactionTitle.value)) {
        alert('Preencha todos os campos!');
        return;

    } else if (transactionType.value === 'expense' && transactionAmount.value) {
        parseFloat(`${transactionAmount.value *= -1}`)
    }

    const transaction = {
        id: count.value++,
        title: transactionTitle.value,
        amount: transactionAmount.value,
        date: new Date(transactionDate.value),
        transactionType: transactionType.value
    }

    transactionsStore.addTransactions(transaction);

    transactionTitle.value = '';
    transactionAmount.value = undefined;
    transactionType.value = 'income';

};

onMounted(() => {
    //transactionsStore.fetchTransactions();

})
</script>

<template>
    <div class="container-form">
        <form @submit.prevent="saveTransaction" class="form-elements">
            <div class="header-form">
                <h3>Transactions</h3>
                <div class="section-transaction-type">
                    <section class="income-section">
                        <label for="income">Income</label>
                        <input type="radio" name="income" id="" value="income" v-model="transactionType" />
                    </section>

                    <section class="expense-section">
                        <label for="expense">Expense</label>
                        <input type="radio" name="expense" id="" value="expense" v-model="transactionType" />
                    </section>
                </div>
            </div>


            <div class="inputs-elements base-column">
                <div class="description-section">
                    <label for="description">Description</label>
                    <input type="text" v-model="transactionTitle" placeholder="Add Your Transaction" />
                </div>

                <div class="amount-section base-column">
                    <label for="description">Amount</label>
                    <input min="0" step="0.01" type="number" v-model.number="transactionAmount" placeholder="0,00" />
                </div>

                <div class="date-section base-column">
                    <label for="description">Date</label>
                    <input type="date" v-model="transactionDate" />
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

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
    .container-form {
  @apply bg-[#181423] w-6/12 ml-4 mt-16 p-4 rounded-lg;
}

/* .form-elements */
.container-form .form-elements {
  @apply flex flex-col justify-between h-40;
}
/* .header-form */
.container-form .form-elements .header-form {
  @apply flex items-center justify-between w-full;
}
/* h3 */
.container-form .form-elements .header-form h3 {
  @apply text-[cadetblue];
  /* font */
}
/* .section-transaction-type */
.container-form .form-elements .header-form .section-transaction-type {
  @apply flex;
}
/* .income-section, .expense-section */
.container-form
  .form-elements
  .header-form
  .section-transaction-type
  .income-section,
.container-form
  .form-elements
  .header-form
  .section-transaction-type
  .expense-section {
  @apply text-[1.1rem] mr-4 font-sans;
  /* font */
}
/* .income-section */
.container-form
  .form-elements
  .header-form
  .section-transaction-type
  .income-section {
  @apply text-[green] flex items-center justify-between w-[5.5rem];
}
/* input */
.container-form
  .form-elements
  .header-form
  .section-transaction-type
  .income-section
  input {
  @apply accent-[green];
}
/* .income-section */
.container-form
  .form-elements
  .header-form
  .section-transaction-type
  .expense-section {
  @apply text-[crimson] flex items-center justify-between w-24;
}
/* input */
.container-form
  .form-elements
  .header-form
  .section-transaction-type
  .expense-section
  input {
  @apply accent-[crimson];
}
/* .base-column */
.container-form .form-elements .base-column {
  @apply flex items-center justify-between;
}
/* input */
.container-form .form-elements .base-column input {
  @apply bg-transparent text-[chocolate] ml-2 p-[0.3rem] border-b-[0.1rem] border-b-[chocolate] border-0 border-solid outline-none;
  
}
/* label */
.container-form .form-elements .base-column label {
  @apply text-[chocolate] font-sans;
  /* font */
}
/* .btn */
.container-form .form-elements .btn {
  @apply flex items-center justify-center;
}
/* button */
.container-form .form-elements .btn button {
  @apply font-[bold] text-base transition-all duration-[0.3s] bg-[olive] text-[black] cursor-pointer w-full p-2 rounded-[0.3rem] border-[none] font-sans;
  /* font */
}
}
</style>