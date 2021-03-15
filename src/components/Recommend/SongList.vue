<template>
    <div class="song-list">
      <div class="song-top">
        <h3>最新音乐</h3>
      </div>
      <SongListItem :songs="songs"></SongListItem>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import SongListItem from '../SongListItem'
export default {
  name: 'SongList',
  components: {
    SongListItem
  },
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
  @import "src/assets/css/mixin";
  @import "src/assets/css/variable";
  .song-list{
    .song-top{
      width: 100%;
      height: 84px;
      line-height: 84px;
      @include bg_sub_color();
      padding: 0 20px;
      border-left:solid 10px #f00;
      border-bottom:1px solid #fff;
      h3{
        @include font_size($font_large);
        font-weight: bolder;
        @include font_color();
      }
    }
    .song-list{
      width: 100%;
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
          h3{
            @include font_size($font_large);
            @include font_color();
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
  }

</style>
