<template>
  <div class="container">
    <div class="header_view"></div>
    <div class="top_view">
      <ul class="list">
        <li class="logo">
          <img class="logo_img" src="../assets/imgs/logo_01.png" alt="" srcset="../assets/imgs/logo_01@2x.png 2x" />
          <span class="logo_title">SooYi.CN</span>
        </li>
        <li class="label">推广海报</li>
        <li class="label">新媒体配置</li>
        <li class="label">视频动画</li>
        <li class="seperator"></li>
        <li class="search_item">
          <input type="text" placeholder="搜索素材" />

          <div class="search_right_bg_view">
            <img class="search_icon" src="../assets/imgs/search.png" alt="" srcset="../assets/imgs/search@2x.png 2x" />
            <img
              class="search_clear"
              src="../assets/imgs/search_clear.png"
              alt=""
              srcset="../assets/imgs/search_clear@2x.png 2x"
            />
          </div>
        </li>
        <li class="btn_view" v-if="true">
          <span class="btn1">注册</span>
          <span class="btn2">登录</span>
        </li>
        <li v-else class="btn_view">
          <div class="login_header_logo">
            头像
          </div>
          <span class="username">徐升</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchListView'
}
</script>

<style lang="scss" scoped>
@import '../assets/css/colors';
@import '../assets/css/font_size';
.container {
  box-sizing: border-box;
  margin-left: 0.715278rem;
  margin-right: 0.736111rem;
  width: 8.548611rem;
  .header_view {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .top_view {
      height: 0.833333rem;
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
        .label {
          color: $color1;
          font-size: $font_size16;
          margin-top: 0.138889rem;
        }
        .seperator {
          position: relative;
          &::before {
            position: absolute;
            top: -0.034722rem;
            right: 0;
            left: 0;
            bottom: 0;
            height: 0.180556rem;
            width: 0px;
            border: 1px solid $color2;
            content: '';
            background-color: red;
          }
        }
        .search_item {
          box-sizing: border-box;
          position: relative;
          padding-top: 0.076389rem;
          position: relative;

          input {
            width: 1.798611rem;
            height: 0.277778rem;
            border: 1px solid $color3;
            border-radius: 0.173611rem;
            box-sizing: border-box;
            padding-left: 0.15625rem;
            font-size: $font_size16;
          }

          .search_right_bg_view {
            position: absolute;
            right: 0;
            top: 0.076389rem;
            width: 0.256944rem;
            height: 0.277778rem;
            background-image: url('../assets/imgs/search_right_bg.png');
            background-repeat: no-repeat;
            background-size: 0.256944rem 0.277778rem;
            display: flex;
            justify-content: center;
            align-items: center;
            .search_clear {
              width: 0.087361rem;
              height: 0.0875rem;
              cursor: pointer;
            }
            .search_icon {
              width: 0.132083rem;
              height: 0.132083rem;
              position: absolute;
              left: -0.236597rem;
              top: 0.069444rem;
              cursor: pointer;
            }
          }
        }
        .btn_view {
          display: flex;
          flex-direction: row;
          width: 1.222222rem;
          justify-content: flex-end;
          box-sizing: border-box;
          padding-top: 0.076389rem;
          .btn1 {
            width: 0.555556rem;
            height: 0.277778rem;
            background: $color4;
            border-radius: 21px;
            display: block;
            color: $color9;
            font-size: $font-size16;
            text-align: center;
            line-height: 0.277778rem;
            margin-right: 0.041667rem;
            cursor: pointer;
          }
          .btn2 {
            width: 0.555556rem;
            height: 0.277778rem;
            background: $color9;
            border: 1px solid $color6;
            border-radius: 21px;
            display: block;
            color: $color4;
            font-size: $font-size16;
            text-align: center;
            line-height: 0.277778rem;
            margin-left: 0.041667rem;
            cursor: pointer;
          }
          .login_header_logo {
            width: 0.465278rem;
            height: 0.465278rem;
            border: 1px solid #707070;
            border-radius: 50%;
            text-align: center;
            line-height: 0.465278rem;
            font-size: $font_size16;
            font-weight: 400;
            color: $color1;
          }
          .username {
            font-size: $font_size16;
            font-family: Microsoft YaHei;
            font-weight: 400;
            line-height: 0.465278rem;
            margin-left: 0.055556rem;
          }
        }
      }
    }
  }
}
</style>
