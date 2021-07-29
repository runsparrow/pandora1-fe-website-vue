<template>
  <div class="container">
    <div class="loading" v-show="false">
      <img class="loading_img" src="@a/imgs/loading.gif" alt="" />
    </div>
    <div class="loading" v-show="payforImg_show">
      <div class="qrcode_div" ref="qrcode_div">
        <img :src="payImg" style="width: 100%" />
      </div>
    </div>
    <div class="loading" v-if="video_show">
      <div class="video_div" ref="video_div">
        <img class="close_img" :src="require('@a/imgs/close.png')" alt="" @click="closeVidowModal" />
        <video :src="videoUrl" width="450" height="450" ref="videoRef" controls="true"></video>
      </div>
    </div>

    <div class="loading" v-if="person_info_show">
      <div class="person_info_div" ref="person_info_div">
        <img class="close_img" :src="require('@a/imgs/close.png')" alt="" @click="closePersonInfoModal" />
        <div class="content" style="display: flex; flex-direction: column">
          <div class="row">
            <span class="label">邮箱</span>
            <input type="text" class="select_view" v-model.trim="mine_person_info.email" />
          </div>
          <div class="row" style="justify-content: flex-start">
            <span class="label">头像</span>
            <div class="header_logo" v-if="mine_person_info.avatarUrl === ''" @click="toTouchHeaderLogoUploadFile">
              头像
            </div>
            <div
              class="header_logo"
              v-else
              @click="toTouchHeaderLogoUploadFile"
              :style="{
                backgroundSize: 'contain',
                backgroundImage: 'url(' + mine_person_info.avatarUrl + ')',
                backgroundRepeat: 'no-repeat'
              }"
            >
              <!-- <img class="header_logo_size" :src="myInfoIndentityModel.entity.applier.avatarUrl" alt="" /> -->
            </div>

            <input
              class="uploadCertFile"
              type="file"
              @change="uploadHeaderLogFile"
              ref="HeaderLogoUploadFileRef"
              accept="image/png,image/jpeg,image/gif,image/jpg"
            />
          </div>
        </div>
        <div class="right_view" style="cursor: pointer" @click="updateMemberInfo">保存</div>
      </div>
    </div>

    <div class="loading" v-if="person_pwd_info_show">
      <div class="person_pwd_info_div" ref="person_pwd_info_div">
        <img class="close_img" :src="require('@a/imgs/close.png')" alt="" @click="closePersonInfoModal" />
        <div class="content" style="display: flex; flex-direction: column">
          <div class="row">
            <span class="label">旧密码</span>
            <input type="password" class="select_view" v-model.trim="mine_person_pwd.oldPassword" />
          </div>
          <div class="row">
            <span class="label">新密码</span>
            <input type="password" class="select_view" v-model.trim="mine_person_pwd.newPassword" />
          </div>
          <div class="row">
            <span class="label">确认密码</span>
            <input type="password" class="select_view" v-model.trim="mine_person_pwd.reNewPassword" />
          </div>
        </div>
        <div class="right_view" style="cursor: pointer" @click="updateMemberPwd">保存</div>
      </div>
    </div>

    <div class="loading" v-if="pic_show">
      <div class="video_div" style="width: 1010px; height: 650px" ref="video_div">
        <img class="close_img" :src="require('@a/imgs/close.png')" alt="" @click="closePicwModal" />
        <div class="content">
          <img class="big_img" :src="detalPic.url" alt="" />
          <div class="nav">
            <span class="title">{{ detalPic.name }}</span>
            <span class="id_label">ID:yyyymmdd000000</span>
            <span class="sucai_desc">素材版权说明</span>
            <div class="line"></div>
            <span class="spec">格式 | {{ detalPic.suffix }}</span>
            <span class="spec">分辨率 | </span>
            <span class="spec">尺寸 | </span>
            <span class="spec">颜色 | </span>
            <span class="spec">大小 | </span>
            <div class="line"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-show="modal_loading">
      <div class="modal_box">
        <img class="close_img" :src="require('@a/imgs/close.png')" alt="" @click="closeModal" />
        <div class="row">
          <span class="label">作品名</span>
          <input class="content" type="text" v-model.trim="zuopin_upload_obj.name" />
        </div>
        <div class="row">
          <span class="label">标签</span>
          <vue-tags-input
            v-model="tag"
            :tags="tags"
            @tags-changed="newTags => (tags = newTags)"
            placeholder="按回车键Enter创建标签"
          />
        </div>
        <div class="row">
          <span class="label">分类</span>
          <treeselect
            v-model="zuopin_upload_obj.classifyId"
            :disable-branch-nodes="true"
            :show-count="true"
            :options="treeOptions"
          />
        </div>
        <div class="row">
          <span class="label">所属导航</span>
          <select class="select_view" v-model="zuopin_upload_obj.navigationId">
            <option value="-1">-----请选择-----</option>
            <option v-for="item in navigationArr" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>
        <div class="row">
          <span class="label">收费状态</span>
          <select class="select_view" v-model="zuopin_upload_obj.level">
            <option value="-1">-----请选择-----</option>
            <option value="0">免费</option>
            <option value="1">收费</option>
          </select>
        </div>
        <div class="row">
          <span class="label">图片/视频上传</span>
          <div
            class="img_item"
            @click="toTouchUploadZuoPinPic"
            :style="{
              backgroundSize: 'contain',
              backgroundImage: 'url(' + zuopin_upload_obj.previewurl + ')',
              backgroundRepeat: 'no-repeat'
            }"
          >
            <img class="add_file_img" src="@a/imgs/add-file.png" alt="" srcset="@a/imgs/add-file@2x.png 2x" />
            <input class="uploadPicFile" type="file" @change="uploadZuoPinPicFile" ref="uploadZuoPinFileRef" />
            <!-- <img
                            class="del_file_img"
                            src="@a/imgs/del-file.png"
                            alt=""
                            srcset="@a/imgs/del-file@2x.png 2x"
                          /> -->
          </div>
        </div>
        <div class="row" style="justify-content: flex-end">
          <div class="confirm_btn" @click="submitModal">提交</div>
          <div class="cancel_btn" @click="closeModal">取消</div>
        </div>
      </div>
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
            <div class="login_header_logo" v-if="avatarUrl === ''">头像</div>
            <div
              class="login_header_logo"
              v-else
              :style="{
                backgroundSize: 'contain',
                backgroundImage: 'url(' + avatarUrl + ')',
                backgroundRepeat: 'no-repeat'
              }"
            ></div>
            <div ref="popMenuRef" style="width: 100px; text-overflow: ellipsis; overflow: hidden">
              <span class="username" @click="clickDropdown">{{ userName }}</span>
              <div :class="['popMenu', { activePop: dropdownStatus }]" style="height: 140px">
                <div class="item1" style="padding-bottom: 10px" @click="goto(10)">修改个人信息</div>
                <div class="item2" style="padding-bottom: 10px" @click="goto(9)">修改密码</div>
                <div class="item3" style="padding-bottom: 10px" @click="goto(4)">退出</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="left_view">
        <div class="top_view">
          <div class="top_header_view" v-if="avatarUrl === ''">头像</div>
          <div class="top_header_view" v-else>
            <img class="top_header_view_avatarUrl" :src="avatarUrl" alt="" />
          </div>
          <div class="right_c">
            <span class="label">用户名</span>
            <span class="label_id">ID：{{ userName }}</span>
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
          <div :class="['item', { active: outer_tabIndex === 0 }]" @click="() => (outer_tabIndex = 0)">我的信息</div>
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
                  <div class="header_logo" v-if="avatarUrl === ''">头像</div>
                  <div
                    class="header_logo"
                    v-else
                    :style="{
                      backgroundSize: 'contain',
                      backgroundImage: 'url(' + avatarUrl + ')',
                      backgroundRepeat: 'no-repeat'
                    }"
                  >
                    <!-- <img class="header_logo_size" :src="myInfoIndentityModel.entity.applier.avatarUrl" alt="" /> -->
                  </div>

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
                    <select
                      class="select_view"
                      @change="e => changeIdentity(e)"
                      v-model="myInfoIndentityModel.entity.identityId"
                    >
                      <option value="-1">-----请选择-----</option>
                      <option v-for="item in doctorsArr" :key="item.id" :value="item.id">{{ item.name }}</option>
                    </select>
                  </div>
                  <div class="row">
                    <span class="label">省</span>
                    <select
                      class="select_view"
                      @change="e => provinceChange(e)"
                      v-model="myInfoIndentityModel.entity.provinceCode"
                    >
                      <option value="">-----请选择-----</option>
                      <option v-for="item in provincesArrr" :key="item.code" :value="item.code">{{ item.name }}</option>
                    </select>
                  </div>
                  <div class="row">
                    <span class="label">市</span>
                    <select
                      class="select_view"
                      @change="e => cityChange(e)"
                      v-model="myInfoIndentityModel.entity.cityCode"
                    >
                      <option value="">-----请选择-----</option>
                      <option v-for="item in citiesArr" :key="item.code" :value="item.code">{{ item.name }}</option>
                    </select>
                  </div>
                  <div class="row">
                    <span class="label">区</span>
                    <select
                      class="select_view"
                      @change="e => divisionChange(e)"
                      v-model="myInfoIndentityModel.entity.divisionCode"
                    >
                      <option value="">-----请选择-----</option>
                      <option v-for="item in divisionArr" :key="item.code" :value="item.code">{{ item.name }}</option>
                    </select>
                  </div>
                  <div class="row" v-if="personIdentity === '5'">
                    <span class="label">公司名称</span>
                    <input type="text" class="select_view" v-model.trim="myInfoIndentityModel.entity.unitName" />
                  </div>
                  <div class="row" v-if="personIdentity === '5'">
                    <span class="label">所属部门</span>
                    <input type="text" class="select_view" v-model.trim="myInfoIndentityModel.entity.officeName" />
                  </div>
                  <div class="row" v-if="personIdentity === '5'">
                    <span class="label">职位职务</span>
                    <input type="text" class="select_view" v-model.trim="myInfoIndentityModel.entity.dutyName" />
                  </div>
                  <div class="row" v-if="personIdentity === '5'">
                    <span class="label">公司邮箱</span>
                    <input type="text" class="select_view" v-model.trim="myInfoIndentityModel.entity.email" />
                  </div>
                  <div class="row" v-if="personIdentity === '2' || personIdentity === '3' || personIdentity === '4'">
                    <span class="label">医院/单位</span>
                    <select
                      class="select_view"
                      @change="e => hospitalChange(e)"
                      v-model="myInfoIndentityModel.entity.unitId"
                    >
                      <option value="-1">-----请选择-----</option>
                      <option v-for="item in hospitalsArr" :key="item.id" :value="item.id">{{ item.name }}</option>
                    </select>
                  </div>
                  <div class="row" v-if="personIdentity === '2' || personIdentity === '3' || personIdentity === '4'">
                    <span class="label">科室/部门</span>
                    <select class="select_view" v-model="myInfoIndentityModel.entity.officeId">
                      <option value="-1">-----请选择-----</option>
                      <option v-for="item in keshiArr" :key="item.id" :value="item.id">{{ item.name }}</option>
                    </select>
                  </div>
                  <div class="row" v-if="personIdentity === '2' || personIdentity === '3'">
                    <span class="label">证件编码</span>
                    <input type="text" class="select_view" v-model.trim="myInfoIndentityModel.entity.certificateNo" />
                  </div>
                  <div class="row" v-if="personIdentity === '2' || personIdentity === '3'">
                    <span class="label">证书上传</span>
                    <div class="pic_view">
                      <div class="pic_list">
                        <div
                          class="img_item"
                          @click="toTouchUploadFile"
                          :style="{
                            backgroundSize: 'contain',
                            backgroundImage: 'url(' + myInfoIndentityModel.entity.certificateUrl + ')',
                            backgroundRepeat: 'no-repeat'
                          }"
                        >
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
                      <div class="pic_list">
                        <div
                          class="img_item"
                          @click="toTouchGongPaiUploadFile"
                          :style="{
                            backgroundSize: 'contain',
                            backgroundImage: 'url(' + myInfoIndentityModel.entity.jobUrl + ')',
                            backgroundRepeat: 'no-repeat'
                          }"
                        >
                          <img
                            class="add_file_img"
                            src="@a/imgs/add-file.png"
                            alt=""
                            srcset="@a/imgs/add-file@2x.png 2x"
                          />
                          <input
                            class="uploadCertFile"
                            type="file"
                            @change="uploadGongPaiFile"
                            ref="GongPaiUploadFileRef"
                            accept="image/png,image/jpeg,image/gif,image/jpg"
                          />
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
                </div>
              </div>
              <div class="footer_view" v-if="statusValue === 0">
                <div class="left_view">
                  <input
                    type="checkbox"
                    class="chk_agree"
                    v-model="checkedAgree"
                  />已阅读并同意《漫云搜医平台隐私及使用政策》
                </div>
                <div class="right_view" style="cursor: pointer" @click="submitData">提交</div>
              </div>
              <div class="footer_view">
                <div class="left_view">
                  <input
                    type="checkbox"
                    class="chk_agree"
                    v-model="checkedAgree"
                  />已阅读并同意《漫云搜医平台隐私及使用政策》
                </div>
                <div class="right_view" style="cursor: pointer" @click="submitDataUpdate">更新</div>
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
                    <input
                      type="text"
                      style="padding-left: 26px"
                      class="select_view"
                      placeholder="请填写本人真实姓名"
                      v-model.trim="myInfoDesignModel.entity.realName"
                    />
                  </div>
                  <div class="row">
                    <span class="label">身份证</span>
                    <input
                      type="text"
                      style="padding-left: 26px"
                      class="select_view"
                      placeholder="请输入身份证号码"
                      v-model.trim="myInfoDesignModel.entity.idCard"
                    />
                  </div>
                  <div class="row">
                    <span class="label">支付宝</span>
                    <input
                      type="text"
                      style="padding-left: 26px"
                      class="select_view"
                      placeholder="请输入支付宝账号"
                      v-model.trim="myInfoDesignModel.entity.alipay"
                    />
                  </div>
                  <div class="row">
                    <span class="label">身份证照片</span>
                    <div class="pic_view">
                      <!-- <div class="upload_view">
                        <img
                          class="add_file_img"
                          src="@a/imgs/add-file.png"
                          alt=""
                          srcset="@a/imgs/add-file@2x.png 2x"
                        />
                      </div> -->
                      <div class="pic_list">
                        <div
                          class="img_item"
                          :style="{
                            backgroundSize: 'contain',
                            backgroundImage: 'url(' + myInfoDesignModel.entity.idCardFUrl + ')',
                            backgroundRepeat: 'no-repeat'
                          }"
                          @click="idFClick"
                        >
                          <!-- <img
                            class="del_file_img"
                            src="@a/imgs/del-file.png"
                            alt=""
                            srcset="@a/imgs/del-file@2x.png 2x"
                          /> -->
                          <input
                            class="uploadCertFile"
                            type="file"
                            ref="idCardFFileRef"
                            @change="uploadidCardFFile"
                            accept="image/png,image/jpeg,image/gif,image/jpg"
                          />
                          <span style="color: #ccc; font-size: 12px">身份证正面</span>
                        </div>
                        <div
                          class="img_item"
                          :style="{
                            backgroundSize: 'contain',
                            backgroundImage: 'url(' + myInfoDesignModel.entity.idCardBUrl + ')',
                            backgroundRepeat: 'no-repeat'
                          }"
                          @click="idBClick"
                        >
                          <!-- <img
                            class="del_file_img"
                            src="@a/imgs/del-file.png"
                            alt=""
                            srcset="@a/imgs/del-file@2x.png 2x"
                          /> -->
                          <input
                            class="uploadCertFile"
                            type="file"
                            ref="idCardBFileRef"
                            @change="uploadidCardBFile"
                            accept="image/png,image/jpeg,image/gif,image/jpg"
                          />
                          <span style="color: #ccc; font-size: 12px">身份证反面</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="footer_view" v-if="statusDesignValue === 0">
                <div class="left_view">
                  <input
                    type="checkbox"
                    class="chk_agree"
                    v-model="desingCheckedAgree"
                  />已阅读并同意《漫云搜医平台隐私及使用政策》
                </div>
                <div class="right_view" @click="submitDesign">提交</div>
              </div>
              <div class="footer_view" v-if="statusDesignValue === 1">
                <div class="left_view">
                  <input
                    type="checkbox"
                    class="chk_agree"
                    v-model="desingCheckedAgree"
                  />已阅读并同意《漫云搜医平台隐私及使用政策》
                </div>
                <div class="right_view" @click="submitDesignUpdate">更新</div>
              </div>
            </template>
          </div>
          <div v-else-if="outer_tabIndex === 1" class="my_sample_tab_view">
            <div class="title_view">
              <span
                :class="['title', { active: inner_sample_tabIndex === 0 }]"
                @click="() => (inner_sample_tabIndex = 0)"
                >已上架({{ approvedZuoPinArr.length }})</span
              >
              <span
                :class="['title', { active: inner_sample_tabIndex === 1 }]"
                @click="() => (inner_sample_tabIndex = 1)"
                >审核中({{ approveingZuoPinArr.length }})</span
              >
              <span
                :class="['title', { active: inner_sample_tabIndex === 2 }]"
                @click="() => (inner_sample_tabIndex = 2)"
                >未通过({{ unApprovedZuoPinArr.length }})</span
              >
              <div class="uploadBtn" @click="uploadPic">上传作品</div>
            </div>
            <template v-if="inner_sample_tabIndex === 0">
              <div class="title_content_view">
                <div class="table_header">
                  <div class="title">时间</div>
                  <div class="title">预览图</div>
                  <div class="title">作品信息</div>
                  <div class="title">操作</div>
                </div>
                <div class="table_row" v-for="(item, index) in approvedZuoPinArr" :key="index">
                  <span class="column">
                    {{ item.publicDateTime }}
                  </span>
                  <span class="column">
                    <img
                      class="small_img"
                      @click="picVidoe(item.url, item.realPath)"
                      :src="item.url"
                      alt=""
                      srcset="@a/imgs/small_pic@2x.png 2x"
                    />
                  </span>
                  <span
                    class="column"
                    style="display: flex; flex-direction: column; align-items: center; justify-content: center"
                  >
                    <span class="label">《{{ item.name }}》</span>
                    <span class="label"
                      ><span class="downloadColor">{{ item.downCount }}</span
                      ><span class="focus">下载</span> <span class="collectColor">{{ item.collectCount }}</span
                      ><span class="focus">收藏</span></span
                    >
                  </span>
                  <span class="column">
                    <div class="delBtn" @click="delZuopin(item)">删除</div>
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
                <div class="table_row" v-for="(item, index) in approveingZuoPinArr" :key="index">
                  <span class="column">
                    {{ item.publicDateTime }}
                  </span>
                  <span class="column">
                    <img class="small_img" :src="item.url" alt="" srcset="@a/imgs/small_pic@2x.png 2x" />
                  </span>
                  <span
                    class="column"
                    style="display: flex; flex-direction: column; align-items: center; justify-content: center"
                  >
                    <span class="label">《{{ item.name }}》</span>
                    <span class="label"
                      ><span class="downloadColor">{{ item.downCount }}</span
                      ><span class="focus">下载</span> <span class="collectColor">{{ item.collectCount }}</span
                      ><span class="focus">收藏</span></span
                    >
                  </span>
                  <span class="column">
                    <div class="delBtn" @click="delZuopin(item)">删除</div>
                  </span>
                </div>
                <div class="label_row">审核会在10个工作日内完成</div>
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
                <div class="table_row" v-for="(item, index) in unApprovedZuoPinArr" :key="index">
                  <span class="column">
                    {{ item.publicDateTime }}
                  </span>
                  <span class="column">
                    <img class="small_img" :src="item.url" alt="" srcset="@a/imgs/small_pic@2x.png 2x" />
                  </span>
                  <span
                    class="column"
                    style="display: flex; flex-direction: column; align-items: center; justify-content: center"
                  >
                    <span class="label">《{{ item.name }}》</span>
                    <span class="label"
                      ><span class="downloadColor">{{ item.downCount }}</span
                      ><span class="focus">下载</span> <span class="collectColor">{{ item.collectCount }}</span
                      ><span class="focus">收藏</span></span
                    >
                  </span>
                  <span class="column">
                    <div class="delBtn" @click="delZuopin(item)">删除</div>
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
                >已下载({{ downRecords.length }})</span
              >
              <span
                :class="['title', { active: inner_voucher_tabIndex === 1 }]"
                @click="() => (inner_voucher_tabIndex = 1)"
                >已收藏({{ collectRecords.length }})</span
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
                  <div class="title">下载时间</div>
                  <div class="title">预览图</div>
                  <div class="title">作品信息</div>
                </div>
                <div class="table_row" v-for="(item, index) in downRecords" :key="index">
                  <span class="column">{{ item.downDateTime }} </span>
                  <span class="column">
                    <img class="small_img" :src="item.goodsUrl" alt="" />
                  </span>
                  <span
                    class="column"
                    style="display: flex; flex-direction: column; align-items: center; justify-content: center"
                  >
                    <span class="label">《{{ item.goodsName }}》</span>
                  </span>
                </div>
              </div>
            </template>
            <template v-if="inner_voucher_tabIndex === 1">
              <div class="title_content_view">
                <div class="table_header">
                  <div class="title">已收藏时间</div>
                  <div class="title">预览图</div>
                  <div class="title">作品信息</div>
                </div>
                <div class="table_row" v-for="(item, index) in collectRecords" :key="index">
                  <span class="column">{{ item.downDateTime }} </span>
                  <span class="column">
                    <img class="small_img" :src="item.goodsUrl" alt="" />
                  </span>
                  <span
                    class="column"
                    style="display: flex; flex-direction: column; align-items: center; justify-content: center"
                  >
                    <span class="label">《{{ item.goodsName }}》</span>
                  </span>
                </div>
              </div>
              <!-- <div class="title_content_view">
                <div class="table_header">
                  <div class="title">全部 86</div>
                  <div class="title">无标签 10</div>
                  <div class="title">标签一 66</div>
                  <div class="title">标签二 10</div>
                </div>
                <div class="result-view">
                  <div class="box" v-for="(item, index) in collectRecords" :key="index">
                    <img class="lis_img" :src="item.goodsUrl" alt="" />
                    <div class="content">{{ item.goodsName }}</div>
                  </div>
                </div>
              </div> -->
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
                  <span class="effect_label">有效期至：{{ this.$store.state.levelDeadline }}</span>
                </div>
                <div class="month_nav">
                  <div class="month_desc" v-for="(item, index) in vipList" :key="index">缴费{{ item.name }}</div>
                </div>
                <div class="select_pay_kind">
                  <div
                    :class="['nav', { active: payIndex === index }]"
                    v-for="(item, index) in vipList"
                    :key="index"
                    @click="selectPay(index)"
                  >
                    <img
                      class="zhekou_div"
                      src="@a/imgs/sale_10_img.png"
                      alt=""
                      srcset="@a/imgs/sale_10_img@2x.png 2x"
                    />
                    <div class="amount_div">
                      <span class="amount">{{ item.price }}</span>
                      <span class="unit">元</span>
                    </div>
                    <div class="uncheckd_pay">
                      <div class="active_checked" v-if="payIndex === index"></div>
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
                <div class="error_msg_line">请阅读后点击同意以完成支付</div>
                <div class="btnSubmit" @click="payForMember">确定支付</div>
              </div>
            </template>
            <template v-if="inner_voucher_tabIndex === 3">
              <div class="title_content_view">
                <div class="table_header">
                  <div class="title">购买时间</div>
                  <div class="title">支出</div>
                  <div class="title">金额</div>
                </div>
                <div class="table_row" v-for="(item, index) in rechargeList" :key="index">
                  <span class="column"> {{ item.dealDateTime }} </span>
                  <span class="column">
                    <img class="vip_img" src="@a/imgs/account_img.png" alt="" srcset="@a/imgs/account_img@2x.png 2x" />
                    <span class="vip_label">VIP开通</span>
                  </span>
                  <span class="column"> {{ item.dealAmount }} 元 </span>
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
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { mapState } from 'vuex'
import { uploadFileService } from '@s/upload-file-service'
import {
  getDcotorsService,
  getAreaInfoService,
  getTagsService,
  getProductClassifyService,
  getHospitalsService,
  submitMyInfoIndentityService,
  submitMyInfoIndentityUpdateService,
  getMyInfoByIdService,
  getHostpitalsService,
  submitMyInfoDesignService,
  getNavigationTreeService,
  mineZuoPinListService,
  submitZuoPinService,
  mineDownRecoredsService,
  mineCollectRecoredsService,
  mineRechargeRecoredsService,
  mineCMSRowByIdService,
  mineDelProductService,
  mineUpdateMemberService,
  mineUpdatePwdService
} from '@s/mine-info-service'
import { gettreelist } from '@l/util'
import { mutipleAjax } from '@l/axios-interceptor'
import ajaxPay from '@l/ajax-pay-interceptor'
import VueTagsInput from '@johmun/vue-tags-input'
import Treeselect from '@riophae/vue-treeselect'
import CONFIG from '@/config/config'
export default {
  name: 'MyInfoView',
  components: {
    VueTagsInput,
    Treeselect
  },
  data() {
    return {
      payTimer: null,
      payforImg_show: false,
      video_show: false,
      person_info_show: false,
      person_pwd_info_show: false,
      pic_show: false,
      detalPic: {
        url: '',
        name: '',
        suffix: ''
      },
      videoUrl: '',
      payImg: '',
      myZuoPinArr: [],
      approvedZuoPinArr: [],
      unApprovedZuoPinArr: [],
      approveingZuoPinArr: [],
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
      checkedAgree: false,
      desingCheckedAgree: false,
      statusValue: 0,
      statusDesignValue: 0,
      modal_loading: false,
      tag: '',
      tags: [],
      treeOptions: [],
      treeValue: [],
      navigationArr: [],
      downRecords: [],
      collectRecords: [],
      rechargeList: [],
      mine_person_info: {
        id: this.$store.state.memberId,
        email: '',
        avatarUrl: ''
      },
      mine_person_pwd: {
        memberName: this.$store.state.userName,
        oldPassword: '',
        newPassword: '',
        reNewPassword: ''
      },
      zuopin_upload_obj: {
        id: 0,
        name: '',
        goodsNo: '',
        tags: '',
        desc: '',
        authDesc: '',
        classifyId: '',
        classifyName: '',
        navigationId: -1,
        url: '',
        previewurl: '',
        ext: '',
        dpi: '',
        ratio: '',
        rgb: '',
        size: '',
        level: -1,
        isImage: 1,
        price: 0,
        quantity: 0,
        maxStock: 0,
        minStock: 0,
        downCount: 0,
        collectCount: 0,
        buyCount: 0,
        ownerId: this.$store.state.memberId,
        ownerName: '',
        publicDateTime: '2021-05-08T07:20:03.835Z',
        finalDateTime: '2021-05-08T07:20:03.835Z',
        remark: '',
        statusId: -1,
        statusName: '',
        statusValue: 0,
        createDateTime: '2021-05-08T07:20:03.835Z',
        createUserId: this.$store.state.memberId,
        editDateTime: '2021-05-08T07:20:03.835Z',
        editUserId: this.$store.state.memberId,
        status: {
          id: 0,
          pid: -1,
          name: '',
          key: '',
          value: 0,
          desc: '',
          createDateTime: '2021-05-08T07:20:03.835Z',
          createUserId: -1,
          editDateTime: '2021-05-08T07:20:03.835Z',
          editUserId: -1,
          path: ''
        },
        memberId: this.$store.state.memberId,
        memberName: this.$store.state.userNam
      },

      myInfoIndentityModel: {
        entity: {
          id: 0,
          memberId: this.$store.state.memberId,
          memberName: this.$store.state.userName,

          realName: '',
          identityId: -1,
          identityName: '',
          authorityIndex: 0,
          nationCode: '',
          nationName: '',
          provinceCode: '',
          provinceName: '',
          cityCode: '',
          cityName: '',
          divisionCode: '',
          divisionName: '',
          unitId: -1,
          unitName: '',
          officeId: -1,
          officeName: '',
          dutyId: -1,
          dutyName: '',
          jobNo: '',
          jobUrl: '',
          certificateNo: '',
          certificateUrl: '',
          idCard: '',
          idCardFUrl: '',
          idCardBUrl: '',
          mobile: '',
          email: '',
          alipay: '',
          wechatPay: '',

          applierId: this.$store.state.memberId,
          applierName: this.$store.state.userName,

          applierDate: '2021-05-08T06:35:49.678Z',
          approverId: -1,
          approverName: '',
          approverDate: '2021-05-08T06:35:49.678Z',
          remark: '',
          statusId: -1,
          statusName: '',
          statusValue: 0,
          applier: {
            id: 0,
            name: '',
            password: '',
            email: '',
            mobile: '',
            realName: '',
            avatarUrl: '',
            idCard: '',
            birthdate: '0001-01-01T00:00:00',
            gender: '',
            classifyId: -1,
            classifyName: '',
            level: 0,
            levelDeadline: '2021-05-08T06:35:49.678Z',
            downCount: 0,
            buyCount: 0,
            uploadCount: 0,
            reDownCount: 0,
            reBuyCount: 0,
            reUploadCount: 0,
            isAuthority: true,
            remark: '',
            registDateTime: '2021-05-08T06:35:49.678Z',
            loginDateTime: '2021-05-08T06:35:49.678Z',
            loginIPAddress: '',
            statusId: -1,
            statusName: '',
            statusValue: 0,
            status: {
              id: 0,
              pid: -1,
              name: '',
              key: '',
              value: 0,
              desc: '',
              createDateTime: '2021-05-08T06:35:49.678Z',
              createUserId: -1,
              editDateTime: '2021-05-08T06:35:49.678Z',
              editUserId: -1,
              path: ''
            }
          },
          approver: {
            id: 0,
            name: '',
            password: '',
            realName: '',
            email: '',
            mobile: '',
            remark: '',
            loginDateTime: '2021-05-08T06:35:49.678Z',
            loginIPAddress: '',
            createDateTime: '2021-05-08T06:35:49.678Z',
            createUserId: -1,
            editDateTime: '2021-05-08T06:35:49.678Z',
            editUserId: -1,
            statusId: 0,
            statusName: '',
            statusValue: 0,
            status: {
              id: 0,
              pid: -1,
              name: '',
              key: '',
              value: 0,
              desc: '',
              createDateTime: '2021-05-08T06:35:49.678Z',
              createUserId: -1,
              editDateTime: '2021-05-08T06:35:49.678Z',
              editUserId: -1,
              path: ''
            }
          },
          status: {
            id: 0,
            pid: -1,
            name: '',
            key: '',
            value: 0,
            desc: '',
            createDateTime: '2021-05-08T06:35:49.678Z',
            createUserId: -1,
            editDateTime: '2021-05-08T06:35:49.678Z',
            editUserId: -1,
            path: ''
          }
        },
        statusKey: 'cms.authority.open'
      },
      myInfoDesignModel: {
        entity: {
          id: 0,
          memberId: this.$store.state.memberId,
          memberName: this.$store.state.userName,

          realName: '',
          identityId: -1,
          identityName: '',
          authorityIndex: 1,
          nationCode: '',
          nationName: '',
          provinceCode: '',
          provinceName: '',
          cityCode: '',
          cityName: '',
          divisionCode: '',
          divisionName: '',
          unitId: -1,
          unitName: '',
          officeId: -1,
          officeName: '',
          dutyId: -1,
          dutyName: '',
          jobNo: '',
          jobUrl: '',
          certificateNo: '',
          certificateUrl: '',
          idCard: '',
          idCardFUrl: '',
          idCardBUrl: '',
          mobile: '',
          email: '',
          alipay: '',
          wechatPay: '',

          applierId: this.$store.state.memberId,
          applierName: this.$store.state.userName,

          applierDate: '2021-05-08T06:35:49.678Z',
          approverId: -1,
          approverName: '',
          approverDate: '2021-05-08T06:35:49.678Z',
          remark: '',
          statusId: -1,
          statusName: '',
          statusValue: 0,
          applier: {
            id: 0,
            name: '',
            password: '',
            email: '',
            mobile: '',
            realName: '',
            avatarUrl: '',
            idCard: '',
            birthdate: '0001-01-01T00:00:00',
            gender: '',
            classifyId: -1,
            classifyName: '',
            level: 0,
            levelDeadline: '2021-05-08T06:35:49.678Z',
            downCount: 0,
            buyCount: 0,
            uploadCount: 0,
            reDownCount: 0,
            reBuyCount: 0,
            reUploadCount: 0,
            isAuthority: true,
            remark: '',
            registDateTime: '2021-05-08T06:35:49.678Z',
            loginDateTime: '2021-05-08T06:35:49.678Z',
            loginIPAddress: '',
            statusId: -1,
            statusName: '',
            statusValue: 0,
            status: {
              id: 0,
              pid: -1,
              name: '',
              key: '',
              value: 0,
              desc: '',
              createDateTime: '2021-05-08T06:35:49.678Z',
              createUserId: -1,
              editDateTime: '2021-05-08T06:35:49.678Z',
              editUserId: -1,
              path: ''
            }
          },
          approver: {
            id: 0,
            name: '',
            password: '',
            realName: '',
            email: '',
            mobile: '',
            remark: '',
            loginDateTime: '2021-05-08T06:35:49.678Z',
            loginIPAddress: '',
            createDateTime: '2021-05-08T06:35:49.678Z',
            createUserId: -1,
            editDateTime: '2021-05-08T06:35:49.678Z',
            editUserId: -1,
            statusId: 0,
            statusName: '',
            statusValue: 0,
            status: {
              id: 0,
              pid: -1,
              name: '',
              key: '',
              value: 0,
              desc: '',
              createDateTime: '2021-05-08T06:35:49.678Z',
              createUserId: -1,
              editDateTime: '2021-05-08T06:35:49.678Z',
              editUserId: -1,
              path: ''
            }
          },
          status: {
            id: 0,
            pid: -1,
            name: '',
            key: '',
            value: 0,
            desc: '',
            createDateTime: '2021-05-08T06:35:49.678Z',
            createUserId: -1,
            editDateTime: '2021-05-08T06:35:49.678Z',
            editUserId: -1,
            path: ''
          }
        },
        statusKey: 'cms.authority.open'
      }
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
      if (this.$refs.qrcode_div) {
        if (!this.$refs.qrcode_div.contains(e.target)) {
          this.payforImg_show = false
        }
      }
    })
    this.loadInitialData()
    this.loadMyZuoPinLIst()
    this.loadDownRecordList()
    this.loadCollectRecordList()
    this.loadRechargeRecordList()
  },
  unmounted() {
    clearInterval(this.payTimer)
    document.removeEventListener('click')
  },
  computed: {
    ...mapState(['token', 'userName', 'loading', 'vipList', 'avatarUrl'])
  },
  methods: {
    picVidoe(url, realPath) {
      if (url !== realPath) {
        this.video_show = true
        this.videoUrl = realPath
      }
      if (url.indexOf('play.png') === -1) {
        this.pic_show = true
        this.detalPic.url = url
        this.detalPic.name = url.substring(url.lastIndexOf('/') + 1)
        this.detalPic.suffix = url.substring(url.lastIndexOf('.') + 1)
      }
    },
    async delZuopin(item) {
      const { result } = await mineDelProductService({
        entity: {
          id: item.id,
          name: '',
          goodsNo: '',
          tags: '',
          desc: '',
          authDesc: '',
          classifyId: -1,
          classifyName: '',
          url: '',
          coverUrl: '',
          ext: '',
          dpi: '',
          ratio: '',
          rgb: '',
          size: '',
          level: 0,
          isImage: 0,
          isOriginal: 0,
          navigationId: -1,
          navigationName: '',
          price: 0,
          quantity: 0,
          maxStock: 0,
          minStock: 0,
          downCount: 0,
          collectCount: 0,
          buyCount: 0,
          ownerId: -1,
          ownerName: '',
          remark: '',
          createUserId: -1,
          editUserId: -1,
          statusId: -1,
          statusName: '',
          statusValue: 0
        },
        statusKey: 'cms.goods.close'
      })
      if (result) {
        this.loadMyZuoPinLIst()
        alert('删除成功')
      }
    },
    payForMember() {
      let amount = 0
      if (!this.wx_checked) {
        alert('请选择支付方式!')
        return
      }
      if (!this.agree_checked) {
        alert('请同意同意用户协议与隐私政策!')
        return
      }
      if (this.payIndex === 0) {
        amount = 1
      } else if (this.payIndex === 1) {
        amount = 2
      } else if (this.payIndex === 2) {
        amount = 3
      }
      ajaxPay({
        // 用axios发送post请求
        method: 'post',
        url: `${CONFIG.API_URLS.PAY_FOR_MEMBER_URL}?amount=${amount}&content=开通会员`, // 请求地址
        responseType: 'blob' // 表明返回服务器返回的数据类型
      }).then(res => {
        let url = window.URL.createObjectURL(res)
        this.payImg = url
        this.payforImg_show = true
        this.payTimer = setInterval(async () => {
          ajaxPay({
            // 用axios发送post请求
            method: 'post',
            url: `${CONFIG.API_URLS.GET_PAYSTATUS_URL}`
          }).then(async res => {
            if (res) {
              const result2 = await mineCMSRowByIdService(this.$store.state.memberId)
              this.$store.commit('setlevelDeadline', result2.row.levelDeadline)
              this.payforImg_show = false
              clearInterval(this.payTimer)
              setTimeout(() => {
                alert('支付成功!')
              }, 500)
            }
          })
        }, 5000)
      })
    },
    async loadDownRecordList() {
      const { rows, result } = await mineDownRecoredsService({
        keyWord: '^memberId=' + this.$store.state.memberId,
        page: '1^100',
        date: '',
        sort: '',
        status: [1]
      })
      this.$nextTick(() => {
        rows.forEach(m => {
          m.goodsUrl = process.env.VUE_APP_FE_FILE_URL + m.goodsUrl
        })
        this.downRecords = rows
      })
    },
    async updateMemberInfo() {
      if (this.mine_person_info.email === '' || this.mine_person_info.avatarUrl === '') {
        alert('邮箱或者头像不能为空!')
        return
      }
      this.mine_person_info.avatarUrl = this.mine_person_info.avatarUrl.substring(
        this.mine_person_info.avatarUrl.indexOf('/uploadFiles')
      )
      const { result } = await mineUpdateMemberService(this.mine_person_info)
      if (result) {
        this.person_info_show = false
        this.$store.commit('setAvatarUrl', process.env.VUE_APP_FE_FILE_URL + this.mine_person_info.avatarUrl)
        alert('修改个人信息成功!')
      }
    },

    async updateMemberPwd() {
      if (this.mine_person_pwd.oldPassword === '') {
        alert('旧密码不能为空!')
        return
      }
      if (this.mine_person_pwd.newPassword === '') {
        alert('新密码不能为空!')
        return
      }
      if (this.mine_person_pwd.reNewPassword === '') {
        alert('确认密码不能为空!')
        return
      }
      if (this.mine_person_pwd.newPassword !== this.mine_person_pwd.reNewPassword) {
        alert('新密码与确认密码不一致!')
        return
      }
      const { result } = await mineUpdatePwdService(this.mine_person_pwd)
      if (result) {
        this.$store.commit('clearStore')
        alert('修改密码成功!')
        this.$router.push('/login')
      }
    },
    async loadCollectRecordList() {
      const { rows, result } = await mineCollectRecoredsService({
        keyWord: '^memberId=' + this.$store.state.memberId,
        page: '1^100',
        date: '',
        sort: '',
        status: [1]
      })

      rows.forEach(m => {
        m.goodsUrl = process.env.VUE_APP_FE_FILE_URL + m.goodsUrl
      })
      this.collectRecords = rows
    },
    async loadRechargeRecordList() {
      const { rows, result } = await mineRechargeRecoredsService({
        keyWord: '^memberId=' + this.$store.state.memberId,
        page: '1^100',
        date: '',
        sort: '',
        status: [1]
      })
      this.rechargeList = rows
    },
    async loadMyZuoPinLIst() {
      const { rows, result } = await mineZuoPinListService({
        keyWord: '^ownerid=' + this.$store.state.memberId,
        page: '1^100',
        date: '',
        sort: '',
        status: [1, 2]
      })
      if (result) {
        this.myZuoPinArr = rows
        this.approvedZuoPinArr = rows.filter(f => f.statusValue === 2)
        this.approvedZuoPinArr.forEach(m => {
          if (
            m.ext === 'mp4' ||
            m.ext === 'mkv' ||
            m.ext === 'mov' ||
            m.ext === 'm4v' ||
            m.ext === 'wmv' ||
            m.ext === 'avi' ||
            m.ext === 'flv'
          ) {
            m.realPath = process.env.VUE_APP_FE_FILE_URL + m.url
            m.url = '../assets/imgs/play.png'
          } else {
            m.url = process.env.VUE_APP_FE_FILE_URL + m.url
            m.realPath = m.url
          }
        })
        this.unApprovedZuoPinArr = rows.filter(f => f.statusValue === -2)
        this.unApprovedZuoPinArr.forEach(m => {
          m.url = process.env.VUE_APP_FE_FILE_URL + m.url
        })
        this.approveingZuoPinArr = rows.filter(f => f.statusValue === 1)
        this.approveingZuoPinArr.forEach(m => {
          m.url = process.env.VUE_APP_FE_FILE_URL + m.url
        })
      }
    },
    async loadInitialData() {
      let promiseArr = [
        getDcotorsService(),
        getAreaInfoService('0'),
        getProductClassifyService(),
        getNavigationTreeService(10)
      ]
      let result = await mutipleAjax(promiseArr)
      this.doctorsArr = result[0].rows
      this.provincesArrr = result[1].rows
      console.log(2222, result[3].tree[0].children)
      if (result[3].tree[0].children) {
        result[3].tree[0].children.map(m => {
          this.navigationArr.push({ id: m.id, name: m.title })
        })
      }

      this.treeOptions = gettreelist(result[2].tree)
      let { result: myInfoResult, row, message } = await getMyInfoByIdService(this.$store.state.memberId, 0)
      if (myInfoResult) {
        const myInfo = row
        this.statusValue = myInfo.statusValue
        this.myInfoIndentityModel.entity.identityId = myInfo.identityId
        this.personIdentity = myInfo.identityId + ''
        this.myInfoIndentityModel.entity.jobUrl = myInfo.jobUrl
        this.myInfoIndentityModel.entity.identityName = myInfo.identityName
        this.myInfoIndentityModel.entity.provinceCode = myInfo.provinceCode
        this.myInfoIndentityModel.entity.provinceName = myInfo.provinceName
        await this.loadCitiesByProvinceCode(this.myInfoIndentityModel.entity.provinceCode)
        this.myInfoIndentityModel.entity.cityCode = myInfo.cityCode
        this.myInfoIndentityModel.entity.cityName = myInfo.cityName
        await this.loadDivisionsByCityCode(this.myInfoIndentityModel.entity.cityCode)
        this.myInfoIndentityModel.entity.divisionCode = myInfo.divisionCode
        this.myInfoIndentityModel.entity.divisionName = myInfo.divisionName
        this.myInfoIndentityModel.entity.id = myInfo.id
        this.myInfoIndentityModel.entity.dutyName = myInfo.dutyName
        this.myInfoIndentityModel.entity.email = myInfo.email
        this.checkedAgree = true

        await this.loadHostpitalsByDivision(this.myInfoIndentityModel.entity.divisionCode)
        this.myInfoIndentityModel.entity.unitId = myInfo.unitId
        this.myInfoIndentityModel.entity.unitName = myInfo.unitName
        await this.loadKeshiList(this.myInfoIndentityModel.entity.unitId, this.myInfoIndentityModel.entity.divisionCode)
        this.myInfoIndentityModel.entity.officeId = myInfo.officeId
        this.myInfoIndentityModel.entity.officeName = myInfo.officeName
        this.myInfoIndentityModel.entity.certificateNo = myInfo.certificateNo
        this.myInfoIndentityModel.entity.certificateUrl = myInfo.certificateUrl
      }
      let { result: myInfoDesignResult, row: designRow, designMessage } = await getMyInfoByIdService(
        this.$store.state.memberId,
        1
      )
      if (myInfoDesignResult) {
        this.desingCheckedAgree = true
        this.myInfoDesignModel.entity.id = designRow.id
        this.myInfoDesignModel.entity.realName = designRow.realName
        this.myInfoDesignModel.entity.idCard = designRow.idCard
        this.myInfoDesignModel.entity.alipay = designRow.alipay
        this.myInfoDesignModel.entity.alipay = designRow.alipay
        this.myInfoDesignModel.entity.idCardFUrl = designRow.idCardFUrl
        this.myInfoDesignModel.entity.idCardBUrl = designRow.idCardBUrl
        this.statusDesignValue = designRow.statusValue
      }
    },
    async submitDesign() {
      if (!this.desingCheckedAgree) {
        alert('请勾选已阅读并同意《漫云搜医平台隐私及使用政策》!')
        return
      }
      if (this.myInfoDesignModel.entity.realName === '') {
        alert('请填写姓名!')
        return
      }
      if (this.myInfoDesignModel.entity.idCard === '') {
        alert('请填写身份证号!')
        return
      }
      if (this.myInfoDesignModel.entity.alipay === '') {
        alert('请填写支付宝账号!')
        return
      }
      if (this.myInfoDesignModel.entity.idCardFUrl === '') {
        alert('请上传身份证正面照!')
        return
      }
      if (this.myInfoDesignModel.entity.idCardBUr === '') {
        alert('请上传身份证反面照!')
        return
      }
      const { result, errorInfo } = await submitMyInfoDesignService(this.myInfoDesignModel)
      if (result) {
        alert('提交成功!')
      }
    },
    async submitDesignUpdate() {
      if (!this.desingCheckedAgree) {
        alert('请勾选已阅读并同意《漫云搜医平台隐私及使用政策》!')
        return
      }
      if (this.myInfoDesignModel.entity.realName === '') {
        alert('请填写姓名!')
        return
      }
      if (this.myInfoDesignModel.entity.idCard === '') {
        alert('请填写身份证号!')
        return
      }
      if (this.myInfoDesignModel.entity.alipay === '') {
        alert('请填写支付宝账号!')
        return
      }
      if (this.myInfoDesignModel.entity.idCardFUrl === '') {
        alert('请上传身份证正面照!')
        return
      }
      if (this.myInfoDesignModel.entity.idCardBUr === '') {
        alert('请上传身份证反面照!')
        return
      }
      const { result, errorInfo } = await submitMyInfoIndentityUpdateService(this.myInfoDesignModel)
      if (result) {
        alert('提交成功!')
      }
    },
    async submitData() {
      if (!this.checkedAgree) {
        alert('请勾选已阅读并同意《漫云搜医平台隐私及使用政策》!')
        return
      }
      if (this.myInfoIndentityModel.entity.identityId === -1) {
        alert('请选择身份!')
        return
      }
      if (this.myInfoIndentityModel.entity.provinceCode === '') {
        alert('请选择省!')
        return
      }
      if (this.myInfoIndentityModel.entity.cityCode === '') {
        alert('请选择市!')
        return
      }
      if (this.myInfoIndentityModel.entity.divisionCode === '') {
        alert('请选择区!')
        return
      }
      if (this.myInfoIndentityModel.entity.identityId === 2 || this.myInfoIndentityModel.entity.identityId === 3) {
        if (this.myInfoIndentityModel.entity.unitId === -1) {
          alert('请选择医院/单位!')
          return
        }
        if (this.myInfoIndentityModel.entity.officeId === -1) {
          alert('请选择科室/部门!')
          return
        }
      }

      if (this.myInfoIndentityModel.entity.identityId === 4) {
        if (this.myInfoIndentityModel.entity.jobUrl === '') {
          alert('请上传工牌照!')
          return
        }
      }

      if (this.myInfoIndentityModel.entity.identityId === 2 || this.myInfoIndentityModel.entity.identityId === 3) {
        if (this.myInfoIndentityModel.entity.certificateNo === '') {
          alert('请填写证件编码!')
          return
        }
        if (this.myInfoIndentityModel.entity.certificateUrl === '') {
          alert('请上传证件图!')
          return
        }
      }

      if (this.myInfoIndentityModel.entity.identityId === 5) {
        if (this.myInfoIndentityModel.entity.unitName === '') {
          alert('请填写公司名称!')
          return
        }
        if (this.myInfoIndentityModel.entity.officeName === '') {
          alert('请填写所属部门名称!')
          return
        }
        if (this.myInfoIndentityModel.entity.dutyName === '') {
          alert('请填写职位职务!')
          return
        }
        if (this.myInfoIndentityModel.entity.email === '') {
          alert('请填写邮箱!')
          return
        }
      }

      this.myInfoIndentityModel.entity.identityName = this.doctorsArr.filter(
        f => f.id === this.myInfoIndentityModel.entity.identityId
      )[0].name
      this.myInfoIndentityModel.entity.provinceName = this.provincesArrr.filter(
        f => f.code === this.myInfoIndentityModel.entity.provinceCode
      )[0].name
      this.myInfoIndentityModel.entity.cityName = this.citiesArr.filter(
        f => f.code === this.myInfoIndentityModel.entity.cityCode
      )[0].name
      this.myInfoIndentityModel.entity.divisionName = this.divisionArr.filter(
        f => f.code === this.myInfoIndentityModel.entity.divisionCode
      )[0].name
      if (this.myInfoIndentityModel.entity.identityId <= 4) {
        this.myInfoIndentityModel.entity.unitName = this.hospitalsArr.filter(
          f => f.id === this.myInfoIndentityModel.entity.unitId
        )[0].name
        this.myInfoIndentityModel.entity.officeName = this.keshiArr.filter(
          f => f.id === this.myInfoIndentityModel.entity.officeId
        )[0].name
      }

      const { result, errorInfo } = await submitMyInfoIndentityService(this.myInfoIndentityModel)
      if (result) {
        this.statusValue = 1
        alert('提交成功!')
      }
    },
    async submitDataUpdate() {
      if (!this.checkedAgree) {
        alert('请勾选已阅读并同意《漫云搜医平台隐私及使用政策》!')
        return
      }
      if (this.myInfoIndentityModel.entity.identityId === -1) {
        alert('请选择身份!')
        return
      }
      if (this.myInfoIndentityModel.entity.provinceCode === '') {
        alert('请选择省!')
        return
      }
      if (this.myInfoIndentityModel.entity.cityCode === '') {
        alert('请选择市!')
        return
      }
      if (this.myInfoIndentityModel.entity.divisionCode === '') {
        alert('请选择区!')
        return
      }
      if (this.myInfoIndentityModel.entity.identityId === 2 || this.myInfoIndentityModel.entity.identityId === 3) {
        if (this.myInfoIndentityModel.entity.unitId === -1) {
          alert('请选择医院/单位!')
          return
        }
        if (this.myInfoIndentityModel.entity.officeId === -1) {
          alert('请选择科室/部门!')
          return
        }
      }

      if (this.myInfoIndentityModel.entity.identityId === 4) {
        if (this.myInfoIndentityModel.entity.jobUrl === '') {
          alert('请上传工牌照!')
          return
        }
      }

      if (this.myInfoIndentityModel.entity.identityId === 2 || this.myInfoIndentityModel.entity.identityId === 3) {
        if (this.myInfoIndentityModel.entity.certificateNo === '') {
          alert('请填写证件编码!')
          return
        }
        if (this.myInfoIndentityModel.entity.certificateUrl === '') {
          alert('请上传证件图!')
          return
        }
      }

      if (this.myInfoIndentityModel.entity.identityId === 5) {
        if (this.myInfoIndentityModel.entity.unitName === '') {
          alert('请填写公司名称!')
          return
        }
        if (this.myInfoIndentityModel.entity.officeName === '') {
          alert('请填写所属部门名称!')
          return
        }
        if (this.myInfoIndentityModel.entity.dutyName === '') {
          alert('请填写职位职务!')
          return
        }
        if (this.myInfoIndentityModel.entity.email === '') {
          alert('请填写邮箱!')
          return
        }
      }

      this.myInfoIndentityModel.entity.identityName = this.doctorsArr.filter(
        f => f.id === this.myInfoIndentityModel.entity.identityId
      )[0].name
      this.myInfoIndentityModel.entity.provinceName = this.provincesArrr.filter(
        f => f.code === this.myInfoIndentityModel.entity.provinceCode
      )[0].name
      this.myInfoIndentityModel.entity.cityName = this.citiesArr.filter(
        f => f.code === this.myInfoIndentityModel.entity.cityCode
      )[0].name
      this.myInfoIndentityModel.entity.divisionName = this.divisionArr.filter(
        f => f.code === this.myInfoIndentityModel.entity.divisionCode
      )[0].name
      if (this.myInfoIndentityModel.entity.identityId <= 4) {
        this.myInfoIndentityModel.entity.unitName = this.hospitalsArr.filter(
          f => f.id === this.myInfoIndentityModel.entity.unitId
        )[0].name
        this.myInfoIndentityModel.entity.officeName = this.keshiArr.filter(
          f => f.id === this.myInfoIndentityModel.entity.officeId
        )[0].name
      }
      const { result, errorInfo } = await submitMyInfoIndentityUpdateService(this.myInfoIndentityModel)
      if (result) {
        alert('提交成功!')
      }
    },
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
      if (index === 9) {
        this.person_pwd_info_show = true
      } else if (index === 10) {
        this.person_info_show = true
      } else {
        this.dropdownStatus = false
        if (index < 4) {
          this.$router.push('/mine/info?index=' + index)
        } else if (index === 4) {
          this.$store.commit('clearStore')
          this.$router.push('/home')
        }
      }
    },

    async uploadHeaderLogFile() {
      let inputDOM = this.$refs.HeaderLogoUploadFileRef
      let file = inputDOM.files[0]
      let param = new FormData()
      param.append('file', file)
      const {
        data: { fileName, relativePath },
        errorInfo
      } = await uploadFileService(param)
      this.myInfoIndentityModel.entity.applier.avatarUrl = relativePath
      this.mine_person_info.avatarUrl = relativePath
    },
    async uploadPicFile() {
      let inputDOM = this.$refs.uploadPicFileRef
      let file = inputDOM.files[0]
      let param = new FormData()
      param.append('file', file)
      const {
        data: { fileName, relativePath },
        errorInfo
      } = await uploadFileService(param)
      this.myInfoIndentityModel.entity.applier.avatarUrl = relativePath
    },

    async uploadZuoPinPicFile() {
      let inputDOM = this.$refs.uploadZuoPinFileRef
      let file = inputDOM.files[0]
      let param = new FormData()
      param.append('file', file)
      const {
        data: { fileName, relativePath },
        errorInfo
      } = await uploadFileService(param)

      if (
        relativePath.indexOf('mp4') !== -1 ||
        relativePath.indexOf('mkv') !== -1 ||
        relativePath.indexOf('mov') !== -1 ||
        relativePath.indexOf('m4v') !== -1 ||
        relativePath.indexOf('wmv') !== -1 ||
        relativePath.indexOf('avi') !== -1 ||
        relativePath.indexOf('flv') !== -1
      ) {
        this.zuopin_upload_obj.url = relativePath
        this.zuopin_upload_obj.previewurl = '../assets/imgs/play.png'
      } else {
        this.zuopin_upload_obj.url = relativePath
        m.previewurl = relativePath
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
      this.myInfoIndentityModel.entity.certificateUrl = relativePath
    },

    async uploadGongPaiFile() {
      let inputDOM = this.$refs.GongPaiUploadFileRef
      let file = inputDOM.files[0]
      let param = new FormData()
      param.append('file', file)
      const {
        data: { fileName, relativePath },
        errorInfo
      } = await uploadFileService(param)
      this.myInfoIndentityModel.entity.jobUrl = relativePath
    },

    async uploadidCardFFile() {
      let inputDOM = this.$refs.idCardFFileRef
      let file = inputDOM.files[0]
      let param = new FormData()
      param.append('file', file)
      const {
        data: { fileName, relativePath },
        errorInfo
      } = await uploadFileService(param)
      this.myInfoDesignModel.entity.idCardFUrl = relativePath
    },
    async uploadidCardBFile() {
      let inputDOM = this.$refs.idCardBFileRef
      let file = inputDOM.files[0]
      let param = new FormData()
      param.append('file', file)
      const {
        data: { fileName, relativePath },
        errorInfo
      } = await uploadFileService(param)
      this.myInfoDesignModel.entity.idCardBUrl = relativePath
    },
    toTouchUploadFile() {
      this.$refs.CertUploadFileRef.click()
    },
    toTouchUploadZuoPinPic() {
      this.$refs.uploadZuoPinFileRef.click()
    },
    toTouchGongPaiUploadFile() {
      this.$refs.GongPaiUploadFileRef.click()
    },
    toTouchHeaderLogoUploadFile() {
      this.$refs.HeaderLogoUploadFileRef.click()
    },
    idFClick() {
      this.$refs.idCardFFileRef.click()
    },
    idBClick() {
      this.$refs.idCardBFileRef.click()
    },
    async provinceChange(e) {
      const { result, rows, errorInfo } = await getAreaInfoService(e.target.value)
      if (result) {
        this.citiesArr = rows
        this.divisionArr = []
        this.keshiArr = []
        this.hospitalsArr = []

        this.myInfoIndentityModel.entity.unitId = -1
        this.myInfoIndentityModel.entity.unitName = ''
        this.myInfoIndentityModel.entity.officeId = -1
        this.myInfoIndentityModel.entity.officeName = ''

        this.myInfoIndentityModel.entity.cityCode = ''
        this.myInfoIndentityModel.entity.cityName = ''
        this.myInfoIndentityModel.entity.divisionCode = ''
        this.myInfoIndentityModel.entity.divisionName = ''
      }
    },
    async loadCitiesByProvinceCode(code) {
      const { result, rows, errorInfo } = await getAreaInfoService(code)
      if (result) {
        this.citiesArr = rows
      }
    },
    async loadDivisionsByCityCode(code) {
      const { result, rows, errorInfo } = await getAreaInfoService(code)
      if (result) {
        this.divisionArr = rows
      }
    },

    async cityChange(e) {
      const { result, rows, errorInfo } = await getAreaInfoService(e.target.value)
      if (result) {
        this.divisionArr = rows
      }
    },
    async divisionChange(e) {
      const request = {
        keyWord: `^pid=-1^divisioncode=${e.target.value}`,
        page: '1^50',
        date: '',
        sort: '',
        status: [0, 1]
      }
      const { result, rows, errorInfo } = await getHostpitalsService(request)
      if (result) {
        this.hospitalsArr = rows
      }
    },
    async loadHostpitalsByDivision(code) {
      const request = {
        keyWord: `^pid=-1^divisioncode=${code}`,
        page: '1^50',
        date: '',
        sort: '',
        status: [0, 1]
      }
      const { result, rows, errorInfo } = await getHostpitalsService(request)
      if (result) {
        this.hospitalsArr = rows
      }
    },
    async hospitalChange(e) {
      const request = {
        keyWord: `^pid=${e.target.value}^divisioncode=${this.myInfoIndentityModel.entity.divisionCode}`,
        page: '1^50',
        date: '',
        sort: '',
        status: [0, 1]
      }
      const { result, rows, errorInfo } = await getHostpitalsService(request)
      if (result) {
        this.keshiArr = rows
      }
    },
    async loadKeshiList(hospitalId, code) {
      const request = {
        keyWord: `^pid=${hospitalId}^divisioncode=${code}`,
        page: '1^50',
        date: '',
        sort: '',
        status: [0, 1]
      }
      const { result, rows, errorInfo } = await getHostpitalsService(request)
      if (result) {
        this.keshiArr = rows
      }
    },
    uploadPic() {
      this.modal_loading = true
    },
    closeModal() {
      this.modal_loading = false
    },
    closeVidowModal() {
      this.video_show = false
    },
    closePersonInfoModal() {
      this.person_info_show = false
    },
    closePicwModal() {
      this.pic_show = false
    },
    async submitModal() {
      let tagsStr = ''
      if (this.tags.length > 0) {
        this.tags.forEach(m => {
          tagsStr += ',' + m.text
        })
        if (tagsStr !== '') {
          tagsStr = tagsStr.substring(1)
        }
      }

      this.zuopin_upload_obj.tags = ',' + tagsStr + ','
      if (this.zuopin_upload_obj.name === '') {
        alert('作品名必填!')
        return
      }
      if (this.zuopin_upload_obj.tags === ',,') {
        alert('标签至少选一个!')
        return
      }
      if (this.zuopin_upload_obj.classifyId === '') {
        alert('分类必选!')
        return
      }
      if (this.zuopin_upload_obj.navigationId == '-1') {
        alert('所属导航必选!')
        return
      }
      if (this.zuopin_upload_obj.level === -1) {
        alert('收费状态必选!')
        return
      }
      if (this.zuopin_upload_obj.url === '') {
        alert('图片必须上传!')
        return
      }
      this.zuopin_upload_obj.ext = this.zuopin_upload_obj.url.substring(this.zuopin_upload_obj.url.lastIndexOf('.') + 1)
      this.modal_loading = false
      const { result, message } = await submitZuoPinService({
        ...this.zuopin_upload_obj,
        url: this.zuopin_upload_obj.url.substring(this.zuopin_upload_obj.url.indexOf('/uploadFiles'))
      })
      if (result) {
        this.loadMyZuoPinLIst()
        alert('提交成功!')
        this.zuopin_upload_obj.tags = this.zuopin_upload_obj.name = this.zuopin_upload_obj.classifyId = ''
        this.zuopin_upload_obj.navigationId = -1
        this.zuopin_upload_obj.level = -1
        this.zuopin_upload_obj.url = ''
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
    .qrcode_div {
      width: 250px;
      height: 250px;
      background: #ffffff;
    }
    .person_info_div {
      width: 650px;
      height: 450px;
      background: #ffffff;
      position: relative;
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
        cursor: pointer;
        position: absolute;
        bottom: 20px;
        right: 0;
      }
      .content {
        box-sizing: border-box;
        padding: 20px;
        padding-top: 40px;
        position: relative;

        .row {
          display: flex;
          flex-direction: row;
          box-sizing: border-box;
          justify-content: space-between;
          margin-bottom: 5px;

          .uploadCertFile {
            display: none;
          }
          .header_logo_size {
            width: 67px;
            height: 67px;
            border-radius: 50%;
          }
          .header_logo {
            cursor: pointer;
            width: 67px;
            height: 67px;
            border-radius: 50%;
            border: 1px solid #cfcfcf;
            margin-top: 20px;
            line-height: 67px;
            text-align: center;
            font-size: 16px;
            color: #354052;
          }

          .label {
            color: #354052;
            font-size: 16px;
            line-height: 43px;
            width: 80px;
          }
          .select_view {
            width: 334px;
            height: 37px;
            padding: 0;
            outline: none;
            border: 1px solid #cfcfcf;
            border-radius: 6px;
            margin-right: 200px;
            box-sizing: border-box;
            padding-left: 15px;
          }
          .pic_view {
            width: 334px;
            height: 174px;
            border: 1px solid #cfcfcf;
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
                display: flex;
                justify-content: center;
                align-items: center;
                width: 87px;
                height: 87px;
                background: #ffffff;
                border: 1px solid #d6d6d6;
                margin-left: 10px;
                margin-top: 5px;
                position: relative;
                cursor: pointer;
                .add_file_img {
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  position: absolute;
                }
                .del_file_img {
                  top: -10px;
                  right: -8px;
                  position: absolute;
                }
                .uploadCertFile {
                  display: none;
                }
              }
            }
          }
        }
      }
      .close_img {
        width: 64px;
        height: 64px;
        position: absolute;
        top: -30px;
        right: -30px;
        cursor: pointer;
      }
    }

    .person_pwd_info_div {
      width: 650px;
      height: 450px;
      background: #ffffff;
      position: relative;
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
        cursor: pointer;
        position: absolute;
        bottom: 20px;
        right: 0;
      }
      .content {
        box-sizing: border-box;
        padding: 20px;
        padding-top: 40px;
        position: relative;

        .row {
          display: flex;
          flex-direction: row;
          box-sizing: border-box;
          justify-content: space-between;
          margin-bottom: 5px;

          .uploadCertFile {
            display: none;
          }
          .header_logo_size {
            width: 67px;
            height: 67px;
            border-radius: 50%;
          }
          .header_logo {
            cursor: pointer;
            width: 67px;
            height: 67px;
            border-radius: 50%;
            border: 1px solid #cfcfcf;
            margin-top: 20px;
            line-height: 67px;
            text-align: center;
            font-size: 16px;
            color: #354052;
          }

          .label {
            color: #354052;
            font-size: 16px;
            line-height: 43px;
            width: 80px;
          }
          .select_view {
            width: 334px;
            height: 37px;
            padding: 0;
            outline: none;
            border: 1px solid #cfcfcf;
            border-radius: 6px;
            margin-right: 200px;
            box-sizing: border-box;
            padding-left: 15px;
          }
          .pic_view {
            width: 334px;
            height: 174px;
            border: 1px solid #cfcfcf;
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
                display: flex;
                justify-content: center;
                align-items: center;
                width: 87px;
                height: 87px;
                background: #ffffff;
                border: 1px solid #d6d6d6;
                margin-left: 10px;
                margin-top: 5px;
                position: relative;
                cursor: pointer;
                .add_file_img {
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  position: absolute;
                }
                .del_file_img {
                  top: -10px;
                  right: -8px;
                  position: absolute;
                }
                .uploadCertFile {
                  display: none;
                }
              }
            }
          }
        }
      }
      .close_img {
        width: 64px;
        height: 64px;
        position: absolute;
        top: -30px;
        right: -30px;
        cursor: pointer;
      }
    }

    .video_div {
      width: 450px;
      height: 450px;
      background: #ffffff;
      position: relative;
      .close_img {
        width: 64px;
        height: 64px;
        position: absolute;
        top: -30px;
        right: -30px;
        cursor: pointer;
      }
      .content {
        box-sizing: border-box;
        background: $color11;
        display: flex;
        flex-direction: row;
        .big_img {
          box-sizing: border-box;
          width: 680px;
          height: 650px;
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
  }
  .modal {
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
    .modal_box {
      width: 600px;
      height: 550px;
      background: #ffffff;
      border-radius: 10px;
      position: relative;
      margin: 0 auto;
      box-sizing: border-box;
      padding: 40px;
      display: flex;
      flex-direction: column;
      position: relative;
      .close_img {
        width: 64px;
        height: 64px;
        position: absolute;
        top: -30px;
        right: -30px;
        cursor: pointer;
      }
      .row {
        display: flex;
        flex-direction: row;
        margin: 10px 0;
        .vue-treeselect {
          margin-left: -6px !important;
        }
        .vue-treeselect {
          width: 411px;
          margin-left: 10px;
          flex: 0.8;
        }
        .select_view {
          width: 334px;
          height: 37px;
          padding: 0;
          outline: none;
          border: 1px solid #cfcfcf;
          border-radius: 6px;
          box-sizing: border-box;
          padding-left: 15px;
          flex: 0.8;
        }
        .confirm_btn {
          cursor: pointer;
          width: 91px;
          height: 38px;
          background: #dd3d29;
          opacity: 0.86;
          border-radius: 5px;
          -webkit-box-flex: 0;
          -ms-flex: none;
          flex: none;
          color: #ffffff;
          font-size: 16px;
          line-height: 38px;
          text-align: center;
          margin-right: 10px;
        }
        .cancel_btn {
          cursor: pointer;
          width: 91px;
          height: 38px;
          background: #dd3d29;
          opacity: 0.86;
          border-radius: 5px;
          -webkit-box-flex: 0;
          -ms-flex: none;
          flex: none;
          color: #ffffff;
          font-size: 16px;
          line-height: 38px;
          text-align: center;
        }
        .label {
          font-size: 14px;
          flex: 0.2;
        }
        .content {
          height: 37px;
          padding: 0;
          outline: none;
          border: 1px solid #cfcfcf;
          border-radius: 6px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          padding-left: 15px;
          flex: 0.8;
        }
        .vue-tags-input {
          width: 252px;
          padding: 0;
          outline: none;
          border: 1px solid #cfcfcf;
          border-radius: 6px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          padding-left: 15px;
          flex: 0.8;
        }
        .ti-input {
          border: none !important;
        }
        .img_item {
          width: 87px;
          height: 87px;
          background: #ffffff;
          border: 1px solid #d6d6d6;
          margin-left: 10px;
          margin-top: 5px;
          position: relative;
          cursor: pointer;
          .add_file_img {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            position: absolute;
          }
          .del_file_img {
            top: -10px;
            right: -8px;
            position: absolute;
          }
          .uploadPicFile {
            display: none;
          }
        }
      }
    }
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
        .top_header_view_avatarUrl {
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
              .uploadCertFile {
                display: none;
              }
              .header_logo_size {
                width: 67px;
                height: 67px;
                border-radius: 50%;
              }
              .header_logo {
                cursor: pointer;
                width: 67px;
                height: 67px;
                border-radius: 50%;
                border: 1px solid #cfcfcf;
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
                  border: 1px solid #cfcfcf;
                  border-radius: 6px;
                  margin-right: 200px;
                  box-sizing: border-box;
                  padding-left: 15px;
                }
                .pic_view {
                  width: 334px;
                  height: 174px;
                  border: 1px solid #cfcfcf;
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
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      width: 87px;
                      height: 87px;
                      background: #ffffff;
                      border: 1px solid #d6d6d6;
                      margin-left: 10px;
                      margin-top: 5px;
                      position: relative;
                      cursor: pointer;
                      .add_file_img {
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        position: absolute;
                      }
                      .del_file_img {
                        top: -10px;
                        right: -8px;
                        position: absolute;
                      }
                      .uploadCertFile {
                        display: none;
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
              cursor: pointer;
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
              cursor: pointer;
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
            overflow-y: auto;
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
                  cursor: pointer;
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
                  cursor: pointer;
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
                  border: 1px solid #cfcfcf;
                  border-radius: 12px;
                  color: #cfcfcf;
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
              cursor: pointer;
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
                width: 180px;
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
