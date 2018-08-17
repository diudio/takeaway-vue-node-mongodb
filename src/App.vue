<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  body {
    margin: 0;
    padding: 0;
    background-color: rgb(246,245,244);
  }
  a {
    text-decoration: none;
    color: #2c3e50; 
    cursor: pointer;
  }
  ul{
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
  .font14{
    font-size: 14px;
  }
  .grey {
    color: #707070;
  }
  .active {
    color: #109eff;
  }
  .hr {
    background-color: rgb(247, 245, 243);
    height: 1px;
    border: none;
  }
  .bold {
    font-weight: 600;
  }
  .fontBig {
    font-size: 24px;
  }
  .childCenter{
    text-align: center;
  }
</style>
