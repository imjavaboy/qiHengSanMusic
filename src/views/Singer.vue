<template>
  <div class="singer">
   <ScrollView ref="scrollView">
     <ul class="list-wrapper">
       <li class="list-group" v-for="(value,index) in list" :key="index" ref="group">
         <h2 class="group-title">{{keys[index]}}</h2>
         <ul>
           <li class="group-item" v-for="obj in list[index]" :key="obj.id"  @click="selectSinger(obj.id)">
             <img v-lazy="obj.img1v1Url" alt="">
             <p>{{obj.name}}</p>
           </li>
         </ul>
       </li>
     </ul>
   </ScrollView>
    <ul class="list-keys">
<!--      <li-->
<!--        v-for="(value,index) in keys"-->
<!--        :key="value"-->
<!--        @click.stop="keyDown(index)"-->
<!--      :class="{'active' :currentIndex === index}">-->
<!--        {{value}}-->
<!--      </li>-->
      <li
        v-for="(value,index) in keys"
        :key="value"
        :data-index="index"
        @touchstart.stop.prevent="touchstart"
        @touchmove.stop.prevent="touchmove"
        :class="{'active' :currentIndex === index}">
        {{value}}
      </li>
    </ul>
    <div class="fix-title" v-show="fixTitle !== ''" ref="fixTitle">{{fixTitle}}</div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getAllArtists } from '../api/require'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Singer',
  components: {
    ScrollView
  },
  methods: {
    _keyDown (index) {
      this.$refs.scrollView.scrollTo(0, -this.offsetTop[index])
      this.currentIndex = index
    },
    touchstart (event) {
      const index = parseInt(event.target.dataset.index)
      this._keyDown(index)

      this.beginOffsetY = event.touches[0].pageY
    },
    touchmove (event) {
      this.moveOffsetY = event.touches[0].pageY
      const offsetY = (this.moveOffsetY - this.beginOffsetY) / event.target.offsetHeight
      // console.log(offsetY)
      let index = parseInt(event.target.dataset.index) + Math.floor(offsetY)
      if (index < 0) {
        index = 0
      } else if (index > this.keys.length - 1) {
        index = this.keys.length - 1
      }
      this._keyDown(index)
    },
    selectSinger (id) {
      this.$router.push({
        path: `/singer/detail/${id}/singer`
      })
    }
  },
  created () {
    getAllArtists()
      .then((result) => {
        this.keys = result.keys
        this.list = result.list
      })
      .catch((error) => {
        console.log(error)
      })
  },
  mounted () {
    this.$refs.scrollView.scrolling((y) => {
      this.scrollY = y
      if (y > 0) {
        this.currentIndex = 0
        return
      }
      for (let i = 0; i < this.offsetTop.length - 1; i++) {
        const preTop = this.offsetTop[i]
        const nextTop = this.offsetTop[i + 1]
        if (-y >= preTop && -y <= nextTop) {
          this.currentIndex = i
          // 计算
          const diffOffsetY = nextTop + y
          let fixTitleOffsetY = 0
          if (diffOffsetY >= 0 && diffOffsetY <= this.fixTitleHeight) {
            fixTitleOffsetY = diffOffsetY - this.fixTitleHeight
          } else {
            fixTitleOffsetY = 0
          }
          this.fixTitleOffsetY = fixTitleOffsetY
          this.$refs.fixTitle.style.transform = `translateY(${fixTitleOffsetY})`
          return
        }
      }
      this.currentIndex = this.offsetTop.length - 1
    })
  },
  computed: {
    fixTitle () {
      if (this.scrollY >= 0) {
        return ''
      } else {
        return this.keys[this.currentIndex]
      }
    }
  },
  data () {
    return {
      keys: [],
      list: [],
      offsetTop: [],
      currentIndex: 0,
      beginOffsetY: 0,
      moveOffsetY: 0,
      scrollY: 0
    }
  },
  watch: {
    list () {
      this.$nextTick(() => {
        this.$refs.group.forEach((group) => {
          this.offsetTop.push(group.offsetTop)
        })
      })
    },
    fixTitle () {
      this.$nextTick(() => {
        this.fixTitleHeight = this.$refs.fixTitle.offsetHeight
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/variable";
  @import "../assets/css/mixin";
.singer{
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  overflow: hidden;
  .list-wrapper{
    width: 100%;
    .list-group{
      .group-title{
        @include bg_color();
        @include font_size($font_medium);
        color: #fff;
        padding: 10px 20px;
        /*text-align: center;*/
      }
      ul{
        li{
          width: 100%;
          display: flex;
          justify-content:left;
          align-items: center;
          padding: 10px 20px;
          img{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin-right: 20px;
          }
          p{
            @include font_color();
            @include font_size($font_medium);
            align-items: center;
          }
        }
      }
    }
  }
  .list-keys{
    position: fixed;
    top: 55%;
    right: 10px;
    transform: translateY(-50%);
    li{
      height: 50px;
      &.active{
        text-shadow: 0 0 10px #000;
      }
    }
  }
  .fix-title{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    padding: 10px 20px;
    box-sizing: border-box;
    @include font_size($font_medium);
    @include bg_color();
    color: #fff;
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
