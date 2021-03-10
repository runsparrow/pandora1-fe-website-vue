<template>
  <div class="searchDetailView">
    <div class="container">
      <div class="header_view">
        <div class="top_view">
          <ul class="list">
            <li class="logo">
              <img class="logo_img" src="@a/imgs/logo_01.png" alt="" srcset="@a/imgs/logo_01@2x.png 2x" />
              <span class="logo_title">SooYi.CN</span>
            </li>
            <li class="label">推广海报</li>
            <li class="label">新媒体配置</li>
            <li class="label">视频动画</li>
            <li class="seperator"></li>
            <li class="search_item">
              <input type="text" placeholder="搜索素材" />

              <div class="search_right_bg_view">
                <img class="search_icon" src="@a/imgs/search.png" alt="" srcset="@a/imgs/search@2x.png 2x" />
                <img
                  class="search_clear"
                  src="@a/imgs/search_clear.png"
                  alt=""
                  srcset="@a/imgs/search_clear@2x.png 2x"
                />
              </div>
            </li>
            <li class="btn_view" v-if="token === ''">
              <span class="btn1">注册</span>
              <span class="btn2">登录</span>
            </li>
            <li v-else class="btn_view">
              <div class="login_header_logo">
                头像
              </div>
              <span class="username">{{ userName }}</span>
            </li>
          </ul>
        </div>
        <div class="logo_view">
          BANNER(请给与尺寸范围)
        </div>
      </div>
    </div>
    <div class="content">
      <img class="big_img" src="@a/imgs/big_img.png" alt="" srcset="@a/imgs/big_img@2x.png 2x" />
      <div class="nav">
        <div class="top_view">
          <span class="label">首页</span>
          <span class="operator">></span>
          <span class="label">推广海报</span>
        </div>
        <span class="title">元旦牛气冲天海报</span>
        <span class="id_label">ID:yyyymmdd000000</span>
        <span class="sucai_desc">素材版权说明</span>
        <div class="line"></div>
        <span class="spec">格式 | PSD</span>
        <span class="spec">分辨率 | 300DPI</span>
        <span class="spec">尺寸 | 1080 x 2200 PX</span>
        <span class="spec">颜色 | RGB</span>
        <span class="spec">大小 | 9.9 M</span>
        <div class="btn_view">
          <div class="buy_vip">
            立即开通VIP
          </div>
          <div class="collect">
            收藏
          </div>
        </div>
        <div class="line"></div>
        <div class="author_view">
          <div class="login_header_logo">
            头像
          </div>
          <div class="right_view">
            <div class="level">
              <span>Lv.1</span>
              <span class="author_type">设计爱好者</span>
            </div>
            <div class="username">
              <span>用户名</span>
              <span class="author">徐升</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'ProductDetail',
  computed: {
    ...mapState(['token', 'userName'])
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/colors';
@import '../assets/css/font_size';
.searchDetailView {
  box-sizing: border-box;
  width: 10rem;
  margin: 0 auto;
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
              border: 1px solid $color6;
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
      .logo_view {
        box-sizing: border-box;
        height: 1.416667rem;
        display: flex;
        color: $color1;
        justify-content: center;
        align-items: center;
        font-size: $font_size17;
        border: 1px solid $color6;
      }
    }
  }
  .content {
    box-sizing: border-box;
    background: $color11;
    padding-left: 0.715278rem;
    padding-right: 0.736111rem;
    padding-top: 0.222222rem;
    padding-bottom: 0.270833rem;
    display: flex;
    flex-direction: row;
    .big_img {
      box-sizing: border-box;
      width: 4.722222rem;
      height: 4.513889rem;
      margin-left: 0.486111rem;
      margin-right: 0.104167rem;
    }
    .nav {
      width: 2.256944rem;
      height: 4.513889rem;
      background: $color9;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .top_view {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        padding-top: 0.111111rem;
        padding-left: 0.152778rem;
        .label {
          box-sizing: border-box;
          font-size: $font-size12;
          font-weight: 400;
          color: $color19;
        }
        .operator {
          box-sizing: border-box;
          font-size: $font-size12;
          color: red;
          margin-left: 0.013889rem;
          margin-right: 0.013889rem;
        }
      }
      .title {
        box-sizing: border-box;
        color: $color1;
        font-size: $font-size17;
        padding-left: 0.152778rem;
        margin-top: 0.270833rem;
        font-weight: bold;
      }
      .id_label {
        box-sizing: border-box;
        padding-left: 0.152778rem;
        margin-top: 0.034722rem;
        color: $color19;
        font-size: $font-size12;
      }
      .sucai_desc {
        box-sizing: border-box;
        padding-left: 0.152778rem;
        margin-top: 0.020833rem;
        color: $color4;
        font-size: $font-size12;
      }
      .line {
        width: 2.069444rem;
        height: 0px;
        border: 1px solid $color6;
        box-sizing: border-box;
        margin-top: 0.069444rem;
        margin-left: 0.104167rem;
        margin-right: 0.104167rem;
        margin-bottom: 0.069444rem;
      }
      .spec {
        box-sizing: border-box;
        color: $color19;
        margin-bottom: 0.090278rem;
        padding-left: 0.152778rem;
      }
      .btn_view {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        padding-left: 0.152778rem;
        .buy_vip {
          box-sizing: border-box;
          width: 1rem;
          height: 0.243056rem;
          background: $color4;
          border-radius: 0.125rem;
          font-size: $font-size14;
          text-align: center;
          line-height: 0.243056rem;
          font-weight: 400;
          color: $color9;
          cursor: pointer;
        }
        .collect {
          box-sizing: border-box;
          width: 0.368056rem;
          height: 0.243056rem;
          border: 1px solid $color4;
          border-radius: 0.125rem;
          font-size: $font-size14;
          text-align: center;
          line-height: 0.243056rem;
          font-weight: 400;
          color: $color4;
          margin-left: 0.0625rem;
          cursor: pointer;
        }
      }
      .author_view {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        padding-top: 0.069444rem;
        padding-left: 0.152778rem;
        .login_header_logo {
          width: 0.465278rem;
          height: 0.465278rem;
          border: 1px solid $color6;
          border-radius: 50%;
          text-align: center;
          line-height: 0.465278rem;
          font-size: $font_size16;
          font-weight: 400;
          color: $color1;
        }
        .right_view {
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-sizing: border-box;
          padding-left: 0.0625rem;
          .level {
            box-sizing: border-box;
            color: $color4;
            font-size: $font_size16;
            .author_type {
              margin-left: 0.152778rem;
            }
          }
          .username {
            box-sizing: border-box;
            font-size: $font_size16;
            color: $color1;
            font-weight: 400;
            .author {
              margin-left: 0.027778rem;
            }
          }
        }
      }
    }
  }
}
</style>
