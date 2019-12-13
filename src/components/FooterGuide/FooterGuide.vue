<template>
  <footer class="foot_nav">
    <!-- <div :class="{on: $route.path === '/msite'}" @click="go('/msite')" class="foot_item"> -->
      <router-link to="/msite" class="foot_item active" >
        <span class="iconfont icon-icon-waimai"></span>
        <span>首页</span>
      </router-link>
    <!-- </div> -->
    <!-- <div :class="{on: $route.path === '/search'}" @click="go('/search')"class="foot_item"> -->
    <router-link to='/search' class="foot_item">
        <span class="iconfont icon-search" ></span>
        <span>搜索</span>
    </router-link>
    <!-- </div> -->
    <!-- <div :class="{on: $route.path === '/order'}" @click="go('/order')" class="foot_item"> -->
    <router-link to='/order' class="foot_item">
        <span class="iconfont icon-icon--copy" ></span>
        <span>订单</span>
    </router-link>
    <!-- </div> -->
    <!-- <div :class="{on: $route.path === '/profile'}" @click="go('/profile')" class="foot_item"> -->
    <router-link to='/profile' class="foot_item">
        <span class="iconfont icon-yonghu"></span>
        <span>我的</span>
    </router-link>
    <!-- </div> -->
  </footer>
</template>

<script type="text/ecmascript-6">
export default { 
  // methods:{
  //   go(path){
  //     this.$router.replace(path)
  //   }
  // } 
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
  .foot_nav
    top-border-1px(#e4e4e4)
    position fixed
    bottom 0
    left 0
    width 100%
    height 50px
    //border-top 1px solid #e4e4e4
    display flex
    .foot_item 
      display flex
      flex 1
      flex-direction column
      text-align center
      align-items center 
      margin 5px
      span 
        font-size 16px
      .iconfont 
        font-size 20px
        margin-bottom 3px
      // &.active
      //   color #02a774
  .router-link-active
    color #02a774 !important 
</style>
