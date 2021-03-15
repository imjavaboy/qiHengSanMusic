<template>
  <div class="recommend">
   <div class="recommend-warpper">
     <ScrollView>
       <div>
         <Banner :banners="banners"></Banner>
         <Personalized :personalized="personalized" :title="'推荐歌单'" @select="fatherSelectItem" :type="'personalized'"></Personalized>
         <Personalized :personalized="albums" :title="'最新专辑'" @select="fatherSelectItem" :type="'album'"></Personalized>
         <SongList :songs="songs"></SongList>
       </div>
     </ScrollView>
   </div>
    <transition>
      <router-view></router-view>
    </transition>

  </div>

</template>

<script>
import { getBanner, getPersonalized, getNewAlbum, getNewsong } from '../api/require'
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/Personalized'
import SongList from '../components/Recommend/SongList'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Recommend',
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView
  },
  data () {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: [],
      album: []
    }
  },
  methods: {
    fatherSelectItem (id, type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      })
    }
  },
  created () {
    getBanner().then((data) => {
      this.banners = data.banners
      // console.log(data.banners)
    }).catch(function (err) {
      console.log(err)
    })
    getPersonalized().then((data) => {
      this.personalized = data.result
    }).catch(function (err) {
      console.log(err)
    })
    getNewAlbum().then((data) => {
      this.albums = data.albums.splice(0, 6)
    }).catch(function (err) {
      console.log(err)
    })
    getNewsong().then((data) => {
      // this.songs = data.result
      data.result.forEach((value) => {
        const obj = {}
        obj.id = value.id
        obj.name = value.name
        obj.picUrl = value.song.album.picUrl
        obj.singer = value.song.artists[0].name
        this.songs.push(obj)
      })
    }).catch(function (err) {
      console.log(err)
    })
  }
}
</script>

<style scoped lang="scss">
  .recommend{
    position: fixed;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 0;
    /*overflow: hidden;*/
    .recommend-warpper{
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
  .v-enter{
    transform: translateX(100%);
  }
  .v-enter-to{
    transform: translateX(0%);
  }
  .v-enter-active{
    transition: transform 1s;
  }
  .v-leave{
    transform: translateX(0%);
  }
  .v-leave-to{
    transform: translateX(100%);
  }
  .v-leave-active{
    transition: transform 1s;
  }

</style>
