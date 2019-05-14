<template>
  <div id="app">
    <!-- header -->
    <TheHeader></TheHeader>

    <router-view></router-view>

    <!-- footer-wrap -->
    <TheFooter></TheFooter>
  </div>
</template>
<script>
  import TheHeader from '@/components/Header.vue'
  import TheFooter from '@/components/Footer.vue'

  export default {
    name: 'App',
    components: {
      TheHeader,
      TheFooter
    },
    methods:{

    },
    data(){
      return{

      }
    },
    
  }
</script>

<style>
  
  
</style>
