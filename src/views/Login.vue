<template>
  <div class="loginContainer">
    <div class="container">
      <div class="header_view">
        <div class="top_view">
          <ul class="list">
            <li class="logo">
              <img class="logo_img" src="@a/imgs/logo.png" alt="" srcset="@a/imgs/logo@2x.png 2x" @click="toHome" />
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
      <img class="close_img" :src="require('@a/imgs/close.png')" alt="" @click="closeModal" v-show="modalShow" />
      <private-policy :show="modalShow" style="margin-top: -30px;" />
      <img
        class="close_img"
        :src="require('@a/imgs/close.png')"
        alt=""
        @click="closeUserModal"
        v-show="modalUserShow"
      />
      <user-policy :show="modalUserShow" style="margin-top: -30px;" />
      <div class="form_view">
        <div class="title_view">
          <div
            :class="['left_view', { activeLeftTab: activeTab === 0 }]"
            @click="
              () => (
                $store.commit('setActiveTab', 0),
                (accountName = ''),
                (accountNameInValid = false),
                (accountPwdInValid = false),
                (accept_checked = false),
                (register_show = 0),
                (accountCode = ''),
                (code_seconds = 60),
                (accountCodeInValid = false),
                (userName = ''),
                (userNameErrorMsg = '用户名不能为空'),
                (userNameInValid = false),
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
                $store.commit('setActiveTab', 1),
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
                style="margin-left: 82px"
              >
                {{ accountCodeErrorMsg }}
              </div>
              <div class="pwd_view">
                <input
                  class="form_input_usename"
                  type="text"
                  placeholder="请输入用户名"
                  v-model.trim="userName"
                  @keyup="validUserName($event)"
                  v-if="register_show === 2"
                />
                <div :class="['error_msg', { error_msg_hidden: !userNameInValid }]" v-if="register_show === 2">
                  {{ userNameErrorMsg }}
                </div>
                <img
                  class="user_mobile_img"
                  src="@a/imgs/user_mobile.png"
                  alt=""
                  srcset="@a/imgs/user_mobile@2x.png 2x"
                  v-if="register_show === 2"
                />

                <input
                  class="form_input_pwd"
                  minlength="6"
                  maxlength="10"
                  type="password"
                  placeholder="请输入新密码"
                  v-model.trim="accountRegPwd"
                  @keyup="validRegPwd($event)"
                  v-if="register_show === 2"
                />
                <img
                  v-if="register_show === 2"
                  class="user_pwd_img"
                  src="@a/imgs/user_pwd.png"
                  alt=""
                  srcset="@a/imgs/user_pwd@2x.png 2x"
                  style="top: 114px"
                />
                <div
                  v-if="register_show === 2"
                  :class="['error_msg', { error_msg_hidden: !accountRegPwdInValid }]"
                  style="margin-left: 82px"
                >
                  {{ accountRegPwdErrorMsg }}
                </div>
              </div>
              <div class="pwd_view">
                <input
                  class="form_input_pwd"
                  style="margin-top: 0"
                  minlength="6"
                  maxlength="10"
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
                  style="top: 13px"
                />
                <div
                  v-if="register_show === 2"
                  :class="['error_msg', { error_msg_hidden: !accountRegConfirmPwdInValid }]"
                  style="margin-left: 82px"
                >
                  {{ accountRegConfirmPwdErrorMsg }}
                </div>
              </div>

              <button
                class="btn_submit"
                v-if="register_show === 0"
                @click="getCode"
                style="margin-top: 0px"
                :disabled="btn_disabled"
              >
                获取验证码
              </button>
              <button class="btn_submit" v-if="register_show === 1" @click="submitCode" style="margin-top: 0px">
                提交
              </button>
              <button
                class="btn_submit"
                v-if="register_show === 2"
                @click="submitReg"
                style="margin-top: 0px"
                :disabled="btn_disabled"
              >
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
                <span class="line_important" @click="openUserModalShow">用户协议</span>
                <span class="line_normal">与</span>
                <span class="line_important" @click="openModalShow">隐私政策</span>
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
                placeholder="请输入手机号|用户名|邮箱"
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

            <button
              :disabled="btnLoginLabel === '登录中...' ? true : false"
              class="btn_submit"
              @click="loginSooYi"
              ref="loginRef"
            >
              {{ btnLoginLabel }}
            </button>
            <div class="dec_view">
              <span class="label01">没有账号?</span>
              <span
                class="label02"
                @click="
                  () => (
                    $store.commit('setActiveTab', 0),
                    (accountName = ''),
                    (accountNameInValid = false),
                    (register_show = 0),
                    (accountCode = ''),
                    (code_seconds = 60),
                    (accountRegPwd = ''),
                    (accountRegConfirmPwd = ''),
                    (userName = ''),
                    (userNameErrorMsg = '用户名不能为空!'),
                    (userNameInValid = false)
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
        <span class="label_return" @click="toHomePage">首页</span>
        <span class="card_login" @click="toCardActivatePage">邀请码</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import PrivatePolicy from '@c/PrivatePolicy.vue'
import UserPolicy from '@/components/UserPolicy.vue'
import { setTimeStamp } from '@/libs/util'
import {
  getUserInfoService,
  getUserCodeService,
  submitUserCodeService,
  submitRegService,
  checkMobileExistService,
  checkUseNameExistService
} from '@s/login-service'
import { mineCMSRowByIdService } from '@s/mine-info-service'
export default {
  name: 'LoginView',
  data() {
    return {
      modalShow: false,
      modalUserShow: false,
      accountName: '',
      accountNameErrorMsg: '手机号不能为空',
      accountNameInValid: false,
      accountPwd: '',
      accountPwdInValid: false,
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
  components: { PrivatePolicy, UserPolicy },
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
    closeModal() {
      this.modalShow = false
    },
    closeUserModal() {
      this.modalUserShow = false
    },
    openModalShow() {
      this.modalShow = true
    },
    openUserModalShow() {
      this.modalUserShow = true
    },
    toForgotPage() {
      this.$router.replace('/forgot')
    },
    tologinPage() {
      this.$store.commit('setActiveTab', 1)
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
      } else if ($event.target.value.length < 6) {
        this.accountRegPwdErrorMsg = '密码长度最小6位最大10位'
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
        if ($event.target.value.length < 6) {
          this.accountRegConfirmPwdErrorMsg = '密码长度最小6位最大10位'
          this.accountRegConfirmPwdInValid = true
        } else if (this.accountRegConfirmPwd !== this.accountRegPwd) {
          this.accountRegConfirmPwdErrorMsg = '两次密码不同，请重新输入'
          this.accountRegConfirmPwdInValid = true
        } else {
          this.accountRegConfirmPwdInValid = false
        }
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
            this.btn_disabled = false
            clearInterval(this.code_timer)
          }
        }, 1000)
        alert('短信已发送!')
      }
    },
    toSearch(navigationId) {
      this.searchKeyword = ''
      this.$store.commit('setKeyWords', '')
      this.$store.commit('setNavigationId', navigationId)
      this.$router.push('/search')
    },
    validCode($event) {
      if ($event.target.value === '') {
        this.accountCodeErrorMsg = '验证码不能为空'
        this.accountCodeInValid = true
      } else {
        this.accountCodeInValid = false
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
        code: this.accountCode.trim(),
        member: {
          mobile: this.accountName.trim()
        }
      })
      if (result) {
        this.register_show = 2
      } else {
        alert('验证码错误!')
      }
    },
    async submitReg() {
      this.btn_disabled = true
      if (this.userName === '') {
        this.userNameErrorMsg = '用户名不能为空'
        this.userNameInValid = true
      }
      if (this.accountRegPwd === '') {
        this.accountRegPwdErrorMsg = '新密码不能为空'
        this.accountRegPwdInValid = true
      }
      if (this.accountRegConfirmPwd === '') {
        this.accountRegConfirmPwdErrorMsg = '确认密码不能为空'
        this.accountRegConfirmPwdInValid = true
      }
      if (this.accountRegConfirmPwdInValid || this.accountRegPwdInValid || this.userNameInValid) {
        return
      }

      const { result } = await checkUseNameExistService({
        name: this.userName,
        id: -1
      })
      if (result) {
        this.btn_disabled = false
        this.userNameErrorMsg = '此用户名已被占用，请改用其他用户名!'
        this.userNameInValid = true
      } else {
        this.userNameInValid = false
        const { result, errorInfo } = await submitRegService({
          mobile: this.accountName.trim(),
          code: this.accountCode,
          member: {
            name: this.userName.trim(),
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
          alert(errorInfo)
          this.register_show = 0
          this.accountName = ''
          this.accountRegPwd = ''
          this.accountRegConfirmPwd = ''
          this.accountCode = ''
        }
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
        this.btn_disabled = true
        const { result } = await checkMobileExistService(this.accountName.trim())
        if (!result) {
          // this.accountNameErrorMsg = ''
          this.accountNameInValid = false
          const { result, code, message } = await getUserCodeService({
            mobile: this.accountName.trim()
          })
          if (result) {
            this.btn_disabled = false
            this.register_show = 1
            this.code_timer = setInterval(() => {
              this.code_seconds -= 1
              if (this.code_seconds === 0) {
                clearInterval(this.code_timer)
              }
            }, 1000)
            alert('验证码已发送到你的手机!')
          } else {
            alert(message)
            this.btn_disabled = false
          }
        } else {
          this.accountNameErrorMsg = '此手机号已经注册过！'
          this.accountNameInValid = true
          this.btn_disabled = false
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
      this.btnLoginLabel = '登录中...'
      try {
        const { result, token, member } = await getUserInfoService({
          name: that.accountName,
          password: that.accountPwd
        })
        if (result) {
          this.btnLoginLabel = '登录'
          that.accountNameInValid = false
          that.accountPwdInValid = false
          const dateTime = new Date()
          dateTime.setHours(dateTime.getHours() + 2)
          that.setUserInfoMutation({
            userName: member?.memberName,
            memberId: member?.memberId,
            token: token,
            expires: new Date(dateTime).getTime(),
            levelDeadline: '',
            avatarUrl:
              member.avatarUrl === ''
                ? require('@/assets/imgs/default_header_log.png')
                : process.env.VUE_APP_FE_FILE_URL + member.avatarUrl,
            level: member.level
          })
          setTimeStamp()
          const result2 = await mineCMSRowByIdService(member.memberId)
          that.setUserInfoMutation({
            userName: member?.memberName,
            memberId: member?.memberId,
            email: result2.row.email,
            token: token,
            expires: new Date(dateTime).getTime(),
            levelDeadline: result2.row.levelDeadline,
            avatarUrl:
              member.avatarUrl === ''
                ? require('@/assets/imgs/default_header_log.png')
                : process.env.VUE_APP_FE_FILE_URL + member.avatarUrl,
            level: member.level
          })
          that.timer = setInterval(() => {
            that.seconds -= 1
            if (that.seconds === 0) {
              clearInterval(that.timer)
              if (
                this.$router.currentRoute.query.redirect !== undefined &&
                this.$router.currentRoute.query.redirect !== ''
              ) {
                that.$router.push(this.$router.currentRoute.query.redirect)
              } else {
                that.$router.push('/')
              }
            }
          }, 1000)
        } else {
          this.btnLoginLabel = '登录'
          alert('手机号或密码错误!')
        }
      } catch (err) {
        console.log(err)
      }
    },
    toHomePage() {
      clearInterval(this.timer)
      if (this.$router.currentRoute.query.redirect !== undefined && this.$router.currentRoute.query.redirect !== '') {
        this.$router.push(this.$router.currentRoute.query.redirect)
      } else {
        this.$router.push('/')
      }
    },
    toCardActivatePage() {
      this.$router.push('/card_activate')
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
  position: relative;
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
            cursor: pointer;
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
    position: relative;
    margin: 0 auto;
    /* border: 1px solid blue; */
    background: rgba(72, 72, 72, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    .close_img {
      width: 64px;
      height: 64px;
      position: absolute;
      cursor: pointer;
      z-index: 100;
      top: 120px;
      right: 330px;
    }
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
          border-radius: 0px 0px 21px 0px;
          background: #ffffff;
          color: #707070;
          border: 1px solid #707070;
          border-radius: 0px 0px 0px 21px;
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
            cursor: pointer;
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
        left: 130px;
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
