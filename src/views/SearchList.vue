<template>
  <div class="searchListView">
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
          <ul class="children_list" v-if="true">
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
  name: 'SearchListView',
  methods: {
    toHome() {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/colors';
@import '../assets/css/font_size';
.searchListView {
  box-sizing: border-box;
  margin: 0 auto;
  .container {
    box-sizing: border-box;
    margin-left: 103px;
    margin-right: 106px;
    width: 1230px;
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
          .label {
            color: $color1;
            font-size: 16px;
            margin-top: 20px;
          }
          .seperator {
            position: relative;
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
          .search_item {
            box-sizing: border-box;
            position: relative;
            padding-top: 11px;
            position: relative;

            input {
              width: 259.21px;
              height: 40px;
              border: 1px solid $color3;
              border-radius: 25px;
              box-sizing: border-box;
              padding-left: 22.5px;
              font-size: 16px;
            }

            .search_right_bg_view {
              position: absolute;
              right: 0;
              top: 11px;
              width: 37px;
              height: 40px;
              background-image: url('../assets/imgs/search_right_bg.png');
              background-repeat: no-repeat;
              background-size: 37px 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              .search_clear {
                width: 12.58px;
                height: 12.6px;
                cursor: pointer;
              }
              .search_icon {
                width: 19px;
                height: 19px;
                position: absolute;
                left: -34px;
                top: 10px;
                cursor: pointer;
              }
            }
          }
          .btn_view {
            display: flex;
            flex-direction: row;
            width: 176px;
            justify-content: flex-end;
            box-sizing: border-box;
            padding-top: 11px;
            .btn1 {
              width: 80px;
              height: 40px;
              background: $color4;
              border-radius: 21px;
              display: block;
              color: $color9;
              font-size: 16px;
              text-align: center;
              line-height: 40px;
              margin-right: 6px;
              cursor: pointer;
            }
            .btn2 {
              width: 80px;
              height: 40px;
              background: $color9;
              border: 1px solid $color6;
              border-radius: 21px;
              display: block;
              color: $color4;
              font-size: 16px;
              text-align: center;
              line-height: 40px;
              margin-left: 6px;
              cursor: pointer;
            }
            .login_header_logo {
              width: 67px;
              height: 67px;
              border: 1px solid $color6;
              border-radius: 50%;
              text-align: center;
              line-height: 67px;
              font-size: 16px;
              font-weight: 400;
              color: $color1;
            }
            .username {
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              line-height: 67px;
              margin-left: 8px;
            }
          }
        }
      }
      .logo_view {
        box-sizing: border-box;
        height: 204px;
        display: flex;
        color: $color1;
        justify-content: center;
        align-items: center;
        font-size: 17px;
        border: 1px solid $color6;
      }
    }
  }
  .content {
    box-sizing: border-box;
    background: $color11;
    padding-left: 103px;
    padding-right: 106px;
    padding-top: 39px;
    padding-bottom: 39px;
    .list {
      display: flex;
      flex-direction: row;
      list-style: none;
      box-sizing: border-box;
      .item {
        width: 162px;
        height: 37px;
        background: $color9;
        border: 1px solid $color11;
        box-sizing: border-box;
        text-align: center;
        line-height: 37px;
        position: relative;
        .label {
          color: $color1;
          font-size: 16px;
          font-weight: 400;
        }
        .select_img {
          width: 0.111111rem;
          height: 0.0625rem;
          margin-left: 0.097222rem;
          cursor: pointer;
        }
        .children_list {
          width: 162px;
          list-style: none;
          box-sizing: border-box;
          position: absolute;
          top: 37px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .child_item {
            flex: 1;
            width: 162px;
            background: $color9;
            cursor: pointer;
            &.top {
              font-size: 16px;
              font-weight: bold;
              color: $color4;
            }
            &.active {
              font-size: 16px;
              font-weight: 400;
              color: $color4;
            }
            &.label {
              font-size: 16px;
              font-weight: 400;
              color: $color10;
            }
          }
        }
      }
    }
    .result-view {
      width: 1210px;
      margin-top: 46px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .lis_img {
        width: 262px;
        height: 250px;
      }
    }
  }
}
</style>
