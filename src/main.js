import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSpotify,
  faTwitter,
  faGithub,
  faDiscord,
  faNodeJs,
  faPython,
  faVuejs,
  faHtml5,
  faCss3Alt,
  faUbuntu,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faSpotify,
  faTwitter,
  faGithub,
  faDiscord,
  faEnvelope,
  faNodeJs,
  faPython,
  faVuejs,
  faHtml5,
  faCss3Alt,
  faUbuntu,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.config.productionSourceMap = false;

new Vue({
  router,
  store,
  comments: true,
  render: h => h(App),
}).$mount('#app');
