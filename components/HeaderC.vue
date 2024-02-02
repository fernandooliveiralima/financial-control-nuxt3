<template>
    <div class="header-container">
        <div class="header-elements">
            <h1>Financial Control</h1>
            <NuxtLink to="/transactions">
                <span>Transactions</span>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
    
</script>

<style scoped>
/* .header-container */
.header-container {
    background-color: #181423;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    

    /* .header-elements */
    .header-elements{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 95%;

        /* h1 */
        h1{
            color: white;
            font-size: 2rem;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
        }

        /* a */
        a{
            color: white;
            font-size: 1.5rem;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            text-decoration: none;
        }
    }
}
</style>