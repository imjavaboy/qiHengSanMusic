<template>
    <div class="player">
      <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
      <MiniPlayer ></MiniPlayer>
      <ListPlayer ref="listPlayer"></ListPlayer>
      <audio :src="currentSong.url" ref="audio" @timeupdate="timeUpDate" @ended="end"></audio>
    </div>
</template>

<script>
import NormalPlayer from '../components/Player/NormalPlayer'
import MiniPlayer from '../components/Player/MiniPlayer'
import ListPlayer from '../components/Player/ListPlayer'
import { mapGetters, mapActions } from 'vuex'
import { getRandomIntInclusive, getLocalStorage, setLocalStorage } from '../tools/tools'
import modeType from '../store/modeType'
export default {
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'isPlaying',
      'currentIndex',
      'curTime',
      'modeType',
      'songs',
      'favoriteList',
      'historyList'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.setHistorySong(this.currentSong)
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex () {
      this.$refs.audio.oncanplay = () => {
        this.totalTime = this.$refs.audio.duration
        if (this.isPlaying) {
          this.setHistorySong(this.currentSong)
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    curTime (newValue, oldValue) {
      this.$refs.audio.currentTime = newValue
    },
    favoriteList (newValue, oldValue) {
      // window.localStorage.setItem('favoList', JSON.stringify(newValue))
      setLocalStorage('favoList', newValue)
    },
    historyList (newValue, oldValue) {
      // window.localStorage.setItem('historyList', JSON.stringify(newValue))
      setLocalStorage('historyList', newValue)
    }
  },
  created () {
    // const favoritelist = JSON.parse(window.localStorage.getItem('favoList'))
    // const historyList = JSON.parse(window.localStorage.getItem('historyList'))
    const favoritelist = getLocalStorage('favoList')
    const historyList = getLocalStorage('historyList')
    // console.log(list)
    if (favoritelist === null) {
      return
    }
    if (historyList === null) {
      return
    }
    this.setFavorList(favoritelist)
    this.setHistoryList(historyList)
  },
  mounted () {
    this.$refs.audio.oncanplay = () => {
      this.totalTime = this.$refs.audio.duration
    }
  },
  data () {
    return {
      totalTime: 0,
      currentTime: 0
    }
  },
  methods: {
    ...mapActions([
      'setCurrentIndex',
      'setFavorList',
      'setHistorySong',
      'setHistoryList'
    ]),
    timeUpDate (event) {
      // console.log(event.target.currentTime)
      this.currentTime = event.target.currentTime
    },
    end () {
      // console.log('end')
      if (this.modeType === modeType.loop) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (this.modeType === modeType.one) {
        this.$refs.audio.play()
      } else {
        const index = getRandomIntInclusive(0, this.songs.length - 1)
        this.setCurrentIndex(index)
      }
    }

  }
}
</script>

<style scoped lang="scss">

</style>
