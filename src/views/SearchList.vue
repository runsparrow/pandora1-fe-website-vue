<template>
  <div class="searchListView">
    <div class="container">
      <div class="header_view">
        <div class="top_view">
          <ul class="list">
            <li class="logo">
              <img class="logo_img" src="@a/imgs/logo.png" alt="" srcset="@a/imgs/logo@2x.png 2x" @click="toHome" />
              <span class="logo_title" @click="toHome">T-pic</span>
            </li>

            <li
              :class="['label', { active: index === imgIndex }]"
              v-for="(item, index) in navigationsMenus"
              :key="index"
              @click="toSearch(item.id, index)"
            >
              {{ item.name }}
            </li>

            <li class="seperator"></li>
            <li class="search_item">
              <input type="text" placeholder="搜索素材" v-model.trim="searchKeyword" @keyup.enter="searchByKeyword" />

              <div class="search_right_bg_view">
                <img
                  class="search_icon"
                  src="@a/imgs/close2.png"
                  alt=""
                  @click="clearKeyword"
                  style="width: 12px; height: 12px; position: absolute; left: -24px; top: 14px; cursor: pointer"
                />
                <img
                  class="search_clear"
                  src="@a/imgs/search.png"
                  alt=""
                  srcset="@a/imgs/search@2x.png 2x"
                  @click="searchByKeyword"
                />
              </div>
            </li>
            <li class="btn_view" v-if="token === ''">
              <span class="btn1" @click="toRegister">注册</span>
              <span class="btn2" @click="toLogin">登录</span>
            </li>
            <li v-else class="btn_view">
              <div
                class="login_header_logo"
                v-if="avatarUrl === ''"
                @click="tominepage"
                :style="{
                  backgroundSize: 'contain',
                  backgroundImage: 'url(' + avatarUrlTtemp + ')',
                  backgroundRepeat: 'no-repeat'
                }"
              ></div>
              <div
                class="login_header_logo"
                @click="tominepage"
                v-else
                :style="{
                  backgroundSize: avatarUrl.indexOf('default_header_log') !== -1 ? 'contain' : 'cover',
                  backgroundImage: 'url(' + avatarUrl + ')',
                  backgroundRepeat: 'no-repeat'
                }"
              ></div>
              <div ref="popMenuRef" style="width: 120px; text-overflow: ellipsis; overflow: hidden">
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
        <div class="logo_view">
          <img
            class="logo_view_img"
            v-if="imgIndex == 0"
            src="@a/imgs/miaoshou_banner.jpg"
            alt=""
            style="object-fit: cover"
          />
          <img
            class="logo_view_img"
            v-if="imgIndex == 1"
            src="@a/imgs/wanqian_banner.jpg"
            alt=""
            style="object-fit: cover"
          />
          <img
            class="logo_view_img"
            v-if="imgIndex == 2"
            src="@a/imgs/shengsheng_banner.png"
            alt=""
            style="object-fit: cover"
          />
          <img
            class="logo_view_img"
            v-if="imgIndex == 3"
            src="@a/imgs/dingzuo_banner.jpg"
            alt=""
            style="object-fit: cover"
          />
        </div>
      </div>
    </div>
    <div v-if="navigationId !== 37" class="content">
      <ul class="list">
        <li class="item" ref="selectNav01" @click="() => (show_select_index = 0)">
          <span class="label">免费作品</span>
          <img class="select_img" src="@a/imgs/jiantou_down.png" alt="" srcset="@a/imgs/jiantou_down@2x.png 2x" />
          <ul class="children_list" v-if="show_select_index === 0">
            <li class="child_item top" @click.stop="chooseItemLevel('')">全部作品</li>
            <li class="child_item active" @click.stop="chooseItemLevel(0)">免费作品</li>
            <!-- <li class="child_item label" @click.stop="chooseItemLevel(1)">收费作品</li> -->
          </ul>
        </li>
        <!-- <li class="item" ref="selectNav02" @click="() => (show_select_index = 1)">
          <span class="label">推广海报</span>
          <img class="select_img" src="@a/imgs/jiantou_down.png" alt="" srcset="@a/imgs/jiantou_down@2x.png 2x" />
          <ul class="children_list" v-if="show_select_index === 1">
            <li class="child_item top" @click.stop="chooseItemByNavigationId('')">全部格式</li>
            <li
              class="child_item active"
              v-for="(item, index) in navigationsMenus"
              :key="index"
              @click.stop="chooseItemByNavigationId(item.id)"
            >
              {{ item.name }}
            </li>
          </ul>
        </li>
        <li class="item" ref="selectNav03" @click="() => (show_select_index = 2)">
          <span class="label">PSD</span>
          <img class="select_img" src="@a/imgs/jiantou_down.png" alt="" srcset="@a/imgs/jiantou_down@2x.png 2x" />
          <ul class="children_list" v-if="show_select_index === 2">
            <li class="child_item top" @click.stop="chooseItemByExt('')">全部格式</li>
            <li class="child_item active" @click.stop="chooseItemByExt('psd')">PSD</li>
            <li class="child_item label" @click.stop="chooseItemByExt('ai')">AI</li>
            <li class="child_item label" @click.stop="chooseItemByExt('png')">PNG</li>
          </ul>
        </li>
        <li class="item" ref="selectNav04" @click="() => (show_select_index = 3)">
          <span class="label">热门下载</span>
          <img class="select_img" src="@a/imgs/jiantou_down.png" alt="" srcset="@a/imgs/jiantou_down@2x.png 2x" />
          <ul class="children_list" v-if="show_select_index === 3">
            <li class="child_item active" @click.stop="chooseItemBySort('downCount')">热门下载</li>
            <li class="child_item label" @click.stop="chooseItemBySort('createDateTime')">最新上传</li>
          </ul>
        </li> -->
      </ul>
      <div class="result-view">
        <img
          class="lis_img"
          v-watermark="option"
          :src="item.fullUrl"
          :title="item.name"
          alt=""
          v-for="(item, index) in tableDatas"
          style="cursor: pointer; object-fit: contain"
          :key="index"
          @click="toDetail(item.id)"
        />
      </div>
      <pagination :records="records" :per-page="perPage" @paginate="reloadTable" v-model="page" />
    </div>

    <div
      v-if="navigationId === 37"
      class="bottom_view"
      :style="{
        backgroundSize: 'contain',
        backgroundImage: 'url(' + contactPng + ')',
        backgroundRepeat: 'no-repeat'
      }"
    >
      <!-- <div class="b_left_view">
        <span class="title">漫云客服</span>
        <img class="qcode_img" src="@a/imgs/qcode.png" alt="" srcset="@a/imgs/qcode@2x.png 2x" />
      </div>
      <div class="b_right_view">
        <div class="line1">
          <img class="logo_img" src="@a/imgs/logo.png" alt="" srcset="@a/imgs/logo@2x.png 2x" />
          <img class="service_img" src="@a/imgs/service_img.png" alt="" srcset="@a/imgs/service_img@2x.png 2x" />
        </div>
        <div class="line2">
          <span class="label_01">服务时间</span>
          <span class="label_02">周一到周日：9:00-21:00</span>
        </div>
        <div class="line3">
          <span class="label_01">扫码关注公众号</span>
          <span class="label_02">与在线客户直接沟通</span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { searchListService } from '@s/search-list-service'
