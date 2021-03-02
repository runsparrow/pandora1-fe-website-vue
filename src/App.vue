<template>
  <div class="container">
    <div class="header_view">
      <div class="top_view">
        <ul class="list">
          <li class="logo">
            <img class="logo_img" src="./assets/imgs/logo_01.png" alt="" srcset="./assets/imgs/logo_01@2x.png 2x" />
            <span class="logo_title">SooYi.CN</span>
          </li>
          <li class="label">推广海报</li>
          <li class="label">新媒体配置</li>
          <li class="label">视频动画</li>
          <li class="seperator"></li>
          <li class="search_item">
            <input type="text" placeholder="搜索素材" />

            <div class="search_right_bg_view">
              <img class="search_icon" src="./assets/imgs/search.png" alt="" srcset="./assets/imgs/search@2x.png 2x" />
              <img
                class="search_clear"
                src="./assets/imgs/search_clear.png"
                alt=""
                srcset="./assets/imgs/search_clear@2x.png 2x"
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
      <div class="logo_view">
        BANNER(请给与尺寸范围)
      </div>
    </div>
    <div class="center_view">
      <div class="left_view">
        <p class="point_title">It is a long established</p>
        <p class="point_title">fact that areader</p>
        <span class="desc maginTop">医云直击医圈人群的痛点，提升视觉编辑相关的工作</span>
        <span class="desc">我们有全球独家的医学漫画素材</span>
        <span class="desc">更有志同道合的伙伴...</span>
        <div class="btn_more">
          <span class="label">了解更多</span>
          <img
            class="label_img"
            src="./assets/imgs/arrow-pointing-to-right.png"
            alt=""
            srcset="./assets/imgs/arrow-pointing-to-right@2x.png 2x"
          />
        </div>
      </div>
      <div class="right_view">
        <div class="frame_view">
          <img class="frame_banner_img" src="./assets/imgs/index_banner.png" alt="" />
          <div class="laptop_line"></div>
          <div class="laptop_bottom"></div>
        </div>
      </div>
    </div>
    <div class="footer_view">
      <div class="row">热门下载</div>
      <div class="list">
        <div class="item">
          <img class="hot_img" src="./assets/imgs/hot_img.png" alt="" srcset="./assets/imgs/hot_img@2x.png 2x" />
          <span class="hot_title">推广海报</span>
          <div class="hot_more_view">
            <span class="poionter">查看更多</span>
            <img
              class="blue_direct_img"
              src="./assets/imgs/arrow-pointing-to-right-blue.png"
              alt=""
              srcset="./assets/imgs/arrow-pointing-to-right-blue@2x.png 2x"
            />
          </div>
        </div>
        <div class="item">
          <img class="hot_img" src="./assets/imgs/hot_img.png" alt="" srcset="./assets/imgs/hot_img@2x.png 2x" />
          <span class="hot_title">新媒体配图</span>
          <div class="hot_more_view">
            <span class="poionter">查看更多</span>
            <img
              class="blue_direct_img"
              src="./assets/imgs/arrow-pointing-to-right-blue.png"
              alt=""
              srcset="./assets/imgs/arrow-pointing-to-right-blue@2x.png 2x"
            />
          </div>
        </div>
        <div class="item">
          <img class="hot_img" src="./assets/imgs/hot_img.png" alt="" srcset="./assets/imgs/hot_img@2x.png 2x" />
          <span class="hot_title">动画漫画</span>
          <div class="hot_more_view">
            <span class="poionter">查看更多</span>
            <img
              class="blue_direct_img"
              src="./assets/imgs/arrow-pointing-to-right-blue.png"
              alt=""
              srcset="./assets/imgs/arrow-pointing-to-right-blue@2x.png 2x"
            />
          </div>
        </div>
        <div class="item">
          <img class="hot_img" src="./assets/imgs/hot_img.png" alt="" srcset="./assets/imgs/hot_img@2x.png 2x" />
          <span class="hot_title">其他</span>
          <div class="hot_more_view">
            <span class="poionter">查看更多</span>
            <img
              class="blue_direct_img"
              src="./assets/imgs/arrow-pointing-to-right-blue.png"
              alt=""
              srcset="./assets/imgs/arrow-pointing-to-right-blue@2x.png 2x"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './assets/css/colors';
