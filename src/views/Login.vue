<template>
  <div class="loginContainer">
    <div class="container">
      <div class="header_view">
        <div class="top_view">
          <ul class="list">
            <li class="logo">
              <img class="logo_img" src="@a/imgs/logo_01.png" alt="" srcset="@a/imgs/logo_01@2x.png 2x" />
              <span class="logo_title">SooYi.CN</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="form_view">
        <div class="title_view">
          <div
            :class="['left_view', { activeLeftTab: activeTab === 0 }]"
            @click="
              () => (
                (activeTab = 0),
                (accountName = ''),
                (accountNameInValid = false),
                (accountPwdInValid = false),
                (accept_checked = false),
                (register_show = 0),
                (accountCode = ''),
                (code_seconds = 60),
                (accountCodeInValid = false),
                (accountRegPwd = ''),
                (accountRegConfirmPwd = ''),
                (accountRegPwdInValid = false),
                (accountRegConfirmPwdInValid = false)
              )
            "
          >
            快速注册
          </div>
          <div
            :class="['right_view', { activeRightTab: activeTab === 1 }]"
            @click="
              () => (
                (activeTab = 1),
                (accountName = ''),
                (accountNameInValid = false),
                (accountPwdInValid = false),
                (accountPwd = '')
              )
            "
          >
            账号登录
          </div>
        </div>
        <template v-if="activeTab === 0">
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

              <span class="code_desc" v-if="register_show === 1 && code_seconds > 0"
                >{{ code_seconds }}s后重新获取</span
              >
              <span class="code_btn" v-if="register_show === 1 && code_seconds === 0" @click="reloadGetCode"
                >重新获取</span
              >
              <div
                v-if="register_show === 1"
                :class="['error_msg', { error_msg_hidden: !accountCodeInValid }]"
                style="margin-left:.569444rem"
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
                  style="margin-top: .236111rem"
                />
                <img
                  v-if="register_show === 2"
                  class="user_pwd_img"
                  src="@a/imgs/user_pwd.png"
                  alt=""
                  srcset="@a/imgs/user_pwd@2x.png 2x"
                  style="top: 0.326389rem;"
                />
                <div
                  v-if="register_show === 2"
                  :class="['error_msg', { error_msg_hidden: !accountRegPwdInValid }]"
                  style="margin-left:.569444rem"
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
                  src="@a/imgs/user_pwd.png"
                  alt=""
                  srcset="@a/imgs/user_pwd@2x.png 2x"
                  style="top:.090278rem"
                />
                <div
                  v-if="register_show === 2"
                  :class="['error_msg', { error_msg_hidden: !accountRegConfirmPwdInValid }]"
                  style="margin-left:.569444rem"
                >
                  {{ accountRegConfirmPwdErrorMsg }}
                </div>
              </div>

              <button class="btn_submit" v-if="register_show === 0" @click="getCode" style="margin-top:0px;">
                获取验证码
              </button>
              <button class="btn_submit" v-if="register_show === 1" @click="submitCode" style="margin-top:0px;">
                提交
              </button>
              <button class="btn_submit" v-if="register_show === 2" @click="submitReg" style="margin-top:0px;">
                提交
              </button>
              <div class="banner_view" v-if="register_show < 2">
                <div class="unchecked" v-if="!accept_checked" @click="accept_checked = !accept_checked"></div>
                <img
                  v-else
                  @click="accept_checked = !accept_checked"
                  class="accept_content_img"
                  src="@a/imgs/accept_content.png"
                  alt=""
                  srcset="@a/imgs/accept_content@2x.png 2x"
                />
                <span class="line_normal" @click="accept_checked = !accept_checked">同意</span>
                <span class="line_important">用户协议</span>
                <span class="line_normal">与</span>
                <span class="line_important">隐私政策</span>
              </div>
              <span v-if="!accept_checked && register_show < 2" class="accept_error_msg"
                >请阅读后点击同意以完成注册</span
              >
            </div>
          </template>
          <template v-else>
            <img
              class="success_login_img"
              src="@a/imgs/success_login.png"
              alt=""
              srcset="@a/imgs/success_login@2x.png 2x"
            />
            <span class="success_label">恭喜您，已经完成注册!</span>
            <span class="success_label"
              >{{ register_seconds }}秒后，<span class="success_label_return_index" @click="tologinPage"
                >返回登录页</span
              ></span
            >
            <button class="btn_submit" @click="tologinPage">立即登录</button>
          </template>
        </template>
        <template v-else>
          <template v-if="token === ''">
            <div class="mobile_view">
              <input
                class="form_input_mobile"
                type="text"
                placeholder="请输入手机号"
                v-model.trim="accountName"
                @keyup="validAccountName($event)"
              />
              <div :class="['error_msg', { error_msg_hidden: !accountNameInValid }]">{{ accountNameErrorMsg }}</div>
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
                placeholder="请输入密码"
                v-model.trim="accountPwd"
                @keyup="validAccountPwd($event)"
              />
              <div :class="['error_msg', { error_msg_hidden: !accountPwdInValid }]">密码不能为空</div>
              <img class="user_pwd_img" src="@a/imgs/user_pwd.png" alt="" srcset="@a/imgs/user_pwd@2x.png 2x" />
            </div>

            <button class="btn_submit" @click="loginSooYi">提交</button>
            <div class="dec_view">
              <span class="label01">没有账号?</span>
              <span
                class="label02"
                @click="
                  () => (
                    (activeTab = 0),
                    (accountName = ''),
                    (accountNameInValid = false),
                    (register_show = 0),
                    (accountCode = ''),
                    (code_seconds = 60),
                    (accountRegPwd = ''),
                    (accountRegConfirmPwd = '')
                  )
                "
                >马上注册</span
              >
              <span class="label04" @click="toForgotPage">忘记密码</span>
            </div>
          </template>
          <template v-else>
            <img
              class="success_login_img"
              src="@a/imgs/success_login.png"
              alt=""
              srcset="@a/imgs/success_login@2x.png 2x"
            />
            <span class="success_label">恭喜您，已经成功登录!</span>
            <span class="success_label"
              >{{ seconds }}秒后，<span class="success_label_return_index" @click="toHomePage">返回首页</span></span
            >
            <button class="btn_submit" @click="toHomePage">立即跳转</button>
          </template>
        </template>
        <img class="login_icon" src="@a/imgs/login_bottom_img.png" alt="" srcset="@a/imgs/login_bottom_img@2x.png 2x" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { getUserInfoService, getUserCodeService, submitUserCodeService, submitRegService } from '@s/login-service'
