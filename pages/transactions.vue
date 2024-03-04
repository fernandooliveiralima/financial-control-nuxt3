<template>
    <div class="homePage-container">
        <section class="home-components">
            <div class="header-link">
                <NuxtLink to="/">
                    <span>Home</span>
                </NuxtLink>
            </div>
            <AllTransactionsC></AllTransactionsC>
        </section>

    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {

    /* .homePage-ccontainer */
    .homePage-container {
        @apply bg-[#272234] h-screen w-full;
    }

    /* .home-components */
    .homePage-container .header-link {
        @apply bg-[#181423] h-20 flex items-center justify-around;
    }

    /* a */
    .homePage-container .header-link a {
        @apply text-[white] text-2xl no-underline font-sans;
        
    }
}</style>