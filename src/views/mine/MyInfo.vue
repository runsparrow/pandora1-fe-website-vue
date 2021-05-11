<template>
  <div class="container">
    <div class="loading" v-show="loading">
      <img class="loading_img" src="@a/imgs/loading.gif" alt="" />
    </div>
    <div class="header_view">
      <div class="top_view">
        <ul class="list">
          <li class="logo">
            <img class="logo_img" src="@a/imgs/logo_01.png" alt="" srcset="@a/imgs/logo_01@2x.png 2x" @click="toHome" />
            <span class="logo_title" @click="toHome">SooYi.CN</span>
          </li>
          <li class="label" @click="toSearch">推广海报</li>
          <li class="label" @click="toSearch">新媒体配置</li>
          <li class="label" @click="toSearch">视频动画</li>
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
                <div class="item6" style="padding-bottom: 10px;" @click="goto(4)">退出</div>
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
          <div :class="['item', { active: outer_tabIndex === 0 }]" @click="() => (outer_tabIndex = 0)">
            我的信息
          </div>
          <div :class="['item', { active: outer_tabIndex === 1 }]" @click="() => (outer_tabIndex = 1)">我的作品</div>
          <div :class="['item', { active: outer_tabIndex === 2 }]" @click="() => (outer_tabIndex = 2)">我的资产</div>
          <div :class="['item', { active: outer_tabIndex === 3 }]" @click="() => (outer_tabIndex = 3)">帮助中心</div>
        </div>
        <div class="content_row">
          <div v-if="outer_tabIndex === 0" class="my_info_tab_view">
            <div class="title_view">
              <span :class="['title', { active: inner_tabIndex === 0 }]" @click="() => (inner_tabIndex = 0)"
                >身份认证</span
              >
              <span :class="['title', { active: inner_tabIndex === 1 }]" @click="() => (inner_tabIndex = 1)"
                >设计师认证</span
              >
            </div>
            <template v-if="inner_tabIndex === 0">
              <div class="title_content_view">
                <div class="left_view">
                  <div class="header_logo">头像</div>
                  <span class="label_user">用户名</span>
                  <span class="label_jifen">积分:999</span>
                  <div class="career_bg_view">
                    <div class="c_name">医生</div>
                    <div class="c_duty">护士</div>
                    <div class="c_duty">医院行政部门</div>
                  </div>
                </div>
                <div class="right_view">
                  <div class="row">
                    <span class="label">身份</span>
                    <select class="select_view" @change="e => changeIdentity(e)" v-model="personIdentity">
                      <option v-for="item in doctorsArr" :key="item.id" :value="item.id">{{ item.name }}</option>
                    </select>
                  </div>
                  <div class="row">
                    <span class="label">省</span>
                    <select class="select_view" @change="e => provinceChange(e)">
                      <option v-for="item in provincesArrr" :key="item.code" :value="item.code">{{ item.name }}</option>
                    </select>
                  </div>
                  <div class="row">
                    <span class="label">市</span>
                    <select class="select_view" @change="e => cityChange(e)">
                      <option v-for="item in citiesArr" :key="item.code" :value="item.code">{{ item.name }}</option>
                    </select>
                  </div>
                  <div class="row">
                    <span class="label">区</span>
                    <select class="select_view">
                      <option v-for="item in divisionArr" :key="item.code" :value="item.code">{{ item.name }}</option>
                    </select>
                  </div>
                  <div class="row" v-if="personIdentity === '5'">
                    <span class="label">公司名称</span>
                    <input type="text" class="select_view" />
                  </div>
                  <div class="row" v-if="personIdentity === '5'">
                    <span class="label">所属部门</span>
                    <input type="text" class="select_view" />
                  </div>
                  <div class="row" v-if="personIdentity === '5'">
                    <span class="label">职位职务</span>
                    <input type="text" class="select_view" />
                  </div>
                  <div class="row" v-if="personIdentity === '5'">
                    <span class="label">公司邮箱</span>
                    <input type="text" class="select_view" />
                  </div>
                  <div class="row" v-if="personIdentity === '2' || personIdentity === '3' || personIdentity === '4'">
                    <span class="label">医院/单位</span>
                    <select class="select_view" @change="e => hospitalChange(e)">
                      <option v-for="item in hospitalsArr" :key="item.id" :value="item.id">{{ item.name }}</option>
                    </select>
                  </div>
                  <div class="row" v-if="personIdentity === '2' || personIdentity === '3' || personIdentity === '4'">
                    <span class="label">科室/部门</span>
                    <select class="select_view">
                      <option v-for="item in keshiArr" :key="item.id" :value="item.id">{{ item.name }}</option>
                    </select>
                  </div>
                  <div class="row" v-if="personIdentity === '2' || personIdentity === '3'">
                    <span class="label">证件编码</span>
                    <input type="text" class="select_view" v-model="certificateNo" />
                  </div>
                  <div class="row" v-if="personIdentity === '2' || personIdentity === '3'">
                    <span class="label">证书上传</span>
                    <div class="pic_view">
                      <div class="upload_view" @click="toTouchUploadFile">
                        <img
                          class="add_file_img"
                          src="@a/imgs/add-file.png"
                          alt=""
                          srcset="@a/imgs/add-file@2x.png 2x"
                        />
                        <input
                          class="uploadCertFile"
                          type="file"
                          @change="uploadCertFile"
                          ref="CertUploadFileRef"
                          accept="image/png,image/jpeg,image/gif,image/jpg"
                        />
                      </div>
                      <div class="pic_list">
                        <div
                          class="img_item"
                          :style="{
                            backgroundSize: 'contain',
                            backgroundImage: 'url(' + certificateUrl + ')'
                          }"
                        >
                          <!-- <img
                            class="del_file_img"
                            src="@a/imgs/del-file.png"
                            alt=""
                            srcset="@a/imgs/del-file@2x.png 2x"
                          /> -->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row" v-if="personIdentity === '4'">
                    <span class="label">工牌号上传</span>
                    <div class="pic_view">
                      <div class="upload_view">
                        <img
                          class="add_file_img"
                          src="@a/imgs/add-file.png"
                          alt=""
                          srcset="@a/imgs/add-file@2x.png 2x"
                        />
                      </div>
                      <div class="pic_list">
                        <div class="img_item">
                          <img
                            class="del_file_img"
                            src="@a/imgs/del-file.png"
                            alt=""
                            srcset="@a/imgs/del-file@2x.png 2x"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="footer_view">
                <div class="left_view">
                  <input type="checkbox" class="chk_agree" />已阅读并同意《漫云搜医平台隐私及使用政策》
                </div>
                <div class="right_view">提交</div>
              </div>
            </template>
            <template v-if="inner_tabIndex === 1">
              <div class="title_content_view">
                <div class="left_view">
                  <div class="header_logo">头像</div>
                  <span class="label_user">用户名</span>
                  <span class="label_jifen">积分:999</span>
                  <!-- <div class="career_bg_view">
                    <div class="c_name">Lv.1</div>
                    <div class="c_duty">设计师</div>
                  </div> -->
                  <img
                    class="career_bg_view"
                    src="@a/imgs/design_img.png"
                    alt=""
                    srcset="@a/imgs/design_img@2x.png 2x"
                  />
                </div>
                <div class="right_view">
                  <div class="row">
                    <span class="label">姓名</span>
                    <input type="text" style="padding-left:26px" class="select_view" placeholder="请填写本人真实姓名" />
                  </div>
                  <div class="row">
                    <span class="label">身份证</span>
                    <input type="text" style="padding-left:26px" class="select_view" placeholder="请输入身份证号码" />
                  </div>
                  <div class="row">
                    <span class="label">支付宝</span>
                    <input type="text" style="padding-left:26px" class="select_view" placeholder="请输入支付宝账号" />
                  </div>
                  <div class="row">
                    <span class="label">身份证照片</span>
                    <div class="pic_view">
                      <div class="upload_view">
                        <img
                          class="add_file_img"
                          src="@a/imgs/add-file.png"
                          alt=""
                          srcset="@a/imgs/add-file@2x.png 2x"
                        />
                      </div>
                      <div class="pic_list">
                        <div class="img_item">
                          <img
                            class="del_file_img"
                            src="@a/imgs/del-file.png"
                            alt=""
                            srcset="@a/imgs/del-file@2x.png 2x"
                          />
                        </div>
                        <div class="img_item">
                          <img
                            class="del_file_img"
                            src="@a/imgs/del-file.png"
                            alt=""
                            srcset="@a/imgs/del-file@2x.png 2x"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="footer_view">
                <div class="left_view">
                  <input type="checkbox" class="chk_agree" />已阅读并同意《漫云搜医平台隐私及使用政策》
                </div>
                <div class="right_view">提交</div>
              </div>
            </template>
          </div>
          <div v-else-if="outer_tabIndex === 1" class="my_sample_tab_view">
            <div class="title_view">
              <span
                :class="['title', { active: inner_sample_tabIndex === 0 }]"
                @click="() => (inner_sample_tabIndex = 0)"
                >已上架(1)</span
              >
              <span
                :class="['title', { active: inner_sample_tabIndex === 1 }]"
                @click="() => (inner_sample_tabIndex = 1)"
                >审核中(1)</span
              >
              <span
                :class="['title', { active: inner_sample_tabIndex === 2 }]"
                @click="() => (inner_sample_tabIndex = 2)"
                >未通过(1)</span
              >
              <div class="uploadBtn">上传作品</div>
            </div>
            <template v-if="inner_sample_tabIndex === 0">
              <div class="title_content_view">
                <div class="table_header">
                  <div class="title">时间</div>
                  <div class="title">预览图</div>
                  <div class="title">作品信息</div>
                  <div class="title">操作</div>
                </div>
                <div class="table_row">
                  <span class="column">
                    2020-12-10
                  </span>
                  <span class="column">
                    <img class="small_img" src="@a/imgs/small_pic@2x.png" alt="" srcset="@a/imgs/small_pic@2x.png 2x" />
                  </span>
                  <span
                    class="column"
                    style="display:flex;flex-direction:column;align-items:center;justify-content:center"
                  >
                    <span class="label">《作品名字》</span>
                    <span class="label"
                      ><span class="downloadColor">88</span><span class="focus">下载</span>
                      <span class="collectColor">66</span><span class="focus">收藏</span></span
                    >
                  </span>
                  <span class="column">
                    <div class="delBtn">
                      删除
                    </div>
                  </span>
                </div>
              </div>
            </template>
            <template v-if="inner_sample_tabIndex === 1">
              <div class="title_content_view">
                <div class="table_header">
                  <div class="title">时间</div>
                  <div class="title">预览图</div>
                  <div class="title">作品信息</div>
                  <div class="title">操作</div>
                </div>
                <div class="table_row">
                  <span class="column">
                    2020-12-11
                  </span>
                  <span class="column">
                    <img class="small_img" src="@a/imgs/small_pic@2x.png" alt="" srcset="@a/imgs/small_pic@2x.png 2x" />
                  </span>
                  <span
                    class="column"
                    style="display:flex;flex-direction:column;align-items:center;justify-content:center"
                  >
                    <span class="label">《作品名字》</span>
                    <span class="label"
                      ><span class="downloadColor">88</span><span class="focus">下载</span>
                      <span class="collectColor">66</span><span class="focus">收藏</span></span
                    >
                  </span>
                  <span class="column">
                    <div class="delBtn">
                      删除
                    </div>
                  </span>
                </div>
                <div class="label_row">
                  审核会在10个工作日内完成
                </div>
              </div>
            </template>
            <template v-if="inner_sample_tabIndex === 2">
              <div class="title_content_view">
                <div class="table_header">
                  <div class="title">时间</div>
                  <div class="title">预览图</div>
                  <div class="title">作品信息</div>
                  <div class="title">操作</div>
                </div>
                <div class="table_row">
                  <span class="column">
                    2020-12-12
                  </span>
                  <span class="column">
                    <img class="small_img" src="@a/imgs/small_pic@2x.png" alt="" srcset="@a/imgs/small_pic@2x.png 2x" />
                  </span>
                  <span
                    class="column"
                    style="display:flex;flex-direction:column;align-items:center;justify-content:center"
                  >
                    <span class="label">《作品名字》</span>
                    <span class="label"
                      ><span class="downloadColor">88</span><span class="focus">下载</span>
                      <span class="collectColor">66</span><span class="focus">收藏</span></span
                    >
                  </span>
                  <span class="column">
                    <div class="delBtn">
                      删除
                    </div>
                  </span>
                </div>
                <div class="label_row">
                  请仔细阅读
                  <div class="btn">上传必读</div>
                </div>
              </div>
            </template>
          </div>
          <div v-else-if="outer_tabIndex === 2" class="my_voucher_tab_view">
            <div class="title_view">
              <span
                :class="['title', { active: inner_voucher_tabIndex === 0 }]"
                @click="() => (inner_voucher_tabIndex = 0)"
                >已下载(1)</span
              >
              <span
                :class="['title', { active: inner_voucher_tabIndex === 1 }]"
                @click="() => (inner_voucher_tabIndex = 1)"
                >已收藏(1)</span
              >
              <span
                :class="['title', { active: inner_voucher_tabIndex === 2 }]"
                @click="() => (inner_voucher_tabIndex = 2)"
                >会员信息</span
              >
              <span
                :class="['title', { active: inner_voucher_tabIndex === 3 }]"
                @click="() => (inner_voucher_tabIndex = 3)"
                >会员订单</span
              >
            </div>
            <template v-if="inner_voucher_tabIndex === 0">
              <div class="title_content_view">
                <div class="table_header">
                  <div class="title">购买时间</div>
                  <div class="title">预览图</div>
                  <div class="title">作品信息</div>
                  <div class="title">有效时间</div>
                </div>
                <div class="table_row">
                  <span class="column">
                    2021-01-23 22:00:59
                  </span>
                  <span class="column">
                    <img class="small_img" src="@a/imgs/small_pic@2x.png" alt="" srcset="@a/imgs/small_pic@2x.png 2x" />
                  </span>
                  <span
                    class="column"
                    style="display:flex;flex-direction:column;align-items:center;justify-content:center"
                  >
                    <span class="label">《作品名字》</span>
                    <span class="label"
                      ><span class="downloadColor">88</span><span class="focus">下载</span>
                      <span class="collectColor">66</span><span class="focus">收藏</span></span
                    >
                  </span>
                  <span class="column">
                    2021-01-23 22:00:59
                  </span>
                </div>
                <div class="table_row">
                  <span class="column">
                    2021-01-23 22:00:59
                  </span>
                  <span class="column">
                    <img class="small_img" src="@a/imgs/small_pic@2x.png" alt="" srcset="@a/imgs/small_pic@2x.png 2x" />
                  </span>
                  <span
                    class="column"
                    style="display:flex;flex-direction:column;align-items:center;justify-content:center"
                  >
                    <span class="label">《作品名字》</span>
                    <span class="label"
                      ><span class="downloadColor">88</span><span class="focus">下载</span>
                      <span class="collectColor">66</span><span class="focus">收藏</span></span
                    >
                  </span>
                  <span class="column">
                    已过期
                  </span>
                </div>
              </div>
            </template>
            <template v-if="inner_voucher_tabIndex === 1">
              <div class="title_content_view">
                <div class="table_header">
                  <div class="title">全部 86</div>
                  <div class="title">无标签 10</div>
                  <div class="title">标签一 66</div>
                  <div class="title">标签二 10</div>
                </div>
                <div class="result-view">
                  <div class="box">
                    <img class="lis_img" src="@a/imgs/hot_img.png" alt="" srcset="@a/imgs/hot_img@2x.png 2x" />
                    <div class="content">元旦牛气冲天海报</div>
                  </div>
                  <div class="box">
                    <img class="lis_img" src="@a/imgs/hot_img.png" alt="" srcset="@a/imgs/hot_img@2x.png 2x" />
                    <div class="content">元旦牛气冲天海报</div>
                  </div>
                  <div class="box">
                    <img class="lis_img" src="@a/imgs/hot_img.png" alt="" srcset="@a/imgs/hot_img@2x.png 2x" />
                    <div class="content">元旦牛气冲天海报</div>
                  </div>
                  <div class="box">
                    <img class="lis_img" src="@a/imgs/hot_img.png" alt="" srcset="@a/imgs/hot_img@2x.png 2x" />
                    <div class="content">元旦牛气冲天海报</div>
                  </div>
                </div>
                <div class="result-view">
                  <div class="box">
                    <img class="lis_img" src="@a/imgs/hot_img.png" alt="" srcset="@a/imgs/hot_img@2x.png 2x" />
                    <div class="content">元旦牛气冲天海报</div>
                  </div>
                  <div class="box">
                    <img class="lis_img" src="@a/imgs/hot_img.png" alt="" srcset="@a/imgs/hot_img@2x.png 2x" />
                    <div class="content">元旦牛气冲天海报</div>
                  </div>
                  <div class="box">
                    <img class="lis_img" src="@a/imgs/hot_img.png" alt="" srcset="@a/imgs/hot_img@2x.png 2x" />
                    <div class="content">元旦牛气冲天海报</div>
                  </div>
                  <div class="box">
                    <img class="lis_img" src="@a/imgs/hot_img.png" alt="" srcset="@a/imgs/hot_img@2x.png 2x" />
                    <div class="content">元旦牛气冲天海报</div>
                  </div>
                </div>
              </div>
            </template>
            <template v-if="inner_voucher_tabIndex === 2">
              <div class="title_content_view">
                <div class="table_head_row">
                  <div class="item_left">
                    <span class="mine_label">我的身份:</span>
                    <img
                      class="shenfen_img"
                      src="@a/imgs/account_img.png"
                      alt=""
                      srcset="@a/imgs/account_img@2x.png 2x"
                    />
                    <span class="vip_level">普通VIP</span>
                  </div>
                  <div class="item_right">
                    <span class="xieyi_label">VIP会员服务协议</span>
                    <div class="btn_fapiao">我的发票</div>
                  </div>
                </div>
                <div class="vip_nav">
                  <img class="vip_icon" src="@a/imgs/account_img.png" alt="" srcset="@a/imgs/account_img@2x.png 2x" />

                  <span class="title">我的VIP</span>
                  <span class="effect_label">有效期至：2021-03-01</span>
                </div>
                <div class="month_nav">
                  <div class="month_desc">
                    缴费一个月
                  </div>
                  <div class="month_desc">
                    缴费两个月
                  </div>
                  <div class="month_desc">
                    缴费三个月
                  </div>
                </div>
                <div class="select_pay_kind">
                  <div :class="['nav', { active: payIndex === 0 }]" @click="selectPay(0)">
                    <img
                      class="zhekou_div"
                      src="@a/imgs/sale_10_img.png"
                      alt=""
                      srcset="@a/imgs/sale_10_img@2x.png 2x"
                    />
                    <div class="amount_div">
                      <span class="amount">9</span>
                      <span class="unit">元</span>
                    </div>
                    <div class="uncheckd_pay">
                      <div class="active_checked" v-if="payIndex === 0"></div>
                    </div>
                  </div>
                  <div :class="['nav', { active: payIndex === 1 }]" @click="selectPay(1)">
                    <img
                      class="zhekou_div"
                      src="@a/imgs/sale_20_img.png"
                      alt=""
                      srcset="@a/imgs/sale_20_img@2x.png 2x"
                    />
                    <div class="amount_div">
                      <span class="amount">16</span>
                      <span class="unit">元</span>
                    </div>
                    <div class="uncheckd_pay">
                      <div class="active_checked" v-if="payIndex === 1"></div>
                    </div>
                  </div>
                  <div :class="['nav', { active: payIndex === 2 }]" @click="selectPay(2)">
                    <img
                      class="zhekou_div"
                      src="@a/imgs/sale_30_img.png"
                      alt=""
                      srcset="@a/imgs/sale_30_img@2x.png 2x"
                    />
                    <div class="amount_div">
                      <span class="amount">21</span>
                      <span class="unit">元</span>
                    </div>
                    <div class="uncheckd_pay">
                      <div class="active_checked" v-if="payIndex === 2"></div>
                    </div>
                  </div>
                </div>
                <div class="pay_title_view">
                  <div class="top_label">支付方式</div>
                  <div class="bottom_label">请选择支付方式</div>
                </div>
                <div class="nav_hr"></div>
                <img
                  v-if="!wx_checked"
                  @click="clickWx(true)"
                  class="pay_wx"
                  src="@a/imgs/wx_unchecked.png"
                  alt=""
                  srcset="@a/imgs/wx_unchecked@2x.png 2x"
                />
                <img
                  v-if="wx_checked"
                  @click="clickWx(false)"
                  class="pay_wx"
                  src="@a/imgs/wx_checked.png"
                  alt=""
                  srcset="@a/imgs/wx_checked@2x.png 2x"
                />
                <div class="agree_view">
                  <img
                    class="agree"
                    @click="clickAgree(true)"
                    v-if="!agree_checked"
                    src="@a/imgs/pay_unchecked_img.png"
                    alt=""
                    srcset="@a/imgs/pay_unchecked_img@2x.png 2x"
                  />
                  <img
                    class="agree"
                    @click="clickAgree(false)"
                    v-if="agree_checked"
                    src="@a/imgs/pay_checked_img.png"
                    alt=""
                    srcset="@a/imgs/pay_checked_img@2x.png 2x"
                  />
                  <span class="base_label">同意</span>
                  <span class="base_label under_line">用户协议</span>
                  <span class="base_label">与</span>
                  <span class="base_label under_line">隐私政策</span>
                </div>
                <div class="error_msg_line">
                  请阅读后点击同意以完成支付
                </div>
                <div class="btnSubmit">确定支付</div>
              </div>
            </template>
            <template v-if="inner_voucher_tabIndex === 3">
              <div class="title_content_view">
                <div class="table_header">
                  <div class="title">购买时间</div>
                  <div class="title">支出</div>
                  <div class="title">金额</div>
                  <div class="title">有效时间</div>
                </div>
                <div class="table_row">
                  <span class="column">
                    2021-01-23 22:00:59
                  </span>
                  <span class="column">
                    <img class="vip_img" src="@a/imgs/account_img.png" alt="" srcset="@a/imgs/account_img@2x.png 2x" />
                    <span class="vip_label">VIP开通</span>
                  </span>
                  <span class="column">
                    16元
                  </span>
                  <span class="column">
                    021-03-21 22:00:59
                  </span>
                </div>
              </div>
            </template>
          </div>
          <div v-else-if="outer_tabIndex === 3" class="my_support_tab_view">
            <div class="help_view"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { uploadFileService } from '@s/upload-file-service'
