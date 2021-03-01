<template>
  <div class="container">
    <div class="header_view">
      <div class="top_view">
        <ul class="list">
          <li class="logo">
            <img class="logo_img" src="./assets/imgs/logo_01.png" alt="" srcset="./assets/imgs/logo_01@2x.png 2x">
            <span class="logo_title">SooYi.CN</span>
          </li>
          <li class="label">推广海报</li>
          <li class="label">新媒体配置</li>
          <li class="label">视频动画</li>
          <li class="seperator"></li>
          <li class="search_item">
            <input type="text" placeholder="搜索素材" />

            <div class="search_right_bg_view">
               <img class="search_icon" src="./assets/imgs/search.png" alt="" srcset="./assets/imgs/search@2x.png 2x">
               <img class="search_clear" src="./assets/imgs/search_clear.png" alt="" srcset="./assets/imgs/search_clear@2x.png 2x">
            </div>
          </li>
          <li class="btn_view">
            <span class="btn1">注册</span>
            <span class="btn2">登录</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './assets/css/colors';
@import './assets/css/font_size';
.container {
  box-sizing: border-box;
  margin-left: .715278rem;
  margin-right: .736111rem;
  border: 1px solid blue;
  width: 8.548611rem;
  .header_view
  {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .top_view
    {
      height: .833333rem;
      box-sizing: border-box;
      border: 1px solid yellow;
      display: flex;
      flex-direction: row;
      align-items: center;
      .list
      {
        height: 100%;
        list-style: none;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        align-items: center;
        flex:1;
        justify-content: space-between;
        .logo
        {
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            margin: 0;
            .logo_img
            {
              width:.430625rem;
              height: .242083rem;
            }
            .logo_title
            {
               color:$color4;
               font-size: $font-size37;
               line-height: .180556rem;
            }
        }
        .label {
          color: $color1;
          font-size: $font_size16;
          margin-top: .138889rem;
        }
        .seperator {
          position: relative;
          &::before {
            position: absolute;
            top: -.034722rem;
            right: 0;
            left: 0;
            bottom: 0;
            height: .180556rem;
            width: 0px;
            border: 1px solid $color2;
            content: '';
            background-color: red;
          }
        }
        .search_item
        {
           box-sizing: border-box;
           position: relative;
           padding-top: .076389rem;
           position: relative;
           input {
            width: 1.798611rem;
            height: 0.277778rem;
            border: 1px solid $color3;
            border-radius: 0.173611rem;
            box-sizing: border-box;
            padding-left: 0.15625rem;
          }

          .search_right_bg_view
          {
            position: absolute;
            right: 0;
            top:.076389rem;
            width: .256944rem;
             height: 0.277778rem;
             background-image: url('./assets/imgs/search_right_bg.png');
             background-repeat: no-repeat;
             background-size: .256944rem 0.277778rem;
             display: flex;
             justify-content: center;
             align-items: center;
             .search_clear
             {
                width: .087361rem;
                height: .0875rem;
             }
             .search_icon
            {
              width: .132083rem;
              height: .132083rem;
              position: absolute;
              left: -.236597rem;
            }
          }
        }
        .btn_view
        {
          display: flex;
          flex-direction: row;
          width: 1.222222rem;
          justify-content: flex-end;
          box-sizing: border-box;
          padding-top: .076389rem;
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
  }
}
</style>
