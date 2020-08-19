import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    const menuRoles = route.meta.roles;
    return roles.some(item => menuRoles.indexOf(item.id)!==-1)
  } else {
    return false
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRoutes
 * @param roles
 */
function filterAsyncRouter(asyncRoutes, roles) {
  const accessdRouters = asyncRoutes.filter(route => {
    if(hasPermission(roles, route)) {
      if(route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false
  })
  return accessdRouters;
}

const permission = {
  state: {
    routers: constantRoutes,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRoutes.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({commit}, data) {
      return new Promise(resolve => {
        const {roles} = data;
        console.log(asyncRoutes);
        const accessdRouters = filterAsyncRouter(asyncRoutes, roles);
        console.log(accessdRouters);
        commit('SET_ROUTERS', accessdRouters);
        resolve();
      });
    }
  }
};

export default permission;