export default {
  name: 'LoginView',
  data() {
    return {
      accountName: '',
      accountNameErrorMsg: '手机号不能为空',
      accountNameInValid: false,
      accountPwd: '',
      accountPwdInValid: false,
      timer: null,
      code_timer: null,
      register_time: null,
      seconds: 3,
      activeTab: 1,
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
      registSuccess: false
    }
  },
  computed: {
    ...mapState(['token', 'code']),
    ...mapGetters(['version'])
  },
  methods: {
    ...mapMutations(['setUserInfoMutation']),
    toForgotPage() {
      this.$router.push('/forgot')
    },
    tologinPage() {
      this.activeTab = 1
      this.register_show = 0
      this.registSuccess = false
      this.accountName = ''
      this.code_seconds = 60
      this.register_seconds = 5
      clearInterval(this.register_time)
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
    async reloadGetCode() {
      this.code_seconds = 60
      const { result, code } = await getUserCodeService({
        mobile: this.accountName.trim()
      })
      if (result) {
        this.code_timer = setInterval(() => {
          this.code_seconds -= 1
          if (this.code_seconds === 0) {
            clearInterval(this.code_timer)
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
        this.accountNameInValid = false
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
      if (!this.accept_checked) {
        return
      }
      const { result } = await submitUserCodeService({
        mobile: this.accountName.trim(),
        code: this.accountCode.trim()
      })
      if (result) {
        this.register_show = 2
      }
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
      const { result, errorInfo } = await submitRegService({
        mobile: this.accountName.trim(),
        password: this.accountRegPwd,
        gender: ''
      })
      if (result) {
        this.registSuccess = true
        this.register_time = setInterval(() => {
          this.register_seconds -= 1
          if (this.register_seconds === 0) {
            clearInterval(this.register_time)
            this.tologinPage()
          }
        }, 1000)
      } else {
        alert(errorInfo)
        this.register_show = 0
        this.accountName = ''
        this.accountRegPwd = ''
        this.accountRegConfirmPwd = ''
        this.accountCode = ''
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
      if (!this.accept_checked) {
        return
      } else {
        const { result, code } = await getUserCodeService({
          mobile: this.accountName.trim()
        })
        if (result) {
          this.register_show = 1
          this.code_timer = setInterval(() => {
            this.code_seconds -= 1
            if (this.code_seconds === 0) {
              clearInterval(this.code_timer)
            }
          }, 1000)
          alert('验证码已发送到你的手机!')
        }
      }
    },
    validAccountPwd($event) {
      if ($event.target.value === '') {
        this.accountPwdInValid = true
      } else {
        this.accountPwdInValid = false
      }
    },
    async loginSooYi() {
      let that = this
      if (that.accountName === '') {
        that.accountNameInValid = true
      }
      if (that.accountPwd === '') {
        that.accountPwdInValid = true
      }
      if (that.accountNameInValid || that.accountPwdInValid) {
        return
      }
      try {
        const {
          result,
          token,
          userInfo: { userName }
        } = await getUserInfoService({ accountName: that.accountName, accountPwd: that.accountPwd })
        if (result) {
          that.accountNameInValid = false
          that.accountPwdInValid = false
          const dateTime = new Date()
          dateTime.setHours(dateTime.getHours() + 2)
          that.setUserInfoMutation({ userName: userName, token: token, expires: new Date(dateTime).getTime() })
          that.timer = setInterval(() => {
            that.seconds -= 1
            if (that.seconds === 0) {
              clearInterval(that.timer)
              that.$router.push('/')
            }
          }, 1000)
        } else {
          alert('手机号或密码错误!')
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
  .container {
    box-sizing: border-box;
    padding-left: 0.993056rem;
    .header_view {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      .top_view {
        height: 0.673611rem;
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
              width: 0.430625rem;
              height: 0.242083rem;
            }
            .logo_title {
              color: $color4;
              font-size: $font-size37;
              line-height: 0.180556rem;
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
      width: 2.520833rem;
      box-sizing: border-box;
      height: 3.472222rem;
      background: #ffffff;
      margin-top: 1.229167rem;
      margin-bottom: 1.736111rem;
      display: flex;
      flex-direction: column;
      position: relative;
      .title_view {
        height: 0.326389rem;
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
          border-radius: 0px 0px 0.145833rem 0px;
          background: #ebebeb;
          opacity: 1;
          font-size: $font_size20;
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
          font-size: $font_size20;
          font-weight: bold;
          cursor: pointer;
          border-radius: 0px 0px 0.145833rem 0px;
          background: #ffffff;
          color: #707070;
          border: 1px solid #707070;
          border-radius: 0px 0px 0px 0.145833rem;
          background: #ebebeb;
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
          border-radius: 0px 0px 0px 0.145833rem; */
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
          .form_input_pwd {
            box-sizing: border-box;
            position: relative;
            .form_input_code {
              width: 2.222222rem;
              height: 0.326389rem;
              border: 1px solid $color4;
              border-radius: 0.159722rem;
              margin-top: 0.215278rem;
              margin-left: 0.145833rem;
              margin-right: 0.152778rem;
              box-sizing: border-box;
              padding-left: 0.416667rem;
              font-size: $font_size16;
              font-weight: 400;
            }
          }
        }
        .form_input_mobile {
          width: 2.222222rem;
          height: 0.326389rem;
          border: 1px solid $color4;
          border-radius: 0.159722rem;
          margin-top: 0.215278rem;
          margin-left: 0.145833rem;
          margin-right: 0.152778rem;
          box-sizing: border-box;
          padding-left: 0.631944rem;
          font-size: $font_size16;
          font-weight: 400;
        }
        .form_input_code {
          width: 2.222222rem;
          height: 0.326389rem;
          border: 1px solid $color4;
          border-radius: 0.159722rem;
          margin-top: 0.215278rem;
          margin-left: 0.145833rem;
          margin-right: 0.152778rem;
          box-sizing: border-box;
          padding-left: 0.416667rem;
          font-size: $font_size16;
          font-weight: 400;
        }
        .register_email_img {
          width: 0.120347rem;
          height: 0.115764rem;
          position: absolute;
          left: 0.347222rem;
          top: 0.3125rem;
        }
        .code_line {
          width: 0px;
          height: 0.180556rem;
          border: 1px solid $color16;
          position: absolute;
          right: 1.041667rem;
          top: 0.284722rem;
          line-height: 0.180556rem;
        }
        .code_desc {
          font-size: $font_size16;
          font-weight: 400;
          line-height: 0.180556rem;
          color: $color16;
          position: absolute;
          right: 0.25rem;
          top: 0.284722rem;
        }
        .code_btn {
          font-size: $font_size16;
          font-weight: 400;
          line-height: 0.180556rem;
          color: $color8;
          position: absolute;
          right: 0.347222rem;
          top: 0.284722rem;
          display: inline-block;
          cursor: pointer;
        }
        .register_label {
          position: absolute;
          left: 0.256944rem;
          top: 0.298611rem;

          font-size: $font_size16;
          font-weight: 400;
          color: $color16;
        }
        .register_mobile_img {
          width: 0.055556rem;
          height: 0.0625rem;
          position: absolute;
          left: 0.520833rem;
          top: 0.354167rem;
        }
        .error_msg {
          color: $color15;
          margin-left: 0.777778rem;
          font-size: $font_size12;
          visibility: visible;
        }
        .error_msg_hidden {
          visibility: hidden;
        }
        .banner_view {
          display: flex;
          flex-direction: row;
          margin-top: 0.090278rem;
          box-sizing: border-box;
          justify-content: center;
          align-items: center;
          .unchecked {
            width: 0.125rem;
            height: 0.125rem;
            background: #ffffff;
            border: 1px solid $color17;
            border-radius: 50%;
            margin-right: 0.020833rem;
            margin-top: -0.020833rem;
            box-sizing: border-box;
          }
          .accept_content_img {
            width: 0.125rem;
            height: 0.125rem;
            margin-right: 0.020833rem;
            border-radius: 50%;
            box-sizing: border-box;
          }
          .line_normal {
            color: $color18;
            font-size: $font_size16;
          }
          .line_important {
            color: $color4;
            font-size: $font_size16;
          }
        }
        .accept_error_msg {
          color: $color15;
          font-size: $font_size12;
          text-align: center;
          margin-left: 0.777778rem;
        }
      }

      .login_icon {
        width: 0.715694rem;
        height: 0.402361rem;
        position: absolute;
        bottom: 0.388889rem;
        left: 0.902778rem;
        right: 0.902778rem;
      }

      .mobile_view {
        box-sizing: border-box;
        position: relative;
        .form_input_mobile {
          width: 2.222222rem;
          height: 0.326389rem;
          border: 1px solid $color4;
          border-radius: 0.159722rem;
          margin-top: 0.215278rem;
          margin-left: 0.145833rem;
          margin-right: 0.152778rem;
          box-sizing: border-box;
          padding-left: 0.388889rem;
          font-size: $font_size16;
          font-weight: 400;
        }
        .user_mobile_img {
          width: 0.120347rem;
          height: 0.083611rem;
          position: absolute;
          top: 0.326389rem;
          left: 0.3125rem;
        }
        .error_msg {
          color: $color15;
          margin-left: 0.534722rem;
          font-size: $font_size12;
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
          width: 2.222222rem;
          height: 0.326389rem;
          border: 1px solid $color4;
          border-radius: 0.159722rem;
          margin-top: 0.034722rem;
          margin-left: 0.145833rem;
          margin-right: 0.152778rem;
          box-sizing: border-box;
          padding-left: 0.388889rem;
          font-size: $font_size16;
          font-weight: 400;
        }
        .user_pwd_img {
          width: 0.120347rem;
          height: 0.134722rem;
          position: absolute;
          top: 0.125rem;
          left: 0.3125rem;
        }
        .error_msg {
          color: $color15;
          margin-left: 0.534722rem;
          font-size: $font_size12;
          visibility: visible;
        }
        .error_msg_hidden {
          visibility: hidden;
        }
      }
      .btn_submit {
        margin-left: 0.145833rem;
        margin-right: 0.152778rem;
        margin-top: 0.104167rem;
        margin-bottom: 0.090278rem;
        width: 2.222222rem;
        height: 0.326389rem;
        background: $color4;
        box-shadow: 0px 3px 6px rgba(35, 97, 172, 0.38);
        opacity: 1;
        border-radius: 0.159722rem;

        font-size: $font_size16;
        font-weight: 400;
        line-height: 0.3125rem;
        color: $color9;
      }
      .dec_view {
        display: flex;
        margin-top: 0.090278rem;
        flex-direction: row;
        justify-content: center;
        box-sizing: border-box;
        align-items: baseline;
        .label01 {
          font-size: $font_size16;
          font-weight: 400;
          line-height: 0.010417rem;
          color: $color13;
        }
        .label02 {
          font-size: $font_size16;
          font-weight: 400;
          line-height: 0.010417rem;
          color: $color4;
          margin-left: 0.027778rem;
          margin-right: 0.027778rem;
          padding-right: 0.034722rem;
          position: relative;
          cursor: pointer;
          &::before {
            position: absolute;
            top: -0.069444rem;
            right: 0;
            bottom: 0;
            height: 0.125rem;
            width: 0px;
            border: 1px solid $color13;
            content: '';
          }
        }
        .label04 {
          font-size: $font_size16;
          font-weight: 400;
          line-height: 0.010417rem;
          color: $color13;
          cursor: pointer;
        }
      }

      .success_login_img {
        width: 0.635208rem;
        height: 0.635208rem;
        margin-left: 0.9375rem;
        margin-right: 0.951389rem;
        margin-top: 0.291667rem;
      }
      .success_label {
        color: $color8;
        font-size: $font_size16;
        text-align: center;
        margin-top: 0.0625rem;
        .success_label_return_index {
          color: $color4;
          font-size: $font_size20;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
