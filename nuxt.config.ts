// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  modules:['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  postcss:{
    plugins:{
      tailwindcss:{
        theme: {
          screens: {
            '2xl': {'max': '1535px'},
            // => @media (max-width: 1535px) { ... }
      
            'xl': {'max': '1279px'},
            // => @media (max-width: 1279px) { ... }
      
            'lg': {'max': '1023px'},
            // => @media (max-width: 1023px) { ... }
      
            'md': {'max': '767px'},
            // => @media (max-width: 767px) { ... }
      
            'sm': {'max': '639px'},
            // => @media (max-width: 639px) { ... }
          }
        }
      }
    }
  }
})
