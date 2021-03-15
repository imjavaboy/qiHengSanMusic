<template>
    <div class="account-bottom">
        <div class="bottom-play"  @click="selectAllMusic">
          <span></span>
          <span>播放全部</span>
        </div>
      <div class="bottom-wrapper">
        <ScrollView>
          <SongListItem :songs="switchNum === 0 ? favoriteList : historyList"></SongListItem>
        </ScrollView>
      </div>

    </div>

</template>

<script>
import SongListItem from '../SongListItem'
import ScrollView from '../ScrollView'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'AccountBottom',
  components: {
    SongListItem,
    ScrollView
  },
  computed: {
    ...mapGetters([
      'historyList',
      'favoriteList'
    ])
  },
  props: {
    switchNum: {
      type: Number,
      required: true,
      default: 0
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail',
      'setCurrentIndex'
    ]),
    ...mapMutations([
      'SET_SONG_DETAIL'
    ]),
    selectAllMusic () {
      this.setCurrentIndex(0)
      this.setFullScreen(true)
      const playList = (this.switchNum === 0 ? this.favoriteList : this.historyList)
      // const ids = playList.map((item) => {
      //   return item.id
      // })
      // this.setSongDetail(ids)
      this.SET_SONG_DETAIL(playList)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
  .account-bottom{
    position: fixed;
    left: 0;
    right: 0;
    top: 100px;
    bottom: 0;
    /*background: skyblue;*/
    @include bg_sub_color();
     .bottom-play{
       width: 200px;
      height: 60px;
       margin: 20px auto;
       display: flex;
       justify-content: center;
       align-items: center;
       border-radius: 30px;
       padding: 10px;
       border: 2px solid #ccc;
       span{
         display: inline-block;
         &:nth-of-type(1){
           width: 46px;
           height: 46px;
           @include bg_img('../../assets/images/small_play');
           margin-right: 20px;
         }

     }
   }
    .bottom-wrapper{
      position: fixed;
      left: 0;
      right: 0;
      top: 220px;
      bottom: 0;
      overflow: hidden;
    }
  }

</style>
