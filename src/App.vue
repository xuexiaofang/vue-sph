<template>
  <div id="app">
    11
    <Header></Header>
    <!-- <router-link to="/home"></router-link> -->
    <router-view></router-view>
    <!-- <Footer v-show="$route.path==='/home'||$route.path==='/search'"></Footer> -->
    <Footer v-show="$route.meta.isShow"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  data() {
    return {  
    }
  },
  components: {
    Header,
    Footer,
   
  },
  methods: {
    
  },
  mounted() {
    this.$store.dispatch("categoryList");
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