@import './assets/css/font_size';
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
            background-image: url('./assets/imgs/search_right_bg.png');
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
  .center_view {
    box-sizing: border-box;
    height: 2.922847rem;
    display: flex;
    flex-direction: row;
    .left_view {
      width: 4.274306rem;
      box-sizing: border-box;
      padding-right: 0.197917rem;
      padding-left: 0.430556rem;
      padding-top: 0.506944rem;
      .point_title {
        color: $color1;
        font-size: $font_size38;
        line-height: 0.3rem;
        font-weight: bold;
        margin: 0;
        padding: 0;
      }
      .desc {
        line-height: 0.138889rem;
        font-size: font_size18;
        color: $color5;
        margin: 0;
        padding: 0;
        display: block;
        &.maginTop {
          margin-top: 0.090278rem;
        }
      }
      .btn_more {
        box-sizing: border-box;
        width: 1.180556rem;
        height: 0.347222rem;
        margin-top: 0.076389rem;
        background: $color7;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        align-items: center;
        .label {
          font-size: $font_size16;
          font-weight: 400;
          line-height: 27px;
          color: $color9;
          margin-left: 0.1875rem;
        }
        .label_img {
          width: 0.118056rem;
          height: 0.083333rem;
          margin-right: 0.166667rem;
        }
      }
    }
    .right_view {
      width: 4.274306rem;
      box-sizing: border-box;
      padding-top: 0.347222rem;
      padding-right: 0.430556rem;
      padding-left: 0.208333rem;
      .frame_view {
        box-sizing: border-box;
        width: 3.758264rem;
        height: 2.451389rem;

        background: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2) inset;
        border-radius: 12px;
        position: relative;
        .frame_banner_img {
          width: 3.393611rem;
          height: 2.117986rem;
          position: absolute;
          top: 0.166667rem;
          left: 0.180556rem;
          right: 0.180556rem;
        }
        .opacity_view {
          position: absolute;
          bottom: 0;
          width: 3.722222rem;
          height: 0.263889rem;
          background: $color8;
          opacity: 0.05;
          border-radius: 0.333333rem;
        }
        .laptop_line {
          position: absolute;
          width: 0.798611rem;
          height: 0.020833rem;
          bottom: 0.034722rem;
          left: 40%;
          background: linear-gradient(
            90deg,
            rgba(188, 189, 191, 0.5) 0%,
            rgba(216, 216, 223, 0.5) 10%,
            rgba(216, 216, 223, 0.5) 89%,
            rgba(173, 170, 189, 0.5) 100%
          );
        }
        .laptop_bottom {
          position: absolute;
          bottom: -0.055556rem;
          left: -50px;
          width: 4.465278rem;
          height: 0.059444rem;
          background: linear-gradient(180deg, #ffffff 0%, #cdcbd5 100%);
        }
      }
    }
  }
  .footer_view {
    box-sizing: border-box;
    margin-bottom: 0.375rem;
    .row {
      margin-top: 0.423611rem;
      margin-left: 0.430556rem;
      font-size: $font_size25;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 0.3125rem;
      color: $color1;
    }
    .list {
      display: flex;
      flex-direction: row;
      width: 7.701389rem;
      margin-top: 0.472222rem;
      margin-left: 0.430556rem;
      margin-right: 1.159722rem;
      box-sizing: border-box;
      justify-content: space-between;
      .item {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        width: 1.641736rem;
        height: 1.737986rem;
        background: $color9;
        border-radius: 30px;
        box-shadow: 0px 10px 46px rgba(0, 0, 0, 0.07);
        .hot_img {
          width: 1.638889rem;
          height: 1.104167rem;
          box-shadow: 0px 10px 46px rgba(0, 0, 0, 0.07);
          border-radius: 30px 30px 0 0;
        }
        .hot_title {
          color: $color1;
          font-size: $font_size20;
          display: inline-block;
          box-sizing: border-box;
          padding-top: 0.083333rem;
          padding-left: 0.215278rem;
          padding-right: 0.1875rem;
          font-weight: bold;
        }
        .hot_more_view {
          box-sizing: border-box;
          padding-top: 0.069444rem;
          padding-left: 0.215278rem;
          padding-right: 0.1875rem;
          font-size: $font_size14;
          color: $color7;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          .poionter {
            cursor: pointer;
          }
          .blue_direct_img {
            width: 0.112361rem;
            height: 0.076528rem;
            margin-left: 0.270833rem;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
