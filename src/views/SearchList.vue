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

            <li class="label" v-for="(item, index) in navigationsMenus" :key="index" @click="toSearch(item.id)">
              {{ item.name }}
            </li>

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
              <span class="btn1" @click="toRegister">注册</span>
              <span class="btn2" @click="toLogin">登录</span>
            </li>
            <li v-else class="btn_view">
              <div class="login_header_logo">头像</div>
              <div ref="popMenuRef">
                <span class="username" @click="clickDropdown">{{ userName }}</span>
                <div :class="['popMenu', { activePop: dropdownStatus }]">
                  <div class="item1" style="height: 46px" @click="goto(0)">我的信息</div>
                  <div class="item2" @click="goto(1)">我的作品</div>
                  <div class="item3" @click="goto(2)">我的资产</div>
                  <div class="item5" @click="goto(3)">帮助中心</div>
                  <div class="item6" @click="goto(4)">退出</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="logo_view">BANNER(请给与尺寸范围)</div>
      </div>
    </div>
    <div class="content">
      <ul class="list">
        <li class="item" ref="selectNav01" @click="() => (show_select_index = 0)">
          <span class="label">免费作品</span>
          <img class="select_img" src="@a/imgs/jiantou_down.png" alt="" srcset="@a/imgs/jiantou_down@2x.png 2x" />
          <ul class="children_list" v-if="show_select_index === 0">
            <li class="child_item top" @click.stop="chooseItem">全部作品</li>
            <li class="child_item active" @click.stop="chooseItem">免费作品</li>
            <li class="child_item label" @click.stop="chooseItem">收费作品</li>
          </ul>
        </li>
        <li class="item" ref="selectNav02" @click="() => (show_select_index = 1)">
          <span class="label">推广海报</span>
          <img class="select_img" src="@a/imgs/jiantou_down.png" alt="" srcset="@a/imgs/jiantou_down@2x.png 2x" />
          <ul class="children_list" v-if="show_select_index === 1">
            <li class="child_item top" @click.stop="chooseItem">全部格式</li>
            <li class="child_item active" @click.stop="chooseItem">推广海报</li>
            <li class="child_item label" @click.stop="chooseItem">新媒体配图</li>
            <li class="child_item label" @click.stop="chooseItem">视频动画</li>
          </ul>
        </li>
        <li class="item" ref="selectNav03" @click="() => (show_select_index = 2)">
          <span class="label">PSD</span>
          <img class="select_img" src="@a/imgs/jiantou_down.png" alt="" srcset="@a/imgs/jiantou_down@2x.png 2x" />
          <ul class="children_list" v-if="show_select_index === 2">
            <li class="child_item top" @click.stop="chooseItem">全部格式</li>
            <li class="child_item active" @click.stop="chooseItem">PSD</li>
            <li class="child_item label" @click.stop="chooseItem">AI</li>
            <li class="child_item label" @click.stop="chooseItem">PNG</li>
            <li class="child_item label" @click.stop="chooseItem">其他</li>
          </ul>
        </li>
        <li class="item" ref="selectNav04" @click="() => (show_select_index = 3)">
          <span class="label">热门下载</span>
          <img class="select_img" src="@a/imgs/jiantou_down.png" alt="" srcset="@a/imgs/jiantou_down@2x.png 2x" />
          <ul class="children_list" v-if="show_select_index === 3">
            <li class="child_item top" @click.stop="chooseItem">全部排序</li>
            <li class="child_item active" @click.stop="chooseItem">热门下载</li>
            <li class="child_item label" @click.stop="chooseItem">最新上传</li>
          </ul>
        </li>
      </ul>
      <div class="result-view">
        <img class="lis_img" :src="item.fullUrl" alt="" v-for="(item, index) in tableDatas" :key="index" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { searchListService } from '@s/search-list-service'
export default {
  name: 'SearchListView',
  computed: {
    ...mapState(['token', 'userName', 'navigationsMenus'])
  },
  data() {
    return {
      show_select_index: -1,
      dropdownStatus: false,
      tableDatas: []
    }
  },
  mounted() {
    document.addEventListener('click', e => {
      if (this.$refs.popMenuRef) {
        if (!this.$refs.popMenuRef.contains(e.target)) {
          this.dropdownStatus = false
        }
      }

      if (this.show_select_index === 0 && this.$refs.selectNav01) {
        if (!this.$refs.selectNav01.contains(e.target)) {
          this.show_select_index = -1
        }
      }
      if (this.show_select_index === 1 && this.$refs.selectNav02) {
        if (!this.$refs.selectNav02.contains(e.target)) {
          this.show_select_index = -1
        }
      }
      if (this.show_select_index === 2 && this.$refs.selectNav03) {
        if (!this.$refs.selectNav03.contains(e.target)) {
          this.show_select_index = -1
        }
      }
      if (this.show_select_index === 3 && this.$refs.selectNav04) {
        if (!this.$refs.selectNav04.contains(e.target)) {
          this.show_select_index = -1
        }
      }
    })
    this.reloadTable()
  },
  unmounted() {
    document.removeEventListener('click')
  },
  methods: {
    toSearch(navigationId) {
      this.$store.commit('setNavigationId', navigationId)
      this.reloadTable()
    },
    async reloadTable() {
      const { rows } = await searchListService({
        keyWord: `^navigationId=${this.$store.state.navigationId}`,
        page: '1^1000',
        date: '',
        sort: '',
        status: [2]
      })
      this.tableDatas = rows.filter(f => f.navigationName !== '')
    },
    clickDropdown() {
      this.dropdownStatus = !this.dropdownStatus
    },
    toHome() {
      this.$router.push('/home')
    },
    chooseItem() {
      this.show_select_index = -1
    },
    goto(index) {
      this.dropdownStatus = false
      if (index < 4) {
        this.$router.push('/mine/info?index=' + index)
      } else if (index === 4) {
        this.$store.commit('clearStore')
        this.$router.push('/home')
      }
    },
    toRegister() {
      this.$store.commit('setActiveTab', 0)
      this.$router.push('/login')
    },
    toLogin() {
      this.$store.commit('setActiveTab', 1)
      this.$router.push('/login')
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
                height: 54px;
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
              font-family: Microsoft YaHei;
              font-weight: 400;
              line-height: 67px;
              margin-left: 8px;
              cursor: pointer;
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
        cursor: pointer;
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
          display: inline-block;
          position: absolute;
          top: 37px;
          left: 0;
          z-index: 10;
          // display: flex;
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
      /* display: flex;
      flex-direction: row;
      justify-content: space-between; */
      .lis_img {
        width: 230px;
        height: 220px;
        margin-left: 10px;
        margin-top: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
