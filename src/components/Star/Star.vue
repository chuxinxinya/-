<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for='(sc,index) in starClasses' :key='index' :class="sc"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      size:Number,
      score:Number
    },

    computed:{
      starClasses(){
        //取出score
        const {score} = this
        //定义一个数组保存
        let arr = []
        //向数组中添加n个on类名
        //根据score计算on的数量
        const onNumber = Math.floor(score)
        for(let i = 0; i < onNumber; i++){
          arr.push('on')
        }

        //向数组中添加0/1个half类名
        //超过0.5才是半个星
        if(score*10 - onNumber*10 > 5){
          arr.push('half')
        }

        //向数组中添加m个off类名
        //判断arr的长度是否小于5
        if(arr.length < 5){
          arr.push('off')
        }
        
        //将数组返回
        return arr
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
                    
 
</style>
