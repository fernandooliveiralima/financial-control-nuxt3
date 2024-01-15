<template>
    <div class="container-form">
        <form class="form-elements">
            <h3>Transactions</h3>

            <div class="inputs-elements base-column">
                <div class="description-section">
                    <label for="description">Description</label>
                    <input type="text" />
                </div>

                <div class="amount-section base-column">
                    <label for="description">Amount</label>
                    <input min="0" step="0.01" type="number" />
                </div>

                <div class="date-section base-column">
                    <label for="description">Date</label>
                    <input type="date" />
                </div>
            </div>
            <div class="btn">
                <button>Add Transaction</button>
            </div>
            
        </form>
    </div>
</template>

<script setup lang="ts">

</script>

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
    .form-elements{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 10rem;

        /* h3 */
        h3{
            color: cadetblue;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
        }

        /* .base-column */
        .base-column {
            
            display: flex;
            align-items: center;
            justify-content: space-between;

            

            /* input */
            input{
                margin-left: 0.5rem;
                outline: none;
                padding: 0.3rem;
                border: 0;
                border-bottom: 0.1rem solid chocolate;
                background-color: transparent;
                color: chocolate;
            }

            /* label */
            label{
                color: chocolate;
                font-family: Verdana, Geneva, Tahoma, sans-serif;
            }
        }

        /* .btn */
        .btn{
            
            display: flex;
            align-items: center;
            justify-content: center;

            /* button */
            button{
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