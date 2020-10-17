<template>
  <div>
    <div v-show="isShowDialog" id="xyhDialog">
      <div id="xyhDialogInfo">
        <div id="iconBg" :style="imgBgStyle">
          <img id="stateIcon" :class="animatCss" :src="imgIcon" />
        </div>
        <div id="xyhDialogTitle">{{ dialogTitle }}</div>
        <div id="xyhDialogMsg">{{ dialogMsg }}</div>
        <div v-show="showDialogBtn" id="xyhDialogInfoBtnGroup">
          <div
            v-show="showCancel"
            id="xyhDialogInfoBtnClose"
            class="btnGroupItems"
            data-state="false"
            cancel
            @click="dialogBtnClick"
          >{{ dialogCancelInfo }}</div>
          <div
            id="xyhDialogInfoBtn"
            class="btnGroupItems"
            data-state="true"
            :style="{ backgroundColor: btnColor }"
            @click="dialogBtnClick"
          >{{ dialogPassInfo }}</div>
        </div>
      </div>
    </div>
    <div v-show="isShowLoading" id="xyhLoading">
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
import infoBg from "./img/infoBg.png";
import infoIcon from "./img/info.png";
import successBg from "./img/successBg.png";
import successIcon from "./img/success.png";
import errorBg from "./img/errorBg.png";
import errorIcon from "./img/error.png";

export default {
  name: "XyhDialog",
  data() {
    return {
      isShowDialog: false,
      isShowLoading: false,
      loadingMsg: "",
      showDialogBtn: false,
      showCancel: false,
      btnColor: "#234173",
      imgBgStyle: {
        backgroundImage: "url(" + infoBg + ")",
      },
      imgIcon: infoIcon,
      animatCss: ["vivify"],
      typeArr: [
        {
          icon: infoIcon,
          iconBg: infoBg,
          cls: "swoopInTop",
        },
        {
          icon: successIcon,
          iconBg: successBg,
          cls: "flipInY",
        },
        {
          icon: errorIcon,
          iconBg: errorBg,
          cls: "jumpInRight",
        },
      ],
      dialogTitle: "",
      dialogMsg: "",
      dialogCancelInfo: "",
      dialogPassInfo: "",
    };
  },
  methods: {
    showLoading(msg) {
      msg = msg || "正在加载中";
      this.isShowLoading = true;
      this.loadingMsg = msg;
    },
    hideLoading() {
      this.isShowLoading = false;
    },
    showDialog({
      title = "",
      msg = "",
      duration = 0,
      button = "确定",
      close = true,
      type = 0,
      callback = null,
    } = {}) {
      this.dialogTitle = title;
      this.dialogMsg = msg;
      if (duration > 0) {
        this.showDialogBtn = false;
        setTimeout(() => this.hideDialog(), duration);
      } else {
        this.showDialogBtn = true;
        // 判断传入的close为boolean还是string
        if (close || close.length > 0) {
          this.showCancel = true;
          typeof close === "boolean"
            ? (this.dialogCancelInfo = "取消")
            : (this.dialogCancelInfo = close);
        }
      }
      this.dialogPassInfo = button;
      const typeInfo = this.typeArr[type]
        ? this.typeArr[type]
        : this.typeArr[0];
      // 选择class样式
      this.animatCss = ["vivify", typeInfo.cls];
      this.imgBgStyle = { backgroundImage: "url(" + typeInfo.iconBg + ")" };
      this.imgIcon = typeInfo.icon;
      this.isShowDialog = true;
      this.dialogCallBack = callback;
    },
    hideDialog() {
      this.isShowDialog = false;
      this.animatCss = ["vivify"];
    },
    dialogBtnClick(e) {
      const state = e.target.dataset.state;
      this.dialogCallBack(state === "true");
      this.hideDialog();
    },
    dialogCallBack() {},
  },
};
</script>

<style>
@import "./wxDialog.min.css";
</style>
