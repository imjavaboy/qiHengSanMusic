<template>
  <ul class="song-list">
    <li v-for="item in songs" :key="item.id" class="item" @click="selectItem(item.id)">
      <img v-lazy="item.picUrl" alt="">
      <div>
        <h3>{{item.name}}</h3>
        <p>{{item.singer}}</p>
      </div>
    </li>

  </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SongListItem',
  props: {
    songs: {
      type: Array,
      default: () => [],
      require: true
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    selectItem (id) {
      this.setFullScreen(true)
      this.setSongDetail([id])
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
  @import "../assets/css/variable";
  .song-list{
    width: 100%;
    border-top: 1px solid #ccc;
    @include bg_sub_color();
    .item{
      width: 100%;
      height: 200px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      img{
        width: 150px;
        height: 150px;
        border-radius: 20px;
        margin-right: 20px;
      }
      div{
        width: 70%;
        h3{
          @include font_size($font_large);
          @include font_color();
          @include no-wrap();
          @include clamp(1)
        }
        p{
          @include font_size($font_samll);
          margin-top: 20px;
          @include font_color();
          opacity: 0.6;
        }
      }
    }
  }

</style>
