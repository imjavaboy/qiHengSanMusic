<template>
  <div class="search">
   <div class="search-box">
     <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
     <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="keywords" v-throttle="search">
   </div>
    <div class="search-suggest" v-show="keywords !== ''">
      <ScrollView>
        <ul>
          <li v-for="value in songs" :key="value.id" @click="selectMusic(value.id)">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
            <p>{{value.name}} - {{value.artists[0].name}}</p>
          </li>

        </ul>
      </ScrollView>
    </div>
    <div class="search-hot">
      <h3>热门搜索</h3>
      <ul>
        <li v-for="item in hots" :key="item.first" @click.stop="selectKeywords(item.first)">{{item.first}}</li>
      </ul>
    </div>
    <div class="search-history">
      <h3>搜索历史</h3>
      <ul>
        <li v-for="item in searchHistory" :key="item">
          <div class="history-left">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+" alt="">
            <p>{{item}}</p>
          </div>
          <div class="history-right">
            <img @click.stop="delHistory(item)" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=" alt="">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ScrollView from '../components/ScrollView'
import { getSearchList, getSearchHot } from '../api/require'
import { mapActions } from 'vuex'
import { setLocalStorage, getLocalStorage } from '../tools/tools'

export default {
  name: 'Search',
  components: {
    ScrollView
  },
  data () {
    return {
      keywords: '',
      songs: [],
      hots: [],
      searchHistory: []
    }
  },
  directives: {
    throttle: {
      // 指令的定义
      inserted: function (el, obj) {
        let timerId = null
        let flag = true
        el.addEventListener('input', function () {
          if (!flag) return
          flag = false
          timerId && clearTimeout(timerId)
          timerId = setTimeout(function () {
            flag = true
            obj.value()
          }, 1000)
        })
      }
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    search () {
      if (this.keywords === '') {
        return
      }
      getSearchList({ keywords: this.keywords })
        .then((data) => {
          this.songs = data.result.songs
        })
        .catch((error) => {
          console.log(error)
        })
    },
    selectMusic (id) {
      // this.$store.dispatch('setFullScreen', true)
      this.setFullScreen(true)
      this.setSongDetail([id])

      if (this.searchHistory.includes(this.keywords)) {
        return
      }
      // console.log(this.searchHistory)
      this.searchHistory.push(this.keywords)
      setLocalStorage('searchHistory', this.searchHistory)
      this.keywords = ''
    },
    selectKeywords (keyword) {
      this.keywords = keyword
      this.search()
    },
    delHistory (item) {
      this.searchHistory = this.searchHistory.filter((val) => {
        return val !== item
      })
      setLocalStorage('searchHistory', this.searchHistory)
    }
  },
  created () {
    getSearchHot()
      .then((data) => {
        this.hots = data.result.hots
      })
      .catch((err) => {
        console.log(err)
      })
    if (getLocalStorage('searchHistory') === undefined || getLocalStorage('searchHistory') === null) {
      return
    }
    this.searchHistory = getLocalStorage('searchHistory')
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/variable";
  @import "../assets/css/mixin";
.search{
  position: fixed;
  left: 0;
  top: 184px;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .search-box{
    display: flex;
    align-items: center;
    margin: 40px 20px;
    background: #ebecec;
    border-radius: 30px;
    border-bottom: 1px solid #ccc;
    img{
      width: 40px;
      height: 40px;
      margin-left: 20px;
    }
    input{
      border: none;
      outline: none;
      background: transparent;
      @include font_size($font_medium);
      height: 60px;
      margin-left: 20px;
    }
  }
  .search-suggest{
    position: fixed;
    left: 0;
    right: 0;
    top: 300px;
    bottom: 0;
    background: #444444;
    overflow: hidden;
    li{
      display: flex;
      align-items: center;
      padding: 20px 40px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      img{
        width: 40px;
        height: 40px;
      }
      p{
        margin-left: 20px;
        @include font_color();
        @include font_size($font_medium);
      }
    }
  }
  .search-hot{
    h3{
      padding: 10px 20px;
      @include font_color();
      @include font_size($font_medium);
    }
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        height: 60px;
        line-height: 60px;
        border: 1px solid #000;
        border-radius: 30px;
        padding: 0 20px;
        @include font_color();
        @include font_size($font_medium_s);
        margin: 20px;
      }
    }
  }
  .search-history{
    h3{
      padding: 10px 20px;
      @include font_color();
      @include font_size($font_medium);
    }
    ul{
      li{
        padding: 20px 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #fff;
        .history-left{
          display: flex;
          justify-content: left;
          align-items: center;
          img{
            width: 40px;
            height: 40px;
            margin-right: 20px;
          }
          p{
            @include font_size($font_medium);
            @include font_color();
          }
        }
        .history-right{
          img{
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
}
</style>
