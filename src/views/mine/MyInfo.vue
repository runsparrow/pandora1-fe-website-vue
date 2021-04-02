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
      <div class="right_view">
        <div class="row">
          <div class="item active">我的信息</div>
          <div class="item">我的作品</div>
          <div class="item">我的订单</div>
          <div class="item">我要充值</div>
        </div>
        <div class="content_row"></div>
      </div>
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
  margin-left: 103px;
  margin-right: 106px;
  width: 1231px;
  margin: 0 auto;
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
          }
          .logo_title {
            color: $color4;
            font-size: 37px;
            line-height: 26px;
          }
        }
        .label {
          color: $color1;
          font-size: 16px;
          margin-top: 20px;
          cursor: pointer;
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
            background-image: url('../../assets/imgs/search_right_bg.png');
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
          position: relative;
          .popMenu {
            width: 162px;
            height: 289px;
            border: 1px solid $color10;
            position: absolute;
            bottom: 0;
            top: 86px;
            left: 38px !important;
            z-index: 10;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            background: $color9;
            display: none;

            .item1 {
              height: 37px;
              font-size: 16px;
              color: #354052;
              padding-left: 33px;
              line-height: 54px;
            }
            .item2 {
              height: 37px;
              font-size: 16px;
              color: #354052;
              padding-left: 33px;
              line-height: 37px;
            }
            .item3 {
              height: 37px;
              font-size: 16px;
              color: #354052;
              padding-left: 33px;
              line-height: 37px;
            }
            .item4 {
              height: 37px;
              font-size: 16px;
              color: #354052;
              padding-left: 33px;
              line-height: 37px;
            }
            .item5 {
              height: 37px;
              font-size: 16px;
              padding-left: 33px;
              line-height: 37px;
              color: #354052;
            }
            .item6 {
              height: 54px;
              font-size: 16px;
              padding-left: 33px;
              line-height: 54px;
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
            font-weight: 400;
            line-height: 67px;
            margin-left: 8px;
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
    .left_view {
      box-sizing: border-box;
      width: 374px;
      .top_view {
        box-sizing: border-box;
        width: 343px;
        height: 160px;

        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.26);
        border-radius: 11px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        padding: 25px 0 28px 43px;
        .top_header_view {
          width: 107px;
          height: 107px;
          border-radius: 50%;
          border: 1px solid $color6;
          color: $color1;
          font-size: 25px;
          text-align: center;
          line-height: 107px;
        }
        .right_c {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          padding-left: 18px;
          padding-top: 13px;
          .label {
            color: $color1;
            font-size: 16px;
          }
          .label_id {
            color: $color20;
            font-size: 16px;
          }
          .img_row {
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
            margin-top: 14px;
            .value {
              line-height: 10px;
            }
            .huanguan_img {
              width: 20.82px;
              height: 15.36px;
              margin-right: 4px;
            }
            .person_img {
              width: 19px;
              height: 19.54px;
              margin-right: 4px;
            }
            .doctor_img {
              width: 17px;
              height: 19.8px;
            }
          }
        }
      }
      .bottom_view {
        box-sizing: border-box;
        margin-top: 29px;
        margin-left: 17px;
        margin-right: 14px;
        border-top: 1px solid $color6;
        border-bottom: 1px solid $color6;
        height: 270px;
        display: flex;
        flex-direction: row;
        .b_left_view {
          box-sizing: border-box;
          width: 238px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .title {
            color: $color1;
            font-size: 25px;
            margin-top: 69px;
          }
          .qcode_img {
            width: 139px;
            height: 140px;
            margin-top: 4px;
          }
        }
        .b_right_view {
          box-sizing: border-box;
          width: 253px;
          display: flex;
          flex-direction: column;
          .line1 {
            display: flex;
            flex-direction: row;
            box-sizing: border-box;
            padding-top: 32px;
            align-items: flex-end;
            .logo_img {
              width: 90px;
              height: 69px;
              margin-right: 8px;
            }
            .service_img {
              width: 48.51px;
              height: 43.75px;
            }
          }
          .line2 {
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            margin-top: 14px;
            .label_01 {
              font-weight: bold;
              color: $color20;
              font-size: 16px;
            }
            .label_02 {
              color: $color21;
              font-size: 16px;
            }
          }
          .line3 {
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            padding-top: 38px;
            .label_01 {
              color: $color20;
              font-size: 16px;
              font-weight: bold;
            }
            .label_02 {
              color: $color20;
              font-size: 16px;
            }
          }
        }
      }
    }
    .right_view {
      box-sizing: border-box;
      flex-grow: 1;
      border: 1px solid red;
      .row {
        height: 43px;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        padding-left: 11px;
        .item {
          width: 80px;
          text-align: center;
          line-height: 40px;
          color: $color22;
          font-size: 20px;
          margin-right: 66px;
          position: relative;
          cursor: pointer;
          &.active {
            color: $color23;
            &::before {
              position: absolute;
              right: 0;
              left: 0;
              bottom: 0;
              height: 2px;
              background: $color23;
              content: '';
            }
          }
        }
      }
      .content_row {
        height: 794px;
        background: $color34;
      }
    }
  }
}
</style>
