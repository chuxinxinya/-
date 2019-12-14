<template>
  <footer class="foot_nav">
    <div class="foot_item" :class="{on: $route.path==='/msite'}" @click="go('/msite')" >
      <!-- <router-link to="/msite" class="foot_item active" > -->
        <span>
          <i class="iconfont icon-waimai"></i>
        </span>
        <span>首页</span>
      <!-- </router-link> -->
    </div>
    <div class="foot_item" :class="{on: $route.path==='/search'}" @click="go('/search')">
    <!-- <router-link to='/search' class="foot_item"> -->
        <span>
          <i class="iconfont icon-search"></i>
        </span>
        <span>搜索</span>
    <!-- </router-link> -->
    </div>
    <div class="foot_item" :class="{on: $route.path==='/order'}" @click="go('/order')">
    <!-- <router-link to='/order' class="foot_item"> -->
        <span>
          <i class="iconfont icon-dingdan"></i>
        </span>
        <span>订单</span>
    <!-- </router-link> -->
    </div>
    <div class="foot_item" :class="{on: $route.path==='/profile'}" @click="go('/profile')">
    <!-- <router-link to='/profile' class="foot_item"> -->
        <span>
          <i class="iconfont icon-geren"></i>
        </span>
        <span>我的</span>
    <!-- </router-link> -->
    </div>
  </footer>
</template>

<script type="text/ecmascript-6">
export default { 
  name: 'FooterGuide',
  methods:{
    go(path){
      if(path !== this.$route.path){
        this.$router.replace(path)
      }else{
        //当前路径再点击，刷新页面，发一般的请求
        //一般请求和Ajax请求的区别
        window.location = path
      }
    }
  } 
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
    background #fff
    display flex
    .foot_item 
      display flex
      width 25%
      flex-direction column
      text-align center
      align-items center 
      margin 5px
      span 
        font-size 12px
      .iconfont 
        font-size 22px
        margin-bottom 3px
      &.on
        color #02a774
  // .router-link-active
  //   color #02a774 !important 
</style>
