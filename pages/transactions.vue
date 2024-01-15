<template>
    <div class="homePage-container">
        <section class="home-components">
            <div class="header-link">
                <NuxtLink to="/">
                    <span>Home</span>
                </NuxtLink>
            </div>
            
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

    /* .home-components */
    .header-link {
        background-color: #181423;
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: space-around;

        /* a */
        a {
            color: white;
            font-size: 1.5rem;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            text-decoration: none;
        }

    }
}
</style>