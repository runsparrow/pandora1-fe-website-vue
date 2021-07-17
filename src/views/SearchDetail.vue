<template>
  <div class="searchDetailView">
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
              <input type="text" placeholder="搜索素材" v-model.trim="searchKeyword" />

              <div class="search_right_bg_view">
                <img
                  class="search_icon"
                  src="@a/imgs/search.png"
                  alt=""
                  srcset="@a/imgs/search@2x.png 2x"
                  @click="searchByKeyword"
                />
                <img
                  class="search_clear"
                  src="@a/imgs/search_clear.png"
                  alt=""
                  srcset="@a/imgs/search_clear@2x.png 2x"
                  @click="clearKeyword"
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
      <img class="big_img" :src="detail.fullUrl" alt="" />
      <div class="nav">
        <div class="top_view">
          <span class="label">首页</span>
          <span class="operator">></span>
          <span class="label">推广海报</span>
        </div>
        <span class="title">{{ detail.name }}</span>
        <span class="id_label">ID:yyyymmdd000000</span>
        <span class="sucai_desc">素材版权说明</span>
        <div class="line"></div>
        <span class="spec">格式 | {{ detail.ext }}</span>
        <span class="spec">分辨率 | {{ detail.dpi === '' ? '' : detail.dpi + 'PI' }}</span>
        <span class="spec">尺寸 | {{ detail.size }}</span>
        <span class="spec">颜色 | </span>
        <span class="spec">大小 | </span>
        <div class="btn_view">
          <div class="buy_vip" @click="applyVIP">立即开通VIP</div>
          <div class="collect" v-if="token !== ''">收藏</div>
          <div class="collect" v-if="token !== ''" @click="downloadFile">下载</div>
        </div>
        <div class="line"></div>
        <div class="author_view">
          <div class="login_header_logo">头像</div>
          <div class="right_view">
            <div class="level">
              <span>Lv.1</span>
              <span class="author_type">设计爱好者</span>
            </div>
            <div class="username">
              <span>用户名</span>
              <span class="author">{{ detail.ownerName }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getDetailByIdService } from '@s/detail-service'
import ajaxFile from '@l/ajax-file-interceptor'
import ajaxRequest from '@l/ajax-service'
import CONFIG from '@/config/config'
export default {
  name: 'ProductDetail',
  computed: {
    ...mapState(['token', 'userName', 'navigationsMenus'])
  },
  data() {
    return {
      dropdownStatus: false,
      detail: {},
      searchKeyword: ''
    }
  },
  async mounted() {
    if (this.$route.params.id) {
      const detailObj = await getDetailByIdService({ id: this.$route.params.id })
      this.detail = detailObj.row
    }
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
    reloadTabl() {},
    toSearch(navigationId) {
      this.searchKeyword = ''
      this.$store.commit('setKeyWords', '')
      this.$store.commit('setNavigationId', navigationId)
      this.$router.push('/search')
    },
    downloadFile() {
      let relativePath = this.detail.fullUrl + ''
      const fileName = this.detail.fullUrl.substring(this.detail.fullUrl.lastIndexOf('/') + 1)
      relativePath = relativePath.substring(relativePath.indexOf('uploadFiles') - 1)
      const fileDto = {
        memberId: this.$store.state.memberId,
        memberName: this.$store.state.userName,
        id: this.detail.id,
        name: this.detail.name,
        url: relativePath,
        ownerId: this.detail.ownerId,
        ownerName: this.detail.ownerName,
        createDateTime: new Date(),
        createUserId: -1,
        editDateTime: new Date(),
        editUserId: -1
      }
      ajaxRequest({
        method: 'post',
        url: `${CONFIG.API_URLS.MIS_CMS_Down_Create_Single_URL}`, // 请求地址
        data: fileDto
      }).then(res => {
        if (res.result) {
          ajaxFile({
            // 用axios发送post请求
            method: 'post',
            url: `${CONFIG.API_URLS.filedownload_URL}`, // 请求地址
            data: { fileUrl: relativePath },
            responseType: 'blob'
          }).then(res => {
            let url = window.URL.createObjectURL(res)
            const link = document.createElement('a')
            link.download = fileName
            link.style.display = 'none'
            link.href = url
            document.body.appendChild(link)
            link.click()
            URL.revokeObjectURL(link.href)
            document.body.removeChild(link)
          })
        }
      })
    },
    clickDropdown() {
      this.dropdownStatus = !this.dropdownStatus
    },
    toHome() {
      this.$router.push('/home')
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
    },
    applyVIP() {
      if (!this.$store.state.token) {
        this.$router.push('/login')
      } else {
        this.$router.push('/mine/info?index=2&inner_index=2')
      }
    },
    async searchByKeyword() {
      this.$store.commit('setKeyWords', this.searchKeyword)
      this.$router.push('/search')
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
.searchDetailView {
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
    padding-top: 32px;
    padding-bottom: 39px;
    display: flex;
    flex-direction: row;
    .big_img {
      box-sizing: border-box;
      width: 680px;
      height: 650px;
      margin-left: 70px;
      margin-right: 15px;
    }
    .nav {
      width: 325px;
      height: 650px;
      background: $color9;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .top_view {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        padding-top: 16px;
        padding-left: 22px;
        .label {
          box-sizing: border-box;
          font-size: 12px;
          font-weight: 400;
          color: $color19;
        }
        .operator {
          box-sizing: border-box;
          font-size: 12px;
          color: red;
          margin-left: 2px;
          margin-right: 2px;
        }
      }
      .title {
        overflow: hidden;
        box-sizing: border-box;
        color: $color1;
        font-size: 17px;
        padding-left: 22px;
        margin-top: 39px;
        font-weight: bold;
      }
      .id_label {
        box-sizing: border-box;
        padding-left: 22px;
        margin-top: 5px;
        color: $color19;
        font-size: 12px;
      }
      .sucai_desc {
        box-sizing: border-box;
        padding-left: 22px;
        margin-top: 3px;
        color: $color4;
        font-size: 12px;
      }
      .line {
        width: 298px;
        height: 0px;
        border: 1px solid $color6;
        box-sizing: border-box;
        margin-top: 10px;
        margin-left: 15px;
        margin-right: 15px;
        margin-bottom: 10px;
      }
      .spec {
        box-sizing: border-box;
        color: $color19;
        margin-bottom: 13px;
        padding-left: 22px;
      }
      .btn_view {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        padding-left: 22px;
        .buy_vip {
          box-sizing: border-box;
          width: 144px;
          height: 35px;
          background: $color4;
          border-radius: 18px;
          font-size: 14px;
          text-align: center;
          line-height: 35px;
          font-weight: 400;
          color: $color9;
          cursor: pointer;
        }
        .collect {
          box-sizing: border-box;
          width: 53px;
          height: 35px;
          border: 1px solid $color4;
          border-radius: 18px;
          font-size: 14px;
          text-align: center;
          line-height: 35px;
          font-weight: 400;
          color: $color4;
          margin-left: 9px;
          cursor: pointer;
        }
      }
      .author_view {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        padding-top: 10px;
        padding-left: 22px;
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
        .right_view {
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-sizing: border-box;
          padding-left: 9px;
          .level {
            box-sizing: border-box;
            color: $color4;
            font-size: 16px;
            .author_type {
              margin-left: 22px;
            }
          }
          .username {
            box-sizing: border-box;
            font-size: 16px;
            color: $color1;
            font-weight: 400;
            .author {
              margin-left: 4px;
            }
          }
        }
      }
    }
  }
}
</style>
