<template>
  <div class="rank">
    <ScrollView>
      <ul >
        <li v-for="(value,key) in catagory.titles" :key="key">
          <h3 class="group-title">{{value}}</h3>
          <ul class="normal-group" v-if="value === '官方榜'">
            <li v-for="value in catagory[key]" :key="value.rank.id" @click="selectItem(value.id)">
              <div class="rank-left">
                <img v-lazy="value.rank.coverImgUrl" alt="">
                <p>{{value.rank.updateFrequency}}</p>
              </div>
              <ul class="rank-right">
                <li v-for="(item,index)  in value.rank.tracks" :key="item.first" >
                  {{index}}.{{item.first}}--{{item.second}}
                </li>
              </ul>
            </li>
          </ul>
          <ul class="other-group" v-else>
            <li v-for="value in catagory[key]" :key="value.rank.id" @click="selectItem(value.id)">
              <div class="rank-top">
                <img v-lazy="value.rank.coverImgUrl" alt="">
              </div>
              <div class="rank-bottom">
                <p>{{value.rank.name}}</p>
              </div>
            </li>
          </ul>
        </li>

      </ul>
    </ScrollView>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getTopListDetail } from '../api/require'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Rank',
  components: {
    ScrollView
  },
  created () {
    getTopListDetail()
      .then((data) => {
        this.catagory = data
      }).catch((error) => {
        console.log(error)
      })
  },
  data () {
    return {
      catagory: {}
    }
  },
  methods: {
    selectItem (id) {
      this.$router.push(`/rank/detail/${id}/rank`)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/variable";
  @import "../assets/css/mixin";
.rank{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 184px;
  overflow: hidden;
  .group-title{
    padding: 20px 20px;
    @include font_size($font_large);
    @include font_color();
    font-weight: bolder;
    background: #ccc;

  }
  .normal-group{
    li{
      display: flex;
      align-items: center;
      justify-content: left;
      padding: 10px 20px;
      box-sizing: border-box;
      .rank-left{
        position: relative;
        img{
          width: 250px;
          height: 250px;
          border-radius: 20px;
          margin-right: 20px;
        }
        p{
          position: absolute;
          bottom: 20px;
          left: 40px;
          color: #fff;
          @include font_size($font_medium);
        }
      }
      .rank-right{
        @include font_color();
        @include no-wrap();
        @include font_size($font_medium_s)

      }
    }
  }
  .other-group{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
      align-items: center;
      padding: 10px 20px;
      box-sizing: border-box;
      .rank-top{
        img{
          width: 250px;
          height: 250px;
          border-radius: 20px;
        }
      }
      .rank-bottom{
        width: 250px;
        @include no-wrap();
        overflow: hidden;

       p{
         text-align: center;
         @include font_color();
         @include no-wrap();
         @include font_size($font_medium_s);
         margin-top: 20px;
        }
      }
    }
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
