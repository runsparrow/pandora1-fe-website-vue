<template>
  <div class="container">
    <div class="header_view">
      <div class="top_view">
        <ul class="list">
          <li class="logo">Logo图片</li>
          <li class="label">推广海报</li>
          <li class="label">新媒体配置</li>
          <li class="label">视频动画</li>
          <li class="seperator"></li>
          <li class="search_item"><input type="text" placeholder="搜索素材" /></li>
          <li class="btn_view">
            <span class="btn1">注册</span>
            <span class="btn2">登录</span>
          </li>
        </ul>
      </div>
      <div class="logo_view">
        BANNER(请给与尺寸范围)
      </div>
    </div>
    <div class="center_view">11</div>
    <div class="footer_view">22</div>
  </div>
</template>

<style lang="scss" scoped>
@import './assets/css/colors';
.container {
  margin-left: 0.711806rem;
  margin-right: 0.739583rem;
  border: 1px solid blue;
  .header_view {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .top_view {
      height: 0.833333rem;
      box-sizing: border-box;
      border: 1px solid yellow;
      display: flex;
      flex-direction: row;
      align-items: center;
      .list {
        list-style: none;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        align-items: flex-end;
        .logo {
          height: 0.256944rem;
          width: 1.458333rem;
          border: 1px solid blue;
        }
        .label {
          color: $color1;
          font-size: $font_size16;
          margin-left: 0.173611rem;
          margin-right: 0.173611rem;
          margin-bottom: 0.055556rem;
        }
        .seperator {
          margin-right: 0.684028rem;
          margin-left: 0.138889rem;
          position: relative;
          &::before {
            position: absolute;
            top: -34px;
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
          margin-right: 0.347222rem;
          box-sizing: border-box;
          input {
            width: 1.798611rem;
            height: 40px;
            border: 1px solid $color3;
            border-radius: 25px;
            box-sizing: border-box;
            padding-left: 0.15625rem;
          }
        }
        .btn_view {
          display: flex;
          flex-direction: row;
          width: 1.222222rem;
          .btn1 {
            width: 0.555556rem;
            height: 0.277778rem;
            background: $color4;
            border-radius: 21px;
            display: block;
            color: #ffffff;
            font-size: $font-size16;
            text-align: center;
            line-height: 0.277778rem;
            margin-right: 0.041667rem;
          }
          .btn2 {
            width: 0.555556rem;
            height: 0.277778rem;
            background: #ffffff;
            border: 1px solid #707070;
            border-radius: 21px;
            display: block;
            color: $color4;
            font-size: $font-size16;
            text-align: center;
            line-height: 0.277778rem;
            margin-left: 0.041667rem;
          }
        }
      }
    }
    .logo_view {
      height: 1.416667rem;
      border: 1px solid yellow;
      display: flex;
      color: $color1;
      justify-content: center;
      align-items: center;
      font-size: $font_size17;
    }
  }
  .center_view {
    height: 2.791667rem;
    border: 1px solid yellow;
  }
  .footer_view {
    height: 2.875rem;
    border: 1px solid yellow;
  }
}
</style>
