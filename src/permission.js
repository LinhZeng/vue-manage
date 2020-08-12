import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { setTitle } from '@/utils/util'; // 设置浏览器头部标题

function hasPermission(roles, permissionRoles) {
  if(!permissionRoles) return false;
  return roles.some(role => permissionRoles.includes(role.id));
}

const whiteList = ['/404', 'lock']; // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start();
  // if(to.path === '/')
  if(whiteList.some(item => to.path.includes(item))) {
    next();
    return;
  }
  // 设置浏览器头部标题
  const browserHeaderTitle = to.meta ? to.meta.title ? to.meta.title : to.name : to.name;
  store.commit('SET_BROWSERHEADERTITLE', {
    browserHeaderTitle: browserHeaderTitle
  });
  if(store.getters.isLock && to.path !== '/lock') {
    next({
      path: '/lock'
    });
    NProgress.done();
  } else if (to.path === '/login') {
    next({path: '/'});
    NProgress.done();
  } else {
    if (store.getters.roles.length === 0) {
      store.dispatch('GetUserInfo').then(res => { // 拉取用户信息
        const roles = res.resources;
        store.dispatch('GenerateRoutes', {roles}).then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
          next({...to, replace: true}) // set the replace: true so the navigation will not leave a history record
        });
      }).catch(err => {
        Message.error('登录失效，请重新登录！');
        window.location.href = ''
      });
    } else {
      // 没有动态改变权限的需求可直接next() 删除下方权限判断
      if(hasPermission(store.getters.roles, to.meta.roles)) {
        next();
      } else {
        if(to.path === '/dashboard/dashboard') {
          next({path:'/standard/urlPath?src=http%3A%2F%2Fs-doc2.ttyuyin.com%2Fweb%2F%23%2Fpage%2F428&isEncode=true', replace: true});
          return;
        }
        next({path: '/404', replace: true, query: {noGoBack: true}})
      }
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
  setTimeout(() => {
    const browserHeaderTitle = store.getters.browserHeaderTitle;
    setTitle(browserHeaderTitle);
  }, 0);
})
