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
          <div class="left_view">快速注册</div>
          <div class="right_view">账号登录</div>
        </div>
        <div class="mobile_view">
          <input class="form_input_mobile" type="text" placeholder="请输入手机号" v-model.trim="accountName" />
          <div class="error_msg">手机号有误</div>
          <img class="user_mobile_img" src="@a/imgs/user_mobile.png" alt="" srcset="@a/imgs/user_mobile@2x.png 2x" />
        </div>
        <div class="pwd_view">
          <input class="form_input_pwd" type="password" placeholder="请输入密码" v-model.trim="accountPwd" />
          <div class="error_msg">密码有误</div>
          <img class="user_pwd_img" src="@a/imgs/user_pwd.png" alt="" srcset="@a/imgs/user_pwd@2x.png 2x" />
        </div>

        <button class="btn_submit" @click="loginSooYi">提交</button>
        <div class="dec_view">
          <span class="label01">没有账号?</span>
          <span class="label02">马上注册</span>
          <span class="label04">忘记密码</span>
        </div>
        <img
          class="login_bottom_img"
          src="@a/imgs/login_bottom_img.png"
          alt=""
          srcset="@a/imgs/login_bottom_img@2x.png 2x"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'LoginView',
  data() {
    return {
      accountName: '15801755080',
      accountPwd: 'guest'
    }
  },
  methods: {
    loginSooYi() {
      axios
        .post(process.env.VUE_APP_BASE_API_URL + '/MIS/CMS/Auth/GetToken', {
          accountName: this.accountName,
          accountPwd: this.accountPwd
        })
        .then(res => {
          if (res.data.result) {
            alert('通过网关访问,登录成功!用户名:' + res.data.userInfo.userName)
            alert('Token:' + res.data.token)
          }
        })
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

          background: $color12;
          border: 1px solid $color6;
          opacity: 1;
          border-radius: 0px 0px 0.145833rem 0px;
          color: $color13;
          font-size: $font_size20;
          font-weight: bold;
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

          color: $color14;
        }
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
        }
      }
      .login_bottom_img {
        width: 0.715694rem;
        height: 0.402361rem;
        margin: 0 auto;
        margin-top: 0.319444rem;
      }
    }
  }
}
</style>
