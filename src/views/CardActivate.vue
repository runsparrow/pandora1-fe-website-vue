<template>
  <div class="loginContainer">
    <div class="container">
      <div class="header_view">
        <div class="top_view">
          <ul class="list">
            <li class="logo">
              <img
                class="logo_img"
                src="@a/imgs/logo_01.png"
                alt=""
                srcset="@a/imgs/logo_01@2x.png 2x"
                @click="toHome"
              />
              <span class="logo_title" @click="toHome">T-pic</span>
            </li>
            <li class="label" v-for="(item, index) in navigationsMenus" :key="index" @click="toSearch(item.id)">
              {{ item.name }}
            </li>
            <li class="seperator"></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="form_view">
        <div class="title_view">
          <div :class="['right_view']">邀请码登录</div>
        </div>
        <template>
          <template v-if="token === ''">
            <div class="mobile_view">
              <input
                class="form_input_mobile"
                type="text"
                placeholder="请输入卡号"
                v-model.trim="cardNo"
                @keyup="validCard($event)"
              />
              <div :class="['error_msg', { error_msg_hidden: !cardNoInValid }]">{{ cardNoErrorMsg }}</div>
              <img
                class="user_mobile_img"
                src="@a/imgs/user_mobile.png"
                alt=""
                srcset="@a/imgs/user_mobile@2x.png 2x"
              />
            </div>
            <div class="pwd_view">
              <input
                class="form_input_pwd"
                type="password"
                placeholder="请输入卡密"
                v-model.trim="cardPassword"
                @keyup="validCardPwd($event)"
              />
              <div :class="['error_msg', { error_msg_hidden: !cardPasswordInValid }]">{{ cardPasswordErrorMsg }}</div>
              <img class="user_pwd_img" src="@a/imgs/user_pwd.png" alt="" srcset="@a/imgs/user_pwd@2x.png 2x" />
            </div>

            <div class="pwd_view">
              <input
                class="form_input_pwd"
                type="text"
                placeholder="请输入新会员名"
                v-model.trim="memberName"
                @keyup="validmemberName($event)"
              />
              <div :class="['error_msg', { error_msg_hidden: !memberNameInValid }]">{{ memberNameErrorMsg }}</div>
              <img class="user_pwd_img" src="@a/imgs/user_mobile.png" alt="" srcset="@a/imgs/user_mobile@2x.png 2x" />
            </div>
            <div class="pwd_view">
              <input
                class="form_input_pwd"
                type="password"
                placeholder="请输入新密码"
                v-model.trim="memberPassword"
                @keyup="validmemberPassword($event)"
              />
              <div :class="['error_msg', { error_msg_hidden: !memberPasswordInValid }]">
                {{ memberPasswordErrorMsg }}
              </div>
              <img class="user_pwd_img" src="@a/imgs/user_pwd.png" alt="" srcset="@a/imgs/user_pwd@2x.png 2x" />
            </div>
            <div class="pwd_view">
              <input
                class="form_input_pwd"
                type="password"
                placeholder="请确认新密码"
                v-model.trim="memberReConfirmPassword"
                @keyup="validmembermemberReConfirmPassword($event)"
              />
              <div :class="['error_msg', { error_msg_hidden: !memberReConfirmPasswordInValid }]">
                {{ memberReConfirmPasswordErrorMsg }}
              </div>
              <img class="user_pwd_img" src="@a/imgs/user_pwd.png" alt="" srcset="@a/imgs/user_pwd@2x.png 2x" />
            </div>

            <button class="btn_submit" @click="loginSooYi" ref="loginRef">
              {{ btnLoginLabel }}
            </button>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { loginByCardService } from '@s/login-service'
