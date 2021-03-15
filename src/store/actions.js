import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_LIST_PLAYER,
  SET_SONG_DETAIL,
  SET_SONG_LYRIC,
  SET_DEL_SONG,
  SET_CURRENT_INDEX,
  SET_CURRENT_TIME,
  SET_FAVORITE_LIST,
  SET_FAVOR_LIST,
  SET_HISTORY_LIST,
  SET_HISTORY_SONG
} from './mutation-type'
import { getSongDetail, getSongLyric, getSongURL } from '../api/require'

export default {
  /**
  setFullScreen (context, flag) {
    context.commit('changeFullScreen', flag)
  }
   */
  setFullScreen (context, flag) {
    context.commit(SET_FULL_SCREEN, flag)
  },
  setMiniPlayer (context, flag) {
    context.commit(SET_MINI_PLAYER, flag)
  },
  setListPlayer (context, flag) {
    context.commit(SET_LIST_PLAYER, flag)
  },
  setIsPlaying (context, flag) {
    context.commit(SET_IS_PLAYING, flag)
  },
  setModeType ({ commit }, flag) {
    commit(SET_MODE_TYPE, flag)
  },
  async setSongDetail ({ commit }, ids) {
    const result = await getSongDetail({ ids: ids.join(',') })
    const urls = await getSongURL({ id: ids.join(',') })
    // console.log(urls)
    const list = []
    result.songs.forEach((value, index) => {
      const obj = {}
      obj.name = value.name
      obj.id = value.id
      // obj.url = urls.data[index].url
      for (let i = 0; i < urls.data.length; i++) {
        if (value.id === urls.data[i].id) {
          obj.url = urls.data[i].url
          break
        }
      }
      let singer = ''
      value.ar.forEach((item, index) => {
        if (index === 0) {
          singer = item.name
        } else {
          singer += '-' + item.name
        }
      })
      obj.singer = singer
      obj.picUrl = value.al.picUrl
      list.push(obj)
    })
    commit(SET_SONG_DETAIL, list)
  },
  async setSongLyric ({ commit }, id) {
    const result = await getSongLyric({ id: id })

    // console.log(result.lrc.lyric)
    const obj = parseLyric(result.lrc.lyric)
    // console.log(obj)
    commit(SET_SONG_LYRIC, obj)
  },
  setDelSong ({ commit }, index) {
    commit(SET_DEL_SONG, index)
  },
  setCurrentIndex ({ commit }, index) {
    commit(SET_CURRENT_INDEX, index)
  },
  setCurrentTime ({ commit }, time) {
    commit(SET_CURRENT_TIME, time)
  },
  setFavoriteList ({ commit }, song) {
    commit(SET_FAVORITE_LIST, song)
  },
  setFavorList ({ commit }, list) {
    commit(SET_FAVOR_LIST, list)
  },
  setHistorySong ({ commit }, song) {
    commit(SET_HISTORY_SONG, song)
  },
  setHistoryList ({ commit }, list) {
    commit(SET_HISTORY_LIST, list)
  }
}

// 切割歌词
function parseLyric (lrc) {
  const lyrics = lrc.split('\n')
  const reg1 = /\[\d*:\d*\.\d*\]/g
  const reg2 = /\[\d*/i
  const reg3 = /\:\d*/i
  const lyricObj = {}
  lyrics.forEach((lyric) => {
    let timeStr = lyric.match(reg1)
    if (!timeStr) {
      return
    }
    timeStr = timeStr[0]
    const minStr = timeStr.match(reg2)[0].substr(1)
    const secondStr = timeStr.match(reg3)[0].substr(1)
    const time = parseInt(minStr) * 60 + parseInt(secondStr)

    const text = lyric.replace(reg1, '').trim()
    lyricObj[time] = text
  })
  return lyricObj
}
