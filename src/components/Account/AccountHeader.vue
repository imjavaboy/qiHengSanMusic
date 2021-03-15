<template>
    <div class="header" @click="changeTheme">
      <div class="header-left" @click.stop="back"></div>
      <ul class="header-title">
        <li :class="{'active' :switchNum===0}" @click.stop="switchNumber(0)">My Favoite </li>
        <li :class="{'active' :switchNum===1}" @click.stop="switchNumber(1)">最近收听的</li>
      </ul>
      <div class="header-right"></div>
    </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0,
      switchNum: 0
    }
  },
  methods: {
    changeTheme () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    },
    accountClick () {
      this.$router.push('/account')
    },
    back () {
      this.$router.back(-1)
    },
    switchNumber (num) {
      this.switchNum = num
      this.$emit('switchItem', num)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
  .header{
    width: 100%;
    height: 100px;
   @include bg_color();
    display: flex;
    justify-content: space-between;
    /*position: relative;*/
    /*z-index: 999;*/
    .header-left,.header-right{
      width: 84px;
      height: 84px;
      margin-top: 8px;
    }
    .header-left{
      @include bg_img('../../assets/images/back');
    }
    .header-right{
      @include bg_img('../../assets/images/more')
    }
    .header-title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      height: 60px;
      margin-top: 20px;
      color: #fff;
      font-weight: bolder;
      border: 2px solid gray;
      border-radius: 10px;
    @include font_size($font_medium);
      li{
        height: 60px;
        line-height: 60px;
        padding: 0 20px;
        &:nth-of-type(1){
          border-right: 1px solid #fff;
        }
        &.active{
          background: rgba(255,255,255,0.5);
          color: green;
        }
      }
    }
  }

</style>
