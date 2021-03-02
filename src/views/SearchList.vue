<template>
  <div class="searchListView">
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
    </div>
    <div class="content">
      <ul class="list">
        <li class="item">
          <span class="label">免费作品</span>
          <img class="select_img" src="@a/imgs/jiantou_down.png" alt="" srcset="@a/imgs/jiantou_down@2x.png 2x" />
          <ul class="children_list" v-if="false">
            <li class="child_item top">全部作品</li>
            <li class="child_item active">免费作品</li>
            <li class="child_item label">收费作品</li>
          </ul>
        </li>
        <li class="item">
          <span class="label">推广海报</span>
          <img class="select_img" src="@a/imgs/jiantou_down.png" alt="" srcset="@a/imgs/jiantou_down@2x.png 2x" />
          <ul class="children_list" v-if="false">
            <li class="child_item top">全部格式</li>
            <li class="child_item active">推广海报</li>
            <li class="child_item label">新媒体配图</li>
            <li class="child_item label">视频动画</li>
          </ul>
        </li>
        <li class="item">
          <span class="label">PSD</span>
          <img class="select_img" src="@a/imgs/jiantou_down.png" alt="" srcset="@a/imgs/jiantou_down@2x.png 2x" />
          <ul class="children_list" v-if="false">
            <li class="child_item top">全部格式</li>
            <li class="child_item active">PSD</li>
            <li class="child_item label">AI</li>
            <li class="child_item label">PNG</li>
            <li class="child_item label">其他</li>
          </ul>
        </li>
        <li class="item">
          <span class="label">热门下载</span>
          <img class="select_img" src="@a/imgs/jiantou_down.png" alt="" srcset="@a/imgs/jiantou_down@2x.png 2x" />
          <ul class="children_list" v-if="false">
            <li class="child_item top">全部排序</li>
            <li class="child_item active">热门下载</li>
            <li class="child_item label">最新上传</li>
          </ul>
        </li>
      </ul>
      <div class="result-view">
        <img class="lis_img" src="@a/imgs/hot_img.png" alt="" srcset="@a/imgs/hot_img@2x.png 2x" />
        <img class="lis_img" src="@a/imgs/hot_img.png" alt="" srcset="@a/imgs/hot_img@2x.png 2x" />
        <img class="lis_img" src="@a/imgs/hot_img.png" alt="" srcset="@a/imgs/hot_img@2x.png 2x" />
        <img class="lis_img" src="@a/imgs/hot_img.png" alt="" srcset="@a/imgs/hot_img@2x.png 2x" />
      </div>
      <div class="result-view">
        <img class="lis_img" src="@a/imgs/hot_img.png" alt="" srcset="@a/imgs/hot_img@2x.png 2x" />
        <img class="lis_img" src="@a/imgs/hot_img.png" alt="" srcset="@a/imgs/hot_img@2x.png 2x" />
        <img class="lis_img" src="@a/imgs/hot_img.png" alt="" srcset="@a/imgs/hot_img@2x.png 2x" />
        <img class="lis_img" src="@a/imgs/hot_img.png" alt="" srcset="@a/imgs/hot_img@2x.png 2x" />
      </div>
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
.searchListView {
  width: 10rem;
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
    padding-top: 0.270833rem;
    .list {
      display: flex;
      flex-direction: row;
      list-style: none;
      box-sizing: border-box;
      .item {
        width: 1.125rem;
        height: 0.256944rem;
        background: $color9;
        border: 1px solid $color11;
        box-sizing: border-box;
        text-align: center;
        line-height: 0.256944rem;
        position: relative;
        .label {
          color: $color1;
          font-size: $font_size16;
          font-weight: 400;
        }
        .select_img {
          width: 0.111111rem;
          height: 0.0625rem;
          margin-left: 0.097222rem;
          cursor: pointer;
        }
        .children_list {
          width: 1.125rem;
          list-style: none;
          box-sizing: border-box;
          position: absolute;
          top: 0.256944rem;
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .child_item {
            flex: 1;
            width: 1.125rem;
            background: $color9;
            cursor: pointer;
            &.top {
              font-size: $font_size16;
              font-weight: bold;
              color: $color4;
            }
            &.active {
              font-size: $font_size16;
              font-weight: 400;
              color: $color4;
            }
            &.label {
              font-size: $font_size16;
              font-weight: 400;
              color: $color10;
            }
          }
        }
      }
    }
    .result-view {
      width: 8.402778rem;
      margin-top: 0.319444rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .lis_img {
        width: 1.819444rem;
        height: 1.736111rem;
      }
    }
  }
}
</style>
