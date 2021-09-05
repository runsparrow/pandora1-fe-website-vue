<template>
  <div class="loginContainer">
    <div class="container">
      <div class="header_view">
        <div class="top_view">
          <ul class="list">
            <li class="logo">
              <img class="logo_img" src="@a/imgs/logo.png" alt="" srcset="@a/imgs/logo@2x.png 2x" @click="toHome" />
              <span class="logo_title" @click="toHome">T-pic</span>
            </li>
            <li class="label" v-for="(item, index) in navigationsMenus" :key="index" @click="toSearch(item.id,index)">
              {{ item.name }}
            </li>
            <li class="seperator"></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="main">
      <h1 style=";margin-bottom:0;text-align:center;line-height:115%">
    <span style="font-size:27px;line-height:115%;font-family:&#39;微软雅黑&#39;,sans-serif">关于</span><span style="font-family:&#39;微软雅黑&#39;,sans-serif">T-pic</span>
</h1>
<p style="text-align:left;line-height:115%">
    <span style="font-family:&#39;微软雅黑&#39;,sans-serif">T-pic</span>
</p>
<p style="text-align:left;text-indent:27px;line-height:115%">
    <span style="font-size:13px;line-height:115%;font-family: &#39;微软雅黑&#39;,sans-serif">T-pic </span><span style="font-size:13px;line-height:115%;font-family:&#39;微软雅黑&#39;,sans-serif">是一个立足医疗行业、突破用户习惯、专业服务于医护及相关人员，并专注于内容形式生产的网站。</span>
</p>
<p style="text-align:left;line-height:115%">
    <span style="font-size:13px;line-height:115%;font-family:&#39;微软雅黑&#39;,sans-serif">&nbsp;&nbsp;&nbsp; T-pic </span><span style="font-size:13px;line-height:115%;font-family:&#39;微软雅黑&#39;,sans-serif">所有的板块和产品设计，都源于“力求解放医护人员的私人时间和空间”的初心，希望借助互联网的优势，最大程度的帮助到所有的用户解决问题。</span>
</p>
<p style="text-align:left;text-indent:27px;line-height:115%">
    <span style="font-size:13px;line-height:115%;font-family:&#39;微软雅黑&#39;,sans-serif">T-pic </span><span style="font-size:13px;line-height:115%;font-family:&#39;微软雅黑&#39;,sans-serif">支持用户在网站上进行医疗图片、素材和视频等的浏览和下载；同时，也支持部分有设计制作能力的用户上传自己的专业作品，以获得兼职收入；不久的将来，会支持部分拥有著作权的用户出版其图书并在本网站出售，达到专业科普的宣传。</span>
</p>
<p style="text-align:left;text-indent:28px;line-height:115%">
    <span style="font-family:&#39;微软雅黑&#39;,sans-serif">T-pic </span><span style="font-family:&#39;微软雅黑&#39;,sans-serif">网站2021年上线的板块主要四个板块（</span><span style="font-size:13px;line-height:115%;font-family:&#39;微软雅黑&#39;,sans-serif">持续不断地填充）</span><span style="font-family:&#39;微软雅黑&#39;,sans-serif">：</span>
</p>
<p class="MsoListParagraph" style="margin-left:52px;text-align:left;line-height:115%">
    <span style=";line-height:115%;font-family:&#39;微软雅黑&#39;,sans-serif">1） </span><span style="font-family:&#39;微软雅黑&#39;,sans-serif">妙手丹青：主要是医疗场景的图片，</span><span style="font-size:13px;line-height:115%;font-family:&#39;微软雅黑&#39;,sans-serif">数量为几千幅且免费非商用；</span>
</p>
<p class="MsoListParagraph" style="margin-left:52px;text-align:left;line-height:115%">
    <span style=";line-height:115%;font-family:&#39;微软雅黑&#39;,sans-serif">2） </span><span style="font-size:13px;line-height:115%;font-family:&#39;微软雅黑&#39;,sans-serif">万千组合：主要是医疗相关素材，数量为几千个且免费非商用；</span>
</p>
<p class="MsoListParagraph" style="margin-left:52px;text-align:left;line-height:115%">
    <span style=";line-height:115%;font-family:&#39;微软雅黑&#39;,sans-serif">3） </span><span style="font-size:13px;line-height:115%;font-family:&#39;微软雅黑&#39;,sans-serif">生生不息：主要是医疗相关GIF动图，数量为几百个且免费非商用；</span>
</p>
<p class="MsoListParagraph" style="margin-left:52px;text-align:left;line-height:115%">
    <span style=";line-height:115%;font-family:&#39;微软雅黑&#39;,sans-serif">4） </span><span style="font-size:13px;line-height:115%;font-family:&#39;微软雅黑&#39;,sans-serif">量身定做：主要是医疗作品的个性化需求可以找到网站客服联系解决。</span>
</p>
<p style="text-align:left;line-height:115%">
    <span style="font-family:&#39;微软雅黑&#39;,sans-serif">T-pic</span><span style="font-family: &#39;微软雅黑&#39;,sans-serif">的原始积累</span>
