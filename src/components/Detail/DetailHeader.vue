<template>
    <Header class="header">
      <div slot="left" class="header-left" @click.stop="back"></div>
      <p slot="center" class="header-title">{{title}}</p>
      <div slot="right" class="header-right"></div>
    </Header>
</template>

<script>
import Header from '../Header'
import { mapActions } from 'vuex'
export default {
  name: 'DetailHeader',
  components: {
    Header
  },
  data () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    ...mapActions([
      'setListPlayer'
    ]),
    back () {
      this.$router.back(-1)
      this.setListPlayer(false)
    }
  },
  props: {
    title: {
      type: String,
      default: '',
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "src/assets/css/variable";
  @import "src/assets/css/mixin";
  .header{
    .header-left{
      @include bg_img('../../assets/images/back');
    }
    .header-right{
      @include bg_img('../../assets/images/more')
    }
    .header-title{
      text-align: center;
      line-height: 100px;
      color: #fff;
      font-weight: bolder;
    @include font_size($font_medium);
      @include no-wrap();
    }
  }

</style>