export default {
  name: 'SearchListView',
  computed: {
    ...mapState(['token', 'userName', 'navigationsMenus', 'avatarUrl', 'imgIndex', 'navigationId'])
  },
  data() {
    return {
      avatarUrlTtemp: require('@a/imgs/default_header_log.png'),
      contactPng: require('@a/imgs/contact.png'),

      searchKeyword: '',
      show_select_index: -1,
      dropdownStatus: false,
      tableDatas: [],
      keywords: '',
      sortStr: '',

      page: 1, //默认第一页
      perPage: 50, //每页多少条
      pageNo: 1, //当前页
      records: 0, //总数,
      option: {
        // "bottomleft", "bottomright", "topleft", "topright", "center", "fill"
        mode: 'center',
        textBaseline: 'middle',
        font: '2rem Arial',
        fillStyle: 'rgb(176, 190, 197)',
        content: 't-pic.cn',
        rotate: 30
      }
    }
  },
  mounted() {
    if (this.$store.state.navigationId !== '') {
      this.keywords = `^navigationId=${this.$store.state.navigationId}`
    }

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
    if (this.$store.state.keywords) {
      this.searchKeyword = this.$store.state.keywords
      this.searchByKeyword()
    } else {
      this.reloadTable()
    }
  },
  unmounted() {
    this.$store.commit('setKeyWords', '')
    this.$store.commit('setNavigationId', '')
    document.removeEventListener('click')
  },
  methods: {
    toSearch(navigationId, index) {
      this.page = 1
      this.$store.commit('setimgIndex', index)
      this.searchKeyword = ''
      this.$store.commit('setKeyWords', '')
      this.$store.commit('setNavigationId', navigationId)
      this.keywords = `^navigationId=${navigationId}`
      this.reloadTable()
    },
    async reloadTable() {
      let conditionStr = ''
      this.pageNo = this.page
      var params = { page: this.pageNo, rows: this.perPage }
      const { rows, total } = await searchListService({
        keyWord: this.keywords,
        page: `${params.page}^${params.rows}`,
        date: '',
        sort: this.sortStr,
        status: [2]
      })
      rows.forEach(m => {
        console.log(m)
        if (!m.isImage) {
          m.fullUrl = '../assets/imgs/play.png'
        }
      })
      this.tableDatas = rows
      this.records = total
      document.documentElement.scrollTop = 200
    },
    clickDropdown() {
      this.dropdownStatus = !this.dropdownStatus
    },
    toHome() {
      this.$store.commit('setKeyWords', '')
      this.$router.push('/home')
    },
    chooseItemByNavigationId(navigationId) {
      this.show_select_index = -1
      if (navigationId === '') {
        this.keywords = ''
      } else {
        this.keywords = `^navigationId=${navigationId}`
      }
      this.reloadTable()
    },
    chooseItemLevel(level) {
      this.show_select_index = -1
      if (level === '') {
        this.keywords = ''
      } else {
        this.keywords = `^level=${level}^navigationId=${this.$store.state.navigationId}`
      }
      this.reloadTable()
    },
    tominepage() {
      this.$router.push('/mine/info?index=0')
    },
    chooseItemByExt(ext) {
      this.show_select_index = -1
      if (ext === '') {
        this.keywords = ''
      } else {
        this.keywords = `^ext=${ext}`
      }
      this.reloadTable()
    },
    chooseItemBySort(sort) {
      this.show_select_index = -1
      if (sort === '') {
        this.sortStr = ''
      } else {
        this.sortStr = `${sort}^DESC`
      }
      this.reloadTable()
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
    toDetail(id) {
      let newUrl = this.$router.resolve({
        path: 'search_detail/' + id
      })
      window.open(newUrl.href, '_blank')
    },
    toLogin() {
      this.$store.commit('setActiveTab', 1)
      this.$router.push('/login')
    },
    async searchByKeyword() {
      this.$store.commit('setKeyWords', this.searchKeyword)
      const { rows } = await searchListService({
        keyWord: this.searchKeyword,
        page: '1^100',
        date: '',
        sort: '',
        status: [2]
      })
      console.log(rows)
      this.tableDatas = rows
    },
    clearKeyword() {
      this.$store.commit('setKeyWords', '')
      this.searchKeyword = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/colors';
@import '../assets/css/font_size';
.VuePagination {
  margin-top: 20px;
}

.searchListView {
  box-sizing: border-box;
  margin: 0 auto;
  .container {
    box-sizing: border-box;
    width: 1440px;
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
            padding-bottom: 5px;
            &.active {
              border-bottom: 2px solid rgb(35, 97, 172);
              color: rgb(35, 97, 172);
            }
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
        height: 400px;
        display: flex;
        color: $color1;
        justify-content: center;
        align-items: center;
        font-size: 17px;
        border: 1px solid $color6;
        .logo_view_img {
          width: 1440px;
          height: 400px;
        }
      }
    }
  }
  .bottom_view {
    box-sizing: border-box;
    margin-top: 29px;
    height: 1080px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

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
