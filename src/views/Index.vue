<template>
  <div class="container">
    <div class="header_view">
      <div class="top_view">
        <ul class="list">
          <li class="logo">
            <img class="logo_img" src="@a/imgs/logo.png" alt="" srcset="@a/imgs/logo@2x.png 2x" />
            <span class="logo_title">T-pic</span>
          </li>
          <li class="label" v-for="(item, index) in navigationsMenus" :key="index" @click="toSearch(item.id, index)">
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
                style="width: 18px; height: 18px"
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
      <!-- <div class="logo_view">
        <img class="logo_view_img" src="@a/imgs/home_banner.jpg" alt="" style="object-fit: cover" />
      </div> -->
      <swiper ref="mySwiper" v-bind:options="swiperOptions">
        <swiper-slide v-for="(item, index) in bannerImgArr" v-bind:key="index">
          <img class="logo_view_img" :src="item" alt="" style="object-fit: cover" />
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="center_view">
      <div class="left_view">
        <p class="point_title">Initiate Professional</p>
        <p class="point_title">Rapid Original</p>
        <p class="desc maginTop">
          我们网站为医疗圈提供专业医学配图，作品全部原创，下载版权无忧。医疗卫生领域作为一个专业性极强的领域，所需要的专业配图市面上极为稀少，我们网站聘用大量专业手绘人员，从今往后，将源源不断地提供大量专业级医学配图。
        </p>

        <p class="desc"></p>
        <div class="btn_more" @click="() => $router.push('/company_intro')">
          <span class="label">了解更多</span>
          <img
            class="label_img"
            src="@a/imgs/arrow-pointing-to-right.png"
            @click="gotoSearch"
            alt=""
            srcset="@a/imgs/arrow-pointing-to-right@2x.png 2x"
          />
        </div>
      </div>
      <div class="right_view">
        <div class="frame_view">
          <!-- <img class="frame_banner_img" src="@a/imgs/index_banner.png" alt="" /> -->
          <video
            src="https://t-pic.cn:8003/assets/videos/site_animation_player.mp4"
            width="489"
            height="305"
            controls="controls"
            autoplay
          ></video>
          <div class="laptop_line"></div>
          <div class="laptop_bottom"></div>
        </div>
      </div>
    </div>
    <div class="footer_view">
      <div class="row">板块展示</div>
      <div class="list">
        <div class="item" v-for="(item, index) in navigationsMenus" :key="index">
          <img
            class="hot_img"
            :src="item.firstUrl"
            alt=""
            @click="toSearch(item.id, index)"
            style="cursor: pointer; object-fit: contain"
          />
          <span class="hot_title">{{ item.name }}</span>
          <div class="hot_more_view" @click="toSearch(item.id, index)">
            <span class="poionter">查看更多</span>
            <img
              class="blue_direct_img"
              src="@a/imgs/arrow-pointing-to-right-blue.png"
              alt=""
              srcset="@a/imgs/arrow-pointing-to-right-blue@2x.png 2x"
            />
          </div>
        </div>
      </div>
      <div style="width:100%;margin-top: 30px;display:flex;align-items:center;justify-content:center;">
        <span style="font-size: 14px;font-weight: 600;letter-spacing: 1px;margin-right:10px;">T图漫画社</span>
        <img src="https://pic3.zhimg.com/80/v2-d0289dc0a46fc5b15b3363ffa78cf6c7.png" />
        <a style="font-size: 14px;font-weight: 600;letter-spacing: 1px;color:#000000;" href="https://beian.miit.gov.cn/"
          >沪ICP备2021010880号-2</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getNavigationMenusService } from '@s/navigation-service'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { searchListService } from '@s/search-list-service'
