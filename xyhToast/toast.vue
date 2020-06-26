<template>
  <div>
    <div id="xyhToast" v-show="isShowToast">
      <div id="xyhToastInfo">
        <div id="iconBg" :style="imgBgStyle">
          <img id="stateIcon" :class="animatCss" :src="imgIcon" />
        </div>
        <div id="xyhToastTitle">{{ toastTitle }}</div>
        <div id="xyhToastMsg">{{ toastMsg }}</div>
        <div id="xyhToastInfoBtnGroup" v-show="showToastBtn">
          <div
            id="xyhToastInfoBtnClose"
            class="btnGroupItems"
            data-state="false"
            v-show="showCancel"
            cancel
            @click="toastBtnClick"
          >
            {{ toastCancelInfo }}
          </div>
          <div
            id="xyhToastInfoBtn"
            class="btnGroupItems"
            data-state="true"
            :style="{ backgroundColor: btnColor }"
            @click="toastBtnClick"
          >
            {{ toastPassInfo }}
          </div>
        </div>
      </div>
    </div>
    <div id="xyhLoading" v-show="isShowLoading">
      <div id="xyhLoadingInfo">
        <img src="./img/loadingBg.png" />
        <div id="xyhLoadingInfoContent">
          <img src="./img/loading.gif" />
          <p>{{ loadingMsg }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import infoBg from './img/infoBg.png';
import infoIcon from './img/info.png';
import successBg from './img/successBg.png';
import successIcon from './img/success.png';
import errorBg from './img/errorBg.png';
import errorIcon from './img/error.png';

export default {
  name: 'xyhToast',
  data() {
    return {
      isShowToast: false,
      isShowLoading: false,
      loadingMsg: '',
      showToastBtn: false,
      showCancel: false,
      btnColor: '#234173',
      imgBgStyle: {
        backgroundImage: 'url(' + infoBg + ')',
      },
      imgIcon: infoIcon,
      animatCss: ['vivify'],
      typeArr: [
        {
          icon: infoIcon,
          iconBg: infoBg,
          cls: 'swoopInTop',
        },
        {
          icon: successIcon,
          iconBg: successBg,
          cls: 'flipInY',
        },
        {
          icon: errorIcon,
          iconBg: errorBg,
          cls: 'jumpInRight',
        },
      ],
      toastTitle: '',
      toastMsg: '',
      toastCancelInfo: '',
      toastPassInfo: '',
    };
  },
  methods: {
    showLoading(msg) {
      msg = msg || '正在加载中';
      this.isShowLoading = true;
      this.loadingMsg = msg;
    },
    hideLoading() {
      this.isShowLoading = false;
    },
    showToast({
      title = '',
      msg = '',
      duration = 0,
      button = '确定',
      close = true,
      type = 0,
      callback = null,
    } = {}) {
      this.toastTitle = title;
      this.toastMsg = msg;
      if (duration > 0) {
        this.showToastBtn = false;
        setTimeout(() => this.hideToast(), duration);
      } else {
        this.showToastBtn = true;
        // 判断传入的close为boolean还是string
        if (close || close.length > 0) {
          this.showCancel = true;
          typeof close === 'boolean'
            ? (this.toastCancelInfo = '取消')
            : (this.toastCancelInfo = close);
        }
      }
      this.toastPassInfo = button;
      const typeInfo = this.typeArr[type] ? this.typeArr[type] : this.typeArr[0];
      // 选择class样式
      this.animatCss = ['vivify', typeInfo.cls];
      this.imgBgStyle = { backgroundImage: 'url(' + typeInfo.iconBg + ')' };
      this.imgIcon = typeInfo.icon;
      this.isShowToast = true;
      this.toastCallBack = callback;
    },
    hideToast() {
      this.isShowToast = false;
      this.animatCss = ['vivify'];
    },
    toastBtnClick(e) {
      const state = e.target.dataset.state;
      this.toastCallBack(state);
      this.hideToast();
    },
    toastCallBack() {},
  },
};
</script>

<style>
@import './wxToast.min.css';
</style>
