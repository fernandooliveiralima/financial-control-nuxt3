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
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {

  /* .header-container */
  .header-container {
    @apply bg-[#181423] h-20 flex items-center justify-around;
  }

  /* .header-elements */
  .header-container .header-elements {
    @apply flex items-center justify-between w-[95%];
  }

  /* h1 */
  .header-container .header-elements h1 {
    @apply text-[white] text-[2rem] font-sans;

  }

  /* a */
  .header-container .header-elements a {
    @apply text-[white] text-2xl no-underline font-sans;

  }
}</style>