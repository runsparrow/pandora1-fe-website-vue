<template>
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
              <img class="search_clear" src="@a/imgs/search_clear.png" alt="" srcset="@a/imgs/search_clear@2x.png 2x" />
            </div>
          </li>
          <li class="btn_view" v-if="token === ''">
            <span class="btn1" @click="toRegister">注册</span>
            <span class="btn2" @click="toLogin">登录</span>
          </li>
          <li v-else class="btn_view">
            <div class="login_header_logo">
              头像
            </div>
            <div ref="popMenuRef">
              <span class="username" @click="clickDropdown">{{ userName }}</span>
              <div :class="['popMenu', { activePop: dropdownStatus }]">
                <div class="item1" @click="goto(0)">我的信息</div>
                <div class="item2" @click="goto(1)">我的作品</div>
                <div class="item3" @click="goto(2)">我的订单</div>
                <div class="item4" @click="goto(3)">充值中心</div>
                <div class="item5" @click="goto(4)">帮助中心</div>
                <div class="item6" @click="goto(5)">退出</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="left_view">
        <div class="top_view">
          <div class="top_header_view">头像</div>
          <div class="right_c">
            <span class="label">用户名</span>
            <span class="label_id">ID：0000001</span>
            <div class="img_row">
              <span class="value">1</span>
              <img class="huanguan_img" src="@a/imgs/huang_guan.png" alt="" srcset="@a/imgs/huang_guan@2x.png 2x" />
              <span class="value">1</span>
              <img class="person_img" src="@a/imgs/person.png" alt="" srcset="@a/imgs/person@2x.png 2x" />
              <span class="value">5</span>
              <img class="doctor_img" src="@a/imgs/doctor.png" alt="" srcset="@a/imgs/doctor@2x.png 2x" />
            </div>
          </div>
        </div>
        <div class="bottom_view">
          <div class="b_left_view">
            <span class="title">漫云客服</span>
            <img class="qcode_img" src="@a/imgs/qcode.png" alt="" srcset="@a/imgs/qcode@2x.png 2x" />
          </div>
          <div class="b_right_view">
            <div class="line1">
              <img class="logo_img" src="@a/imgs/logo_01.png" alt="" srcset="@a/imgs/logo_01@2x.png 2x" />
              <img class="service_img" src="@a/imgs/service_img.png" alt="" srcset="@a/imgs/service_img@2x.png 2x" />
            </div>
            <div class="line2">
              <span class="label_01">服务时间</span>
              <span class="label_02">周一到周五：9:00-21:00</span>
            </div>
            <div class="line3">
              <span class="label_01">扫码关注公众号</span>
              <span class="label_02">与在线客户直接沟通</span>
            </div>
          </div>
        </div>
      </div>
      <div class="right_view">right</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../../assets/css/colors';