</p>
<p style="text-align:left;text-indent:27px;line-height:115%">
    <span style="font-size:13px;line-height:115%;font-family: &#39;微软雅黑&#39;,sans-serif">T-pic</span><span style="font-size:13px;line-height:115%;font-family:&#39;微软雅黑&#39;,sans-serif">是由上海漫云文化传媒中心全力打造的品牌网站，公司本身是一家年轻的文创企业，有多年服务于医疗行业相关的企业、医院和各大协会的经验。</span>
</p>
<p style="text-align:left;text-indent:27px;line-height:115%">
    <span style="font-size:13px;line-height:115%;font-family:&#39;微软雅黑&#39;,sans-serif">漫云文化目前拥有专业级的医学动漫团队，通过公司内部团队专业性互补合作，截至2021年，已完成医疗动画几十部，时长总计几百分钟；医疗漫画类项目几十项，篇幅总计数百篇；通过大量的成功案例，已经在行业内获得众多企业用户的认可和较高的知名度。</span>
</p>
<p style="text-align:left;text-indent:27px;line-height:115%">
    <span style="font-size:13px;line-height:115%;font-family:&#39;微软雅黑&#39;,sans-serif">漫云文化希望运用自身文化与创新的优势，借助T-pic网站，以动漫画等文化载体为形式、有效且低成本的建立医疗行业相关内容宣传的自运转，从而在医疗行业各个层面，尤其是底层的大众宣传科普层面，达到一个良性的从医护到大众再到医护的众创闭合环。</span>
</p>
<p style="text-align:left;line-height:115%">
    <span style="font-family:&#39;微软雅黑&#39;,sans-serif">T-pic</span><span style="font-family: &#39;微软雅黑&#39;,sans-serif">的未来</span>
</p>
<p style="text-align:left;text-indent:27px;line-height:115%">
    <span style="font-size:13px;line-height:115%;font-family:&#39;微软雅黑&#39;,sans-serif">T-pic </span><span style="font-size:13px;line-height:115%;font-family:&#39;微软雅黑&#39;,sans-serif">将在2022年至更远的将来，拓展更多的可能，期望打造一个拥有包括图库、视频库、书籍库、课程库、周边产品库、医疗边缘产品库等多元化板块的网站，成为医疗、科普、大众的，专业且高效的联系纽带。</span>
</p>
<p>
    <br/>
</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import PrivatePolicy from '@c/PrivatePolicy.vue'
import UserPolicy from '@/components/UserPolicy.vue'
import {
  getUserInfoService,
  getUserCodeService,
  submitUserCodeService,
  submitRegService,
  checkMobileExistService,
  checkUseNameExistService
} from '@s/login-service'
import { mineCMSRowByIdService } from '@s/mine-info-service'
export default {
  name: 'LoginView',
  data() {
    return {
      modalShow: false,
      modalUserShow: false,
      accountName: '',
      accountNameErrorMsg: '手机号不能为空',
      accountNameInValid: false,
      accountPwd: '',
      accountPwdInValid: false,
      timer: null,
      code_timer: null,
      register_time: null,
      seconds: 3,
      accept_checked: false,
      accountCode: '',
      register_show: 0,
      accountCodeInValid: false,
      code_seconds: 60,
      register_seconds: 5,
      accountCodeErrorMsg: '验证码不能为空',
      accountRegPwd: '',
      accountRegPwdInValid: false,
      accountRegPwdErrorMsg: '新密码不能为空',
      accountRegConfirmPwd: '',
      accountRegConfirmPwdInValid: false,
      accountRegConfirmPwdErrorMsg: '确认密码不能为空',
      userName: '',
      userNameErrorMsg: '用户名不能为空',
      userNameInValid: false,
      registSuccess: false,
      btn_disabled: false,
      btnLoginLabel: '登录'
    }
  },
  computed: {
    ...mapState(['token', 'code', 'activeTab', 'navigationsMenus']),
    ...mapGetters(['version'])
  },
  mounted() {

  },
  unmounted() {

  },
  methods: {
    toHome() {
      this.$router.push('/home')
    },
  toSearch(navigationId,index) {
      this.$store.commit('setimgIndex', index)
      this.$store.commit('setKeyWords', '')
      this.$store.commit('setNavigationId', navigationId)
      this.keywords = `^navigationId=${navigationId}`
      this.$router.push("/search")
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/colors';
@import '../assets/css/font_size';
.loginContainer {
  box-sizing: border-box;
  height: 100%;
  position: relative;
  .container {
    box-sizing: border-box;
    padding-left: 164px;
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
          justify-content: flex-start;
          flex: 1;
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
            margin-left: 65px;
            cursor: pointer;
          }
          .seperator {
            position: relative;
            margin-left: 62px;
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
        }
      }
    }
  }
  .main {
    position: relative;
    margin: 0 auto;
    /* border: 1px solid blue; */
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 150px 0 150px ;
    box-shadow:10px 10px 10px 5px #888888;
  }
}
</style>
