<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:isShowSMS}" @click="isShowSMS=true">短信登录</a>
          <a href="javascript:;" :class="{on:!isShowSMS}" @click="isShowSMS=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:isShowSMS}">
            <section class="login_message">
              <input 
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
                name="phone" 
                v-validate="'required|mobile'"
              >
              <button 
                :disabled="!isRightPhone || time>0" 
                class="get_verification" 
                :class="{right_phone_number:isRightPhone}" 
                @click.prevent="sendCode"
              >{{time>0?`发送成功(${time}s)`:'获取验证码'}}</button>
              <span 
                style="color: red;" 
                v-show="errors.has('phone')"
              >{{ errors.first('phone') }}</span>
            </section>
            <section class="login_verification">
              <input 
                type="tel" 
                maxlength="8" 
                placeholder="验证码"
                v-model="code"
                name="code" 
                v-validate="{required: true,regex: /^\d{6}$/}"
              >
              <span 
                style="color: red;" 
                v-show="errors.has('code')"
              >{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!isShowSMS}">
            <section>
              <section class="login_message">
                <input 
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="user"
                  name="user"
                  v-validate="{required: true}"
                >
                <span style="color: red;" v-show="errors.has('user')">{{ errors.first('user') }}</span>
              </section>
              <section class="login_verification">
                <input 
                  :type="isShowPwd ? 'password' : 'text'" 
                  maxlength="8" 
                  placeholder="密码"
                  v-model="pwd"
                  name="pwd"
                  v-validate="{required: true}"
                >
                <div class="switch_button" :class="isShowPwd ? 'off':'on'" @click="isShowPwd = !isShowPwd">
                  <div class="switch_circle" :class="{right:!isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd ? '':'abc'}}</span>
                </div>
                <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
              </section>
              <section class="login_message">
                <input 
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                  name="captcha"
                  v-validate="{required: true,regex: /^[0-9a-zA-Z]{4}$/}"
                >
                <img 
                  class="get_verification" 
                  src="http://localhost:4000/captcha" 
                  alt="captcha" 
                  ref="captcha"
                  @click="updateCaptcha"
                >
                <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import { MessageBox,Toast } from "mint-ui";
  export default {
    name:'login',
    data(){
      return {
        isShowSMS:false,  
        phone:'',
        code:'',
        user:'',
        pwd:'',
        captcha:'',
        isShowPwd:'false',
        time:0
      }
    },

    computed:{
      isRightPhone(){
        return /^1\d{10}$/.test(this.phone)
      }
    },

    methods:{

      sendCode(){
        this.time = 10
        const timer = setInterval(() => {
          this.time--
          if(this.time<=0){
            this.time = 0
            clearInterval(timer)
          }
        }, 1000);
        //发请求获取验证码
        const result = this.$API.reqSendCode(this.phone)
        //根据请求结果不同,做不同处理
        if(result.code === 0){
          Toast('成功发送验证码')
        }else{
          //停止定时器
          this.time = 0
          MessageBox('提示',result.msg || '发送失败')
        }

      },

     

      async login(){
        let names
        if(this.isShowSMS){
         names = ['phone','code']
        }else{
          names = ['user','pwd','captcha']
        } 
        const success = await this.$validator.validateAll(names)
        console.log(success)
        //通过校验后,发送请求
        //判断success是否存在
        let result
        if(success){
          //从状态中取参数
          const {phone,code,user,pwd,captcha} = this
          //判断是短信登录还是密码登录
          if(this.isShowSMS){
            //如果是短信登录
            result = await this.$API.reqSmsLogin({phone,code}) 
          }else{
            //如果是密码登录
            result = await this.$API.reqPwdLogin({user,pwd,captcha})
            //更新图形
            this.updateCaptcha()
            //清空
            this.captcha=''
          }
        }
        //根据请求结果的不同,进行不同的处理
        //判断code
        if(result.code === 0 ){
          //若成功.将数据保存进vuex的state中
          const user = result.data
          this.$store.dispatch('saveUser',user)
          //跳转页面
          this.$router.replace('/profile')
        }else{
          MessageBox('提示',result.msg)
        }
      },

      updateCaptcha(){
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.right_phone_number
                    color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(30px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
 
</style>
