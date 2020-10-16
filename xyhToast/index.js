import Toast from './toast.vue';

const obj = {
  install(Vue, color) {
    const ToastConstructor = Vue.extend(Toast);
    const toastEl = new ToastConstructor();
    toastEl.$mount(document.createElement('div'));
    document.body.appendChild(toastEl.$el);
    
    // 修改按钮主题颜色
    color && color.length > 0 ? (toastEl.$data.btnColor = color) : '';

    Vue.prototype.$xyhDialog = toastEl;
  },
};

export default obj;