export default {
  name: 'LoginView',
  data() {
    return {
      cardNo: '',
      cardPassword: '',
      memberName: '',
      memberPassword: '',
      memberReConfirmPassword: '',
      cardNoErrorMsg: '卡号不能为空',
      cardNoInValid: false,

      cardPasswordErrorMsg: '卡密不能为空',
      cardPasswordInValid: false,

      memberNameErrorMsg: '新用户名不能为空',
      memberNameInValid: false,

      memberPasswordErrorMsg: '新密码密码不能为空',
      memberPasswordInValid: false,

      memberReConfirmPasswordErrorMsg: '确认密码不能为空',
      memberReConfirmPasswordInValid: false,

      timer: null,
      code_timer: null,
      register_time: null,
      seconds: 3,
      accept_checked: false,
      accountCode: '',
      register_show: 0,
      accountCodeInValid: false,
      code_seconds: 60,
      register_seconds: 5,
      accountCodeErrorMsg: '验证码不能为空',
      accountRegPwd: '',
      accountRegPwdInValid: false,
      accountRegPwdErrorMsg: '新密码不能为空',
      accountRegConfirmPwd: '',
      accountRegConfirmPwdInValid: false,
      accountRegConfirmPwdErrorMsg: '确认密码不能为空',
      userName: '',
      userNameErrorMsg: '用户名不能为空',
      userNameInValid: false,
      registSuccess: false,
      btn_disabled: false,
      btnLoginLabel: '登录'
    }
  },
  computed: {
    ...mapState(['token', 'code', 'activeTab', 'navigationsMenus']),
    ...mapGetters(['version'])
  },
  mounted() {
    document.addEventListener('keyup', e => {
      if (this.$refs.loginRef) {
        if (e.keyCode === 13) {
          this.$refs.loginRef.click()
        }
      }
    })
  },
  unmounted() {
    document.removeEventListener('keyup')
  },
  methods: {
    ...mapMutations(['setUserInfoMutation']),
    toHome() {
      this.$router.push('/home')
    },
    validCard($event) {
      if ($event.target.value === '') {
        this.cardNoErrorMsg = '卡号不能为空'
        this.cardNoInValid = true
      } else {
        this.cardNoInValid = false
      }
    },
    validCardPwd($event) {
      if ($event.target.value === '') {
        this.cardPasswordErrorMsg = '卡密不能为空'
        this.cardPasswordInValid = true
      } else {
        this.cardPasswordInValid = false
      }
    },
    validmemberName($event) {
      if ($event.target.value === '') {
        this.memberNameErrorMsg = '新用户名不能为空'
        this.memberNameInValid = true
      } else {
        this.memberNameInValid = false
      }
    },
    validmemberPassword($event) {
      if ($event.target.value === '') {
        this.memberPasswordErrorMsg = '密码不能为空'
        this.memberPasswordInValid = true
      } else {
        this.memberPasswordInValid = false
      }
    },
    validmembermemberReConfirmPassword($event) {
      if ($event.target.value === '') {
        this.memberReConfirmPasswordErrorMsg = '确认密码不能为空'
        this.memberReConfirmPasswordInValid = true
      } else {
        this.accountRegConfirmPwdInValid = false
        if (this.memberPassword !== $event.target.value) {
          this.memberReConfirmPasswordInValid = true
          this.memberReConfirmPasswordErrorMsg = '两次密码不一致'
        } else {
          this.memberReConfirmPasswordInValid = false
          this.memberReConfirmPasswordErrorMsg = '确认密码不能为空'
        }
      }
    },
    validAccountName($event) {
      if ($event.target.value === '') {
        this.accountNameErrorMsg = '手机号不能为空'
        this.accountNameInValid = true
      } else {
        // if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test($event.target.value)) {
        //   this.accountNameErrorMsg = '手机号码有误，请重填'
        //   this.accountNameInValid = true
        // } else {
        //   this.accountNameInValid = false
        // }
        this.accountNameInValid = false
      }
    },
    validUserName($event) {
      if ($event.target.value === '') {
        this.userNameErrorMsg = '用户名不能为空'
        this.userNameInValid = true
      } else {
        this.userNameInValid = false
      }
    },
    validRegPwd($event) {
      if ($event.target.value === '') {
        this.userNameErrorMsg = '用户名不能为空'
        this.accountRegPwdInValid = true
      } else {
        this.accountRegPwdInValid = false
      }
    },
    validRegConfirmPwd($event) {
      if ($event.target.value === '') {
        this.accountRegConfirmPwdErrorMsg = '确认密码不能为空'
        this.accountRegConfirmPwdInValid = true
      } else {
        if (this.accountRegConfirmPwd !== this.accountRegPwd) {
          this.accountRegConfirmPwdErrorMsg = '两次密码不同，请重新输入'
          this.accountRegConfirmPwdInValid = true
        } else {
          this.accountRegConfirmPwdInValid = false
        }
      }
    },
    toSearch(navigationId) {
      this.searchKeyword = ''
      this.$store.commit('setKeyWords', '')
      this.$store.commit('setNavigationId', navigationId)
      this.$router.push('/search')
    },
    async loginSooYi() {
      let that = this
      if (this.cardNo === '') {
        alert('卡号不能为空')
        return
      }
      if (this.cardPassword === '') {
        alert('卡密不能为空')
        return
      }
      if (this.memberName === '') {
        alert('新用户名不能为空')
        return
      }
      if (this.memberPassword === '') {
        alert('用户密码不能为空')
        return
      }
      if (this.memberReConfirmPassword === '') {
        alert('确认密码不能为空')
        return
      }
      if (this.memberPassword !== this.memberReConfirmPassword) {
        alert('两次输入密码不一致')
        return
      }
      try {
        const { result, token, member, message } = await loginByCardService({
          cardNo: this.cardNo,
          cardPassword: this.cardPassword,
          memberName: this.memberName,
          memberPassword: this.memberPassword
        })
        if (result) {
          const dateTime = new Date()
          dateTime.setHours(dateTime.getHours() + 2)
          console.log(member)
          that.setUserInfoMutation({
            userName: member?.memberName,
            memberId: member?.memberId,
            token: token,
            expires: new Date(dateTime).getTime()
          })
          that.$router.push('/')
        } else {
          alert(message)
        }
      } catch (err) {
        console.log(err)
      }
    },
    toHomePage() {
      clearInterval(this.timer)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/colors';
@import '../assets/css/font_size';
.loginContainer {
  box-sizing: border-box;
  height: 100%;
  .container {
    box-sizing: border-box;
    padding-left: 164px;
    .header_view {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      .top_view {
        height: 97px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        .list {
          height: 100%;
          list-style: none;
          display: flex;
          flex-direction: row;
          box-sizing: border-box;
          align-items: center;
          justify-content: flex-start;
          flex: 1;
          .logo {
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            margin: 0;
            .logo_img {
              width: 62.01px;
              height: 46.16px;
              cursor: pointer;
            }
            .logo_title {
              color: $color4;
              font-size: 37px;
              line-height: 26px;
              cursor: pointer;
            }
          }
          .label {
            color: $color1;
            font-size: 16px;
            margin-top: 20px;
            margin-left: 65px;
          }
          .seperator {
            position: relative;
            margin-left: 62px;
            &::before {
              position: absolute;
              top: -5px;
              right: 0;
              left: 0;
              bottom: 0;
              height: 26px;
              width: 0px;
              border: 1px solid $color2;
              content: '';
              background-color: red;
            }
          }
        }
      }
    }
  }
  .main {
    margin: 0 auto;
    /* border: 1px solid blue; */
    background: rgba(72, 72, 72, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    .form_view {
      width: 363px;
      box-sizing: border-box;
      height: 500px;
      background: #ffffff;
      margin-top: 177px;
      margin-bottom: 250px;
      display: flex;
      flex-direction: column;
      position: relative;
      .title_view {
        height: 47px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        .left_view {
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          justify-content: center;
          cursor: pointer;
          color: #707070;
          border: 1px solid #707070;
          border-radius: 0px 0px 21px 0px;
          background: #ebebeb;
          opacity: 1;
          font-size: 20px;
          font-weight: bold;
          background: #ebebeb;
        }
        .right_view {
          height: 100%;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          background: #ffffff;
          color: #707070;
        }
        .activeLeftTab {
          cursor: default !important;
          color: #000c20;
          border: 1px solid #707070;
          background: #ffffff;
          border: none;
        }
        .activeRightTab {
          cursor: default !important;
          color: #000c20;
          background: #ffffff;
          border: none;
          /* border: 1px solid #707070;
          border-radius: 0px 0px 0px 21px; */
          /* background: #ebebeb; */
        }
      }
      .mobile_register_view {
        box-sizing: border-box;
        position: relative;
        .pwd_view {
          //写到这里
          box-sizing: border-box;
          position: relative;
          .form_input_usename {
            width: 320px;
            height: 47px;
            border: 1px solid $color4;
            border-radius: 23px;
            margin-top: 31px;
            margin-left: 21px;
            margin-right: 22px;
            box-sizing: border-box;
            padding-left: 60px;
            font-size: 16px;
            font-weight: 400;
          }
          .user_mobile_img {
            width: 17.33px;
            height: 12px;
            position: absolute;
            top: 47px;
            left: 45px;
          }
          .form_input_pwd {
            box-sizing: border-box;
            position: relative;
            .form_input_code {
              width: 320px;
              height: 47px;
              border: 1px solid $color4;
              border-radius: 23px;
              margin-top: 31px;
              margin-left: 21px;
              margin-right: 22px;
              box-sizing: border-box;
              padding-left: 60px;
              font-size: 16px;
              font-weight: 400;
            }
          }
        }
        .form_input_mobile {
          width: 320px;
          height: 47px;
          border: 1px solid $color4;
          border-radius: 23px;
          margin-top: 20px;
          margin-left: 21px;
          margin-right: 22px;
          box-sizing: border-box;
          padding-left: 91px;
          font-size: 16px;
          font-weight: 400;
        }
        .form_input_code {
          width: 320px;
          height: 47px;
          border: 1px solid $color4;
          border-radius: 23px;
          margin-top: 31px;
          margin-left: 21px;
          margin-right: 22px;
          box-sizing: border-box;
          padding-left: 60px;
          font-size: 16px;
          font-weight: 400;
        }
        .register_email_img {
          width: 17.33px;
          height: 16.67px;
          position: absolute;
          left: 50px;
          top: 45px;
        }
        .code_line {
          width: 0px;
          height: 26px;
          border: 1px solid $color16;
          position: absolute;
          right: 150px;
          top: 41px;
          line-height: 26px;
        }
        .code_desc {
          font-size: 16px;
          font-weight: 400;
          line-height: 26px;
          color: $color16;
          position: absolute;
          right: 36px;
          top: 41px;
        }
        .code_btn {
          font-size: 16px;
          font-weight: 400;
          line-height: 26px;
          color: $color8;
          position: absolute;
          right: 50px;
          top: 41px;
          display: inline-block;
          cursor: pointer;
        }
        .register_label {
          position: absolute;
          left: 37px;
          top: 43px;

          font-size: 16px;
          font-weight: 400;
          color: $color16;
        }
        .register_mobile_img {
          width: 8px;
          height: 9px;
          position: absolute;
          left: 75px;
          top: 51px;
        }
        .error_msg {
          color: $color15;
          margin-left: 112px;
          font-size: 12px;
          visibility: visible;
        }
        .error_msg_hidden {
          visibility: hidden;
        }
        .banner_view {
          display: flex;
          flex-direction: row;
          margin-top: 13px;
          box-sizing: border-box;
          justify-content: center;
          align-items: center;
          .unchecked {
            width: 18px;
            height: 18px;
            background: #ffffff;
            border: 1px solid $color17;
            border-radius: 50%;
            margin-right: 3px;
            margin-top: -3px;
            box-sizing: border-box;
          }
          .accept_content_img {
            width: 18px;
            height: 18px;
            margin-right: 3px;
            border-radius: 50%;
            box-sizing: border-box;
          }
          .line_normal {
            color: $color18;
            font-size: 16px;
          }
          .line_important {
            color: $color4;
            font-size: 16px;
          }
        }
        .accept_error_msg {
          color: $color15;
          font-size: 12px;
          text-align: center;
          margin-left: 112px;
        }
      }

      .login_icon {
        height: 58px;
        position: absolute;
        bottom: 56px;
        left: 130px;
        right: 130px;
      }
      .label_return {
        font-size: 16px;
        position: absolute;
        bottom: 30px;
        left: 150px;
        color: #2361ac;
        cursor: pointer;
      }
      .card_login {
        font-size: 16px;
        position: absolute;
        bottom: 30px;
        left: 170px;
        color: #2361ac;
        cursor: pointer;
      }

      .mobile_view {
        box-sizing: border-box;
        position: relative;
        .form_input_mobile {
          width: 320px;
          height: 47px;
          border: 1px solid $color4;
          border-radius: 23px;
          margin-top: 31px;
          margin-left: 21px;
          margin-right: 22px;
          box-sizing: border-box;
          padding-left: 56px;
          font-size: 16px;
          font-weight: 400;
        }
        .user_mobile_img {
          width: 17.33px;
          height: 12px;
          position: absolute;
          top: 47px;
          left: 45px;
        }
        .error_msg {
          color: $color15;
          margin-left: 77px;
          font-size: 12px;
          visibility: visible;
        }
        .error_msg_hidden {
          visibility: hidden;
        }
      }
      .pwd_view {
        box-sizing: border-box;
        position: relative;
        .form_input_pwd {
          width: 320px;
          height: 47px;
          border: 1px solid $color4;
          border-radius: 23px;
          margin-top: 5px;
          margin-left: 21px;
          margin-right: 22px;
          box-sizing: border-box;
          padding-left: 56px;
          font-size: 16px;
          font-weight: 400;
        }
        .user_pwd_img {
          width: 17.33px;
          height: 19.4px;
          position: absolute;
          top: 18px;
          left: 45px;
        }
        .error_msg {
          color: $color15;
          margin-left: 77px;
          font-size: 12px;
          visibility: visible;
        }
        .error_msg_hidden {
          visibility: hidden;
        }
      }
      .btn_submit {
        margin-left: 21px;
        margin-right: 22px;
        margin-top: 15px;
        margin-bottom: 13px;
        width: 320px;
        height: 47px;
        background: $color4;
        box-shadow: 0px 3px 6px rgba(35, 97, 172, 0.38);
        opacity: 1;
        border-radius: 23px;

        font-size: 16px;
        font-weight: 400;
        line-height: 45px;
        color: $color9;
      }
      .dec_view {
        display: flex;
        margin-top: 13px;
        flex-direction: row;
        justify-content: center;
        box-sizing: border-box;
        align-items: baseline;
        .label01 {
          font-size: 16px;
          font-weight: 400;
          line-height: 15px;
          color: $color13;
        }
        .label02 {
          font-size: 16px;
          font-weight: 400;
          line-height: 15px;
          color: $color4;
          margin-left: 4px;
          margin-right: 4px;
          padding-right: 5px;
          position: relative;
          cursor: pointer;
          &::before {
            position: absolute;
            top: -4px;
            right: 0;
            bottom: 0;
            height: 18px;
            width: 0px;
            border: 1px solid $color13;
            content: '';
          }
        }
        .label04 {
          font-size: 16px;
          font-weight: 400;
          line-height: 15px;
          color: $color13;
          cursor: pointer;
        }
      }

      .success_login_img {
        width: 91.47px;
        height: 91.47px;
        margin-left: 135px;
        margin-right: 137px;
        margin-top: 42px;
      }
      .success_label {
        color: $color8;
        font-size: 16px;
        text-align: center;
        margin-top: 9px;
        .success_label_return_index {
          color: $color4;
          font-size: 20px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