import { getDcotorsService, getAreaInfoService, getHospitalsService } from '@s/mine-info-service'
export default {
  name: 'MyInfoView',
  data() {
    return {
      outer_tabIndex: 0,
      inner_tabIndex: 0,
      inner_sample_tabIndex: 0,
      inner_voucher_tabIndex: 0,
      personIdentity: '2',
      dropdownStatus: false,
      payIndex: 1,
      wx_checked: false,
      agree_checked: false,
      certArr: [],
      doctorsArr: [],
      provincesArrr: [],
      citiesArr: [],
      divisionArr: [],
      hospitalsArr: [],
      keshiArr: [],

      certificateNo: '',
      certificateUrl: ''
    }
  },
  mounted() {
    this.outer_tabIndex = parseInt(this.$route.query.index)
    if (this.outer_tabIndex === 0) {
      this.inner_tabIndex = 0
    }
    if (this.outer_tabIndex === 1) {
      this.inner_sample_tabIndex = 0
    }
    if (this.outer_tabIndex === 2) {
      this.inner_voucher_tabIndex = 0
    }
    if (this.outer_tabIndex === 2 && parseInt(this.$route.query.inner_index) === 2) {
      this.inner_voucher_tabIndex = 2
    }
    document.addEventListener('click', e => {
      if (this.$refs.popMenuRef) {
        if (!this.$refs.popMenuRef.contains(e.target)) {
          this.dropdownStatus = false
        }
      }
    })
    this.loadDoctors()
    this.loadProvinces()
    this.loadHospitals(-1)
  },
  unmounted() {
    document.removeEventListener('click')
  },
  computed: {
    ...mapState(['token', 'userName', 'loading'])
  },
  methods: {
    toSearch() {
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
    toHome() {
      this.$router.push('/home')
    },
    selectPay(index) {
      this.payIndex = index
    },
    clickDropdown() {
      this.dropdownStatus = !this.dropdownStatus
    },
    changeIdentity(e) {
      this.personIdentity = e.target.value
    },
    clickWx(status) {
      this.wx_checked = status
    },
    clickAgree(status) {
      this.agree_checked = status
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

    async uploadCertFile() {
      let inputDOM = this.$refs.CertUploadFileRef
      if (this.certArr.length > 1) {
        alert('图片最多传1张!')
        return
      }
      let file = inputDOM.files[0]
      let param = new FormData()
      param.append('file', file)
      const {
        data: { fileName, relativePath },
        errorInfo
      } = await uploadFileService(param)
      this.certificateUrl = relativePath
    },
    toTouchUploadFile() {
      this.$refs.CertUploadFileRef.click()
    },
    async loadDoctors() {
      const { result, rows, errorInfo } = await getDcotorsService()
      if (result) {
        this.doctorsArr = rows
      }
    },
    async loadHospitals(pid) {
      const { result, rows, errorInfo } = await getHospitalsService(pid)
      if (result) {
        this.hospitalsArr = rows
        if (this.hospitalsArr.length > 0) {
          const { result: keshiResult, rows: keshiRows, errorInfo: keshiErrorInfo } = await getHospitalsService(
            this.hospitalsArr[0].id
          )
          if (keshiResult) {
            this.keshiArr = keshiRows
          }
        }
      }
    },
    async loadProvinces() {
      const { result: proviceResult, rows: proviceRows, errorInfo: provinceErrorInfo } = await getAreaInfoService('0')
      if (proviceResult) {
        this.provincesArrr = proviceRows
        const { result: cityResult, rows: cityRows, errorInfo: cityErrorInfo } = await getAreaInfoService(
          proviceRows[0].code
        )
        if (cityResult) {
          this.citiesArr = cityRows
          const { result: divisionResult, rows: divisionRows, errorInfo: divisionErrorInfo } = await getAreaInfoService(
            cityRows[0].code
          )
          if (divisionResult) {
            this.divisionArr = divisionRows
          }
        }
      }
    },
    async provinceChange(e) {
      const { result, rows, errorInfo } = await getAreaInfoService(e.target.value)
      if (result) {
        this.citiesArr = rows
        const { result: divisionResult, rows: divisionRows, errorInfo: divisionErrorInfo } = await getAreaInfoService(
          rows[0].code
        )
        if (divisionResult) {
          this.divisionArr = divisionRows
        }
      }
    },
    async cityChange(e) {
      const { result, rows, errorInfo } = await getAreaInfoService(e.target.value)
      if (result) {
        this.divisionArr = rows
      }
    },
    async hospitalChange(e) {
      const { result, rows, errorInfo } = await getHospitalsService(e.target.value)
      if (result) {
        this.keshiArr = rows
      }
    }
  }
}
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
  .loading {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: rgba(17, 17, 17, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
            height: 54px;
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
        box-sizing: border-box;
        padding: 26px 11px 26px 12px;
        margin-bottom: 51px;
        .my_info_tab_view {
          width: 100%;
          height: 742px;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          .title_view {
            height: 50px;
            border-bottom: 2px solid #f5f5f5;
            display: flex;
            flex-direction: row;
            .title {
              width: 80px;
              text-align: center;
              line-height: 40px;
              color: #5f6061;
              font-size: 16px;
              margin-left: 68px;
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
          .title_content_view {
            height: 586px;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            .left_view {
              width: 198px;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              align-items: center;
              .header_logo {
                width: 67px;
                height: 67px;
                border-radius: 50%;
                border: 1px solid #707070;
                margin-top: 20px;
                line-height: 67px;
                text-align: center;
                font-size: 16px;
                color: #354052;
              }
              .label_user {
                font-size: 12px;
                color: #5f6061;
                margin-top: 9px;
              }
              .label_jifen {
                color: #d6d6d6;
                font-size: 12px;
                margin-top: 6px;
              }
              .career_bg_view {
                width: 67px;
                height: 45px;
                background-image: url('../../assets/imgs/career_bg.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                margin-top: 17px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                .c_name {
                  font-size: 10px;
                  color: #ffffff;
                  margin-top: 10px;
                }
                .c_duty {
                  font-size: 10px;
                  color: #ffffff;
                }
              }
            }
            .right_view {
              flex-grow: 1;
              display: flex;
              flex-direction: column;
              box-sizing: border-box;
              padding-top: 33px;
              .row {
                display: flex;
                flex-direction: row;
                box-sizing: border-box;
                justify-content: space-between;
                margin-bottom: 5px;

                .label {
                  color: #354052;
                  font-size: 16px;
                  line-height: 43px;
                }
                .select_view {
                  width: 334px;
                  height: 37px;
                  padding: 0;
                  outline: none;
                  border: 1px solid #707070;
                  border-radius: 6px;
                  margin-right: 200px;
                  box-sizing: border-box;
                  padding-left: 15px;
                }
                .pic_view {
                  width: 334px;
                  height: 174px;
                  border: 1px solid #707070;
                  overflow: auto;
                  border-radius: 6px;
                  margin-right: 200px;
                  box-sizing: border-box;
                  display: flex;
                  flex-direction: column;
                  .upload_view {
                    width: 47px;
                    height: 47px;
                    border: 1px solid #d6d6d6;
                    margin-left: 10px;
                    margin-top: 18px;
                    flex-shrink: 0;
                    position: relative;
                    cursor: pointer;
                    .add_file_img {
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                      position: absolute;
                    }
                    .uploadCertFile {
                      display: none;
                    }
                  }
                  .pic_list {
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    .img_item {
                      width: 87px;
                      height: 87px;
                      background: #ffffff;
                      border: 1px solid #d6d6d6;
                      margin-left: 10px;
                      margin-top: 5px;
                      position: relative;
                      .del_file_img {
                        top: -10px;
                        right: -8px;
                        position: absolute;
                      }
                    }
                  }
                }
              }
            }
          }
          .footer_view {
            display: flex;
            flex-direction: row;
            box-sizing: border-box;
            padding-top: 26px;
            padding-left: 82px;
            justify-content: space-between;
            flex-grow: 1;
            .left_view {
              flex-direction: row;
              flex: 1;
              color: #5f6061;
              font-size: 12px;
              .chk_agree {
                vertical-align: middle;
                margin-right: 3px;
              }
            }
            .right_view {
              width: 91px;
              height: 38px;
              background: #dd3d29;
              opacity: 0.86;
              border-radius: 5px;
              flex: none;
              color: #ffffff;
              font-size: 16px;
              line-height: 38px;
              text-align: center;
              margin-right: 37px;
            }
          }
        }
        .my_sample_tab_view {
          width: 100%;
          height: 742px;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          .title_view {
            height: 50px;
            border-bottom: 2px solid #f5f5f5;
            display: flex;
            flex-direction: row;
            .uploadBtn {
              width: 121px;
              height: 42px;
              background: #4372b7;
              border-radius: 9px;
              font-size: 15px;
              text-align: center;
              line-height: 42px;
              color: #ffffff;
              margin-left: 210px;
              margin-top: 3px;
            }
            .title {
              width: 80px;
              text-align: center;
              line-height: 40px;
              color: #5f6061;
              font-size: 16px;
              margin-left: 68px;
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
          .title_content_view {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            padding: 11px 64px;
            .table_header {
              width: 705px;
              background: #f5f5f5;
              height: 40px;
              display: flex;
              flex-direction: row;
              .title {
                flex: 0.25;
                font-size: 12px;
                font-weight: 400;
                line-height: 40px;
                text-align: center;
                color: #5f6061;
              }
            }
            .table_row {
              width: 705px;
              height: 67px;
              border-bottom: 2px solid #e7e7e7;
              display: flex;
              flex-direction: row;
              .column {
                width: 219px;
                height: 67px;
                font-size: 12px;
                font-weight: 400;
                line-height: 67px;
                color: #5f6061;
                text-align: center;
                align-items: center;
                justify-content: center;
                display: flex;
                .small_img {
                  vertical-align: middle;
                  width: 54px;
                  height: 51px;
                }
                .label {
                  font-size: 12px;
                  font-weight: 400;
                  color: #5f6061;
                  width: 120px;
                  height: 20px;
                  line-height: 20px;
                  .focus {
                    color: #d6d6d6;
                    margin-left: 3px;
                  }
                  .downloadColor {
                    color: #e20000;
                  }
                  .collectColor {
                    color: #5f6061;
                    margin-left: 15px;
                  }
                }
                .delBtn {
                  width: 46px;
                  height: 23px;
                  background: #dd422e;
                  opacity: 1;
                  border-radius: 18px;
                  font-size: 12px;
                  font-weight: 400;
                  line-height: 23px;
                  color: #ffffff;
                }
              }
            }
          }
          .label_row {
            display: flex;
            flex-direction: row;
            font-size: 16px;
            font-weight: 400;
            line-height: 27px;
            color: #2260ac;
            margin-top: 24px;
            line-height: 33px;
            .btn {
              width: 91px;
              height: 31px;
              border: 1px solid #4372b7;
              opacity: 1;
              border-radius: 45px;
              font-size: 16px;
              line-height: 31px;
              text-align: center;
              color: #4372b7;
              margin-left: 7px;
            }
          }
        }
        .my_voucher_tab_view {
          width: 100%;
          height: 742px;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          .title_view {
            height: 50px;
            border-bottom: 2px solid #f5f5f5;
            display: flex;
            flex-direction: row;

            .title {
              width: 80px;
              text-align: center;
              line-height: 40px;
              color: #5f6061;
              font-size: 16px;
              margin-left: 68px;
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
          .title_content_view {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            padding: 11px 64px;
            .table_head_row {
              box-sizing: border-box;
              width: 705px;
              background: #f5f5f5;
              height: 40px;
              display: flex;
              flex-direction: row;
              .item_left {
                flex: 1;
                box-sizing: border-box;
                text-align: center;
                line-height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                .mine_label {
                  font-size: 12px;
                  height: 40px;
                  line-height: 40px;
                  color: #5f6061;
                  display: inline-block;
                }
                .shenfen_img {
                  width: 29px;
                  height: 29px;
                  border-radius: 50%;
                  display: inline-block;
                  margin-left: 10px;
                }
                .vip_level {
                  font-size: 12px;
                  color: #e20000;
                  margin-left: 4px;
                }
              }
              .item_right {
                flex: 1;
                height: 40px;
                box-sizing: border-box;
                line-height: 40px;
                text-align: left;
                display: inline-block;
                .xieyi_label {
                  color: #2361ac;
                  font-size: 12px;
                  text-decoration: underline;
                  margin-left: 20px;
                  cursor: pointer;
                  display: inline-block;
                }
                .btn_fapiao {
                  width: 76px;
                  height: 23px;
                  background: #ffffff;
                  border: 1px solid #707070;
                  border-radius: 12px;
                  color: #707070;
                  text-align: center;
                  line-height: 23px;
                  font-size: 12px;
                  display: inline-block;
                  margin-left: 8px;
                }
              }
            }
            .vip_nav {
              width: 705px;
              height: 72px;
              display: flex;
              flex-direction: row;
              align-items: center;
              box-sizing: border-box;
              .vip_icon {
                width: 29px;
                height: 29px;
                border-radius: 50%;
              }
              .title {
                color: #354052;
                font-size: 26px;
                letter-spacing: 5px;
                margin-left: 7px;
              }
              .effect_label {
                color: #2361ac;
                font-size: 12px;
                margin-left: 22px;
                margin-top: 10px;
                letter-spacing: 3px;
              }
            }
            .month_nav {
              width: 558px;
              height: 40px;
              background: #f5f5f5;
              display: flex;
              flex-direction: row;
              align-items: center;
              box-sizing: border-box;
              display: flex;
              text-align: center;
              align-items: center;
              .month_desc {
                flex: 1;
                font-size: 16px;
                font-weight: 400;
                line-height: 27px;
                color: #5f6061;
                padding-left: 14px;
                box-sizing: border-box;
              }
            }
            .select_pay_kind {
              width: 558px;
              height: 181px;
              margin-top: 8px;
              display: flex;
              box-sizing: border-box;
              flex-direction: row;
              .nav {
                flex: 1;
                box-sizing: border-box;
                align-items: center;
                display: flex;
                flex-direction: column;
                cursor: pointer;
                &.active {
                  background: #ebebeb;
                }
                .zhekou_div {
                  width: 59px;
                  height: 22px;
                  margin-top: 28px;
                }
                .amount_div {
                  box-sizing: border-box;
                  justify-content: center;
                  display: flex;
                  flex-direction: row;
                  width: 100%;
                  margin-top: 28px;
                  .amount {
                    color: #e20000;
                    font-size: 26px;
                  }
                  .unit {
                    font-size: 17px;
                    color: #354052;
                    font-weight: bold;
                    margin-left: 10px;
                    line-height: 39px;
                  }
                }
                .uncheckd_pay {
                  width: 18px;
                  height: 18px;
                  border: 1px solid #004b91;
                  border-radius: 50%;
                  margin-top: 10px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  .active_checked {
                    width: 14px;
                    height: 14px;
                    background: #004b91;
                    border-radius: 50%;
                  }
                }
              }
            }
            .pay_title_view {
              width: 416px;
              height: 51px;
              display: flex;
              flex-direction: column;
              box-sizing: border-box;
              margin-top: 20px;
              padding-left: 35px;
              .top_label {
                font-size: 26px;
                color: #354052;
              }
              .bottom_label {
                font-size: 12px;
                color: #dd3d29;
              }
            }
            .nav_hr {
              width: 416px;
              height: 16px;
              background: #f5f5f5;
              margin-top: 9px;
            }
            .pay_wx {
              width: 163px;
              height: 59px;
              margin-top: 19px;
              margin-left: 41px;
              cursor: pointer;
            }
            .error_msg_line {
              font-size: 12px;
              color: #dd3d29;
              box-sizing: border-box;
              padding-left: 24px;
            }
            .btnSubmit {
              width: 258px;
              height: 68px;
              background: #2361ac;
              border-radius: 18px;
              text-align: center;
              line-height: 68px;
              font-size: 35px;
              font-weight: 400;
              color: #ffffff;
              margin-top: 22px;
            }
            .agree_view {
              display: flex;
              flex-direction: row;
              box-sizing: border-box;
              margin-top: 16px;
              .agree {
                width: 18px;
                height: 18px;
                border-radius: 50%;
                border: 1px solid #004b91;
                margin-right: 3px;
                cursor: pointer;
              }
              .base_label {
                font-size: 16px;
                color: #1e1e1e;
                &.under_line {
                  text-decoration: underline;
                  color: #2361ac;
                }
              }
            }
            .table_header {
              width: 705px;
              background: #f5f5f5;
              height: 40px;
              display: flex;
              flex-direction: row;
              .title {
                flex: 0.25;
                font-size: 12px;
                font-weight: 400;
                line-height: 40px;
                text-align: center;
                color: #5f6061;
              }
            }
            .result-view {
              width: 705px;
              margin-top: 20px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              box-sizing: border-box;

              .box {
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                .lis_img {
                  width: 156px;
                  height: 156px;
                  margin: 0 3px;
                }
                .content {
                  box-sizing: border-box;
                  width: 156px;
                  height: 50px;
                  background: #f5f5f5;
                  color: #5f6061;
                  font-size: 12px;
                  padding-left: 5px;
                  padding-top: 12px;
                }
              }
            }
            .table_row {
              width: 705px;
              height: 67px;
              border-bottom: 2px solid #e7e7e7;
              display: flex;
              flex-direction: row;
              .vip_label {
                font-size: 12px;
                color: #e20000;
                margin-left: 9px;
              }
              .vip_img {
                width: 29px;
                height: 29px;
                border-radius: 50%;
              }
              .column {
                width: 219px;
                height: 67px;
                font-size: 12px;
                font-weight: 400;
                line-height: 67px;
                color: #5f6061;
                text-align: center;
                align-items: center;
                justify-content: center;
                display: flex;
                .small_img {
                  vertical-align: middle;
                  width: 54px;
                  height: 51px;
                }
                .label {
                  font-size: 12px;
                  font-weight: 400;
                  color: #5f6061;
                  width: 120px;
                  height: 20px;
                  line-height: 20px;
                  .focus {
                    color: #d6d6d6;
                    margin-left: 3px;
                  }
                  .downloadColor {
                    color: #e20000;
                  }
                  .collectColor {
                    color: #5f6061;
                    margin-left: 15px;
                  }
                }
                .delBtn {
                  width: 46px;
                  height: 23px;
                  background: #dd422e;
                  opacity: 1;
                  border-radius: 18px;
                  font-size: 12px;
                  font-weight: 400;
                  line-height: 23px;
                  color: #ffffff;
                }
              }
            }
          }
        }
        .my_payment_tab_view {
          width: 100%;
          height: 742px;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          .title_view {
            height: 50px;
            border-bottom: 2px solid #f5f5f5;
            display: flex;
            flex-direction: row;
            .title {
              width: 80px;
              text-align: center;
              line-height: 40px;
              color: #5f6061;
              font-size: 16px;
              margin-left: 68px;
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
        }
        .my_support_tab_view {
          width: 100%;
          height: 742px;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          .help_view {
            margin-top: 58px;
            height: 100%;
            background-image: url('../../assets/imgs/help_desc@2x.png');
            background-repeat: no-repeat;
            background-size: contain;
          }
        }
      }
    }
  }
}
</style>
