<template>
  <div id="app">
    <MainHeader></MainHeader>
    <Tabber></Tabber>
   <keep-alive include="Singer">
     <router-view></router-view>
   </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
import MainHeader from './components/MainHeader'
import Tabber from './components/Tabber'
import Player from './views/Player'
export default {
  name: 'App',
  components: {
    MainHeader,
    Tabber,
    Player
  }
}
</script>
<style lang="scss" scoped>
  @import "assets/css/variable";
  .theme{
    position: fixed;
    left: 0;
    bottom: 0;
}
</style>
