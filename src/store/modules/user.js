import { setStore, getStore, removeStore } from '@/utils/store';


var data = {
  user: {
    roleId: 1,
    id: 1,
  },
  username: 'llllllllllz',
  resources: [
    {
      available: false,
      id: 875,
      name: "起飞项目后台",
      parentId: 1,
      parentIds: "0/1/",
      permission: "wefly",
      rootNode: false,
      type: "menu",
      url: "/wefly",
    },
    {
      available: false,
      id: 881,
      name: "首页",
      parentId: 875,
      parentIds: "0/1/875/",
      permission: "",
      rootNode: false,
      type: "menu",
      url: "dashboard"
    },
    {
      available: false,
      id: 882,
      name: "首页",
      parentId: 881,
      parentIds: "0/1/875/881/",
      permission: "",
      rootNode: false,
      type: "menu",
      url: "dashboard",
    },
    {
      available: false,
      id: 883,
      name: "table",
      parentId: 875,
      parentIds: "0/1/875/",
      permission: "",
      rootNode: false,
      type: "menu",
      url: "table"
    },
    {
      available: false,
      id: 884,
      name: "table-examplae",
      parentId: 883,
      parentIds: "0/1/875/883/",
      permission: "",
      rootNode: false,
      type: "menu",
      url: "table-example"
    }
  ]
}

const user = {
  state: {
    token: '',
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    isLock: getStore({
      name: 'isLock'
    }) || false,
    lockPasswd: getStore({
      name: 'lockPasswd'
    }) || '',
    browserHeaderTitle: getStore({
      name: 'browserHeaderTitle'
    }) || '起飞后台'
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      sessionStorage.setItem(roles, JSON.stringify(roles))
      state.roles = roles
    },
    SET_LOCK: (state, action) => {
      state.isLock = true;
      setStore({
        name: 'isLock',
        content: state.isLock,
        type: 'session'
      })
    },
    SET_LOCK_PASSWD: (state, lockPasswd) => {
      state.lockPasswd = lockPasswd;
      setStore({
        name: 'lockPasswd',
        content:state.lockPasswd,
        type: 'session'
      })
    },
    ClEAR_LOCK: (state, action) => {
      state.isLock = false;
      state.lockPasswd = '';
      removeStore({
        name: 'lockPasswd'
      });
      removeStore({
        name: 'isLock'
      })
    },
    SET_BROWSERHEADERTITLE: (state, action) => {
      state.browserHeaderTitle = action.browserHeaderTitle
    }
  },
  actions: {
    // 获取用户信息
    GetUserInfo({commit, state}) {
      const getUserInfo = () => {
        return axios({
          url: '',
          method: 'post'
        })
      };
      return new Promise((resolve, reject) => {
        // getUserInfo().then(response => {});
        localStorage.setItem('roleId', data.user.roleId);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userAccount', data.username);
        if(data.resources) {
          commit('SET_ROLES', data.resources);
          commit('SET_NAME', data.username);
        } else {
          reject('getInfo: resources must be undefined !')
        }
        resolve(data);
      }).catch(error => {
        reject(error)
      })
    },
    LogOut() {
      window.location.href = process.env.VUE_APP_BASE_API + '/console/logout';
    }
  }
}
export default user;
