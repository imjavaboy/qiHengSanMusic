<template>
    <div class="header" >
      <div class="header-left" @click="hiddenNormalPlayer"></div>
      <div class="header-title">
        <h3>{{currentSong.name}}</h3>
        <p>{{currentSong.singer}}</p>
      </div>
      <div class="header-right" @click.stop="accountClick"></div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PlayerHeader',
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer'
    ]),
    hiddenNormalPlayer () {
      this.setFullScreen(false)
      this.setMiniPlayer(true)
    },
    accountClick () {
      this.$router.replace('/account')
    }
  },
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  }
}
</script>

<style lang="scss" scoped>
  @import "src/assets/css/variable";
  @import "src/assets/css/mixin";
  .header{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 999;
    .header-left,.header-right{
      width: 84px;
      height: 84px;
      margin-top: 8px;
    }
    .header-left{
      @include bg_img('../../assets/images/down');
    }
    .header-right{
         @include bg_img('../../assets/images/account');
      }
    .header-title{
      text-align: center;
      color: #fff;
    @include font_size($font_medium);
      @include no-wrap();
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
  }

</style>
