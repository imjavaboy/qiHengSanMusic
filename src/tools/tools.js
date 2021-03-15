export const formartTime = (time) => {
  let minutes = parseInt(time / 60)
  minutes = minutes >= 10 ? minutes : '0' + minutes
  let seconds = parseInt(time % 60)
  seconds = seconds >= 10 ? seconds : '0' + seconds
  return {
    minutes: minutes,
    seconds: seconds
  }
}
export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min // 含最大值，含最小值
}
export const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}
export const getLocalStorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}
