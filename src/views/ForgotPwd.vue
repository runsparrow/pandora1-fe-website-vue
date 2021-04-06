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
              <span class="logo_title" @click="toHome">SooYi.CN</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="form_view">
        <div class="title_view">
          <div :class="['left_view']">
            找回密码
          </div>
          <div :class="['right_view']">
            &nbsp;
          </div>
        </div>
        <template v-if="!registSuccess">
          <div class="mobile_register_view">
            <input
              class="form_input_mobile"
              type="text"
              placeholder="请输入手机号"
              v-model.trim="accountName"
              @keyup="validAccountName($event)"
              v-if="register_show === 0"
            />
            <span class="register_label" v-if="register_show === 0">+86</span>
            <img
              class="register_mobile_img"
              src="@a/imgs/register_mobile.png"
              alt=""
              srcset="@a/imgs/register_mobile@2x.png 2x"
              v-if="register_show === 0"
            />
            <div v-if="register_show === 0" :class="['error_msg', { error_msg_hidden: !accountNameInValid }]">
              {{ accountNameErrorMsg }}
            </div>

            <input
              class="form_input_code"
              maxlength="6"
              type="text"
              placeholder="输入验证码"
              v-model.trim="accountCode"
              @keyup="validCode($event)"
              v-if="register_show === 1"
            />
            <img
              class="register_email_img"
              v-if="register_show === 1"
              src="@a/imgs/email.png"
              alt=""
              srcset="@a/imgs/email@2x.png 2x"
            />
            <div class="code_line" v-if="register_show === 1"></div>

            <span class="code_desc" v-if="register_show === 1 && code_seconds > 0">{{ code_seconds }}s后重新获取</span>
            <span
              class="code_btn"
              v-if="register_show === 1 && code_seconds === 0"
              @click="reloadGetCode"
              :disabled="btn_disabled"
              >重新获取</span
            >
            <div
              v-if="register_show === 1"
              :class="['error_msg', { error_msg_hidden: !accountCodeInValid }]"
              style="margin-left:82px"
            >
              {{ accountCodeErrorMsg }}
            </div>

            <div class="pwd_view">
              <input
                class="form_input_pwd"
                maxlength="20"
                type="password"
                placeholder="请输入新密码"
                v-model.trim="accountRegPwd"
                @keyup="validRegPwd($event)"
                v-if="register_show === 2"
                style="margin-top: 34px"
              />
              <img
                v-if="register_show === 2"
                class="user_pwd_img"
                src="@a/imgs/user_pwd.png"
                alt=""
                srcset="@a/imgs/user_pwd@2x.png 2x"
              />
              <div
                v-if="register_show === 2"
                :class="['error_msg', { error_msg_hidden: !accountRegPwdInValid }]"
                style="margin-left:82px"
              >
                {{ accountRegPwdErrorMsg }}
              </div>
            </div>
            <div class="pwd_view">
              <input
                class="form_input_pwd"
                style="margin-top:0"
                maxlength="20"
                type="password"
                placeholder="请再次输入密码"
                v-model.trim="accountRegConfirmPwd"
                @keyup="validRegConfirmPwd($event)"
                v-if="register_show === 2"
              />
              <img
                v-if="register_show === 2"
                class="user_pwd_img"
                style="top:14px"
                src="@a/imgs/user_pwd.png"
                alt=""
                srcset="@a/imgs/user_pwd@2x.png 2x"
              />
              <div
                v-if="register_show === 2"
                :class="['error_msg', { error_msg_hidden: !accountRegConfirmPwdInValid }]"
                style="margin-left:82px"
              >
                {{ accountRegConfirmPwdErrorMsg }}
              </div>
            </div>

            <button
              class="btn_submit"
              @click="getCode"
              v-if="register_show === 0"
              style="margin-top:0px;"
              :disabled="btn_disabled"
            >
              获取验证码
            </button>
            <button class="btn_submit" v-if="register_show === 1" @click="submitCode" style="margin-top:0px;">
              提交
            </button>
            <button
              class="btn_submit"
              v-if="register_show === 2"
              @click="submitReg"
              style="margin-top:0px;"
              :disabled="btn_disabled"
            >
              提交
            </button>
          </div>
        </template>
        <template v-else>
          <img
            class="success_login_img"
            src="@a/imgs/success_login.png"
            alt=""
            srcset="@a/imgs/success_login@2x.png 2x"
          />
          <span class="success_label">恭喜您，密码重置成功!</span>
          <span class="success_label"
            >{{ register_seconds }}秒后，<span class="success_label_return_index" @click="tologinPage"
              >返回登录页</span
            ></span
          >
          <button class="btn_submit" @click="tologinPage">立即登录</button>
        </template>
        <img class="login_icon" src="@a/imgs/login_bottom_img.png" alt="" srcset="@a/imgs/login_bottom_img@2x.png 2x" />
        <span class="label_return" @click="toHome">返回首页</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import {
  getUserCodeService,
  submitUserCodeService,
  submitForgotPwdService,
  checkMobileExistService
} from '@s/login-service'
export default {
  name: 'ForgotPwd',
  data() {
    return {
      register_show: 0,
      accountName: '',
      accountNameErrorMsg: '手机号不能为空',
      accountNameInValid: false,
      accountCode: '',
      accountCodeInValid: false,
      accountCodeErrorMsg: '验证码不能为空',
      code_seconds: 60,
      code_timer: null,
      accountRegPwd: '',
      accountRegPwdInValid: false,
      accountRegPwdErrorMsg: '新密码不能为空',
      accountRegConfirmPwd: '',
      accountRegConfirmPwdInValid: false,
      accountRegConfirmPwdErrorMsg: '确认密码不能为空',
      registSuccess: false,
      register_seconds: 5,
      register_time: null,
      btn_disabled: false
    }
  },

  methods: {
    toHome() {
      this.$router.push('/home')
    },
    tologinPage() {
      clearInterval(this.register_time)
      this.$router.replace('/login')
    },
    async submitReg() {
      if (this.accountRegPwd === '') {
        this.accountRegPwdErrorMsg = '新密码不能为空'
        this.accountRegPwdInValid = true
      }
      if (this.accountRegConfirmPwd === '') {
        this.accountRegConfirmPwdErrorMsg = '确认密码不能为空'
        this.accountRegConfirmPwdInValid = true
      }
      if (this.accountRegConfirmPwdInValid || this.accountRegPwdInValid) {
        return
      }
      this.btn_disabled = true
      const { result, errorInfo } = await submitForgotPwdService({
        mobile: this.accountName.trim(),
        code: this.accountCode,
        member: {
          mobile: this.accountName.trim(),
          password: this.accountRegPwd
        }
      })
      if (result) {
        this.btn_disabled = false
        this.registSuccess = true
        this.register_time = setInterval(() => {
          this.register_seconds -= 1
          if (this.register_seconds === 0) {
            clearInterval(this.register_time)
            this.tologinPage()
          }
        }, 1000)
      } else {
        this.btn_disabled = false
        this.register_show = 0
        this.accountName = ''
        this.accountRegPwd = ''
        this.accountRegConfirmPwd = ''
        this.accountCode = ''
      }
    },
    validRegPwd($event) {
      if ($event.target.value === '') {
        this.accountRegPwdErrorMsg = '新密码不能为空'
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
    async submitCode() {
      clearInterval(this.code_timer)
      if (this.accountCode === '') {
        this.accountCodeErrorMsg = '验证码不能为空'
        this.accountCodeInValid = true
        return
      } else {
        this.accountCodeInValid = false
      }
      const { result } = await submitUserCodeService({
        mobile: this.accountName.trim(),
        code: this.accountCode.trim()
      })
      if (result) {
        this.register_show = 2
      } else {
        alert('验证码错误!')
      }
    },
    async reloadGetCode() {
      this.btn_disabled = true
      this.code_seconds = 60
      const { result, code } = await getUserCodeService({
        mobile: this.accountName.trim()
      })
      if (result) {
        this.code_timer = setInterval(() => {
          this.code_seconds -= 1
          if (this.code_seconds === 0) {
            clearInterval(this.code_timer)
            this.btn_disabled = false
          }
        }, 1000)
        alert('短信已发送!')
      }
    },
    validCode($event) {
      if ($event.target.value === '') {
        this.accountCodeErrorMsg = '验证码不能为空'
        this.accountCodeInValid = true
      } else {
        this.accountCodeInValid = false
      }
    },
    async getCode() {
      if (this.accountName.trim() === '') {
        this.accountNameInValid = true
        return
      } else if (this.accountName.trim() !== '' && this.accountNameInValid) {
        return
      } else {
        this.accountNameInValid = false
      }
      this.btn_disabled = true
      const { result } = await checkMobileExistService(this.accountName.trim())
      if (result) {
        const { result, code, message } = await getUserCodeService({
          mobile: this.accountName.trim()
        })
        if (result) {
          this.accountNameErrorMsg = ''
          this.accountNameInValid = false
          this.register_show = 1
          this.code_timer = setInterval(() => {
            this.code_seconds -= 1
            if (this.code_seconds === 0) {
              clearInterval(this.code_timer)
            }
          }, 1000)
          this.btn_disabled = false
          alert('验证码已发送到你的手机!')
        }
      } else {
        if (message) {
          alert(message)
        }
        this.btn_disabled = false
        this.accountNameErrorMsg = '此手机号未注册过！'
        this.accountNameInValid = true
      }
    },
    validAccountName($event) {
      if ($event.target.value === '') {
        this.accountNameErrorMsg = '手机号不能为空'
        this.accountNameInValid = true
      } else {
        if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test($event.target.value)) {
          this.accountNameErrorMsg = '手机号码有误，请重填'
          this.accountNameInValid = true
        } else {
          this.accountNameInValid = false
        }
      }
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
          flex: 1;
          justify-content: space-between;
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
        left: 130px;
        color: #2361ac;
        cursor: pointer;
      }
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
          color: #000c20;
          opacity: 1;
          font-size: 20px;
          font-weight: bold;
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
          border-radius: 0px 0px 21px 0px;
          background: #ffffff;
          color: #707070;
          border: 1px solid #707070;
          border-radius: 0px 0px 0px 21px;
          background: #ebebeb;
        }
      }
      .mobile_register_view {
        box-sizing: border-box;
        position: relative;
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
            top: 47px;
            left: 45px;
          }
        }
        .form_input_mobile {
          width: 320px;
          height: 47px;
          border: 1px solid $color4;
          border-radius: 23px;
          margin-top: 31px;
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
