import Vue from 'vue';
import App from './App.vue';
import routes from './config/routers';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VideoPlayer from 'vue-video-player';
//引入 hls,视频直播(m3u8)必须引入的
// import 'videojs-contrib-hls'
//播放rtmp视频
// import 'videojs-flash'
// 自己封装的axios
import http from "./config/http";
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true


const router = new VueRouter({
    mode: 'hash',
    routes  
});
require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');
//如果你需要自定义播放器的样式，自己新建一个css
require('./assets/css/video.css');
Vue.prototype.$http = http;
Vue.config.productionTip = false;
Vue.prototype.host = "http://47.115.32.248:6002";            

Vue.use(iView);
Vue.use(VueRouter);
Vue.use(VideoPlayer);//视频播放器
Vue.use(VueClipboard)//复制粘贴
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')