export default {
  name: 'IndexView',
  computed: {
    ...mapState(['token', 'userName', 'navigationsMenus', 'avatarUrl'])
  },
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      avatarUrlTtemp: require('@a/imgs/default_header_log.png'),
      bannerImgArr: [
        require('@a/imgs/home_banner.jpg'),
        require('@a/imgs/miaoshou_banner.jpg'),
        require('@a/imgs/wanqian_banner.jpg'),
        require('@a/imgs/shengsheng_banner.png'),
        require('@a/imgs/dingzuo_banner.jpg')
      ],
      dropdownStatus: false,
      searchKeyword: '',
      datas: [],
      swiperOptions: {
        loop: true,
        speed: 2000,
        autoplay: {
          delay: 3000,

          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 显示分页
        pagination: {
          el: '.swiper-pagination',
          clickable: true //允许分页点击跳转
        },
        // 设置点击箭头
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  async mounted() {
    // let { rows: rowDatas } = await getNavigationMenusService(10)
    // let titles = rowDatas.filter(f => f.name !== '首页')
    // titles.forEach(async m => {
    //   if (m.name !== '首页') {
    //     const { rows: Datas } = await searchListService({
    //       keyWord: `^navigationId=${m.id}`,
    //       page: '1^100',
    //       date: '',
    //       sort: '',
    //       status: [2]
    //     })
    //     if (Datas.length > 0) {
    //       m.firstItem = Datas[0]
    //       if (
    //         m.firstItem.fullUrl.indexOf('mp4') !== -1 ||
    //         m.firstItem.fullUrl.indexOf('mkv') !== -1 ||
    //         m.firstItem.fullUrl.indexOf('mov') !== -1 ||
    //         m.firstItem.fullUrl.indexOf('m4v') !== -1 ||
    //         m.firstItem.fullUrl.indexOf('wmv') !== -1 ||
    //         m.firstItem.fullUrl.indexOf('avi') !== -1 ||
    //         m.firstItem.fullUrl.indexOf('flv') !== -1
    //       ) {
    //         m.firstUrl = '../assets/imgs/play.png'
    //       } else {
    //         m.firstUrl = Datas.length === 0 ? '' : Datas[0].fullUrl
    //       }

    //       m.ImgId = Datas.length === 0 ? '' : Datas[0].id
    //     } else {
    //       m.firstUrl = require('../assets/imgs/dingzuo_banner.jpg')
    //     }
    //   }
    // })

    this.$store.commit(
      'setNavigationMenus',
      titles.filter(f => f.name !== '视频动画')
    )

    document.addEventListener('click', e => {
      if (this.$refs.popMenuRef) {
        if (!this.$refs.popMenuRef.contains(e.target)) {
          this.dropdownStatus = false
        }
      }
    })
  },
  unmounted() {
    document.removeEventListener('click')
  },
  methods: {
    tominepage() {
      this.$router.push('/mine/info?index=0')
    },
    toSearch(navigationId, index) {
      this.searchKeyword = ''
      this.$store.commit('setKeyWords', '')
      this.$store.commit('setNavigationId', navigationId)
      this.$store.commit('setimgIndex', index)

      this.$router.push('/search')
    },
    toRegister() {
      this.$store.commit('setActiveTab', 0)
      this.$router.push('/login')
    },
    toLogin() {
      this.$store.commit('setActiveTab', 1)
      this.$router.push('/login')
    },
    toDetail(id) {
      this.$router.push('search_detail/' + id)
    },
    clickDropdown() {
      this.dropdownStatus = !this.dropdownStatus
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
    async searchByKeyword() {
      this.$store.commit('setKeyWords', this.searchKeyword)
      this.$router.push('search')
    },
    clearKeyword() {
      this.$store.commit('setKeyWords', '')
      this.searchKeyword = ''
    },
    gotoSearch() {
      this.$store.commit('setKeyWords', '')
      this.$router.push('/search')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/colors';
@import '../assets/css/font_size';
.swiper-container {
  width: 100%;
  height: 400px;
}
.swiper-slide {
  width: 100%;
  height: 400px;
  background-color: #42b983;
  .logo_view_img {
    width: 1440px;
    height: 400px;
  }
}
// .swiper-container {
//   height: 500px;
//   width: 100%;
//   .swiper-wrapper {
//     .swiper-slide {
//       width: 100%;
//       height: 100%;
//       background-color: #42b983;
//       text-align: center;
//       line-height: 500px;
//     }
//   }
// }
.container {
  box-sizing: border-box;
  margin-left: 103px;
  margin-right: 106px;
  width: 1440px;
  height: 100%;
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
      .logo_view_img {
        width: 1230px;
        height: 204px;
      }
    }
  }
  .center_view {
    box-sizing: border-box;
    height: 421px;
    display: flex;
    flex-direction: row;
    .left_view {
      width: 615px;
      box-sizing: border-box;
      padding-right: 28.5px;
      padding-left: 62px;
      padding-top: 73px;
      .point_title {
        color: $color1;
        font-size: 38px;
        line-height: 43.2px;
        font-weight: bold;
        margin: 0;
        padding: 0;
      }
      .desc {
        line-height: 1.5;
        font-size: 18px;
        color: $color5;
        margin: 0;
        padding: 0;
        display: block;
        &.maginTop {
          margin-top: 13px;
        }
      }
      .btn_more {
        box-sizing: border-box;
        width: 170px;
        height: 50px;
        margin-top: 11px;
        background: $color7;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        align-items: center;
        .label {
          font-size: 16px;
          font-weight: 400;
          line-height: 27px;
          color: $color9;
          margin-left: 27px;
        }
        .label_img {
          width: 17px;
          height: 12px;
          margin-right: 24px;
        }
      }
    }
    .right_view {
      width: 615px;
      box-sizing: border-box;
      padding-top: 50px;
      padding-right: 62px;
      padding-left: 30px;
      .frame_view {
        box-sizing: border-box;
        width: 541px;
        height: 353px;

        background: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2) inset;
        border-radius: 12px;
        position: relative;
        .frame_banner_img {
          width: 488.68px;
          height: 304.99px;
          position: absolute;
          top: 24px;
          left: 26px;
          right: 26px;
        }
        .opacity_view {
          position: absolute;
          bottom: 0;
          width: 3.722222rem;
          height: 38px;
          background: $color8;
          opacity: 0.05;
          border-radius: 0.333333rem;
        }
        .laptop_line {
          position: absolute;
          width: 115px;
          height: 3px;
          bottom: 5px;
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
          bottom: -8px;
          left: -50px;
          width: 643px;
          height: 8.56px;
          background: linear-gradient(180deg, #ffffff 0%, #cdcbd5 100%);
        }
      }
    }
  }
  .footer_view {
    box-sizing: border-box;
    margin-bottom: 54px;
    .row {
      margin-top: 61px;
      margin-left: 62px;
      font-size: 25px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 45px;
      color: $color1;
    }
    .list {
      display: flex;
      flex-direction: row;
      width: 1109px;
      margin-top: 68px;
      margin-left: 62px;
      margin-right: 167px;
      box-sizing: border-box;
      justify-content: flex-start;
      .item {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        width: 236px;
        height: 250.26px;
        margin: 0 15px;
        background: $color9;
        border-radius: 30px;
        box-shadow: 0px 10px 46px rgba(0, 0, 0, 0.07);
        .hot_img {
          width: 236px;
          height: 159px;
          box-shadow: 0px 10px 46px rgba(0, 0, 0, 0.07);
          border-radius: 30px 30px 0 0;
          cursor: pointer;
        }
        .hot_title {
          color: $color1;
          font-size: 20px;
          display: inline-block;
          box-sizing: border-box;
          padding-top: 12px;
          padding-left: 31px;
          padding-right: 27px;
          font-weight: bold;
        }
        .hot_more_view {
          box-sizing: border-box;
          padding-top: 10px;
          padding-left: 31px;
          padding-right: 27px;
          font-size: 14px;
          color: $color7;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          .poionter {
            cursor: pointer;
          }
          .blue_direct_img {
            width: 16.18px;
            height: 11px;
            margin-left: 39px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
