<template>
  <!--
    <div class="header" @click="changeTheme">
      <div class="header-left"></div>
      <p class="header-title">奇衡三音乐</p>
      <div class="header-right" @click.stop="accountClick"></div>
    </div>
    -->
  <div class="header" @click="changeTheme">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center">中间</slot>
    </div>
   <div class="right">
     <slot name="right"></slot>
   </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    changeTheme () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    }

  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/css/variable";
  @import "../assets/css/mixin";
  .header{
    width: 100%;
    height: 100px;
   @include bg_color();
    display: flex;
    justify-content: space-between;
    /*position: relative;*/
    /*z-index: 999;*/
    .left,.right{
      width: 84px;
      height: 84px;
      margin-top: 8px;
      *{
        width: 100%;
        height: 100%;
      }
    }

  }

</style>