@import '../../assets/css/font_size';
.container {
  box-sizing: border-box;
  margin-left: 0.715278rem;
  margin-right: 0.736111rem;
  width: 8.548611rem;
  margin: 0 auto;
  border: 1px solid blue;
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
          cursor: pointer;
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
            background-image: url('../../assets/imgs/search_right_bg.png');
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
          position: relative;
          .popMenu {
            width: 1.125rem;
            height: 2.006944rem;
            border: 1px solid $color10;
            position: absolute;
            bottom: 0;
            top: 0.597222rem;
            left: 0.263889rem !important;
            z-index: 10;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            background: $color9;
            display: none;

            .item1 {
              height: 0.375rem;
              font-size: $font_size16;
              color: #354052;
              padding-left: 0.229167rem;
              line-height: 0.375rem;
            }
            .item2 {
              height: 0.256944rem;
              font-size: $font_size16;
              color: #354052;
              padding-left: 0.229167rem;
              line-height: 0.256944rem;
            }
            .item3 {
              height: 0.256944rem;
              font-size: $font_size16;
              color: #354052;
              padding-left: 0.229167rem;
              line-height: 0.256944rem;
            }
            .item4 {
              height: 0.256944rem;
              font-size: $font_size16;
              color: #354052;
              padding-left: 0.229167rem;
              line-height: 0.256944rem;
            }
            .item5 {
              height: 0.256944rem;
              font-size: $font_size16;
              padding-left: 0.229167rem;
              line-height: 0.256944rem;
              color: #354052;
            }
            .item6 {
              height: 0.375rem;
              font-size: $font_size16;
              padding-left: 0.229167rem;
              line-height: 0.375rem;
              color: #354052;
            }
            > div {
              cursor: pointer;
              &:hover {
                background: $color4;
                color: $color9;
              }
            }
          }
          .activePop {
            display: block;
          }
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
            font-weight: 400;
            line-height: 0.465278rem;
            margin-left: 0.055556rem;
            cursor: pointer;
          }
        }
      }
    }
  }
  .content {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    border: 1px solid yellow;
    .left_view {
      box-sizing: border-box;
      width: 2.597222rem;
      border: 1px solid red;
      .top_view {
        box-sizing: border-box;
        width: 2.381944rem;
        height: 1.111111rem;

        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.26);
        border-radius: 11px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        padding: 0.173611rem 0 0.194444rem 0.298611rem;
        .top_header_view {
          width: 0.743056rem;
          height: 0.743056rem;
          border-radius: 50%;
          border: 1px solid $color6;
          color: $color1;
          font-size: $font_size25;
          text-align: center;
          line-height: 0.743056rem;
        }
        .right_c {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          padding-left: 0.125rem;
          padding-top: 0.090278rem;
          .label {
            color: $color1;
            font-size: $font_size16;
          }
          .label_id {
            color: $color20;
            font-size: $font_size16;
          }
          .img_row {
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
            margin-top: 0.097222rem;
            .value {
              line-height: 0.069444rem;
            }
            .huanguan_img {
              width: 0.144583rem;
              height: 0.106667rem;
              margin-right: 0.027778rem;
            }
            .person_img {
              width: 0.131944rem;
              height: 0.135694rem;
              margin-right: 0.027778rem;
            }
            .doctor_img {
              width: 0.118542rem;
              height: 0.137569rem;
            }
          }
        }
      }
      .bottom_view {
        box-sizing: border-box;
        margin-top: 0.201389rem;
        margin-left: 0.118056rem;
        margin-right: 0.097222rem;
        border-top: 1px solid $color6;
        border-bottom: 1px solid $color6;
        height: 1.875rem;
        display: flex;
        flex-direction: row;
        .b_left_view {
          box-sizing: border-box;
          width: 1.652778rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          .title {
            color: $color1;
            font-size: $font_size25;
            margin-top: 0.479167rem;
          }
          .qcode_img {
            width: 0.965278rem;
            height: 0.972222rem;
            margin-top: 0.027778rem;
          }
        }
        .b_right_view {
          box-sizing: border-box;
          width: 1.756944rem;
          display: flex;
          flex-direction: column;
          .line1 {
            display: flex;
            flex-direction: row;
            box-sizing: border-box;
            padding-top: 0.222222rem;
            align-items: flex-end;
            .logo_img {
              width: 0.625rem;
              height: 0.479167rem;
              margin-right: 0.055556rem;
            }
            .service_img {
              width: 0.336875rem;
              height: 0.303819rem;
            }
          }
          .line2 {
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            margin-top: 0.097222rem;
            .label_01 {
              font-weight: bold;
              color: $color20;
              font-size: $font_size16;
            }
            .label_02 {
              color: $color21;
              font-size: $font_size16;
            }
          }
          .line3 {
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            padding-top: 0.263889rem;
            .label_01 {
              color: $color20;
              font-size: $font_size16;
              font-weight: bold;
            }
            .label_02 {
              color: $color20;
              font-size: $font_size16;
            }
          }
        }
      }
    }
    .right_view {
      box-sizing: border-box;
      flex-grow: 1;
      border: 1px solid red;
    }
  }
}
</style>
