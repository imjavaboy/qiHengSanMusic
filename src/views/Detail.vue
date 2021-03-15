<template>
    <div class="detail">
      <SubHeader :title="playlist.name"></SubHeader>
      <DetailTop :path="playlist.coverImgUrl" ref="top"></DetailTop>
      <div class="bottom">
        <ScrollView ref="scrollview">
          <DetailBottom :playlist="playlist.tracks"></DetailBottom>
        </ScrollView>
      </div>

    </div>
</template>

<script>
import SubHeader from '../components/Detail/DetailHeader'
import { getPlayList, getAlbum, getArtistsSongs, getTopList } from '../api/require'
import DetailTop from '../components/Detail/DetailTop'
import DetailBottom from '../components/Detail/DetailBottom'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Detail',
  components: {
    SubHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  data () {
    return {
      playlist: []
    }
  },
  created () {
    if (this.$route.params.type === 'personalized') {
      getPlayList({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = data.playlist
        }).catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'album') {
      getAlbum({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        }).catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'singer') {
      getArtistsSongs({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = {
            name: data.artist.name,
            coverImgUrl: data.artist.picUrl,
            tracks: data.hotSongs
          }
        }).catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'rank') {
      getTopList({ idx: this.$route.params.id })
        .then((data) => {
          this.playlist = {
            name: data.playlist.name,
            coverImgUrl: data.playlist.creator.backgroundUrl,
            tracks: data.playlist.tracks
          }
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    const defaultHeight = this.$refs.top.$el.offsetHeight
    this.$refs.scrollview.scrolling((offsetY) => {
      if (offsetY < 0) {
        const scale = Math.abs(offsetY) / defaultHeight
        this.$refs.top.changeMask(scale)
        // this.$refs.top.$el.style.filter = `blur(${scale}px)`
      } else {
        const scale = 1 + offsetY / defaultHeight
        this.$refs.top.$el.style.transform = `scale(${scale})`
      }
    })
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
.detail{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  @include bg_sub_color();
  .bottom{
    position: fixed;
    top: 500px;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
